import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import os
import json
import time
from collections import deque
import hashlib
import re
from datetime import datetime

class WebsiteScraper:
    def __init__(self, base_url):
        self.base_url = base_url
        self.domain = urlparse(base_url).netloc
        self.visited_urls = set()
        self.to_visit = deque([base_url])
        self.scraped_data = {}
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        
    def is_valid_url(self, url):
        """Check if URL belongs to the same domain and is valid"""
        parsed = urlparse(url)
        return (parsed.netloc == self.domain and 
                parsed.scheme in ['http', 'https'] and
                not url.endswith(('.pdf', '.zip', '.exe', '.dmg')))
    
    def normalize_url(self, url):
        """Normalize URL to avoid duplicates"""
        url = url.rstrip('/')
        url = url.split('#')[0]  # Remove fragments
        url = url.split('?')[0]  # Remove query params for now
        return url
    
    def discover_urls(self, soup, current_url):
        """Find all internal links on the page"""
        urls = set()
        
        # Find all links
        for link in soup.find_all(['a', 'link']):
            href = link.get('href')
            if href:
                absolute_url = urljoin(current_url, href)
                normalized_url = self.normalize_url(absolute_url)
                
                if self.is_valid_url(normalized_url) and normalized_url not in self.visited_urls:
                    urls.add(normalized_url)
        
        # Check for sitemap
        robots_url = urljoin(self.base_url, '/robots.txt')
        try:
            robots_resp = self.session.get(robots_url, timeout=10)
            if robots_resp.status_code == 200:
                for line in robots_resp.text.splitlines():
                    if line.lower().startswith('sitemap:'):
                        sitemap_url = line.split(':', 1)[1].strip()
                        self.parse_sitemap(sitemap_url)
        except:
            pass
        
        return urls
    
    def parse_sitemap(self, sitemap_url):
        """Parse sitemap for additional URLs"""
        try:
            resp = self.session.get(sitemap_url, timeout=10)
            if resp.status_code == 200:
                soup = BeautifulSoup(resp.content, 'xml')
                for loc in soup.find_all('loc'):
                    url = self.normalize_url(loc.text)
                    if self.is_valid_url(url) and url not in self.visited_urls:
                        self.to_visit.append(url)
        except:
            pass
    
    def detect_cms(self, soup, response):
        """Detect CMS and other technologies"""
        cms_data = {
            'cms': None,
            'technologies': [],
            'meta_generator': None
        }
        
        # Check meta generator
        generator = soup.find('meta', {'name': 'generator'})
        if generator:
            cms_data['meta_generator'] = generator.get('content', '')
            
        # Check for WordPress
        if soup.find('link', {'href': re.compile(r'wp-content|wp-includes')}) or \
           soup.find('script', {'src': re.compile(r'wp-content|wp-includes')}):
            cms_data['cms'] = 'WordPress'
            
        # Check for other common CMS patterns
        if 'wix' in response.text.lower():
            cms_data['cms'] = 'Wix'
        elif 'squarespace' in response.text.lower():
            cms_data['cms'] = 'Squarespace'
        elif soup.find('meta', {'name': 'application-name', 'content': 'Webflow'}):
            cms_data['cms'] = 'Webflow'
            
        return cms_data
    
    def extract_sections(self, soup):
        """Extract content organized by sections"""
        sections = []
        section_index = 1
        
        # Common section patterns
        section_selectors = [
            'section', 'div.section', '.content-section', 
            'article', 'main > div', '.container > div'
        ]
        
        for selector in section_selectors:
            for element in soup.select(selector):
                # Skip if it's navigation or footer
                if any(cls in str(element.get('class', [])).lower() for cls in ['nav', 'footer', 'header']):
                    continue
                
                section_data = {
                    'index': section_index,
                    'title': None,
                    'content': [],
                    'images': [],
                    'videos': []
                }
                
                # Find section title
                heading = element.find(['h1', 'h2', 'h3', 'h4'])
                if heading:
                    section_data['title'] = heading.get_text(strip=True)
                
                # Extract text content
                for p in element.find_all(['p', 'li', 'span']):
                    text = p.get_text(strip=True)
                    if text and len(text) > 20:  # Skip very short text
                        section_data['content'].append(text)
                
                # Extract images
                for img in element.find_all('img'):
                    img_data = {
                        'src': img.get('src', ''),
                        'alt': img.get('alt', ''),
                        'title': img.get('title', '')
                    }
                    if img_data['src']:
                        section_data['images'].append(img_data)
                
                # Extract videos
                for video in element.find_all(['video', 'iframe']):
                    if video.name == 'video':
                        video_data = {'src': video.get('src', ''), 'type': 'video'}
                    else:  # iframe
                        video_data = {'src': video.get('src', ''), 'type': 'iframe'}
                    if video_data['src']:
                        section_data['videos'].append(video_data)
                
                if section_data['content'] or section_data['images'] or section_data['videos']:
                    sections.append(section_data)
                    section_index += 1
        
        return sections
    
    def scrape_page(self, url):
        """Scrape a single page"""
        try:
            print(f"Scraping: {url}")
            response = self.session.get(url, timeout=15)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract basic page data
            page_data = {
                'url': url,
                'title': soup.find('title').get_text(strip=True) if soup.find('title') else '',
                'meta_description': '',
                'cms_info': self.detect_cms(soup, response),
                'sections': self.extract_sections(soup),
                'all_images': [],
                'navigation_links': [],
                'scraped_at': datetime.now().isoformat()
            }
            
            # Meta description
            meta_desc = soup.find('meta', {'name': 'description'})
            if meta_desc:
                page_data['meta_description'] = meta_desc.get('content', '')
            
            # All images on page
            for img in soup.find_all('img'):
                img_url = img.get('src', '')
                if img_url:
                    page_data['all_images'].append({
                        'src': urljoin(url, img_url),
                        'alt': img.get('alt', ''),
                        'title': img.get('title', '')
                    })
            
            # Navigation links
            nav_elements = soup.find_all(['nav', 'header'])
            for nav in nav_elements:
                for link in nav.find_all('a'):
                    href = link.get('href', '')
                    text = link.get_text(strip=True)
                    if href and text:
                        page_data['navigation_links'].append({
                            'text': text,
                            'href': href
                        })
            
            # Discover new URLs
            new_urls = self.discover_urls(soup, url)
            for new_url in new_urls:
                if new_url not in self.visited_urls:
                    self.to_visit.append(new_url)
            
            return page_data
            
        except Exception as e:
            print(f"Error scraping {url}: {str(e)}")
            return None
    
    def create_slug(self, url):
        """Create a slug from URL for file naming"""
        path = urlparse(url).path
        if path == '/' or path == '':
            return 'home'
        
        slug = path.strip('/').replace('/', '-')
        slug = re.sub(r'[^a-zA-Z0-9-]', '', slug)
        return slug or 'index'
    
    def scrape_all(self):
        """Main scraping method"""
        print(f"Starting scrape of {self.base_url}")
        
        while self.to_visit:
            current_url = self.to_visit.popleft()
            
            if current_url in self.visited_urls:
                continue
            
            self.visited_urls.add(current_url)
            page_data = self.scrape_page(current_url)
            
            if page_data:
                slug = self.create_slug(current_url)
                self.scraped_data[slug] = page_data
            
            # Be respectful with rate limiting
            time.sleep(1)
        
        print(f"Scraping complete. Found {len(self.scraped_data)} pages.")
        return self.scraped_data

# Create scraper instance and run
if __name__ == "__main__":
    scraper = WebsiteScraper("https://whitemassif.com/")
    scraped_data = scraper.scrape_all()
    
    # Save raw scraped data
    with open('scraped-content/metadata/all_pages.json', 'w', encoding='utf-8') as f:
        json.dump(scraped_data, f, indent=2, ensure_ascii=False)
    
    print(f"Scraped data saved to scraped-content/metadata/all_pages.json")
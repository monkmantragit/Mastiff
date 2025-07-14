import json
import os
import requests
from urllib.parse import urljoin, urlparse
import re
from pathlib import Path

class ContentProcessor:
    def __init__(self, scraped_data_file):
        with open(scraped_data_file, 'r', encoding='utf-8') as f:
            self.scraped_data = json.load(f)
        
        self.content_dir = Path('scraped-content/content')
        self.images_dir = Path('scraped-content/images')
        self.content_dir.mkdir(exist_ok=True)
        self.images_dir.mkdir(exist_ok=True)
        
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def sanitize_filename(self, name):
        """Create safe filename"""
        name = re.sub(r'[^\w\s-]', '', name)
        name = re.sub(r'[-\s]+', '-', name)
        return name[:100]  # Limit length
    
    def download_image(self, img_url, page_slug, section_index, img_index, img_type='image'):
        """Download and save image with proper naming"""
        try:
            # Create page directory
            page_dir = self.images_dir / page_slug
            page_dir.mkdir(exist_ok=True)
            
            # Get image extension
            parsed_url = urlparse(img_url)
            ext = os.path.splitext(parsed_url.path)[1]
            if not ext:
                ext = '.jpg'  # Default extension
            
            # Create filename
            filename = f"section_{section_index}_{img_type}_{img_index}{ext}"
            filepath = page_dir / filename
            
            # Download image
            response = self.session.get(img_url, timeout=10)
            response.raise_for_status()
            
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            print(f"Downloaded: {filename}")
            return str(filepath.relative_to('scraped-content'))
        
        except Exception as e:
            print(f"Error downloading {img_url}: {str(e)}")
            return None
    
    def process_section_content(self, section, page_slug):
        """Process a section and download its media"""
        markdown_content = []
        
        # Section title
        if section.get('title'):
            markdown_content.append(f"## {section['title']}\n")
        else:
            markdown_content.append(f"## Section {section['index']}\n")
        
        # Section content
        for paragraph in section.get('content', []):
            markdown_content.append(f"{paragraph}\n")
        
        # Process images
        if section.get('images'):
            markdown_content.append("\n### Images\n")
            for idx, img in enumerate(section['images'], 1):
                img_url = img['src']
                if not img_url.startswith('http'):
                    # Handle relative URLs
                    img_url = urljoin(self.scraped_data[page_slug]['url'], img_url)
                
                # Download image
                local_path = self.download_image(
                    img_url, page_slug, section['index'], idx, 'image'
                )
                
                if local_path:
                    alt_text = img.get('alt', f"Image {idx}")
                    markdown_content.append(f"![{alt_text}](../{local_path})")
                    if img.get('title'):
                        markdown_content.append(f"*{img['title']}*")
                    markdown_content.append("")
        
        # Process videos
        if section.get('videos'):
            markdown_content.append("\n### Videos\n")
            for idx, video in enumerate(section['videos'], 1):
                video_url = video['src']
                markdown_content.append(f"Video {idx}: [{video_url}]({video_url})")
                markdown_content.append("")
        
        return "\n".join(markdown_content)
    
    def create_markdown_file(self, page_slug, page_data):
        """Create markdown file for a page"""
        markdown_lines = []
        
        # Front matter
        markdown_lines.append("---")
        markdown_lines.append(f"title: \"{page_data['title']}\"")
        markdown_lines.append(f"url: \"{page_data['url']}\"")
        if page_data['meta_description']:
            markdown_lines.append(f"description: \"{page_data['meta_description']}\"")
        if page_data['cms_info']['cms']:
            markdown_lines.append(f"cms: \"{page_data['cms_info']['cms']}\"")
        markdown_lines.append(f"scraped_at: \"{page_data['scraped_at']}\"")
        markdown_lines.append("---\n")
        
        # Page title
        markdown_lines.append(f"# {page_data['title']}\n")
        
        # Navigation links
        if page_data['navigation_links']:
            markdown_lines.append("## Navigation")
            for link in page_data['navigation_links']:
                markdown_lines.append(f"- [{link['text']}]({link['href']})")
            markdown_lines.append("")
        
        # Process sections
        for section in page_data['sections']:
            section_content = self.process_section_content(section, page_slug)
            markdown_lines.append(section_content)
            markdown_lines.append("\n---\n")
        
        # Save markdown file
        md_filepath = self.content_dir / f"{page_slug}.md"
        with open(md_filepath, 'w', encoding='utf-8') as f:
            f.write("\n".join(markdown_lines))
        
        print(f"Created markdown: {md_filepath}")
    
    def create_index_file(self):
        """Create an index of all scraped pages"""
        index_content = ["# Scraped Content Index\n"]
        index_content.append("## Pages\n")
        
        for page_slug, page_data in self.scraped_data.items():
            index_content.append(f"### [{page_data['title']}](content/{page_slug}.md)")
            index_content.append(f"- URL: {page_data['url']}")
            index_content.append(f"- Sections: {len(page_data['sections'])}")
            index_content.append(f"- Images: {len(page_data['all_images'])}")
            if page_data['cms_info']['cms']:
                index_content.append(f"- CMS: {page_data['cms_info']['cms']}")
            index_content.append("")
        
        with open('scraped-content/INDEX.md', 'w', encoding='utf-8') as f:
            f.write("\n".join(index_content))
    
    def process_all(self):
        """Process all scraped data"""
        print("Processing scraped content...")
        
        for page_slug, page_data in self.scraped_data.items():
            print(f"\nProcessing: {page_slug}")
            self.create_markdown_file(page_slug, page_data)
        
        self.create_index_file()
        print("\nProcessing complete!")

# Run processor
if __name__ == "__main__":
    processor = ContentProcessor('scraped-content/metadata/all_pages.json')
    processor.process_all()
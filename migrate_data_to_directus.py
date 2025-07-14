#!/usr/bin/env python3
"""
Data Migration Script for White Massif Directus
Converts existing JSON data to Directus-compatible format
"""

import json
import os
import re
from datetime import datetime
from typing import Dict, List, Any

class DirectusMigrator:
    def __init__(self, data_dir: str = "./data"):
        self.data_dir = data_dir
        self.output_dir = "./directus_migration"
        self.create_output_dir()

    def create_output_dir(self):
        """Create output directory for migration files"""
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)

    def clean_slug(self, slug: str) -> str:
        """Clean and normalize slugs"""
        # Remove special characters and normalize
        slug = re.sub(r'[^\w\-]', '-', slug.lower())
        slug = re.sub(r'-+', '-', slug)  # Replace multiple dashes with single dash
        return slug.strip('-')

    def parse_date(self, date_str: str) -> str:
        """Parse and format date strings for Directus"""
        try:
            dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
            return dt.strftime('%Y-%m-%d %H:%M:%S')
        except:
            return datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    def html_to_text(self, content: str) -> str:
        """Convert HTML content to clean text for excerpts"""
        # Remove HTML tags
        clean = re.sub(r'<[^>]+>', '', content)
        # Clean up whitespace
        clean = re.sub(r'\s+', ' ', clean).strip()
        return clean

    def migrate_blog_posts(self) -> List[Dict[str, Any]]:
        """Migrate blog posts from JSON to Directus format"""
        posts_dir = os.path.join(self.data_dir, "posts")
        migrated_posts = []

        if not os.path.exists(posts_dir):
            print(f"Posts directory not found: {posts_dir}")
            return []

        for filename in os.listdir(posts_dir):
            if filename.endswith('.json'):
                file_path = os.path.join(posts_dir, filename)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        post_data = json.load(f)
                    
                    # Build content HTML from structured data
                    content_html = ""
                    if 'content' in post_data:
                        content = post_data['content']
                        
                        # Add intro
                        if 'intro' in content:
                            content_html += f"<p>{content['intro']}</p>\n\n"
                        
                        # Add themes or seasonal_themes
                        themes = content.get('themes', content.get('seasonal_themes', []))
                        for theme in themes:
                            content_html += f"<h2>{theme['title']}</h2>\n"
                            content_html += f"<p>{theme['description']}</p>\n"
                            if 'details' in theme:
                                content_html += f"<p>{theme['details']}</p>\n"
                            
                            if 'highlights' in theme:
                                content_html += "<ul>\n"
                                for highlight in theme['highlights']:
                                    content_html += f"<li>{highlight}</li>\n"
                                content_html += "</ul>\n"
                            content_html += "\n"
                    
                    # Generate excerpt if not provided
                    excerpt = post_data.get('excerpt', '')
                    if not excerpt and content_html:
                        excerpt = self.html_to_text(content_html)[:200] + "..."

                    migrated_post = {
                        'id': len(migrated_posts) + 1,
                        'title': post_data.get('title', ''),
                        'slug': self.clean_slug(post_data.get('slug', '')),
                        'excerpt': excerpt,
                        'content': content_html,
                        'category': post_data.get('category', 'Event Planning'),
                        'tags': post_data.get('tags', []),
                        'featured_image': post_data.get('featured_image'),
                        'published_date': self.parse_date(post_data.get('date_created', '')),
                        'author': 'White Massif Team',
                        'read_time': '5 min read',
                        'status': 'published',
                        'meta_title': post_data.get('meta_title', post_data.get('title', '')),
                        'meta_description': post_data.get('meta_description', excerpt),
                        'created_at': self.parse_date(post_data.get('date_created', '')),
                        'updated_at': self.parse_date(post_data.get('date_created', ''))
                    }
                    
                    migrated_posts.append(migrated_post)
                    print(f"✓ Migrated blog post: {migrated_post['title']}")
                
                except Exception as e:
                    print(f"✗ Error migrating {filename}: {e}")

        return migrated_posts

    def determine_department(self, position: str) -> str:
        """Determine department based on job position"""
        position_lower = position.lower()
        
        if any(term in position_lower for term in ['director', 'head']):
            return 'Leadership'
        elif any(term in position_lower for term in ['creative', 'art', 'design', 'graphic', 'motion']):
            return 'Creative'
        elif any(term in position_lower for term in ['operations', 'production', 'executive']):
            return 'Operations'
        elif any(term in position_lower for term in ['client', 'servicing', 'relations']):
            return 'Client Relations'
        elif any(term in position_lower for term in ['finance', 'accounting']):
            return 'Finance'
        elif any(term in position_lower for term in ['human', 'hr']):
            return 'HR'
        elif any(term in position_lower for term in ['marketing', 'digital']):
            return 'Marketing'
        else:
            return 'Operations'

    def migrate_team_members(self) -> List[Dict[str, Any]]:
        """Migrate team members from JSON to Directus format"""
        team_file = os.path.join(self.data_dir, "pages", "our-team-corporate-events.json")
        migrated_members = []

        if not os.path.exists(team_file):
            print(f"Team file not found: {team_file}")
            return []

        try:
            with open(team_file, 'r', encoding='utf-8') as f:
                team_data = json.load(f)
            
            team_members = team_data.get('content', {}).get('team_members', [])
            
            for idx, member in enumerate(team_members):
                department = self.determine_department(member.get('position', ''))
                
                migrated_member = {
                    'id': idx + 1,
                    'name': member.get('name', ''),
                    'position': member.get('position', ''),
                    'department': department,
                    'bio': f"Experienced professional in {department.lower()} with expertise in event management and client relations.",
                    'image': member.get('image') or f"/assets/images/team/placeholder-{(idx % 4) + 1}.jpg",
                    'email': f"{member.get('name', '').lower().replace(' ', '.')}@whitemassif.com",
                    'linkedin': None,
                    'years_experience': 5 + (idx % 10),  # Generate realistic experience years
                    'status': 'active',
                    'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    'updated_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                }
                
                migrated_members.append(migrated_member)
                print(f"✓ Migrated team member: {migrated_member['name']} ({department})")
        
        except Exception as e:
            print(f"✗ Error migrating team members: {e}")

        return migrated_members

    def migrate_services(self) -> List[Dict[str, Any]]:
        """Migrate services from JSON to Directus format"""
        services_file = os.path.join(self.data_dir, "pages", "service-test.json")
        migrated_services = []

        if not os.path.exists(services_file):
            print(f"Services file not found: {services_file}")
            return []

        try:
            with open(services_file, 'r', encoding='utf-8') as f:
                services_data = json.load(f)
            
            services = services_data.get('content', {}).get('services', [])
            
            for idx, service in enumerate(services):
                # Generate features from the service data
                features = [
                    {
                        'title': 'Professional Excellence',
                        'description': 'Delivered with the highest standards of professionalism and attention to detail.'
                    },
                    {
                        'title': 'Custom Solutions',
                        'description': 'Tailored specifically to meet your unique requirements and objectives.'
                    },
                    {
                        'title': 'Expert Team',
                        'description': 'Managed by our experienced team of event professionals and specialists.'
                    }
                ]

                # Generate stats
                stats = {
                    'events': f"{50 + (idx * 20)}+",
                    'satisfaction': "99%",
                    'clients': f"{30 + (idx * 10)}+"
                }

                # Generate gallery images
                gallery = [
                    f"/assets/images/services/service-{idx + 1}-1.jpg",
                    f"/assets/images/services/service-{idx + 1}-2.jpg",
                    f"/assets/images/services/service-{idx + 1}-3.jpg"
                ]

                migrated_service = {
                    'id': idx + 1,
                    'title': service.get('title', ''),
                    'slug': self.clean_slug(service.get('title', '')),
                    'description': service.get('description', ''),
                    'content': service.get('detailed_description', ''),
                    'category': 'Corporate Events',
                    'featured_image': f"/assets/images/services/{self.clean_slug(service.get('title', ''))}-hero.jpg",
                    'gallery': gallery,
                    'features': features,
                    'stats': stats,
                    'price_range': 'Contact for Quote',
                    'duration': 'Custom',
                    'status': 'active',
                    'sort_order': idx + 1,
                    'meta_title': f"{service.get('title', '')} - White Massif",
                    'meta_description': service.get('description', '')[:160],
                    'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    'updated_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                }
                
                migrated_services.append(migrated_service)
                print(f"✓ Migrated service: {migrated_service['title']}")
        
        except Exception as e:
            print(f"✗ Error migrating services: {e}")

        return migrated_services

    def create_sample_landing_pages(self) -> List[Dict[str, Any]]:
        """Create sample landing pages for different ad campaigns"""
        landing_pages = [
            {
                'id': 1,
                'title': 'Corporate Event Management Bangalore',
                'slug': 'corporate-events-bangalore',
                'template': 'service',
                'status': 'active',
                'hero_title': 'Transform Your Corporate Events',
                'hero_subtitle': 'Professional event management services in Bangalore with 12+ years of experience',
                'hero_image': '/assets/images/landing/corporate-events-hero.jpg',
                'hero_video': None,
                'cta_text': 'Get Free Consultation',
                'content': '<p>Elevate your corporate events with our comprehensive event management services. From planning to execution, we ensure every detail is perfect.</p>',
                'form_fields': [
                    {'name': 'name', 'label': 'Full Name', 'type': 'text', 'required': True},
                    {'name': 'email', 'label': 'Email', 'type': 'email', 'required': True},
                    {'name': 'phone', 'label': 'Phone', 'type': 'tel', 'required': True},
                    {'name': 'company', 'label': 'Company', 'type': 'text', 'required': False},
                    {'name': 'event_type', 'label': 'Event Type', 'type': 'select', 'required': True, 'options': ['Conference', 'Product Launch', 'Annual Event', 'Awards Ceremony']},
                    {'name': 'message', 'label': 'Event Details', 'type': 'textarea', 'required': False}
                ],
                'tracking_code': None,
                'meta_title': 'Corporate Event Management Bangalore | White Massif',
                'meta_description': 'Professional corporate event management services in Bangalore. 12+ years experience, 160+ clients served.',
                'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'updated_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            },
            {
                'id': 2,
                'title': 'Annual Corporate Events 2025',
                'slug': 'annual-events-2025',
                'template': 'campaign',
                'status': 'active',
                'hero_title': 'Make 2025 Your Best Year Yet',
                'hero_subtitle': 'Book your annual corporate event now and get exclusive 2025 packages',
                'hero_image': '/assets/images/landing/annual-events-hero.jpg',
                'hero_video': None,
                'cta_text': 'Book Now - Limited Slots',
                'content': '<p>Early bird special for 2025 annual events. Limited slots available for premium dates.</p>',
                'form_fields': [
                    {'name': 'name', 'label': 'Full Name', 'type': 'text', 'required': True},
                    {'name': 'email', 'label': 'Email', 'type': 'email', 'required': True},
                    {'name': 'phone', 'label': 'Phone', 'type': 'tel', 'required': True},
                    {'name': 'preferred_date', 'label': 'Preferred Date', 'type': 'date', 'required': True},
                    {'name': 'budget', 'label': 'Budget Range', 'type': 'select', 'required': False, 'options': ['50K-1L', '1L-3L', '3L-5L', '5L+']}
                ],
                'tracking_code': None,
                'meta_title': 'Annual Corporate Events 2025 - Early Bird Special',
                'meta_description': 'Book your 2025 annual corporate event now. Limited slots, exclusive packages available.',
                'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                'updated_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            }
        ]
        
        return landing_pages

    def run_migration(self):
        """Run the complete migration process"""
        print("🚀 Starting White Massif Data Migration to Directus...")
        print("=" * 60)

        # Migrate blog posts
        print("\n📝 Migrating Blog Posts...")
        blog_posts = self.migrate_blog_posts()
        if blog_posts:
            with open(os.path.join(self.output_dir, 'blog_posts.json'), 'w', encoding='utf-8') as f:
                json.dump(blog_posts, f, indent=2, ensure_ascii=False)
            print(f"✅ Exported {len(blog_posts)} blog posts to blog_posts.json")

        # Migrate team members
        print("\n👥 Migrating Team Members...")
        team_members = self.migrate_team_members()
        if team_members:
            with open(os.path.join(self.output_dir, 'team_members.json'), 'w', encoding='utf-8') as f:
                json.dump(team_members, f, indent=2, ensure_ascii=False)
            print(f"✅ Exported {len(team_members)} team members to team_members.json")

        # Migrate services
        print("\n🛠️ Migrating Services...")
        services = self.migrate_services()
        if services:
            with open(os.path.join(self.output_dir, 'services.json'), 'w', encoding='utf-8') as f:
                json.dump(services, f, indent=2, ensure_ascii=False)
            print(f"✅ Exported {len(services)} services to services.json")

        # Create sample landing pages
        print("\n🎯 Creating Sample Landing Pages...")
        landing_pages = self.create_sample_landing_pages()
        if landing_pages:
            with open(os.path.join(self.output_dir, 'landing_pages.json'), 'w', encoding='utf-8') as f:
                json.dump(landing_pages, f, indent=2, ensure_ascii=False)
            print(f"✅ Created {len(landing_pages)} sample landing pages in landing_pages.json")

        print("\n" + "=" * 60)
        print("🎉 Migration Complete!")
        print(f"📁 All files exported to: {self.output_dir}/")
        print("\n📋 Next Steps:")
        print("1. Review the generated JSON files")
        print("2. Import data into Directus collections")
        print("3. Update image paths to match your media library")
        print("4. Test the dynamic pages in your application")


if __name__ == "__main__":
    migrator = DirectusMigrator()
    migrator.run_migration()
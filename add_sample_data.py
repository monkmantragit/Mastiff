#!/usr/bin/env python3
"""
Add Sample Data to Directus Collections
Creates one sample item in each collection for testing
"""

import os
import requests
import json
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class DirectusSampleData:
    def __init__(self):
        self.base_url = os.getenv('DIRECTUS_URL')
        self.token = os.getenv('DIRECTUS_TOKEN')
        
        if not self.base_url or not self.token:
            raise ValueError("DIRECTUS_URL and DIRECTUS_TOKEN must be set in .env file")
        
        self.headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }
        
        # Remove trailing slash from URL
        if self.base_url.endswith('/'):
            self.base_url = self.base_url[:-1]

    def make_request(self, method, endpoint, data=None):
        """Make HTTP request to Directus API"""
        url = f"{self.base_url}{endpoint}"
        
        try:
            if method == 'POST':
                response = requests.post(url, headers=self.headers, json=data)
            elif method == 'GET':
                response = requests.get(url, headers=self.headers)
            
            if response.status_code in [200, 201, 204]:
                return response.json() if response.content else {}
            else:
                print(f"❌ Error {response.status_code}: {response.text}")
                return None
                
        except Exception as e:
            print(f"❌ Request failed: {e}")
            return None

    def add_sample_blog_post(self):
        """Add a sample blog post"""
        print("📝 Adding sample blog post...")
        
        blog_data = {
            "title": "5 Corporate Event Themes That Will Transform Your Next Celebration",
            "slug": "corporate-event-themes-transform-celebration",
            "excerpt": "Discover innovative corporate event themes that go beyond the ordinary. From Retro Rewind to Colors of India, learn how the right theme can create unforgettable experiences for your team.",
            "content": """<p>Corporate events have evolved far beyond simple office gatherings. Today's most successful companies understand that themed events create deeper connections, boost morale, and leave lasting impressions on employees and clients alike.</p>

<h2>Why Themes Matter</h2>
<p>A well-chosen theme does more than just decorate a space—it creates an immersive experience that transforms your event from ordinary to extraordinary. Themes provide a framework for everything from invitations and decor to entertainment and catering.</p>

<h2>Top 5 Transformative Themes</h2>

<h3>1. Retro Rewind</h3>
<p>Transport your guests through decades of music, fashion, and culture. This theme works exceptionally well for annual celebrations and milestone events, allowing different generations of employees to connect through shared nostalgia.</p>

<h3>2. Night of Aces</h3>
<p>Bring the sophistication of a high-end casino to your corporate event. Perfect for award ceremonies and client appreciation events, this theme combines elegance with interactive entertainment.</p>

<h3>3. Colors of India</h3>
<p>Celebrate diversity and cultural richness with this vibrant theme. Ideal for Diwali celebrations or multicultural company events, it showcases the beautiful tapestry of Indian traditions.</p>

<h3>4. Lights, Camera, Action</h3>
<p>Roll out the red carpet for a Hollywood-inspired gala. This theme transforms any venue into a glamorous movie set, perfect for product launches and high-profile corporate events.</p>

<h3>5. Winter Wonderland</h3>
<p>Create a magical atmosphere with this enchanting theme. Particularly effective for year-end celebrations and holiday parties, it brings warmth and wonder to corporate gatherings.</p>

<h2>Making Your Theme Work</h2>
<p>Remember, successful themed events require attention to every detail—from the initial invitation design to the final thank-you message. The key is consistency across all touchpoints and creating multiple layers of engagement that reinforce your chosen theme.</p>

<p>Ready to transform your next corporate event? The right theme, combined with expert planning, can turn any gathering into an unforgettable experience that strengthens your company culture and creates lasting memories.</p>""",
            "category": "Event Themes",
            "tags": ["Corporate Events", "Event Themes", "Event Planning", "Employee Engagement"],
            "published_date": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            "author": "White Massif Team",
            "read_time": "4 min read",
            "status": "published"
        }
        
        result = self.make_request('POST', '/items/blog', blog_data)
        if result:
            print(f"✅ Created blog post: '{blog_data['title']}'")
            return True
        return False

    def add_sample_service(self):
        """Add a sample service"""
        print("🛠️ Adding sample service...")
        
        service_data = {
            "title": "Corporate Annual Events",
            "slug": "corporate-annual-events",
            "description": "Transform your annual corporate gathering into an unforgettable celebration that strengthens team bonds, celebrates achievements, and sets the stage for future success.",
            "content": """<p>Your annual corporate event is more than just a yearly tradition—it's an opportunity to showcase your company's culture, celebrate milestones, and energize your team for the challenges ahead.</p>

<h2>What We Deliver</h2>
<p>Our comprehensive annual event management service covers every aspect of your celebration, from initial concept development to post-event analysis. We specialize in creating experiences that reflect your company's unique personality while ensuring seamless execution.</p>

<h3>Complete Event Planning</h3>
<ul>
<li>Theme development and branding</li>
<li>Venue selection and management</li>
<li>Entertainment curation</li>
<li>Catering and hospitality</li>
<li>Technical production</li>
</ul>

<h3>Custom Experiences</h3>
<p>Every company has its own story, culture, and goals. We work closely with your team to understand what makes your organization special and weave those elements into every aspect of your event.</p>

<h2>Our Process</h2>
<p>We begin with a comprehensive consultation to understand your objectives, budget, and vision. Our experienced team then develops a detailed plan that brings your ideas to life while managing all the complex logistics behind the scenes.</p>

<p>From intimate executive dinners to large-scale celebrations for hundreds of employees, we have the expertise and resources to make your annual event truly exceptional.</p>""",
            "category": "Corporate Events",
            "gallery": [
                "/assets/images/services/annual-events-1.jpg",
                "/assets/images/services/annual-events-2.jpg",
                "/assets/images/services/annual-events-3.jpg"
            ],
            "features": [
                {
                    "title": "End-to-End Management",
                    "description": "Complete event planning and execution from concept to completion, ensuring every detail is handled professionally."
                },
                {
                    "title": "Custom Theme Development",
                    "description": "Unique themes tailored to your company culture and celebration objectives, creating memorable experiences."
                },
                {
                    "title": "Professional Entertainment",
                    "description": "Curated entertainment options including live performances, interactive experiences, and engaging activities."
                },
                {
                    "title": "Seamless Coordination",
                    "description": "Expert project management ensuring smooth execution and stress-free experience for your team."
                }
            ],
            "stats": {
                "events": "150+",
                "satisfaction": "99%",
                "clients": "80+"
            },
            "sort_order": 1,
            "status": "active"
        }
        
        result = self.make_request('POST', '/items/services', service_data)
        if result:
            print(f"✅ Created service: '{service_data['title']}'")
            return True
        return False

    def add_sample_team_member(self):
        """Add a sample team member"""
        print("👥 Adding sample team member...")
        
        team_data = {
            "name": "Prakash A Vaswani",
            "position": "Director – Client Relations & Strategic Initiatives",
            "department": "Leadership",
            "bio": "Prakash brings over 12 years of experience in corporate event management and client relations. He specializes in understanding client needs and translating them into exceptional event experiences. His strategic approach has helped White Massif build long-lasting partnerships with over 160+ corporate clients across various industries.",
            "email": "prakash@whitemassif.com",
            "years_experience": 12,
            "status": "active"
        }
        
        result = self.make_request('POST', '/items/team_members', team_data)
        if result:
            print(f"✅ Created team member: '{team_data['name']}'")
            return True
        return False

    def add_sample_landing_page(self):
        """Add a sample landing page"""
        print("🎯 Adding sample landing page...")
        
        landing_data = {
            "title": "Corporate Event Management Bangalore - White Massif",
            "slug": "corporate-events-bangalore",
            "template": "service",
            "hero_title": "Transform Your Corporate Events in Bangalore",
            "hero_subtitle": "Professional event management services with 12+ years of experience. From concept to execution, we make your vision a reality.",
            "cta_text": "Get Free Consultation",
            "content": """<p>Elevate your corporate events with White Massif's comprehensive event management services in Bangalore. We specialize in creating exceptional experiences that engage your audience, strengthen your brand, and achieve your business objectives.</p>

<h2>Why Choose White Massif?</h2>
<ul>
<li><strong>12+ Years of Experience</strong> in corporate event management</li>
<li><strong>160+ Satisfied Clients</strong> across various industries</li>
<li><strong>End-to-End Services</strong> from planning to execution</li>
<li><strong>Professional Team</strong> of event specialists</li>
<li><strong>Innovative Solutions</strong> tailored to your needs</li>
</ul>

<h2>Our Services Include</h2>
<p>Business conferences, annual celebrations, product launches, award ceremonies, team building events, and much more. Every event is customized to reflect your company's unique culture and objectives.</p>""",
            "form_fields": [
                {
                    "name": "name",
                    "label": "Full Name",
                    "type": "text",
                    "required": True
                },
                {
                    "name": "email",
                    "label": "Email Address",
                    "type": "email",
                    "required": True
                },
                {
                    "name": "phone",
                    "label": "Phone Number",
                    "type": "tel",
                    "required": True
                },
                {
                    "name": "company",
                    "label": "Company Name",
                    "type": "text",
                    "required": False
                },
                {
                    "name": "event_type",
                    "label": "Type of Event",
                    "type": "select",
                    "required": True,
                    "options": [
                        "Annual Conference",
                        "Product Launch",
                        "Awards Ceremony",
                        "Team Building",
                        "Other"
                    ]
                },
                {
                    "name": "budget",
                    "label": "Budget Range",
                    "type": "select",
                    "required": False,
                    "options": [
                        "Under 1 Lakh",
                        "1-3 Lakhs",
                        "3-5 Lakhs",
                        "5+ Lakhs"
                    ]
                },
                {
                    "name": "message",
                    "label": "Event Details",
                    "type": "textarea",
                    "required": False
                }
            ],
            "status": "active"
        }
        
        result = self.make_request('POST', '/items/landing_pages', landing_data)
        if result:
            print(f"✅ Created landing page: '{landing_data['title']}'")
            return True
        return False

    def run_sample_data_creation(self):
        """Create all sample data"""
        print("🚀 Adding Sample Data to Directus Collections...")
        print("=" * 60)
        print(f"📡 Connected to: {self.base_url}")
        
        success_count = 0
        total_items = 4

        # Test connection
        test_result = self.make_request('GET', '/server/info')
        if not test_result:
            print("❌ Failed to connect to Directus. Please check your URL and token.")
            return False

        print("✅ Connection successful!")

        # Add sample data
        if self.add_sample_blog_post():
            success_count += 1
        
        if self.add_sample_service():
            success_count += 1
            
        if self.add_sample_team_member():
            success_count += 1
            
        if self.add_sample_landing_page():
            success_count += 1

        print("\n" + "=" * 60)
        if success_count == total_items:
            print("🎉 All sample data created successfully!")
            print(f"✅ {success_count}/{total_items} items added")
            print("\n📋 What's been created:")
            print("📝 Blog Post: '5 Corporate Event Themes That Will Transform Your Next Celebration'")
            print("🛠️ Service: 'Corporate Annual Events'")
            print("👥 Team Member: 'Prakash A Vaswani - Director'")
            print("🎯 Landing Page: 'Corporate Events Bangalore'")
            print("\n🔗 URLs to test in your app:")
            print("• Blog: /blog/corporate-event-themes-transform-celebration")
            print("• Service: /services/corporate-annual-events")
            print("• Team: /team (will show Prakash)")
            print("• Landing: /landing/corporate-events-bangalore")
            print("\n💡 Next Steps:")
            print("1. Test your Next.js app to see the data loading")
            print("2. Check Directus admin to verify the content")
            print("3. Add more content as needed")
            print("4. Upload actual images to replace placeholders")
        else:
            print(f"⚠️  Partial success: {success_count}/{total_items} items created")

        return success_count == total_items


if __name__ == "__main__":
    try:
        sample_data = DirectusSampleData()
        sample_data.run_sample_data_creation()
    except ValueError as e:
        print(f"❌ Configuration Error: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
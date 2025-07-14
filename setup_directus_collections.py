#!/usr/bin/env python3
"""
Directus Collections Setup Script for White Massif
Creates all required collections and fields automatically
"""

import os
import requests
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class DirectusSetup:
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
            if method == 'GET':
                response = requests.get(url, headers=self.headers)
            elif method == 'POST':
                response = requests.post(url, headers=self.headers, json=data)
            elif method == 'PATCH':
                response = requests.patch(url, headers=self.headers, json=data)
            
            if response.status_code in [200, 201, 204]:
                return response.json() if response.content else {}
            else:
                print(f"❌ Error {response.status_code}: {response.text}")
                return None
                
        except Exception as e:
            print(f"❌ Request failed: {e}")
            return None

    def collection_exists(self, collection_name):
        """Check if collection already exists"""
        result = self.make_request('GET', f'/collections/{collection_name}')
        return result is not None

    def create_collection(self, collection_data):
        """Create a new collection"""
        collection_name = collection_data['collection']
        
        if self.collection_exists(collection_name):
            print(f"⚠️  Collection '{collection_name}' already exists, skipping...")
            return True
        
        print(f"🔨 Creating collection: {collection_name}")
        result = self.make_request('POST', '/collections', collection_data)
        
        if result:
            print(f"✅ Created collection: {collection_name}")
            return True
        else:
            print(f"❌ Failed to create collection: {collection_name}")
            return False

    def create_field(self, collection_name, field_data):
        """Create a field in a collection"""
        field_name = field_data['field']
        print(f"  📝 Creating field: {collection_name}.{field_name}")
        
        result = self.make_request('POST', f'/fields/{collection_name}', field_data)
        
        if result:
            print(f"  ✅ Created field: {field_name}")
            return True
        else:
            print(f"  ❌ Failed to create field: {field_name}")
            return False

    def setup_blog_collection(self):
        """Create Blog collection and fields"""
        print("\n📝 Setting up Blog collection...")
        
        # Create collection
        collection_data = {
            "collection": "blog",
            "meta": {
                "collection": "blog",
                "icon": "article",
                "note": "Blog posts and articles",
                "display_template": "{{title}}",
                "hidden": False,
                "singleton": False,
                "translations": {},
                "archive_field": None,
                "archive_app_filter": True,
                "archive_value": None,
                "unarchive_value": None,
                "sort_field": "id",
                "accountability": "all",
                "color": "#2563eb",
                "item_duplication_fields": None,
                "sort": 1,
                "group": None,
                "collapse": "open"
            },
            "schema": {
                "name": "blog"
            }
        }
        
        if not self.create_collection(collection_data):
            return False

        # Create fields
        fields = [
            {
                "field": "id",
                "type": "integer",
                "meta": {
                    "hidden": True,
                    "readonly": True,
                    "interface": "input",
                    "special": ["auto-increment"]
                },
                "schema": {
                    "is_primary_key": True,
                    "has_auto_increment": True,
                    "is_nullable": False
                }
            },
            {
                "field": "title",
                "type": "string",
                "meta": {
                    "interface": "input",
                    "display": "raw",
                    "readonly": False,
                    "hidden": False,
                    "width": "full",
                    "translations": {},
                    "note": "Blog post title",
                    "validation": {"_and": [{"title": {"_nnull": True}}]}
                },
                "schema": {
                    "is_nullable": False,
                    "max_length": 255
                }
            },
            {
                "field": "slug",
                "type": "string",
                "meta": {
                    "interface": "input",
                    "display": "raw",
                    "readonly": False,
                    "hidden": False,
                    "width": "half",
                    "note": "URL-friendly version of title"
                },
                "schema": {
                    "is_nullable": False,
                    "is_unique": True,
                    "max_length": 255
                }
            },
            {
                "field": "excerpt",
                "type": "text",
                "meta": {
                    "interface": "input-multiline",
                    "display": "raw",
                    "readonly": False,
                    "hidden": False,
                    "width": "full",
                    "note": "Short description of the post"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "content",
                "type": "text",
                "meta": {
                    "interface": "input-rich-text-html",
                    "display": "raw",
                    "readonly": False,
                    "hidden": False,
                    "width": "full",
                    "note": "Full blog post content"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "category",
                "type": "string",
                "meta": {
                    "interface": "select-dropdown",
                    "display": "labels",
                    "readonly": False,
                    "hidden": False,
                    "width": "half",
                    "options": {
                        "choices": [
                            {"text": "Event Themes", "value": "Event Themes"},
                            {"text": "Seasonal Events", "value": "Seasonal Events"},
                            {"text": "Corporate Events", "value": "Corporate Events"},
                            {"text": "Event Planning", "value": "Event Planning"},
                            {"text": "Industry Insights", "value": "Industry Insights"}
                        ]
                    }
                },
                "schema": {
                    "is_nullable": True,
                    "max_length": 100
                }
            },
            {
                "field": "tags",
                "type": "json",
                "meta": {
                    "interface": "tags",
                    "display": "labels",
                    "readonly": False,
                    "hidden": False,
                    "width": "half",
                    "note": "Blog post tags"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "featured_image",
                "type": "uuid",
                "meta": {
                    "interface": "file-image",
                    "display": "image",
                    "readonly": False,
                    "hidden": False,
                    "width": "half",
                    "note": "Featured image for the post"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "published_date",
                "type": "timestamp",
                "meta": {
                    "interface": "datetime",
                    "display": "datetime",
                    "readonly": False,
                    "hidden": False,
                    "width": "half",
                    "note": "When the post was published"
                },
                "schema": {
                    "is_nullable": False,
                    "default_value": "CURRENT_TIMESTAMP"
                }
            },
            {
                "field": "author",
                "type": "string",
                "meta": {
                    "interface": "input",
                    "display": "raw",
                    "readonly": False,
                    "hidden": False,
                    "width": "half",
                    "note": "Author name"
                },
                "schema": {
                    "is_nullable": True,
                    "max_length": 100,
                    "default_value": "White Massif Team"
                }
            },
            {
                "field": "read_time",
                "type": "string",
                "meta": {
                    "interface": "input",
                    "display": "raw",
                    "readonly": False,
                    "hidden": False,
                    "width": "half",
                    "note": "Estimated read time"
                },
                "schema": {
                    "is_nullable": True,
                    "max_length": 50,
                    "default_value": "5 min read"
                }
            },
            {
                "field": "status",
                "type": "string",
                "meta": {
                    "interface": "select-dropdown",
                    "display": "labels",
                    "readonly": False,
                    "hidden": False,
                    "width": "half",
                    "options": {
                        "choices": [
                            {"text": "Draft", "value": "draft"},
                            {"text": "Published", "value": "published"},
                            {"text": "Archived", "value": "archived"}
                        ]
                    }
                },
                "schema": {
                    "is_nullable": False,
                    "max_length": 20,
                    "default_value": "draft"
                }
            }
        ]

        for field in fields:
            self.create_field("blog", field)

        return True

    def setup_services_collection(self):
        """Create Services collection and fields"""
        print("\n🛠️ Setting up Services collection...")
        
        collection_data = {
            "collection": "services",
            "meta": {
                "collection": "services",
                "icon": "work",
                "note": "Service offerings",
                "display_template": "{{title}}",
                "hidden": False,
                "singleton": False,
                "sort_field": "sort_order",
                "accountability": "all",
                "color": "#f59e0b",
                "sort": 2
            },
            "schema": {
                "name": "services"
            }
        }
        
        if not self.create_collection(collection_data):
            return False

        fields = [
            {
                "field": "id",
                "type": "integer",
                "meta": {
                    "hidden": True,
                    "readonly": True,
                    "interface": "input",
                    "special": ["auto-increment"]
                },
                "schema": {
                    "is_primary_key": True,
                    "has_auto_increment": True,
                    "is_nullable": False
                }
            },
            {
                "field": "title",
                "type": "string",
                "meta": {
                    "interface": "input",
                    "width": "full",
                    "note": "Service title"
                },
                "schema": {
                    "is_nullable": False,
                    "max_length": 255
                }
            },
            {
                "field": "slug",
                "type": "string",
                "meta": {
                    "interface": "input",
                    "width": "half",
                    "note": "URL slug"
                },
                "schema": {
                    "is_nullable": False,
                    "is_unique": True,
                    "max_length": 255
                }
            },
            {
                "field": "description",
                "type": "text",
                "meta": {
                    "interface": "input-multiline",
                    "width": "full",
                    "note": "Short description"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "content",
                "type": "text",
                "meta": {
                    "interface": "input-rich-text-html",
                    "width": "full",
                    "note": "Detailed content"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "category",
                "type": "string",
                "meta": {
                    "interface": "select-dropdown",
                    "width": "half",
                    "options": {
                        "choices": [
                            {"text": "Corporate Events", "value": "Corporate Events"},
                            {"text": "Business Events", "value": "Business Events"},
                            {"text": "Celebrations", "value": "Celebrations"},
                            {"text": "Inaugurations", "value": "Inaugurations"},
                            {"text": "Hybrid Events", "value": "Hybrid Events"},
                            {"text": "Special Projects", "value": "Special Projects"}
                        ]
                    }
                },
                "schema": {
                    "is_nullable": True,
                    "max_length": 100
                }
            },
            {
                "field": "featured_image",
                "type": "uuid",
                "meta": {
                    "interface": "file-image",
                    "width": "half"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "gallery",
                "type": "json",
                "meta": {
                    "interface": "list",
                    "width": "full",
                    "note": "Gallery images"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "features",
                "type": "json",
                "meta": {
                    "interface": "list",
                    "width": "full",
                    "note": "Service features"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "stats",
                "type": "json",
                "meta": {
                    "interface": "input-code",
                    "width": "full",
                    "note": "Service statistics"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "sort_order",
                "type": "integer",
                "meta": {
                    "interface": "input",
                    "width": "half"
                },
                "schema": {
                    "is_nullable": True,
                    "default_value": 1
                }
            },
            {
                "field": "status",
                "type": "string",
                "meta": {
                    "interface": "select-dropdown",
                    "width": "half",
                    "options": {
                        "choices": [
                            {"text": "Active", "value": "active"},
                            {"text": "Inactive", "value": "inactive"}
                        ]
                    }
                },
                "schema": {
                    "is_nullable": False,
                    "default_value": "active"
                }
            }
        ]

        for field in fields:
            self.create_field("services", field)

        return True

    def setup_team_members_collection(self):
        """Create Team Members collection and fields"""
        print("\n👥 Setting up Team Members collection...")
        
        collection_data = {
            "collection": "team_members",
            "meta": {
                "collection": "team_members",
                "icon": "people",
                "note": "Team members and staff",
                "display_template": "{{name}} - {{position}}",
                "hidden": False,
                "singleton": False,
                "sort_field": "name",
                "accountability": "all",
                "color": "#10b981",
                "sort": 3
            },
            "schema": {
                "name": "team_members"
            }
        }
        
        if not self.create_collection(collection_data):
            return False

        fields = [
            {
                "field": "id",
                "type": "integer",
                "meta": {
                    "hidden": True,
                    "readonly": True,
                    "interface": "input",
                    "special": ["auto-increment"]
                },
                "schema": {
                    "is_primary_key": True,
                    "has_auto_increment": True,
                    "is_nullable": False
                }
            },
            {
                "field": "name",
                "type": "string",
                "meta": {
                    "interface": "input",
                    "width": "half",
                    "note": "Full name"
                },
                "schema": {
                    "is_nullable": False,
                    "max_length": 255
                }
            },
            {
                "field": "position",
                "type": "string",
                "meta": {
                    "interface": "input",
                    "width": "half",
                    "note": "Job title/position"
                },
                "schema": {
                    "is_nullable": False,
                    "max_length": 255
                }
            },
            {
                "field": "department",
                "type": "string",
                "meta": {
                    "interface": "select-dropdown",
                    "width": "half",
                    "options": {
                        "choices": [
                            {"text": "Leadership", "value": "Leadership"},
                            {"text": "Creative", "value": "Creative"},
                            {"text": "Operations", "value": "Operations"},
                            {"text": "Client Relations", "value": "Client Relations"},
                            {"text": "Production", "value": "Production"},
                            {"text": "Finance", "value": "Finance"},
                            {"text": "HR", "value": "HR"},
                            {"text": "Marketing", "value": "Marketing"}
                        ]
                    }
                },
                "schema": {
                    "is_nullable": True,
                    "max_length": 100
                }
            },
            {
                "field": "bio",
                "type": "text",
                "meta": {
                    "interface": "input-multiline",
                    "width": "full",
                    "note": "Brief biography"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "image",
                "type": "uuid",
                "meta": {
                    "interface": "file-image",
                    "width": "half",
                    "note": "Profile photo"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "email",
                "type": "string",
                "meta": {
                    "interface": "input",
                    "width": "half",
                    "note": "Work email"
                },
                "schema": {
                    "is_nullable": True,
                    "max_length": 255
                }
            },
            {
                "field": "linkedin",
                "type": "string",
                "meta": {
                    "interface": "input",
                    "width": "half",
                    "note": "LinkedIn profile URL"
                },
                "schema": {
                    "is_nullable": True,
                    "max_length": 255
                }
            },
            {
                "field": "years_experience",
                "type": "integer",
                "meta": {
                    "interface": "input",
                    "width": "half",
                    "note": "Years of experience"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "status",
                "type": "string",
                "meta": {
                    "interface": "select-dropdown",
                    "width": "half",
                    "options": {
                        "choices": [
                            {"text": "Active", "value": "active"},
                            {"text": "Inactive", "value": "inactive"}
                        ]
                    }
                },
                "schema": {
                    "is_nullable": False,
                    "default_value": "active"
                }
            }
        ]

        for field in fields:
            self.create_field("team_members", field)

        return True

    def setup_landing_pages_collection(self):
        """Create Landing Pages collection and fields"""
        print("\n🎯 Setting up Landing Pages collection...")
        
        collection_data = {
            "collection": "landing_pages",
            "meta": {
                "collection": "landing_pages",
                "icon": "web",
                "note": "Landing pages for marketing campaigns",
                "display_template": "{{title}}",
                "hidden": False,
                "singleton": False,
                "sort_field": "title",
                "accountability": "all",
                "color": "#8b5cf6",
                "sort": 4
            },
            "schema": {
                "name": "landing_pages"
            }
        }
        
        if not self.create_collection(collection_data):
            return False

        fields = [
            {
                "field": "id",
                "type": "integer",
                "meta": {
                    "hidden": True,
                    "readonly": True,
                    "interface": "input",
                    "special": ["auto-increment"]
                },
                "schema": {
                    "is_primary_key": True,
                    "has_auto_increment": True,
                    "is_nullable": False
                }
            },
            {
                "field": "title",
                "type": "string",
                "meta": {
                    "interface": "input",
                    "width": "full"
                },
                "schema": {
                    "is_nullable": False,
                    "max_length": 255
                }
            },
            {
                "field": "slug",
                "type": "string",
                "meta": {
                    "interface": "input",
                    "width": "half"
                },
                "schema": {
                    "is_nullable": False,
                    "is_unique": True,
                    "max_length": 255
                }
            },
            {
                "field": "template",
                "type": "string",
                "meta": {
                    "interface": "select-dropdown",
                    "width": "half",
                    "options": {
                        "choices": [
                            {"text": "Service Landing", "value": "service"},
                            {"text": "Event Landing", "value": "event"},
                            {"text": "Campaign Landing", "value": "campaign"},
                            {"text": "General Landing", "value": "general"}
                        ]
                    }
                },
                "schema": {
                    "is_nullable": False,
                    "default_value": "general"
                }
            },
            {
                "field": "hero_title",
                "type": "string",
                "meta": {
                    "interface": "input",
                    "width": "full"
                },
                "schema": {
                    "is_nullable": True,
                    "max_length": 255
                }
            },
            {
                "field": "hero_subtitle",
                "type": "text",
                "meta": {
                    "interface": "input-multiline",
                    "width": "full"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "hero_image",
                "type": "uuid",
                "meta": {
                    "interface": "file-image",
                    "width": "half"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "hero_video",
                "type": "uuid",
                "meta": {
                    "interface": "file",
                    "width": "half"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "cta_text",
                "type": "string",
                "meta": {
                    "interface": "input",
                    "width": "half"
                },
                "schema": {
                    "is_nullable": True,
                    "max_length": 100,
                    "default_value": "Get Started"
                }
            },
            {
                "field": "content",
                "type": "text",
                "meta": {
                    "interface": "input-rich-text-html",
                    "width": "full"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "form_fields",
                "type": "json",
                "meta": {
                    "interface": "input-code",
                    "width": "full",
                    "note": "Lead capture form fields configuration"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "tracking_code",
                "type": "text",
                "meta": {
                    "interface": "input-code",
                    "width": "full",
                    "note": "Analytics/tracking scripts"
                },
                "schema": {
                    "is_nullable": True
                }
            },
            {
                "field": "status",
                "type": "string",
                "meta": {
                    "interface": "select-dropdown",
                    "width": "half",
                    "options": {
                        "choices": [
                            {"text": "Active", "value": "active"},
                            {"text": "Inactive", "value": "inactive"}
                        ]
                    }
                },
                "schema": {
                    "is_nullable": False,
                    "default_value": "active"
                }
            }
        ]

        for field in fields:
            self.create_field("landing_pages", field)

        return True

    def run_setup(self):
        """Run the complete setup process"""
        print("🚀 Setting up Directus Collections for White Massif...")
        print("=" * 60)
        print(f"📡 Connecting to: {self.base_url}")
        
        success_count = 0
        total_collections = 4

        # Test connection
        test_result = self.make_request('GET', '/server/info')
        if not test_result:
            print("❌ Failed to connect to Directus. Please check your URL and token.")
            return False

        print(f"✅ Connected to Directus successfully!")
        print(f"🏢 Project: {test_result.get('project', {}).get('project_name', 'Unknown')}")

        # Setup collections
        if self.setup_blog_collection():
            success_count += 1
        
        if self.setup_services_collection():
            success_count += 1
            
        if self.setup_team_members_collection():
            success_count += 1
            
        if self.setup_landing_pages_collection():
            success_count += 1

        print("\n" + "=" * 60)
        if success_count == total_collections:
            print("🎉 All collections created successfully!")
            print(f"✅ {success_count}/{total_collections} collections ready")
            print("\n📋 Next Steps:")
            print("1. Check your Directus admin panel to verify collections")
            print("2. Run the data migration script to populate content")
            print("3. Upload sample images to the media library")
            print("4. Test your Next.js application")
        else:
            print(f"⚠️  Partial success: {success_count}/{total_collections} collections created")
            print("Please check the errors above and retry if needed.")

        return success_count == total_collections


if __name__ == "__main__":
    try:
        setup = DirectusSetup()
        setup.run_setup()
    except ValueError as e:
        print(f"❌ Configuration Error: {e}")
        print("\n💡 Make sure to:")
        print("1. Get your admin token from Directus admin panel")
        print("2. Update DIRECTUS_TOKEN in your .env file")
        print("3. Verify DIRECTUS_URL is correct")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
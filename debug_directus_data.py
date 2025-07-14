#!/usr/bin/env python3
"""
Debug Directus Data - Check what's actually in the collections
"""

import os
import requests
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class DirectusDebug:
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

    def make_request(self, endpoint):
        """Make HTTP request to Directus API"""
        url = f"{self.base_url}{endpoint}"
        
        try:
            response = requests.get(url, headers=self.headers)
            
            if response.status_code in [200, 201, 204]:
                return response.json() if response.content else {}
            else:
                print(f"❌ Error {response.status_code}: {response.text}")
                return None
                
        except Exception as e:
            print(f"❌ Request failed: {e}")
            return None

    def check_collection(self, collection_name):
        """Check what's in a collection"""
        print(f"\n🔍 Checking {collection_name} collection...")
        
        # Get all items without filters
        result = self.make_request(f'/items/{collection_name}')
        
        if result and 'data' in result:
            items = result['data']
            print(f"📊 Total items: {len(items)}")
            
            if items:
                first_item = items[0]
                print(f"📝 First item structure:")
                for key, value in first_item.items():
                    if key == 'status':
                        print(f"  {key}: '{value}' ← STATUS FIELD")
                    elif isinstance(value, str) and len(value) > 50:
                        print(f"  {key}: '{value[:50]}...'")
                    else:
                        print(f"  {key}: {value}")
                
                # Check status values
                statuses = [item.get('status') for item in items if 'status' in item]
                unique_statuses = list(set(statuses))
                print(f"🏷️  Status values found: {unique_statuses}")
            else:
                print("📭 No items found in collection")
        else:
            print("❌ Failed to fetch collection data")

    def run_debug(self):
        """Run complete debug check"""
        print("🚀 Debugging Directus Collections...")
        print("=" * 60)
        print(f"📡 Connected to: {self.base_url}")
        
        # Test connection
        test_result = self.make_request('/server/info')
        if not test_result:
            print("❌ Failed to connect to Directus. Please check your URL and token.")
            return False

        print("✅ Connection successful!")
        
        # Check all collections
        collections = ['blog', 'services', 'team_members', 'landing_pages']
        
        for collection in collections:
            self.check_collection(collection)
        
        print("\n" + "=" * 60)
        print("🎯 Debug Summary:")
        print("1. Check the STATUS values above")
        print("2. Blog posts should have status: 'published'")
        print("3. Other collections should have status: 'active'")
        print("4. If no items found, run the sample data script again")
        print("\n💡 Next steps:")
        print("1. Fix any status mismatches in Directus admin")
        print("2. Test your Next.js app")
        print("3. Check browser console for API errors")


if __name__ == "__main__":
    try:
        debug = DirectusDebug()
        debug.run_debug()
    except ValueError as e:
        print(f"❌ Configuration Error: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
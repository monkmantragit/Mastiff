// Test Directus token directly
const token = 'FAE0VL3TIn4xLMtYP07yFGjIks5km0Kl';
const url = 'https://directus-production-bc75.up.railway.app';

async function testToken() {
  console.log('🔍 Testing Directus token...');
  
  try {
    // Test 1: Server info (should work with any valid token)
    console.log('\n1. Testing server info...');
    const serverResponse = await fetch(`${url}/server/info`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`Server info: ${serverResponse.status} ${serverResponse.statusText}`);
    
    // Test 2: Collections (check if blog collection exists)
    console.log('\n2. Testing collections...');
    const collectionsResponse = await fetch(`${url}/collections`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`Collections: ${collectionsResponse.status} ${collectionsResponse.statusText}`);
    
    // Test 3: Blog items (the actual failing request)
    console.log('\n3. Testing blog items...');
    const blogResponse = await fetch(`${url}/items/blog`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`Blog items: ${blogResponse.status} ${blogResponse.statusText}`);
    
    if (blogResponse.status === 200) {
      const data = await blogResponse.json();
      console.log('Blog data:', data);
    } else {
      const error = await blogResponse.text();
      console.log('Blog error:', error);
    }
    
    // Test 4: Without token (public access)
    console.log('\n4. Testing public access (no token)...');
    const publicResponse = await fetch(`${url}/items/blog`);
    console.log(`Public access: ${publicResponse.status} ${publicResponse.statusText}`);
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testToken();
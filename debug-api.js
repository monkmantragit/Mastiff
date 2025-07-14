#!/usr/bin/env node

const DIRECTUS_URL = 'https://directus-production-bc75.up.railway.app';
const DIRECTUS_TOKEN = 'FAE0VL3TIn4xLMtYP07yFGjIks5km0Kl';

async function debugAPI() {
  const fetch = (await import('node-fetch')).default;
  
  try {
    console.log('Testing API connection...');
    
    const response = await fetch(`${DIRECTUS_URL}/items/blog?fields=id&limit=5`, {
      headers: {
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('Response text:', text);
    
    if (text) {
      try {
        const data = JSON.parse(text);
        console.log('Parsed data:', data);
      } catch (e) {
        console.log('Failed to parse JSON:', e.message);
      }
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

debugAPI();
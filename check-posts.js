#!/usr/bin/env node

const DIRECTUS_URL = 'https://directus-production-bc75.up.railway.app';
const DIRECTUS_TOKEN = 'FAE0VL3TIn4xLMtYP07yFGjIks5km0Kl';

async function checkPosts() {
  const fetch = (await import('node-fetch')).default;
  
  try {
    const response = await fetch(`${DIRECTUS_URL}/items/blog?fields=id,title,slug,content`, {
      headers: {
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    const posts = data.data || data;
    
    console.log('Existing blog posts in Directus:');
    posts.forEach(post => {
      console.log(`- ID: ${post.id}, Title: ${post.title}`);
      console.log(`  Slug: ${post.slug || 'null'}`);
      console.log(`  Content: ${post.content ? post.content.substring(0, 50) + '...' : 'null'}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkPosts();
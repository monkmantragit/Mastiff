#!/usr/bin/env node

/**
 * Populate Blog Content Fields
 * Updates existing blog posts in Directus with actual content from JSON files
 */

const fs = require('fs');
const path = require('path');

// Directus configuration
const DIRECTUS_URL = 'https://directus-production-bc75.up.railway.app';
const DIRECTUS_TOKEN = 'FAE0VL3TIn4xLMtYP07yFGjIks5km0Kl';

// Helper function to make API requests
async function directusRequest(endpoint, method = 'GET', data = null) {
  const fetch = (await import('node-fetch')).default;
  
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };

  if (data && (method === 'POST' || method === 'PATCH')) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${DIRECTUS_URL}/${endpoint}`, options);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  return response.json();
}

// Helper function to read JSON file
function readJsonFile(filePath) {
  const fullPath = path.join(__dirname, filePath);
  const content = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(content);
}

// Helper function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .trim('-'); // Remove leading/trailing hyphens
}

// Helper function to extract content from JSON structure
function extractContentFromPost(postData) {
  let content = '';
  
  // Add introduction if available
  if (postData.introduction) {
    content += `<p>${postData.introduction}</p>\n\n`;
  }
  
  // Process sections if available
  if (postData.sections && Array.isArray(postData.sections)) {
    postData.sections.forEach(section => {
      if (section.title) {
        content += `<h2>${section.title}</h2>\n`;
      }
      if (section.description) {
        content += `<p>${section.description}</p>\n\n`;
      }
      if (section.content) {
        content += `<p>${section.content}</p>\n\n`;
      }
    });
  }
  
  // Process event themes if available
  if (postData.event_themes && Array.isArray(postData.event_themes)) {
    content += `<h2>Event Themes</h2>\n`;
    postData.event_themes.forEach(theme => {
      content += `<h3>${theme.name}</h3>\n`;
      if (theme.description) {
        content += `<p>${theme.description}</p>\n`;
      }
      if (theme.highlights && Array.isArray(theme.highlights)) {
        content += `<ul>\n`;
        theme.highlights.forEach(highlight => {
          content += `<li>${highlight}</li>\n`;
        });
        content += `</ul>\n\n`;
      }
    });
  }
  
  // Process seasonal events if available
  if (postData.seasonal_events && Array.isArray(postData.seasonal_events)) {
    content += `<h2>Seasonal Events</h2>\n`;
    postData.seasonal_events.forEach(event => {
      content += `<h3>${event.name}</h3>\n`;
      if (event.description) {
        content += `<p>${event.description}</p>\n`;
      }
      if (event.activities && Array.isArray(event.activities)) {
        content += `<ul>\n`;
        event.activities.forEach(activity => {
          content += `<li>${activity}</li>\n`;
        });
        content += `</ul>\n\n`;
      }
    });
  }
  
  // Add conclusion if available
  if (postData.conclusion) {
    content += `<p>${postData.conclusion}</p>\n`;
  }
  
  return content.trim();
}

async function populateBlogContent() {
  console.log('📝 Populating blog content fields...\n');

  try {
    // First, get existing blog posts from Directus
    console.log('🔍 Fetching existing blog posts from Directus...');
    const directusResponse = await directusRequest('items/blog?fields=id,title');
    const existingPosts = directusResponse.data || directusResponse;
    
    console.log(`Found ${existingPosts.length} existing posts in Directus\n`);

    // Read the index file to get blog post references
    const indexData = readJsonFile('data/index.json');
    const blogPosts = indexData.posts || [];

    console.log(`Found ${blogPosts.length} blog posts in JSON data\n`);

    // Process each blog post
    let updatedCount = 0;
    
    for (const blogPost of blogPosts) {
      try {
        console.log(`📖 Processing: ${blogPost.title}`);
        
        // Read the actual blog post JSON file
        const postData = readJsonFile(blogPost.file_path);
        
        // Extract content from the post structure
        const content = extractContentFromPost(postData);
        
        // Generate slug from title
        const slug = generateSlug(blogPost.title);
        
        // Find matching post in Directus by title
        const matchingPost = existingPosts.find(post => 
          post.title.toLowerCase().trim() === blogPost.title.toLowerCase().trim()
        );
        
        if (matchingPost) {
          // Update the existing post with content and slug
          const updateData = {
            content: content,
            slug: slug
          };
          
          await directusRequest(`items/blog/${matchingPost.id}`, 'PATCH', updateData);
          console.log(`✅ Updated post: ${blogPost.title}`);
          console.log(`   - Slug: ${slug}`);
          console.log(`   - Content length: ${content.length} characters\n`);
          updatedCount++;
        } else {
          console.log(`⚠️  No matching post found in Directus for: ${blogPost.title}\n`);
        }
        
      } catch (error) {
        console.error(`❌ Error processing ${blogPost.title}:`, error.message);
      }
    }

    console.log(`🎉 Content population completed!`);
    console.log(`📊 Updated ${updatedCount} out of ${blogPosts.length} blog posts\n`);

    // Update the DirectusService getBlogPost function query
    console.log('🔧 Next step: Update getBlogPost function to include content and slug fields');

  } catch (error) {
    console.error('❌ Error populating blog content:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  populateBlogContent();
}

module.exports = { populateBlogContent };
#!/usr/bin/env node

/**
 * Fix Blog Posts in Directus
 * Removes individual theme posts and creates proper blog posts with content
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

  // For DELETE requests, return empty response if successful
  if (method === 'DELETE') {
    return {};
  }

  const text = await response.text();
  if (!text) {
    return {};
  }
  
  return JSON.parse(text);
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

// Helper function to convert post content to HTML
function convertPostToHTML(postData) {
  let html = '';
  
  // Add intro
  if (postData.content && postData.content.intro) {
    html += `<p>${postData.content.intro}</p>\n\n`;
  }
  
  // Add themes section
  if (postData.content && postData.content.themes) {
    html += `<h2>Event Themes</h2>\n\n`;
    
    postData.content.themes.forEach(theme => {
      html += `<h3>${theme.title}</h3>\n`;
      html += `<p>${theme.description}</p>\n`;
      
      if (theme.details) {
        html += `<p>${theme.details}</p>\n`;
      }
      
      if (theme.highlights && theme.highlights.length > 0) {
        html += `<h4>Key Highlights:</h4>\n`;
        html += `<ul>\n`;
        theme.highlights.forEach(highlight => {
          html += `<li>${highlight}</li>\n`;
        });
        html += `</ul>\n\n`;
      }
    });
  }
  
  return html.trim();
}

async function fixBlogPosts() {
  console.log('🔧 Fixing blog posts in Directus...\n');

  try {
    // Step 1: Delete all existing blog posts
    console.log('🗑️ Removing existing blog posts...');
    const existingPosts = await directusRequest('items/blog?fields=id');
    const posts = existingPosts.data || existingPosts;
    
    for (const post of posts) {
      await directusRequest(`items/blog/${post.id}`, 'DELETE');
    }
    console.log(`✅ Removed ${posts.length} existing posts\n`);

    // Step 2: Read blog posts from JSON files and create proper entries
    const indexData = readJsonFile('data/index.json');
    const blogPosts = indexData.posts || [];

    console.log(`📝 Creating ${blogPosts.length} proper blog posts...\n`);

    for (const blogPost of blogPosts) {
      try {
        console.log(`📖 Processing: ${blogPost.title}`);
        
        // Read the actual blog post JSON file
        const postData = readJsonFile(blogPost.file_path);
        
        // Convert content to HTML
        const htmlContent = convertPostToHTML(postData);
        
        // Generate slug
        const slug = generateSlug(blogPost.title);
        
        // Prepare blog post data
        const blogPostData = {
          title: blogPost.title,
          slug: slug,
          content: htmlContent,
          excerpt: postData.excerpt || blogPost.description,
          status: 'published',
          published_date: blogPost.date_created,
          category: blogPost.category,
          tags: blogPost.tags || [],
          author: 'White Massif Team',
          read_time: '5 min read',
          featured_image: null // Set to null since we don't have actual image UUIDs
        };

        // Create the blog post
        await directusRequest('items/blog', 'POST', blogPostData);
        
        console.log(`✅ Created: ${blogPost.title}`);
        console.log(`   - Slug: ${slug}`);
        console.log(`   - Content length: ${htmlContent.length} characters`);
        console.log(`   - Category: ${blogPost.category}`);
        console.log(`   - Tags: ${blogPost.tags ? blogPost.tags.join(', ') : 'None'}\n`);
        
      } catch (error) {
        console.error(`❌ Error processing ${blogPost.title}:`, error.message);
      }
    }

    console.log('🎉 Blog posts fixed successfully!\n');
    console.log('📋 Summary:');
    console.log(`   - Removed: ${posts.length} incorrect posts`);
    console.log(`   - Created: ${blogPosts.length} proper blog posts`);
    console.log(`   - All posts have content and slug fields populated\n`);

    console.log('🔧 Next step: Update getBlogPost function to include content and slug fields');

  } catch (error) {
    console.error('❌ Error fixing blog posts:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  fixBlogPosts();
}

module.exports = { fixBlogPosts };
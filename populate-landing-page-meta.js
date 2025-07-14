#!/usr/bin/env node

/**
 * Populate Meta Fields for Landing Pages
 * Updates existing landing pages with meta_title and meta_description
 */

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

  const text = await response.text();
  if (!text) {
    return {};
  }
  
  return JSON.parse(text);
}

// Helper function to generate meta description from content
function generateMetaDescription(content, maxLength = 160) {
  if (!content) return '';
  
  // Strip HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  // Truncate at word boundary
  const truncated = plainText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}

async function populateLandingPageMeta() {
  console.log('📝 Populating meta fields for landing pages...\n');

  try {
    // Get all landing pages
    console.log('🔍 Fetching existing landing pages...');
    const response = await directusRequest('items/landing_pages?fields=id,title,content,slug');
    const landingPages = response.data || response;
    
    console.log(`Found ${landingPages.length} landing pages\n`);

    let updatedCount = 0;

    for (const page of landingPages) {
      try {
        console.log(`📄 Processing: ${page.title}`);
        
        // Generate meta_title from title
        const metaTitle = page.title.length > 60 
          ? page.title.substring(0, 57) + '...'
          : page.title;
        
        // Generate meta_description from content or title
        let metaDescription = '';
        if (page.content) {
          metaDescription = generateMetaDescription(page.content);
        } else {
          // Fallback to a description based on title and context
          metaDescription = `${page.title} - Professional corporate event management and planning services by White Massif in Bangalore.`;
        }
        
        // Ensure meta_description is not too long
        if (metaDescription.length > 160) {
          metaDescription = metaDescription.substring(0, 157) + '...';
        }
        
        // Update the landing page
        const updateData = {
          meta_title: metaTitle,
          meta_description: metaDescription
        };
        
        await directusRequest(`items/landing_pages/${page.id}`, 'PATCH', updateData);
        
        console.log(`✅ Updated: ${page.title}`);
        console.log(`   Meta Title: ${metaTitle}`);
        console.log(`   Meta Description: ${metaDescription}\n`);
        
        updatedCount++;
        
      } catch (error) {
        console.error(`❌ Error processing ${page.title}:`, error.message);
      }
    }

    console.log(`🎉 Meta fields populated successfully!`);
    console.log(`📊 Updated ${updatedCount} out of ${landingPages.length} landing pages\n`);

  } catch (error) {
    console.error('❌ Error populating meta fields:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  populateLandingPageMeta();
}

module.exports = { populateLandingPageMeta };
#!/usr/bin/env node

/**
 * Add Missing Fields to Landing Pages Collection
 * Adds meta_title and meta_description fields
 */

// Directus configuration
const DIRECTUS_URL = 'https://directus-production-bc75.up.railway.app';
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN; // never hardcode: set DIRECTUS_TOKEN in your shell or .env.local

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

async function addMissingLandingPageFields() {
  console.log('🔧 Adding missing fields to landing_pages collection...\n');

  try {
    // 1. Add meta_title field
    console.log('📝 Adding meta_title field...');
    const metaTitleField = {
      collection: 'landing_pages',
      field: 'meta_title',
      type: 'string',
      schema: {
        data_type: 'character varying',
        max_length: 255,
        is_nullable: true
      },
      meta: {
        interface: 'input',
        display: 'raw',
        note: 'SEO meta title for the landing page',
        sort: 20,
        width: 'full',
        options: {
          placeholder: 'Enter SEO title (60 characters max recommended)'
        }
      }
    };

    await directusRequest('fields/landing_pages', 'POST', metaTitleField);
    console.log('✅ Added meta_title field');

    // 2. Add meta_description field
    console.log('📝 Adding meta_description field...');
    const metaDescriptionField = {
      collection: 'landing_pages',
      field: 'meta_description',
      type: 'text',
      schema: {
        data_type: 'text',
        is_nullable: true
      },
      meta: {
        interface: 'input-multiline',
        display: 'raw',
        note: 'SEO meta description for the landing page',
        sort: 21,
        width: 'full',
        options: {
          placeholder: 'Enter SEO description (160 characters max recommended)'
        }
      }
    };

    await directusRequest('fields/landing_pages', 'POST', metaDescriptionField);
    console.log('✅ Added meta_description field');

    console.log('\n🎉 Missing fields added successfully!');
    console.log('\n📋 Added fields:');
    console.log('   📄 landing_pages.meta_title (String)');
    console.log('   📄 landing_pages.meta_description (Text)');

  } catch (error) {
    console.error('❌ Error adding fields:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  addMissingLandingPageFields();
}

module.exports = { addMissingLandingPageFields };
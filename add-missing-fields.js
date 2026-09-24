#!/usr/bin/env node

/**
 * Add Missing Fields to Directus Collections
 * Adds content and slug fields to blog, services, team_members, and landing_pages
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

  return response.json();
}

async function addMissingFields() {
  console.log('🔧 Adding missing fields to Directus collections...\n');

  try {
    // 1. Add content field to blog collection (Rich Text)
    console.log('📝 Adding content field to blog collection...');
    const blogContentField = {
      collection: 'blog',
      field: 'content',
      type: 'text',
      schema: {
        data_type: 'text',
        is_nullable: true
      },
      meta: {
        interface: 'input-rich-text-html',
        display: 'raw',
        note: 'Main blog post content (HTML)',
        sort: 11,
        width: 'full',
        options: {
          toolbar: [
            'bold', 'italic', 'underline', 'strikethrough',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'blockquote', 'code', 'pre',
            'bullist', 'numlist',
            'link', 'unlink',
            'image', 'media',
            'table',
            'undo', 'redo',
            'removeformat', 'fullscreen'
          ]
        }
      }
    };

    await directusRequest('fields/blog', 'POST', blogContentField);
    console.log('✅ Added content field to blog collection');

    // 2. Add slug field to blog collection
    console.log('📝 Adding slug field to blog collection...');
    const blogSlugField = {
      collection: 'blog',
      field: 'slug',
      type: 'string',
      schema: {
        data_type: 'character varying',
        max_length: 255,
        is_nullable: true,
        is_unique: true
      },
      meta: {
        interface: 'input',
        display: 'raw',
        note: 'URL-friendly identifier for the post',
        sort: 12,
        width: 'half',
        readonly: false,
        options: {
          placeholder: 'auto-generated-from-title'
        }
      }
    };

    await directusRequest('fields/blog', 'POST', blogSlugField);
    console.log('✅ Added slug field to blog collection');

    // 3. Add content field to services collection
    console.log('🛠️ Adding content field to services collection...');
    const servicesContentField = {
      collection: 'services',
      field: 'content',
      type: 'text',
      schema: {
        data_type: 'text',
        is_nullable: true
      },
      meta: {
        interface: 'input-rich-text-html',
        display: 'raw',
        note: 'Detailed service content (HTML)',
        sort: 15,
        width: 'full',
        options: {
          toolbar: [
            'bold', 'italic', 'underline',
            'h1', 'h2', 'h3', 'h4',
            'blockquote', 'code',
            'bullist', 'numlist',
            'link', 'unlink',
            'image', 'media',
            'table'
          ]
        }
      }
    };

    await directusRequest('fields/services', 'POST', servicesContentField);
    console.log('✅ Added content field to services collection');

    // 4. Add bio field to team_members collection (if not exists)
    console.log('👥 Checking team_members bio field...');
    try {
      // Try to get existing bio field
      await directusRequest('fields/team_members/bio');
      console.log('✅ Bio field already exists in team_members collection');
    } catch (error) {
      // Bio field doesn't exist, create it
      console.log('👥 Adding bio field to team_members collection...');
      const teamBioField = {
        collection: 'team_members',
        field: 'bio',
        type: 'text',
        schema: {
          data_type: 'text',
          is_nullable: true
        },
        meta: {
          interface: 'input-multiline',
          display: 'raw',
          note: 'Team member biography',
          sort: 20,
          width: 'full'
        }
      };

      await directusRequest('fields/team_members', 'POST', teamBioField);
      console.log('✅ Added bio field to team_members collection');
    }

    // 5. Add content field to landing_pages collection
    console.log('📄 Adding content field to landing_pages collection...');
    const landingContentField = {
      collection: 'landing_pages',
      field: 'content',
      type: 'text',
      schema: {
        data_type: 'text',
        is_nullable: true
      },
      meta: {
        interface: 'input-rich-text-html',
        display: 'raw',
        note: 'Landing page content (HTML)',
        sort: 25,
        width: 'full',
        options: {
          toolbar: [
            'bold', 'italic', 'underline',
            'h1', 'h2', 'h3',
            'blockquote',
            'bullist', 'numlist',
            'link', 'unlink',
            'image'
          ]
        }
      }
    };

    await directusRequest('fields/landing_pages', 'POST', landingContentField);
    console.log('✅ Added content field to landing_pages collection');

    console.log('\n🎉 All missing fields added successfully!');
    console.log('\n📋 Summary of fields added:');
    console.log('   📝 blog.content (Rich Text)');
    console.log('   📝 blog.slug (Unique String)');
    console.log('   🛠️  services.content (Rich Text)');
    console.log('   👥 team_members.bio (Text)');
    console.log('   📄 landing_pages.content (Rich Text)');

    console.log('\n🎯 Next Steps:');
    console.log('1. Update API calls to include content and slug fields');
    console.log('2. Re-run migration with proper content');
    console.log('3. Configure field permissions for public access');
    console.log('4. Test content display on frontend');

  } catch (error) {
    console.error('❌ Error adding fields:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  addMissingFields();
}

module.exports = { addMissingFields };
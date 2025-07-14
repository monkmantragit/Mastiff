#!/usr/bin/env node

/**
 * Setup Form Collections in Directus
 * Creates collections for all form submissions with proper field types
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

// Collection definitions
const collections = [
  {
    collection: 'form_submissions',
    meta: {
      collection: 'form_submissions',
      note: 'All website form submissions including contact, enquiry, and landing page forms',
      display_template: '{{name}} - {{form_type}} ({{date_created}})',
      hidden: false,
      singleton: false,
      icon: 'mail',
      color: '#F9A625',
      sort_field: 'date_created'
    },
    schema: {
      name: 'form_submissions'
    }
  },
  {
    collection: 'newsletter_subscribers',
    meta: {
      collection: 'newsletter_subscribers',
      note: 'Email newsletter subscriptions from footer and other signup forms',
      display_template: '{{email}} ({{date_created}})',
      hidden: false,
      singleton: false,
      icon: 'mail_outline',
      color: '#2A3959',
      sort_field: 'date_created'
    },
    schema: {
      name: 'newsletter_subscribers'
    }
  },
  {
    collection: 'feedback_responses',
    meta: {
      collection: 'feedback_responses',
      note: 'Website feedback and review responses from clients and visitors',
      display_template: '{{name}} - {{overall_rating}}/5 ({{date_created}})',
      hidden: false,
      singleton: false,
      icon: 'feedback',
      color: '#10B981',
      sort_field: 'date_created'
    },
    schema: {
      name: 'feedback_responses'
    }
  }
];

// Field definitions for each collection
const fieldDefinitions = {
  form_submissions: [
    {
      field: 'id',
      type: 'integer',
      schema: {
        is_primary_key: true,
        has_auto_increment: true,
        is_nullable: false
      },
      meta: {
        hidden: true,
        readonly: true
      }
    },
    {
      field: 'form_type',
      type: 'string',
      schema: {
        data_type: 'character varying',
        max_length: 50,
        is_nullable: false
      },
      meta: {
        interface: 'select-dropdown',
        display: 'labels',
        note: 'Type of form submitted',
        sort: 1,
        width: 'half',
        options: {
          choices: [
            { text: 'Contact Form', value: 'contact' },
            { text: 'Enquiry Popup', value: 'enquiry' },
            { text: 'Landing Page Form', value: 'landing' },
            { text: 'Quick Quote', value: 'quote' }
          ]
        }
      }
    },
    {
      field: 'name',
      type: 'string',
      schema: {
        data_type: 'character varying',
        max_length: 255,
        is_nullable: true
      },
      meta: {
        interface: 'input',
        display: 'raw',
        note: 'Full name of the person submitting the form',
        sort: 2,
        width: 'half'
      }
    },
    {
      field: 'email',
      type: 'string',
      schema: {
        data_type: 'character varying',
        max_length: 255,
        is_nullable: false
      },
      meta: {
        interface: 'input',
        display: 'raw',
        note: 'Email address (required field)',
        sort: 3,
        width: 'half',
        validation: {
          _and: [
            {
              email: {
                _regex: '^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$'
              }
            }
          ]
        }
      }
    },
    {
      field: 'phone',
      type: 'string',
      schema: {
        data_type: 'character varying',
        max_length: 20,
        is_nullable: true
      },
      meta: {
        interface: 'input',
        display: 'raw',
        note: 'Phone number',
        sort: 4,
        width: 'half'
      }
    },
    {
      field: 'company',
      type: 'string',
      schema: {
        data_type: 'character varying',
        max_length: 255,
        is_nullable: true
      },
      meta: {
        interface: 'input',
        display: 'raw',
        note: 'Company or organization name',
        sort: 5,
        width: 'half'
      }
    },
    {
      field: 'event_type',
      type: 'string',
      schema: {
        data_type: 'character varying',
        max_length: 100,
        is_nullable: true
      },
      meta: {
        interface: 'select-dropdown',
        display: 'labels',
        note: 'Type of event being planned',
        sort: 6,
        width: 'half',
        options: {
          choices: [
            { text: 'Corporate Event', value: 'corporate' },
            { text: 'Celebration', value: 'celebration' },
            { text: 'Inauguration', value: 'inauguration' },
            { text: 'Hybrid Event', value: 'hybrid' },
            { text: 'Convention', value: 'convention' },
            { text: 'Special Event', value: 'special' },
            { text: 'Conference', value: 'conference' },
            { text: 'Product Launch', value: 'product_launch' },
            { text: 'Team Building', value: 'team_building' }
          ]
        }
      }
    },
    {
      field: 'event_date',
      type: 'date',
      schema: {
        is_nullable: true
      },
      meta: {
        interface: 'datetime',
        display: 'datetime',
        note: 'Preferred event date',
        sort: 7,
        width: 'half'
      }
    },
    {
      field: 'location',
      type: 'string',
      schema: {
        data_type: 'character varying',
        max_length: 255,
        is_nullable: true
      },
      meta: {
        interface: 'input',
        display: 'raw',
        note: 'Event location or venue preference',
        sort: 8,
        width: 'half'
      }
    },
    {
      field: 'message',
      type: 'text',
      schema: {
        data_type: 'text',
        is_nullable: true
      },
      meta: {
        interface: 'input-multiline',
        display: 'raw',
        note: 'Message or additional details',
        sort: 9,
        width: 'full'
      }
    },
    {
      field: 'source',
      type: 'string',
      schema: {
        data_type: 'character varying',
        max_length: 255,
        is_nullable: true
      },
      meta: {
        interface: 'input',
        display: 'raw',
        note: 'Source of the form submission (page, campaign, etc.)',
        sort: 10,
        width: 'half'
      }
    },
    {
      field: 'form_data',
      type: 'json',
      schema: {
        data_type: 'json',
        is_nullable: true
      },
      meta: {
        interface: 'input-code',
        display: 'raw',
        note: 'Complete form data as JSON for reference',
        sort: 11,
        width: 'full',
        options: {
          language: 'json'
        }
      }
    },
    {
      field: 'ip_address',
      type: 'string',
      schema: {
        data_type: 'character varying',
        max_length: 45,
        is_nullable: true
      },
      meta: {
        interface: 'input',
        display: 'raw',
        note: 'IP address of the submitter',
        sort: 12,
        width: 'half'
      }
    },
    {
      field: 'user_agent',
      type: 'text',
      schema: {
        data_type: 'text',
        is_nullable: true
      },
      meta: {
        interface: 'input-multiline',
        display: 'raw',
        note: 'Browser user agent string',
        sort: 13,
        width: 'full'
      }
    },
    {
      field: 'status',
      type: 'string',
      schema: {
        data_type: 'character varying',
        max_length: 50,
        is_nullable: false,
        default_value: 'new'
      },
      meta: {
        interface: 'select-dropdown',
        display: 'labels',
        note: 'Status of the submission',
        sort: 14,
        width: 'half',
        options: {
          choices: [
            { text: 'New', value: 'new' },
            { text: 'Contacted', value: 'contacted' },
            { text: 'In Progress', value: 'in_progress' },
            { text: 'Converted', value: 'converted' },
            { text: 'Closed', value: 'closed' }
          ]
        }
      }
    },
    {
      field: 'notes',
      type: 'text',
      schema: {
        data_type: 'text',
        is_nullable: true
      },
      meta: {
        interface: 'input-multiline',
        display: 'raw',
        note: 'Internal notes about this submission',
        sort: 15,
        width: 'full'
      }
    },
    {
      field: 'date_created',
      type: 'timestamp',
      schema: {
        is_nullable: false,
        default_value: 'CURRENT_TIMESTAMP'
      },
      meta: {
        interface: 'datetime',
        display: 'datetime',
        readonly: true,
        hidden: false,
        sort: 16,
        width: 'half'
      }
    },
    {
      field: 'date_updated',
      type: 'timestamp',
      schema: {
        is_nullable: true
      },
      meta: {
        interface: 'datetime',
        display: 'datetime',
        readonly: true,
        hidden: false,
        sort: 17,
        width: 'half'
      }
    }
  ],

  newsletter_subscribers: [
    {
      field: 'id',
      type: 'integer',
      schema: {
        is_primary_key: true,
        has_auto_increment: true,
        is_nullable: false
      },
      meta: {
        hidden: true,
        readonly: true
      }
    },
    {
      field: 'email',
      type: 'string',
      schema: {
        data_type: 'character varying',
        max_length: 255,
        is_nullable: false,
        is_unique: true
      },
      meta: {
        interface: 'input',
        display: 'raw',
        note: 'Email address of subscriber',
        sort: 1,
        width: 'half',
        validation: {
          _and: [
            {
              email: {
                _regex: '^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$'
              }
            }
          ]
        }
      }
    },
    {
      field: 'source',
      type: 'string',
      schema: {
        data_type: 'character varying',
        max_length: 255,
        is_nullable: true
      },
      meta: {
        interface: 'input',
        display: 'raw',
        note: 'Source of subscription (footer, popup, etc.)',
        sort: 2,
        width: 'half'
      }
    },
    {
      field: 'status',
      type: 'string',
      schema: {
        data_type: 'character varying',
        max_length: 50,
        is_nullable: false,
        default_value: 'active'
      },
      meta: {
        interface: 'select-dropdown',
        display: 'labels',
        note: 'Subscription status',
        sort: 3,
        width: 'half',
        options: {
          choices: [
            { text: 'Active', value: 'active' },
            { text: 'Unsubscribed', value: 'unsubscribed' },
            { text: 'Bounced', value: 'bounced' }
          ]
        }
      }
    },
    {
      field: 'ip_address',
      type: 'string',
      schema: {
        data_type: 'character varying',
        max_length: 45,
        is_nullable: true
      },
      meta: {
        interface: 'input',
        display: 'raw',
        note: 'IP address at time of subscription',
        sort: 4,
        width: 'half'
      }
    },
    {
      field: 'date_created',
      type: 'timestamp',
      schema: {
        is_nullable: false,
        default_value: 'CURRENT_TIMESTAMP'
      },
      meta: {
        interface: 'datetime',
        display: 'datetime',
        readonly: true,
        sort: 5,
        width: 'half'
      }
    },
    {
      field: 'date_unsubscribed',
      type: 'timestamp',
      schema: {
        is_nullable: true
      },
      meta: {
        interface: 'datetime',
        display: 'datetime',
        readonly: true,
        sort: 6,
        width: 'half'
      }
    }
  ],

  feedback_responses: [
    {
      field: 'id',
      type: 'integer',
      schema: {
        is_primary_key: true,
        has_auto_increment: true,
        is_nullable: false
      },
      meta: {
        hidden: true,
        readonly: true
      }
    },
    {
      field: 'name',
      type: 'string',
      schema: {
        data_type: 'character varying',
        max_length: 255,
        is_nullable: true
      },
      meta: {
        interface: 'input',
        display: 'raw',
        note: 'Name of person providing feedback',
        sort: 1,
        width: 'half'
      }
    },
    {
      field: 'role',
      type: 'string',
      schema: {
        data_type: 'character varying',
        max_length: 255,
        is_nullable: true
      },
      meta: {
        interface: 'input',
        display: 'raw',
        note: 'Role or title of the person',
        sort: 2,
        width: 'half'
      }
    },
    {
      field: 'overall_rating',
      type: 'integer',
      schema: {
        data_type: 'integer',
        is_nullable: true
      },
      meta: {
        interface: 'select-dropdown',
        display: 'labels',
        note: 'Overall website rating (1-5 scale)',
        sort: 3,
        width: 'half',
        options: {
          choices: [
            { text: '1 - Poor', value: 1 },
            { text: '2 - Fair', value: 2 },
            { text: '3 - Good', value: 3 },
            { text: '4 - Very Good', value: 4 },
            { text: '5 - Excellent', value: 5 }
          ]
        }
      }
    },
    {
      field: 'feedback_data',
      type: 'json',
      schema: {
        data_type: 'json',
        is_nullable: true
      },
      meta: {
        interface: 'input-code',
        display: 'raw',
        note: 'Complete feedback response data as JSON',
        sort: 4,
        width: 'full',
        options: {
          language: 'json'
        }
      }
    },
    {
      field: 'comments',
      type: 'text',
      schema: {
        data_type: 'text',
        is_nullable: true
      },
      meta: {
        interface: 'input-multiline',
        display: 'raw',
        note: 'Additional comments or suggestions',
        sort: 5,
        width: 'full'
      }
    },
    {
      field: 'would_recommend',
      type: 'boolean',
      schema: {
        data_type: 'boolean',
        is_nullable: true
      },
      meta: {
        interface: 'boolean',
        display: 'boolean',
        note: 'Would recommend our services',
        sort: 6,
        width: 'half'
      }
    },
    {
      field: 'date_created',
      type: 'timestamp',
      schema: {
        is_nullable: false,
        default_value: 'CURRENT_TIMESTAMP'
      },
      meta: {
        interface: 'datetime',
        display: 'datetime',
        readonly: true,
        sort: 7,
        width: 'half'
      }
    }
  ]
};

async function setupFormCollections() {
  console.log('🚀 Setting up Form Collections in Directus...\n');

  try {
    // Create collections
    for (const collectionDef of collections) {
      try {
        console.log(`📁 Creating collection: ${collectionDef.collection}`);
        await directusRequest('collections', 'POST', collectionDef);
        console.log(`✅ Created collection: ${collectionDef.collection}`);
      } catch (error) {
        if (error.message.includes('already exists') || error.message.includes('duplicate')) {
          console.log(`ℹ️  Collection ${collectionDef.collection} already exists, skipping creation`);
        } else {
          console.error(`❌ Error creating collection ${collectionDef.collection}:`, error.message);
        }
      }
    }

    console.log('\n📋 Creating fields for collections...\n');

    // Create fields for each collection
    for (const [collectionName, fields] of Object.entries(fieldDefinitions)) {
      console.log(`🔧 Setting up fields for: ${collectionName}`);
      
      for (const field of fields) {
        try {
          await directusRequest(`fields/${collectionName}`, 'POST', field);
          console.log(`  ✅ Added field: ${field.field}`);
        } catch (error) {
          if (error.message.includes('already exists') || error.message.includes('duplicate')) {
            console.log(`  ℹ️  Field ${field.field} already exists, skipping`);
          } else {
            console.error(`  ❌ Error creating field ${field.field}:`, error.message);
          }
        }
      }
      console.log('');
    }

    console.log('🎉 Form collections setup completed successfully!\n');
    
    console.log('📊 Created Collections:');
    console.log('├── form_submissions (Main form submissions)');
    console.log('├── newsletter_subscribers (Email subscriptions)');
    console.log('└── feedback_responses (Website feedback)\n');
    
    console.log('🔧 Next Steps:');
    console.log('1. Create API routes for form submission');
    console.log('2. Update form components to submit to Directus');
    console.log('3. Set up email notifications for new submissions');
    console.log('4. Test end-to-end form submission workflow');

  } catch (error) {
    console.error('❌ Error setting up form collections:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  setupFormCollections();
}

module.exports = { setupFormCollections };
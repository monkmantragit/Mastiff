#!/usr/bin/env node

/**
 * Verify Directus Collections Structure
 * Comprehensive check of all collections, fields, and data integrity
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

// Helper function to check collection exists
async function checkCollection(collectionName) {
  try {
    const response = await directusRequest(`collections/${collectionName}`);
    return response.data ? true : false;
  } catch (error) {
    return false;
  }
}

// Helper function to get collection fields
async function getCollectionFields(collectionName) {
  try {
    const response = await directusRequest(`fields/${collectionName}`);
    return response.data || [];
  } catch (error) {
    console.error(`❌ Error getting fields for ${collectionName}:`, error.message);
    return [];
  }
}

// Helper function to get collection items count
async function getCollectionCount(collectionName) {
  try {
    const response = await directusRequest(`items/${collectionName}?aggregate[count]=*`);
    return response.data?.[0]?.count || 0;
  } catch (error) {
    console.error(`❌ Error getting count for ${collectionName}:`, error.message);
    return 0;
  }
}

// Helper function to get sample items
async function getSampleItems(collectionName, limit = 3) {
  try {
    const response = await directusRequest(`items/${collectionName}?limit=${limit}`);
    return response.data || [];
  } catch (error) {
    console.error(`❌ Error getting sample items for ${collectionName}:`, error.message);
    return [];
  }
}

// Expected field structures
const expectedFields = {
  blog: [
    { field: 'id', type: 'integer', required: true },
    { field: 'title', type: 'string', required: true },
    { field: 'slug', type: 'string', required: true },
    { field: 'content', type: 'text', required: false },
    { field: 'excerpt', type: 'text', required: false },
    { field: 'featured_image', type: 'uuid', required: false },
    { field: 'published_date', type: 'timestamp', required: false },
    { field: 'status', type: 'string', required: false },
    { field: 'category', type: 'string', required: false },
    { field: 'tags', type: 'json', required: false },
    { field: 'author', type: 'string', required: false },
    { field: 'read_time', type: 'string', required: false }
  ],
  services: [
    { field: 'id', type: 'integer', required: true },
    { field: 'title', type: 'string', required: true },
    { field: 'slug', type: 'string', required: true },
    { field: 'content', type: 'text', required: false },
    { field: 'description', type: 'text', required: false },
    { field: 'featured_image', type: 'uuid', required: false },
    { field: 'category', type: 'string', required: false },
    { field: 'status', type: 'string', required: false },
    { field: 'sort_order', type: 'integer', required: false }
  ],
  team_members: [
    { field: 'id', type: 'integer', required: true },
    { field: 'name', type: 'string', required: true },
    { field: 'position', type: 'string', required: false },
    { field: 'bio', type: 'text', required: false },
    { field: 'image', type: 'uuid', required: false },
    { field: 'email', type: 'string', required: false },
    { field: 'linkedin', type: 'string', required: false },
    { field: 'status', type: 'string', required: false }
  ],
  landing_pages: [
    { field: 'id', type: 'integer', required: true },
    { field: 'title', type: 'string', required: true },
    { field: 'slug', type: 'string', required: true },
    { field: 'content', type: 'text', required: false },
    { field: 'meta_title', type: 'string', required: false },
    { field: 'meta_description', type: 'text', required: false },
    { field: 'status', type: 'string', required: false }
  ]
};

async function verifyCollections() {
  console.log('🔍 Verifying Directus Collections Structure...\n');

  const results = {
    collections: {},
    errors: [],
    warnings: [],
    summary: {
      totalCollections: 0,
      validCollections: 0,
      totalItems: 0
    }
  };

  // Check each expected collection
  for (const [collectionName, expectedFieldsList] of Object.entries(expectedFields)) {
    console.log(`📊 Checking collection: ${collectionName}`);
    
    const collectionResult = {
      exists: false,
      fields: {},
      missingFields: [],
      extraFields: [],
      itemCount: 0,
      sampleItems: [],
      issues: []
    };

    try {
      // Check if collection exists
      collectionResult.exists = await checkCollection(collectionName);
      
      if (!collectionResult.exists) {
        results.errors.push(`Collection '${collectionName}' does not exist`);
        console.log(`❌ Collection '${collectionName}' does not exist\n`);
        results.collections[collectionName] = collectionResult;
        continue;
      }

      // Get collection fields
      const actualFields = await getCollectionFields(collectionName);
      console.log(`   Found ${actualFields.length} fields`);

      // Check expected fields
      for (const expectedField of expectedFieldsList) {
        const actualField = actualFields.find(f => f.field === expectedField.field);
        
        if (actualField) {
          collectionResult.fields[expectedField.field] = {
            exists: true,
            type: actualField.type,
            expectedType: expectedField.type,
            typeMatch: actualField.type === expectedField.type,
            required: expectedField.required,
            nullable: actualField.schema?.is_nullable !== false
          };

          // Check for type mismatches
          if (actualField.type !== expectedField.type) {
            collectionResult.issues.push(`Field '${expectedField.field}' has type '${actualField.type}' but expected '${expectedField.type}'`);
          }
        } else {
          collectionResult.missingFields.push(expectedField.field);
          collectionResult.fields[expectedField.field] = {
            exists: false,
            expectedType: expectedField.type,
            required: expectedField.required
          };
        }
      }

      // Check for extra fields
      for (const actualField of actualFields) {
        const isExpected = expectedFieldsList.some(f => f.field === actualField.field);
        if (!isExpected && !['date_created', 'date_updated', 'user_created', 'user_updated'].includes(actualField.field)) {
          collectionResult.extraFields.push(actualField.field);
        }
      }

      // Get item count
      collectionResult.itemCount = await getCollectionCount(collectionName);
      console.log(`   Items: ${collectionResult.itemCount}`);

      // Get sample items
      if (collectionResult.itemCount > 0) {
        collectionResult.sampleItems = await getSampleItems(collectionName, 2);
      }

      // Report issues
      if (collectionResult.missingFields.length > 0) {
        console.log(`   ⚠️  Missing fields: ${collectionResult.missingFields.join(', ')}`);
        results.warnings.push(`Collection '${collectionName}' missing fields: ${collectionResult.missingFields.join(', ')}`);
      }

      if (collectionResult.extraFields.length > 0) {
        console.log(`   ℹ️  Extra fields: ${collectionResult.extraFields.join(', ')}`);
      }

      if (collectionResult.issues.length > 0) {
        console.log(`   ❌ Issues: ${collectionResult.issues.length}`);
        results.errors.push(...collectionResult.issues.map(issue => `${collectionName}: ${issue}`));
      }

      if (collectionResult.missingFields.length === 0 && collectionResult.issues.length === 0) {
        console.log(`   ✅ Collection structure is valid`);
        results.summary.validCollections++;
      }

      results.summary.totalItems += collectionResult.itemCount;

    } catch (error) {
      collectionResult.issues.push(`Error checking collection: ${error.message}`);
      results.errors.push(`${collectionName}: ${error.message}`);
      console.log(`   ❌ Error: ${error.message}`);
    }

    results.collections[collectionName] = collectionResult;
    results.summary.totalCollections++;
    console.log('');
  }

  // Print summary
  console.log('📋 VERIFICATION SUMMARY');
  console.log('=======================');
  console.log(`Total Collections: ${results.summary.totalCollections}`);
  console.log(`Valid Collections: ${results.summary.validCollections}`);
  console.log(`Total Items: ${results.summary.totalItems}`);
  console.log(`Errors: ${results.errors.length}`);
  console.log(`Warnings: ${results.warnings.length}\n`);

  if (results.errors.length > 0) {
    console.log('❌ ERRORS:');
    results.errors.forEach(error => console.log(`   - ${error}`));
    console.log('');
  }

  if (results.warnings.length > 0) {
    console.log('⚠️  WARNINGS:');
    results.warnings.forEach(warning => console.log(`   - ${warning}`));
    console.log('');
  }

  // Detailed collection breakdown
  console.log('📊 DETAILED BREAKDOWN');
  console.log('=====================');
  
  for (const [collectionName, result] of Object.entries(results.collections)) {
    if (result.exists) {
      console.log(`\n${collectionName.toUpperCase()} (${result.itemCount} items):`);
      
      if (result.sampleItems.length > 0) {
        console.log('   Sample data:');
        result.sampleItems.forEach((item, index) => {
          const keys = Object.keys(item).slice(0, 3);
          const preview = keys.map(key => `${key}: ${String(item[key]).substring(0, 30)}${String(item[key]).length > 30 ? '...' : ''}`).join(', ');
          console.log(`   ${index + 1}. {${preview}}`);
        });
      }
    }
  }

  return results;
}

// Run if called directly
if (require.main === module) {
  verifyCollections()
    .then(results => {
      if (results.errors.length === 0) {
        console.log('\n🎉 All collections verified successfully!');
        process.exit(0);
      } else {
        console.log('\n❌ Verification completed with errors.');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('❌ Verification failed:', error.message);
      process.exit(1);
    });
}

module.exports = { verifyCollections };
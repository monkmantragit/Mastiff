#!/usr/bin/env node

/**
 * Check Collection Permissions and Access
 * Verifies that all collections and fields are accessible via API
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
    return {
      success: false,
      status: response.status,
      error: await response.text()
    };
  }

  const text = await response.text();
  if (!text) {
    return { success: true, data: {} };
  }
  
  return { 
    success: true, 
    data: JSON.parse(text) 
  };
}

// Test different access patterns
async function testCollectionAccess(collectionName) {
  const tests = [
    {
      name: 'List all items',
      request: `items/${collectionName}?limit=5`
    },
    {
      name: 'Get single item',
      request: `items/${collectionName}?limit=1`
    },
    {
      name: 'Get with specific fields',
      request: `items/${collectionName}?fields=id,title&limit=1`
    },
    {
      name: 'Get with filter',
      request: `items/${collectionName}?filter={"status":{"_eq":"active"}}&limit=1`
    }
  ];

  const results = [];

  for (const test of tests) {
    const result = await directusRequest(test.request);
    results.push({
      name: test.name,
      success: result.success,
      status: result.status || 200,
      error: result.error,
      itemCount: result.success && result.data.data ? result.data.data.length : 0
    });
  }

  return results;
}

// Test field-specific access
async function testFieldAccess(collectionName, requiredFields) {
  const fieldTests = [];

  for (const field of requiredFields) {
    const result = await directusRequest(`items/${collectionName}?fields=${field}&limit=1`);
    fieldTests.push({
      field: field,
      accessible: result.success,
      status: result.status || 200,
      error: result.error
    });
  }

  return fieldTests;
}

async function checkPermissions() {
  console.log('🔒 Checking Collection Permissions and Access...\n');

  const collections = {
    blog: ['id', 'title', 'slug', 'content', 'excerpt', 'featured_image', 'published_date', 'status', 'category', 'tags', 'author', 'read_time'],
    services: ['id', 'title', 'slug', 'content', 'description', 'featured_image', 'category', 'status'],
    team_members: ['id', 'name', 'position', 'bio', 'image', 'email', 'status'],
    landing_pages: ['id', 'title', 'slug', 'content', 'meta_title', 'meta_description', 'status']
  };

  const results = {
    collections: {},
    summary: {
      totalCollections: 0,
      accessibleCollections: 0,
      totalFields: 0,
      accessibleFields: 0,
      issues: []
    }
  };

  for (const [collectionName, requiredFields] of Object.entries(collections)) {
    console.log(`🔍 Testing collection: ${collectionName}`);
    
    const collectionResult = {
      name: collectionName,
      accessible: false,
      accessTests: [],
      fieldTests: [],
      issues: []
    };

    try {
      // Test basic collection access
      collectionResult.accessTests = await testCollectionAccess(collectionName);
      
      // Check if any access test passed
      collectionResult.accessible = collectionResult.accessTests.some(test => test.success);
      
      if (collectionResult.accessible) {
        console.log(`   ✅ Collection accessible`);
        results.summary.accessibleCollections++;
        
        // Test field-specific access
        console.log(`   🔍 Testing ${requiredFields.length} fields...`);
        collectionResult.fieldTests = await testFieldAccess(collectionName, requiredFields);
        
        // Count accessible fields
        const accessibleFields = collectionResult.fieldTests.filter(test => test.accessible);
        console.log(`   📊 ${accessibleFields.length}/${requiredFields.length} fields accessible`);
        
        results.summary.accessibleFields += accessibleFields.length;
        
        // Report inaccessible fields
        const inaccessibleFields = collectionResult.fieldTests.filter(test => !test.accessible);
        if (inaccessibleFields.length > 0) {
          console.log(`   ⚠️  Inaccessible fields: ${inaccessibleFields.map(f => f.field).join(', ')}`);
          collectionResult.issues.push(`Inaccessible fields: ${inaccessibleFields.map(f => f.field).join(', ')}`);
          results.summary.issues.push(`${collectionName}: Inaccessible fields: ${inaccessibleFields.map(f => f.field).join(', ')}`);
        }
        
      } else {
        console.log(`   ❌ Collection not accessible`);
        collectionResult.issues.push('Collection not accessible');
        results.summary.issues.push(`${collectionName}: Collection not accessible`);
      }

      // Report access test failures
      const failedTests = collectionResult.accessTests.filter(test => !test.success);
      if (failedTests.length > 0) {
        failedTests.forEach(test => {
          console.log(`   ⚠️  ${test.name}: ${test.status} - ${test.error || 'Unknown error'}`);
        });
      }

    } catch (error) {
      console.log(`   ❌ Error testing collection: ${error.message}`);
      collectionResult.issues.push(`Error: ${error.message}`);
      results.summary.issues.push(`${collectionName}: ${error.message}`);
    }

    results.collections[collectionName] = collectionResult;
    results.summary.totalCollections++;
    results.summary.totalFields += requiredFields.length;
    console.log('');
  }

  // Test public access (without authentication)
  console.log('🌐 Testing public access (without authentication)...');
  
  const publicTests = [];
  for (const collectionName of Object.keys(collections)) {
    const fetch = (await import('node-fetch')).default;
    
    try {
      const response = await fetch(`${DIRECTUS_URL}/items/${collectionName}?limit=1`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      publicTests.push({
        collection: collectionName,
        accessible: response.ok,
        status: response.status
      });
      
      if (response.ok) {
        console.log(`   ✅ ${collectionName}: Publicly accessible`);
      } else {
        console.log(`   🔒 ${collectionName}: Authentication required (${response.status})`);
      }
      
    } catch (error) {
      console.log(`   ❌ ${collectionName}: Error - ${error.message}`);
      publicTests.push({
        collection: collectionName,
        accessible: false,
        error: error.message
      });
    }
  }

  results.publicAccess = publicTests;
  console.log('');

  // Print summary
  console.log('📋 PERMISSIONS SUMMARY');
  console.log('======================');
  console.log(`Collections Checked: ${results.summary.totalCollections}`);
  console.log(`Accessible Collections: ${results.summary.accessibleCollections}`);
  console.log(`Fields Checked: ${results.summary.totalFields}`);
  console.log(`Accessible Fields: ${results.summary.accessibleFields}`);
  console.log(`Issues Found: ${results.summary.issues.length}\n`);

  if (results.summary.issues.length > 0) {
    console.log('❌ ISSUES FOUND:');
    results.summary.issues.forEach(issue => console.log(`   - ${issue}`));
    console.log('');
  }

  // Security recommendations
  console.log('🔐 SECURITY RECOMMENDATIONS');
  console.log('============================');
  
  const publiclyAccessible = publicTests.filter(test => test.accessible);
  if (publiclyAccessible.length > 0) {
    console.log('⚠️  The following collections are publicly accessible:');
    publiclyAccessible.forEach(test => console.log(`   - ${test.collection}`));
    console.log('   Consider restricting public access if these contain sensitive data.\n');
  } else {
    console.log('✅ All collections require authentication - good security practice.\n');
  }

  // Overall status
  const allCollectionsAccessible = results.summary.accessibleCollections === results.summary.totalCollections;
  const allFieldsAccessible = results.summary.accessibleFields === results.summary.totalFields;

  if (allCollectionsAccessible && allFieldsAccessible) {
    console.log('🎉 All collections and fields are properly accessible!');
  } else if (allCollectionsAccessible) {
    console.log('✅ All collections are accessible, but some fields may have permission issues.');
  } else {
    console.log('❌ Some collections or fields have access issues that need attention.');
  }

  return results;
}

// Run if called directly
if (require.main === module) {
  checkPermissions()
    .then(results => {
      const hasIssues = results.summary.issues.length > 0;
      if (!hasIssues) {
        console.log('\n🎉 Permission check completed successfully!');
        process.exit(0);
      } else {
        console.log('\n⚠️  Permission check completed with issues.');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('❌ Permission check failed:', error.message);
      process.exit(1);
    });
}

module.exports = { checkPermissions };
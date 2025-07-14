#!/usr/bin/env node

/**
 * Test Data Integrity Across All Collections
 * Validates data quality, relationships, and completeness
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

// Helper function to get all items from a collection
async function getAllItems(collectionName, fields = '*') {
  try {
    const response = await directusRequest(`items/${collectionName}?fields=${fields}&limit=1000`);
    return response.data || [];
  } catch (error) {
    console.error(`❌ Error getting items from ${collectionName}:`, error.message);
    return [];
  }
}

// Data integrity tests
const integrityTests = {
  blog: [
    {
      name: 'Required fields populated',
      test: (items) => {
        const issues = [];
        items.forEach(item => {
          if (!item.title || item.title.trim() === '') {
            issues.push(`Blog post ${item.id} missing title`);
          }
          if (!item.slug || item.slug.trim() === '') {
            issues.push(`Blog post ${item.id} missing slug`);
          }
          if (!item.content || item.content.trim() === '') {
            issues.push(`Blog post ${item.id} missing content`);
          }
        });
        return issues;
      }
    },
    {
      name: 'Unique slugs',
      test: (items) => {
        const slugs = items.map(item => item.slug).filter(Boolean);
        const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
        return duplicates.length > 0 ? [`Duplicate blog slugs found: ${duplicates.join(', ')}`] : [];
      }
    },
    {
      name: 'Valid published dates',
      test: (items) => {
        const issues = [];
        items.forEach(item => {
          if (item.published_date && isNaN(new Date(item.published_date))) {
            issues.push(`Blog post ${item.id} has invalid published_date: ${item.published_date}`);
          }
        });
        return issues;
      }
    },
    {
      name: 'Content quality',
      test: (items) => {
        const issues = [];
        items.forEach(item => {
          if (item.content && item.content.length < 100) {
            issues.push(`Blog post ${item.id} has very short content (${item.content.length} chars)`);
          }
        });
        return issues;
      }
    }
  ],
  
  services: [
    {
      name: 'Required fields populated',
      test: (items) => {
        const issues = [];
        items.forEach(item => {
          if (!item.title || item.title.trim() === '') {
            issues.push(`Service ${item.id} missing title`);
          }
          if (!item.slug || item.slug.trim() === '') {
            issues.push(`Service ${item.id} missing slug`);
          }
        });
        return issues;
      }
    },
    {
      name: 'Unique slugs',
      test: (items) => {
        const slugs = items.map(item => item.slug).filter(Boolean);
        const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
        return duplicates.length > 0 ? [`Duplicate service slugs found: ${duplicates.join(', ')}`] : [];
      }
    },
    {
      name: 'Active status validation',
      test: (items) => {
        const activeItems = items.filter(item => item.status === 'active');
        return activeItems.length === 0 ? ['No active services found'] : [];
      }
    }
  ],
  
  team_members: [
    {
      name: 'Required fields populated',
      test: (items) => {
        const issues = [];
        items.forEach(item => {
          if (!item.name || item.name.trim() === '') {
            issues.push(`Team member ${item.id} missing name`);
          }
        });
        return issues;
      }
    },
    {
      name: 'Email format validation',
      test: (items) => {
        const issues = [];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        items.forEach(item => {
          if (item.email && !emailRegex.test(item.email)) {
            issues.push(`Team member ${item.id} (${item.name}) has invalid email: ${item.email}`);
          }
        });
        return issues;
      }
    },
    {
      name: 'Active members validation',
      test: (items) => {
        const activeItems = items.filter(item => item.status === 'active');
        return activeItems.length === 0 ? ['No active team members found'] : [];
      }
    }
  ],
  
  landing_pages: [
    {
      name: 'Required fields populated',
      test: (items) => {
        const issues = [];
        items.forEach(item => {
          if (!item.title || item.title.trim() === '') {
            issues.push(`Landing page ${item.id} missing title`);
          }
          if (!item.slug || item.slug.trim() === '') {
            issues.push(`Landing page ${item.id} missing slug`);
          }
        });
        return issues;
      }
    },
    {
      name: 'Unique slugs',
      test: (items) => {
        const slugs = items.map(item => item.slug).filter(Boolean);
        const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
        return duplicates.length > 0 ? [`Duplicate landing page slugs found: ${duplicates.join(', ')}`] : [];
      }
    },
    {
      name: 'SEO fields populated',
      test: (items) => {
        const issues = [];
        items.forEach(item => {
          if (!item.meta_title || item.meta_title.trim() === '') {
            issues.push(`Landing page ${item.id} missing meta_title`);
          }
          if (!item.meta_description || item.meta_description.trim() === '') {
            issues.push(`Landing page ${item.id} missing meta_description`);
          }
        });
        return issues;
      }
    }
  ]
};

async function testDataIntegrity() {
  console.log('🔍 Testing Data Integrity Across All Collections...\n');

  const results = {
    collections: {},
    totalIssues: 0,
    totalWarnings: 0,
    summary: {
      totalItems: 0,
      collectionsChecked: 0,
      testsRun: 0
    }
  };

  // Test each collection
  for (const [collectionName, tests] of Object.entries(integrityTests)) {
    console.log(`📊 Testing collection: ${collectionName}`);
    
    const collectionResult = {
      itemCount: 0,
      testsRun: 0,
      issues: [],
      warnings: [],
      passed: 0,
      failed: 0
    };

    try {
      // Get all items from the collection
      const items = await getAllItems(collectionName);
      collectionResult.itemCount = items.length;
      console.log(`   Items: ${items.length}`);

      if (items.length === 0) {
        collectionResult.warnings.push('Collection is empty');
        console.log('   ⚠️  Collection is empty');
      } else {
        // Run integrity tests
        for (const test of tests) {
          collectionResult.testsRun++;
          const testIssues = test.test(items);
          
          if (testIssues.length === 0) {
            console.log(`   ✅ ${test.name}: PASSED`);
            collectionResult.passed++;
          } else {
            console.log(`   ❌ ${test.name}: FAILED`);
            collectionResult.failed++;
            collectionResult.issues.push(...testIssues);
            testIssues.forEach(issue => console.log(`      - ${issue}`));
          }
        }
      }

      results.collections[collectionName] = collectionResult;
      results.totalIssues += collectionResult.issues.length;
      results.totalWarnings += collectionResult.warnings.length;
      results.summary.totalItems += collectionResult.itemCount;
      results.summary.testsRun += collectionResult.testsRun;

    } catch (error) {
      collectionResult.issues.push(`Error testing collection: ${error.message}`);
      console.log(`   ❌ Error: ${error.message}`);
    }

    results.summary.collectionsChecked++;
    console.log('');
  }

  // Cross-collection integrity tests
  console.log('🔗 Testing Cross-Collection Integrity...');
  
  try {
    // Check for orphaned references (if any)
    // For now, we don't have foreign key relationships, so this is minimal
    console.log('   ✅ No cross-collection dependencies to validate');
  } catch (error) {
    console.log(`   ❌ Cross-collection test error: ${error.message}`);
  }

  console.log('');

  // Print summary
  console.log('📋 DATA INTEGRITY SUMMARY');
  console.log('=========================');
  console.log(`Collections Checked: ${results.summary.collectionsChecked}`);
  console.log(`Total Items: ${results.summary.totalItems}`);
  console.log(`Tests Run: ${results.summary.testsRun}`);
  console.log(`Issues Found: ${results.totalIssues}`);
  console.log(`Warnings: ${results.totalWarnings}\n`);

  // Detailed results
  let allIssues = [];
  let allWarnings = [];

  for (const [collectionName, result] of Object.entries(results.collections)) {
    if (result.issues.length > 0 || result.warnings.length > 0) {
      console.log(`${collectionName.toUpperCase()}:`);
      
      if (result.issues.length > 0) {
        console.log('  Issues:');
        result.issues.forEach(issue => {
          console.log(`    ❌ ${issue}`);
          allIssues.push(`${collectionName}: ${issue}`);
        });
      }
      
      if (result.warnings.length > 0) {
        console.log('  Warnings:');
        result.warnings.forEach(warning => {
          console.log(`    ⚠️  ${warning}`);
          allWarnings.push(`${collectionName}: ${warning}`);
        });
      }
      
      console.log('');
    }
  }

  // Overall status
  if (results.totalIssues === 0 && results.totalWarnings === 0) {
    console.log('🎉 All data integrity tests passed! Your collections are in excellent shape.');
  } else if (results.totalIssues === 0) {
    console.log('✅ No critical issues found, but there are some warnings to address.');
  } else {
    console.log('❌ Data integrity issues found that should be addressed.');
  }

  return results;
}

// Run if called directly
if (require.main === module) {
  testDataIntegrity()
    .then(results => {
      if (results.totalIssues === 0) {
        console.log('\n🎉 Data integrity verification completed successfully!');
        process.exit(0);
      } else {
        console.log('\n⚠️  Data integrity verification completed with issues.');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('❌ Data integrity test failed:', error.message);
      process.exit(1);
    });
}

module.exports = { testDataIntegrity };
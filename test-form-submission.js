#!/usr/bin/env node

/**
 * Test Form Submission Workflow
 * Tests the complete form submission process from API to Directus
 */

const DIRECTUS_URL = 'https://directus-production-bc75.up.railway.app';
const DIRECTUS_TOKEN = 'FAE0VL3TIn4xLMtYP07yFGjIks5km0Kl';

// Test data for different form types
const testData = {
  contact: {
    formType: 'contact',
    name: 'Test User',
    email: 'test@example.com',
    phone: '+91 9876543210',
    company: 'Test Company',
    eventType: 'corporate',
    message: 'This is a test contact form submission.'
  },
  enquiry: {
    formType: 'enquiry',
    name: 'Test Enquiry',
    email: 'enquiry@example.com',
    phone: '+91 9876543211',
    eventType: 'Corporate Conference',
    eventDate: '2025-12-01',
    location: 'Bangalore',
    message: 'Test enquiry popup submission.',
    source: 'test-popup'
  },
  newsletter: {
    formType: 'newsletter',
    email: 'newsletter@example.com',
    source: 'test-footer'
  }
};

// Helper function to test API endpoint
async function testFormAPI(formData) {
  const fetch = (await import('node-fetch')).default;
  
  console.log(`\n🧪 Testing ${formData.formType} form submission...`);
  
  try {
    const response = await fetch('http://localhost:3000/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log(`✅ ${formData.formType} form submitted successfully`);
      console.log(`   📄 Response: ${result.message}`);
      console.log(`   🆔 ID: ${result.id}`);
      return { success: true, id: result.id };
    } else {
      console.log(`❌ ${formData.formType} form submission failed`);
      console.log(`   📄 Error: ${result.error}`);
      return { success: false, error: result.error };
    }
    
  } catch (error) {
    console.log(`❌ ${formData.formType} form submission error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Helper function to verify data in Directus
async function verifyInDirectus(collectionName, submissionId) {
  const fetch = (await import('node-fetch')).default;
  
  if (!submissionId) return false;
  
  try {
    const response = await fetch(`${DIRECTUS_URL}/items/${collectionName}/${submissionId}`, {
      headers: {
        'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Data verified in Directus ${collectionName} collection`);
      return true;
    } else {
      console.log(`❌ Data not found in Directus ${collectionName} collection`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error verifying in Directus: ${error.message}`);
    return false;
  }
}

async function runFormTests() {
  console.log('🚀 Starting Form Submission Tests...\n');
  console.log('📝 Note: Make sure your Next.js server is running on localhost:3000\n');

  const results = {
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    details: []
  };

  // Test each form type
  for (const [formType, formData] of Object.entries(testData)) {
    results.totalTests++;
    
    // Step 1: Test API submission
    const apiResult = await testFormAPI(formData);
    
    // Step 2: Verify data in Directus
    let directusVerified = false;
    if (apiResult.success) {
      const collectionMap = {
        contact: 'form_submissions',
        enquiry: 'form_submissions', 
        newsletter: 'newsletter_subscribers'
      };
      
      directusVerified = await verifyInDirectus(collectionMap[formType], apiResult.id);
    }
    
    // Record result
    const testPassed = apiResult.success && directusVerified;
    if (testPassed) {
      results.passedTests++;
    } else {
      results.failedTests++;
    }
    
    results.details.push({
      formType,
      apiSuccess: apiResult.success,
      directusVerified,
      overall: testPassed,
      error: apiResult.error
    });
    
    console.log(`📊 ${formType} test: ${testPassed ? '✅ PASSED' : '❌ FAILED'}\n`);
  }

  // Print summary
  console.log('📋 TEST SUMMARY');
  console.log('===============');
  console.log(`Total Tests: ${results.totalTests}`);
  console.log(`Passed: ${results.passedTests}`);
  console.log(`Failed: ${results.failedTests}`);
  console.log(`Success Rate: ${Math.round((results.passedTests / results.totalTests) * 100)}%\n`);

  // Print detailed results
  console.log('📄 DETAILED RESULTS');
  console.log('===================');
  results.details.forEach(detail => {
    console.log(`${detail.formType.toUpperCase()}:`);
    console.log(`  API Submission: ${detail.apiSuccess ? '✅' : '❌'}`);
    console.log(`  Directus Storage: ${detail.directusVerified ? '✅' : '❌'}`);
    console.log(`  Overall: ${detail.overall ? '✅ PASSED' : '❌ FAILED'}`);
    if (detail.error) {
      console.log(`  Error: ${detail.error}`);
    }
    console.log('');
  });

  // Final status
  if (results.failedTests === 0) {
    console.log('🎉 All form submission tests passed! Your form system is working correctly.');
  } else {
    console.log('⚠️  Some tests failed. Please check the API routes and Directus configuration.');
  }

  return results;
}

// Run tests if called directly
if (require.main === module) {
  runFormTests()
    .then(results => {
      process.exit(results.failedTests === 0 ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Test runner failed:', error.message);
      process.exit(1);
    });
}

module.exports = { runFormTests };
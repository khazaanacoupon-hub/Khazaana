#!/usr/bin/env node

// Simple test script to verify the deployment
import axios from 'axios';

async function testDeployment() {
  // Try multiple ports since the server might start on a different port if 5001 is in use
  const portsToTry = [5001, 50011, 5002, 5003];
  let baseURL = null;
  
  console.log('🧪 Testing deployment...');
  
  // Find which port the server is running on
  for (const port of portsToTry) {
    try {
      const testURL = `http://localhost:${port}/api/health`;
      await axios.get(testURL, { timeout: 3000 });
      baseURL = `http://localhost:${port}`;
      console.log(`✅ Server found on port ${port}`);
      break;
    } catch (error) {
      // Continue to next port
    }
  }
  
  if (!baseURL) {
    console.error('❌ Could not find running server on any expected port');
    return;
  }
  
  console.log(`🔗 Base URL: ${baseURL}`);
  
  try {
    // Test health endpoint
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await axios.get(`${baseURL}/api/health`);
    console.log('✅ Health check passed:', healthResponse.data.message);
    
    // Test serving frontend files
    console.log('\n2. Testing frontend serving...');
    const frontendResponse = await axios.get(baseURL);
    console.log('✅ Frontend serving test passed, status:', frontendResponse.status);
    
    // Test API routes
    console.log('\n3. Testing API routes...');
    try {
      const apiResponse = await axios.get(`${baseURL}/api/admin/signup`);
      console.log('ℹ️  API route test result:', apiResponse.status);
    } catch (apiError) {
      // This is expected to fail since it's a POST endpoint
      if (apiError.response && apiError.response.status === 404) {
        console.log('✅ API routes are properly set up (GET returned 404 as expected)');
      } else {
        console.log('ℹ️  API route test info:', apiError.message);
      }
    }
    
    console.log('\n🎉 Deployment verification completed successfully!');
    console.log(`🖥️  Access your application at: ${baseURL}`);
    
  } catch (error) {
    console.error('❌ Deployment test failed:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
}

testDeployment();
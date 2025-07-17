#!/usr/bin/env node

/**
 * 🧪 Notion Connection Test
 * 
 * Quick test to verify Notion API connection works.
 * Run: node tools/notion/test-connection.js
 */

const { notionHelpers } = require('./notion-config');

async function testConnection() {
  console.log('🧪 Testing Notion API connection...\n');
  
  try {
    const success = await notionHelpers.testConnection();
    
    if (success) {
      console.log('🎉 SUCCESS! Notion API is working correctly.');
      console.log('📋 Next steps:');
      console.log('   1. Create a parent page in Notion: "🚀 EV Charging Admin"');
      console.log('   2. Get the page ID from the URL');
      console.log('   3. Update setup-notion.js with the page ID');
      console.log('   4. Run: npm run setup');
    } else {
      console.log('❌ FAILED! Check your API key.');
    }
  } catch (error) {
    console.error('💥 Error:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Check if API key is correct');
    console.log('   2. Verify the integration has access to your workspace');
    console.log('   3. Make sure you\'ve shared pages with the integration');
  }
}

if (require.main === module) {
  testConnection();
}

module.exports = { testConnection }; 
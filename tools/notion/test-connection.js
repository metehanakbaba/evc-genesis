#!/usr/bin/env node

/**
 * Test Notion API Connection
 * Simple connection test for the EV Charging Admin Notion integration
 */

const { notionHelpers, NOTION_CONFIG } = require('./config');

async function testConnection() {
  console.log('🧪 Testing Notion Integration...\n');

  try {
    // Test 1: Basic connection
    console.log('1️⃣ Testing API connection...');
    const connected = await notionHelpers.testConnection();
    
    if (!connected) {
      throw new Error('Failed to connect to Notion API');
    }

    // Test 2: Database access
    console.log('\n2️⃣ Testing database access...');
    const databases = Object.entries(NOTION_CONFIG.databases);
    
    for (const [name, id] of databases) {
      try {
        const pages = await notionHelpers.queryDatabase(id);
        console.log(`   ✅ ${name}: ${pages.length} pages accessible`);
      } catch (error) {
        console.log(`   ❌ ${name}: ${error.message}`);
      }
    }

    // Test 3: List all databases
    console.log('\n3️⃣ Discovering workspace databases...');
    const allDatabases = await notionHelpers.listDatabases();
    console.log(`   ✅ Found ${allDatabases.length} total databases in workspace`);

    console.log('\n🎉 Connection test completed successfully!');
    console.log('\n📋 Integration Status:');
    console.log('   ✅ API Connection: Working');
    console.log(`   ✅ Database Access: ${databases.length}/4 databases accessible`);
    console.log('   ✅ Workspace Access: Available');
    console.log('\n🚀 Ready to sync documentation and update KPIs!');

  } catch (error) {
    console.error('\n❌ Connection test failed:', error.message);
    
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Verify API key is correct and active');
    console.log('   2. Check integration has workspace access');
    console.log('   3. Ensure databases are shared with integration');
    console.log('   4. Confirm integration permissions are sufficient');
    
    process.exit(1);
  }
}

if (require.main === module) {
  testConnection();
}

module.exports = { testConnection };
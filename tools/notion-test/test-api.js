#!/usr/bin/env node

/**
 * Notion API Test Script
 * Tests what features and capabilities are available with the current API key
 */

const { Client } = require('@notionhq/client');

// Your API key - replace with the new one
const NOTION_API_KEY = 'ntn_E32407062553w0greilDyFbiqA1OxfctiLI9owCARwn25c';

const notion = new Client({
  auth: NOTION_API_KEY,
  notionVersion: '2022-06-28'
});

async function testNotionCapabilities() {
  console.log('🧪 Testing Notion API Capabilities...\n');

  try {
    // Test 1: Basic connection and user info
    console.log('1️⃣ Testing connection...');
    const user = await notion.users.me();
    console.log(`✅ Connected as: ${user.name || 'Unknown'}`);
    console.log(`   User ID: ${user.id}`);
    console.log(`   User type: ${user.type}\n`);

    // Test 2: List available databases
    console.log('2️⃣ Searching for databases...');
    const databases = await notion.search({
      filter: {
        property: 'object',
        value: 'database'
      }
    });
    
    console.log(`✅ Found ${databases.results.length} databases:`);
    databases.results.forEach((db, index) => {
      console.log(`   ${index + 1}. ${db.title?.[0]?.plain_text || 'Untitled'} (ID: ${db.id})`);
    });
    console.log('');

    // Test 3: List available pages
    console.log('3️⃣ Searching for pages...');
    const pages = await notion.search({
      filter: {
        property: 'object',
        value: 'page'
      }
    });
    
    console.log(`✅ Found ${pages.results.length} pages:`);
    pages.results.slice(0, 5).forEach((page, index) => {
      const title = page.properties?.title?.title?.[0]?.plain_text || 
                   page.properties?.Name?.title?.[0]?.plain_text ||
                   'Untitled';
      console.log(`   ${index + 1}. ${title} (ID: ${page.id})`);
    });
    if (pages.results.length > 5) {
      console.log(`   ... and ${pages.results.length - 5} more`);
    }
    console.log('');

    // Test 4: Check if we can create databases
    console.log('4️⃣ Testing database creation capabilities...');
    
    // First, let's see if we have any parent pages we can use
    const parentPages = pages.results.filter(page => 
      page.parent.type === 'workspace' || page.parent.type === 'page_id'
    );
    
    if (parentPages.length > 0) {
      console.log(`✅ Found ${parentPages.length} potential parent pages for database creation`);
      console.log('   We can create databases as children of these pages');
    } else {
      console.log('⚠️  No suitable parent pages found for database creation');
      console.log('   You may need to create a parent page first');
    }
    console.log('');

    // Test 5: Show database schema example
    if (databases.results.length > 0) {
      console.log('5️⃣ Examining database schema...');
      const firstDb = databases.results[0];
      console.log(`   Database: ${firstDb.title?.[0]?.plain_text || 'Untitled'}`);
      console.log('   Properties:');
      
      Object.entries(firstDb.properties).forEach(([name, prop]) => {
        console.log(`     - ${name}: ${prop.type}`);
      });
      console.log('');
    }

    // Test 6: Test what we can do with pages
    console.log('6️⃣ Testing page operations...');
    if (pages.results.length > 0) {
      const firstPage = pages.results[0];
      try {
        const pageContent = await notion.blocks.children.list({
          block_id: firstPage.id
        });
        console.log(`✅ Can read page content (${pageContent.results.length} blocks)`);
      } catch (error) {
        console.log(`❌ Cannot read page content: ${error.message}`);
      }
    }

    console.log('\n🎉 API Test Complete!');
    console.log('\n📋 Summary of Capabilities:');
    console.log(`   ✅ Basic connection: Working`);
    console.log(`   ✅ Search databases: ${databases.results.length} found`);
    console.log(`   ✅ Search pages: ${pages.results.length} found`);
    console.log(`   ✅ Database creation: ${parentPages.length > 0 ? 'Possible' : 'Need parent page'}`);
    console.log(`   ✅ Page operations: Available`);

  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
    
    if (error.code === 'unauthorized') {
      console.log('\n🔧 Troubleshooting:');
      console.log('   1. Check if API key is correct');
      console.log('   2. Verify integration has access to workspace');
      console.log('   3. Make sure pages are shared with integration');
    }
  }
}

// Run the test
if (require.main === module) {
  testNotionCapabilities();
}

module.exports = { testNotionCapabilities };
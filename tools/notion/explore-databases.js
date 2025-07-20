#!/usr/bin/env node

/**
 * Explore Notion Databases
 * Detailed exploration of database contents and schemas
 */

const { notionHelpers, NOTION_CONFIG } = require('./config');

async function exploreDatabases() {
  console.log('🔍 Exploring Notion Databases...\n');

  try {
    // Test connection first
    const connected = await notionHelpers.testConnection();
    if (!connected) {
      throw new Error('Cannot connect to Notion');
    }

    // Explore each configured database
    const databases = Object.entries(NOTION_CONFIG.databases);
    
    for (const [name, id] of databases) {
      console.log(`\n📊 ${name.toUpperCase()} DATABASE`);
      console.log(`   ID: ${id}`);
      
      try {
        // Get database info
        const pages = await notionHelpers.queryDatabase(id);
        console.log(`   📄 Pages: ${pages.length}`);
        
        if (pages.length > 0) {
          // Show sample page properties
          const samplePage = pages[0];
          console.log('   🏷️  Properties:');
          
          Object.entries(samplePage.properties).forEach(([propName, prop]) => {
            console.log(`      - ${propName}: ${prop.type}`);
          });
          
          // Show recent pages
          console.log('   📋 Recent Pages:');
          pages.slice(0, 3).forEach((page, index) => {
            const title = getPageTitle(page);
            const lastEdited = new Date(page.last_edited_time).toLocaleDateString();
            console.log(`      ${index + 1}. ${title} (${lastEdited})`);
          });
          
          if (pages.length > 3) {
            console.log(`      ... and ${pages.length - 3} more pages`);
          }
        }
        
      } catch (error) {
        console.log(`   ❌ Error accessing database: ${error.message}`);
      }
    }

    // Show workspace overview
    console.log('\n🌐 WORKSPACE OVERVIEW');
    const allDatabases = await notionHelpers.listDatabases();
    console.log(`   📊 Total Databases: ${allDatabases.length}`);
    console.log(`   🔗 Configured Databases: ${databases.length}`);
    console.log(`   ✅ Integration Status: Active`);

    console.log('\n🎯 NEXT STEPS');
    console.log('   • Run "npm run sync-docs" to sync documentation');
    console.log('   • Run "npm run update-kpis" to update project metrics');
    console.log('   • Check Notion workspace for updated content');

  } catch (error) {
    console.error('❌ Exploration failed:', error.message);
    process.exit(1);
  }
}

function getPageTitle(page) {
  // Try different title property names
  const titleProps = ['title', 'Name', 'Doc name', 'Goal', 'Project'];
  
  for (const prop of titleProps) {
    if (page.properties[prop]?.title?.[0]?.plain_text) {
      return page.properties[prop].title[0].plain_text;
    }
  }
  
  return 'Untitled';
}

if (require.main === module) {
  exploreDatabases();
}

module.exports = { exploreDatabases };
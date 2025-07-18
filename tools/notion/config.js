/**
 * Notion Integration Configuration
 * Simple configuration for EV Charging Admin project
 */

const { Client } = require('@notionhq/client');

// Configuration
const NOTION_CONFIG = {
  // Your current API key
  apiKey: 'ntn_E32407062553w0greilDyFbiqA1OxfctiLI9owCARwn25c',
  
  // Existing database IDs from your workspace
  databases: {
    issueTracking: '21c0c129-40cf-8066-967a-d82ad57cfe5f',
    engineeringDocs: '2180c129-40cf-8068-920d-c37c7f4a1ee0',
    goalsTracker: '2180c129-40cf-80c0-b957-d70bdc1357ce',
    projects: '2180c129-40cf-80c6-9431-e89a1ea27890'
  },
  
  // Sync settings
  sync: {
    documentationPath: 'docs/',
    githubRepo: 'evc-frontend-admin'
  }
};

// Initialize Notion client
const notion = new Client({
  auth: NOTION_CONFIG.apiKey,
  notionVersion: '2022-06-28'
});

// Simple helper functions
const notionHelpers = {
  // Test connection
  async testConnection() {
    try {
      const user = await notion.users.me();
      console.log(`✅ Connected as: ${user.name || 'Unknown'}`);
      return true;
    } catch (error) {
      console.error('❌ Connection failed:', error.message);
      return false;
    }
  },

  // List databases
  async listDatabases() {
    try {
      const databases = await notion.search({
        filter: { property: 'object', value: 'database' }
      });
      return databases.results;
    } catch (error) {
      console.error('❌ Failed to list databases:', error.message);
      return [];
    }
  },

  // Query database
  async queryDatabase(databaseId) {
    try {
      const response = await notion.databases.query({
        database_id: databaseId
      });
      return response.results;
    } catch (error) {
      console.error(`❌ Failed to query database ${databaseId}:`, error.message);
      return [];
    }
  },

  // Create page in database
  async createPage(databaseId, properties) {
    try {
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties
      });
      return response;
    } catch (error) {
      console.error(`❌ Failed to create page in ${databaseId}:`, error.message);
      return null;
    }
  },

  // Update page
  async updatePage(pageId, properties) {
    try {
      const response = await notion.pages.update({
        page_id: pageId,
        properties
      });
      return response;
    } catch (error) {
      console.error(`❌ Failed to update page ${pageId}:`, error.message);
      return null;
    }
  },

  // Create page with content blocks (simplified approach)
  async createPageWithContent(databaseId, properties, contentBlocks = []) {
    try {
      // For now, just create the page with properties
      // Content sync can be added later with proper chunking
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties
      });

      return response;
    } catch (error) {
      console.error(`❌ Failed to create page with content in ${databaseId}:`, error.message);
      return null;
    }
  }
};

module.exports = {
  notion,
  NOTION_CONFIG,
  notionHelpers
};
/**
 * 📋 EV Charging Admin - Notion Configuration
 * 
 * Enterprise Notion integration for project documentation,
 * task tracking, and knowledge management.
 */

const { Client } = require('@notionhq/client');

// Notion API Configuration
const NOTION_CONFIG = {
  apiKey: 'ntn_U7076947441a8aFQTdH2zD2dsxmeGSEt1OAoe5osNJ6b00',
  version: '2022-06-28'
};

// Initialize Notion client
const notion = new Client({
  auth: NOTION_CONFIG.apiKey,
  notionVersion: NOTION_CONFIG.version
});

// Database Structure for EV Charging Project
const DATABASE_TEMPLATES = {
  // 🎯 Main Project Hub
  projectHub: {
    title: '🚀 EV Charging Admin - Project Hub',
    properties: {
      'Project': { title: {} },
      'Status': { 
        select: {
          options: [
            { name: 'Planning', color: 'blue' },
            { name: 'In Progress', color: 'yellow' },
            { name: 'Review', color: 'orange' },
            { name: 'Completed', color: 'green' },
            { name: 'Blocked', color: 'red' }
          ]
        }
      },
      'Priority': {
        select: {
          options: [
            { name: 'P0 - Critical', color: 'red' },
            { name: 'P1 - High', color: 'orange' },
            { name: 'P2 - Medium', color: 'yellow' },
            { name: 'P3 - Low', color: 'gray' }
          ]
        }
      },
      'Team': {
        multi_select: {
          options: [
            { name: 'Frontend Team', color: 'blue' },
            { name: 'Mobile Team', color: 'green' },
            { name: 'API Team', color: 'purple' },
            { name: 'DevOps Team', color: 'orange' }
          ]
        }
      },
      'Repository': {
        select: {
          options: [
            { name: 'evc-frontend-admin', color: 'blue' },
            { name: 'evc-admin-web', color: 'green' },
            { name: 'evc-admin-mobile', color: 'purple' },
            { name: 'evc-shared-api', color: 'red' },
            { name: 'evc-shared-types', color: 'yellow' }
          ]
        }
      },
      'Sprint': { rich_text: {} }, // Changed from relation to text
      'Due Date': { date: {} },
      'Assignee': { people: {} },
      'GitHub Issue': { url: {} },
      'Linear Issue': { url: {} }
    }
  },

  // 📝 Documentation Database  
  documentation: {
    title: '📚 EV Charging - Documentation Hub',
    properties: {
      'Document': { title: {} },
      'Category': {
        select: {
          options: [
            { name: 'Architecture', color: 'blue' },
            { name: 'Development', color: 'green' },
            { name: 'Mobile', color: 'purple' },
            { name: 'API', color: 'red' },
            { name: 'Deployment', color: 'orange' },
            { name: 'Planning', color: 'yellow' }
          ]
        }
      },
      'Status': {
        select: {
          options: [
            { name: 'Draft', color: 'gray' },
            { name: 'Review', color: 'yellow' },
            { name: 'Published', color: 'green' },
            { name: 'Outdated', color: 'red' }
          ]
        }
      },
      'File Path': { rich_text: {} },
      'Last Updated': { date: {} },
      'Author': { people: {} },
      'GitHub Link': { url: {} },
      'Related Issues': { rich_text: {} } // Changed from relation to text
    }
  },

  // 🎯 Sprint Planning
  sprints: {
    title: '🚀 EV Charging - Sprint Planning',
    properties: {
      'Sprint': { title: {} },
      'Status': {
        select: {
          options: [
            { name: 'Planning', color: 'blue' },
            { name: 'Active', color: 'green' },
            { name: 'Review', color: 'yellow' },
            { name: 'Completed', color: 'gray' }
          ]
        }
      },
      'Start Date': { date: {} },
      'End Date': { date: {} },
      'Goal': { rich_text: {} },
      'Team Capacity': { number: {} },
      'Completed Stories': { number: {} },
      'Total Stories': { number: {} },
      'Sprint Velocity': { formula: { expression: 'prop("Completed Stories") / prop("Total Stories") * 100' } },
      'Repository Focus': {
        multi_select: {
          options: [
            { name: 'evc-frontend-admin', color: 'blue' },
            { name: 'evc-admin-web', color: 'green' },
            { name: 'evc-admin-mobile', color: 'purple' },
            { name: 'Multi-repo', color: 'red' }
          ]
        }
      }
    }
  },

  // 📊 KPI Dashboard
  kpis: {
    title: '📊 EV Charging - KPI Dashboard',
    properties: {
      'Metric': { title: {} },
      'Current Value': { number: {} },
      'Target Value': { number: {} },
      'Unit': { rich_text: {} },
      'Category': {
        select: {
          options: [
            { name: 'Development', color: 'blue' },
            { name: 'Quality', color: 'green' },
            { name: 'Performance', color: 'orange' },
            { name: 'Business', color: 'purple' }
          ]
        }
      },
      'Progress': { formula: { expression: 'prop("Current Value") / prop("Target Value") * 100' } },
      'Last Updated': { date: {} },
      'Repository': { 
        select: {
          options: [
            { name: 'Ecosystem', color: 'red' },
            { name: 'Web App', color: 'blue' },
            { name: 'Mobile App', color: 'green' },
            { name: 'Shared APIs', color: 'purple' }
          ]
        }
      }
    }
  }
};

// Helper Functions
const notionHelpers = {
  // Test connection
  async testConnection() {
    try {
      const response = await notion.users.me();
      console.log('✅ Notion connection successful:', response.name);
      return true;
    } catch (error) {
      console.error('❌ Notion connection failed:', error.message);
      return false;
    }
  },

  // Create database
  async createDatabase(parentPageId, template) {
    try {
      const response = await notion.databases.create({
        parent: { page_id: parentPageId },
        title: [{ text: { content: template.title } }],
        properties: template.properties
      });
      console.log(`✅ Database created: ${template.title}`);
      return response.id;
    } catch (error) {
      console.error(`❌ Failed to create database: ${template.title}`, error.message);
      return null;
    }
  },

  // Add page to database
  async addPage(databaseId, properties, content = []) {
    try {
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties,
        children: content
      });
      return response.id;
    } catch (error) {
      console.error('❌ Failed to add page:', error.message);
      return null;
    }
  },

  // Sync docs from GitHub
  async syncDocumentationFromGitHub(docsPath, databaseId) {
    const fs = require('fs');
    const path = require('path');
    
    try {
      const files = fs.readdirSync(docsPath);
      const markdownFiles = files.filter(file => file.endsWith('.md'));
      
      for (const file of markdownFiles) {
        const filePath = path.join(docsPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const stats = fs.statSync(filePath);
        
        // Extract title from first line
        const lines = content.split('\n');
        const title = lines[0].replace(/^#\s+/, '') || file.replace('.md', '');
        
        // Determine category based on filename
        let category = 'Development';
        if (file.includes('EXPO') || file.includes('MOBILE')) category = 'Mobile';
        if (file.includes('DOCKER') || file.includes('DEPLOY')) category = 'Deployment';
        if (file.includes('ARCHITECTURE') || file.includes('ENTERPRISE')) category = 'Architecture';
        if (file.includes('API')) category = 'API';
        if (file.includes('ROADMAP') || file.includes('PLAN')) category = 'Planning';
        
        const properties = {
          'Document': { title: [{ text: { content: title } }] },
          'Category': { select: { name: category } },
          'Status': { select: { name: 'Published' } },
          'File Path': { rich_text: [{ text: { content: `docs/${file}` } }] },
          'Last Updated': { date: { start: stats.mtime.toISOString().split('T')[0] } },
          'GitHub Link': { 
            url: `https://github.com/your-org/evc-frontend-admin/blob/main/docs/${file}` 
          }
        };
        
        // Convert markdown content to Notion blocks (simplified)
        const contentBlocks = [
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{ text: { content: `📄 Auto-synced from: docs/${file}` } }]
            }
          },
          {
            object: 'block',
            type: 'code',
            code: {
              language: 'markdown',
              rich_text: [{ text: { content: content.substring(0, 2000) } }]
            }
          }
        ];
        
        await this.addPage(databaseId, properties, contentBlocks);
        console.log(`✅ Synced document: ${title}`);
      }
    } catch (error) {
      console.error('❌ Documentation sync failed:', error.message);
    }
  }
};

module.exports = {
  notion,
  NOTION_CONFIG,
  DATABASE_TEMPLATES,
  notionHelpers
}; 
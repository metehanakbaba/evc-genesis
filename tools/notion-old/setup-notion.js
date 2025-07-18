#!/usr/bin/env node

/**
 * 🚀 EV Charging Admin - Notion Setup Script
 * 
 * Initializes Notion workspace with databases and syncs documentation.
 * Run: node tools/notion/setup-notion.js
 */

const { notion, DATABASE_TEMPLATES, notionHelpers } = require('./notion-config');
const path = require('path');

// Notion workspace setup
const SETUP_CONFIG = {
  // Create a new page first in Notion and get its ID
  // This will be the parent page for all databases
  parentPageId: '2324188abd8480baa67ed9e602e09ba4', // ✅ EV Charging Admin Page ID
  
  // Will be populated after database creation
  databaseIds: {
    projectHub: '',
    documentation: '',
    sprints: '',
    kpis: ''
  }
};

async function setupNotionWorkspace() {
  console.log('🚀 Setting up EV Charging Admin Notion workspace...\n');

  try {
    // Step 1: Test connection
    console.log('1️⃣ Testing Notion API connection...');
    const isConnected = await notionHelpers.testConnection();
    if (!isConnected) {
      throw new Error('Notion connection failed');
    }
    console.log('');

    // Step 2: Check if parent page ID is set
    if (!SETUP_CONFIG.parentPageId) {
      console.log('⚠️  Parent page ID not set!');
      console.log('📋 Please:');
      console.log('   1. Create a new page in Notion: "🚀 EV Charging Admin"');
      console.log('   2. Get page ID from URL (32-character string)');
      console.log('   3. Set parentPageId in this script');
      console.log('   4. Run script again');
      console.log('');
      console.log('💡 Example URL: https://notion.so/your-workspace/EV-Charging-Admin-abc123def456...');
      console.log('💡 Page ID: abc123def456...');
      return;
    }

    // Step 3: Create databases
    console.log('2️⃣ Creating Notion databases...');
    
    const projectHubId = await notionHelpers.createDatabase(
      SETUP_CONFIG.parentPageId, 
      DATABASE_TEMPLATES.projectHub
    );
    
    const documentationId = await notionHelpers.createDatabase(
      SETUP_CONFIG.parentPageId, 
      DATABASE_TEMPLATES.documentation
    );
    
    const sprintsId = await notionHelpers.createDatabase(
      SETUP_CONFIG.parentPageId, 
      DATABASE_TEMPLATES.sprints
    );
    
    const kpisId = await notionHelpers.createDatabase(
      SETUP_CONFIG.parentPageId, 
      DATABASE_TEMPLATES.kpis
    );

    // Update config with created database IDs
    SETUP_CONFIG.databaseIds = {
      projectHub: projectHubId,
      documentation: documentationId,
      sprints: sprintsId,
      kpis: kpisId
    };

    console.log('');
    console.log('✅ Databases created successfully!');
    console.log('📋 Database IDs:');
    Object.entries(SETUP_CONFIG.databaseIds).forEach(([name, id]) => {
      console.log(`   ${name}: ${id}`);
    });
    console.log('');

    // Step 4: Sync documentation
    console.log('3️⃣ Syncing documentation from docs/ folder...');
    const docsPath = path.join(__dirname, '../../docs');
    await notionHelpers.syncDocumentationFromGitHub(docsPath, documentationId);
    console.log('');

    // Step 5: Add initial project data
    console.log('4️⃣ Adding initial project data...');
    await addInitialProjectData();
    console.log('');

    // Step 6: Add initial KPIs
    console.log('5️⃣ Setting up initial KPIs...');
    await addInitialKPIs();
    console.log('');

    console.log('🎉 Notion workspace setup completed!');
    console.log('🔗 Access your workspace: https://notion.so');
    console.log('');
    console.log('📋 Next steps:');
    console.log('   1. Share databases with team members');
    console.log('   2. Set up GitHub → Notion automation');
    console.log('   3. Configure Linear integration');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

async function addInitialProjectData() {
  const { projectHub } = SETUP_CONFIG.databaseIds;
  
  // Current projects from your roadmap
  const initialProjects = [
    {
      project: 'Phase 3.1: Web-Admin Integration',
      status: 'In Progress',
      priority: 'P0 - Critical',
      team: ['Frontend Team'],
      repository: 'evc-frontend-admin',
      description: 'Complete TypeScript errors fix and store integration'
    },
    {
      project: 'Expo 53 Mobile Foundation',
      status: 'Planning',
      priority: 'P1 - High',
      team: ['Mobile Team'],
      repository: 'evc-admin-mobile',
      description: 'Setup mobile app with Expo 53 and shared packages'
    },
    {
      project: 'Multi-Repo Architecture',
      status: 'Planning',
      priority: 'P1 - High',
      team: ['DevOps Team', 'Frontend Team'],
      repository: 'evc-frontend-admin',
      description: 'Split monorepo into multiple repositories with submodules'
    },
    {
      project: 'Shared API Completion',
      status: 'In Progress',
      priority: 'P1 - High',
      team: ['API Team'],
      repository: 'evc-shared-api',
      description: 'Complete missing endpoints and fix TypeScript types'
    }
  ];

  for (const project of initialProjects) {
    const properties = {
      'Project': { title: [{ text: { content: project.project } }] },
      'Status': { select: { name: project.status } },
      'Priority': { select: { name: project.priority } },
      'Team': { multi_select: project.team.map(team => ({ name: team })) },
      'Repository': { select: { name: project.repository } }
    };

    const content = [
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{ text: { content: project.description } }]
        }
      }
    ];

    await notionHelpers.addPage(projectHub, properties, content);
    console.log(`✅ Added project: ${project.project}`);
  }
}

async function addInitialKPIs() {
  const { kpis } = SETUP_CONFIG.databaseIds;
  
  // KPIs based on your current project status
  const initialKPIs = [
    {
      metric: 'TypeScript Errors',
      current: 70,
      target: 0,
      unit: 'errors',
      category: 'Quality',
      repository: 'Web App'
    },
    {
      metric: 'Code Coverage',
      current: 85,
      target: 90,
      unit: '%',
      category: 'Quality',
      repository: 'Ecosystem'
    },
    {
      metric: 'Build Performance',
      current: 82,
      target: 90,
      unit: '% faster',
      category: 'Performance',
      repository: 'Ecosystem'
    },
    {
      metric: 'Documentation Coverage',
      current: 95,
      target: 100,
      unit: '%',
      category: 'Development',
      repository: 'Ecosystem'
    },
    {
      metric: 'Mobile Bundle Size',
      current: 18.5,
      target: 25,
      unit: 'MB',
      category: 'Performance',
      repository: 'Mobile App'
    },
    {
      metric: 'Shared Code Reuse',
      current: 87,
      target: 90,
      unit: '%',
      category: 'Development',
      repository: 'Ecosystem'
    }
  ];

  for (const kpi of initialKPIs) {
    const properties = {
      'Metric': { title: [{ text: { content: kpi.metric } }] },
      'Current Value': { number: kpi.current },
      'Target Value': { number: kpi.target },
      'Unit': { rich_text: [{ text: { content: kpi.unit } }] },
      'Category': { select: { name: kpi.category } },
      'Repository': { select: { name: kpi.repository } },
      'Last Updated': { date: { start: new Date().toISOString().split('T')[0] } }
    };

    await notionHelpers.addPage(kpis, properties);
    console.log(`✅ Added KPI: ${kpi.metric}`);
  }
}

// Export database IDs for other scripts
function saveDatabaseConfig() {
  const configContent = `// Auto-generated database IDs
module.exports = ${JSON.stringify(SETUP_CONFIG.databaseIds, null, 2)};`;
  
  require('fs').writeFileSync(
    path.join(__dirname, 'database-ids.js'),
    configContent
  );
  console.log('💾 Database IDs saved to database-ids.js');
}

// Run setup if called directly
if (require.main === module) {
  setupNotionWorkspace()
    .then(() => {
      saveDatabaseConfig();
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Setup failed:', error);
      process.exit(1);
    });
}

module.exports = {
  setupNotionWorkspace,
  SETUP_CONFIG
}; 
#!/usr/bin/env node

/**
 * 🎯 LINEAR TASK CREATION SCRIPT
 * Creates all tasks for EV Charging Multi-Repo Migration
 * 
 * Prerequisites:
 * 1. Linear workspace set up with teams and labels
 * 2. LINEAR_API_KEY environment variable set
 * 3. Node.js and npm installed
 * 
 * Usage:
 * npm install @linear/sdk
 * export LINEAR_API_KEY="your_api_key_here"
 * node create-linear-tasks.js
 */

const { LinearClient } = require('@linear/sdk');

// Initialize Linear client
const linear = new LinearClient({
//   apiKey: process.env.LINEAR_API_KEY
    apiKey: 'lin_oauth_c66d6789861bf6f0227c0aa86abebaf6172da9a28eeca7a00e0b29a721a2e803'
});

// Task definitions based on your structure
const TASKS = {
  // MILESTONE 1: Foundation (Week 1-2)
  milestone1: {
    name: "🏗️ Foundation (Week 1-2)",
    tasks: [
      {
        title: "🏢 Create 10 Enterprise Repositories",
        description: `Create GitHub repositories for all 10 components:
- Set up repository templates and standards
- Configure branch protection rules
- Setup initial CI/CD workflows

**Repositories to create:**
- evc-admin-web
- evc-admin-mobile  
- evc-shared-api
- evc-shared-types
- evc-shared-store
- evc-shared-utils
- evc-shared-business-logic
- evc-ui-components
- evc-design-tokens

**Acceptance Criteria:**
✅ All 10 repos created with consistent naming
✅ Branch protection enabled (main branch)
✅ Repository templates applied
✅ Basic CI/CD workflows configured`,
        teamKey: "PLATFORM",
        priority: 1, // P0
        estimate: 3,
        labels: ["ecosystem-wide", "infrastructure", "P0-ecosystem"]
      },
      {
        title: "🔧 Develop Git History Preservation Scripts",
        description: `Create scripts to split monorepo while preserving git history:
- Implement automated submodule setup scripts
- Add validation and rollback mechanisms

**Acceptance Criteria:**
✅ Git filter-branch scripts for each package/app
✅ Submodule integration automation
✅ History preservation validation
✅ Rollback procedures documented`,
        teamKey: "PLATFORM",
        priority: 1, // P0
        estimate: 2,
        labels: ["single-repo", "infrastructure", "P0-ecosystem"]
      },
      {
        title: "📱 Verify Expo 53 Compatibility",
        description: `Confirm all mobile dependencies work with Expo 53:
- Test build and deployment processes
- Update EAS configuration

**Acceptance Criteria:**
✅ Expo 53.0.13 builds successfully
✅ All native modules compatible
✅ EAS build configuration updated
✅ Development client working`,
        teamKey: "MOBILE",
        priority: 2, // P1
        estimate: 1,
        labels: ["single-repo", "mobile", "P1-breaking"]
      }
    ]
  },

  // MILESTONE 2: Repository Split (Week 3-4)
  milestone2: {
    name: "🚀 Repository Split (Week 3-4)",
    tasks: [
      {
        title: "📦 Migrate Shared Packages to Separate Repos",
        description: `Split shared packages preserving git history:
- Setup independent versioning
- Configure cross-package dependencies

**Acceptance Criteria:**
✅ evc-shared-api migrated with full history
✅ evc-shared-types migrated with full history
✅ evc-shared-store migrated with full history
✅ evc-shared-utils migrated with full history
✅ evc-shared-business-logic migrated with full history
✅ Independent package.json configurations
✅ Semantic versioning setup`,
        teamKey: "API",
        priority: 1, // P0
        estimate: 5,
        labels: ["cross-repo", "shared", "P0-ecosystem"],
        dependsOn: ["🏢 Create 10 Enterprise Repositories"]
      },
      {
        title: "🌐📱 Migrate Apps to Separate Repos",
        description: `Split web and mobile apps preserving git history:
- Configure independent deployment pipelines
- Setup environment-specific configurations

**Acceptance Criteria:**
✅ evc-admin-web migrated with full history
✅ evc-admin-mobile migrated with full history
✅ Independent deployment configurations
✅ Environment variables properly configured
✅ Build processes working independently`,
        teamKey: "WEB",
        priority: 1, // P0
        estimate: 3,
        labels: ["cross-repo", "web", "mobile", "P0-ecosystem"],
        dependsOn: ["🏢 Create 10 Enterprise Repositories"]
      },
      {
        title: "🎨 Migrate UI Components and Design Tokens",
        description: `Split UI components and design tokens to separate repos:
- Setup Storybook for component documentation
- Configure design token distribution

**Acceptance Criteria:**
✅ evc-ui-components migrated with full history
✅ evc-design-tokens migrated with full history
✅ Storybook configured and deployed
✅ Design token build pipeline working
✅ Component library documentation updated`,
        teamKey: "DESIGN",
        priority: 2, // P1
        estimate: 2,
        labels: ["cross-repo", "shared", "P1-breaking"],
        dependsOn: ["🏢 Create 10 Enterprise Repositories"]
      }
    ]
  },

  // MILESTONE 3: Submodule Integration (Week 5-6)
  milestone3: {
    name: "🔗 Submodule Integration (Week 5-6)",
    tasks: [
      {
        title: "🔗 Configure Git Submodules",
        description: `Add all repositories as submodules to main orchestrator:
- Configure submodule tracking and automation
- Setup development workflow scripts

**Acceptance Criteria:**
✅ All 9 repos added as submodules
✅ Submodule update automation configured
✅ Developer workflow scripts created
✅ Submodule documentation updated`,
        teamKey: "PLATFORM",
        priority: 1, // P0
        estimate: 2,
        labels: ["ecosystem-wide", "infrastructure", "P0-ecosystem"],
        dependsOn: ["📦 Migrate Shared Packages to Separate Repos", "🌐📱 Migrate Apps to Separate Repos"]
      },
      {
        title: "🚀 Setup Cross-Repo CI/CD",
        description: `Configure coordinated builds across repositories:
- Setup dependency-aware deployment pipeline
- Implement cross-repo testing automation

**Acceptance Criteria:**
✅ Cross-repo build orchestration working
✅ Dependency-aware deployments configured
✅ Integration tests across repos passing
✅ Release coordination automation setup`,
        teamKey: "PLATFORM",
        priority: 1, // P0
        estimate: 3,
        labels: ["ecosystem-wide", "infrastructure", "P0-ecosystem"],
        dependsOn: ["🔗 Configure Git Submodules"]
      },
      {
        title: "📋 Setup Notion Multi-Repo Hub",
        description: `Create Notion workspace for cross-repo documentation:
- Setup automated documentation sync
- Configure cross-repo metrics dashboard

**Acceptance Criteria:**
✅ Notion multi-repo workspace created
✅ Automated README sync configured
✅ Cross-repo metrics dashboard setup
✅ Team access and permissions configured`,
        teamKey: "PLATFORM",
        priority: 2, // P1
        estimate: 2,
        labels: ["ecosystem-wide", "docs", "P1-breaking"]
      }
    ]
  },

  // MILESTONE 4: Enterprise Integration (Week 7-8)
  milestone4: {
    name: "📊 Enterprise Integration (Week 7-8)",
    tasks: [
      {
        title: "🎯 Configure Linear Multi-Repo Tracking",
        description: `Setup Linear teams for each repository:
- Configure cross-repo issue linking
- Implement dependency tracking automation

**Acceptance Criteria:**
✅ Linear teams created for each repo
✅ Cross-repo issue linking working
✅ Dependency tracking automation setup
✅ Release coordination workflows configured`,
        teamKey: "PLATFORM",
        priority: 2, // P1
        estimate: 2,
        labels: ["ecosystem-wide", "infrastructure", "P1-breaking"]
      },
      {
        title: "🔧 Enhanced Cursor MCP Configuration",
        description: `Configure Cursor MCP for multi-repo development:
- Setup cross-repo commands and automation
- Integrate with Notion and Linear

**Acceptance Criteria:**
✅ MCP multi-repo configuration complete
✅ Cross-repo Cursor commands working
✅ Notion/Linear integration configured
✅ Developer experience optimized`,
        teamKey: "PLATFORM",
        priority: 3, // P2
        estimate: 1,
        labels: ["single-repo", "infrastructure", "P2-feature"]
      },
      {
        title: "📊 Enterprise Metrics & Monitoring",
        description: `Setup cross-repo performance monitoring:
- Configure enterprise KPI dashboard
- Implement alerting and notification systems

**Acceptance Criteria:**
✅ Cross-repo build performance monitoring
✅ Enterprise KPI dashboard deployed
✅ Alerting system configured
✅ Team notification workflows setup`,
        teamKey: "PLATFORM",
        priority: 2, // P1
        estimate: 3,
        labels: ["ecosystem-wide", "infrastructure", "P1-breaking"]
      }
    ]
  }
};

// Helper functions
async function getTeamId(teamKey) {
  const teams = await linear.teams();
  const team = teams.nodes.find(t => t.key === teamKey);
  return team?.id;
}

async function getLabelId(labelName) {
  const labels = await linear.issueLabels();
  const label = labels.nodes.find(l => l.name === labelName);
  return label?.id;
}

async function getProjectId(projectName) {
  const projects = await linear.projects();
  const project = projects.nodes.find(p => p.name.includes(projectName));
  return project?.id;
}

async function createTask(task, projectId) {
  try {
    console.log(`Creating task: ${task.title}`);
    
    // Get team ID
    const teamId = await getTeamId(task.teamKey);
    if (!teamId) {
      console.error(`Team not found: ${task.teamKey}`);
      return null;
    }

    // Get label IDs
    const labelIds = [];
    for (const labelName of task.labels || []) {
      const labelId = await getLabelId(labelName);
      if (labelId) labelIds.push(labelId);
    }

    // Create the issue
    const issuePayload = {
      title: task.title,
      description: task.description,
      teamId: teamId,
      priority: task.priority,
      estimate: task.estimate,
      labelIds: labelIds,
      projectId: projectId
    };

    const issue = await linear.issueCreate(issuePayload);
    
    if (issue.success) {
      console.log(`✅ Created: ${task.title}`);
      return issue.issue;
    } else {
      console.error(`❌ Failed to create: ${task.title}`, issue.error);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error creating task ${task.title}:`, error.message);
    return null;
  }
}

async function createAllTasks() {
  try {
    console.log('🚀 Starting Linear task creation...\n');

    // Get project ID for Multi-Repo Migration
    const projectId = await getProjectId('Multi-Repo Migration');
    if (!projectId) {
      console.error('❌ Multi-Repo Migration project not found. Please create it first.');
      return;
    }

    const createdTasks = {};

    // Create tasks for each milestone
    for (const [milestoneKey, milestone] of Object.entries(TASKS)) {
      console.log(`\n📋 Creating tasks for: ${milestone.name}`);
      
      for (const task of milestone.tasks) {
        const createdTask = await createTask(task, projectId);
        if (createdTask) {
          createdTasks[task.title] = createdTask;
        }
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    console.log('\n🎉 Task creation completed!');
    console.log(`📊 Created ${Object.keys(createdTasks).length} tasks`);

    // TODO: Set up task dependencies
    console.log('\n📝 Next steps:');
    console.log('1. Review created tasks in Linear');
    console.log('2. Set up task dependencies manually');
    console.log('3. Assign tasks to team members');
    console.log('4. Start with Week 1 tasks!');

  } catch (error) {
    console.error('❌ Error in task creation:', error.message);
  }
}

// Main execution
if (require.main === module) {
  if (!process.env.LINEAR_API_KEY) {
    console.error('❌ LINEAR_API_KEY environment variable is required');
    console.log('Get your API key from: https://linear.app/settings/api');
    process.exit(1);
  }

  createAllTasks();
}

module.exports = { TASKS, createAllTasks };
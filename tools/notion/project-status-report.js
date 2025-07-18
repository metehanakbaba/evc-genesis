#!/usr/bin/env node

/**
 * Project Status Report Generator
 * Generates comprehensive project status reports from Notion Projects database
 */

const { notionHelpers, NOTION_CONFIG } = require('./config');

async function generateProjectStatusReport() {
  console.log('📊 Generating Project Status Report...\n');

  try {
    // Test connection first
    const connected = await notionHelpers.testConnection();
    if (!connected) {
      throw new Error('Cannot connect to Notion');
    }

    // Get all projects from database
    const projects = await notionHelpers.queryDatabase(NOTION_CONFIG.databases.projects);
    console.log(`📋 Found ${projects.length} projects in database\n`);

    if (projects.length === 0) {
      console.log('⚠️  No projects found. Run "npm run analyze-projects" first.');
      return;
    }

    // Parse and analyze projects
    const projectData = projects.map(project => {
      const props = project.properties;
      return {
        name: props['Project name']?.title?.[0]?.plain_text || 'Untitled',
        status: props['Status']?.status?.name || 'Unknown',
        priority: props['Priority']?.select?.name || 'Medium',
        startValue: props['Start value']?.number || 0,
        endValue: props['End value']?.number || 100,
        budget: props['Budget']?.number || 0,
        startDate: props['Start date']?.date?.start || null,
        summary: props['AI summary']?.rich_text?.[0]?.plain_text || 'No summary available',
        progress: calculateProgress(props['Start value']?.number || 0, props['End value']?.number || 100)
      };
    });

    // Generate comprehensive report
    generateDetailedReport(projectData);
    generateSummaryStats(projectData);
    generateRecommendations(projectData);

  } catch (error) {
    console.error('❌ Report generation failed:', error.message);
    process.exit(1);
  }
}

function calculateProgress(current, target) {
  if (target === 0) return 0;
  return Math.round((current / target) * 100);
}

function generateDetailedReport(projects) {
  console.log('📈 DETAILED PROJECT STATUS REPORT');
  console.log('=' .repeat(60));
  
  // Group by status
  const statusGroups = {
    'Done': projects.filter(p => p.status === 'Done'),
    'In progress': projects.filter(p => p.status === 'In progress'),
    'Not started': projects.filter(p => p.status === 'Not started')
  };

  Object.entries(statusGroups).forEach(([status, projectList]) => {
    if (projectList.length > 0) {
      console.log(`\n🔹 ${status.toUpperCase()} (${projectList.length} projects)`);
      console.log('-'.repeat(40));
      
      projectList.forEach(project => {
        const progressBar = generateProgressBar(project.progress);
        const budgetFormatted = new Intl.NumberFormat('en-US', { 
          style: 'currency', 
          currency: 'USD',
          minimumFractionDigits: 0
        }).format(project.budget);
        
        console.log(`\n📋 ${project.name}`);
        console.log(`   Progress: ${progressBar} ${project.progress}%`);
        console.log(`   Priority: ${getPriorityIcon(project.priority)} ${project.priority}`);
        console.log(`   Budget: ${budgetFormatted}`);
        if (project.startDate) {
          console.log(`   Started: ${new Date(project.startDate).toLocaleDateString()}`);
        }
        console.log(`   Summary: ${project.summary.substring(0, 100)}...`);
      });
    }
  });
}

function generateSummaryStats(projects) {
  console.log('\n\n📊 PROJECT PORTFOLIO SUMMARY');
  console.log('=' .repeat(60));
  
  const stats = {
    total: projects.length,
    completed: projects.filter(p => p.status === 'Done').length,
    inProgress: projects.filter(p => p.status === 'In progress').length,
    notStarted: projects.filter(p => p.status === 'Not started').length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    averageProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length),
    highPriority: projects.filter(p => p.priority === 'High').length,
    mediumPriority: projects.filter(p => p.priority === 'Medium').length,
    lowPriority: projects.filter(p => p.priority === 'Low').length
  };

  console.log(`\n📈 Overall Progress: ${stats.averageProgress}%`);
  console.log(`💰 Total Budget: ${new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(stats.totalBudget)}`);
  
  console.log(`\n📊 Status Distribution:`);
  console.log(`   ✅ Completed: ${stats.completed} (${Math.round(stats.completed/stats.total*100)}%)`);
  console.log(`   🔄 In Progress: ${stats.inProgress} (${Math.round(stats.inProgress/stats.total*100)}%)`);
  console.log(`   ⏸️  Not Started: ${stats.notStarted} (${Math.round(stats.notStarted/stats.total*100)}%)`);
  
  console.log(`\n🎯 Priority Distribution:`);
  console.log(`   🔴 High Priority: ${stats.highPriority} projects`);
  console.log(`   🟡 Medium Priority: ${stats.mediumPriority} projects`);
  console.log(`   🟢 Low Priority: ${stats.lowPriority} projects`);
}

function generateRecommendations(projects) {
  console.log('\n\n💡 STRATEGIC RECOMMENDATIONS');
  console.log('=' .repeat(60));
  
  const highPriorityInProgress = projects.filter(p => p.priority === 'High' && p.status === 'In progress');
  const stalled = projects.filter(p => p.progress < 20 && p.status === 'In progress');
  const nearCompletion = projects.filter(p => p.progress >= 80 && p.status === 'In progress');
  const notStartedHigh = projects.filter(p => p.priority === 'High' && p.status === 'Not started');

  console.log('\n🎯 IMMEDIATE ACTIONS:');
  
  if (nearCompletion.length > 0) {
    console.log(`\n✅ COMPLETE THESE PROJECTS (${nearCompletion.length} projects near completion):`);
    nearCompletion.forEach(p => {
      console.log(`   • ${p.name} (${p.progress}% complete)`);
    });
  }

  if (notStartedHigh.length > 0) {
    console.log(`\n🚀 START HIGH PRIORITY PROJECTS (${notStartedHigh.length} not started):`);
    notStartedHigh.forEach(p => {
      console.log(`   • ${p.name} - ${p.summary.substring(0, 80)}...`);
    });
  }

  if (stalled.length > 0) {
    console.log(`\n⚠️  REVIEW STALLED PROJECTS (${stalled.length} projects < 20% progress):`);
    stalled.forEach(p => {
      console.log(`   • ${p.name} (${p.progress}% - may need resources or priority adjustment)`);
    });
  }

  console.log(`\n📈 FOCUS AREAS:`);
  console.log(`   • ${highPriorityInProgress.length} high-priority projects in active development`);
  console.log(`   • Consider resource allocation for stalled projects`);
  console.log(`   • Prioritize completion of near-finished projects for quick wins`);
  
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const avgBudget = totalBudget / projects.length;
  console.log(`\n💰 BUDGET INSIGHTS:`);
  console.log(`   • Average project budget: ${new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(avgBudget)}`);
  console.log(`   • Total portfolio value: ${new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(totalBudget)}`);
}

function generateProgressBar(progress) {
  const barLength = 20;
  const filledLength = Math.round((progress / 100) * barLength);
  const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
  return `[${bar}]`;
}

function getPriorityIcon(priority) {
  switch (priority) {
    case 'High': return '🔴';
    case 'Medium': return '🟡';
    case 'Low': return '🟢';
    default: return '⚪';
  }
}

if (require.main === module) {
  generateProjectStatusReport();
}

module.exports = { generateProjectStatusReport };
#!/usr/bin/env node

/**
 * KPI Update Script
 * Updates Goals Tracker database with current project metrics
 */

const { notionHelpers, NOTION_CONFIG } = require('./config');
const fs = require('fs');
const path = require('path');

async function updateKPIs() {
  console.log('📊 Updating KPIs in Goals Tracker...\n');

  try {
    // Test connection first
    const connected = await notionHelpers.testConnection();
    if (!connected) {
      throw new Error('Cannot connect to Notion');
    }

    // Collect project metrics
    const metrics = await collectProjectMetrics();
    console.log(`📈 Collected ${Object.keys(metrics).length} metrics\n`);

    // Get existing KPIs from Goals Tracker
    const existingKPIs = await notionHelpers.queryDatabase(NOTION_CONFIG.databases.goalsTracker);
    console.log(`📋 Found ${existingKPIs.length} existing KPIs in Notion\n`);

    // Update or create KPIs
    for (const [metricName, metricData] of Object.entries(metrics)) {
      console.log(`🔄 Processing ${metricName}...`);

      try {
        // Check if KPI already exists
        const existingKPI = existingKPIs.find(kpi => {
          const goalTitle = kpi.properties?.['Goal name']?.title?.[0]?.plain_text;
          return goalTitle === metricName;
        });

        // Prepare KPI properties based on actual database schema
        const properties = {
          'Goal name': {
            title: [{ text: { content: metricName } }]
          },
          'Status': {
            status: { name: getKPIStatus(metricData.current, metricData.target, metricData.higherIsBetter) }
          },
          'Priority': {
            select: { name: getPriorityFromMetric(metricData) }
          },
          'Team': {
            multi_select: [{ name: metricData.category }]
          }
        };

        if (existingKPI) {
          // Update existing KPI
          await notionHelpers.updatePage(existingKPI.id, properties);
          console.log(`   ✅ Updated: ${metricName} (${metricData.current}/${metricData.target})`);
        } else {
          // Create new KPI
          await notionHelpers.createPage(NOTION_CONFIG.databases.goalsTracker, properties);
          console.log(`   ✅ Created: ${metricName} (${metricData.current}/${metricData.target})`);
        }

      } catch (error) {
        console.log(`   ❌ Failed: ${error.message}`);
      }
    }

    console.log('\n🎉 KPI update completed!');
    console.log(`📊 Updated ${Object.keys(metrics).length} metrics`);

  } catch (error) {
    console.error('❌ KPI update failed:', error.message);
    process.exit(1);
  }
}

async function collectProjectMetrics() {
  const metrics = {};
  const projectRoot = path.join(__dirname, '../..');

  try {
    // 1. TypeScript errors (from tsc --noEmit)
    // This is a placeholder - you'd run actual tsc command
    metrics['TypeScript Errors'] = {
      current: 0, // Would be actual count from tsc output
      target: 0,
      category: 'Quality',
      higherIsBetter: false
    };

    // 2. Documentation coverage (count of .md files)
    const docsPath = path.join(projectRoot, 'docs');
    if (fs.existsSync(docsPath)) {
      const docFiles = fs.readdirSync(docsPath).filter(f => f.endsWith('.md'));
      metrics['Documentation Files'] = {
        current: docFiles.length,
        target: 15,
        category: 'Development',
        higherIsBetter: true
      };
    }

    // 3. Package count (from package.json)
    const packageJsonPath = path.join(projectRoot, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const depCount = Object.keys(packageJson.dependencies || {}).length;
      const devDepCount = Object.keys(packageJson.devDependencies || {}).length;
      
      metrics['Dependencies'] = {
        current: depCount,
        target: 50,
        category: 'Development',
        higherIsBetter: false // Too many deps can be bad
      };

      metrics['Dev Dependencies'] = {
        current: devDepCount,
        target: 30,
        category: 'Development',
        higherIsBetter: false
      };
    }

    // 4. Apps count (from apps directory)
    const appsPath = path.join(projectRoot, 'apps');
    if (fs.existsSync(appsPath)) {
      const apps = fs.readdirSync(appsPath).filter(f => 
        fs.statSync(path.join(appsPath, f)).isDirectory()
      );
      metrics['Applications'] = {
        current: apps.length,
        target: 3,
        category: 'Development',
        higherIsBetter: true
      };
    }

    // 5. Packages count (from packages directory)
    const packagesPath = path.join(projectRoot, 'packages');
    if (fs.existsSync(packagesPath)) {
      const packages = fs.readdirSync(packagesPath).filter(f => 
        fs.statSync(path.join(packagesPath, f)).isDirectory()
      );
      metrics['Shared Packages'] = {
        current: packages.length,
        target: 5,
        category: 'Development',
        higherIsBetter: true
      };
    }

    // 6. Build performance (placeholder)
    metrics['Build Performance'] = {
      current: 85,
      target: 90,
      category: 'Performance',
      higherIsBetter: true
    };

  } catch (error) {
    console.error('Error collecting metrics:', error.message);
  }

  return metrics;
}

function getKPIStatus(current, target, higherIsBetter = true) {
  const ratio = current / target;
  
  if (higherIsBetter) {
    if (ratio >= 1.0) return 'Done';
    if (ratio >= 0.5) return 'In progress';
    return 'Not started';
  } else {
    if (current <= target) return 'Done';
    if (ratio <= 1.5) return 'In progress';
    return 'Not started';
  }
}

function getPriorityFromMetric(metricData) {
  // Determine priority based on category and current vs target
  if (metricData.category === 'Quality') {
    return 'P1-High';
  } else if (metricData.category === 'Performance') {
    return 'P2-Medium';
  } else {
    return 'P3-Low';
  }
}

if (require.main === module) {
  updateKPIs();
}

module.exports = { updateKPIs };
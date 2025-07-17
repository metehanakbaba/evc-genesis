/**
 * 🎯 EV Charging Admin - Linear Configuration
 * 
 * Linear API integration for issue tracking, sprint planning,
 * and project management.
 */

const LINEAR_CONFIG = {
  apiKey: 'lin_oauth_c66d6789861bf6f0227c0aa86abebaf6172da9a28eeca7a00e0b29a721a2e803',
  apiUrl: 'https://api.linear.app/graphql'
};

/**
 * Linear API Client Setup
 * Using GraphQL for Linear API v2
 */
async function linearRequest(query, variables = {}) {
  const response = await fetch(LINEAR_CONFIG.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': LINEAR_CONFIG.apiKey
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  const data = await response.json();
  
  if (data.errors) {
    console.error('❌ Linear API Error:', data.errors);
    throw new Error(data.errors[0].message);
  }
  
  return data.data;
}

/**
 * 🔍 Test Linear API Access
 * Check what we can access with the API key
 */
async function testLinearAccess() {
  console.log('🧪 Testing Linear API access...\n');
  
  try {
    // 1. Get current user/viewer info
    const viewerQuery = `
      query Viewer {
        viewer {
          id
          name
          email
          admin
        }
      }
    `;
    
    const viewerData = await linearRequest(viewerQuery);
    console.log('✅ Authenticated as:', viewerData.viewer);
    
    // 2. Get available teams
    const teamsQuery = `
      query Teams {
        teams {
          nodes {
            id
            name
            description
            key
          }
        }
      }
    `;
    
    const teamsData = await linearRequest(teamsQuery);
    console.log('\n📋 Available Teams:');
    teamsData.teams.nodes.forEach(team => {
      console.log(`  - ${team.name} (${team.key})`);
    });
    
    // 3. Get workflows (issue states)
    const workflowsQuery = `
      query Workflows {
        workflowStates {
          nodes {
            id
            name
            type
            color
            position
            team {
              name
            }
          }
        }
      }
    `;
    
    const workflowsData = await linearRequest(workflowsQuery);
    console.log('\n🔄 Available Workflows:');
    const groupedByTeam = {};
    workflowsData.workflowStates.nodes.forEach(state => {
      const teamName = state.team?.name || 'Default';
      if (!groupedByTeam[teamName]) {
        groupedByTeam[teamName] = [];
      }
      groupedByTeam[teamName].push(state);
    });
    
    Object.entries(groupedByTeam).forEach(([team, states]) => {
      console.log(`  ${team}:`);
      states.sort((a, b) => a.position - b.position).forEach(state => {
        console.log(`    - ${state.name} (${state.type})`);
      });
    });
    
    // 4. Check existing projects
    const projectsQuery = `
      query Projects {
        projects {
          nodes {
            id
            name
            description
            state
            startDate
            targetDate
          }
        }
      }
    `;
    
    const projectsData = await linearRequest(projectsQuery);
    console.log('\n🚀 Existing Projects:');
    projectsData.projects.nodes.forEach(project => {
      console.log(`  - ${project.name} (${project.state})`);
    });
    
    return {
      viewer: viewerData.viewer,
      teams: teamsData.teams.nodes,
      workflows: workflowsData.workflowStates.nodes,
      projects: projectsData.projects.nodes
    };
    
  } catch (error) {
    console.error('❌ Failed to access Linear API:', error.message);
    throw error;
  }
}

/**
 * 📝 Create Issue in Linear
 */
async function createIssue(teamId, title, description, labels = [], priority = 3) {
  const mutation = `
    mutation CreateIssue($teamId: String!, $title: String!, $description: String, $labelIds: [String!], $priority: Int) {
      issueCreate(
        input: {
          teamId: $teamId
          title: $title
          description: $description
          labelIds: $labelIds
          priority: $priority
        }
      ) {
        success
        issue {
          id
          identifier
          title
          url
        }
      }
    }
  `;
  
  const variables = {
    teamId,
    title,
    description,
    labelIds: labels,
    priority
  };
  
  const result = await linearRequest(mutation, variables);
  return result.issueCreate;
}

/**
 * 🏷️ Create Label in Linear
 */
async function createLabel(teamId, name, color = '#4B5563', description = '') {
  const mutation = `
    mutation CreateLabel($teamId: String!, $name: String!, $color: String!, $description: String) {
      issueLabelCreate(
        input: {
          teamId: $teamId
          name: $name
          color: $color
          description: $description
        }
      ) {
        success
        issueLabel {
          id
          name
          color
        }
      }
    }
  `;
  
  const variables = {
    teamId,
    name,
    color,
    description
  };
  
  const result = await linearRequest(mutation, variables);
  return result.issueLabelCreate;
}

/**
 * 🎯 Create Project/Milestone in Linear
 */
async function createProject(teamId, name, description, targetDate) {
  const mutation = `
    mutation CreateProject($teamId: String!, $name: String!, $description: String, $targetDate: TimelessDate) {
      projectCreate(
        input: {
          teamId: $teamId
          name: $name
          description: $description
          targetDate: $targetDate
        }
      ) {
        success
        project {
          id
          name
          url
        }
      }
    }
  `;
  
  const variables = {
    teamId,
    name,
    description,
    targetDate
  };
  
  const result = await linearRequest(mutation, variables);
  return result.projectCreate;
}

/**
 * 🔍 Get existing labels
 */
async function getLabels(teamId) {
  const query = `
    query GetLabels($teamId: String!) {
      team(id: $teamId) {
        labels {
          nodes {
            id
            name
            color
            description
          }
        }
      }
    }
  `;
  
  const result = await linearRequest(query, { teamId });
  return result.team.labels.nodes;
}

module.exports = {
  LINEAR_CONFIG,
  linearRequest,
  testLinearAccess,
  createIssue,
  createLabel,
  createProject,
  getLabels
}; 
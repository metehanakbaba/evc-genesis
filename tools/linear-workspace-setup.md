# 🎯 LINEAR WORKSPACE SETUP - EV CHARGING MULTI-REPO

## 📋 **WORKSPACE CONFIGURATION**

### **1. Create Linear Workspace**
```
Workspace Name: EV Charging Ecosystem
URL: ev-charging-ecosystem.linear.app
Description: Enterprise multi-repo development for EV charging admin platform
```

---

## 👥 **TEAMS SETUP**

### **Create Teams in Linear**
Navigate to Settings → Teams → Create Team

```yaml
Teams:
  - name: "🏢 Platform Team"
    key: "PLATFORM"
    description: "Main orchestrator, infrastructure, and cross-repo coordination"
    color: "#6366F1" # Indigo
    
  - name: "🌐 Web Team" 
    key: "WEB"
    description: "Next.js 15 + React 19 web application"
    color: "#10B981" # Emerald
    
  - name: "📱 Mobile Team"
    key: "MOBILE" 
    description: "Expo 53 + React Native mobile application"
    color: "#F59E0B" # Amber
    
  - name: "🔗 API Team"
    key: "API"
    description: "Shared API, types, and data layer"
    color: "#EF4444" # Red
    
  - name: "🏪 State Team"
    key: "STATE"
    description: "Redux store and business logic"
    color: "#8B5CF6" # Violet
    
  - name: "🎨 Design Team"
    key: "DESIGN"
    description: "UI components and design tokens"
    color: "#EC4899" # Pink
```

---

## 🏷️ **LABELS SETUP**

### **Scope Labels**
```yaml
Scope:
  - name: "single-repo"
    color: "#22C55E" # Green
    description: "Changes affecting only one repository"
    
  - name: "cross-repo" 
    color: "#F97316" # Orange
    description: "Changes affecting multiple repositories"
    
  - name: "ecosystem-wide"
    color: "#DC2626" # Red
    description: "Changes affecting entire ecosystem"
```

### **Impact Labels**
```yaml
Impact:
  - name: "breaking-change"
    color: "#DC2626" # Red
    description: "Breaking changes requiring coordination"
    
  - name: "feature"
    color: "#3B82F6" # Blue
    description: "New feature implementation"
    
  - name: "bugfix"
    color: "#F59E0B" # Amber
    description: "Bug fixes and patches"
    
  - name: "docs"
    color: "#6B7280" # Gray
    description: "Documentation updates"
```

### **Platform Labels**
```yaml
Platform:
  - name: "web"
    color: "#10B981" # Emerald
    description: "Web application specific"
    
  - name: "mobile"
    color: "#F59E0B" # Amber
    description: "Mobile application specific"
    
  - name: "shared"
    color: "#8B5CF6" # Violet
    description: "Shared packages and libraries"
    
  - name: "infrastructure"
    color: "#6366F1" # Indigo
    description: "Infrastructure and tooling"
```

### **Priority Labels**
```yaml
Priority:
  - name: "P0-ecosystem"
    color: "#DC2626" # Red
    description: "Critical ecosystem-wide priority"
    
  - name: "P1-breaking"
    color: "#F97316" # Orange
    description: "High priority breaking changes"
    
  - name: "P2-feature"
    color: "#3B82F6" # Blue
    description: "Standard feature priority"
    
  - name: "P3-nice"
    color: "#6B7280" # Gray
    description: "Nice to have improvements"
```

---

## 📊 **PROJECTS SETUP**

### **Create Projects in Linear**
Navigate to Projects → Create Project

```yaml
Projects:
  - name: "🚀 Multi-Repo Migration"
    key: "MIGRATION"
    description: "8-week enterprise multi-repo migration"
    status: "In Progress"
    target_date: "2025-03-14" # 8 weeks from now
    lead: "Platform Team"
    
  - name: "📱 Expo 53 Enhancement"
    key: "EXPO53"
    description: "Mobile app enhancement with Expo 53"
    status: "Planning"
    target_date: "2025-02-28"
    lead: "Mobile Team"
    
  - name: "🔗 Cross-Repo Integration"
    key: "INTEGRATION"
    description: "Cross-repository integration and automation"
    status: "Planning"
    target_date: "2025-03-07"
    lead: "Platform Team"
    
  - name: "📊 Enterprise Monitoring"
    key: "MONITORING"
    description: "Enterprise metrics and monitoring setup"
    status: "Backlog"
    target_date: "2025-03-21"
    lead: "Platform Team"
```

---

## 🎯 **MILESTONES SETUP**

### **Create Milestones**
Navigate to Projects → Multi-Repo Migration → Milestones

```yaml
Milestones:
  - name: "🏗️ Foundation"
    description: "Repository setup and migration preparation"
    target_date: "2025-01-31"
    
  - name: "🚀 Repository Split"
    description: "Split monorepo into separate repositories"
    target_date: "2025-02-14"
    
  - name: "🔗 Submodule Integration"
    description: "Integrate repositories as submodules"
    target_date: "2025-02-28"
    
  - name: "📊 Enterprise Integration"
    description: "Complete enterprise tooling integration"
    target_date: "2025-03-14"
```

---

## 🔧 **WORKFLOW STATES**

### **Custom Workflow States**
```yaml
Workflow States:
  - name: "📋 Planning"
    type: "unstarted"
    color: "#6B7280"
    
  - name: "🚀 Ready"
    type: "unstarted" 
    color: "#3B82F6"
    
  - name: "⚡ In Progress"
    type: "started"
    color: "#F59E0B"
    
  - name: "👀 Review"
    type: "started"
    color: "#8B5CF6"
    
  - name: "🧪 Testing"
    type: "started"
    color: "#EC4899"
    
  - name: "✅ Done"
    type: "completed"
    color: "#10B981"
    
  - name: "🚫 Blocked"
    type: "started"
    color: "#DC2626"
```

---

## 📝 **ISSUE TEMPLATES**

### **Cross-Repo Issue Template**
```markdown
## 🔗 Cross-Repo Issue

### Affected Repositories
- [ ] evc-frontend-admin (orchestrator)
- [ ] evc-admin-web
- [ ] evc-admin-mobile
- [ ] evc-shared-api
- [ ] evc-shared-types
- [ ] evc-shared-store
- [ ] evc-shared-utils
- [ ] evc-shared-business-logic
- [ ] evc-ui-components
- [ ] evc-design-tokens

### Impact Analysis
**Scope**: [single-repo/cross-repo/ecosystem-wide]
**Breaking Changes**: [Yes/No]
**Dependencies**: List dependent issues/PRs

### Implementation Plan
1. [ ] Step 1
2. [ ] Step 2
3. [ ] Step 3

### Testing Strategy
- [ ] Unit tests
- [ ] Integration tests
- [ ] Cross-repo compatibility tests

### Release Coordination
- [ ] Version bumps required
- [ ] Deployment order defined
- [ ] Rollback plan documented
```

### **Migration Task Template**
```markdown
## 🚀 Migration Task

### Repository Details
**Source**: Current monorepo location
**Target**: New repository name
**Git History**: [Preserve/Fresh start]

### Migration Checklist
- [ ] Repository created
- [ ] Git history preserved
- [ ] Dependencies updated
- [ ] CI/CD configured
- [ ] Documentation updated
- [ ] Team access configured

### Validation Steps
- [ ] Build successful
- [ ] Tests passing
- [ ] Dependencies resolved
- [ ] Documentation accurate

### Rollback Plan
- [ ] Backup created
- [ ] Rollback steps documented
- [ ] Recovery tested
```

---

## 🤖 **AUTOMATION SETUP**

### **Linear Automations**
Navigate to Settings → Automations

```yaml
Automations:
  - name: "Cross-Repo Issue Linking"
    trigger: "Issue created with 'cross-repo' label"
    action: "Add to Cross-Repo Integration project"
    
  - name: "Breaking Change Alert"
    trigger: "Issue created with 'breaking-change' label"
    action: "Set priority to P1-breaking and notify Platform Team"
    
  - name: "Migration Progress Tracking"
    trigger: "Issue moved to Done in Migration project"
    action: "Update milestone progress and notify stakeholders"
    
  - name: "Dependency Tracking"
    trigger: "Issue blocked"
    action: "Create dependency relationship and notify blocking issue assignee"
```

---

## 📊 **VIEWS & FILTERS**

### **Custom Views**
```yaml
Views:
  - name: "🎯 Current Sprint"
    filter: "assignee:me AND status:started"
    
  - name: "🔗 Cross-Repo Issues"
    filter: "label:cross-repo OR label:ecosystem-wide"
    
  - name: "🚨 Blocked Items"
    filter: "status:blocked"
    
  - name: "📱 Mobile Tasks"
    filter: "team:MOBILE"
    
  - name: "🌐 Web Tasks"
    filter: "team:WEB"
    
  - name: "🏢 Platform Tasks"
    filter: "team:PLATFORM"
```

---

## 🔗 **INTEGRATIONS**

### **GitHub Integration**
```yaml
GitHub Integration:
  repositories:
    - "your-org/evc-frontend-admin"
    - "your-org/evc-admin-web"
    - "your-org/evc-admin-mobile"
    # Add all 10 repositories
  
  automation:
    - "Link PRs to Linear issues"
    - "Update issue status on PR merge"
    - "Create issues from GitHub issues"
    - "Sync release notes"
```

### **Notion Integration**
```yaml
Notion Integration:
  workspace: "EV Charging Ecosystem"
  sync:
    - "Project roadmaps"
    - "Team documentation"
    - "Release notes"
    - "Architecture decisions"
```

---

## 🚀 **QUICK SETUP SCRIPT**

### **Linear API Setup Script**
```bash
#!/bin/bash
# tools/scripts/setup-linear-workspace.sh

# Set your Linear API key
LINEAR_API_KEY="your-linear-api-key"
WORKSPACE_ID="your-workspace-id"

echo "🎯 Setting up Linear workspace for EV Charging Multi-Repo..."

# Create teams
curl -X POST https://api.linear.app/graphql \
  -H "Authorization: $LINEAR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { teamCreate(input: { name: \"Platform Team\", key: \"PLATFORM\", description: \"Main orchestrator and infrastructure\" }) { team { id name } } }"
  }'

# Create labels
curl -X POST https://api.linear.app/graphql \
  -H "Authorization: $LINEAR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { issueLabelCreate(input: { name: \"cross-repo\", color: \"#F97316\", description: \"Changes affecting multiple repositories\" }) { issueLabel { id name } } }"
  }'

echo "✅ Linear workspace setup complete!"
```

---

## 📋 **SETUP CHECKLIST**

### **Manual Setup Steps**
- [ ] Create Linear workspace
- [ ] Set up 6 teams with proper colors and descriptions
- [ ] Create all label categories (Scope, Impact, Platform, Priority)
- [ ] Set up 4 main projects with target dates
- [ ] Configure 4 milestones with dates
- [ ] Create custom workflow states
- [ ] Set up issue templates
- [ ] Configure automations
- [ ] Create custom views and filters
- [ ] Set up GitHub integration
- [ ] Configure Notion integration (optional)

### **Verification Steps**
- [ ] All teams visible and accessible
- [ ] Labels properly categorized and colored
- [ ] Projects show correct timelines
- [ ] Milestones linked to projects
- [ ] Workflow states functional
- [ ] Templates available when creating issues
- [ ] Automations triggering correctly
- [ ] Views filtering properly
- [ ] GitHub repos connected
- [ ] Team members have appropriate access

---

## 🎯 **NEXT STEPS**

Once Linear workspace is set up:

1. **Import Initial Tasks** - Create the Week 1 foundation tasks
2. **Assign Team Members** - Add developers to appropriate teams
3. **Configure Notifications** - Set up Slack/email notifications
4. **Create First Sprint** - Start with immediate action items
5. **Test Workflows** - Verify automations and integrations work

**Ready to create the actual tasks?** Let me know when the workspace setup is complete! 🚀
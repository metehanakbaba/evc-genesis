# 🧪 Notion API Testing Tool

Comprehensive testing utility for exploring and validating Notion API capabilities within the EV Charging Admin project.

## 🎯 Purpose

This tool helps developers and project managers:
- **Validate API Access**: Test Notion API keys and workspace permissions
- **Explore Workspace**: Discover available databases, pages, and content
- **Understand Schemas**: Analyze database structures and properties
- **Plan Integration**: Assess what operations are possible for automation

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Valid Notion API key
- Access to a Notion workspace

### Installation & Setup
```bash
# Navigate to the testing tool
cd tools/notion-test

# Install dependencies
npm install

# Configure API key (edit test-api.js)
# Replace: const NOTION_API_KEY = "your-api-key-here";

# Run comprehensive test
npm test
```

## 📋 What Gets Tested

### 1. Connection & Authentication
- ✅ Validates API key authenticity
- ✅ Retrieves user information and permissions
- ✅ Tests workspace access levels

### 2. Database Discovery
- ✅ Lists all accessible databases
- ✅ Shows database titles and IDs
- ✅ Analyzes database schemas and properties

### 3. Page Exploration
- ✅ Discovers available pages in workspace
- ✅ Shows page hierarchy and relationships
- ✅ Tests content reading capabilities

### 4. Permission Analysis
- ✅ Checks database creation capabilities
- ✅ Validates CRUD operation permissions
- ✅ Identifies suitable parent pages for new databases

### 5. Schema Examination
- ✅ Displays database property types
- ✅ Shows available field configurations
- ✅ Analyzes existing data structures

## 📊 Sample Output

```bash
🧪 Testing Notion API Capabilities...

1️⃣ Testing connection...
✅ Connected as: John Developer
   User ID: 12345678-1234-1234-1234-123456789abc
   User type: person

2️⃣ Searching for databases...
✅ Found 3 databases:
   1. Project Tracker (ID: abc123...)
   2. Documentation Hub (ID: def456...)
   3. Team Goals (ID: ghi789...)

3️⃣ Searching for pages...
✅ Found 12 pages:
   1. EV Charging Admin (ID: jkl012...)
   2. Development Roadmap (ID: mno345...)
   3. API Documentation (ID: pqr678...)
   ... and 9 more

4️⃣ Testing database creation capabilities...
✅ Found 5 potential parent pages for database creation
   We can create databases as children of these pages

5️⃣ Examining database schema...
   Database: Project Tracker
   Properties:
     - Name: title
     - Status: select
     - Priority: select
     - Assignee: people
     - Due Date: date

6️⃣ Testing page operations...
✅ Can read page content (8 blocks)

🎉 API Test Complete!

📋 Summary of Capabilities:
   ✅ Basic connection: Working
   ✅ Search databases: 3 found
   ✅ Search pages: 12 found
   ✅ Database creation: Possible
   ✅ Page operations: Available
```

## 🔧 Configuration

### API Key Setup
1. **Get Notion API Key**:
   - Go to [Notion Integrations](https://www.notion.so/my-integrations)
   - Create new integration: "EV Charging Admin API"
   - Copy the API key

2. **Update Configuration**:
   ```javascript
   // In test-api.js
   const NOTION_API_KEY = "ntn_your_api_key_here";
   ```

3. **Share Workspace**:
   - Open your Notion workspace
   - Share pages with your integration
   - Grant appropriate permissions

### Environment Variables (Optional)
```bash
# Create .env file
echo "NOTION_API_KEY=your_api_key_here" > .env

# Update test-api.js to use environment variable
const NOTION_API_KEY = process.env.NOTION_API_KEY || "fallback-key";
```

## 🎯 Integration with Project Specs

This testing tool directly supports the implementation of:

### Notion Integration System
- **Spec Location**: `.kiro/specs/notion-integration-system/`
- **Purpose**: Modern Notion integration for project management
- **Requirements**: API validation, database creation, content sync

### Documentation Sync System  
- **Spec Location**: `.kiro/specs/documentation-sync-system/`
- **Purpose**: Automated documentation synchronization
- **Requirements**: File monitoring, content processing, bidirectional sync

### Key Insights for Implementation
The test results provide crucial information for:
- **Database Design**: Understanding available property types
- **Permission Planning**: Knowing what operations are possible
- **Integration Architecture**: Identifying suitable parent pages
- **Error Handling**: Understanding API limitations and responses

## 🚨 Troubleshooting

### Common Issues

#### ❌ "Unauthorized" Error
```bash
# Solutions:
1. Verify API key is correct and active
2. Check integration has workspace access
3. Ensure pages are shared with integration
4. Confirm integration permissions are sufficient
```

#### ❌ "No databases found"
```bash
# Solutions:
1. Share databases with your integration
2. Check integration permissions in Notion
3. Verify workspace contains databases
4. Try creating a test database first
```

#### ❌ "Cannot create databases"
```bash
# Solutions:
1. Create a parent page in your workspace
2. Share the parent page with integration
3. Grant "Insert content" permission
4. Check if workspace allows database creation
```

### Debug Mode
```bash
# Enable verbose logging
DEBUG=notion:* npm test

# Test specific functionality
node -e "
const { testNotionCapabilities } = require('./test-api.js');
testNotionCapabilities().catch(console.error);
"
```

## 📈 Next Steps

After successful testing:

1. **Plan Database Structure**:
   - Design schemas for Issue Tracking, Documentation, Goals, Projects
   - Define property types and relationships
   - Plan data migration strategy

2. **Implement Integration**:
   - Use test results to build production integration
   - Follow the Notion Integration System spec
   - Implement error handling based on test insights

3. **Setup Automation**:
   - Configure documentation sync workflows
   - Implement KPI tracking and updates
   - Setup bidirectional sync with GitHub/Linear

4. **Team Onboarding**:
   - Share workspace with team members
   - Configure permissions and access levels
   - Train team on new workflows

## 🔗 Related Documentation

- **[Notion Integration System Spec](.kiro/specs/notion-integration-system/)**
- **[Documentation Sync System Spec](.kiro/specs/documentation-sync-system/)**
- **[Tools Overview](../README.md)**
- **[Project Documentation](../../docs/README.md)**

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Maintainer**: EV Charging Development Team
# 🎯 Git Commit Rules & Emoji Guide

## 📋 Quick Reference

### 🚀 Most Used Emojis
```
✨ feat     🐛 fix      🔧 chore    📝 docs
💄 style    ♻️ refactor  ⚡ perf     ✅ test
```

### 📦 Commit Message Format
```
<emoji> <type>: <description>

Examples:
✨ feat: add user authentication system
🐛 fix: resolve login button not working
💄 style: update header component animations
🔧 chore: update dependencies to latest versions
```

## 📝 Detailed Emoji Categories

### 📦 **CORE DEVELOPMENT**
| Emoji | Type | Description | Example |
|-------|------|-------------|---------|
| ✨ | `feat` | New feature | `✨ feat: add dark mode toggle` |
| 🐛 | `fix` | Bug fix | `🐛 fix: resolve mobile responsive issue` |
| 🔧 | `chore` | Maintenance | `🔧 chore: update React to 19.1.0` |
| 📝 | `docs` | Documentation | `📝 docs: add API integration guide` |
| 💄 | `style` | Code formatting | `💄 style: fix indentation in components` |
| ♻️ | `refactor` | Code restructuring | `♻️ refactor: extract common hooks` |
| ⚡ | `perf` | Performance | `⚡ perf: optimize image loading` |
| ✅ | `test` | Tests | `✅ test: add login form validation tests` |

### 🛠️ **BUILD & DEPLOYMENT**
| Emoji | Type | Description | Example |
|-------|------|-------------|---------|
| 🔨 | `build` | Build system | `🔨 build: add Vite build optimization` |
| 👷 | `ci` | CI/CD | `👷 ci: add GitHub Actions workflow` |
| 🚀 | `deploy` | Deployment | `🚀 deploy: setup production environment` |
| 🔀 | `merge` | Merge branches | `🔀 merge: feature/auth into main` |
| ⏪ | `revert` | Revert commit | `⏪ revert: remove experimental feature` |

### 🎨 **UI/UX & DESIGN**
| Emoji | Type | Description | Example |
|-------|------|-------------|---------|
| 🎨 | `ui` | User interface | `🎨 ui: redesign dashboard layout` |
| 💫 | `animation` | Animations | `💫 animation: add smooth page transitions` |
| 📱 | `responsive` | Responsive design | `📱 responsive: fix mobile menu layout` |
| 🌈 | `design` | Design system | `🌈 design: update color palette` |

### 🔒 **SECURITY & CRITICAL**
| Emoji | Type | Description | Example |
|-------|------|-------------|---------|
| 🔒 | `security` | Security | `🔒 security: add JWT token validation` |
| 🚨 | `critical` | Critical fixes | `🚨 critical: fix payment processing bug` |
| 🔥 | `hotfix` | Urgent fixes | `🔥 hotfix: resolve server crash issue` |
| ⚠️ | `warning` | Deprecations | `⚠️ warning: deprecated API usage` |

### 📊 **DATA & API**
| Emoji | Type | Description | Example |
|-------|------|-------------|---------|
| 🗃️ | `database` | Database | `🗃️ database: add user preferences table` |
| 🌐 | `api` | API changes | `🌐 api: implement REST endpoints` |
| 📡 | `network` | Network/connectivity | `📡 network: add offline support` |
| 🔄 | `sync` | Data sync | `🔄 sync: implement real-time updates` |

### 🧪 **EXPERIMENTAL**
| Emoji | Type | Description | Example |
|-------|------|-------------|---------|
| 🧪 | `experiment` | Experimental | `🧪 experiment: test React 19 features` |
| 🚧 | `wip` | Work in progress | `🚧 wip: dashboard redesign prototype` |
| 🔬 | `research` | Research | `🔬 research: investigate performance issues` |

## 📋 Commit Message Rules

### ✅ **DO's**
- Keep subject line under 50 characters
- Use present tense ("add" not "added")
- Don't end with period
- Be descriptive but concise
- Use emoji consistently
- Reference issue numbers when applicable

### ❌ **DON'Ts**
- Don't use past tense
- Don't be vague ("fix stuff", "update code")
- Don't exceed 50 characters in subject
- Don't mix multiple types in one commit
- Don't commit without testing

## 🔧 Setup Instructions

### 1. Enable Git Template
```bash
git config --global commit.template .gitmessage
```

### 2. Example Workflow
```bash
git add .
git commit  # Opens template in editor
# Or direct commit:
git commit -m "✨ feat: add user profile settings"
```

### 3. Branch Naming Convention
```
feat/user-authentication
fix/login-button-responsive
chore/update-dependencies
hotfix/payment-critical-bug
```

## 🎯 React 19 Project Specific

For this EV Charging Admin Panel project:

```bash
# Component updates
✨ feat: implement React 19 useActionState hook
🔧 chore: remove forwardRef from components
⚡ perf: optimize form handling with Actions

# Design system
🎨 ui: update glassmorphism components
💫 animation: add 60fps GPU animations
🌈 design: implement revolutionary design tokens

# Architecture
♻️ refactor: migrate to monorepo structure
🏗️ structure: setup Nx workspace configuration
🔗 deps: integrate shared-api package
```

## 🏆 Best Practices Summary

1. **Choose the right emoji** - Match the primary purpose
2. **Be specific** - "fix login validation" vs "fix bug"
3. **One concept per commit** - Don't mix features and fixes
4. **Test before commit** - Ensure code works
5. **Reference issues** - Add #123 for issue tracking

---

**Remember**: Good commit messages help your future self and team understand the project history! 🚀 
# 🎯 Git Commit Rules & Emoji Guide

> **@EVC Workspace Emoji-Based Commit Convention**

## 📋 Quick Reference

### 🚀 Most Used Emojis (@EVC Project)
```
✨ feat     🐛 fix      🔧 chore    📝 docs
💄 style    ♻️ refactor  ⚡ perf     ✅ test
🏗️ structure 🔗 deps    🎨 ui       💫 animation
```

### 📦 Commit Message Format
```
<emoji> <type>: <description>

[Optional detailed description]

Examples:
✨ feat: add React 19 Server Actions to login form
🐛 fix: resolve @evc/shared-api import resolution
💄 style: update glassmorphism effects for stat cards
🔧 chore: migrate from @evc-unified to @evc packages
🏗️ structure: complete @evc workspace monorepo setup
```

## 📝 Detailed Emoji Categories

### 📦 **CORE DEVELOPMENT**
| Emoji | Type | Description | @EVC Example |
|-------|------|-------------|--------------|
| ✨ | `feat` | New feature | `✨ feat: implement Next.js 15 App Router with React 19` |
| 🐛 | `fix` | Bug fix | `🐛 fix: resolve module resolution errors for @evc packages` |
| 🔧 | `chore` | Maintenance | `🔧 chore: update React to 19.1.0 with Turbopack` |
| 📝 | `docs` | Documentation | `📝 docs: add comprehensive workspace migration guide` |
| 💄 | `style` | Code formatting | `💄 style: update revolutionary UI with floating orbs` |
| ♻️ | `refactor` | Code restructuring | `♻️ refactor: migrate Vite app to Next.js structure` |
| ⚡ | `perf` | Performance | `⚡ perf: enable Turbopack for faster development builds` |
| ✅ | `test` | Tests | `✅ test: add integration tests for @evc/shared-api` |

### 🏗️ **WORKSPACE & STRUCTURE**
| Emoji | Type | Description | @EVC Example |
|-------|------|-------------|--------------|
| 🏗️ | `structure` | Architecture | `🏗️ structure: setup @evc scoped packages monorepo` |
| 🔗 | `deps` | Dependencies | `🔗 deps: integrate @evc/shared-api with admin app` |
| 📦 | `package` | Package changes | `📦 package: publish @evc/design-tokens v1.0.0` |
| 🔄 | `migration` | Migration | `🔄 migration: complete React 19 + Next.js migration` |
| 🚚 | `move` | Moving files | `🚚 move: relocate components to packages/app/admin` |

### 🛠️ **BUILD & DEPLOYMENT**
| Emoji | Type | Description | @EVC Example |
|-------|------|-------------|--------------|
| 🔨 | `build` | Build system | `🔨 build: configure Next.js transpilePackages for monorepo` |
| 👷 | `ci` | CI/CD | `👷 ci: add GitHub Actions for @evc workspace builds` |
| 🚀 | `deploy` | Deployment | `🚀 deploy: setup Vercel deployment for admin app` |
| 🔀 | `merge` | Merge branches | `🔀 merge: feature/react-19-migration into main` |
| ⏪ | `revert` | Revert commit | `⏪ revert: rollback experimental React 19 features` |

### 🎨 **UI/UX & DESIGN (@EVC Specific)**
| Emoji | Type | Description | @EVC Example |
|-------|------|-------------|--------------|
| 🎨 | `ui` | User interface | `🎨 ui: implement revolutionary glassmorphism dashboard` |
| 💫 | `animation` | Animations | `💫 animation: add floating orbs background effects` |
| 📱 | `responsive` | Responsive design | `📱 responsive: optimize mobile layout for EV stations` |
| 🌈 | `design` | Design system | `🌈 design: create @evc/design-tokens package` |
| ✨ | `revolutionary` | Revolutionary UI | `✨ revolutionary: add AI Intelligence Center sidebar` |

### 🔒 **SECURITY & CRITICAL**
| Emoji | Type | Description | @EVC Example |
|-------|------|-------------|--------------|
| 🔒 | `security` | Security | `🔒 security: implement JWT validation in shared-api` |
| 🚨 | `critical` | Critical fixes | `🚨 critical: fix payment processing in charging sessions` |
| 🔥 | `hotfix` | Urgent fixes | `🔥 hotfix: resolve admin app startup crash` |
| ⚠️ | `warning` | Deprecations | `⚠️ warning: deprecate @evc-unified package names` |

### 📊 **EV CHARGING SPECIFIC**
| Emoji | Type | Description | @EVC Example |
|-------|------|-------------|--------------|
| ⚡ | `charging` | EV charging features | `⚡ charging: implement real-time station monitoring` |
| 🔋 | `station` | Station management | `🔋 station: add CCS/CHAdeMO connector support` |
| 🚗 | `vehicle` | Vehicle integration | `🚗 vehicle: add EV model compatibility checker` |
| 💳 | `payment` | Payment systems | `💳 payment: integrate Stripe for session billing` |
| 📍 | `location` | Location/maps | `📍 location: add GPS-based station finder` |

### 🧪 **EXPERIMENTAL & RESEARCH**
| Emoji | Type | Description | @EVC Example |
|-------|------|-------------|--------------|
| 🧪 | `experiment` | Experimental | `🧪 experiment: test React 19 useActionState hook` |
| 🚧 | `wip` | Work in progress | `🚧 wip: prototype AI-powered charging optimization` |
| 🔬 | `research` | Research | `🔬 research: investigate React 19 Server Components performance` |

## 📋 @EVC Project Commit Rules

### ✅ **DO's**
- Keep subject line under 60 characters (longer for @evc context)
- Use present tense ("add" not "added")
- Include package scope when relevant (`@evc/shared-api`)
- Reference React 19 features when applicable
- Be specific about workspace changes
- Use emoji consistently according to this guide

### ❌ **DON'Ts**
- Don't use old package names (@evc-unified)
- Don't mix workspace restructure with feature commits
- Don't commit without testing admin app functionality
- Don't be vague about migration steps
- Don't exceed 60 characters in subject line

## 🔧 Setup Instructions

### 1. Enable Git Template
```bash
cd /Users/metehanakbaba/WebstormProjects/evc/evc-frontend-admin
git config commit.template .gitmessage
```

### 2. @EVC Workflow Example
```bash
# Workspace migration
git add packages/
git commit -m "🏗️ structure: complete @evc workspace with scoped packages"

# Feature development  
git add packages/app/admin/src/
git commit -m "✨ feat: implement React 19 Server Actions for login"

# Component migration
git add packages/app/admin/src/features/
git commit -m "🚚 move: migrate components from web-admin to @evc/app-admin"
```

### 3. Branch Naming Convention (@EVC)
```
feat/react-19-server-actions
fix/evc-package-imports  
chore/workspace-migration
migration/web-admin-components
structure/monorepo-setup
ui/revolutionary-glassmorphism
```

## 🎯 @EVC Workspace Specific Examples

### **Recent Migration Commits**
```bash
# ✅ Completed migrations
feat: Complete React 19 + Next.js 15 migration with App Router
structure: Complete @evc workspace restructure with scoped packages  
fix: resolve module resolution errors for @evc packages
docs: update README with comprehensive migration context guide

# 🔄 Current/Next commits
migration: transfer remaining components from web-admin
ui: implement shared component library structure
chore: cleanup legacy @evc-unified references
test: add workspace integration tests
```

### **Package-Specific Commits**
```bash
# Admin app (@evc/app-admin)
feat: implement revolutionary dashboard with floating orbs
fix: resolve TypeScript path mappings for Next.js
style: update glassmorphism effects with proper animations

# Shared API (@evc/shared-api)  
api: implement RTK Query endpoints for EV stations
fix: resolve import resolution in Next.js transpilation
security: add JWT authentication middleware

# Design tokens (@evc/design-tokens)
design: create unified color palette for EV charging theme
tokens: implement responsive spacing system
style: add glassmorphism utility classes
```

## 🏆 @EVC Best Practices Summary

1. **Use workspace context** - Mention @evc packages when relevant
2. **Be migration-aware** - Specify React 19/Next.js features
3. **Reference admin app** - Mention localhost:3000 functionality
4. **Track package changes** - Note scoped package updates
5. **Test workspace** - Ensure monorepo functionality

### **Common @EVC Patterns**
```bash
# ✅ Good @EVC commits
✨ feat: add React 19 Server Actions to @evc/app-admin login
🐛 fix: resolve @evc/shared-api import in Next.js transpilation
🏗️ structure: migrate apps/web-admin to packages/app/admin
💫 animation: implement revolutionary floating orbs in dashboard

# ❌ Avoid these patterns  
fix: stuff
update: components
chore: updates
feat: new thing
```

---

**Remember**: Good commit messages help track @EVC workspace evolution and React 19 migration progress! ⚡🔋

**Current Status**: @evc/app-admin working at localhost:3000 ✅ 
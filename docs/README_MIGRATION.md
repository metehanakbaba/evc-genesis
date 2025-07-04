# EVC Workspace Migration Guide

## Current State
- React 19 + Next.js 15 complete ✅
- @evc workspace with scoped packages ✅ 
- Admin app running at http://localhost:3000 ✅

## Structure
```
packages/app/admin/     → @evc/app-admin (Next.js 15) ✅ WORKING
packages/shared/api/    → @evc/shared-api ✅
apps/web-admin/         → LEGACY - needs migration 🔄
```

## Next Steps
1. Compare: `tree apps/web-admin/src/features` vs `tree packages/app/admin/src/features`
2. Copy missing components from web-admin
3. Fix imports: `@evc-unified` → `@evc`, `@/app/store` → `@/lib/store`
4. Test admin app still works

## Commands
```bash
cd /Users/metehanakbaba/WebstormProjects/evc/evc-frontend-admin
cd packages/app/admin && npm run dev
```

## Critical Fixes
- Use emoji icons not Heroicons (React 19 compat)
- Add "use client" for hooks
- Fix Redux paths: `@/lib/store/hooks` 
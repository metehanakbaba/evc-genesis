# 💼 Business Logic Migration Progress

## 🎯 **MISSION: Extract Business Logic from Apps to Shared Package**

**Goal:** Move scattered business logic from `apps/` to centralized `packages/shared/business-logic/`

**Current Status:** 🟡 **IN PROGRESS** - Foundation created, migration needed

---

## 📊 **CURRENT STATE ANALYSIS**

### ✅ **COMPLETED:**
- [x] Created `packages/shared/business-logic/` structure
- [x] Implemented Auth business logic examples (`validateEmail`, `validatePassword`)
- [x] Implemented Wallet business logic examples (`validateTransactionAmount`, `filterTransactions`)
- [x] Established enterprise directory structure
- [x] Fixed all system paths after reorganization

### 🔄 **IDENTIFIED BUSINESS LOGIC TO MIGRATE:**

#### 🔒 **AUTH DOMAIN** - Priority: HIGH
**Source:** `apps/admin-web/src/features/auth/`
```typescript
// FROM: apps/admin-web/src/features/auth/hooks/useAuthForm.ts
- Email validation logic (lines 62-66)
- Password validation logic (lines 68-72)
- Login attempt validation

// FROM: apps/admin-web/src/features/auth/hooks/useFormState.tsx  
- Enhanced form validation (lines 67-87)
- Field-level validation logic
- Client-side validation rules
```
**TO:** `packages/shared/business-logic/src/auth/index.ts` ✅ **STARTED**

#### 💰 **WALLET DOMAIN** - Priority: HIGH
**Source:** `apps/admin-web/src/features/wallets/pages/WalletsPage.tsx`
```typescript
// FROM: WalletsPage.tsx (800+ lines - MASSIVE FILE!)
- Transaction validation logic (lines 220-240)
- Transaction type configuration (lines 340-380)
- Transaction status configuration (lines 382-420)
- Transaction filtering logic (lines 422-440)
- Date formatting business rules (lines 450-465)
- Amount validation rules
```
**TO:** `packages/shared/business-logic/src/wallets/index.ts` ✅ **STARTED**

#### 👥 **USER DOMAIN** - Priority: MEDIUM
**Source:** `apps/admin-web/src/features/users/pages/UsersPage.tsx`
```typescript
// FROM: UsersPage.tsx (lines 306-350)
- Role configuration logic (admin, operator, user)
- User filtering logic (lines 350-370)
- Permission-based business rules
- Role-based color/icon mapping
```
**TO:** `packages/shared/business-logic/src/users/index.ts` ❌ **NOT STARTED**

#### 🔋 **STATION DOMAIN** - Priority: MEDIUM  
**Source:** `apps/admin-web/src/features/stations/`
```typescript
// FROM: StationsPage.tsx (estimated)
- Station status validation
- Connector type business rules
- Power calculation logic
- Distance calculation algorithms
```
**TO:** `packages/shared/business-logic/src/stations/index.ts` ❌ **NOT STARTED**

#### ⚡ **SESSION DOMAIN** - Priority: MEDIUM
**Source:** `apps/admin-web/src/features/sessions/`
```typescript
// FROM: SessionsPage.tsx (estimated)
- Charging session validation
- Price calculation logic
- Session timeout rules
- Power consumption calculations
```
**TO:** `packages/shared/business-logic/src/sessions/index.ts` ❌ **NOT STARTED**

---

## 🚨 **CRITICAL ISSUES FOUND**

### 📁 **MASSIVE FILES WITH MIXED CONCERNS:**
- `WalletsPage.tsx`: **800+ lines** (UI + Business Logic mixed)
- `UsersPage.tsx`: **500+ lines** (UI + Business Logic mixed)
- Multiple business rules scattered across component files

### 🔄 **DUPLICATION DETECTED:**
- Email validation exists in multiple auth files
- Transaction logic duplicated across wallet components
- Role configuration repeated in different places

---

## 🎯 **MIGRATION STRATEGY**

### **Phase 1: High Priority Domains** ⚡
1. **Auth Migration** (Email/Password validation)
2. **Wallet Migration** (Transaction logic)

### **Phase 2: Medium Priority Domains** 📊
3. **User Migration** (Role management)
4. **Station Migration** (Status/Power logic)
5. **Session Migration** (Charging calculations)

### **Phase 3: Integration & Cleanup** 🧹
6. Update apps to use shared business logic
7. Remove duplicated logic from apps
8. Add comprehensive tests

---

## 📋 **MIGRATION CHECKLIST**

### 🔒 **AUTH DOMAIN:**
- [ ] Extract `validateEmail` from `useAuthForm.ts`
- [ ] Extract `validatePassword` from `useFormState.tsx`
- [ ] Extract session timeout logic
- [ ] Extract 2FA business rules
- [ ] Update apps to use shared auth logic
- [ ] Remove duplicated auth logic from apps

### 💰 **WALLET DOMAIN:**
- [ ] Extract transaction validation from `WalletsPage.tsx`
- [ ] Extract transaction type configuration
- [ ] Extract transaction status configuration  
- [ ] Extract filtering logic
- [ ] Extract date formatting rules
- [ ] Update apps to use shared wallet logic
- [ ] Remove duplicated wallet logic from apps

### 👥 **USER DOMAIN:**
- [ ] Extract role configuration from `UsersPage.tsx`
- [ ] Extract user filtering logic
- [ ] Extract permission business rules
- [ ] Update apps to use shared user logic
- [ ] Remove duplicated user logic from apps

### 🔋 **STATION DOMAIN:**
- [ ] Identify station business logic in apps
- [ ] Extract station status validation
- [ ] Extract connector type rules
- [ ] Extract power calculation logic
- [ ] Update apps to use shared station logic

### ⚡ **SESSION DOMAIN:**
- [ ] Identify session business logic in apps
- [ ] Extract charging session validation
- [ ] Extract price calculation logic
- [ ] Extract session timeout rules
- [ ] Update apps to use shared session logic

---

## 🔧 **TECHNICAL IMPLEMENTATION**

### **Package Structure:**
```typescript
packages/shared/business-logic/
├── src/
│   ├── index.ts              // Main exports
│   ├── core/                 // Core business logic utilities
│   ├── auth/
│   │   ├── index.ts         // Auth business logic ✅ STARTED
│   │   ├── validation.ts    // Email/password validation
│   │   └── session.ts       // Session management rules
│   ├── wallets/
│   │   ├── index.ts         // Wallet business logic ✅ STARTED
│   │   ├── transactions.ts  // Transaction validation
│   │   └── payments.ts      // Payment processing rules
│   ├── users/
│   │   ├── index.ts         // User business logic ❌ NOT STARTED
│   │   ├── roles.ts         // Role management
│   │   └── permissions.ts   // Permission rules
│   ├── stations/
│   │   ├── index.ts         // Station business logic ❌ NOT STARTED
│   │   ├── status.ts        // Station status rules
│   │   └── power.ts         // Power calculation
│   └── sessions/
│       ├── index.ts         // Session business logic ❌ NOT STARTED
│       ├── charging.ts      // Charging logic
│       └── pricing.ts       // Price calculation
├── package.json             // ✅ CREATED
└── tsconfig.json            // ❌ NEEDS CREATION
```

### **Usage Pattern:**
```typescript
// BEFORE (Mixed in apps):
const WalletsPage = () => {
  const validateAmount = (amount) => { /* business logic */ };
  return <div>{/* UI */}</div>;
};

// AFTER (Clean separation):
import { validateTransactionAmount } from '@evc/shared-business-logic';

const WalletsPage = () => {
  const isValid = validateTransactionAmount('ADD_PLN_FUNDS', 100);
  return <div>{/* UI only */}</div>;
};
```

---

## 📈 **PROGRESS METRICS**

| Domain | Business Logic Identified | Extracted | Integrated | Status |
|--------|---------------------------|-----------|------------|---------|
| Auth | ✅ 100% | 🟡 50% | ❌ 0% | 🟡 IN PROGRESS |
| Wallets | ✅ 100% | 🟡 60% | ❌ 0% | 🟡 IN PROGRESS |
| Users | ✅ 80% | ❌ 0% | ❌ 0% | ❌ NOT STARTED |
| Stations | 🟡 50% | ❌ 0% | ❌ 0% | ❌ NOT STARTED |
| Sessions | 🟡 30% | ❌ 0% | ❌ 0% | ❌ NOT STARTED |

**Overall Progress:** 🟡 **22%** (2/5 domains started)

---

## 🚀 **NEXT IMMEDIATE ACTIONS**

### **Priority 1: Complete Auth Migration**
1. Extract remaining auth logic from `useAuthForm.ts`
2. Extract form validation from `useFormState.tsx`
3. Update auth components to use shared logic

### **Priority 2: Complete Wallet Migration**  
1. Extract remaining transaction logic from `WalletsPage.tsx`
2. Reduce `WalletsPage.tsx` from 800+ lines to ~200 lines
3. Update wallet components to use shared logic

### **Priority 3: Start User Migration**
1. Analyze `UsersPage.tsx` for business logic
2. Extract role configuration logic
3. Extract user filtering logic

---

## 🎯 **SUCCESS CRITERIA**

- [ ] All business logic extracted from apps
- [ ] Apps contain only UI components (max 200 lines per page)
- [ ] Shared business logic package fully functional
- [ ] No duplicated business logic across codebase
- [ ] All business logic unit tested
- [ ] Apps use shared business logic consistently

---

## 📝 **NOTES FOR AI CONTEXT**

**Key Files to Focus On:**
- `apps/admin-web/src/features/wallets/pages/WalletsPage.tsx` (800+ lines - PRIORITY)
- `apps/admin-web/src/features/users/pages/UsersPage.tsx` (500+ lines)
- `apps/admin-web/src/features/auth/hooks/` (validation logic)

**Migration Pattern:**
1. Identify business logic in app files
2. Extract to appropriate domain in `packages/shared/business-logic/src/`
3. Update app files to import from shared package
4. Remove duplicated logic
5. Test integration

**Current Enterprise Structure:**
```
├── apps/                    # UI applications
├── packages/shared/         # Shared packages
│   ├── api/                # HTTP layer (RTK Query) ✅ WORKING
│   ├── business-logic/     # Domain business rules 🟡 IN PROGRESS
│   ├── types/              # Shared types ✅ WORKING
│   └── utils/              # Utilities ✅ WORKING
├── infrastructure/         # DevOps & Docker ✅ WORKING
└── tools/                  # Development tools ✅ WORKING
```

**Status:** Ready for business logic migration. Foundation is solid, now need to extract scattered logic from apps. 
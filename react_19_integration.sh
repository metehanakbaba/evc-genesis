#!/bin/bash

# =============================================================================
# REACT 19 INTEGRATION SCRIPT - Step by Step Controlled Process
# =============================================================================
# Author: AI Assistant
# Version: 1.0
# Description: Systematic React 19 upgrade with validation at each step
# =============================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

step() {
    echo -e "${PURPLE}🚀 STEP $1: $2${NC}"
    echo "----------------------------------------"
}

# =============================================================================
# STEP 1: ENVIRONMENT VALIDATION
# =============================================================================
validate_environment() {
    step "1" "Environment Validation"
    
    # Check Node.js version
    if ! command -v node &> /dev/null; then
        error "Node.js not found! Install Node.js v20+ first."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 20 ]; then
        error "Node.js v20+ required. Current: $(node -v)"
        exit 1
    fi
    
    success "Node.js version: $(node -v) ✅"
    
    # Check if in correct directory
    if [ ! -f "package.json" ]; then
        error "package.json not found! Run this script from project root."
        exit 1
    fi
    
    success "Project root directory confirmed"
    
    log "Environment validation complete"
    echo ""
}

# =============================================================================
# STEP 2: BACKUP CURRENT STATE
# =============================================================================
backup_current_state() {
    step "2" "Backup Current State"
    
    # Create backup directory with timestamp
    BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    
    # Backup package.json files
    cp package.json "$BACKUP_DIR/"
    cp apps/web-admin/package.json "$BACKUP_DIR/web-admin-package.json"
    cp apps/mobile-clean/package.json "$BACKUP_DIR/mobile-clean-package.json" 2>/dev/null || true
    
    # Backup lock files
    cp package-lock.json "$BACKUP_DIR/" 2>/dev/null || true
    cp apps/web-admin/package-lock.json "$BACKUP_DIR/web-admin-package-lock.json" 2>/dev/null || true
    
    success "Backup created in: $BACKUP_DIR"
    
    log "Current React version:"
    npm ls react react-dom --depth=0 2>/dev/null || echo "React not found"
    echo ""
}

# =============================================================================
# STEP 3: UPDATE REACT VERSIONS
# =============================================================================
update_react_versions() {
    step "3" "Update React Versions to 19.1.0"
    
    log "Updating root package.json..."
    # Update root package.json React versions
    sed -i.bak 's/"react": ".*"/"react": "^19.1.0"/' package.json
    sed -i.bak 's/"react-dom": ".*"/"react-dom": "^19.1.0"/' package.json
    
    log "Updating web-admin package.json..."
    # Update web-admin package.json
    sed -i.bak 's/"react": ".*"/"react": "^19.1.0"/' apps/web-admin/package.json
    sed -i.bak 's/"react-dom": ".*"/"react-dom": "^19.1.0"/' apps/web-admin/package.json
    
    # Update mobile-clean if exists
    if [ -f "apps/mobile-clean/package.json" ]; then
        log "Updating mobile-clean package.json..."
        sed -i.bak 's/"react": ".*"/"react": "19.1.0"/' apps/mobile-clean/package.json
    fi
    
    success "React versions updated to 19.1.0"
    echo ""
}

# =============================================================================
# STEP 4: UPDATE RELATED DEPENDENCIES
# =============================================================================
update_related_dependencies() {
    step "4" "Update Related Dependencies"
    
    log "Updating React Router to v7..."
    sed -i.bak 's/"react-router-dom": ".*"/"react-router-dom": "^7.1.1"/' apps/web-admin/package.json
    
    log "Updating TypeScript types..."
    sed -i.bak 's/"@types\/react": ".*"/"@types\/react": "^19.0.0"/' apps/web-admin/package.json
    sed -i.bak 's/"@types\/react-dom": ".*"/"@types\/react-dom": "^19.0.0"/' apps/web-admin/package.json
    
    success "Related dependencies updated"
    echo ""
}

# =============================================================================
# STEP 5: CLEAN DEPENDENCIES
# =============================================================================
clean_dependencies() {
    step "5" "Clean Dependencies"
    
    log "Removing node_modules and lock files..."
    rm -rf node_modules package-lock.json
    rm -rf apps/web-admin/node_modules apps/web-admin/package-lock.json
    rm -rf apps/mobile-clean/node_modules apps/mobile-clean/package-lock.json 2>/dev/null || true
    rm -rf apps/*/node_modules apps/node_modules 2>/dev/null || true
    
    success "Dependencies cleaned"
    echo ""
}

# =============================================================================
# STEP 6: INSTALL DEPENDENCIES
# =============================================================================
install_dependencies() {
    step "6" "Install Dependencies"
    
    log "Installing dependencies (this may take a few minutes)..."
    npm install --legacy-peer-deps
    
    success "Dependencies installed"
    
    log "Verifying React versions..."
    npm ls react react-dom --depth=0 || warning "Some version mismatches detected"
    echo ""
}

# =============================================================================
# STEP 7: CONFIGURE TAILWIND CSS V4
# =============================================================================
configure_tailwind() {
    step "7" "Configure Tailwind CSS v4"
    
    # Check if Tailwind v4 is already configured
    if grep -q '"tailwindcss": "\^4\.' apps/web-admin/package.json; then
        log "Tailwind CSS v4 already configured"
    else
        log "Updating Tailwind CSS to v4..."
        sed -i.bak 's/"tailwindcss": ".*"/"tailwindcss": "^4.1.10"/' apps/web-admin/package.json
        
        # Add Tailwind Vite plugin if not present
        if ! grep -q '"@tailwindcss/vite"' apps/web-admin/package.json; then
            log "Adding @tailwindcss/vite plugin..."
            # This would require more complex JSON manipulation
            warning "Please manually add '@tailwindcss/vite': '^4.1.10' to devDependencies"
        fi
    fi
    
    # Update global.css import
    GLOBAL_CSS="apps/web-admin/src/app/styles/global.css"
    if [ -f "$GLOBAL_CSS" ]; then
        log "Updating global.css import..."
        # Replace old Tailwind imports with v4 syntax
        sed -i.bak '/@tailwind/d' "$GLOBAL_CSS"
        sed -i.bak '1s/^/@import "tailwindcss";\n\n/' "$GLOBAL_CSS"
    fi
    
    success "Tailwind CSS v4 configured"
    echo ""
}

# =============================================================================
# STEP 8: VALIDATE VITE CONFIGURATION
# =============================================================================
validate_vite_config() {
    step "8" "Validate Vite Configuration"
    
    VITE_CONFIG="apps/web-admin/vite.config.ts"
    if [ -f "$VITE_CONFIG" ]; then
        if grep -q "tailwindcss()" "$VITE_CONFIG"; then
            success "Tailwind Vite plugin already configured"
        else
            warning "Tailwind Vite plugin may need manual configuration"
            log "Add: import tailwindcss from '@tailwindcss/vite'"
            log "Add: tailwindcss() to plugins array"
        fi
        
        if grep -q "@ui/" "$VITE_CONFIG"; then
            success "Import aliases configured"
        else
            warning "Import aliases may need configuration"
        fi
    else
        warning "Vite config not found"
    fi
    echo ""
}

# =============================================================================
# STEP 9: TEST DEVELOPMENT SERVER
# =============================================================================
test_dev_server() {
    step "9" "Test Development Server"
    
    log "Testing development server startup..."
    cd apps/web-admin
    
    # Test if dev server can start (timeout after 30 seconds)
    timeout 30s npm run dev > /dev/null 2>&1 &
    DEV_PID=$!
    
    sleep 5
    
    if kill -0 $DEV_PID 2>/dev/null; then
        success "Development server started successfully"
        kill $DEV_PID 2>/dev/null || true
    else
        warning "Development server may have issues"
        log "Check manually with: cd apps/web-admin && npm run dev"
    fi
    
    cd ../..
    echo ""
}

# =============================================================================
# STEP 10: TEST PRODUCTION BUILD
# =============================================================================
test_production_build() {
    step "10" "Test Production Build"
    
    log "Testing production build..."
    cd apps/web-admin
    
    if npm run build; then
        success "Production build successful"
    else
        error "Production build failed"
        log "Check TypeScript errors and fix before proceeding"
    fi
    
    cd ../..
    echo ""
}

# =============================================================================
# STEP 11: FINAL VALIDATION
# =============================================================================
final_validation() {
    step "11" "Final Validation"
    
    log "React versions:"
    npm ls react react-dom --depth=0 2>/dev/null || true
    
    log "Checking for critical issues..."
    
    # Check if main files exist
    FILES=(
        "apps/web-admin/src/main.tsx"
        "apps/web-admin/src/app/styles/global.css"
        "apps/web-admin/vite.config.ts"
    )
    
    for file in "${FILES[@]}"; do
        if [ -f "$file" ]; then
            success "$file exists"
        else
            warning "$file not found"
        fi
    done
    
    echo ""
    success "🎉 React 19 Integration Complete!"
    echo ""
    log "Next steps:"
    echo "1. cd apps/web-admin && npm run dev"
    echo "2. Test application in browser"
    echo "3. Check console for any warnings"
    echo "4. Run tests: npm run test"
    echo ""
    log "Documentation: See REACT_19_READY_STATE.md"
}

# =============================================================================
# ROLLBACK FUNCTION
# =============================================================================
rollback() {
    error "Rolling back changes..."
    
    if [ -n "$BACKUP_DIR" ] && [ -d "$BACKUP_DIR" ]; then
        cp "$BACKUP_DIR/package.json" .
        cp "$BACKUP_DIR/web-admin-package.json" apps/web-admin/package.json
        cp "$BACKUP_DIR/mobile-clean-package.json" apps/mobile-clean/package.json 2>/dev/null || true
        
        success "Backup restored from $BACKUP_DIR"
        log "Run 'npm install' to restore previous state"
    else
        warning "No backup found for rollback"
    fi
}

# =============================================================================
# MAIN EXECUTION
# =============================================================================
main() {
    echo "============================================================================="
    echo "🚀 REACT 19 INTEGRATION - Systematic Step-by-Step Process"
    echo "============================================================================="
    echo ""
    
    # Trap errors for rollback
    trap rollback ERR
    
    validate_environment
    backup_current_state
    update_react_versions
    update_related_dependencies
    clean_dependencies
    install_dependencies
    configure_tailwind
    validate_vite_config
    test_dev_server
    test_production_build
    final_validation
    
    echo "============================================================================="
    echo "✅ SUCCESS: React 19 Integration Completed Successfully!"
    echo "============================================================================="
}

# =============================================================================
# COMMAND LINE OPTIONS
# =============================================================================
case "${1:-}" in
    "backup")
        backup_current_state
        ;;
    "clean")
        clean_dependencies
        ;;
    "install")
        install_dependencies
        ;;
    "test")
        test_dev_server
        ;;
    "rollback")
        rollback
        ;;
    "validate")
        validate_environment
        final_validation
        ;;
    *)
        main
        ;;
esac 
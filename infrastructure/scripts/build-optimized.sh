#!/bin/bash

# EV Charging Admin - Optimized Build Script with NX
# This script optimizes the build process using NX caching and parallel execution

set -e

echo "🚀 Starting EV Charging Admin Optimized Build Process"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the correct directory
if [ ! -f "nx.json" ]; then
    print_error "nx.json not found. Please run this script from the project root."
    exit 1
fi

# Parse command line arguments
BUILD_TYPE=${1:-"production"}
CACHE_CLEAR=${2:-"false"}

# Disable NX Cloud for local builds
export NX_CLOUD_DISTRIBUTED_EXECUTION=false
export NX_CLOUD_ACCESS_TOKEN=""

print_status "Build type: $BUILD_TYPE"
print_status "Cache clear: $CACHE_CLEAR"
print_status "NX Cloud: Disabled for local builds"

# Clear NX cache if requested
if [ "$CACHE_CLEAR" = "true" ]; then
    print_status "Clearing NX cache..."
    npx nx reset
    print_success "NX cache cleared"
fi

# Step 1: Install dependencies (if needed)
print_status "Checking dependencies..."
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm ci --legacy-peer-deps
    print_success "Dependencies installed"
else
    print_status "Dependencies already installed"
fi

# Step 2: Build shared packages first (parallel)
print_status "Building shared packages..."
npx nx run-many \
    --target=build \
    --projects=@evc/shared-api,@evc/shared-types,@evc/shared-store,@evc/shared-utils,@evc/design-tokens \
    --parallel=5 \
    --verbose

if [ $? -eq 0 ]; then
    print_success "Shared packages built successfully"
else
    print_error "Failed to build shared packages"
    exit 1
fi

# Step 3: Type checking (parallel with linting)
print_status "Running type checking and linting..."
npx nx run-many \
    --target=typecheck,lint \
    --projects=@evc/app-admin \
    --parallel=2 \
    --verbose

if [ $? -eq 0 ]; then
    print_success "Type checking and linting passed"
else
    print_warning "Type checking or linting had issues (continuing...)"
fi

# Step 4: Build the admin application
print_status "Building admin application..."
if [ "$BUILD_TYPE" = "docker" ]; then
    npx nx build @evc/app-admin --configuration=docker --verbose
elif [ "$BUILD_TYPE" = "production" ]; then
    npx nx build @evc/app-admin --configuration=production --verbose
else
    npx nx build @evc/app-admin --verbose
fi

if [ $? -eq 0 ]; then
    print_success "Admin application built successfully"
else
    print_error "Failed to build admin application"
    exit 1
fi

# Step 5: Generate dependency graph (optional)
if command -v npx nx graph >/dev/null 2>&1; then
    print_status "Generating dependency graph..."
    npx nx graph --file=dependency-graph.html
    print_success "Dependency graph generated: dependency-graph.html"
fi

# Step 6: Build summary
echo ""
echo "=================================================="
print_success "Build completed successfully! 🎉"
echo ""
print_status "Build artifacts:"
echo "  📦 Admin app: packages/app/admin/.next/"
echo "  📊 Shared packages: packages/shared/*/dist/"
echo "  🎨 Design tokens: packages/design/tokens/dist/"
echo ""

# Step 7: Docker build (if requested)
if [ "$BUILD_TYPE" = "docker" ]; then
    print_status "Building Docker image..."
    docker build -f Dockerfile -t evc-admin:latest .
    
    if [ $? -eq 0 ]; then
        print_success "Docker image built successfully"
        echo "  🐳 Docker image: evc-admin:latest"
    else
        print_error "Failed to build Docker image"
        exit 1
    fi
fi

# Show NX cache statistics
print_status "NX Cache Statistics:"
npx nx show projects | wc -l | xargs echo "  Projects configured:"
du -sh node_modules/.nx/cache 2>/dev/null | cut -f1 | xargs echo "  Cache size:" || echo "  Cache size: Not available"

echo ""
print_success "All done! 🚀"
echo "==================================================" 
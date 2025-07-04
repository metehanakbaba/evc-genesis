#!/bin/bash

# EV Charging Admin - Docker Build Script (No NX Cloud)
# This script builds Docker images without requiring NX Cloud connectivity

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Parse arguments
BUILD_TYPE=${1:-"production"}
TAG=${2:-"evc-admin:latest"}

echo "🐳 EV Charging Admin - Docker Build"
echo "==================================="
print_status "Build type: $BUILD_TYPE"
print_status "Docker tag: $TAG"

# Ensure we're in the correct directory
if [ ! -f "nx.json" ]; then
    print_error "nx.json not found. Please run this script from the project root."
    exit 1
fi

# Disable NX Cloud for local builds
export NX_CLOUD_DISTRIBUTED_EXECUTION=false
export NX_CLOUD_ACCESS_TOKEN=""

case "$BUILD_TYPE" in
    "production" | "prod")
        print_status "Building production Docker image..."
        docker build \
            -f Dockerfile \
            --target runner \
            --build-arg NODE_ENV=production \
            --build-arg NEXT_TELEMETRY_DISABLED=1 \
            --build-arg NX_CLOUD_DISTRIBUTED_EXECUTION=false \
            --build-arg NX_CLOUD_ACCESS_TOKEN="" \
            -t "$TAG" \
            .
        ;;
    "development" | "dev")
        print_status "Building development Docker image..."
        docker build \
            -f Dockerfile.dev \
            --target development \
            --build-arg NODE_ENV=development \
            --build-arg NX_CLOUD_DISTRIBUTED_EXECUTION=false \
            -t "${TAG%-*}:dev" \
            .
        ;;
    *)
        print_error "Unknown build type: $BUILD_TYPE"
        print_status "Available types: production, development"
        exit 1
        ;;
esac

if [ $? -eq 0 ]; then
    print_success "Docker image built successfully! 🎉"
    print_status "Image: $TAG"
    
    # Show image size
    IMAGE_SIZE=$(docker images --format "table {{.Repository}}:{{.Tag}}\t{{.Size}}" | grep "$TAG" | awk '{print $2}')
    print_status "Image size: ${IMAGE_SIZE:-"Unknown"}"
    
    echo ""
    print_status "To run the container:"
    if [ "$BUILD_TYPE" = "development" ] || [ "$BUILD_TYPE" = "dev" ]; then
        echo "  docker run -p 3000:3000 -v \$(pwd):/app ${TAG%-*}:dev"
    else
        echo "  docker run -p 3000:3000 $TAG"
    fi
    
    print_status "To run with Docker Compose:"
    echo "  docker-compose up evc-admin"
    
else
    print_error "Docker build failed!"
    exit 1
fi 
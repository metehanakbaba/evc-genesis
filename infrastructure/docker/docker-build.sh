#!/bin/bash

# 🐳 EV Charging Admin Panel - Docker Build Script
# Location: infrastructure/docker/docker-build.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-production}
IMAGE_TAG=${2:-evc-admin:latest}
BUILD_CONTEXT="../../"  # Root of the project from infrastructure/docker/
DOCKERFILE_PATH="infrastructure/docker/Dockerfile"

echo -e "${BLUE}🐳 Building EV Charging Admin Panel Docker Image${NC}"
echo -e "${YELLOW}Environment: ${ENVIRONMENT}${NC}"
echo -e "${YELLOW}Image Tag: ${IMAGE_TAG}${NC}"
echo ""

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(development|production)$ ]]; then
    echo -e "${RED}❌ Error: Environment must be 'development' or 'production'${NC}"
    echo "Usage: $0 [development|production] [image-tag]"
    exit 1
fi

# Set dockerfile based on environment
if [ "$ENVIRONMENT" = "development" ]; then
    DOCKERFILE_PATH="infrastructure/docker/Dockerfile.dev"
    echo -e "${YELLOW}📦 Using development Dockerfile${NC}"
else
    echo -e "${YELLOW}🚀 Using production Dockerfile${NC}"
fi

# Navigate to project root
cd "$(dirname "$0")/../../"

echo -e "${BLUE}📂 Current directory: $(pwd)${NC}"
echo -e "${BLUE}🔍 Build context: ${BUILD_CONTEXT}${NC}"
echo -e "${BLUE}📄 Dockerfile: ${DOCKERFILE_PATH}${NC}"
echo ""

# Clean previous builds if needed
if [ "$ENVIRONMENT" = "production" ]; then
    echo -e "${YELLOW}🧹 Cleaning previous builds...${NC}"
    docker builder prune -f --filter until=24h
fi

# Build the Docker image
echo -e "${GREEN}🔨 Building Docker image...${NC}"
docker build \
    --build-arg NODE_ENV="$ENVIRONMENT" \
    --build-arg BUILD_DATE="$(date -u +'%Y-%m-%dT%H:%M:%SZ')" \
    --build-arg VERSION="$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')" \
    -t "$IMAGE_TAG" \
    -f "$DOCKERFILE_PATH" \
    "$BUILD_CONTEXT"

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Docker image built successfully!${NC}"
    echo -e "${GREEN}🏷️  Image tag: ${IMAGE_TAG}${NC}"
    echo ""
    echo -e "${BLUE}📊 Image size:${NC}"
    docker images "$IMAGE_TAG" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
    echo ""
    echo -e "${YELLOW}🚀 To run the container:${NC}"
    if [ "$ENVIRONMENT" = "development" ]; then
        echo -e "${BLUE}docker run -p 3000:3000 --name evc-admin-dev ${IMAGE_TAG}${NC}"
    else
        echo -e "${BLUE}docker run -p 3000:3000 --name evc-admin ${IMAGE_TAG}${NC}"
    fi
else
    echo -e "${RED}❌ Docker build failed!${NC}"
    exit 1
fi 
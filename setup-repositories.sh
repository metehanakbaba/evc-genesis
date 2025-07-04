#!/bin/zsh

# EVC Genesis - Repository Setup Script
# Bu script tüm repository'leri oluşturur ve submodule yapısını kurar

set -e

# Renkler
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "=================================================="
echo "       EVC Genesis Repository Setup"
echo "=================================================="
echo -e "${NC}"

# GitHub username/organization
GITHUB_ORG="metehanakbaba"
BASE_URL="git@github.com:${GITHUB_ORG}"

# Repository listesi (zsh array format)
typeset -A REPOS
REPOS=(
    "evc-genesis" "Ana orchestrator repository"
    "evc-shared-packages" "Shared packages (API, Types, Store, Utils)"
    "evc-admin" "Next.js Admin App (packages/app/admin)"
    "evc-mobile" "React Native Mobile App"
    "evc-design-system" "Design system ve tokens"
    "evc-schemas" "TypeScript schemas"
    "evc-infrastructure" "Docker, K8s, CI/CD"
    "evc-e2e-tests" "End-to-end testler"
)

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 1. Repository'leri GitHub'da oluştur (Manuel olarak yapılacak)
show_github_repos() {
    echo -e "${YELLOW}📋 Oluşturulacak GitHub Repository'leri:${NC}"
    echo "=============================================="
    for repo in ${(k)REPOS}; do
        echo -e "${GREEN}$repo${NC} - ${REPOS[$repo]}"
        echo "   URL: https://github.com/${GITHUB_ORG}/$repo"
    done
    echo
    echo -e "${YELLOW}⚠️  Bu repository'leri GitHub'da manuel olarak oluşturun!${NC}"
    echo -e "${YELLOW}⚠️  Tüm repo'ları oluşturduktan sonra devam edin...${NC}"
    echo -n "Devam etmek için Enter'a basın..."
    read
}

# 2. Mevcut kodları repository'lere böl
split_codebase() {
    log_info "Mevcut kodlar repository'lere bölünüyor..."
    
    # Geçici dizin oluştur
    mkdir -p temp-repos
    cd temp-repos
    
    # Shared Packages
    log_info "evc-shared-packages oluşturuluyor..."
    git clone ${BASE_URL}/evc-shared-packages.git || git init evc-shared-packages
    cd evc-shared-packages
    cp -r ../../packages/shared/* .
    
    # package.json oluştur
    cat > package.json << EOF
{
  "name": "@evc/shared-packages",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "api",
    "types", 
    "store",
    "utils"
  ],
  "scripts": {
    "build": "npm run build --workspaces",
    "test": "npm run test --workspaces",
    "lint": "npm run lint --workspaces"
  }
}
EOF
    
    git add .
    git commit -m "Initial commit: Shared packages (API, Types, Store, Utils)" || true
    git branch -M main
    git remote add origin ${BASE_URL}/evc-shared-packages.git || true
    cd ..
    
    # Next.js Admin App
    log_info "evc-admin oluşturuluyor..."
    git clone ${BASE_URL}/evc-admin.git || git init evc-admin
    cd evc-admin
    cp -r ../../packages/app/admin/* .
    git add .
    git commit -m "Initial commit: Next.js Admin App" || true
    git branch -M main
    git remote add origin ${BASE_URL}/evc-admin.git || true
    cd ..
    
    # Mobile App
    log_info "evc-mobile oluşturuluyor..."
    git clone ${BASE_URL}/evc-mobile.git || git init evc-mobile
    cd evc-mobile
    cp -r ../../packages/app/mobile/* .
    git add .
    git commit -m "Initial commit: React Native Mobile App" || true
    git branch -M main
    git remote add origin ${BASE_URL}/evc-mobile.git || true
    cd ..
    
    # Design System
    log_info "evc-design-system oluşturuluyor..."
    git clone ${BASE_URL}/evc-design-system.git || git init evc-design-system
    cd evc-design-system
    cp -r ../../packages/design/* .
    git add .
    git commit -m "Initial commit: Design System & Tokens" || true
    git branch -M main
    git remote add origin ${BASE_URL}/evc-design-system.git || true
    cd ..
    
    # Schemas
    log_info "evc-schemas oluşturuluyor..."
    git clone ${BASE_URL}/evc-schemas.git || git init evc-schemas
    cd evc-schemas
    cp -r ../../schemas/* .
    git add .
    git commit -m "Initial commit: TypeScript Schemas" || true
    git branch -M main
    git remote add origin ${BASE_URL}/evc-schemas.git || true
    cd ..
    
    # Infrastructure
    log_info "evc-infrastructure oluşturuluyor..."
    git clone ${BASE_URL}/evc-infrastructure.git || git init evc-infrastructure
    cd evc-infrastructure
    mkdir -p {docker,scripts,tools}
    cp ../../Dockerfile* .
    cp ../../docker-compose.yml .
    cp ../../docker-start.sh .
    cp ../../install.sh .
    cp -r ../../tools/* tools/
    cp -r ../../scripts/* scripts/ 2>/dev/null || true
    git add .
    git commit -m "Initial commit: Infrastructure (Docker, Scripts)" || true
    git branch -M main
    git remote add origin ${BASE_URL}/evc-infrastructure.git || true
    cd ..
    
    # E2E Tests
    log_info "evc-e2e-tests oluşturuluyor..."
    git clone ${BASE_URL}/evc-e2e-tests.git || git init evc-e2e-tests
    cd evc-e2e-tests
    cp -r ../../apps-e2e/* .
    git add .
    git commit -m "Initial commit: E2E Tests" || true
    git branch -M main
    git remote add origin ${BASE_URL}/evc-e2e-tests.git || true
    cd ..
    
    cd ..
    log_success "Tüm repository'ler oluşturuldu!"
}

# 3. Ana repository'yi submodule yapısına çevir
setup_main_repo() {
    log_info "Ana repository submodule yapısına çevriliyor..."
    
    # Mevcut klasörleri yedekle
    mkdir -p .backup
    cp -r packages .backup/ 2>/dev/null || true
    cp -r apps .backup/ 2>/dev/null || true
    cp -r schemas .backup/ 2>/dev/null || true
    
    # Submodule'ları ekle
    git submodule add ${BASE_URL}/evc-shared-packages.git shared-packages
    git submodule add ${BASE_URL}/evc-admin.git admin-app
    git submodule add ${BASE_URL}/evc-mobile.git mobile-app
    git submodule add ${BASE_URL}/evc-design-system.git design-system
    git submodule add ${BASE_URL}/evc-schemas.git schemas
    git submodule add ${BASE_URL}/evc-infrastructure.git infrastructure
    git submodule add ${BASE_URL}/evc-e2e-tests.git e2e-tests
    
    # .gitmodules dosyasını güncelle
    cat > .gitmodules << EOF
[submodule "shared-packages"]
	path = shared-packages
	url = ${BASE_URL}/evc-shared-packages.git
	branch = main
[submodule "admin-app"]
	path = admin-app
	url = ${BASE_URL}/evc-admin.git
	branch = main
[submodule "mobile-app"]
	path = mobile-app
	url = ${BASE_URL}/evc-mobile.git
	branch = main
[submodule "design-system"]
	path = design-system
	url = ${BASE_URL}/evc-design-system.git
	branch = main
[submodule "schemas"]
	path = schemas
	url = ${BASE_URL}/evc-schemas.git
	branch = main
[submodule "infrastructure"]
	path = infrastructure
	url = ${BASE_URL}/evc-infrastructure.git
	branch = main
[submodule "e2e-tests"]
	path = e2e-tests
	url = ${BASE_URL}/evc-e2e-tests.git
	branch = main
EOF
    
    # Ana package.json'u güncelle
    cat > package.json << EOF
{
  "name": "@evc/genesis",
  "version": "1.0.0",
  "private": true,
  "description": "EV Charging Genesis - Main Orchestrator",
  "scripts": {
    "install:all": "git submodule update --init --recursive && npm run install:workspaces",
    "install:workspaces": "npm install && npm install --prefix shared-packages && npm install --prefix admin-app && npm install --prefix mobile-app",
    "dev:admin": "cd admin-app && npm run dev",
    "dev:mobile": "cd mobile-app && npm start",
    "build:all": "npm run build --prefix shared-packages && npm run build --prefix admin-app",
    "test:all": "npm run test --prefix shared-packages && npm run test --prefix admin-app && npm run test --prefix e2e-tests",
    "docker:dev": "cd infrastructure && ./docker-start.sh dev",
    "docker:prod": "cd infrastructure && ./docker-start.sh prod",
    "update:submodules": "git submodule update --remote --merge",
    "status:all": "git submodule foreach git status"
  },
  "workspaces": [
    "shared-packages/api",
    "shared-packages/types",
    "shared-packages/store", 
    "shared-packages/utils",
    "design-system/tokens"
  ]
}
EOF
    
    # README.md güncelle
    cat > README.md << EOF
# 🚀 EVC Genesis - EV Charging Platform

> Ana orchestrator repository - Tüm mikroservisler ve uygulamalar için merkezi yönetim

## 📦 Submodule Yapısı

 | Submodule | Repository | Açıklama |
 |-----------|------------|----------|
 | \`shared-packages\` | [evc-shared-packages](${BASE_URL}/evc-shared-packages) | API, Types, Store, Utils |
 | \`admin-app\` | [evc-admin](${BASE_URL}/evc-admin) | Next.js Admin Paneli |
 | \`mobile-app\` | [evc-mobile](${BASE_URL}/evc-mobile) | React Native Mobile App |
 | \`design-system\` | [evc-design-system](${BASE_URL}/evc-design-system) | Design System & Tokens |
 | \`schemas\` | [evc-schemas](${BASE_URL}/evc-schemas) | TypeScript Schemas |
 | \`infrastructure\` | [evc-infrastructure](${BASE_URL}/evc-infrastructure) | Docker, K8s, CI/CD |
 | \`e2e-tests\` | [evc-e2e-tests](${BASE_URL}/evc-e2e-tests) | End-to-End Tests |

## 🚀 Hızlı Başlangıç

\`\`\`bash
# Repository'yi klonla (submodule'larla birlikte)
git clone --recursive ${BASE_URL}/evc-genesis.git
cd evc-genesis

# Tüm bağımlılıkları yükle
npm run install:all

 # Development sunucuları başlat
 npm run dev:admin    # Next.js Admin (port 3000)
 npm run dev:mobile   # React Native Metro (port 8081)
\`\`\`

## 🛠️ Development Komutları

\`\`\`bash
# Submodule'ları güncelle
npm run update:submodules

# Tüm projeleri build et
npm run build:all

# Tüm testleri çalıştır
npm run test:all

# Docker development
npm run docker:dev

# Docker production
npm run docker:prod

# Tüm submodule'ların durumunu kontrol et
npm run status:all
\`\`\`

## 🔒 Yetkilendirme Stratejisi

### Developer Access Levels

 1. **Core Team**: Tüm repository'lere tam erişim
 2. **Frontend Team**: \`admin-app\`, \`design-system\` erişimi
 3. **Mobile Team**: \`mobile-app\`, \`shared-packages\` erişimi
 4. **DevOps Team**: \`infrastructure\`, \`e2e-tests\` erişimi
 5. **External Contributors**: Sadece belirli submodule'lara read-only

### Secret Management

- Shared packages için JavaScript şifreleme
- Repository bazlı access token'lar
- Submodule'lar arası interface kontratları

## 📁 Klasör Yapısı

 \`\`\`
 evc-genesis/
 ├── shared-packages/     → @evc/shared-* packages (api, types, store, utils)
 ├── admin-app/          → Next.js admin panel  
 ├── mobile-app/         → React Native app
 ├── design-system/      → Design tokens & components
 ├── schemas/           → TypeScript schemas
 ├── infrastructure/    → Docker, K8s, CI/CD
 ├── e2e-tests/         → End-to-end tests
 ├── .gitmodules        → Submodule configuration
 └── package.json       → Workspace orchestration
 \`\`\`

EOF
    
    git add .
    git commit -m "Setup submodule architecture with apps preserved"
    
    log_success "Ana repository submodule yapısına çevrildi!"
}

# 4. Submodule'ları push et
push_all_repos() {
    log_info "Tüm repository'ler push ediliyor..."
    
    cd temp-repos
    for repo in */; do
        if [ -d "$repo" ]; then
            log_info "Pushing $repo..."
            cd "$repo"
            git push -u origin main || log_warning "Push failed for $repo"
            cd ..
        fi
    done
    cd ..
    
    # Ana repository'yi push et
    git push -u origin main
    
    log_success "Tüm repository'ler push edildi!"
}

# Ana fonksiyon
main() {
    echo -e "${YELLOW}EVC Genesis Repository Setup başlatılıyor...${NC}"
    echo
    
    case "${1:-all}" in
        "show")
            show_github_repos
            ;;
        "split") 
            split_codebase
            ;;
        "setup")
            setup_main_repo
            ;;
        "push")
            push_all_repos
            ;;
        "all")
            show_github_repos
            split_codebase
            setup_main_repo
            push_all_repos
            ;;
        *)
            echo -e "${YELLOW}Kullanım:${NC}"
            echo "  ./setup-repositories.sh show    # Repository listesini göster"
            echo "  ./setup-repositories.sh split   # Kodu repository'lere böl"
            echo "  ./setup-repositories.sh setup   # Submodule yapısını kur"
            echo "  ./setup-repositories.sh push    # Tüm repo'ları push et"
            echo "  ./setup-repositories.sh all     # Hepsini çalıştır"
            ;;
    esac
}

main "$@" 
#!/bin/bash

# EVC Admin Panel - Quick Start Script
# Hızlı başlangıç için Docker scriptleri

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Renkler
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 EVC Admin Panel Docker Quick Start${NC}"
echo "======================================"

# Fonksiyonlar
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Command line argument parsing
COMMAND=${1:-"help"}

case $COMMAND in
    "dev")
        log_info "Development modunda başlatılıyor..."
        docker-compose --profile dev up --build evc-admin-dev
        ;;
    "prod")
        log_info "Production modunda başlatılıyor..."
        
        # Production environment setup
        export NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL:-"http://0.0.0.0:3000"}
        export NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-"https://api.evcharge.com"}
        export API_BASE_URL=${API_BASE_URL:-"https://api.evcharge.com/v1"}
        
        docker-compose up --build -d evc-admin
        
        log_success "Production container başlatıldı!"
        echo -e "${GREEN}🌐 Uygulama:${NC} http://0.0.0.0:3000 (External Access)"
        echo -e "${GREEN}🌐 Lokal:${NC} http://localhost:3000"
        echo -e "${YELLOW}💡 Sunucu IP'si ile erişim için:${NC} http://your-server-ip:3000"
        ;;
    "prod-custom")
        DOMAIN_OR_IP=${2:-""}
        if [ -z "$DOMAIN_OR_IP" ]; then
            log_error "Domain veya IP adresi belirtiniz!"
            echo -e "${YELLOW}Kullanım:${NC} ./docker-start.sh prod-custom your-domain.com"
            echo -e "${YELLOW}Veya:${NC} ./docker-start.sh prod-custom 192.168.1.100"
            exit 1
        fi
        
        log_info "Production modunda başlatılıyor ($DOMAIN_OR_IP)..."
        
        # Custom domain/IP environment setup
        export NEXT_PUBLIC_APP_URL="http://$DOMAIN_OR_IP:3000"
        export NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-"https://api.evcharge.com"}
        export API_BASE_URL=${API_BASE_URL:-"https://api.evcharge.com/v1"}
        
        docker-compose up --build -d evc-admin
        
        log_success "Production container başlatıldı!"
        echo -e "${GREEN}🌐 Uygulama:${NC} http://$DOMAIN_OR_IP:3000"
        echo -e "${GREEN}🌐 API:${NC} $NEXT_PUBLIC_API_URL"
        ;;
    "build")
        log_info "Docker image build ediliyor..."
        docker-compose build evc-admin
        log_success "Build tamamlandı!"
        ;;
    "test-build")
        log_info "Hızlı build test ediliyor (sadece admin app)..."
        npx nx build @evc/app-admin --configuration=production --no-cloud --skip-nx-cache
        log_success "Hızlı build test başarılı!"
        ;;
    "nx-build")
        log_info "Tam NX build ediliyor (Docker için)..."
        log_info "Shared packages build ediliyor..."
        npx nx run-many --target=build --projects=@evc/shared-api,@evc/shared-types,@evc/shared-store,@evc/shared-utils,@evc/design-tokens --parallel=3 --no-cloud
        log_info "Admin app build ediliyor (Docker config)..."
        npx nx build @evc/app-admin --configuration=docker --no-cloud
        log_success "Tam NX build tamamlandı!"
        ;;
    "nx-clean")
        log_info "NX cache temizleniyor..."
        npx nx reset
        log_success "NX cache temizlendi!"
        ;;
    "stop")
        log_info "Container'lar durduruluyor..."
        docker-compose down
        log_success "Container'lar durduruldu!"
        ;;
    "restart")
        log_info "Container'lar yeniden başlatılıyor..."
        docker-compose restart
        log_success "Container'lar yeniden başlatıldı!"
        ;;
    "logs")
        log_info "Container logları gösteriliyor..."
        docker-compose logs -f evc-admin
        ;;
    "clean")
        log_info "Docker cache temizleniyor..."
        docker-compose down -v
        docker system prune -f
        docker volume prune -f
        log_success "Cache temizlendi!"
        ;;
    "shell")
        log_info "Container shell'e bağlanılıyor..."
        docker-compose exec evc-admin sh
        ;;
    "install")
        log_info "Tam kurulum başlatılıyor..."
        ./install.sh
        ;;
    "help"|*)
        echo -e "${YELLOW}Kullanım:${NC} ./docker-start.sh [komut]"
        echo
        echo -e "${YELLOW}Komutlar:${NC}"
        echo -e "  ${BLUE}dev${NC}         - Development modunda başlat (hot reload)"
        echo -e "  ${BLUE}prod${NC}        - Production modunda başlat (0.0.0.0:3000)"
        echo -e "  ${BLUE}prod-custom${NC} - Production modunda başlat (custom domain/IP)"
        echo -e "  ${BLUE}build${NC}       - Docker image build et"
        echo -e "  ${BLUE}test-build${NC}  - Hızlı build test et (sadece admin app)"
        echo -e "  ${BLUE}nx-build${NC}    - Tam NX build et (Docker için, tüm projeler)"
        echo -e "  ${BLUE}nx-clean${NC}    - NX cache'i temizle"
        echo -e "  ${BLUE}stop${NC}        - Container'ları durdur"
        echo -e "  ${BLUE}restart${NC}     - Container'ları yeniden başlat"
        echo -e "  ${BLUE}logs${NC}        - Container loglarını göster"
        echo -e "  ${BLUE}shell${NC}       - Container shell'ine bağlan"
        echo -e "  ${BLUE}clean${NC}       - Docker cache'i temizle"
        echo -e "  ${BLUE}install${NC}     - Sunucuya tam kurulum yap"
        echo -e "  ${BLUE}help${NC}        - Bu yardım mesajını göster"
        echo
        echo -e "${YELLOW}Örnekler:${NC}"
        echo -e "  ${GREEN}./docker-start.sh dev${NC}                    # Development başlat"
        echo -e "  ${GREEN}./docker-start.sh prod${NC}                   # Production başlat (external access)"
        echo -e "  ${GREEN}./docker-start.sh prod-custom 192.168.1.100${NC} # Custom IP ile başlat"
        echo -e "  ${GREEN}./docker-start.sh prod-custom mydomain.com${NC}   # Custom domain ile başlat"
        echo -e "  ${GREEN}./docker-start.sh test-build${NC}              # Hızlı build test (admin app)"
        echo -e "  ${GREEN}./docker-start.sh nx-build${NC}                # Tam build (Docker için)"
        echo -e "  ${GREEN}./docker-start.sh nx-clean${NC}                # NX cache temizle"
        echo -e "  ${GREEN}./docker-start.sh logs${NC}                   # Logları izle"
        ;;
esac 
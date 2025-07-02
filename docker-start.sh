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
        docker-compose up --build -d evc-admin
        log_success "Production container başlatıldı!"
        echo -e "${GREEN}🌐 Uygulama:${NC} http://localhost:3000"
        ;;
    "build")
        log_info "Docker image build ediliyor..."
        docker-compose build evc-admin
        log_success "Build tamamlandı!"
        ;;
    "test-build")
        log_info "Local build test ediliyor..."
        cd packages/app/admin
        CI=true npm run build
        log_success "Local build test başarılı!"
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
        echo -e "  ${BLUE}prod${NC}        - Production modunda başlat"
        echo -e "  ${BLUE}build${NC}       - Docker image build et"
        echo -e "  ${BLUE}test-build${NC}  - Local build test et"
        echo -e "  ${BLUE}stop${NC}        - Container'ları durdur"
        echo -e "  ${BLUE}restart${NC}     - Container'ları yeniden başlat"
        echo -e "  ${BLUE}logs${NC}        - Container loglarını göster"
        echo -e "  ${BLUE}shell${NC}       - Container shell'ine bağlan"
        echo -e "  ${BLUE}clean${NC}       - Docker cache'i temizle"
        echo -e "  ${BLUE}install${NC}     - Sunucuya tam kurulum yap"
        echo -e "  ${BLUE}help${NC}        - Bu yardım mesajını göster"
        echo
        echo -e "${YELLOW}Örnekler:${NC}"
        echo -e "  ${GREEN}./docker-start.sh dev${NC}       # Development başlat"
        echo -e "  ${GREEN}./docker-start.sh prod${NC}      # Production başlat"
        echo -e "  ${GREEN}./docker-start.sh test-build${NC} # Local build test"
        echo -e "  ${GREEN}./docker-start.sh logs${NC}      # Logları izle"
        ;;
esac 
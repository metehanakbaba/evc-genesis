#!/bin/bash

# EVC Admin Panel - Docker Installation Script
# Bu script Ubuntu sunucuda otomatik kurulum yapar

set -e

# Renkler
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logo
echo -e "${BLUE}"
echo "=================================================="
echo "       EV Charging Admin Panel Installer"
echo "=================================================="
echo -e "${NC}"

# Functions
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


# System update
log_info "Sistem güncelleniyor..."
sudo apt update && sudo apt upgrade -y

# Install Docker if not exists
if ! command -v docker &> /dev/null; then
    log_info "Docker kuruluyor..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    log_success "Docker kuruldu!"
else
    log_success "Docker zaten kurulu!"
fi

# Install Docker Compose if not exists
if ! command -v docker-compose &> /dev/null; then
    log_info "Docker Compose kuruluyor..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    log_success "Docker Compose kuruldu!"
else
    log_success "Docker Compose zaten kurulu!"
fi

# Install Git if not exists
if ! command -v git &> /dev/null; then
    log_info "Git kuruluyor..."
    sudo apt install git -y
    log_success "Git kuruldu!"
fi

# Install Node.js if not exists (for development)
if ! command -v node &> /dev/null; then
    log_info "Node.js kuruluyor..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
    log_success "Node.js kuruldu!"
fi

# Create application directory
APP_DIR="/opt/evc-admin"
log_info "Uygulama dizini oluşturuluyor: $APP_DIR"
sudo mkdir -p $APP_DIR
sudo chown $USER:$USER $APP_DIR

# Clone or update repository
if [ -d "$APP_DIR/.git" ]; then
    log_info "Repository güncelleniyor..."
    cd $APP_DIR
    git pull origin main
else
    log_info "Repository klonlanıyor..."
    # Buraya gerçek repository URL'nizi yazın
    # git clone https://github.com/repo/evc-frontend-admin.git $APP_DIR
    # Şimdilik mevcut dizinden kopyalayalım
    cp -r . $APP_DIR/
    cd $APP_DIR
fi

# Create environment file
if [ ! -f "$APP_DIR/.env.production" ]; then
    log_info "Environment dosyası oluşturuluyor..."
    cat > $APP_DIR/.env.production << EOL
# Production Environment Variables
NODE_ENV=production
PORT=3000
NEXT_TELEMETRY_DISABLED=1

# API Configuration
# API_BASE_URL=https://api-url.com
# DATABASE_URL=database-url

# Add your production environment variables here
EOL
    log_warning ".env.production dosyası oluşturuldu. Lütfen gerekli değişkenleri düzenleyin!"
fi

# Stop existing containers
log_info "Mevcut container'lar durduruluyor..."
docker-compose down || true

# Build and start containers
log_info "Docker image build ediliyor..."
docker-compose build evc-admin

log_info "Container başlatılıyor..."
docker-compose up -d evc-admin

# Wait for application to start
log_info "Uygulama başlatılıyor..."
sleep 10

# Check if application is running
if docker-compose ps | grep -q "evc-admin-app.*Up"; then
    log_success "✅ EVC Admin Panel başarıyla kuruldu!"
    echo
    echo -e "${GREEN}🚀 Uygulama çalışıyor:${NC}"
    echo -e "   ${BLUE}URL:${NC} http://$(hostname -I | awk '{print $1}'):3000"
    echo -e "   ${BLUE}Local:${NC} http://localhost:3000"
    echo
    echo -e "${YELLOW}📋 Yararlı komutlar:${NC}"
    echo -e "   Logları görmek için: ${BLUE}docker-compose logs -f evc-admin${NC}"
    echo -e "   Durdurmak için: ${BLUE}docker-compose down${NC}"
    echo -e "   Yeniden başlatmak için: ${BLUE}docker-compose restart evc-admin${NC}"
    echo -e "   Container içine girmek için: ${BLUE}docker-compose exec evc-admin sh${NC}"
else
    log_error "❌ Kurulum başarısız oldu!"
    echo
    echo -e "${YELLOW}Logları kontrol edin:${NC}"
    echo -e "   ${BLUE}docker-compose logs evc-admin${NC}"
    exit 1
fi

# Create systemd service for auto-start
log_info "Systemd servisi oluşturuluyor..."
sudo tee /etc/systemd/system/evc-admin.service > /dev/null << EOL
[Unit]
Description=EVC Admin Panel
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$APP_DIR
ExecStart=/usr/local/bin/docker-compose up -d evc-admin
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOL

sudo systemctl daemon-reload
sudo systemctl enable evc-admin.service
log_success "Systemd servisi oluşturuldu! Sunucu yeniden başlatıldığında otomatik çalışacak."

echo
echo -e "${GREEN}🎉 Kurulum tamamlandı!${NC}"
echo -e "${BLUE}==================================================" 
# 🐳 EVC Admin Panel - Docker Kurulumu

Bu dokümantasyon EVC Admin Panel'in Docker ile kurulumu için gerekli adımları içerir.

## 📋 Gereksinimler

### Local Development (macOS)
- Docker Desktop
- Node.js 20+ (opsiyonel, sadece local development için)

### Production Server (Ubuntu)
- Docker 
- Docker Compose
- Git

## 🚀 Hızlı Başlangıç

### 1. Repository'yi klonlayın
```bash
git clone <repository-url>
cd evc-frontend-admin
```

### 2. Quick Start Script kullanın
```bash
# Development modunda başlatın (hot reload ile)
./docker-start.sh dev

# Production modunda başlatın
./docker-start.sh prod

# Tüm komutları görmek için
./docker-start.sh help
```

## 🛠️ Kullanılabilir Komutlar

| Komut | Açıklama |
|-------|-----------|
| `./docker-start.sh dev` | Development modunda başlat (port 3001) |
| `./docker-start.sh prod` | Production modunda başlat (port 3000) |
| `./docker-start.sh build` | Docker image build et |
| `./docker-start.sh stop` | Container'ları durdur |
| `./docker-start.sh restart` | Container'ları yeniden başlat |
| `./docker-start.sh logs` | Container loglarını göster |
| `./docker-start.sh shell` | Container shell'ine bağlan |
| `./docker-start.sh clean` | Docker cache'i temizle |
| `./docker-start.sh install` | Sunucuya tam kurulum yap |

## 🔧 Manuel Docker Komutları

### Development
```bash
# Development container'ı başlat
docker-compose --profile dev up --build evc-admin-dev

# Detached modda çalıştır
docker-compose --profile dev up -d --build evc-admin-dev
```

### Production
```bash
# Production build ve başlat
docker-compose up --build -d evc-admin

# Sadece başlat (önceden build edilmişse)
docker-compose up -d evc-admin
```

### Monitoring
```bash
# Logları izle
docker-compose logs -f evc-admin

# Container durumunu kontrol et
docker-compose ps

# Container içindeki processları göster
docker-compose top evc-admin
```

## 🏭 Production Server Kurulumu

Ubuntu sunucunuzda otomatik kurulum için:

```bash
# Kurulum scriptini çalıştır
chmod +x install.sh
./install.sh
```

Bu script şunları yapar:
- ✅ Sistem güncellemesi
- ✅ Docker kurulumu
- ✅ Docker Compose kurulumu  
- ✅ Git kurulumu
- ✅ Node.js kurulumu
- ✅ Uygulama dizini oluşturma
- ✅ Environment dosyası oluşturma
- ✅ Container build ve başlatma
- ✅ Systemd servisi oluşturma (auto-start)

## 🌐 Port Bilgileri

| Service | Port | Açıklama |
|---------|------|-----------|
| Production | 3000 | Ana production uygulaması |
| Development | 3001 | Development sunucusu (hot reload) |

## 📁 Docker Dosya Yapısı

```
├── Dockerfile                  # Production build
├── Dockerfile.dev              # Development build  
├── docker-compose.yml          # Docker Compose konfigürasyonu
├── .dockerignore               # Docker için ignore edilen dosyalar
├── install.sh                  # Otomatik kurulum scripti
├── docker-start.sh             # Hızlı başlangıç scripti
├── nginx.conf                  # NGINX reverse proxy konfigürasyonu
├── env.example                 # Environment variables örneği
├── env.production.example      # Production environment örneği
└── README_DOCKER.md            # Bu dosya
```

## 🔧 Özelleştirme

### Environment Variables
Production için environment dosyasını oluşturun:

```bash
# Örnek dosyayı kopyalayın
cp env.production.example .env.production

# Dosyayı düzenleyin
nano .env.production
```

**Önemli değişkenler:**
- `NEXT_PUBLIC_API_BASE_URL`: API sunucu adresi
- `NEXTAUTH_SECRET`: JWT için güvenli anahtar
- `DATABASE_URL`: Veritabanı bağlantı string'i
- `CORS_ORIGINS`: İzin verilen domain'ler

Tüm örnek değişkenler için `env.example` dosyasına bakın.

### Port Değiştirme
`docker-compose.yml` dosyasında port mapping'i değiştirin:

```yaml
services:
  evc-admin:
    ports:
      - "8080:3000"  # Dış port:İç port
```

## 🐛 Troubleshooting

### Container başlatılamıyor
```bash
# Logları kontrol edin
docker-compose logs evc-admin

# Container'ı yeniden build edin
docker-compose build --no-cache evc-admin
```

### Port çakışması
```bash
# Çalışan container'ları kontrol edin
docker ps

# Port kullanan işlemi bulun
sudo lsof -i :3000

# Container'ı farklı port ile başlatın
docker-compose up -d -p 3001:3000 evc-admin
```

### Disk alanı problemi
```bash
# Kullanılmayan Docker resource'larını temizle
./docker-start.sh clean

# Daha detaylı temizlik
docker system prune -a --volumes
```

### Build cache problemi
```bash
# Cache olmadan build et
docker-compose build --no-cache

# Tüm cache'i temizle
docker builder prune -a
```

## 📊 Performance İpuçları

1. **Multi-stage build**: Dockerfile multi-stage kullanır, image boyutu optimize edilmiştir
2. **Node.js Alpine**: Küçük Linux dağıtımı kullanılır
3. **Layer caching**: Dependencies ayrı layer'da cache'lenir
4. **Standalone mode**: Next.js standalone output kullanılır

## 🔒 Güvenlik

- Container non-root user ile çalışır
- Gereksiz dosyalar `.dockerignore` ile filtrelenir
- Production secrets `.env.production` ile yönetilir
- Network izolasyonu için Docker network kullanılır

## 🆘 Destek

Sorun yaşıyorsanız:

1. Logları kontrol edin: `./docker-start.sh logs`
2. Container durumunu kontrol edin: `docker-compose ps`
3. Docker resource'larını kontrol edin: `docker system df`
4. Issue açın veya development team ile iletişime geçin

---

**Not**: Production deployment öncesinde environment variables'ları mutlaka güncelleyin! 
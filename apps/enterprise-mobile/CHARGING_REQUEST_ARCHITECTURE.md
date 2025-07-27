# ⚡ Charging Request Architecture

## 📋 Genel Bakış

Dashboard'daki mobile charging card'ından başlayarak kullanıcıların iki farklı şarj talebi oluşturabilmesi için geliştirilen mimari.

## 🎯 Kullanıcı Senaryoları

### 1. İstasyon Şarjı
- Kullanıcı yakındaki şarj istasyonlarını görür
- İstasyon seçer ve rezervasyon yapar
- Belirlenen zamanda istasyona gidip şarj eder

### 2. Mobil Şarj Hizmeti
- Teknisyen kullanıcının bulunduğu konuma gelir
- 3 farklı hizmet seviyesi: Standard, Premium, Emergency
- Araç konumu veya manuel adres seçimi

## 🏗️ Mimari Yapı

### Dosya Organizasyonu
```
apps/enterprise-mobile/src/features/charging-request/
├── screens/
│   ├── ChargingRequestSelectionScreen.tsx    # Ana seçim ekranı
│   ├── StationChargingFlowScreen.tsx         # İstasyon şarj akışı
│   └── MobileChargingFlowScreen.tsx          # Mobil şarj akışı
├── types/
│   ├── index.ts
│   └── charging-request.types.ts             # Tüm type tanımları
└── index.ts                                  # Feature exports
```

### Güncellenen Dosyalar
- `MobileChargingCard.tsx` - Request charging butonu eklendi
- `navigation/types.ts` - Yeni ekranlar için route tanımları

## 📱 Ekran Akışı

### Ana Akış
1. **Dashboard** → Mobile Charging Card → "Şarj Talebi Oluştur"
2. **ChargingRequestSelectionScreen** → İstasyon veya Mobil seçimi
3. **Flow Screens** → Çok adımlı form süreçleri

### İstasyon Şarj Akışı (3 Adım)
1. **Araç Seçimi** - Kullanıcının araçları listesi
2. **Konum Belirleme** - Mevcut konum, ev, iş adresi
3. **Şarj Tercihleri** - Hedef batarya seviyesi, zaman tercihi

### Mobil Şarj Akışı (4 Adım)
1. **Hizmet Türü** - Standard/Premium/Emergency
2. **Konum Detayları** - Araç konumu veya manuel adres
3. **Araç Seçimi** - Hangi araç şarj edilecek
4. **Şarj Detayları** - Batarya hedefi, özel talimatlar

## 🎨 Tasarım Tutarlılığı

### Renk Paleti
- **İstasyon Şarjı**: Mavi tonları (#3B82F6)
- **Mobil Şarj**: Amber tonları (#F59E0B)
- **Acil Hizmet**: Kırmızı tonları (#EF4444)

### Bileşenler
- Mevcut dashboard tasarım dilini takip eder
- LinearGradient ve shadow efektleri
- Consistent spacing (SPACING constants)
- Icon kullanımı (Ionicons, MaterialIcons)

## 🔧 Gerekli Bilgiler

### İstasyon Şarjı İçin
- Araç bilgileri (marka, model, batarya durumu)
- Konum tercihi
- Şarj hedefi
- Zaman tercihi

### Mobil Şarj İçin
- Hizmet seviyesi
- Kesin konum (GPS veya manuel)
- Araç bilgileri
- Özel talimatlar
- Aciliyet durumu

## ✅ Tamamlanan Entegrasyon

### Dashboard Entegrasyonu
- **useDashboard Hook**: `handleRequestCharging` handler eklendi
- **Modal Sistem**: `chargingRequest` modal desteği
- **MobileChargingCard**: "Şarj Talebi Oluştur" butonu entegrasyonu
- **Navigation Flow**: Dashboard → Selection → Flow screens

### Teknik Detaylar
```typescript
// useDashboard hook'unda yeni handler
const handleRequestCharging = useCallback(() => {
  openModal('chargingRequest');
}, []);

// MobileChargingCard entegrasyonu
<MobileChargingCard
  features={mobileChargingFeatures}
  onPress={handlers.handleMobileChargingPress}
  onRequestCharging={handlers.handleRequestCharging}  // Yeni entegrasyon
  isCharging={isCharging}
  chargingProgress={chargingProgress}
  isAvailable={isAvailable}
/>
```

## 🚀 Sonraki Adımlar

1. ✅ **Navigation Setup** - Route'lar navigator'a eklendi
2. **API Integration** - Backend servisleri bağla
3. **State Management** - Redux/Context setup
4. **Location Services** - GPS ve harita entegrasyonu
5. **Push Notifications** - Teknisyen durumu bildirimleri
6. **Payment Integration** - Ödeme akışı
7. **Real-time Tracking** - Teknisyen takibi

## 📊 Veri Modelleri

### Temel Types
- `ChargingRequestType` - 'station' | 'mobile'
- `Vehicle` - Araç bilgileri
- `Location` - Konum bilgileri
- `ChargingStation` - İstasyon detayları
- `MobileChargingTechnician` - Teknisyen bilgileri

### Request Data
- `ChargingRequestData` - Temel talep bilgileri
- `StationBookingData` - İstasyon rezervasyon
- `MobileChargingData` - Mobil şarj talebi

Bu mimari, kullanıcı deneyimini optimize ederken kod organizasyonunu temiz tutar ve gelecekteki geliştirmeler için esnek bir yapı sağlar.
#
# ✅ Tamamlanan Özellikler (Navigation Setup)

### Navigation Integration
- **Modal System**: React 19 uyumlu modal sistemi ile entegre edildi
- **Complete Flow**: Tüm ekranlar arası geçişler çalışıyor
- **Type Safety**: Navigation types güncellendi

### Ekranlar ve Akış
1. **ChargingRequestSelectionScreen** ✅ - Ana seçim ekranı
2. **StationChargingFlowScreen** ✅ - 3 adımlı istasyon akışı
3. **MobileChargingFlowScreen** ✅ - 4 adımlı mobil şarj akışı
4. **StationListScreen** ✅ - İstasyon listesi ve filtreleme
5. **MobileChargingConfirmationScreen** ✅ - Rezervasyon onayı

### Mock Data Integration
- **Vehicles**: 3 farklı araç modeli
- **Stations**: 4 farklı şarj istasyonu
- **Technicians**: 3 farklı teknisyen
- **Service Types**: Standard, Premium, Emergency

### Dashboard Integration
- **MobileChargingCard**: "Şarj Talebi Oluştur" butonu eklendi
- **Handler**: `handleRequestCharging` fonksiyonu eklendi
- **Modal Trigger**: Dashboard'dan charging request'e geçiş

## 🎯 Kullanım Akışı

1. **Dashboard** → Mobile Charging Card → "Şarj Talebi Oluştur"
2. **Selection Screen** → İstasyon veya Mobil seçimi
3. **Flow Screens** → Adım adım form doldurma
4. **Confirmation/List** → Son onay veya istasyon seçimi

Tüm navigation setup tamamlandı ve mock data ile test edilebilir durumda!
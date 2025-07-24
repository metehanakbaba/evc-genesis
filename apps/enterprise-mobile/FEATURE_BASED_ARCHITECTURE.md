# 🚀 EV Mobile - Feature-Based Architecture

Bu doküman, mobil uygulamanın yeni feature-based mimarisini ve component yapısını açıklar.

## 📁 **Yeni Dosya Yapısı**

```
apps/enterprise-mobile/
├── src/
│   └── features/
│       ├── common/
│       │   └── ui/                    # Ortak UI bileşenleri
│       │       ├── Card.tsx           # Temel kart bileşeni (eski: GlassCard)
│       │       ├── Button.tsx         # Genel buton bileşeni (eski: AuthButton)
│       │       ├── Input.tsx          # Genel input bileşeni (eski: GlassInput)
│       │       └── index.ts           # UI bileşenleri export
│       ├── auth/
│       │   ├── components/            # Auth özel bileşenleri
│       │   │   ├── LoginScreen.tsx    # Login ekranı (eski: PhoneLoginScreen)
│       │   │   └── index.ts
│       │   └── screens/               # Auth ekranları
│       └── dashboard/
│           ├── components/            # Dashboard bileşenleri
│           │   ├── StatCard.tsx       # İstatistik kartı (eski: FloatingStatCard)
│           │   ├── NavigationCard.tsx # Navigasyon kartı (eski: NavigationGlassCard)
│           │   └── index.ts
│           └── screens/               # Dashboard ekranları
├── shared/                            # Eski yapı (kademeli olarak kaldırılacak)
└── App.tsx                           # Ana uygulama (güncellenmiş import'larla)
```

## 🎯 **Yeniden Adlandırma Matriksi**

| Eski İsim | Yeni İsim | Konum | Açıklama |
|-----------|-----------|-------|----------|
| `GlassCard` | `Card` | `common/ui/` | Temel kart bileşeni |
| `AuthButton` | `Button` | `common/ui/` | Genel buton bileşeni |
| `GlassInput` | `Input` | `common/ui/` | Genel input bileşeni |
| `FloatingStatCard` | `StatCard` | `dashboard/components/` | Dashboard istatistik kartı |
| `NavigationGlassCard` | `NavigationCard` | `dashboard/components/` | Dashboard navigasyon kartı |
| `PhoneLoginScreen` | `LoginScreen` | `auth/components/` | Login ekranı |

## 🧩 **Bileşen Yapısı**

### **Common UI Components**
```typescript
// Kullanım: Tüm feature'larda kullanılabilir
import { Card, Button, Input } from './src/features/common/ui';

// Örnekler:
<Card variant="blue" size="lg" onPress={handlePress}>
  {/* content */}
</Card>

<Button 
  title="Submit" 
  variant="emerald" 
  loading={isLoading}
  onPress={handleSubmit} 
/>

<Input 
  label="Phone Number"
  variant="purple"
  value={phone}
  onChangeText={setPhone}
/>
```

### **Dashboard Components**
```typescript
// Dashboard özel bileşenleri
import { StatCard, NavigationCard } from './src/features/dashboard/components';

<StatCard
  title="Active Stations"
  value="156"
  variant="blue"
  trend="+8 new this week"
  icon={<StationIcon />}
/>

<NavigationCard
  title="Charging Stations"
  description="Monitor infrastructure"
  variant="blue"
  badge="156 Active"
  onPress={() => navigate('/stations')}
/>
```

### **Auth Components**
```typescript
// Auth özel bileşenleri
import { LoginScreen } from './src/features/auth/components';

<LoginScreen 
  onContinue={(phone) => handleLogin(phone)} 
/>
```

## 🎨 **Design System Consistency**

### **Color Variants**
- **Blue**: Infrastructure & Technical Systems
- **Emerald**: Live Operations & Real-time Data  
- **Purple**: User Management & Premium Features
- **Teal**: Financial Systems & Wallet Operations

### **Size Variants**
- **sm**: Küçük bileşenler
- **md**: Standart boyut (varsayılan)
- **lg**: Büyük bileşenler

## 🔄 **Import Yapısı**

### **Eski Import (Kullanmayın)**
```typescript
import { GlassCard, FloatingStatCard } from './shared/components';
import { AuthButton, GlassInput } from './shared/components/auth';
```

### **Yeni Import (Kullanın)**
```typescript
// Ana feature index'inden
import { Card, Button, Input, StatCard, NavigationCard } from './src/features';

// Veya spesifik feature'dan
import { Card, Button, Input } from './src/features/common/ui';
import { StatCard, NavigationCard } from './src/features/dashboard/components';
import { LoginScreen } from './src/features/auth/components';
```

## ✅ **Avantajlar**

### **1. Daha İyi Organizasyon**
- Feature'lara göre ayrılmış bileşenler
- Mantıklı klasör yapısı
- Kolay navigasyon

### **2. Temiz İsimlendirme**
- "Glass" prefix'i kaldırıldı
- Daha açıklayıcı isimler
- Standard naming conventions

### **3. Yeniden Kullanılabilirlik**
- Common UI components tüm feature'larda kullanılabilir
- Feature-specific components ayrı organize edildi
- Modüler yapı

### **4. Daha İyi Import Structure**
- Tek yerden tüm bileşenlere erişim
- Tree-shaking optimization
- Daha temiz import statements

## 🚀 **Kullanım Örnekleri**

### **Dashboard Screen Örneği**
```typescript
import React from 'react';
import { View, ScrollView } from 'react-native';
import { StatCard, NavigationCard } from './src/features';

export const DashboardScreen = () => {
  return (
    <ScrollView>
      <View className="p-6 space-y-4">
        <StatCard
          title="Active Stations"
          value="156"
          variant="blue"
          trend="+8 new this week"
        />
        
        <NavigationCard
          title="Charging Stations"
          description="Monitor infrastructure"
          variant="blue"
          onPress={() => navigate('/stations')}
        />
      </View>
    </ScrollView>
  );
};
```

### **Custom Form Örneği**
```typescript
import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button } from './src/features';

export const CustomForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <View className="p-6 space-y-4">
      <Input
        label="Email Address"
        variant="purple"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <Button
        title="Submit"
        variant="purple"
        loading={loading}
        onPress={handleSubmit}
      />
    </View>
  );
};
```

## 🔄 **Migration Guide**

### **App.tsx Güncellemesi**
```diff
- import { FloatingStatCard, NavigationGlassCard } from './shared/components';
+ import { StatCard, NavigationCard } from './src/features';

- <FloatingStatCard title="Active Stations" ... />
+ <StatCard title="Active Stations" ... />

- <NavigationGlassCard title="Charging Stations" ... />
+ <NavigationCard title="Charging Stations" ... />
```

## 🌟 **Sonuç**

Bu yeni feature-based architecture ile:
- ✅ Daha temiz ve organize kod yapısı
- ✅ Mantıklı component isimlendirmeleri
- ✅ Feature'lara göre ayrılmış bileşenler
- ✅ Kolay maintenance ve scalability
- ✅ Better developer experience

Artık "glass" prefixi olmadan, anlamlı isimlerle temiz bir component yapısına sahipsiniz! 🚀 
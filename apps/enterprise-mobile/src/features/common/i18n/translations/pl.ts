import type { TranslationKeys } from './en';

export const pl: TranslationKeys = {
  // App Header
  appTitle: "Centrum Kontroli EV",
  appSubtitle: "Monitorowanie i kontrola sieci w czasie rzeczywistym",
  
  // Live indicator
  liveDataStream: "Strumień Danych na Żywo",
  
  // Navigation sections
  networkOverview: "Przegląd Sieci",
  managementCenter: "Centrum Zarządzania",
  
  // Stats cards
  stats: {
    activeStations: "Aktywne Stacje",
    activeLiveSessions: "Sesje na Żywo",
    activeUsers: "Aktywni Użytkownicy", 
    walletVolume: "Obrót Portfela",
    
    // Trends and descriptions
    newThisWeek: "nowych w tym tygodniu",
    vsYesterday: "vs wczoraj",
    thisMonth: "w tym miesiącu",
    revenueGrowth: "wzrost przychodów",
    
    // Descriptions
    ccsDescription: "Złącza CCS, CHAdeMO i Type2",
    realTimeDescription: "Sesje ładowania w czasie rzeczywistym",
    registeredUsersDescription: "Zarejestrowani użytkownicy mobilni",
    dailyVolumeDescription: "Dzienny obrót transakcji"
  },
  
  // Navigation cards
  navigation: {
    chargingStations: {
      title: "Stacje Ładowania",
      description: "Monitoruj infrastrukturę i status w czasie rzeczywistym",
      badge: "Aktywne"
    },
    liveOperations: {
      title: "Operacje na Żywo",
      description: "Monitorowanie i kontrola sesji w czasie rzeczywistym",
      badge: "Sesje"
    },
    userManagement: {
      title: "Zarządzanie Użytkownikami", 
      description: "Konta klientów i analityka użytkowników",
      badge: "Użytkownicy"
    },
    plnWallet: {
      title: "Portfel PLN",
      description: "Operacje finansowe i transakcje",
      badge: "Obrót"
    }
  },
  
  // Demo controls
  demoControls: "Kontrolki Demo:",
  logout: "Wyloguj (Test Procesu Auth)",
  
  // Auth
  auth: {
    welcomeBack: "Witaj ponownie",
    loginToAccount: "Zaloguj się na swoje konto",
    email: "Email",
    password: "Hasło",
    login: "Zaloguj",
    forgotPassword: "Zapomniałeś hasła?",
    emailPlaceholder: "Wprowadź swój email", 
    passwordPlaceholder: "Wprowadź swoje hasło",
    
    // Phone Login
    welcomeToEvc: "Witaj w EVC",
    phoneSubtitle: "Rozpocznij korzystanie z naszej sieci ładowania EV używając swojego numeru telefonu",
    phonePlaceholder: "Wprowadź swój numer telefonu",
    continue: "Kontynuuj",
    continueWithGoogle: "Kontynuuj z Google",
    continueWithApple: "Kontynuuj z Apple",
    or: "lub",
    
    // Splash
    brandName: "EcoVolt",
    tagline: "Inteligentna Sieć Ładowania EV",
    
    // Validation
    phoneRequired: "Numer telefonu jest wymagany",
    phoneInvalid: "Proszę wprowadzić poprawny numer telefonu",
    
    // Terms
    termsText: "Rejestrując się, zgadzasz się na nasze",
    termsConditions: "Warunki i Zasady",
    privacyPolicy: "Polityka Prywatności",
    ageConfirmation: "i potwierdzasz, że masz ponad 18 lat."
  },
  
  // Common
  common: {
    loading: "Ładowanie...",
    error: "Błąd", 
    retry: "Ponów",
    cancel: "Anuluj",
    confirm: "Potwierdź",
    save: "Zapisz",
    delete: "Usuń",
    edit: "Edytuj",
    add: "Dodaj",
    remove: "Usuń"
  }
}; 
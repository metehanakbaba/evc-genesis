export const en = {
  // App Header
  appTitle: "EV Command Center",
  appSubtitle: "Real-time network monitoring & control",
  
  // Live indicator
  liveDataStream: "Live Data Stream",
  
  // Navigation sections
  networkOverview: "Network Overview",
  managementCenter: "Management Center",
  
  // Stats cards
  stats: {
    activeStations: "Active Stations",
    activeLiveSessions: "Live Sessions", 
    activeUsers: "Active Users",
    walletVolume: "Wallet Volume",
    
    // Trends and descriptions
    newThisWeek: "new this week",
    vsYesterday: "vs yesterday",
    thisMonth: "this month",
    revenueGrowth: "revenue growth",
    
    // Descriptions
    ccsDescription: "CCS, CHAdeMO & Type2 connectors",
    realTimeDescription: "Real-time charging sessions",
    registeredUsersDescription: "Registered mobile users",
    dailyVolumeDescription: "Daily transaction volume"
  },
  
  // Navigation cards
  navigation: {
    chargingStations: {
      title: "Charging Stations",
      description: "Monitor infrastructure and real-time status",
      badge: "Active"
    },
    liveOperations: {
      title: "Live Operations",
      description: "Real-time session monitoring and control", 
      badge: "Sessions"
    },
    userManagement: {
      title: "User Management",
      description: "Customer accounts and user analytics",
      badge: "Users"
    },
    plnWallet: {
      title: "PLN Wallet", 
      description: "Financial operations and transactions",
      badge: "Volume"
    }
  },
  
  // Demo controls
  demoControls: "Demo Controls:",
  logout: "Logout (Test Auth Flow)",
  
  // Auth
  auth: {
    welcomeBack: "Welcome back",
    loginToAccount: "Login to your account",
    email: "Email",
    password: "Password", 
    login: "Login",
    forgotPassword: "Forgot Password?",
    emailPlaceholder: "Enter your email",
    passwordPlaceholder: "Enter your password",
    
    // Phone Login
    welcomeToEvc: "Welcome to EVC",
    phoneSubtitle: "Get started with our EV charging network using your phone number",
    phonePlaceholder: "Enter your phone number",
    continue: "Continue",
    continueWithGoogle: "Continue with Google",
    continueWithApple: "Continue with Apple",
    or: "or",
    
    // Splash
    brandName: "EcoVolt",
    tagline: "Smart EV Charging Network",
    
    // Validation
    phoneRequired: "Phone number is required",
    phoneInvalid: "Please enter a valid phone number",
    
    // Terms
    termsText: "By signing up, you agree to our",
    termsConditions: "Terms & Conditions",
    privacyPolicy: "Privacy Policy",
    ageConfirmation: "and confirm that you're over 18."
  },
  
  // Common
  common: {
    loading: "Loading...",
    error: "Error",
    retry: "Retry",
    cancel: "Cancel",
    confirm: "Confirm",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    remove: "Remove"
  }
};

export type TranslationKeys = typeof en; 
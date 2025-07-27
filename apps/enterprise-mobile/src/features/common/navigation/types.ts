/**
 * 🧭 Navigation Types for EVC Client App
 * 
 * Type-safe navigation definitions following clean architecture principles
 */

import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// ============================================================================
// ROOT NAVIGATOR
// ============================================================================

export type RootStackParamList = {
  Auth: undefined;
  Main: NavigatorScreenParams<MainStackParamList>;
};

// ============================================================================
// MAIN STACK (Ana Stack Navigator - Modal'lar burada)
// ============================================================================

export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  // Modal Screens
  QRScannerModal: undefined;
  WalletModal: undefined;
  StationMapModal: undefined;
  StationDetailsModal: { stationId: string };
  TransactionDetailsModal: { transactionId: string };
  // Charging Request Screens
  ChargingRequestSelection: undefined;
  StationChargingFlow: undefined;
  MobileChargingFlow: undefined;
  StationListScreen: undefined;
  MobileChargingConfirmation: undefined;
};

// ============================================================================
// AUTH STACK
// ============================================================================

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  PhoneVerification: { phoneNumber: string };
  SetupProfile: { userId: string };
};

// ============================================================================
// MAIN TAB NAVIGATOR
// ============================================================================

export type MainTabParamList = {
  Home: undefined;
  Stations: NavigatorScreenParams<StationsStackParamList>;
  Sessions: NavigatorScreenParams<SessionsStackParamList>;
  Wallet: NavigatorScreenParams<WalletStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

// ============================================================================
// FEATURE STACKS
// ============================================================================

export type StationsStackParamList = {
  StationsList: undefined;
  StationMap: undefined;
  StationDetails: { stationId: string };
  StationReservation: { stationId: string; connectorId?: string };
};

export type SessionsStackParamList = {
  SessionsList: undefined;
  ActiveSession: undefined;
  SessionDetails: { sessionId: string };
};

export type WalletStackParamList = {
  WalletOverview: undefined;
  TransactionHistory: undefined;
  AddFunds: undefined;
  TransactionDetails: { transactionId: string };
};

export type ProfileStackParamList = {
  ProfileOverview: undefined;
  EditProfile: undefined;
  Settings: undefined;
  Notifications: undefined;
  Support: undefined;
  About: undefined;
};

// ============================================================================
// SCREEN PROPS (Type-Safe Navigation)
// ============================================================================

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = 
  StackScreenProps<RootStackParamList, Screen>;

export type MainStackScreenProps<Screen extends keyof MainStackParamList> = 
  CompositeScreenProps<
    StackScreenProps<MainStackParamList, Screen>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type MainTabScreenProps<Screen extends keyof MainTabParamList> = 
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, Screen>,
    MainStackScreenProps<keyof MainStackParamList>
  >;

// Feature stack screen props
export type StationsStackScreenProps<Screen extends keyof StationsStackParamList> = 
  CompositeScreenProps<
    StackScreenProps<StationsStackParamList, Screen>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

export type SessionsStackScreenProps<Screen extends keyof SessionsStackParamList> = 
  CompositeScreenProps<
    StackScreenProps<SessionsStackParamList, Screen>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

export type WalletStackScreenProps<Screen extends keyof WalletStackParamList> = 
  CompositeScreenProps<
    StackScreenProps<WalletStackParamList, Screen>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

export type ProfileStackScreenProps<Screen extends keyof ProfileStackParamList> = 
  CompositeScreenProps<
    StackScreenProps<ProfileStackParamList, Screen>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

// ============================================================================
// NAVIGATION UTILITIES
// ============================================================================

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 
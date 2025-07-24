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
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Welcome: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

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

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<
    StackScreenProps<AuthStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

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

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

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
  SessionsHistory: undefined;
  SessionDetails: { sessionId: string };
  ActiveSession: { sessionId: string };
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
// FEATURE SCREEN PROPS
// ============================================================================

export type StationsStackScreenProps<T extends keyof StationsStackParamList> =
  CompositeScreenProps<
    StackScreenProps<StationsStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

export type SessionsStackScreenProps<T extends keyof SessionsStackParamList> =
  CompositeScreenProps<
    StackScreenProps<SessionsStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

export type WalletStackScreenProps<T extends keyof WalletStackParamList> =
  CompositeScreenProps<
    StackScreenProps<WalletStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  CompositeScreenProps<
    StackScreenProps<ProfileStackParamList, T>,
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
/**
 * 🏠 Main Tab Navigator
 * 
 * Main app navigation with bottom tabs for client features
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { TabBarTheme, HeaderTheme } from '../theme';
import type { 
  MainTabParamList, 
  StationsStackParamList,
  SessionsStackParamList,
  WalletStackParamList,
  ProfileStackParamList 
} from '../types';

const MainTab = createBottomTabNavigator<MainTabParamList>();
const StationsStack = createStackNavigator<StationsStackParamList>();
const SessionsStack = createStackNavigator<SessionsStackParamList>();
const WalletStack = createStackNavigator<WalletStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();

// ============================================================================
// PLACEHOLDER SCREENS (TO BE IMPLEMENTED)
// ============================================================================

const PlaceholderScreen = ({ title }: { title: string }) => (
  <View className="flex-1 bg-gray-900 items-center justify-center">
    <Text className="text-white text-xl font-semibold">{title}</Text>
    <Text className="text-gray-400 text-center mt-2">Coming Soon</Text>
  </View>
);

// ============================================================================
// FEATURE STACK NAVIGATORS
// ============================================================================

function StationsStackNavigator() {
  return (
    <StationsStack.Navigator screenOptions={HeaderTheme}>
      <StationsStack.Screen 
        name="StationsList" 
        options={{ title: 'Nearby Stations' }}
      >
        {() => <PlaceholderScreen title="Charging Stations" />}
      </StationsStack.Screen>
      <StationsStack.Screen 
        name="StationMap" 
        options={{ title: 'Station Map' }}
      >
        {() => <PlaceholderScreen title="Station Map" />}
      </StationsStack.Screen>
      <StationsStack.Screen 
        name="StationDetails" 
        options={{ title: 'Station Details' }}
      >
        {() => <PlaceholderScreen title="Station Details" />}
      </StationsStack.Screen>
      <StationsStack.Screen 
        name="StationReservation" 
        options={{ title: 'Reserve Station' }}
      >
        {() => <PlaceholderScreen title="Station Reservation" />}
      </StationsStack.Screen>
    </StationsStack.Navigator>
  );
}

function SessionsStackNavigator() {
  return (
    <SessionsStack.Navigator screenOptions={HeaderTheme}>
      <SessionsStack.Screen 
        name="SessionsHistory" 
        options={{ title: 'My Sessions' }}
      >
        {() => <PlaceholderScreen title="Charging Sessions" />}
      </SessionsStack.Screen>
      <SessionsStack.Screen 
        name="SessionDetails" 
        options={{ title: 'Session Details' }}
      >
        {() => <PlaceholderScreen title="Session Details" />}
      </SessionsStack.Screen>
      <SessionsStack.Screen 
        name="ActiveSession" 
        options={{ title: 'Active Session' }}
      >
        {() => <PlaceholderScreen title="Active Session" />}
      </SessionsStack.Screen>
    </SessionsStack.Navigator>
  );
}

function WalletStackNavigator() {
  return (
    <WalletStack.Navigator screenOptions={HeaderTheme}>
      <WalletStack.Screen 
        name="WalletOverview" 
        options={{ title: 'My Wallet' }}
      >
        {() => <PlaceholderScreen title="Digital Wallet" />}
      </WalletStack.Screen>
      <WalletStack.Screen 
        name="TransactionHistory" 
        options={{ title: 'Transactions' }}
      >
        {() => <PlaceholderScreen title="Transaction History" />}
      </WalletStack.Screen>
      <WalletStack.Screen 
        name="AddFunds" 
        options={{ title: 'Add Funds' }}
      >
        {() => <PlaceholderScreen title="Add Funds" />}
      </WalletStack.Screen>
      <WalletStack.Screen 
        name="TransactionDetails" 
        options={{ title: 'Transaction Details' }}
      >
        {() => <PlaceholderScreen title="Transaction Details" />}
      </WalletStack.Screen>
    </WalletStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={HeaderTheme}>
      <ProfileStack.Screen 
        name="ProfileOverview" 
        options={{ title: 'Profile' }}
      >
        {() => <PlaceholderScreen title="My Profile" />}
      </ProfileStack.Screen>
      <ProfileStack.Screen 
        name="EditProfile" 
        options={{ title: 'Edit Profile' }}
      >
        {() => <PlaceholderScreen title="Edit Profile" />}
      </ProfileStack.Screen>
      <ProfileStack.Screen 
        name="Settings" 
        options={{ title: 'Settings' }}
      >
        {() => <PlaceholderScreen title="Settings" />}
      </ProfileStack.Screen>
      <ProfileStack.Screen 
        name="Notifications" 
        options={{ title: 'Notifications' }}
      >
        {() => <PlaceholderScreen title="Notifications" />}
      </ProfileStack.Screen>
      <ProfileStack.Screen 
        name="Support" 
        options={{ title: 'Support' }}
      >
        {() => <PlaceholderScreen title="Support" />}
      </ProfileStack.Screen>
      <ProfileStack.Screen 
        name="About" 
        options={{ title: 'About' }}
      >
        {() => <PlaceholderScreen title="About" />}
      </ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
}

// ============================================================================
// HOME SCREEN (Dashboard)
// ============================================================================

function HomeScreen() {
  return (
    <View className="flex-1 bg-gray-900 px-6 py-8">
      <Text className="text-white text-2xl font-bold mb-6">EV Charging Hub</Text>
      
      {/* Quick Stats */}
      <View className="bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-700/30">
        <Text className="text-gray-300 text-lg mb-2">Quick Stats</Text>
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-blue-400 text-xl font-bold">156</Text>
            <Text className="text-gray-400 text-sm">Nearby Stations</Text>
          </View>
          <View className="items-center">
            <Text className="text-emerald-400 text-xl font-bold">89</Text>
            <Text className="text-gray-400 text-sm">Available</Text>
          </View>
          <View className="items-center">
            <Text className="text-purple-400 text-xl font-bold">12</Text>
            <Text className="text-gray-400 text-sm">Sessions</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View className="space-y-3">
        <Text className="text-gray-300 text-lg">Quick Actions</Text>
        <View className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
          <Text className="text-blue-400 font-medium">🔍 Find Charging Station</Text>
        </View>
        <View className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
          <Text className="text-emerald-400 font-medium">⚡ Start Charging</Text>
        </View>
        <View className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
          <Text className="text-purple-400 font-medium">💳 Add Funds</Text>
        </View>
      </View>
    </View>
  );
}

// ============================================================================
// MAIN TAB NAVIGATOR
// ============================================================================

export function MainTabNavigator() {
  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        ...TabBarTheme,
        tabBarStyle: {
          ...TabBarTheme,
          height: 88,
          paddingBottom: 24,
          paddingTop: 12,
        }
      }}
    >
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Text className={`text-2xl ${focused ? 'opacity-100' : 'opacity-60'}`}>
              🏠
            </Text>
          ),
        }}
      />
      <MainTab.Screen
        name="Stations"
        component={StationsStackNavigator}
        options={{
          tabBarLabel: 'Stations',
          tabBarIcon: ({ focused }) => (
            <Text className={`text-2xl ${focused ? 'opacity-100' : 'opacity-60'}`}>
              ⚡
            </Text>
          ),
        }}
      />
      <MainTab.Screen
        name="Sessions"
        component={SessionsStackNavigator}
        options={{
          tabBarLabel: 'Sessions',
          tabBarIcon: ({ focused }) => (
            <Text className={`text-2xl ${focused ? 'opacity-100' : 'opacity-60'}`}>
              🔋
            </Text>
          ),
        }}
      />
      <MainTab.Screen
        name="Wallet"
        component={WalletStackNavigator}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ focused }) => (
            <Text className={`text-2xl ${focused ? 'opacity-100' : 'opacity-60'}`}>
              💳
            </Text>
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Text className={`text-2xl ${focused ? 'opacity-100' : 'opacity-60'}`}>
              👤
            </Text>
          ),
        }}
      />
    </MainTab.Navigator>
  );
} 
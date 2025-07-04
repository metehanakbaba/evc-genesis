import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Simple Background Orbs */}
      <View style={[styles.floatingOrb, styles.orbLarge]} />
      <View style={[styles.floatingOrb, styles.orbSmall]} />
      
      {/* Main Card */}
      <View style={styles.card}>
        <Text style={styles.emoji}>🚗⚡</Text>
        
        <Text style={styles.title}>EV Charging Admin</Text>
        <Text style={styles.subtitle}>
          Revolutionary Stack: Expo 53 + Basic Setup Test
        </Text>
        
        <View style={styles.statusContainer}>
          <View style={[styles.status, styles.available]}>
            <Text style={styles.statusText}>⚡ Available</Text>
            <View style={[styles.indicator, styles.greenIndicator]} />
          </View>
          
          <View style={[styles.status, styles.charging]}>
            <Text style={styles.statusText}>🔋 Charging</Text>
            <View style={[styles.indicator, styles.orangeIndicator]} />
          </View>
          
          <View style={[styles.status, styles.offline]}>
            <Text style={styles.statusText}>❌ Offline</Text>
            <View style={[styles.indicator, styles.redIndicator]} />
          </View>
        </View>
        
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>
            Start Admin Dashboard
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  floatingOrb: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: '#0ea5e9',
    opacity: 0.1,
  },
  orbLarge: {
    width: 120,
    height: 120,
    top: 100,
    right: -20,
  },
  orbSmall: {
    width: 80,
    height: 80,
    bottom: 150,
    left: -10,
    backgroundColor: '#10b981',
  },
  card: {
    backgroundColor: 'rgba(31, 41, 55, 0.9)',
    borderRadius: 20,
    padding: 32,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(75, 85, 99, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 20,
  },
  statusContainer: {
    width: '100%',
    marginBottom: 28,
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(55, 65, 81, 0.6)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  statusText: {
    color: '#e5e7eb',
    fontSize: 15,
    fontWeight: '500',
  },
  indicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  available: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  charging: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  offline: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  greenIndicator: {
    backgroundColor: '#10b981',
  },
  orangeIndicator: {
    backgroundColor: '#f59e0b',
  },
  redIndicator: {
    backgroundColor: '#ef4444',
  },
  button: {
    backgroundColor: '#0284c7',
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 14,
    width: '100%',
    shadowColor: '#0284c7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 16,
  },
});

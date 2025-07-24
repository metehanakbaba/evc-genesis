/**
 * 📱 QR Scanner Modal
 * 
 * Professional QR code scanner with modern UI
 */

import React from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { QRScannerModalProps } from '../types/qr-scanner.types';
import { useQRScanner } from '../hooks/useQRScanner';
import { SPACING } from '../../../shared/constants/spacing';

export function QRScannerModal({ visible, onClose, onSuccess }: QRScannerModalProps) {
  const { scanning, handleScan } = useQRScanner();

  const onScanPress = () => {
    handleScan(onSuccess);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <View className="flex-1 bg-gray-900">
        {/* Header */}
        <SafeAreaView className="bg-gray-900" edges={['top', 'left', 'right']}>
          <View className="flex-row items-center justify-between" style={{ padding: SPACING.lg }}>
            <Pressable
              onPress={onClose}
              className="w-10 h-10 rounded-full items-center justify-center bg-gray-800"
            >
              <Ionicons name="close" size={20} color="#9CA3AF" />
            </Pressable>
            <Text className="text-white text-lg font-bold">Quick Start Charging</Text>
            <View className="w-10" />
          </View>
        </SafeAreaView>

        {/* Scanner Area */}
        <View className="flex-1 justify-center items-center" style={{ padding: SPACING.lg }}>
          {/* Camera Placeholder with Gradient */}
          <View 
            className="rounded-3xl overflow-hidden"
            style={{ 
              width: '90%', 
              aspectRatio: 1,
              marginBottom: SPACING.xl,
              shadowColor: '#10B981',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 10
            }}
          >
            <LinearGradient
              colors={['#1F2937', '#111827', '#0F172A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            <LinearGradient
              colors={['#10B98130', '#04785720', '#065F4615']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            
            <View className="flex-1 items-center justify-center">
              {/* Scanning Frame */}
              <View 
                className="border-2 rounded-2xl"
                style={{ 
                  width: '70%', 
                  aspectRatio: 1,
                  borderColor: scanning ? '#34D399' : '#10B981',
                  borderStyle: 'dashed'
                }}
              >
                <View className="flex-1 items-center justify-center">
                  {scanning ? (
                    <View className="items-center">
                      <MaterialIcons name="qr-code-scanner" size={64} color="#34D399" />
                      <Text className="text-emerald-400 text-lg font-bold mt-4">Scanning...</Text>
                      <View 
                        className="w-16 h-1 bg-emerald-400 rounded-full mt-2 animate-pulse"
                        style={{
                          shadowColor: '#10B981',
                          shadowOpacity: 0.8,
                          shadowRadius: 4
                        }}
                      />
                    </View>
                  ) : (
                    <View className="items-center">
                      <Ionicons name="qr-code" size={64} color="#10B981" />
                      <Text className="text-gray-400 text-base mt-4 text-center">
                        Position QR code within frame
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Corner Frame Indicators */}
              <View className="absolute top-8 left-8">
                <View className="w-6 h-6 border-l-2 border-t-2 border-emerald-400" />
              </View>
              <View className="absolute top-8 right-8">
                <View className="w-6 h-6 border-r-2 border-t-2 border-emerald-400" />
              </View>
              <View className="absolute bottom-8 left-8">
                <View className="w-6 h-6 border-l-2 border-b-2 border-emerald-400" />
              </View>
              <View className="absolute bottom-8 right-8">
                <View className="w-6 h-6 border-r-2 border-b-2 border-emerald-400" />
              </View>
            </View>
          </View>

          {/* Instructions */}
          <View className="items-center" style={{ marginBottom: SPACING.xl }}>
            <Text className="text-white text-xl font-bold mb-2">Scan Station QR Code</Text>
            <Text className="text-gray-400 text-center leading-relaxed max-w-sm">
              Point your camera at the QR code on the charging station to begin your session instantly
            </Text>
          </View>

          {/* Manual Scan Button */}
          <Pressable
            onPress={onScanPress}
            disabled={scanning}
            className="overflow-hidden active:scale-98"
            style={{
              width: '90%',
              shadowColor: '#10B981',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 6
            }}
          >
            <LinearGradient
              colors={scanning ? ['#047857', '#065F46'] : ['#10B981', '#047857']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingVertical: SPACING.lg,
                paddingHorizontal: SPACING.xl,
                borderRadius: 20,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#10B98130'
              }}
            >
              <View className="flex-row items-center">
                {scanning ? (
                  <>
                    <MaterialIcons name="qr-code-scanner" size={24} color="#FFF" />
                    <Text className="text-white text-lg font-bold ml-3">Scanning QR Code...</Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="camera" size={24} color="#FFF" />
                    <Text className="text-white text-lg font-bold ml-3">Start Manual Scan</Text>
                  </>
                )}
              </View>
            </LinearGradient>
          </Pressable>
        </View>

        {/* Bottom Help */}
        <SafeAreaView className="bg-gray-900" edges={['bottom', 'left', 'right']}>
          <View className="items-center" style={{ padding: SPACING.lg }}>
            <View className="flex-row items-center bg-gray-800 rounded-2xl px-4 py-3">
              <Ionicons name="help-circle" size={20} color="#6B7280" />
              <Text className="text-gray-400 text-sm ml-2">Need help? Tap the station info screen</Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
} 
/**
 * 💳 Payment Methods Component
 * 
 * Manage payment methods and cards
 */

import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { PaymentMethod } from '../types/wallet.types';
import { SPACING } from '../../../shared/constants/spacing';

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
  onMethodSelect: (method: PaymentMethod) => void;
}

export function PaymentMethods({ paymentMethods, onMethodSelect }: PaymentMethodsProps) {
  const getBrandColor = (brand: string) => {
    switch (brand) {
      case 'visa': return '#1A1F71';
      case 'mastercard': return '#EB001B';
      case 'apple': return '#000000';
      case 'google': return '#4285F4';
      default: return '#374151';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'credit_card': return 'card';
      case 'bank_account': return 'business';
      case 'digital_wallet': return 'phone-portrait';
      default: return 'card';
    }
  };

  return (
    <ScrollView 
      className="flex-1" 
      showsVerticalScrollIndicator={false}
      style={{ padding: SPACING.lg }}
    >
      {/* Header */}
      <View style={{ marginBottom: SPACING.lg }}>
        <Text className="text-white text-xl font-bold mb-2">Payment Methods</Text>
        <Text className="text-gray-400 text-sm">
          Manage your payment options
        </Text>
      </View>

      {/* Payment Methods List */}
      <View style={{ gap: SPACING.md }}>
        {paymentMethods.map((method) => (
          <Pressable
            key={method.id}
            onPress={() => onMethodSelect(method)}
            className="active:scale-98"
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4
            }}
          >
            <LinearGradient
              colors={['#1F2937', '#111827']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                padding: SPACING.lg,
                borderWidth: 1,
                borderColor: method.isDefault ? '#14B8A6' : '#374151',
                borderRadius: 20
              }}
            >
              <View className="flex-row items-center justify-between">
                {/* Method Info */}
                <View className="flex-row items-center flex-1">
                  {/* Icon */}
                  <View 
                    className="w-14 h-14 rounded-2xl items-center justify-center"
                    style={{ 
                      backgroundColor: getBrandColor(method.brand) + '20',
                      marginRight: SPACING.md,
                      borderWidth: 1,
                      borderColor: getBrandColor(method.brand) + '30'
                    }}
                  >
                    <Ionicons 
                      name={getTypeIcon(method.type) as any} 
                      size={24} 
                      color={getBrandColor(method.brand)} 
                    />
                  </View>
                  
                  {/* Method Details */}
                  <View className="flex-1">
                    <View className="flex-row items-center" style={{ marginBottom: 4 }}>
                      <Text className="text-white text-base font-bold">
                        {method.title}
                      </Text>
                      {method.isDefault && (
                        <View 
                          className="ml-2 px-2 py-1 rounded-md"
                          style={{ backgroundColor: '#14B8A620' }}
                        >
                          <Text className="text-teal-400 text-xs font-bold">DEFAULT</Text>
                        </View>
                      )}
                    </View>
                    <Text className="text-gray-400 text-sm" style={{ marginBottom: 2 }}>
                      {method.subtitle}
                    </Text>
                    <Text className="text-gray-500 text-xs capitalize">
                      {method.type.replace('_', ' ')}
                    </Text>
                  </View>
                </View>
                
                {/* Action Button */}
                <View className="flex-row items-center">
                  {method.isDefault ? (
                    <View 
                      className="w-8 h-8 rounded-full items-center justify-center"
                      style={{ backgroundColor: '#14B8A620' }}
                    >
                      <Ionicons name="checkmark" size={16} color="#14B8A6" />
                    </View>
                  ) : (
                    <Pressable
                      className="w-8 h-8 rounded-full items-center justify-center active:scale-95"
                      style={{ backgroundColor: '#374151' }}
                    >
                      <Ionicons name="ellipsis-horizontal" size={16} color="#9CA3AF" />
                    </Pressable>
                  )}
                </View>
              </View>
            </LinearGradient>
          </Pressable>
        ))}
      </View>

      {/* Add New Payment Method */}
      <Pressable
        className="overflow-hidden active:scale-98"
        style={{
          marginTop: SPACING.lg,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: '#374151',
          borderStyle: 'dashed'
        }}
      >
        <View 
          className="items-center justify-center"
          style={{ 
            padding: SPACING.xl,
            backgroundColor: '#1F293720'
          }}
        >
          <View 
            className="w-16 h-16 rounded-full items-center justify-center mb-3"
            style={{ backgroundColor: '#374151' }}
          >
            <Ionicons name="add" size={28} color="#9CA3AF" />
          </View>
          <Text className="text-gray-300 text-base font-bold mb-1">Add Payment Method</Text>
          <Text className="text-gray-500 text-sm text-center">
            Credit card, bank account, or digital wallet
          </Text>
        </View>
      </Pressable>
    </ScrollView>
  );
} 
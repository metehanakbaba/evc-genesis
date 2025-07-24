/**
 * 📋 Transaction History Component
 * 
 * Display wallet transaction history with clean list design
 */

import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Transaction } from '../types/wallet.types';
import { SPACING } from '../../../shared/constants/spacing';

interface TransactionHistoryProps {
  transactions: Transaction[];
  currency: string;
  onTransactionPress: (transaction: Transaction) => void;
  formatDate: (dateString: string) => string;
}

export function TransactionHistory({ 
  transactions, 
  currency, 
  onTransactionPress, 
  formatDate 
}: TransactionHistoryProps) {
  return (
    <ScrollView 
      className="flex-1" 
      showsVerticalScrollIndicator={false}
      style={{ padding: SPACING.lg }}
    >
      {/* Header */}
      <View style={{ marginBottom: SPACING.lg }}>
        <Text className="text-white text-xl font-bold mb-2">Transaction History</Text>
        <Text className="text-gray-400 text-sm">
          {transactions.length} transactions this month
        </Text>
      </View>

      {/* Transactions List */}
      <View style={{ gap: SPACING.sm }}>
        {transactions.map((transaction) => (
          <Pressable
            key={transaction.id}
            onPress={() => onTransactionPress(transaction)}
            className="active:scale-98"
            style={{
              padding: SPACING.md,
              backgroundColor: '#1F2937',
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#374151',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2
            }}
          >
            <View className="flex-row items-center justify-between">
              {/* Transaction Info */}
              <View className="flex-row items-center flex-1">
                {/* Icon */}
                <View 
                  className="w-12 h-12 rounded-2xl items-center justify-center"
                  style={{ 
                    backgroundColor: transaction.amount > 0 ? '#10B98120' : '#EF444420',
                    marginRight: SPACING.md
                  }}
                >
                  {transaction.iconFamily === 'MaterialIcons' ? (
                    <MaterialIcons 
                      name={transaction.icon as any} 
                      size={20} 
                      color={transaction.amount > 0 ? '#10B981' : '#EF4444'} 
                    />
                  ) : (
                    <Ionicons 
                      name={transaction.icon as any} 
                      size={20} 
                      color={transaction.amount > 0 ? '#10B981' : '#EF4444'} 
                    />
                  )}
                </View>
                
                {/* Transaction Details */}
                <View className="flex-1">
                  <Text className="text-white text-base font-medium" style={{ marginBottom: 2 }}>
                    {transaction.title}
                  </Text>
                  <Text className="text-gray-400 text-sm" style={{ marginBottom: 4 }}>
                    {transaction.subtitle}
                  </Text>
                  <Text className="text-gray-500 text-xs">
                    {formatDate(transaction.date)}
                  </Text>
                </View>
              </View>
              
              {/* Amount & Status */}
              <View className="items-end">
                <Text 
                  className="text-base font-bold" 
                  style={{ 
                    color: transaction.amount > 0 ? '#10B981' : '#EF4444',
                    marginBottom: 2
                  }}
                >
                  {transaction.amount > 0 ? '+' : ''}{currency}{Math.abs(transaction.amount).toFixed(2)}
                </Text>
                <View 
                  className="px-2 py-1 rounded-lg"
                  style={{ 
                    backgroundColor: transaction.status === 'completed' ? '#10B98120' : '#F59E0B20'
                  }}
                >
                  <Text 
                    className="text-xs font-medium capitalize"
                    style={{ 
                      color: transaction.status === 'completed' ? '#10B981' : '#F59E0B'
                    }}
                  >
                    {transaction.status}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </View>

      {/* Load More Button */}
      <Pressable
        className="items-center active:scale-98"
        style={{
          marginTop: SPACING.lg,
          padding: SPACING.md,
          backgroundColor: '#1F2937',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#374151'
        }}
      >
        <Text className="text-gray-400 text-sm font-medium">Load More Transactions</Text>
      </Pressable>
    </ScrollView>
  );
} 
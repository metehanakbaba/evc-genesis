/**
 * 💳 PLN Wallet Schema Definitions
 * 
 * OpenAPI schema definitions for PLN wallet management endpoints
 * including payment processing, balance checking, and transaction history.
 * 
 * @module WalletSchemas
 * @version 2.0.0
 * @author EV Charging Team
 */

import { transactionEnums, validationPatterns } from './common';

/**
 * 💰 PLN Amount Schema
 * 
 * Standardized amount representation for PLN currency.
 */
export const plnAmountSchema = {
  PLNAmount: {
    type: 'object',
    properties: {
      amount: { 
        type: 'number',
        minimum: 0,
        description: '💰 Amount in PLN',
        example: 125.50
      },
      currency: { 
        type: 'string',
        enum: ['PLN'],
        description: '💱 Currency code',
        example: 'PLN'
      },
      formatted: { 
        type: 'string',
        description: '🎨 Formatted amount display',
        example: '125.50 zł'
      }
    },
    required: ['amount', 'currency', 'formatted']
  }
};

/**
 * 📊 PLN Transaction Schema
 * 
 * Complete transaction object returned by API endpoints.
 */
export const transactionSchema = {
  PLNTransaction: {
    type: 'object',
    properties: {
      id: { 
        type: 'string',
        description: '🆔 Unique transaction identifier',
        example: 'txn-uuid-123'
      },
      type: { 
        type: 'string',
        enum: [...transactionEnums.types],
        description: '🏷️ Transaction type',
        example: 'ADD_PLN_FUNDS'
      },
      status: { 
        type: 'string',
        enum: [...transactionEnums.statuses],
        description: '📊 Transaction status',
        example: 'COMPLETED'
      },
      amount: {
        $ref: '#/components/schemas/PLNAmount'
      },
      description: { 
        type: 'string',
        description: '📝 Transaction description',
        example: 'PLN wallet top-up via Stripe'
      },
      stripePaymentIntentId: { 
        type: 'string',
        description: '💳 Stripe payment intent ID',
        example: 'pi_1234567890'
      },
      metadata: { 
        type: 'object',
        description: '📋 Additional transaction metadata'
      },
      createdAt: { 
        type: 'string', 
        format: 'date-time',
        description: '📅 Transaction creation timestamp'
      },
      updatedAt: { 
        type: 'string', 
        format: 'date-time',
        description: '🔄 Last update timestamp'
      }
    },
    required: ['id', 'type', 'status', 'amount', 'description']
  }
};

/**
 * 📝 PLN Wallet Request Schemas
 * 
 * Input validation schemas for wallet endpoints.
 */
export const walletRequestSchemas = {
  // 💳 Payment Intent Creation Request
  CreatePaymentIntent: {
    type: 'object',
    properties: {
      amount: { 
        type: 'number',
        minimum: 5.00,
        maximum: 10000.00,
        multipleOf: 0.01,
        description: '💰 Amount in PLN (minimum 5.00 zł, maximum 10,000.00 zł)'
      },
      returnUrl: { 
        ...validationPatterns.url,
        description: '🔗 URL to redirect after successful payment'
      },
      cancelUrl: { 
        ...validationPatterns.url,
        description: '❌ URL to redirect if payment is cancelled'
      },
      metadata: { 
        type: 'object',
        additionalProperties: { type: 'string' },
        description: '📋 Additional metadata for the transaction'
      }
    },
    required: ['amount'],
    additionalProperties: false
  },

  // ⚡ Charging Payment Request
  ProcessChargingPayment: {
    type: 'object',
    properties: {
      chargingSessionId: { 
        type: 'string', 
        minLength: 1,
        description: '🔌 Unique charging session identifier'
      },
      chargeStationId: { 
        type: 'string', 
        minLength: 1,
        description: '🏭 Charge station identifier'
      },
      amount: { 
        type: 'number',
        minimum: 0.01,
        description: '💰 Charging cost in PLN'
      },
      description: { 
        type: 'string',
        description: '📝 Payment description'
      },
      powerConsumed: { 
        type: 'number', 
        minimum: 0, 
        maximum: 1000,
        description: '⚡ Power consumed in kWh'
      },
      chargingDuration: { 
        type: 'number', 
        minimum: 0, 
        maximum: 1440,
        description: '⏱️ Charging duration in minutes'
      },
      metadata: { 
        type: 'object',
        additionalProperties: true,
        description: '📋 Additional charging session metadata'
      }
    },
    required: ['chargingSessionId', 'chargeStationId', 'amount'],
    additionalProperties: false
  },

  // 📋 Transaction Query Parameters
  TransactionQuery: {
    type: 'object',
    properties: {
      limit: { 
        type: 'integer', 
        minimum: 1, 
        maximum: 100, 
        default: 20,
        description: '📊 Number of transactions to return'
      },
      offset: { 
        type: 'integer', 
        minimum: 0, 
        default: 0,
        description: '⏭️ Number of transactions to skip'
      },
      type: { 
        type: 'string', 
        enum: [...transactionEnums.types],
        description: '🏷️ Filter by transaction type'
      },
      status: { 
        type: 'string', 
        enum: [...transactionEnums.statuses],
        description: '📊 Filter by transaction status'
      }
    },
    additionalProperties: false
  },

  // 📊 Balance Query Parameters
  BalanceQuery: {
    type: 'object',
    properties: {
      includeTransactions: { 
        type: 'boolean', 
        default: true,
        description: '📋 Include recent transactions in response'
      },
      transactionLimit: { 
        type: 'integer', 
        minimum: 1, 
        maximum: 20, 
        default: 5,
        description: '🔢 Number of recent transactions to include (max 20)'
      }
    },
    additionalProperties: false
  }
};

/**
 * 💳 PLN Wallet Response Schemas
 * 
 * Response structures for wallet operations.
 */
export const walletResponseSchemas = {
  // 🎫 Payment Intent Success Response
  PaymentIntentSuccess: {
    type: 'object',
    properties: {
      success: { type: 'boolean', enum: [true] },
      data: {
        type: 'object',
        properties: {
          transactionId: { 
            type: 'string',
            description: '🆔 Internal transaction identifier',
            example: 'txn-abc123def456'
          },
          stripePaymentIntentId: { 
            type: 'string',
            description: '💳 Stripe payment intent ID',
            example: 'pi_1234567890abcdef'
          },
          clientSecret: { 
            type: 'string',
            description: '🔐 Client secret for Stripe payment',
            example: 'pi_1234567890abcdef_secret_xyz'
          },
          amount: { 
            type: 'number',
            description: '💰 Payment amount in PLN',
            example: 125.50
          },
          currency: { 
            type: 'string',
            enum: ['PLN'],
            description: '💱 Payment currency',
            example: 'PLN'
          },
          status: { 
            type: 'string',
            description: '📊 Payment intent status',
            example: 'requires_payment_method'
          },
          returnUrl: { 
            type: 'string',
            description: '🔗 Success redirect URL',
            example: 'https://app.ev-charging.com/wallet/success'
          },
          cancelUrl: { 
            type: 'string',
            description: '❌ Cancel redirect URL',
            example: 'https://app.ev-charging.com/wallet/cancel'
          }
        }
      },
      message: { 
        type: 'string',
        example: 'PLN payment intent created successfully'
      },
      meta: {
        $ref: '#/components/schemas/ResponseMeta'
      }
    }
  },

  // 💰 Balance Check Success Response
  BalanceSuccess: {
    type: 'object',
    properties: {
      success: { type: 'boolean', enum: [true] },
      data: {
        type: 'object',
        properties: {
          balance: {
            $ref: '#/components/schemas/PLNAmount'
          },
          totalAdded: {
            $ref: '#/components/schemas/PLNAmount'
          },
          totalSpent: {
            $ref: '#/components/schemas/PLNAmount'
          },
          recentTransactions: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/PLNTransaction'
            },
            description: '📋 Recent transaction history'
          }
        }
      },
      message: { 
        type: 'string',
        example: 'PLN balance retrieved successfully'
      },
      meta: {
        $ref: '#/components/schemas/ResponseMeta'
      }
    }
  },

  // 📊 Transaction History Success Response
  TransactionHistorySuccess: {
    type: 'object',
    properties: {
      success: { type: 'boolean', enum: [true] },
      data: {
        type: 'object',
        properties: {
          transactions: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/PLNTransaction'
            },
            description: '📋 Transaction list'
          },
          pagination: {
            $ref: '#/components/schemas/Pagination'
          }
        }
      },
      message: { 
        type: 'string',
        example: 'Transaction history retrieved successfully'
      },
      meta: {
        $ref: '#/components/schemas/ResponseMeta'
      }
    }
  },

  // ⚡ Charging Payment Success Response
  ChargingPaymentSuccess: {
    type: 'object',
    properties: {
      success: { type: 'boolean', enum: [true] },
      data: {
        type: 'object',
        properties: {
          transaction: {
            $ref: '#/components/schemas/PLNTransaction'
          },
          newBalance: {
            $ref: '#/components/schemas/PLNAmount'
          },
          chargingSession: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              chargeStationId: { type: 'string' },
              powerConsumed: { type: 'number' },
              duration: { type: 'number' },
              cost: { type: 'number' }
            }
          }
        }
      },
      message: { 
        type: 'string',
        example: 'Charging payment processed successfully'
      },
      meta: {
        $ref: '#/components/schemas/ResponseMeta'
      }
    }
  }
}; 
/**
 * 🛣️ Route Schema Definitions
 * 
 * Centralized OpenAPI schema definitions for all API endpoints.
 * This file combines schemas for authentication, client, admin, and charge station routes.
 * Based on domain entity interfaces for single source of truth.
 * 
 * @module RouteSchemas
 * @version 2.0.0
 * @author EV Charging Team
 */

import { authRequestSchemas } from './user';
import { chargeStationRequestSchemas } from './chargeStation';
import { walletRequestSchemas } from './wallet';

/**
 * 🧠 Domain-Based Schema Definitions
 * 
 * Generated from domain entity interfaces:
 * - User: UserProps (excluding password)
 * - ChargeStation: ChargeStationProps  
 * - Transaction: TransactionProps
 */
const domainSchemas = {
  // 👤 User Schema (from UserProps, API response excludes password)
  User: {
    type: 'object',
    properties: {
      id: { type: 'string', description: '🆔 Unique user identifier' },
      email: { type: 'string', format: 'email', description: '📧 User email address' },
      firstName: { type: 'string', description: '👤 User first name' },
      lastName: { type: 'string', description: '👤 User last name' },
      phoneNumber: { type: 'string', description: '📱 User phone number' },
      role: { 
        type: 'string', 
        enum: ['CUSTOMER', 'ADMIN', 'FIELD_WORKER'],
        description: '🎭 User role' 
      },
      isActive: { type: 'boolean', description: '✅ Account active status' },
      createdAt: { type: 'string', format: 'date-time', description: '📅 Creation timestamp' },
      updatedAt: { type: 'string', format: 'date-time', description: '🔄 Update timestamp' }
    },
    required: ['id', 'email', 'firstName', 'lastName', 'role', 'isActive']
  },

  // 🔋 ChargeStation Schema (from ChargeStationProps)
  ChargeStation: {
    type: 'object',
    properties: {
      id: { type: 'string', description: '🆔 Station identifier' },
      name: { type: 'string', description: '🏷️ Station name' },
      location: { type: 'string', description: '📍 Station location' },
      status: {
        type: 'string',
        enum: ['available', 'charging', 'offline', 'maintenance'],
        description: '🔋 Current status'
      },
      powerOutput: { type: 'number', description: '⚡ Power output in kW' },
      connectorType: { 
        type: 'string',
        enum: ['Type1', 'Type2', 'CCS', 'CHAdeMO'],
        description: '🔌 Connector type'
      },
      pricePerKwh: { type: 'number', description: '💰 Price per kWh in PLN' },
      isActive: { type: 'boolean', description: '✅ Station active status' },
      lastHeartbeat: { type: 'string', format: 'date-time', description: '💓 Last heartbeat' },
      createdAt: { type: 'string', format: 'date-time', description: '📅 Creation timestamp' },
      updatedAt: { type: 'string', format: 'date-time', description: '🔄 Update timestamp' }
    },
    required: ['id', 'name', 'location', 'status', 'powerOutput', 'connectorType', 'pricePerKwh']
  },

  // 💰 PLNTransaction Schema (from TransactionProps) - Full Schema
  PLNTransaction: {
    type: 'object',
    properties: {
      id: { type: 'string', description: '🆔 Transaction identifier' },
      userId: { type: 'string', description: '👤 User identifier' },
      walletId: { type: 'string', description: '💳 Wallet identifier' },
      type: {
        type: 'string',
        enum: ['STRIPE_PLN_PAYMENT', 'ADD_PLN_FUNDS', 'PLN_CHARGING_PAYMENT', 'PLN_REFUND'],
        description: '🏷️ Transaction type'
      },
      status: {
        type: 'string',
        enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED'],
        description: '📊 Transaction status'
      },
      amount: {
        type: 'object',
        properties: {
          value: { type: 'number', minimum: 0, description: '💰 Amount in PLN' },
          currency: { type: 'string', enum: ['PLN'], description: '💱 Currency code' }
        },
        required: ['value', 'currency']
      },
      description: { type: 'string', description: '📝 Transaction description' },
      stripePaymentIntentId: { type: 'string', description: '💳 Stripe payment intent ID' },
      chargingSessionId: { type: 'string', description: '🔋 Charging session ID' },
      chargeStationId: { type: 'string', description: '⚡ Charge station ID' },
      metadata: { type: 'object', description: '📋 Additional metadata' },
      errorMessage: { type: 'string', description: '❌ Error message if failed' },
      processedAt: { type: 'string', format: 'date-time', description: '✅ Processing timestamp' },
      createdAt: { type: 'string', format: 'date-time', description: '📅 Creation timestamp' },
      updatedAt: { type: 'string', format: 'date-time', description: '🔄 Update timestamp' }
    },
    required: ['id', 'userId', 'walletId', 'type', 'status', 'amount', 'description']
  },

  // 💳 Client Transaction Schema (No userId/walletId for security)
  ClientPLNTransaction: {
    type: 'object',
    properties: {
      id: { type: 'string', description: '🆔 Transaction identifier' },
      type: {
        type: 'string',
        enum: ['STRIPE_PLN_PAYMENT', 'ADD_PLN_FUNDS', 'PLN_CHARGING_PAYMENT', 'PLN_REFUND'],
        description: '🏷️ Transaction type'
      },
      status: {
        type: 'string',
        enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED'],
        description: '📊 Transaction status'
      },
      amount: {
        type: 'object',
        properties: {
          value: { type: 'number', minimum: 0, description: '💰 Amount in PLN' },
          currency: { type: 'string', enum: ['PLN'], description: '💱 Currency code' }
        },
        required: ['value', 'currency']
      },
      description: { type: 'string', description: '📝 Transaction description' },
      stripePaymentIntentId: { type: 'string', description: '💳 Stripe payment intent ID' },
      chargingSessionId: { type: 'string', description: '🔋 Charging session ID' },
      chargeStationId: { type: 'string', description: '⚡ Charge station ID' },
      metadata: { type: 'object', description: '📋 Additional metadata' },
      errorMessage: { type: 'string', description: '❌ Error message if failed' },
      processedAt: { type: 'string', format: 'date-time', description: '✅ Processing timestamp' },
      createdAt: { type: 'string', format: 'date-time', description: '📅 Creation timestamp' },
      updatedAt: { type: 'string', format: 'date-time', description: '🔄 Update timestamp' }
    },
    required: ['id', 'type', 'status', 'amount', 'description']
  }
};

/**
 * 🔐 Authentication Route Schemas
 */
export const authRouteSchemas = {
  register: {
    tags: ['🔐 Authentication'],
    summary: '📝 User Registration',
    description: '🚀 Create a new user account with email verification and role assignment.',
    body: authRequestSchemas.UserRegistration,
    response: {
      201: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [true] },
          data: {
            type: 'object',
            properties: {
              user: domainSchemas.User
            }
          },
          message: { type: 'string' },
          meta: {
            type: 'object',
            properties: {
              timestamp: { type: 'string', format: 'date-time' },
              requestId: { type: 'string' },
              version: { type: 'string' }
            }
          }
        }
      },
      400: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [false] },
          error: {
            type: 'object',
            properties: {
              code: { type: 'string' },
              message: { type: 'string' }
            }
          }
        }
      },
      409: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [false] },
          error: {
            type: 'object',
            properties: {
              code: { type: 'string' },
              message: { type: 'string' }
            }
          }
        }
      }
    }
  },

  login: {
    tags: ['🔐 Authentication'],
    summary: '🔑 User Login',
    description: '🚀 Authenticate user credentials and receive JWT access token.',
    body: authRequestSchemas.UserLogin,
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [true] },
          data: {
            type: 'object',
            properties: {
              token: { type: 'string', description: '🎫 JWT access token' },
              user: domainSchemas.User,
              expiresIn: { type: 'string', description: '⏰ Token expiration time' }
            }
          },
          message: { type: 'string' },
          meta: {
            type: 'object',
            properties: {
              timestamp: { type: 'string', format: 'date-time' },
              requestId: { type: 'string' },
              version: { type: 'string' }
            }
          }
        }
      },
      400: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [false] },
          error: {
            type: 'object',
            properties: {
              code: { type: 'string' },
              message: { type: 'string' }
            }
          },
          meta: {
            type: 'object',
            properties: {
              timestamp: { type: 'string', format: 'date-time' },
              requestId: { type: 'string' },
              version: { type: 'string' }
            }
          }
        }
      },
      401: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [false] },
          error: {
            type: 'object',
            properties: {
              code: { type: 'string' },
              message: { type: 'string' }
            }
          },
          meta: {
            type: 'object',
            properties: {
              timestamp: { type: 'string', format: 'date-time' },
              requestId: { type: 'string' },
              version: { type: 'string' }
            }
          }
        }
      }
    }
  },

  logout: {
    tags: ['🔐 Authentication'],
    summary: '👋 User Logout',
    description: '🚪 Logout user from the system (stateless JWT implementation).',
    security: [{ bearerAuth: [] }],
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [true] },
          data: { type: 'object', properties: {} },
          message: { type: 'string' },
          meta: {
            type: 'object',
            properties: {
              timestamp: { type: 'string', format: 'date-time' },
              requestId: { type: 'string' },
              version: { type: 'string' }
            }
          }
        }
      }
    }
  }
};

/**
 * 🔋 Charge Station Route Schemas
 */
export const chargeStationRouteSchemas = {
  register: {
    tags: ['🔋 Admin - Charge Station Management'],
    summary: '⚡ Register New Charge Station',
    description: '🚀 Register a new EV charging station in the system.',
    body: chargeStationRequestSchemas.StationRegistration,
    response: {
      201: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [true] },
          data: domainSchemas.ChargeStation,
          message: { type: 'string' }
        }
      }
    }
  },

  updateStatus: {
    tags: ['🔋 Admin - Charge Station Management'],
    summary: '🔄 Update Station Status',
    description: '📊 Update charging station status and heartbeat timestamp.',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: '🆔 ChargeStation unique identifier' }
      }
    },
    body: chargeStationRequestSchemas.StatusUpdate,
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [true] },
          data: domainSchemas.ChargeStation,
          message: { type: 'string' }
        }
      }
    }
  },

  getAvailable: {
    tags: ['⚡ Client - Charging'],
    summary: '🔍 Get Available Stations',
    description: '📋 Retrieve list of available charging stations with advanced filtering.',
    querystring: chargeStationRequestSchemas.SearchQuery,
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [true] },
          data: {
            type: 'array',
            items: domainSchemas.ChargeStation
          },
          message: { type: 'string' }
        }
      }
    }
  },

  getDetails: {
    tags: ['⚡ Client - Charging'],
    summary: '🔍 Get Station Details',
    description: '📊 Retrieve detailed information about a specific charging station.',
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: '🆔 ChargeStation unique identifier' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [true] },
          data: domainSchemas.ChargeStation,
          message: { type: 'string' }
        }
      }
    }
  }
};

/**
 * 👤 Client Route Schemas
 */
export const clientRouteSchemas = {
  // Profile Management
  getProfile: {
    tags: ['👤 Client - Profile'],
    summary: '👤 Get User Profile',
    description: '📊 Retrieve current user profile information.',
    security: [{ bearerAuth: [] }],
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [true] },
          data: domainSchemas.User,
          message: { type: 'string' }
        }
      }
    }
  },

  updateProfile: {
    tags: ['👤 Client - Profile'],
    summary: '✏️ Update User Profile',
    description: '🔄 Update user profile information.',
    security: [{ bearerAuth: [] }],
    body: authRequestSchemas.ProfileUpdate,
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [true] },
          data: domainSchemas.User,
          message: { type: 'string' }
        }
      }
    }
  },

  // Charge Station Operations
  searchStations: {
    tags: ['⚡ Client - Charging'],
    summary: '🔍 Search Charge Stations',
    description: '📋 Search for available charge stations with advanced filtering.',
    security: [{ bearerAuth: [] }],
    querystring: chargeStationRequestSchemas.SearchQuery,
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [true] },
          data: {
            type: 'array',
            items: domainSchemas.ChargeStation
          },
          message: { type: 'string' }
        }
      }
    }
  },

  getStationDetails: {
    tags: ['⚡ Client - Charging'],
    summary: '📊 Get Station Details',
    description: '🔍 Get detailed information about a specific charging station.',
    security: [{ bearerAuth: [] }],
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: '🆔 Station identifier' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [true] },
          data: domainSchemas.ChargeStation,
          message: { type: 'string' }
        }
      }
    }
  },

  // PLN Wallet Operations
  createPaymentIntent: {
    tags: ['💳 Client - PLN Wallet'],
    summary: '💰 Create PLN Payment Intent',
    description: '🚀 Create Stripe payment intent for adding PLN funds to wallet.',
    security: [{ bearerAuth: [] }],
    body: walletRequestSchemas.CreatePaymentIntent,
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [true] },
          data: {
            type: 'object',
            properties: {
              transactionId: { type: 'string', description: '🆔 Transaction identifier' },
              stripePaymentIntentId: { type: 'string', description: '💳 Stripe payment intent ID' },
              clientSecret: { type: 'string', description: '🔑 Client secret for payment confirmation' },
              amount: { type: 'number', description: '💰 Payment amount in PLN' },
              currency: { type: 'string', enum: ['pln'], description: '💱 Payment currency' },
              status: { type: 'string', description: '📊 Payment intent status' },
              returnUrl: { type: 'string', description: '🔗 Success return URL' },
              cancelUrl: { type: 'string', description: '🔗 Cancel return URL' }
            },
            required: ['transactionId', 'stripePaymentIntentId', 'clientSecret', 'amount', 'currency', 'status']
          },
          message: { type: 'string' },
          meta: {
            type: 'object',
            properties: {
              timestamp: { type: 'string', format: 'date-time' },
              requestId: { type: 'string' },
              version: { type: 'string' }
            }
          }
        }
      }
    }
  },

  getBalance: {
    tags: ['💳 Client - PLN Wallet'],
    summary: '💰 Get PLN Wallet Balance',
    description: '📊 Retrieve current PLN wallet balance and transaction history.',
    security: [{ bearerAuth: [] }],
    querystring: walletRequestSchemas.BalanceQuery,
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [true] },
          data: {
            type: 'object',
            properties: {
              userId: { type: 'string', description: '👤 User identifier' },
              balance: {
                type: 'object',
                properties: {
                  amount: { type: 'number', description: '💰 Balance amount' },
                  currency: { type: 'string', enum: ['PLN'], description: '💱 Currency' },
                  formatted: { type: 'string', description: '💸 Formatted balance' }
                },
                required: ['amount', 'currency', 'formatted']
              },
              status: { 
                type: 'string', 
                enum: ['ACTIVE', 'INACTIVE'],
                description: '📊 Wallet status' 
              },
              totalSpent: {
                type: 'object',
                properties: {
                  amount: { type: 'number' },
                  currency: { type: 'string', enum: ['PLN'] },
                  formatted: { type: 'string' }
                },
                required: ['amount', 'currency', 'formatted']
              },
              totalAdded: {
                type: 'object',
                properties: {
                  amount: { type: 'number' },
                  currency: { type: 'string', enum: ['PLN'] },
                  formatted: { type: 'string' }
                },
                required: ['amount', 'currency', 'formatted']
              },
              recentTransactions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    type: { type: 'string' },
                    amount: {
                      type: 'object',
                      properties: {
                        value: { type: 'number' },
                        currency: { type: 'string' },
                        formatted: { type: 'string' }
                      }
                    },
                    description: { type: 'string' },
                    status: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' },
                    stripePaymentIntentId: { type: 'string' }
                  }
                }
              }
            },
            required: ['userId', 'balance', 'status', 'totalSpent', 'totalAdded']
          },
          message: { type: 'string' },
          meta: {
            type: 'object',
            properties: {
              timestamp: { type: 'string', format: 'date-time' },
              requestId: { type: 'string' },
              version: { type: 'string' }
            }
          }
        }
      }
    }
  },

  getTransactions: {
    tags: ['💳 Client - PLN Wallet'],
    summary: '📋 Get PLN Transaction History',
    description: '🔍 Retrieve filtered PLN transaction history with pagination.',
    security: [{ bearerAuth: [] }],
    querystring: walletRequestSchemas.TransactionQuery,
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [true] },
          data: {
            type: 'object',
            properties: {
              transactions: {
                type: 'array',
                items: domainSchemas.ClientPLNTransaction
              },
              pagination: {
                type: 'object',
                properties: {
                  total: { type: 'integer' },
                  page: { type: 'integer' },
                  limit: { type: 'integer' }
                }
              }
            }
          },
          message: { type: 'string' }
        }
      }
    }
  },

  processChargingPayment: {
    tags: ['💳 Client - PLN Wallet'],
    summary: '⚡ Process EV Charging Payment',
    description: '🔋 Process PLN payment for EV charging session.',
    security: [{ bearerAuth: [] }],
    body: walletRequestSchemas.ProcessChargingPayment,
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean', enum: [true] },
          data: {
            type: 'object',
            properties: {
              transaction: domainSchemas.PLNTransaction,
              newBalance: { type: 'number' }
            }
          },
          message: { type: 'string' }
        }
      }
    }
  }
}; 
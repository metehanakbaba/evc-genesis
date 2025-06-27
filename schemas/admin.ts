/**
 * 🔧 Admin API Schemas
 * 
 * OpenAPI schemas for administrative operations including user management,
 * charge station management, PLN wallet oversight, and system monitoring.
 * 
 * @module AdminSchemas
 * @version 2.0.0
 * @author EV Charging Team
 */

// 🏷️ Admin User Management Schemas
export const adminUserSchemas = {
  // ➕ Create User Schema
  createUser: {
    type: 'object',
    required: ['email', 'password', 'firstName', 'lastName', 'role'],
    properties: {
      email: { 
        type: 'string', 
        format: 'email',
        description: '📧 User email address (must be unique)'
      },
      password: { 
        type: 'string', 
        minLength: 8,
        description: '🔒 Secure password (minimum 8 characters)'
      },
      firstName: { 
        type: 'string', 
        minLength: 1,
        description: '👤 User first name'
      },
      lastName: { 
        type: 'string', 
        minLength: 1,
        description: '👤 User last name'
      },
      phoneNumber: { 
        type: 'string',
        pattern: '^\\+?[1-9]\\d{6,14}$',
        description: '📱 Phone number (7+ digits, international format)'
      },
      role: { 
        type: 'string', 
        enum: ['CUSTOMER', 'ADMIN', 'FIELD_WORKER'],
        description: '🎭 User role assignment'
      },
      isActive: { 
        type: 'boolean',
        default: true,
        description: '✅ Account active status'
      }
    }
  },

  // ✏️ Update User Schema
  updateUser: {
    type: 'object',
    properties: {
      firstName: { 
        type: 'string', 
        minLength: 1,
        description: '👤 Updated first name'
      },
      lastName: { 
        type: 'string', 
        minLength: 1,
        description: '👤 Updated last name'
      },
      phoneNumber: { 
        type: 'string',
        pattern: '^\\+?[1-9]\\d{6,14}$',
        description: '📱 Updated phone number'
      },
      role: { 
        type: 'string', 
        enum: ['CUSTOMER', 'ADMIN', 'FIELD_WORKER'],
        description: '🎭 Updated user role'
      },
      isActive: { 
        type: 'boolean',
        description: '✅ Updated account status'
      }
    }
  }
};

// 🔋 Admin Charge Station Management Schemas
export const adminStationSchemas = {
  // ⚡ Register Station Schema
  registerStation: {
    type: 'object',
    required: ['name', 'location', 'powerOutput', 'connectorType', 'pricePerKWh'],
    properties: {
      name: { 
        type: 'string', 
        minLength: 1, 
        maxLength: 100,
        description: '🏷️ Station display name'
      },
      location: {
        type: 'object',
        required: ['latitude', 'longitude', 'address', 'city', 'country'],
        properties: {
          latitude: { 
            type: 'number', 
            minimum: -90, 
            maximum: 90,
            description: '🌍 GPS latitude'
          },
          longitude: { 
            type: 'number', 
            minimum: -180, 
            maximum: 180,
            description: '🌍 GPS longitude'
          },
          address: { 
            type: 'string',
            description: '📍 Street address'
          },
          city: { 
            type: 'string',
            description: '🏙️ City name'
          },
          country: { 
            type: 'string',
            description: '🇹🇷 Country'
          }
        }
      },
      powerOutput: { 
        type: 'number', 
        minimum: 1, 
        maximum: 1000,
        description: '⚡ Power output in kW'
      },
      connectorType: { 
        type: 'string', 
        enum: ['CCS', 'CHAdeMO', 'Type2', 'CCS_CHAdeMO'],
        description: '🔌 Connector type'
      },
      pricePerKWh: { 
        type: 'number', 
        minimum: 0,
        description: '💰 Price per kWh in PLN'
      }
    }
  },

  // 🔄 Update Station Status Schema
  updateStationStatus: {
    type: 'object',
    required: ['status'],
    properties: {
      status: {
        type: 'string',
        enum: ['AVAILABLE', 'CHARGING', 'MAINTENANCE', 'OFFLINE'],
        description: '🔋 New station status'
      }
    }
  }
};

// 💳 Admin PLN Wallet Management Schemas
export const adminWalletSchemas = {
  // 💰 Adjust Balance Schema
  adjustBalance: {
    type: 'object',
    required: ['amount', 'reason'],
    properties: {
      amount: {
        type: 'number',
        description: '💰 Amount to adjust (positive = add, negative = subtract) in PLN'
      },
      reason: {
        type: 'string',
        minLength: 5,
        maxLength: 500,
        description: '📝 Administrative reason for balance adjustment'
      },
      reference: {
        type: 'string',
        maxLength: 100,
        description: '🔗 Optional reference (support ticket, order ID, etc.)'
      }
    }
  },

  // 🔄 Process Refund Schema
  processRefund: {
    type: 'object',
    required: ['reason'],
    properties: {
      amount: {
        type: 'number',
        minimum: 0.01,
        description: '💰 Refund amount in PLN (if not specified, full refund)'
      },
      reason: {
        type: 'string',
        minLength: 5,
        maxLength: 500,
        description: '📝 Reason for refund'
      },
      notifyUser: {
        type: 'boolean',
        default: true,
        description: '📧 Send refund notification to user'
      }
    }
  }
};

// 🗂️ Combined Admin Route Schemas
export const adminRouteSchemas = {
  // 👥 User Management Routes
  users: {
    getAll: {
      tags: ['👥 Admin - User Management'],
      summary: '📋 Get All Users',
      description: '🔍 Retrieve paginated list of all users with role and status filtering.',
      querystring: {
        type: 'object',
        properties: {
          role: { 
            type: 'string', 
            enum: ['CUSTOMER', 'ADMIN', 'FIELD_WORKER'],
            description: '🎭 Filter by user role'
          },
          isActive: { 
            type: 'boolean',
            description: '✅ Filter by active status'
          },
          limit: { 
            type: 'number', 
            minimum: 1, 
            maximum: 100, 
            default: 20,
            description: '📄 Items per page'
          },
          offset: { 
            type: 'number', 
            minimum: 0, 
            default: 0,
            description: '📄 Pagination offset'
          }
        }
      }
    },

    getById: {
      tags: ['👥 Admin - User Management'],
      summary: '👤 Get User by ID',
      description: '🔍 Retrieve complete user information including role and activity status.',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', description: '🆔 User unique identifier' }
        }
      }
    },

    create: {
      tags: ['👥 Admin - User Management'],
      summary: '➕ Create New User',
      description: '🚀 Create new user account with admin-specified role and settings.',
      body: adminUserSchemas.createUser
    },

    update: {
      tags: ['👥 Admin - User Management'],
      summary: '✏️ Update User',
      description: '🔄 Update user information, role, and account settings.',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', description: '🆔 User unique identifier' }
        }
      },
      body: adminUserSchemas.updateUser
    }
  },

  // 🔋 Charge Station Management Routes
  stations: {
    register: {
      tags: ['🔋 Admin - Charge Station Management'],
      summary: '⚡ Register New Charge Station',
      description: '🚀 Register a new EV charging station with location and specifications.',
      body: adminStationSchemas.registerStation
    },

    updateStatus: {
      tags: ['🔋 Admin - Charge Station Management'],
      summary: '🔄 Update Station Status',
      description: '📊 Update charging station status and heartbeat timestamp.',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', description: '🆔 Station unique identifier' }
        }
      },
      body: adminStationSchemas.updateStationStatus
    },

    getAll: {
      tags: ['🔋 Admin - Charge Station Management'],
      summary: '📋 Get All Charge Stations',
      description: '🔍 Retrieve all charging stations regardless of status for admin overview.'
    }
  },

  // 💳 PLN Wallet Management Routes
  wallets: {
    getAll: {
      tags: ['💳 Admin - PLN Wallet Management'],
      summary: '💰 Get All User Wallets',
      description: '🔍 Administrative overview of all user PLN wallets with balance and status information.',
      querystring: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: '👤 Filter by specific user ID'
          },
          email: {
            type: 'string',
            description: '📧 Filter by user email (partial match)'
          },
          minBalance: {
            type: 'number',
            minimum: 0,
            description: '💰 Minimum balance filter (PLN)'
          },
          maxBalance: {
            type: 'number',
            minimum: 0,
            description: '💰 Maximum balance filter (PLN)'
          },
          limit: {
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20,
            description: '📄 Items per page'
          },
          offset: {
            type: 'number',
            minimum: 0,
            default: 0,
            description: '📄 Pagination offset'
          }
        }
      }
    },

    getUserWallet: {
      tags: ['💳 Admin - PLN Wallet Management'],
      summary: '👤 Get User Wallet Details',
      description: '🔍 Retrieve detailed wallet information including balance, transaction history, and statistics.',
      params: {
        type: 'object',
        required: ['userId'],
        properties: {
          userId: { type: 'string', description: '👤 User unique identifier' }
        }
      }
    },

    adjustBalance: {
      tags: ['💳 Admin - PLN Wallet Management'],
      summary: '💰 Adjust User Balance',
      description: '🔧 Administrative tool to manually adjust user wallet balance with audit trail.',
      params: {
        type: 'object',
        required: ['userId'],
        properties: {
          userId: { type: 'string', description: '👤 User unique identifier' }
        }
      },
      body: adminWalletSchemas.adjustBalance
    }
  },

  // 📊 Transaction Management Routes
  transactions: {
    getAll: {
      tags: ['💳 Admin - PLN Wallet Management'],
      summary: '📊 Get All PLN Transactions',
      description: '🔍 Administrative overview of all PLN transactions with filtering and analytics.',
      querystring: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: '👤 Filter by user ID'
          },
          type: {
            type: 'string',
            enum: ['STRIPE_PLN_PAYMENT', 'ADD_PLN_FUNDS', 'PLN_CHARGING_PAYMENT', 'PLN_REFUND'],
            description: '🏷️ Filter by transaction type'
          },
          status: {
            type: 'string',
            enum: ['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'],
            description: '📊 Filter by transaction status'
          },
          fromDate: {
            type: 'string',
            format: 'date',
            description: '📅 Start date filter (YYYY-MM-DD)'
          },
          toDate: {
            type: 'string',
            format: 'date',
            description: '📅 End date filter (YYYY-MM-DD)'
          },
          minAmount: {
            type: 'number',
            minimum: 0,
            description: '💰 Minimum amount filter (PLN)'
          },
          maxAmount: {
            type: 'number',
            minimum: 0,
            description: '💰 Maximum amount filter (PLN)'
          },
          limit: {
            type: 'number',
            minimum: 1,
            maximum: 100,
            default: 20,
            description: '📄 Items per page'
          },
          offset: {
            type: 'number',
            minimum: 0,
            default: 0,
            description: '📄 Pagination offset'
          }
        }
      }
    },

    processRefund: {
      tags: ['💳 Admin - PLN Wallet Management'],
      summary: '🔄 Process Transaction Refund',
      description: '💸 Process a full or partial refund for a completed PLN transaction.',
      params: {
        type: 'object',
        required: ['transactionId'],
        properties: {
          transactionId: { type: 'string', description: '💳 Transaction unique identifier' }
        }
      },
      body: adminWalletSchemas.processRefund
    }
  },

  // 📊 System Monitoring Routes
  analytics: {
    getSystemStats: {
      tags: ['📊 Admin - System Monitoring'],
      summary: '📈 Get System Statistics',
      description: '📊 Retrieve comprehensive system-wide statistics and metrics.'
    },

    getWalletAnalytics: {
      tags: ['💳 Admin - PLN Wallet Management'],
      summary: '📈 Get PLN Wallet Analytics',
      description: '📊 Comprehensive analytics and insights for the PLN wallet system.',
      querystring: {
        type: 'object',
        properties: {
          period: {
            type: 'string',
            enum: ['7d', '30d', '90d', '1y'],
            default: '30d',
            description: '📅 Analytics period'
          },
          includeCharts: {
            type: 'boolean',
            default: false,
            description: '📊 Include chart data points'
          }
        }
      }
    }
  }
}; 
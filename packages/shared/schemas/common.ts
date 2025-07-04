/**
 * 📋 Common Schema Definitions
 * 
 * Reusable OpenAPI schema definitions used across all API endpoints.
 * These schemas ensure consistency and reduce code duplication.
 * 
 * @module CommonSchemas
 * @version 2.0.0
 * @author EV Charging Team
 */

/**
 * 🎯 Standard API Response Schemas
 * 
 * Base response structures used by all endpoints for consistency.
 */
export const commonSchemas = {
  // ✅ Success Response Template
  SuccessResponse: {
    type: 'object',
    properties: {
      success: { 
        type: 'boolean', 
        enum: [true],
        description: '✅ Request success indicator'
      },
      data: {
        type: 'object',
        description: '📦 Response payload data'
      },
      message: { 
        type: 'string',
        description: '💬 Human-readable success message'
      },
      meta: {
        $ref: '#/components/schemas/ResponseMeta'
      }
    },
    required: ['success', 'data', 'message', 'meta']
  },

  // ❌ Error Response Template
  ErrorResponse: {
    type: 'object',
    properties: {
      success: { 
        type: 'boolean', 
        enum: [false],
        description: '❌ Request failure indicator'
      },
      error: {
        type: 'object',
        properties: {
          code: { 
            type: 'string',
            description: '🏷️ Error code identifier'
          },
          message: { 
            type: 'string',
            description: '💬 Human-readable error message'
          },
          details: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ValidationError'
            },
            description: '📋 Detailed validation errors'
          }
        },
        required: ['code', 'message']
      },
      meta: {
        $ref: '#/components/schemas/ResponseMeta'
      }
    },
    required: ['success', 'error', 'meta']
  },

  // 🔍 Validation Error Details
  ValidationError: {
    type: 'object',
    properties: {
      field: { 
        type: 'string',
        description: '🎯 Field that failed validation'
      },
      message: { 
        type: 'string',
        description: '💬 Validation error message'
      },
      value: {
        description: '📝 Invalid value that was provided'
      }
    },
    required: ['field', 'message']
  },

  // 📊 Response Metadata
  ResponseMeta: {
    type: 'object',
    properties: {
      timestamp: { 
        type: 'string', 
        format: 'date-time',
        description: '⏰ Response timestamp'
      },
      requestId: { 
        type: 'string',
        description: '🔍 Unique request identifier for tracking'
      },
      version: { 
        type: 'string',
        description: '📦 API version'
      }
    },
    required: ['timestamp', 'version']
  },

  // 📄 Pagination Schema
  Pagination: {
    type: 'object',
    properties: {
      total: { 
        type: 'integer',
        minimum: 0,
        description: '📊 Total number of items',
        example: 156
      },
      page: { 
        type: 'integer',
        minimum: 1,
        description: '📄 Current page number',
        example: 2
      },
      limit: { 
        type: 'integer',
        minimum: 1,
        maximum: 100,
        description: '📋 Items per page limit',
        example: 20
      }
    },
    required: ['total', 'page', 'limit']
  }
};

/**
 * 🔧 Common Input Validation Patterns
 * 
 * Reusable validation patterns for common data types.
 */
export const validationPatterns = {
  // 📧 Email validation
  email: {
    type: 'string',
    format: 'email',
    description: '📧 Valid email address'
  },

  // 📱 Phone number validation (international format)
  phoneNumber: {
    type: 'string',
    pattern: '^\\+?[1-9]\\d{6,14}$',
    description: '📱 Phone number (minimum 7 digits, international format supported)'
  },

  // 🔒 Password validation
  password: {
    type: 'string',
    minLength: 8,
    description: '🔒 Secure password (minimum 8 characters)'
  },

  // 🆔 UUID validation
  uuid: {
    type: 'string',
    pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    description: '🆔 Valid UUID identifier'
  },

  // 🔗 URL validation
  url: {
    type: 'string',
    format: 'uri',
    description: '🔗 Valid URL'
  }
};

/**
 * 🎭 User Role Enumeration
 * 
 * Available user roles in the system.
 */
export const userRoles = ['CUSTOMER', 'ADMIN', 'FIELD_WORKER'] as const;

/**
 * 🔋 Charge Station Enumerations
 * 
 * Available charge station states and connector types.
 */
export const chargeStationEnums = {
  status: ['available', 'charging', 'offline', 'maintenance'] as const,
  connectorTypes: ['Type1', 'Type2', 'CCS', 'CHAdeMO'] as const
};

/**
 * 💳 Transaction Enumerations
 * 
 * Available transaction types and statuses.
 */
export const transactionEnums = {
  types: ['STRIPE_PLN_PAYMENT', 'ADD_PLN_FUNDS', 'PLN_CHARGING_PAYMENT', 'PLN_REFUND'] as const,
  statuses: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED'] as const
}; 
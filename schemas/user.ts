/**
 * 👥 User Schema Definitions
 * 
 * OpenAPI schema definitions for user-related endpoints including
 * authentication, registration, and profile management.
 * 
 * @module UserSchemas
 * @version 2.0.0
 * @author EV Charging Team
 */

import { validationPatterns, userRoles } from './common';

/**
 * 👤 User Entity Schema
 * 
 * Complete user object returned by API endpoints.
 */
export const userSchema = {
  User: {
    type: 'object',
    properties: {
      id: { 
        type: 'string',
        description: '🆔 Unique user identifier',
        example: 'user-uuid-123'
      },
      email: { 
        ...validationPatterns.email,
        description: '📧 User email address',
        example: 'john.doe@example.com'
      },
      firstName: { 
        type: 'string',
        description: '👤 User first name',
        example: 'John'
      },
      lastName: { 
        type: 'string',
        description: '👤 User last name',
        example: 'Doe'
      },
      phoneNumber: { 
        ...validationPatterns.phoneNumber,
        description: '📱 User phone number',
        example: '+905551234567'
      },
      role: { 
        type: 'string',
        enum: [...userRoles],
        description: '🎭 User role',
        example: 'CUSTOMER'
      },
      isActive: { 
        type: 'boolean',
        description: '✅ Account active status',
        example: true
      },
      createdAt: { 
        type: 'string', 
        format: 'date-time',
        description: '📅 Account creation timestamp'
      },
      updatedAt: { 
        type: 'string', 
        format: 'date-time',
        description: '🔄 Last update timestamp'
      }
    },
    required: ['id', 'email', 'firstName', 'lastName', 'role', 'isActive']
  }
};

/**
 * 🔐 Authentication Request Schemas
 * 
 * Input validation schemas for auth endpoints.
 */
export const authRequestSchemas = {
  // 📝 User Registration Request
  UserRegistration: {
    type: 'object',
    properties: {
      email: { 
        ...validationPatterns.email,
        description: '📧 Valid email address (must be unique)'
      },
      password: { 
        ...validationPatterns.password,
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
        ...validationPatterns.phoneNumber,
        description: '📱 Phone number (minimum 7 digits, international format supported)'
      },
      role: { 
        type: 'string', 
        enum: [...userRoles],
        description: '🎭 User role assignment'
      }
    },
    required: ['email', 'password', 'firstName', 'lastName', 'role'],
    additionalProperties: false
  },

  // 🔑 User Login Request
  UserLogin: {
    type: 'object',
    properties: {
      email: { 
        ...validationPatterns.email,
        description: '📧 Registered email address'
      },
      password: { 
        type: 'string',
        minLength: 1,
        description: '🔒 User password'
      }
    },
    required: ['email', 'password'],
    additionalProperties: false
  },

  // 🔄 Profile Update Request
  ProfileUpdate: {
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
        ...validationPatterns.phoneNumber,
        description: '📱 Updated phone number'
      }
    },
    additionalProperties: false
  }
};

/**
 * 🎫 Authentication Response Schemas
 * 
 * Response structures for successful authentication.
 */
export const authResponseSchemas = {
  // ✅ Registration Success Response
  RegistrationSuccess: {
    type: 'object',
    properties: {
      success: { type: 'boolean', enum: [true] },
      data: {
        type: 'object',
        properties: {
          user: {
            $ref: '#/components/schemas/User'
          }
        }
      },
      message: { 
        type: 'string',
        example: 'User registered successfully'
      },
      meta: {
        $ref: '#/components/schemas/ResponseMeta'
      }
    }
  },

  // 🔑 Login Success Response
  LoginSuccess: {
    type: 'object',
    properties: {
      success: { type: 'boolean', enum: [true] },
      data: {
        type: 'object',
        properties: {
          token: { 
            type: 'string',
            description: '🎫 JWT access token'
          },
          user: {
            $ref: '#/components/schemas/User'
          },
          expiresIn: {
            type: 'string',
            description: '⏰ Token expiration time',
            example: '24h'
          }
        }
      },
      message: { 
        type: 'string',
        example: 'Login successful'
      },
      meta: {
        $ref: '#/components/schemas/ResponseMeta'
      }
    }
  },

  // 👋 Logout Success Response
  LogoutSuccess: {
    type: 'object',
    properties: {
      success: { type: 'boolean', enum: [true] },
      data: { 
        type: 'object',
        properties: {},
        description: '📦 Empty data object'
      },
      message: { 
        type: 'string',
        example: 'Logout successful'
      },
      meta: {
        $ref: '#/components/schemas/ResponseMeta'
      }
    }
  }
}; 
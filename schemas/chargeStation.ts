/**
 * 🔋 Charge Station Schema Definitions
 * 
 * OpenAPI schema definitions for charge station management endpoints
 * including registration, status updates, and search functionality.
 * 
 * @module ChargeStationSchemas
 * @version 2.0.0
 * @author EV Charging Team
 */

import { chargeStationEnums } from './common';

/**
 * ⚡ Charge Station Entity Schema
 * 
 * Complete charge station object returned by API endpoints.
 */
export const chargeStationSchema = {
  ChargeStation: {
    type: 'object',
    properties: {
      id: { 
        type: 'string',
        description: '🆔 Unique charge station identifier',
        example: 'station-uuid-123'
      },
      name: { 
        type: 'string',
        description: '🏷️ Station display name',
        example: 'Tesla Supercharger Mall Center'
      },
      location: { 
        type: 'string',
        description: '📍 Station address/location',
        example: 'Shopping Mall Istanbul, Floor B1'
      },
      status: { 
        type: 'string',
        enum: [...chargeStationEnums.status],
        description: '🔋 Current station status',
        example: 'available'
      },
      powerOutput: { 
        type: 'number',
        minimum: 1,
        maximum: 1000,
        description: '⚡ Power output in kW',
        example: 150
      },
      connectorType: { 
        type: 'string',
        enum: [...chargeStationEnums.connectorTypes],
        description: '🔌 Connector type',
        example: 'CCS'
      },
      pricePerKwh: { 
        type: 'number',
        minimum: 0,
        description: '💰 Price per kWh in PLN',
        example: 2.5
      },
      isActive: { 
        type: 'boolean',
        description: '✅ Station active status',
        example: true
      },
      lastHeartbeat: { 
        type: 'string', 
        format: 'date-time',
        description: '💓 Last heartbeat timestamp'
      },
      createdAt: { 
        type: 'string', 
        format: 'date-time',
        description: '📅 Station registration timestamp'
      },
      updatedAt: { 
        type: 'string', 
        format: 'date-time',
        description: '🔄 Last update timestamp'
      }
    },
    required: ['id', 'name', 'location', 'status', 'powerOutput', 'connectorType', 'pricePerKwh']
  }
};

/**
 * 📝 Charge Station Request Schemas
 * 
 * Input validation schemas for charge station endpoints.
 */
export const chargeStationRequestSchemas = {
  // ⚡ Station Registration Request
  StationRegistration: {
    type: 'object',
    properties: {
      name: { 
        type: 'string', 
        minLength: 1, 
        maxLength: 100,
        description: '🏷️ Station display name'
      },
      location: { 
        type: 'string', 
        minLength: 1, 
        maxLength: 200,
        description: '📍 Station address/location description'
      },
      powerOutput: { 
        type: 'number', 
        minimum: 1, 
        maximum: 1000,
        description: '⚡ Maximum power output in kW'
      },
      connectorType: { 
        type: 'string', 
        enum: [...chargeStationEnums.connectorTypes],
        description: '🔌 Connector type standard'
      },
      pricePerKwh: { 
        type: 'number', 
        minimum: 0,
        maximum: 100,
        description: '💰 Price per kWh in PLN'
      },
      isActive: { 
        type: 'boolean',
        description: '✅ Initial active status (default: true)',
        default: true
      }
    },
    required: ['name', 'location', 'powerOutput', 'connectorType', 'pricePerKwh'],
    additionalProperties: false
  },

  // 🔄 Status Update Request
  StatusUpdate: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        enum: [...chargeStationEnums.status],
        description: '🔋 New station status'
      },
      updateHeartbeat: {
        type: 'boolean',
        description: '💓 Update heartbeat timestamp',
        default: false
      }
    },
    additionalProperties: false
  },

  // 🔍 Search Query Parameters
  SearchQuery: {
    type: 'object',
    properties: {
      location: { 
        type: 'string',
        description: '📍 Filter by location (partial match, case-insensitive)'
      },
      connectorType: { 
        type: 'string', 
        enum: [...chargeStationEnums.connectorTypes],
        description: '🔌 Filter by connector type'
      },
      maxPricePerKwh: { 
        type: 'number',
        minimum: 0,
        description: '💰 Maximum price per kWh filter'
      },
      minPowerOutput: { 
        type: 'number',
        minimum: 1,
        maximum: 1000,
        description: '⚡ Minimum power output in kW'
      }
    },
    additionalProperties: false
  }
};

/**
 * 📊 Charge Station Response Schemas
 * 
 * Response structures for charge station operations.
 */
export const chargeStationResponseSchemas = {
  // ✅ Registration Success Response
  RegistrationSuccess: {
    type: 'object',
    properties: {
      success: { type: 'boolean', enum: [true] },
      data: {
        type: 'object',
        properties: {
          chargeStation: {
            $ref: '#/components/schemas/ChargeStation'
          }
        }
      },
      message: { 
        type: 'string',
        example: 'ChargeStation registered successfully'
      },
      meta: {
        $ref: '#/components/schemas/ResponseMeta'
      }
    }
  },

  // 📋 Search Results Response
  SearchResults: {
    type: 'object',
    properties: {
      success: { type: 'boolean', enum: [true] },
      data: {
        type: 'object',
        properties: {
          chargeStations: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ChargeStation'
            },
            description: '🔋 List of available charging stations'
          },
          total: {
            type: 'integer',
            minimum: 0,
            description: '📊 Total number of stations found',
            example: 15
          },
          filters: {
            type: 'object',
            description: '🔍 Applied search filters',
            example: {
              location: 'istanbul',
              connectorType: 'CCS',
              maxPricePerKwh: 5.0
            }
          }
        }
      },
      message: { 
        type: 'string',
        example: 'Found 15 available charge stations'
      },
      meta: {
        $ref: '#/components/schemas/ResponseMeta'
      }
    }
  },

  // 🔄 Status Update Success Response
  StatusUpdateSuccess: {
    type: 'object',
    properties: {
      success: { type: 'boolean', enum: [true] },
      data: {
        type: 'object',
        properties: {
          chargeStation: {
            $ref: '#/components/schemas/ChargeStation'
          }
        }
      },
      message: { 
        type: 'string',
        example: 'ChargeStation status updated successfully'
      },
      meta: {
        $ref: '#/components/schemas/ResponseMeta'
      }
    }
  }
}; 
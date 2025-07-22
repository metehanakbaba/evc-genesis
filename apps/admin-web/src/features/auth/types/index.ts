import type { UserRole } from '@/types/global.types';

// Auth User Interface - matches API specification
export interface AuthUser {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber?: string;
  readonly role: UserRole;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// Login Request Interface
export interface LoginRequest {
  readonly email: string;
  readonly password: string;
}

// Registration Request Interface
export interface RegistrationRequest {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber?: string;
}

// Login Response Interface - matches API specification
export interface LoginResponse {
  readonly success: boolean;
  readonly data: {
    readonly token: string;
    readonly user: AuthUser;
    readonly expiresIn: string;
  };
  readonly message: string;
  readonly meta: {
    readonly timestamp: string;
    readonly requestId: string;
    readonly version: string;
  };
}

// Registration Response Interface - matches API specification
export interface RegistrationResponse {
  readonly success: boolean;
  readonly data: {
    readonly user: AuthUser;
  };
  readonly message: string;
  readonly meta: {
    readonly timestamp: string;
    readonly requestId: string;
    readonly version: string;
  };
}

// Logout Response Interface
export interface LogoutResponse {
  readonly success: boolean;
  readonly data: Record<string, never>;
  readonly message: string;
  readonly meta: {
    readonly timestamp: string;
    readonly requestId: string;
    readonly version: string;
  };
}

// Error Response Interface - matches API specification
export interface AuthErrorResponse {
  readonly success: false;
  readonly error: {
    readonly code: string;
    readonly message: string;
  };
  readonly meta: {
    readonly timestamp: string;
    readonly requestId: string;
    readonly version: string;
  };
}

// Auth Error Codes
export type AuthErrorCode = 
  | 'VALIDATION_ERROR'
  | 'AUTHENTICATION_FAILED'
  | 'AUTHENTICATION_REQUIRED'
  | 'INSUFFICIENT_PRIVILEGES'
  | 'USER_EXISTS'
  | 'USER_NOT_FOUND'
  | 'REGISTRATION_FAILED'
  | 'LOGIN_FAILED';

// Form Data Interfaces
export interface LoginFormData {
  readonly email: string;
  readonly password: string;
}

export interface RegistrationFormData {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber?: string;
} 
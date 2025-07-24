/**
 * 👤 User Domain Types
 * 
 * Type definitions for user entities, authentication, and profile management.
 * Based on user.ts schema definitions.
 * 
 * @module UserTypes
 * @version 2.0.0
 * @author EV Charging Team
 */


// TODO create UserListRequest contract 

export interface CreateUserRequest {}

export interface UpdateUserRequest {}

export interface UserListResponse {}

export interface UserQuery {}

export interface UserProfile {}

export interface ApiSuccessResponse {}

export type UserRole = 'CUSTOMER' | 'ADMIN' | 'FIELD_WORKER';

// 👤 User Entity
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// 📝 Registration Request
export interface UserRegistrationRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: UserRole;
}

// 🔑 Login Request
export interface UserLoginRequest {
  email: string;
  password: string;
}

// 🔄 Profile Update Request
export interface ProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

// 🎫 Authentication Response
export interface AuthSuccessResponse {
  token: string;
  user: User;
  expiresIn: string; // Changed from expiresAt to match API response
} 
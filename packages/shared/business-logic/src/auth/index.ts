/**
 * 🔒 Authentication Business Logic
 * 
 * Email validation, password rules, session management vs.
 * Apps'lerden taşınacak authentication business logic'i
 */

export interface AuthValidationRules {
  readonly minPasswordLength: number;
  readonly requireSpecialChars: boolean;
  readonly emailRegex: RegExp;
  readonly maxLoginAttempts: number;
  readonly adminPasswordMinLength: number;
}

export interface AuthBusinessLogic {
  validateEmail(email: string): { isValid: boolean; error?: string };
  validatePassword(password: string): { isValid: boolean; error?: string };
  validateLoginForm(email: string, password: string): { isValid: boolean; errors: Record<string, string> };
  canAttemptLogin(attemptCount: number): boolean;
  calculateSessionTimeout(userRole: string): number;
  shouldRequire2FA(userRole: string): boolean;
}

/**
 * 📧 Email Validation Business Rule
 * Extracted from: apps/admin-web/src/features/auth/hooks/useAuthForm.ts (lines 62-66)
 * Extracted from: apps/admin-web/src/features/auth/hooks/useFormState.tsx (lines 67-70)
 */
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  return { isValid: true };
};

/**
 * 🔑 Password Validation Business Rule  
 * Extracted from: apps/admin-web/src/features/auth/hooks/useFormState.tsx (lines 72-75)
 * Enhanced with admin-specific rules
 */
export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }
  
  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters' };
  }
  
  // Business rule: Admin passwords must be stronger
  if (password.length < 8 && password.includes('admin')) {
    return { isValid: false, error: 'Admin passwords must be at least 8 characters' };
  }
  
  return { isValid: true };
};

/**
 * 📝 Complete Login Form Validation
 * Extracted from: apps/admin-web/src/features/auth/hooks/useFormState.tsx (lines 67-87)
 * Combines email and password validation with field-level errors
 */
export const validateLoginForm = (
  email: string, 
  password: string
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  }
  
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error!;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * 🚫 Login Attempt Rate Limiting
 * Business rule for preventing brute force attacks
 */
export const canAttemptLogin = (attemptCount: number, maxAttempts: number = 5): boolean => {
  return attemptCount < maxAttempts;
};

/**
 * 🎯 Role-based Session Timeout Business Rule
 */
export const calculateSessionTimeout = (userRole: string): number => {
  const timeouts = {
    'admin': 60 * 60 * 1000,     // 1 hour
    'operator': 8 * 60 * 60 * 1000, // 8 hours  
    'user': 24 * 60 * 60 * 1000,    // 24 hours
  };
  
  return timeouts[userRole as keyof typeof timeouts] || timeouts.user;
};

/**
 * 🔐 2FA Requirement Business Rule
 */
export const shouldRequire2FA = (userRole: string): boolean => {
  return userRole === 'admin'; // Only admins require 2FA
};

/**
 * 🎭 Form Field Validation State
 * Business logic for determining validation display state
 */
export const getFieldValidationState = (
  fieldName: string, 
  errors: Record<string, string>
): { hasError: boolean; errorMessage?: string } => {
  const error = errors[fieldName];
  return {
    hasError: !!error,
    ...(error && { errorMessage: error })
  };
};

// Default configuration
export const DEFAULT_AUTH_RULES: AuthValidationRules = {
  minPasswordLength: 6,
  requireSpecialChars: false,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  maxLoginAttempts: 5,
  adminPasswordMinLength: 8,
};

// Factory function
export const createAuthBusinessLogic = (rules: Partial<AuthValidationRules> = {}): AuthBusinessLogic => {
  const config = { ...DEFAULT_AUTH_RULES, ...rules };
  
  return {
    validateEmail,
    validatePassword,
    validateLoginForm,
    canAttemptLogin: (attemptCount: number) => canAttemptLogin(attemptCount, config.maxLoginAttempts),
    calculateSessionTimeout,
    shouldRequire2FA,
  };
};

// Export enhanced auth validation utilities
export const authValidationUtils = {
  validateEmail,
  validatePassword,
  validateLoginForm,
  canAttemptLogin,
  getFieldValidationState,
  DEFAULT_AUTH_RULES,
}; 
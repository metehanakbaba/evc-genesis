/**
 * Auth Domain Business Logic Tests
 * Comprehensive test coverage for authentication utilities
 */

import {
  validateEmail,
  validatePassword,
  validateLoginForm,
  getFieldValidationState,
  canAttemptLogin,
  calculateSessionTimeout,
  shouldRequire2FA,
  DEFAULT_AUTH_RULES,
} from './index';

describe('Auth Domain Business Logic', () => {
  describe('validateEmail', () => {
    it('should validate correct email formats', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'admin+tag@company.org',
        'user123@test-domain.com',
      ];

      validEmails.forEach(email => {
        expect(validateEmail(email)).toEqual({
          isValid: true,
        });
      });
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        '',
        'invalid-email',
        '@domain.com',
        'user@',
        'user@domain',
        'user.domain.com',
        'user@domain.',
        'user name@domain.com',
      ];

      invalidEmails.forEach(email => {
        const result = validateEmail(email);
        expect(result.isValid).toBe(false);
        expect(result.error).toBeTruthy();
      });
    });

    it('should handle required field validation', () => {
      expect(validateEmail('')).toEqual({
        isValid: false,
        error: 'Email is required',
      });
    });
  });

  describe('validatePassword', () => {
    it('should validate strong passwords', () => {
      const strongPasswords = [
        'StrongPass123',
        'MySecurePass456',
        'ComplexPassword789',
        'ValidPass2024',
      ];

      strongPasswords.forEach(password => {
        expect(validatePassword(password)).toEqual({
          isValid: true,
        });
      });
    });

    it('should reject weak passwords', () => {
      const weakPasswords = [
        '',
        '123',
        'pass',
        '12345',
      ];

      weakPasswords.forEach(password => {
        const result = validatePassword(password);
        expect(result.isValid).toBe(false);
        expect(result.error).toBeTruthy();
      });
    });

    it('should enforce admin password rules', () => {
      const adminPassword = 'admin123'; // Less than 8 chars with 'admin'
      const result = validatePassword(adminPassword);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Admin passwords must be at least 8 characters');
    });

    it('should handle required field validation', () => {
      expect(validatePassword('')).toEqual({
        isValid: false,
        error: 'Password is required',
      });
    });
  });

  describe('validateLoginForm', () => {
    it('should validate complete valid form', () => {
      expect(validateLoginForm('test@example.com', 'StrongPass123')).toEqual({
        isValid: true,
        errors: {},
      });
    });

    it('should return errors for invalid fields', () => {
      const result = validateLoginForm('invalid-email', 'weak');
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeTruthy();
      expect(result.errors.password).toBeTruthy();
    });

    it('should handle empty form', () => {
      const result = validateLoginForm('', '');
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBe('Email is required');
      expect(result.errors.password).toBe('Password is required');
    });

    it('should handle partial form data', () => {
      const result = validateLoginForm('test@example.com', '');
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeUndefined();
      expect(result.errors.password).toBe('Password is required');
    });
  });

  describe('getFieldValidationState', () => {
    it('should return correct validation state for fields with errors', () => {
      const errors = { email: 'Invalid email format' };
      expect(getFieldValidationState('email', errors)).toEqual({
        hasError: true,
        errorMessage: 'Invalid email format',
      });
    });

    it('should return correct validation state for fields without errors', () => {
      const errors = {};
      expect(getFieldValidationState('email', errors)).toEqual({
        hasError: false,
        errorMessage: undefined,
      });
    });

    it('should handle missing field in errors object', () => {
      const errors = { password: 'Too weak' };
      expect(getFieldValidationState('email', errors)).toEqual({
        hasError: false,
        errorMessage: undefined,
      });
    });
  });

  describe('canAttemptLogin', () => {
    it('should allow login attempts under limit', () => {
      expect(canAttemptLogin(0)).toBe(true);
      expect(canAttemptLogin(3)).toBe(true);
      expect(canAttemptLogin(4)).toBe(true);
    });

    it('should block login attempts at or over limit', () => {
      expect(canAttemptLogin(5)).toBe(false);
      expect(canAttemptLogin(10)).toBe(false);
    });

    it('should respect custom max attempts', () => {
      expect(canAttemptLogin(2, 3)).toBe(true);
      expect(canAttemptLogin(3, 3)).toBe(false);
    });
  });

  describe('calculateSessionTimeout', () => {
    it('should return correct timeout for different roles', () => {
      expect(calculateSessionTimeout('admin')).toBe(60 * 60 * 1000); // 1 hour
      expect(calculateSessionTimeout('operator')).toBe(8 * 60 * 60 * 1000); // 8 hours
      expect(calculateSessionTimeout('user')).toBe(24 * 60 * 60 * 1000); // 24 hours
    });

    it('should return default timeout for unknown roles', () => {
      expect(calculateSessionTimeout('unknown')).toBe(24 * 60 * 60 * 1000); // 24 hours
    });
  });

  describe('shouldRequire2FA', () => {
    it('should require 2FA for admin users', () => {
      expect(shouldRequire2FA('admin')).toBe(true);
    });

    it('should not require 2FA for non-admin users', () => {
      expect(shouldRequire2FA('operator')).toBe(false);
      expect(shouldRequire2FA('user')).toBe(false);
      expect(shouldRequire2FA('unknown')).toBe(false);
    });
  });

  describe('DEFAULT_AUTH_RULES', () => {
    it('should have correct default values', () => {
      expect(DEFAULT_AUTH_RULES).toEqual({
        minPasswordLength: 6,
        requireSpecialChars: false,
        emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        maxLoginAttempts: 5,
        adminPasswordMinLength: 8,
      });
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete login flow with valid credentials', () => {
      const email = 'user@example.com';
      const password = 'SecurePass123';

      // Validate individual fields
      const emailValidation = validateEmail(email);
      const passwordValidation = validatePassword(password);
      
      expect(emailValidation.isValid).toBe(true);
      expect(passwordValidation.isValid).toBe(true);

      // Validate complete form
      const formValidation = validateLoginForm(email, password);
      expect(formValidation.isValid).toBe(true);
      expect(Object.keys(formValidation.errors)).toHaveLength(0);

      // Check session and security rules
      expect(canAttemptLogin(0)).toBe(true);
      expect(calculateSessionTimeout('user')).toBe(24 * 60 * 60 * 1000);
      expect(shouldRequire2FA('user')).toBe(false);
    });

    it('should handle admin login flow with enhanced security', () => {
      const email = 'admin@example.com';
      const password = 'AdminSecurePass123';

      const formValidation = validateLoginForm(email, password);
      expect(formValidation.isValid).toBe(true);

      // Admin-specific security rules
      expect(calculateSessionTimeout('admin')).toBe(60 * 60 * 1000); // Shorter session
      expect(shouldRequire2FA('admin')).toBe(true); // Requires 2FA
    });

    it('should handle failed login validation flow', () => {
      const email = 'invalid-email';
      const password = 'weak';

      const formValidation = validateLoginForm(email, password);
      expect(formValidation.isValid).toBe(false);
      
      const emailState = getFieldValidationState('email', formValidation.errors);
      const passwordState = getFieldValidationState('password', formValidation.errors);
      
      expect(emailState.hasError).toBe(true);
      expect(passwordState.hasError).toBe(true);
      expect(emailState.errorMessage).toBeTruthy();
      expect(passwordState.errorMessage).toBeTruthy();
    });
  });
}); 
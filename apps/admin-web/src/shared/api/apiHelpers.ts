import { logout } from '@/features/auth/authSlice';
import type { AppDispatch } from '@/lib/store/store';
import type { ApiError } from '@/types/global.types';

/**
 * Check if the error is an API error
 */
export const isApiError = (error: unknown): error is { data: ApiError } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof (error as { data: unknown }).data === 'object' &&
    (error as { data: { success: unknown } }).data.success === false
  );
};

/**
 * Extract error message from API error
 */
export const getApiErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.data.error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

/**
 * Get error code from API error
 */
export const getApiErrorCode = (error: unknown): string | undefined => {
  if (isApiError(error)) {
    return error.data.error.code;
  }
  return undefined;
};

/**
 * Handle authentication errors
 */
export const handleAuthError = (
  error: unknown,
  dispatch: AppDispatch,
): void => {
  const errorCode = getApiErrorCode(error);
  if (errorCode === 'AUTHENTICATION_FAILED' || errorCode === 'AUTHENTICATION_REQUIRED' || errorCode === 'UNAUTHORIZED' || errorCode === 'TOKEN_EXPIRED') {
    dispatch(logout());
  }
};

/**
 * Format API error for display
 */
export const formatApiError = (
  error: unknown,
): {
  title: string;
  message: string;
} => {
  const errorCode = getApiErrorCode(error);
  const message = getApiErrorMessage(error);

  switch (errorCode) {
    case 'VALIDATION_ERROR':
      return {
        title: 'Validation Error',
        message,
      };
    case 'AUTHENTICATION_FAILED':
      return {
        title: 'Authentication Failed',
        message: 'Invalid credentials provided',
      };
    case 'AUTHENTICATION_REQUIRED':
      return {
        title: 'Authentication Required',
        message: 'Please login to continue',
      };
    case 'INSUFFICIENT_PRIVILEGES':
      return {
        title: 'Access Denied',
        message: 'You do not have permission to perform this action',
      };
    case 'USER_EXISTS':
      return {
        title: 'User Already Exists',
        message: 'A user with this email already exists',
      };
    case 'USER_NOT_FOUND':
      return {
        title: 'User Not Found',
        message: 'User account could not be found',
      };
    case 'REGISTRATION_FAILED':
      return {
        title: 'Registration Failed',
        message: 'Failed to create user account. Please try again.',
      };
    case 'LOGIN_FAILED':
      return {
        title: 'Login Failed',
        message: 'Failed to authenticate user. Please try again.',
      };
    case 'UNAUTHORIZED':
      return {
        title: 'Authentication Required',
        message: 'Please login to continue',
      };
    case 'FORBIDDEN':
      return {
        title: 'Access Denied',
        message: 'You do not have permission to perform this action',
      };
    case 'NOT_FOUND':
      return {
        title: 'Not Found',
        message,
      };
    case 'CONFLICT':
      return {
        title: 'Conflict',
        message,
      };
    case 'PAYMENT_REQUIRED':
      return {
        title: 'Payment Required',
        message,
      };
    case 'RATE_LIMIT_EXCEEDED':
      return {
        title: 'Too Many Requests',
        message: 'Please try again later',
      };
    case 'SERVER_ERROR':
      return {
        title: 'Server Error',
        message: 'Something went wrong on our end. Please try again.',
      };
    case 'SERVICE_UNAVAILABLE':
      return {
        title: 'Service Unavailable',
        message:
          'The service is temporarily unavailable. Please try again later.',
      };
    default:
      return {
        title: 'Error',
        message,
      };
  }
};

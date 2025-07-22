'use client';

// ✅ Import shared business logic
import { validateEmail, validatePassword } from '@evc/shared-business-logic';
import { useCallback } from 'react';
import { getApiErrorMessage, formatApiError, isApiError } from '@/shared/api/apiHelpers';
import { useToast } from '@/shared/ui';
import { useLoginMutation } from '../authApi';
import { useAuthMiddleware } from './useAuthMiddleware';

// Simplified login state interface
interface LoginState {
  success?: boolean;
  error?: string;
}

export const useAuthForm = () => {
  const { showToast } = useToast();
  const [login, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
  const { login: authLogin } = useAuthMiddleware();

  // Simplified login action without useActionState
  const submitAction = useCallback(async (formData: FormData) => {
    try {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      // ✅ Use shared business logic instead of inline validation
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        throw new Error(emailValidation.error);
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.error);
      }

      // Perform login
      const result = await login({ email, password }).unwrap();

      if (result.success && result.data) {
        // Use auth middleware to handle login (Redux + cookies + navigation)
        authLogin({
          user: {
            ...result.data.user,
            name: `${result.data.user.firstName} ${result.data.user.lastName}`, // Backward compatibility
          },
          token: result.data.token,
          expiresIn: result.data.expiresIn,
        });

        showToast({
          type: 'success',
          title: result.message || 'Welcome back!',
          message: `Successfully signed in as ${result.data.user.firstName} ${result.data.user.lastName}`,
        });

        return { success: true };
      }

      throw new Error('Login failed. Please check your credentials.');
    } catch (error) {
      const formattedError = formatApiError(error);
      
      showToast({
        type: 'error',
        title: formattedError.title,
        message: formattedError.message,
      });

      throw error; // Re-throw for form handling
    }
  }, [login, authLogin, showToast]);

  const handleForgotPassword = useCallback(() => {
    showToast({
      type: 'info',
      title: 'Password Reset',
      message: 'Password reset feature will be available soon',
    });
  }, [showToast]);

  return {
    // Simplified API with RTK Query loading state only
    submitAction,
    isLoading: isLoginLoading,
    error: loginError,
    handleForgotPassword,
  };
};

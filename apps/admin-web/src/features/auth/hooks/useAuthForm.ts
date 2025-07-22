'use client';

// ✅ Import shared business logic
import { validateEmail, validatePassword } from '@evc/shared-business-logic';
import { useCallback } from 'react';
import { getApiErrorMessage } from '@/shared/api/apiHelpers';
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

      if (result.success) {
        // Use auth middleware to handle login (Redux + cookies + navigation)
        authLogin({
          user: result.data.user,
          token: result.data.token,
        });

        showToast({
          type: 'success',
          title: 'Welcome back!',
          message: 'Successfully signed in',
        });

        return { success: true };
      }

      throw new Error('Login failed. Please check your credentials.');
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);

      showToast({
        type: 'error',
        title: 'Sign in failed',
        message: errorMessage,
      });

      throw error; // Re-throw for form handling
    }
  }, [login, authLogin, showToast]);

  const handleForgotPassword = useCallback(() => {
    showToast({
      type: 'info',
      title: 'Coming Soon',
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

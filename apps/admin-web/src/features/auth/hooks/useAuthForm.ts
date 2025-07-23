'use client';

// ✅ Import shared business logic
import { validateEmail, validatePassword } from '@evc/shared-business-logic';
import { useCallback, useRef } from 'react';
import { formatApiError } from '@/shared/api/apiHelpers';
import { useToast } from '@/shared/ui';
import { useLoginMutation } from '../authApi';
import { useAuthMiddleware } from './useAuthMiddleware';

export const useAuthForm = () => {
  const { showToast } = useToast();
  const [login, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
  const { login: authLogin } = useAuthMiddleware();
  
  // Request deduplication to prevent rapid successive calls
  const lastSubmissionRef = useRef<number>(0);
  const activeRequestRef = useRef<Promise<any> | null>(null);

  // Simplified login action without useActionState
  const submitAction = useCallback(async (formData: FormData) => {
    try {
      // Request deduplication: prevent rapid successive calls
      const now = Date.now();
      if (now - lastSubmissionRef.current < 2000) { // 2 second minimum between requests
        console.warn('🛑 Login request blocked - too frequent');
        throw new Error('Please wait before trying again');
      }

      // If there's an active request, wait for it to complete
      if (activeRequestRef.current) {
        console.warn('🛑 Login request blocked - already in progress');
        throw new Error('Login already in progress');
      }

      lastSubmissionRef.current = now;

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

      // Perform login with active request tracking
      const loginPromise = login({ email, password }).unwrap();
      activeRequestRef.current = loginPromise;

      try {
        const result = await loginPromise;
        


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
      } finally {
        // Clear active request reference
        activeRequestRef.current = null;
      }
    } catch (error) {
      // Clear active request reference on error
      activeRequestRef.current = null;
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

"use client";

import { useActionState, useCallback } from 'react'; // React 19: New hook!
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/store/hooks';
import { getApiErrorMessage } from '@/shared/api/apiHelpers';
import { useToast } from '@/shared/ui';
import { useLoginMutation } from '../authApi';
import { loginSuccess } from '../authSlice';
// ✅ Import shared business logic
import { validateEmail, validatePassword } from '@evc/shared-business-logic';

// React 19: Action state interface
interface LoginState {
  success?: boolean;
  error?: string;
  pending?: boolean;
}



export const useAuthForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const [login] = useLoginMutation();

  // React 19: useActionState replaces complex state management!
  const [state, submitAction, isPending] = useActionState(
    async (
      previousState: LoginState | null,
      formData: FormData,
    ): Promise<LoginState> => {
      try {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password) {
          return {
            success: false,
            error: 'Please fill in all fields',
          };
        }

        // ✅ Use shared business logic instead of inline validation
        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
          return {
            success: false,
            error: emailValidation.error,
          };
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
          return {
            success: false,
            error: passwordValidation.error,
          };
        }

        // Perform login
        const result = await login({ email, password }).unwrap();

        if (result.success) {
          dispatch(
            loginSuccess({
              user: result.data.user,
              token: result.data.token,
            }),
          );

          showToast({
            type: 'success',
            title: 'Welcome back!',
            message: 'Successfully signed in',
          });

          // Navigate to dashboard
          router.push('/');

          return {
            success: true,
          };
        }

        return {
          success: false,
          error: 'Login failed. Please check your credentials.',
        };
      } catch (error) {
        const errorMessage = getApiErrorMessage(error);

        showToast({
          type: 'error',
          title: 'Sign in failed',
          message: errorMessage,
        });

        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    null, // Initial state
  );

  const handleForgotPassword = useCallback(() => {
    showToast({
      type: 'info',
      title: 'Coming Soon',
      message: 'Password reset feature will be available soon',
    });
  }, [showToast]);

  return {
    // React 19: Much cleaner API!
    submitAction,
    isPending,
    error: state?.error,
    success: state?.success,
    handleForgotPassword,
  };
};

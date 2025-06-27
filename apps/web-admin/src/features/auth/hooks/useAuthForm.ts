import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/store/hooks';
import { getApiErrorMessage } from '@/shared/api/apiHelpers';
import { useToast } from '@/shared/ui';
import { useLoginMutation } from '../authApi';
import { loginSuccess } from '../authSlice';
import type { LoginFormData } from '../types/auth.types';

export const useAuthForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const [login, { isLoading }] = useLoginMutation();

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, email: e.target.value }));
    },
    [],
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, password: e.target.value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const result = await login({
          email: formData.email,
          password: formData.password,
        }).unwrap();

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
          navigate('/');
        }
      } catch (error) {
        showToast({
          type: 'error',
          title: 'Sign in failed',
          message: getApiErrorMessage(error),
        });
      }
    },
    [formData, login, dispatch, showToast, navigate],
  );

  const handleForgotPassword = useCallback(() => {
    showToast({
      type: 'info',
      title: 'Coming Soon',
      message: 'Password reset feature will be available soon',
    });
  }, [showToast]);

  return {
    formData,
    isLoading,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    handleForgotPassword,
  };
};

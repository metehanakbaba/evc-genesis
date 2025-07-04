import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/store/hooks';
import { getApiErrorMessage } from '@/shared/api/apiHelpers';
import { useToast } from '@/shared/ui';
import { useLoginMutation } from '../authApi';
import { loginSuccess } from '../authSlice';

// React 19 Ready: Enhanced form state interface  
interface EnhancedFormState {
  success?: boolean;
  error?: string;
  validationErrors?: Record<string, string>;
  lastSubmission?: Date;
  isPending?: boolean;
}

// React 19 Ready: Custom form status hook (similar to useFormStatus)
export const useCustomFormStatus = () => {
  const [status, setStatus] = useState({
    pending: false,
    data: null as FormData | null,
    method: null as string | null,
    action: null as string | null,
  });

  const setPending = useCallback((pending: boolean) => {
    setStatus(prev => ({ ...prev, pending }));
  }, []);

  const setFormData = useCallback((data: FormData | null) => {
    setStatus(prev => ({ ...prev, data }));
  }, []);

  return {
    ...status,
    setPending,
    setFormData,
  };
};

// React 19 Ready: Enhanced form hook with status
export const useEnhancedAuthForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const [login] = useLoginMutation();
  const [formState, setFormState] = useState<EnhancedFormState | null>(null);
  const { setPending } = useCustomFormStatus();

  // React 19 Ready: Form action handler
  const formAction = useCallback(async (formData: FormData) => {
    setPending(true);
    
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Client-side validation
    const validationErrors: Record<string, string> = {};
    
    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      validationErrors.password = 'Password is required';
    } else if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(validationErrors).length > 0) {
      setFormState({
        success: false,
        error: 'Please fix the validation errors',
        validationErrors,
        lastSubmission: new Date(),
        isPending: false,
      });
      setPending(false);
      return;
    }

    try {
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

        setFormState({
          success: true,
          lastSubmission: new Date(),
          isPending: false,
        });

        router.push('/');
      } else {
        setFormState({
          success: false,
          error: 'Login failed. Please check your credentials.',
          lastSubmission: new Date(),
          isPending: false,
        });
      }
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);
      
      showToast({
        type: 'error',
        title: 'Sign in failed',
        message: errorMessage,
      });

      setFormState({
        success: false,
        error: errorMessage,
        lastSubmission: new Date(),
        isPending: false,
      });
    } finally {
      setPending(false);
    }
  }, [login, dispatch, showToast, router, setPending]);

  return {
    formState,
    formAction,
    isPending: formState?.isPending || false,
  };
};

// React 19 Ready: Form status component
export const FormStatusIndicator: React.FC<{ isPending: boolean }> = ({ isPending }) => {
  if (!isPending) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-blue-400">
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent" />
      <span>Submitting form...</span>
    </div>
  );
};

// React 19 Ready: Field-level validation component
interface FieldValidationProps {
  fieldName: string;
  formState: EnhancedFormState | null;
}

export const FieldValidation: React.FC<FieldValidationProps> = ({
  fieldName,
  formState,
}) => {
  const error = formState?.validationErrors?.[fieldName];
  
  if (!error) return null;

  return (
    <div className="mt-1 text-sm text-red-400 flex items-center gap-1">
      <span className="text-red-400">⚠</span>
      {error}
    </div>
  );
}; 
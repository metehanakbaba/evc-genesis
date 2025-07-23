'use client';

import type React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';
import { ToastProvider } from '@/shared/ui/components/Feedback/Toast/ToastContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * 🔧 App Providers
 * 
 * Provides Redux store and toast notifications to the application.
 * Uses custom auth persistence instead of redux-persist for React 19 compatibility.
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ToastProvider>
        {children}
      </ToastProvider>
    </Provider>
  );
};

'use client';

import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';
import { ToastProvider } from '@/shared/ui/components/Feedback/Toast/ToastContext';
import { PerformanceMonitor } from '@/components/ui/Display/PerformanceMonitor/PerformanceMonitor';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <ToastProvider>
        {children}
        <PerformanceMonitor 
          enabled={process.env.NODE_ENV === 'development'}
          position="bottom-right"
          showDetails={true}
        />
      </ToastProvider>
    </Provider>
  );
}

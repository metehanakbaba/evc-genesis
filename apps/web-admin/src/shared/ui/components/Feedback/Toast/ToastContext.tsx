import type React from 'react';
import { createContext, useCallback, useContext, useState } from 'react';
import type { ToastProps } from './Toast';
import { Toast } from './Toast';

export interface ToastData {
  readonly type: 'success' | 'error' | 'warning' | 'info';
  readonly title: string;
  readonly message?: string;
  readonly duration?: number;
}

interface ToastContextType {
  readonly showToast: (toast: ToastData) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  readonly children: React.ReactNode;
}

/**
 * Toast provider component
 * Manages toast notifications globally
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((toast: ToastData) => {
    setToasts((prev) => [...prev, toast]);

    // Auto-remove toast after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t !== toast));
    }, toast.duration || 5000);
  }, []);

  return (
    // React 19: Using Context directly instead of Context.Provider!
    <ToastContext value={{ showToast }}>
      {children}
      
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast, index) => (
          <div
            key={index}
            className={`
              px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border
              ${toast.type === 'success' && 'bg-emerald-500/20 border-emerald-400/30 text-emerald-100'}
              ${toast.type === 'error' && 'bg-red-500/20 border-red-400/30 text-red-100'}
              ${toast.type === 'warning' && 'bg-amber-500/20 border-amber-400/30 text-amber-100'}
              ${toast.type === 'info' && 'bg-blue-500/20 border-blue-400/30 text-blue-100'}
            `}
          >
            <div className="font-medium">{toast.title}</div>
            {toast.message && <div className="text-sm opacity-90">{toast.message}</div>}
          </div>
        ))}
      </div>
    </ToastContext>
  );
};

/**
 * Hook to use toast notifications
 */
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
};

// Helper functions for common toast types
export const toast = {
  success: (title: string, message?: string, duration?: number) => {
    const data: ToastData = { 
      type: 'success', 
      title,
      ...(message && { message }),
      ...(duration && { duration })
    };
    // Note: These should be called within a component that has access to useToast
    return data;
  },
  error: (title: string, message?: string, duration?: number) => {
    const data: ToastData = { 
      type: 'error', 
      title,
      ...(message && { message }),
      ...(duration && { duration })
    };
    return data;
  },
  warning: (title: string, message?: string, duration?: number) => {
    const data: ToastData = { 
      type: 'warning', 
      title,
      ...(message && { message }),
      ...(duration && { duration })
    };
    return data;
  },
  info: (title: string, message?: string, duration?: number) => {
    const data: ToastData = { 
      type: 'info', 
      title,
      ...(message && { message }),
      ...(duration && { duration })
    };
    return data;
  },
};

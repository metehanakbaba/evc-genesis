import type React from 'react';
import { createContext, useCallback, useContext, useState } from 'react';
import type { ToastProps } from './Toast';
import { Toast } from './Toast';

interface ToastData extends Omit<ToastProps, 'id' | 'onClose' | 'show'> {
  id?: string;
}

interface ToastContextValue {
  showToast: (toast: ToastData) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/**
 * Toast provider component
 * Manages toast notifications globally
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);

  const showToast = useCallback((toast: ToastData) => {
    const id = toast.id || Date.now().toString();

    setToasts((prev) => [
      ...prev,
      {
        ...toast,
        id,
        show: true,
        onClose: (toastId: string) => {
          setToasts((prevToasts) =>
            prevToasts.map((t) =>
              t.id === toastId ? { ...t, show: false } : t,
            ),
          );

          // Remove toast after animation completes
          setTimeout(() => {
            setToasts((prevToasts) =>
              prevToasts.filter((t) => t.id !== toastId),
            );
          }, 300);
        },
      },
    ]);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

/**
 * Hook to use toast notifications
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

// Helper functions for common toast types
export const toast = {
  success: (title: string, message?: string, duration?: number) => {
    const { showToast } = useToast();
    const data: ToastData = { type: 'success', title };
    if (message) {
      data.message = message;
    }
    if (duration) {
      data.duration = duration;
    }
    showToast(data);
  },
  error: (title: string, message?: string, duration?: number) => {
    const { showToast } = useToast();
    const data: ToastData = { type: 'error', title };
    if (message) {
      data.message = message;
    }
    if (duration) {
      data.duration = duration;
    }
    showToast(data);
  },
  warning: (title: string, message?: string, duration?: number) => {
    const { showToast } = useToast();
    const data: ToastData = { type: 'warning', title };
    if (message) {
      data.message = message;
    }
    if (duration) {
      data.duration = duration;
    }
    showToast(data);
  },
  info: (title: string, message?: string, duration?: number) => {
    const { showToast } = useToast();
    const data: ToastData = { type: 'info', title };
    if (message) {
      data.message = message;
    }
    if (duration) {
      data.duration = duration;
    }
    showToast(data);
  },
};

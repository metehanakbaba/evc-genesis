/**
 * Feedback Category - User feedback components
 * Components for providing feedback, errors, and notifications
 */

// Error Handling
export { ErrorBoundary } from './ErrorBoundary/ErrorBoundary';

// Notifications
export { Toast } from './Toast/Toast';
export type { ToastProps } from './Toast/Toast';
export { ToastProvider, useToast, toast } from './Toast/ToastContext';

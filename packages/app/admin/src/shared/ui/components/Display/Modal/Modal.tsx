import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type React from 'react';
import { Button } from '../../Forms/Button/Button';

export interface ModalProps {
  /** Open state */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal description */
  description?: string;
  /** Modal size with revolutionary scaling */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Show close button */
  showCloseButton?: boolean;
  /** Prevent closing on backdrop click */
  disableBackdropClick?: boolean;
  /** Footer content */
  footer?: React.ReactNode;
  /** Children content */
  children: React.ReactNode;
  /** Custom panel className */
  className?: string;
  /** Revolutionary variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

// Revolutionary size system with floating effects
const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
  full: 'max-w-7xl mx-4',
};

// Revolutionary variant colors for glassmorphism
const variantClasses = {
  default: 'from-gray-800/90 via-gray-700/80 to-gray-900/90 border-gray-600/30',
  primary: 'from-blue-800/90 via-blue-700/80 to-blue-900/90 border-blue-400/30',
  success:
    'from-emerald-800/90 via-emerald-700/80 to-emerald-900/90 border-emerald-400/30',
  warning:
    'from-amber-800/90 via-amber-700/80 to-amber-900/90 border-amber-400/30',
  danger: 'from-red-800/90 via-red-700/80 to-red-900/90 border-red-400/30',
};

/**
 * Revolutionary Modal component with glassmorphism and floating effects
 * Ultra-sophisticated modal with backdrop-blur and gradient backgrounds
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  showCloseButton = true,
  disableBackdropClick = false,
  footer,
  children,
  className = '',
  variant = 'default',
}) => {
  const handleClose = () => {
    if (!disableBackdropClick) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      {/* Revolutionary glassmorphism backdrop */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gradient-to-br from-black/60 via-gray-900/40 to-black/60 backdrop-blur-sm transition-all data-[closed]:opacity-0 data-[enter]:duration-500 data-[leave]:duration-300 data-[enter]:ease-out data-[leave]:ease-in"
      />

      {/* Revolutionary floating background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Modal Container */}
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className={clsx(
              // Revolutionary base styling
              'relative w-full transform overflow-hidden text-left align-middle transition-all',
              // Revolutionary glassmorphism
              'bg-gradient-to-br backdrop-blur-2xl border shadow-2xl',
              // Revolutionary size
              sizeClasses[size],
              // Revolutionary variant
              variantClasses[variant],
              // Revolutionary rounded corners
              'rounded-3xl',
              // Revolutionary animations
              'data-[closed]:opacity-0 data-[closed]:scale-90 data-[closed]:translate-y-8',
              'data-[enter]:duration-500 data-[leave]:duration-300',
              'data-[enter]:ease-out data-[leave]:ease-in',
              // Revolutionary floating effect
              'hover:scale-[1.01] hover:-translate-y-1 hover:shadow-3xl transition-transform duration-300',
              className,
            )}
          >
            {/* Revolutionary floating accent dots */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-white/40 to-white/20 rounded-full animate-pulse" />
            <div className="absolute -top-1 -left-2 w-3 h-3 bg-gradient-to-r from-blue-400/40 to-blue-300/20 rounded-full animate-pulse delay-500" />

            {/* Revolutionary gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-30 rounded-[inherit] pointer-events-none" />

            {/* Header */}
            {(title || showCloseButton) && (
              <div className="relative z-10 flex items-start justify-between p-8 pb-6">
                <div className="flex-1 pr-4">
                  {title && (
                    <DialogTitle
                      as="h3"
                      className="font-bold text-2xl text-white mb-2"
                    >
                      {title}
                    </DialogTitle>
                  )}
                  {description && (
                    <p className="text-gray-300/80 text-sm leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <button
                    type="button"
                    className={clsx(
                      'group relative rounded-full p-2.5 transition-all duration-300',
                      'bg-white/10 hover:bg-white/20 backdrop-blur-xl',
                      'border border-white/10 hover:border-white/20',
                      'hover:scale-110 hover:-translate-y-0.5',
                      'focus:outline-none focus:ring-2 focus:ring-white/30',
                    )}
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5 text-white/80 group-hover:text-white transition-colors" />

                    {/* Revolutionary close button accent */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400/60 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="relative z-10 px-8 pb-8">
              <div className="text-gray-100">{children}</div>
            </div>

            {/* Footer */}
            {footer && (
              <div
                className={clsx(
                  'relative z-10 px-8 py-6 mt-4',
                  'border-t border-white/10',
                  'bg-gradient-to-r from-white/5 to-transparent',
                )}
              >
                {footer}
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

// Revolutionary Modal Footer presets with glassmorphism
export const ModalFooter = {
  Confirm: ({
    onConfirm,
    onCancel,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmLoading = false,
    confirmDisabled = false,
  }: {
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    confirmLoading?: boolean;
    confirmDisabled?: boolean;
  }) => (
    <div className="flex justify-end gap-4">
      <Button variant="secondary" onClick={onCancel}>
        {cancelText}
      </Button>
      <Button
        variant="primary"
        onClick={onConfirm}
        loading={confirmLoading}
        disabled={confirmDisabled}
      >
        {confirmText}
      </Button>
    </div>
  ),

  Delete: ({
    onDelete,
    onCancel,
    deleteText = 'Delete',
    cancelText = 'Cancel',
    deleteLoading = false,
  }: {
    onDelete: () => void;
    onCancel: () => void;
    deleteText?: string;
    cancelText?: string;
    deleteLoading?: boolean;
  }) => (
    <div className="flex justify-end gap-4">
      <Button variant="secondary" onClick={onCancel}>
        {cancelText}
      </Button>
      <Button variant="destructive" onClick={onDelete} loading={deleteLoading}>
        {deleteText}
      </Button>
    </div>
  ),

  Action: ({
    onAction,
    onCancel,
    actionText = 'Continue',
    cancelText = 'Cancel',
    actionLoading = false,
    actionDisabled = false,
    variant = 'primary',
  }: {
    onAction: () => void;
    onCancel: () => void;
    actionText?: string;
    cancelText?: string;
    actionLoading?: boolean;
    actionDisabled?: boolean;
    variant?: 'primary' | 'success' | 'warning' | 'danger';
  }) => {
    // Map modal variants to button variants
    const getButtonVariant = (modalVariant: 'primary' | 'success' | 'warning' | 'danger'): 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' => {
      switch (modalVariant) {
        case 'danger':
          return 'destructive';
        case 'warning':
          return 'outline';
        case 'success':
          return 'primary';
        case 'primary':
        default:
          return 'primary';
      }
    };

    const buttonVariant = getButtonVariant(variant);

    return (
      <div className="flex justify-end gap-4">
        <Button variant="secondary" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button
          variant={buttonVariant}
          onClick={onAction}
          loading={actionLoading}
          disabled={actionDisabled}
        >
          {actionText}
        </Button>
      </div>
    );
  },
};

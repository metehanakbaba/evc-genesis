import type React from 'react';
import { clsx } from 'clsx';

export interface CardProps {
  /** Revolutionary card variant */
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'glass';
  /** Revolutionary size variants */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Floating effect intensity */
  floating?: 'none' | 'subtle' | 'medium' | 'strong';
  /** Click handler - makes card interactive with enhanced effects */
  onClick?: () => void;
  /** Custom class names */
  className?: string;
  /** Children content */
  children: React.ReactNode;
  /** Show floating accent dot */
  showAccent?: boolean;
  /** Enable hover animation */
  animated?: boolean;
}

/**
 * Revolutionary Card component with glassmorphism and floating effects
 * Modern design with backdrop-blur and gradient backgrounds
 */
const CardComponent: React.FC<CardProps> = ({
  variant = 'default',
  size = 'md',
  floating = 'medium',
  onClick,
  className = '',
  children,
  showAccent = true,
  animated = true,
}) => {
  // Revolutionary glassmorphism variants
  const variantClasses = {
    default:
      'bg-gradient-to-br from-gray-800/40 via-gray-700/30 to-gray-900/50 border-gray-600/30',
    primary:
      'bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-blue-600/15 border-blue-400/25',
    secondary:
      'bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-purple-600/15 border-purple-400/25',
    success:
      'bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-emerald-600/15 border-emerald-400/25',
    warning:
      'bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-amber-600/15 border-amber-400/25',
    danger:
      'bg-gradient-to-br from-red-500/10 via-red-400/5 to-red-600/15 border-red-400/25',
    glass: 'bg-gray-900/20 border-white/10',
  };

  // Revolutionary size system
  const sizeClasses = {
    sm: 'p-4 rounded-lg',
    md: 'p-6 rounded-xl',
    lg: 'p-8 rounded-2xl',
    xl: 'p-10 rounded-3xl',
  };

  // Revolutionary floating effects
  const floatingClasses = {
    none: '',
    subtle: 'hover:scale-[1.01] hover:-translate-y-0.5',
    medium: 'hover:scale-[1.02] hover:-translate-y-1',
    strong: 'hover:scale-105 hover:-translate-y-2',
  };

  // Revolutionary animation classes
  const animationClasses = animated
    ? 'transition-all duration-500 ease-out'
    : '';

  // Revolutionary interactive effects
  const interactiveClasses = onClick
    ? 'cursor-pointer active:scale-95 hover:shadow-2xl hover:shadow-white/5'
    : '';

  const combinedClasses = clsx(
    // Base revolutionary glassmorphism
    'relative backdrop-blur-xl border shadow-xl',
    // Size and shape
    sizeClasses[size],
    // Color variant
    variantClasses[variant],
    // Floating effects
    floating !== 'none' && floatingClasses[floating],
    // Animation
    animationClasses,
    // Interactive
    interactiveClasses,
    // Custom classes
    className,
  );

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={combinedClasses}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      {/* Revolutionary floating accent dot */}
      {showAccent && variant !== 'glass' && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-white/30 to-white/10 rounded-full animate-pulse opacity-60" />
      )}

      {/* Revolutionary gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-[inherit] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </Component>
  );
};

// Revolutionary Card sub-components with glassmorphism
export const CardHeader: React.FC<{
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}> = ({ title, description, action, className = '' }) => (
  <div className={clsx('border-b border-white/10 pb-4 mb-4', className)}>
    <div className="flex items-start justify-between">
      <div>
        <h3 className="font-bold text-xl text-white mb-1">{title}</h3>
        {description && (
          <p className="text-gray-300 text-sm opacity-80">{description}</p>
        )}
      </div>
      {action && <div className="ml-4 shrink-0">{action}</div>}
    </div>
  </div>
);

export const CardBody: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={clsx('text-gray-100', className)}>{children}</div>
);

export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={clsx('border-t border-white/10 pt-4 mt-4', className)}>
    {children}
  </div>
);

// Create Revolutionary Card namespace with sub-components
export const Card = Object.assign(CardComponent, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

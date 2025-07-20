import type React from 'react';
import { ActionButton, type ActionButtonVariant } from '../../atoms/ActionButton/ActionButton';
import { StatusBadge, type StatusVariant } from '../../atoms/StatusBadge/StatusBadge';

export interface DataGridCardAction {
  readonly label?: string;
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly variant: ActionButtonVariant;
  readonly onClick: () => void;
}

export interface DataGridCardStatus {
  readonly text: string;
  readonly variant: StatusVariant;
  readonly icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly pulse?: boolean;
}

export interface DataGridCardProps {
  readonly id: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly description?: string;
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly status?: DataGridCardStatus;
  readonly actions?: DataGridCardAction[];
  readonly metadata?: Record<string, React.ReactNode>;
  readonly variant?: 'default' | 'teal' | 'blue' | 'purple' | 'emerald';
  readonly className?: string;
  readonly animationDelay?: number;
}

/**
 * 🃏 DataGridCard Molecule Component
 * 
 * Standard card layout for grid view across all data management pages.
 * Supports status badges, metadata display, and action buttons.
 */
export const DataGridCard: React.FC<DataGridCardProps> = ({
  id,
  title,
  subtitle,
  description,
  icon: Icon,
  status,
  actions = [],
  metadata = {},
  variant = "default",
  className = "",
  animationDelay = 0,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'teal':
        return {
          card: 'from-teal-500/15 via-teal-400/8 to-transparent border-teal-400/25 hover:border-teal-300/40 hover:shadow-teal-500/20',
          icon: 'from-teal-500/25 via-teal-400/15 to-cyan-400/10 border-teal-400/30',
          iconColor: 'text-teal-400',
          accent: 'bg-gradient-to-r from-teal-500 to-cyan-400',
        };
      case 'blue':
        return {
          card: 'from-blue-500/15 via-blue-400/8 to-transparent border-blue-400/25 hover:border-blue-300/40 hover:shadow-blue-500/20',
          icon: 'from-blue-500/25 via-blue-400/15 to-cyan-400/10 border-blue-400/30',
          iconColor: 'text-blue-400',
          accent: 'bg-gradient-to-r from-blue-500 to-cyan-400',
        };
      case 'purple':
        return {
          card: 'from-purple-500/15 via-purple-400/8 to-transparent border-purple-400/25 hover:border-purple-300/40 hover:shadow-purple-500/20',
          icon: 'from-purple-500/25 via-purple-400/15 to-violet-400/10 border-purple-400/30',
          iconColor: 'text-purple-400',
          accent: 'bg-gradient-to-r from-purple-500 to-violet-400',
        };
      case 'emerald':
        return {
          card: 'from-emerald-500/15 via-emerald-400/8 to-transparent border-emerald-400/25 hover:border-emerald-300/40 hover:shadow-emerald-500/20',
          icon: 'from-emerald-500/25 via-emerald-400/15 to-green-400/10 border-emerald-400/30',
          iconColor: 'text-emerald-400',
          accent: 'bg-gradient-to-r from-emerald-500 to-green-400',
        };
      default:
        return {
          card: 'from-gray-500/15 via-gray-400/8 to-transparent border-gray-400/25 hover:border-gray-300/40 hover:shadow-gray-500/20',
          icon: 'from-gray-500/25 via-gray-400/15 to-gray-300/10 border-gray-400/30',
          iconColor: 'text-gray-400',
          accent: 'bg-gradient-to-r from-gray-500 to-gray-400',
        };
    }
  };

  const variantClasses = getVariantClasses();

  return (
    <div
      key={id}
      className={`
        group relative p-8 
        bg-gradient-to-br ${variantClasses.card}
        border rounded-2xl 
        hover:scale-105 hover:-translate-y-2 hover:shadow-3xl 
        transition-all duration-500 ease-out 
        backdrop-blur-xl shadow-2xl
        ${className}
      `}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Floating accent dots */}
      <div className={`absolute -top-2 -right-2 w-4 h-4 ${variantClasses.accent} rounded-full animate-pulse opacity-75`}></div>
      <div className={`absolute top-4 -left-1 w-2 h-2 ${variantClasses.iconColor} rounded-full animate-ping opacity-60`}></div>

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className={`absolute top-8 right-8 w-32 h-32 border border-${variant === 'default' ? 'gray' : variant}-400/20 rounded-full`}></div>
        <div className={`absolute bottom-6 left-6 w-20 h-20 border border-${variant === 'default' ? 'gray' : variant}-400/15 rounded-full`}></div>
      </div>

      <div className="relative z-10 flex items-start justify-between mb-6">
        {/* Icon */}
        <div className={`
          w-16 h-16 rounded-2xl bg-gradient-to-br ${variantClasses.icon} 
          border flex items-center justify-center 
          backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300
        `}>
          <Icon className={`w-8 h-8 ${variantClasses.iconColor} drop-shadow-lg`} />
        </div>
        
        {/* Status Badge */}
        {status && (
          <StatusBadge
            text={status.text}
            variant={status.variant}
            icon={status.icon}
            pulse={status.pulse}
            size="sm"
          />
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-2">
          {title}
        </h3>
        {subtitle && (
          <p className="text-gray-400 text-sm mb-3">
            {subtitle}
          </p>
        )}
        {description && (
          <p className="text-gray-500 text-xs mb-3">
            {description}
          </p>
        )}

        {/* Metadata */}
        {Object.keys(metadata).length > 0 && (
          <div className="grid grid-cols-2 gap-3 text-sm">
            {Object.entries(metadata).map(([key, value]) => (
              <div key={key} className="text-gray-300">
                {value}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {actions.length > 0 && (
        <div className="flex items-center gap-2">
          {actions.map((action, index) => (
            <ActionButton
              key={index}
              onClick={action.onClick}
              variant={action.variant}
              icon={action.icon}
              label={action.label}
              size="sm"
              className={index === 0 && action.label ? "flex-1" : ""}
            />
          ))}
        </div>
      )}
    </div>
  );
}; 
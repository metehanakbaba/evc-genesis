import { Button } from '@ui/forms';
import type React from 'react';

export interface PageHeaderProps {
  title: string;
  description: string;
  variant?: 'purple' | 'teal' | 'emerald' | 'blue';
  actionButton?: {
    label: string;
    onClick: () => void;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    iconAnimation?: 'rotate-90' | 'rotate-12';
  };
  indicator?: React.ReactNode;
  className?: string;
}

/**
 * 🚀 Revolutionary Page Header Component
 * Consistent header design across all admin pages
 *
 * Features:
 * - Theme-based gradient buttons
 * - Smooth animations and shine effects
 * - Flexible action buttons and indicators
 * - Consistent typography and spacing
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  variant = 'blue',
  actionButton,
  indicator,
  className = '',
}) => {
  // Theme-based color configurations
  const themeConfig = {
    purple: {
      gradient: 'from-purple-600 via-purple-500 to-purple-600',
      hoverGradient:
        'hover:from-purple-500 hover:via-purple-400 hover:to-purple-500',
      shadow: 'shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-400/30',
      border: 'border-purple-400/20 hover:border-purple-300/40',
    },
    teal: {
      gradient: 'from-teal-600 via-teal-500 to-teal-600',
      hoverGradient: 'hover:from-teal-500 hover:via-teal-400 hover:to-teal-500',
      shadow: 'shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-400/30',
      border: 'border-teal-400/20 hover:border-teal-300/40',
    },
    emerald: {
      gradient: 'from-emerald-600 via-emerald-500 to-emerald-600',
      hoverGradient:
        'hover:from-emerald-500 hover:via-emerald-400 hover:to-emerald-500',
      shadow:
        'shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-400/30',
      border: 'border-emerald-400/20 hover:border-emerald-300/40',
    },
    blue: {
      gradient: 'from-blue-600 via-blue-500 to-blue-600',
      hoverGradient: 'hover:from-blue-500 hover:via-blue-400 hover:to-blue-500',
      shadow: 'shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-400/30',
      border: 'border-blue-400/20 hover:border-blue-300/40',
    },
  };

  const currentTheme = themeConfig[variant];

  return (
    <header className={`flex items-center justify-between mb-8 ${className}`}>
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-gray-400">{description}</p>
      </div>

      <div className="flex items-center gap-3">
        {actionButton && (
          <Button
            variant="primary"
            size="md"
            onClick={actionButton.onClick}
            className={`
              relative overflow-hidden group/action
              bg-gradient-to-r ${currentTheme.gradient}
              ${currentTheme.hoverGradient}
              text-white font-semibold
              shadow-lg ${currentTheme.shadow}
              border ${currentTheme.border}
              transition-all duration-300 ease-out
              hover:scale-[1.02] active:scale-[0.98]
              flex items-center gap-2.5 px-5 py-2.5
              before:absolute before:inset-0 before:bg-gradient-to-r 
              before:from-transparent before:via-white/20 before:to-transparent
              before:translate-x-[-100%] hover:before:translate-x-[100%]
              before:transition-transform before:duration-700
              focus:ring-2 focus:ring-blue-400/30 focus:outline-none
            `}
          >
            <div className="flex items-center gap-2.5 relative z-10">
              <actionButton.icon
                className={`w-4 h-4 ${
                  actionButton.iconAnimation === 'rotate-90'
                    ? 'group-hover/action:rotate-90'
                    : actionButton.iconAnimation === 'rotate-12'
                      ? 'group-hover/action:rotate-12'
                      : ''
                } transition-all duration-300 ease-out`}
              />
              <span className="font-medium">{actionButton.label}</span>
            </div>
          </Button>
        )}

        {indicator && indicator}
      </div>
    </header>
  );
};

export default PageHeader;

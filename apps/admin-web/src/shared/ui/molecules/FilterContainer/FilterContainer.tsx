import type React from 'react';

export interface FilterContainerProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly variant?: 'default' | 'compact' | 'spaced';
}

/**
 * 🎛️ FilterContainer Molecule Component
 * 
 * Flexible container for organizing filter components.
 * Provides consistent spacing and layout for filter elements.
 */
export const FilterContainer: React.FC<FilterContainerProps> = ({
  children,
  className = "",
  variant = "default",
}) => {
  const variantClasses = {
    default: "space-y-4",
    compact: "space-y-2",
    spaced: "space-y-6",
  };

  return (
    <div className={`
      bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-xl
      ${variantClasses[variant]}
      ${className}
    `}>
      {children}
    </div>
  );
};
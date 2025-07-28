import React from "react";


interface IconValueRowProps {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary'; // New variant prop
  className?: string; // New className prop
}

export const IconValueRow: React.FC<IconValueRowProps> = ({
  icon,
  label,
  value,
  variant = 'default', // Default variant
  className = '', // Default className
}) => {
  const variantClasses = {
    default: 'text-gray-300',
    primary: 'text-blue-500',
    secondary: 'text-green-500',
  };

  return (
    <div className={`flex justify-between items-center ${variantClasses[variant]} ${className}`}>
    <div className="flex items-center gap-2 text-sm">
      {icon}
      <span>{label}</span>
    </div>
    <div className="text-sm text-white">{value}</div>
  </div>
);
}

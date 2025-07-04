'use client';

import {
  Description,
  Field,
  Label,
} from '@headlessui/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import React, { useCallback, useState } from 'react';
import {
  type ComponentSize,
  getComponentSize,
} from '../../../theme/theme.config';

interface InputProps {
  label?: string;
  description?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  size?: ComponentSize;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  name?: string;
  autoComplete?: string;
  showPasswordToggle?: boolean;
  leftIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  rightIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  ref?: React.Ref<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  label,
  description,
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  type = 'text',
  disabled = false,
  readOnly = false,
  required = false,
  error,
  size = 'md',
  className,
  inputClassName,
  labelClassName,
  descriptionClassName,
  errorClassName,
  name,
  autoComplete,
  showPasswordToggle = false,
  leftIcon,
  rightIcon,
  ref,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleTogglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  // Get size classes from design tokens
  const sizeClasses = getComponentSize('input', size);

  // Modern dark theme input classes
  const inputClasses = clsx(
    'w-full rounded-lg border text-white placeholder-gray-400 transition-all duration-200',
    'bg-gray-800/50 backdrop-blur-sm',
    sizeClasses,
    // Focus states with clean blue accent
    isFocused
      ? 'border-blue-500/50 ring-2 ring-blue-500/20 bg-gray-800/70 shadow-lg'
      : 'border-gray-700/50 hover:border-gray-600/70 hover:bg-gray-800/60',
    // Error states
    error && 'border-red-500/50 ring-2 ring-red-500/20 bg-red-900/10',
    // Disabled state
    disabled && 'opacity-50 cursor-not-allowed',
    // Icon padding adjustments
    leftIcon && 'pl-10',
    (showPasswordToggle || rightIcon) && 'pr-12',
    inputClassName,
  );

  const inputType =
    showPasswordToggle && type === 'password'
      ? showPassword
        ? 'text'
        : 'password'
      : type;

  const inputElement = (
    <div className="relative group">
      {/* Left Icon */}
      {leftIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          {React.createElement(leftIcon, {
            className: 'w-5 h-5 text-gray-400',
          })}
        </div>
      )}

      <input
        ref={ref}
        type={inputType}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        className={inputClasses}
        {...props}
      />

      {/* Right Icon */}
      {rightIcon && !showPasswordToggle && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
          {React.createElement(rightIcon, {
            className: 'w-5 h-5 text-gray-400',
          })}
        </div>
      )}

      {/* Password toggle button */}
      {showPasswordToggle && type === 'password' && (
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-400/70 hover:text-gray-300 transition-colors"
        >
          {showPassword ? (
            // @ts-ignore React 19 compatibility
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            // @ts-ignore React 19 compatibility
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      )}

      {/* Subtle focus overlay */}
      <div
        className={`absolute inset-0 rounded-lg transition-opacity duration-200 pointer-events-none ${
          isFocused ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-400/3 rounded-lg" />
      </div>
    </div>
  );

  if (!label && !description && !error) {
    return inputElement;
  }

  return (
    <div className={clsx('w-full', className)}>
      <Field>
        {label && (
          <Label
            className={clsx(
              'block text-sm font-medium text-gray-300 mb-2',
              labelClassName,
            )}
          >
            {label}
            {required && <span className="text-rose-400/80 ml-1">*</span>}
          </Label>
        )}
        {description && (
          <Description
            className={clsx(
              'text-sm text-gray-400/80 mb-2',
              descriptionClassName,
            )}
          >
            {description}
          </Description>
        )}
        <div>{inputElement}</div>
        {error && (
          <Description
            className={clsx('mt-2 text-sm text-rose-400/80', errorClassName)}
          >
            {error}
          </Description>
        )}
      </Field>
    </div>
  );
};

Input.displayName = 'Input';

export { Input };
export type { InputProps };

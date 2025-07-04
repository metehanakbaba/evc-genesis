import {
  Description,
  Field,
  Textarea as HeadlessTextarea,
  Label,
} from '@headlessui/react';
import clsx from 'clsx';
import { forwardRef } from 'react';

interface TextareaProps {
  label?: string;
  description?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  minLength?: number;
  size?: 'sm' | 'md' | 'lg';
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  className?: string;
  textareaClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  /** Revolutionary floating effect */
  floating?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      description,
      placeholder,
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      disabled = false,
      readOnly = false,
      required = false,
      error,
      rows = 3,
      cols,
      maxLength,
      minLength,
      size = 'md',
      resize = 'vertical',
      className,
      textareaClassName,
      labelClassName,
      descriptionClassName,
      errorClassName,
      floating = false,
      ...props
    },
    ref,
  ) => {
    // Revolutionary glassmorphism base styles
    const textareaBaseClasses = clsx(
      'relative block w-full transition-all duration-300 ease-out group',
      // Revolutionary glassmorphism background
      'bg-gray-800/40 backdrop-blur-xl border',
      // Revolutionary rounded corners
      'rounded-xl',
      // Revolutionary text styling
      'text-white placeholder-gray-400',
      // Revolutionary focus outline removal
      'focus:outline-none',
    );

    // Revolutionary size system with floating effects
    const sizeClasses = {
      sm: 'px-4 py-2.5 text-sm min-h-[80px]',
      md: 'px-5 py-3.5 text-sm min-h-[96px]',
      lg: 'px-6 py-4.5 text-base min-h-[112px]',
    };

    // Revolutionary resize classes
    const resizeClasses = {
      none: 'resize-none',
      both: 'resize',
      horizontal: 'resize-x',
      vertical: 'resize-y',
    };

    // Revolutionary state-based styling
    const stateClasses = clsx(
      // Error state
      error
        ? 'border-red-400/40 hover:border-red-300/60 focus:ring-2 focus:ring-red-400/30 focus:border-red-400/60'
        : 'border-gray-600/40 hover:border-gray-500/60 focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/60',
      // Revolutionary floating effects
      floating &&
        'hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20',
      // Disabled state
      disabled &&
        'opacity-50 cursor-not-allowed hover:scale-100 hover:translate-y-0',
      // Read-only state
      readOnly && 'cursor-default',
    );

    const textareaClasses = clsx(
      textareaBaseClasses,
      sizeClasses[size],
      resizeClasses[resize],
      stateClasses,
      textareaClassName,
    );

    const content = (
      <div className="relative">
        {/* Revolutionary floating accent dot */}
        {!disabled && !readOnly && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-blue-400/60 to-blue-300/40 rounded-full animate-pulse opacity-70 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        )}

        <HeadlessTextarea
          ref={ref}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          rows={rows}
          cols={cols}
          maxLength={maxLength}
          minLength={minLength}
          className={textareaClasses}
          {...props}
        />

        {/* Revolutionary gradient overlay on focus/hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 rounded-[inherit] pointer-events-none" />
      </div>
    );

    if (!label && !description && !error) {
      return content;
    }

    return (
      <div className={clsx('w-full', className)}>
        <Field>
          {label && (
            <Label
              className={clsx(
                'text-sm font-medium text-gray-300 mb-2 block',
                labelClassName,
              )}
            >
              {label}
              {required && <span className="text-red-400/80 ml-1">*</span>}
            </Label>
          )}
          {description && (
            <Description
              className={clsx(
                'text-sm text-gray-400/80 mb-3 block',
                descriptionClassName,
              )}
            >
              {description}
            </Description>
          )}
          {content}
          {error && (
            <Description
              className={clsx('mt-2 text-sm text-red-400/80', errorClassName)}
            >
              {error}
            </Description>
          )}
        </Field>
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };
export type { TextareaProps };

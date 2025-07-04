import { Checkbox as HeadlessCheckbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/16/solid';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

interface CheckboxProps {
  checked?: boolean | undefined;
  defaultChecked?: boolean | undefined;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  label?: string;
  description?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  checkboxClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      onChange,
      disabled = false,
      indeterminate = false,
      label,
      description,
      error,
      size = 'md',
      className,
      checkboxClassName,
      labelClassName,
      descriptionClassName,
      errorClassName,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
    };

    const iconSizeClasses = {
      sm: 'size-3',
      md: 'size-4',
      lg: 'size-6',
    };

    const checkboxClasses = clsx(
      'group rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset focus:not-data-focus:outline-none data-checked:bg-white data-focus:outline data-focus:outline-offset-2 data-focus:outline-white',
      sizeClasses[size],
      disabled && 'opacity-50 cursor-not-allowed',
      error && 'ring-red-400/50 data-focus:outline-red-400',
      checkboxClassName,
    );

    const checkboxProps = {
      ref,
      disabled,
      className: checkboxClasses,
      ...(checked !== undefined && { checked }),
      ...(defaultChecked !== undefined && { defaultChecked }),
      ...(onChange && { onChange }),
      ...props,
    };

    const content = (
      <HeadlessCheckbox {...checkboxProps}>
        {indeterminate ? (
          <div
            className={clsx(
              'bg-black rounded-sm mx-auto',
              iconSizeClasses[size],
            )}
            style={{ width: '60%', height: '2px' }}
          />
        ) : (
          <CheckIcon
            className={clsx(
              'hidden fill-black group-data-checked:block',
              iconSizeClasses[size],
            )}
          />
        )}
      </HeadlessCheckbox>
    );

    if (!label && !description && !error) {
      return content;
    }

    return (
      <div className={clsx('flex items-start gap-3', className)}>
        {content}
        <div className="flex-1">
          {label && (
            <label
              className={clsx(
                'text-sm/6 font-medium text-white cursor-pointer',
                labelClassName,
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p
              className={clsx('text-sm/6 text-white/50', descriptionClassName)}
            >
              {description}
            </p>
          )}
          {error && (
            <p className={clsx('mt-1 text-sm/6 text-red-400', errorClassName)}>
              {error}
            </p>
          )}
        </div>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
export type { CheckboxProps };

import { RadioGroup as HeadlessRadioGroup, Radio } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: RadioOption[];
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  radioClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      options = [],
      label,
      description,
      error,
      disabled = false,
      size = 'md',
      className,
      radioClassName,
      labelClassName,
      descriptionClassName,
      errorClassName,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: 'px-3 py-2 text-xs/5',
      md: 'px-5 py-4 text-sm/6',
      lg: 'px-6 py-5 text-base/7',
    };

    const iconSizeClasses = {
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
    };

    const radioClasses = clsx(
      'group relative flex cursor-pointer rounded-lg bg-white/5 text-white shadow-md transition focus:not-data-focus:outline-none data-checked:bg-white/10 data-focus:outline data-focus:outline-white',
      sizeClasses[size],
      disabled && 'opacity-50 cursor-not-allowed',
      error && 'data-focus:outline-red-400',
      radioClassName,
    );

    const content = (
      <div ref={ref} className={clsx('w-full', className)}>
        <HeadlessRadioGroup
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          className="space-y-2"
          {...props}
        >
          {options.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={radioClasses}
            >
              <div className="flex w-full items-center justify-between">
                <div>
                  <p className="font-semibold text-white">{option.label}</p>
                  {option.description && (
                    <p className="text-white/50">{option.description}</p>
                  )}
                </div>
                <CheckCircleIcon
                  className={clsx(
                    'fill-white opacity-0 transition group-data-checked:opacity-100',
                    iconSizeClasses[size],
                  )}
                />
              </div>
            </Radio>
          ))}
        </HeadlessRadioGroup>
      </div>
    );

    if (!label && !description && !error) {
      return content;
    }

    return (
      <div className={clsx('w-full', className)}>
        {label && (
          <label
            className={clsx(
              'text-sm/6 font-medium text-white mb-2 block',
              labelClassName,
            )}
          >
            {label}
          </label>
        )}
        {description && (
          <p
            className={clsx(
              'text-sm/6 text-white/50 mb-3',
              descriptionClassName,
            )}
          >
            {description}
          </p>
        )}
        {content}
        {error && (
          <p className={clsx('mt-2 text-sm/6 text-red-400', errorClassName)}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };
export type { RadioGroupProps, RadioOption };

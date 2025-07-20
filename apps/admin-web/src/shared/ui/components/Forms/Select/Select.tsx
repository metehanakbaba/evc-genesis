import {
  Description,
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Fragment, forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

interface SelectProps {
  label?: string;
  description?: string;
  error?: string;
  options?: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  buttonClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
}

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      description,
      error,
      options = [],
      value,
      defaultValue,
      onChange,
      disabled = false,
      required = false,
      placeholder = 'Select an option...',
      size = 'md',
      className,
      buttonClassName,
      labelClassName,
      descriptionClassName,
      errorClassName,
      ...props
    },
    ref,
  ) => {
    const selectedOption = options.find((option) => option.value === value);

    // Revolutionary glassmorphism button styles
    const buttonBaseClasses =
      'relative w-full text-left transition-all duration-300 ease-out group';

    // Revolutionary size system with floating effects
    const sizeClasses = {
      sm: 'px-4 py-2.5 text-sm rounded-lg',
      md: 'px-5 py-3.5 text-sm rounded-xl',
      lg: 'px-6 py-4.5 text-base rounded-xl',
    };

    const iconSizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    // Revolutionary glassmorphism button styles
    const buttonClasses = clsx(
      buttonBaseClasses,
      sizeClasses[size],
      // Revolutionary glassmorphism background
      'bg-gray-800/40 backdrop-blur-xl border',
      // Revolutionary focus and hover states
      error
        ? 'border-red-400/40 hover:border-red-300/60 focus:ring-2 focus:ring-red-400/30 focus:border-red-400/60'
        : 'border-gray-600/40 hover:border-gray-500/60 focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/60',
      // Revolutionary floating effects
      'hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20',
      // Disabled state
      disabled &&
        'opacity-50 cursor-not-allowed hover:scale-100 hover:translate-y-0',
      buttonClassName,
    );

    const selectElement = (
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative z-[1000]">
          <ListboxButton ref={ref} className={buttonClasses} {...props}>
            {/* Revolutionary floating accent dot */}
            {!disabled && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-blue-400/60 to-blue-300/40 rounded-full animate-pulse opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            )}

            <div className="flex items-center gap-3">
              {selectedOption?.icon && (
                <selectedOption.icon
                  className={clsx(
                    iconSizeClasses[size],
                    'text-gray-400 group-hover:text-gray-300 transition-colors',
                  )}
                />
              )}
              <span
                className={clsx(
                  'block truncate font-medium',
                  selectedOption ? 'text-white' : 'text-gray-400',
                )}
              >
                {selectedOption ? selectedOption.label : placeholder}
              </span>
            </div>

            <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <ChevronDownIcon
                className={clsx(
                  iconSizeClasses[size],
                  'text-gray-400 group-hover:text-gray-300 transition-all duration-300 group-hover:rotate-180',
                )}
                aria-hidden="true"
              />
            </span>

            {/* Revolutionary gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit] pointer-events-none" />
          </ListboxButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-2"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-2"
          >
            <ListboxOptions
              className={clsx(
                'absolute z-50 mt-2 w-full overflow-hidden rounded-xl shadow-2xl',
                // Revolutionary glassmorphism modal
                'bg-gray-800/70 backdrop-blur-2xl border border-gray-600/30',
                // Revolutionary floating effect
                'shadow-black/30',
                // Revolutionary ring
                'ring-1 ring-white/10',
              )}
            >
              <div className="max-h-60 overflow-auto">
                {options.map((option, index) => (
                  <ListboxOption
                    key={option.value}
                    className={({ active, selected }) =>
                      clsx(
                        'relative cursor-pointer select-none transition-all duration-200',
                        'px-5 py-3.5 first:pt-4 last:pb-4',
                        // Revolutionary hover states
                        active
                          ? 'bg-gradient-to-r from-blue-500/20 via-blue-400/15 to-blue-500/20 text-white transform scale-[1.01]'
                          : 'text-gray-300 hover:bg-white/5',
                        // Revolutionary selected state
                        selected && 'bg-blue-500/10',
                        // Disabled state
                        option.disabled && 'opacity-50 cursor-not-allowed',
                      )
                    }
                    value={option.value}
                    {...(option.disabled && { disabled: true })}
                  >
                    {({ selected, active }) => (
                      <div className="flex items-center gap-3">
                        {option.icon && (
                          <option.icon
                            className={clsx(
                              iconSizeClasses[size],
                              active ? 'text-blue-400' : 'text-gray-400',
                              'transition-colors duration-200',
                            )}
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <span
                            className={clsx(
                              'block truncate transition-all duration-200',
                              selected ? 'font-bold text-white' : 'font-medium',
                              active && 'text-white',
                            )}
                          >
                            {option.label}
                          </span>
                          {option.description && (
                            <span
                              className={clsx(
                                'text-xs mt-0.5 block',
                                active ? 'text-blue-200/80' : 'text-gray-400',
                              )}
                            >
                              {option.description}
                            </span>
                          )}
                        </div>
                        {selected && (
                          <CheckIcon
                            className={clsx(
                              iconSizeClasses[size],
                              'text-blue-400 animate-in zoom-in duration-200',
                            )}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    )}
                  </ListboxOption>
                ))}
              </div>
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    );

    if (!label && !description && !error) {
      return selectElement;
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
          {selectElement}
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

Select.displayName = 'Select';

export { Select };
export type { SelectProps, SelectOption };

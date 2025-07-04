import {
  Listbox as HeadlessListbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

interface ListboxOptionType {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ListboxProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: ListboxOptionType[];
  placeholder?: string;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  buttonClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
}

const Listbox = forwardRef<HTMLDivElement, ListboxProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      options = [],
      placeholder = 'Select an option...',
      label,
      description,
      error,
      disabled = false,
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
    const sizeClasses = {
      sm: 'px-2 py-1 text-xs/5',
      md: 'px-3 py-1.5 text-sm/6',
      lg: 'px-4 py-2 text-base/7',
    };

    const iconSizeClasses = {
      sm: 'size-3',
      md: 'size-4',
      lg: 'size-5',
    };

    const buttonClasses = clsx(
      'relative w-full cursor-pointer rounded-lg bg-white/5 text-left text-white focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
      sizeClasses[size],
      disabled && 'opacity-50 cursor-not-allowed',
      error && 'data-focus:outline-red-400/50 bg-red-500/10',
      buttonClassName,
    );

    const selectedOption = options.find((option) => option.value === value);

    const content = (
      <div ref={ref} className={clsx('relative w-full', className)}>
        <HeadlessListbox
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          {...props}
        >
          <ListboxButton className={buttonClasses}>
            <span className="block truncate">
              {selectedOption ? (
                selectedOption.label
              ) : (
                <span className="opacity-50">{placeholder}</span>
              )}
            </span>
            <ChevronDownIcon
              className={clsx(
                'absolute right-2 top-1/2 -translate-y-1/2 fill-white/60',
                iconSizeClasses[size],
              )}
              aria-hidden="true"
            />
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="cursor-pointer select-none py-2 px-3 text-white data-focus:bg-gray-700 data-selected:bg-gray-600"
              >
                {option.label}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </HeadlessListbox>
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

Listbox.displayName = 'Listbox';

export { Listbox };
export type { ListboxProps, ListboxOptionType };

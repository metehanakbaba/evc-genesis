import { Fieldset as HeadlessFieldset, Legend } from '@headlessui/react';
import clsx from 'clsx';
import { forwardRef } from 'react';

interface FieldsetProps {
  legend?: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  legendClassName?: string;
}

const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  (
    {
      legend,
      children,
      disabled = false,
      className,
      legendClassName,
      ...props
    },
    ref,
  ) => {
    const fieldsetClasses = clsx(
      'space-y-6 rounded-xl bg-white/5 p-6 sm:p-10',
      disabled && 'opacity-50',
      className,
    );

    return (
      <HeadlessFieldset
        disabled={disabled}
        className={fieldsetClasses}
        {...props}
      >
        {legend && (
          <Legend
            className={clsx(
              'text-base/7 font-semibold text-white',
              legendClassName,
            )}
          >
            {legend}
          </Legend>
        )}
        {children}
      </HeadlessFieldset>
    );
  },
);

Fieldset.displayName = 'Fieldset';

export { Fieldset };
export type { FieldsetProps };

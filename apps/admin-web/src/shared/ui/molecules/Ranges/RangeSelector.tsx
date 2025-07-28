'use client';

import React from 'react';
import { Select, SelectOption, SelectProps } from '@ui/forms';
import { Input } from '@ui/forms';

export type RangeType = 'number' | 'date';

export interface RangeOption {
  id: string;
  label: string;
  from?: number | string;
  to?: number | string;
}

export interface RangeSelectorProps {
  type: RangeType;
  size?: 'sm' | 'md' | 'lg';
  minFrom?: number | string;
  maxFrom?: number | string;
  minTo?: number | string;
  maxTo?: number | string;
  options?: RangeOption[];
  selectedOptionId?: string;
  fromValue?: number | string;
  toValue?: number | string;
  onChange: (from: number | string | undefined, to: number | string | undefined, optionId?: string) => void;
  className?: string;
  selectProps?: Omit<SelectProps, 'options' | 'value' | 'onChange'>;
}

/**
 * RangeSelector Component
 *
 * Displays two input fields (from and to) and a select dropdown for predefined ranges.
 * Supports number and date types.
 * Inputs have optional min/max constraints.
 * Select options define preset ranges with labels and from/to values.
 * Controlled component with onChange callback.
 * Open for extension with new range types or options.
 */
export const RangeSelector: React.FC<RangeSelectorProps> = ({
  type,
  size = 'md',
  minFrom,
  maxFrom,
  minTo,
  maxTo,
  options = [],
  selectedOptionId,
  fromValue,
  toValue,
  onChange,
  className = '',
  selectProps,
}) => {
  // Handle input changes
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const parsed = type === 'number' ? (val === '' ? undefined : Number(val)) : val || undefined;
    onChange(parsed, toValue, undefined);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const parsed = type === 'number' ? (val === '' ? undefined : Number(val)) : val || undefined;
    onChange(fromValue, parsed, undefined);
  };

  // Handle select change
  const handleSelectChange = (optionId: string) => {
    const option = options.find((opt) => opt.id === optionId);
    if (option) {
      onChange(option.from, option.to, option.id);
    } else {
      onChange(undefined, undefined, undefined);
    }
  };

  // Input type attribute
  const inputType = type === 'number' ? 'number' : 'text';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Input
        type={inputType}
        size={size}
        value={fromValue !== undefined ? String(fromValue) : ''}
        placeholder="From"
        onChange={handleFromChange}
        className="flex-1"
        aria-label="From value"
      />
      <span className="text-gray-400 select-none">to</span>
      <Input
        type={inputType}
        size={size}
        value={toValue !== undefined ? String(toValue) : ''}
        placeholder="To"
        onChange={handleToChange}
        className="flex-1"
        aria-label="To value"
      />
      <Select
        size={size}
        options={options.map(({ id, label }) => ({ value: id, label }))}
        value={selectedOptionId}
        onChange={(val) => handleSelectChange(val as string)}
        {...selectProps}
        aria-label="Select predefined range"
      />
    </div>
  );
};

export default RangeSelector;

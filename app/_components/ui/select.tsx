import type { ComponentProps } from 'react';

import { ChevronDown } from 'lucide-react';

import { cn } from '@/_lib/utils/cn';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends Omit<ComponentProps<'select'>, 'children'> {
  options: SelectOption[];
  placeholder?: string;
}

export function Select({
  className,
  options,
  placeholder,
  ...props
}: SelectProps) {
  return (
    <div className="relative inline-block">
      <select
        className={cn(
          'border-input bg-background text-foreground ring-ring appearance-none rounded-md border py-2 pr-8 pl-3 text-sm focus:ring-2 focus:outline-none',
          className,
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="text-muted-foreground pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2" />
    </div>
  );
}

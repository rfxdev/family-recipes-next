'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { RadioGroup, RadioGroupItem } from '@/_components/ui/radio-group';
import { DEFAULT_SORT, SORT_OPTIONS } from '@/_config/filters';
import { isSortValue } from '@/_lib/utils/isSortValue';

export function DesktopSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortParam = searchParams.get('sort') ?? '';
  const currentSort = isSortValue(sortParam) ? sortParam : DEFAULT_SORT;

  const handleSortChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      // Omit default sort from URL to keep it clean
      if (value === DEFAULT_SORT) {
        params.delete('sort');
      } else {
        params.set('sort', value);
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-medium">Sort by</h3>
      <RadioGroup onValueChange={handleSortChange} value={currentSort}>
        {SORT_OPTIONS.map((option) => (
          <label
            className="flex cursor-pointer items-center gap-2"
            key={option.value}
          >
            <RadioGroupItem value={option.value} />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}

'use client';

import { ArrowUpDown, Check } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { Button } from '@/_components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/_components/ui/popover';
import { DEFAULT_SORT, SORT_OPTIONS } from '@/_config/filters';
import { cn } from '@/_lib/utils/cn';
import { isSortValue } from '@/_lib/utils/isSortValue';

export function MobileSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortParam = searchParams.get('sort') ?? '';
  const currentSort = isSortValue(sortParam) ? sortParam : DEFAULT_SORT;
  const currentLabel = SORT_OPTIONS.find((o) => o.value === currentSort)?.label;

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
    <Popover>
      <PopoverTrigger className="text-foreground flex items-center gap-1.5 text-sm font-medium">
        <ArrowUpDown className="size-4" />
        {currentLabel}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-44 p-1">
        <ul>
          {SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <Button
                className="w-full justify-start px-3"
                onClick={() => handleSortChange(option.value)}
                variant="ghost"
              >
                <Check
                  className={cn(
                    'size-4 shrink-0',
                    option.value === currentSort ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {option.label}
              </Button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

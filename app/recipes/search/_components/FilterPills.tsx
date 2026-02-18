'use client';

import { X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { FILTER_KEYS } from '@/_config/filters';
import { getFilterLabel } from '@/_lib/utils/getFilterLabel';

interface Pill {
  key: string;
  label: string;
  value: string;
}

export function FilterPills() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pills: Pill[] = useMemo(() => {
    const result: Pill[] = [];
    for (const key of FILTER_KEYS) {
      for (const value of searchParams.getAll(key)) {
        const label = getFilterLabel(key, value);
        if (label) {
          result.push({ key, label, value });
        }
      }
    }
    return result;
  }, [searchParams]);

  const handleRemoveFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const remaining = params.getAll(key).filter((v) => v !== value);
      params.delete(key);
      remaining.forEach((v) => params.append(key, v));
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  if (pills.length === 0) return null;

  return (
    <div className="mb-4 flex gap-2 overflow-x-auto lg:hidden">
      {pills.map((pill) => (
        <button
          className="bg-accent-foreground text-background flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-sm"
          key={`${pill.key}-${pill.value}`}
          onClick={() => handleRemoveFilter(pill.key, pill.value)}
          type="button"
        >
          {pill.label}
          <X className="size-3.5" />
        </button>
      ))}
    </div>
  );
}

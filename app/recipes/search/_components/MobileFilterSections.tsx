'use client';

import type { FilterSection } from '@/_types/filters';

import { Checkbox } from '@/_components/ui/checkbox';

interface MobileFilterSectionsProps {
  activeFilters: Record<string, string[]>;
  facetedCounts: Record<string, Record<string, number>>;
  onFilterToggle: (key: string, value: string, checked: boolean) => void;
  sections: FilterSection[];
}

export function MobileFilterSections({
  activeFilters,
  facetedCounts,
  onFilterToggle,
  sections,
}: MobileFilterSectionsProps) {
  return (
    <div className="columns-2 gap-x-6">
      {sections.map((section) => (
        <div className="mb-6 break-inside-avoid" key={section.id}>
          <h3 className="text-md mb-3 font-bold uppercase">{section.title}</h3>
          <div className="flex flex-col gap-2">
            {section.items.map((item) => {
              const count = facetedCounts[section.id]?.[item.value] ?? 0;
              const isChecked =
                activeFilters[section.id]?.includes(item.value) ?? false;

              return (
                <label
                  className="flex cursor-pointer items-start gap-2"
                  key={item.value}
                >
                  <Checkbox
                    checked={isChecked}
                    className="mt-1"
                    onCheckedChange={(checked) =>
                      onFilterToggle(section.id, item.value, checked === true)
                    }
                  />
                  <span className="text-md">
                    <strong>{item.label} </strong>
                    <span className="text-muted-foreground">({count})</span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

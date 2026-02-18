'use client';

import type { FilterSection } from '@/_types/filters';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/_components/ui/accordion';
import { Checkbox } from '@/_components/ui/checkbox';

interface FilterContentProps {
  activeFilters: Record<string, string[]>;
  facetedCounts: Record<string, Record<string, number>>;
  hasActiveFilters: boolean;
  onClearAll: () => void;
  onFilterToggle: (key: string, value: string, checked: boolean) => void;
  sections: FilterSection[];
}

export function FilterContent({
  activeFilters,
  facetedCounts,
  hasActiveFilters,
  onClearAll,
  onFilterToggle,
  sections,
}: FilterContentProps) {
  // All section ids open by default
  const defaultOpenSections = sections.map((s) => s.id);

  return (
    <>
      <Accordion defaultValue={defaultOpenSections} type="multiple">
        {sections.map((section) => (
          <AccordionItem key={section.id} value={section.id}>
            <AccordionTrigger>{section.title}</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                {section.items.map((item) => {
                  const count = facetedCounts[section.id]?.[item.value] ?? 0;
                  const isChecked =
                    activeFilters[section.id]?.includes(item.value) ?? false;

                  return (
                    <label
                      className="flex cursor-pointer items-center gap-2"
                      key={item.value}
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          onFilterToggle(
                            section.id,
                            item.value,
                            checked === true,
                          )
                        }
                      />
                      <span className="text-sm">{item.label}</span>
                      <span className="text-muted-foreground ml-auto text-xs">
                        {count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {hasActiveFilters && (
        <button
          className="text-accent-foreground mt-4 text-sm underline underline-offset-2"
          onClick={onClearAll}
          type="button"
        >
          Clear all filters
        </button>
      )}
    </>
  );
}

# Design System

Colour tokens and component variants are defined in `app/globals.css` using oklch values, mapped to Tailwind via `@theme inline`.

## Layout

Page-level container styles are defined once on `<main>` in `app/layout.tsx`:

```
mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8
```

Individual pages and components should **not** redeclare container padding or max-width — they receive it from the layout. The Header mirrors the same horizontal padding independently since it sits outside `<main>`.

## Colour Tokens

All tokens follow the shadcn/ui convention: the base token is the background/surface colour, `-foreground` is the text colour on that surface.

### Surfaces

| Token                            | Role                                | Usage                              |
| -------------------------------- | ----------------------------------- | ---------------------------------- |
| `background` / `foreground`      | Page background and default text    | `bg-background`, `text-foreground` |
| `card` / `card-foreground`       | Card surfaces                       | Same as background by default      |
| `popover` / `popover-foreground` | Popover/dropdown surfaces           | White background                   |
| `muted` / `muted-foreground`     | Subdued surfaces and secondary text | Empty states, helper text          |

### Badge & Action Colours

These are the bold/saturated colours used for badges, buttons, and interactive elements. The base token is the fill colour; `-foreground` is the text on top.

| Token         | Colour       | Role                         | Example                                 |
| ------------- | ------------ | ---------------------------- | --------------------------------------- |
| `primary`     | Green        | Main badges, primary actions | Difficulty badge ("Easy")               |
| `secondary`   | Pink         | Secondary badges             | Dietary restriction badges              |
| `tertiary`    | Yellow       | Tertiary badges              | Available for additional categorisation |
| `destructive` | Red (bright) | Destructive actions          | Delete buttons, error states            |

### Accent

The accent pair works differently from badges — it follows the surface convention:

| Token               | Colour             | Role                                                     |
| ------------------- | ------------------ | -------------------------------------------------------- |
| `accent`            | Light (near-white) | Subtle background tint (e.g. outline badge fill)         |
| `accent-foreground` | Red (brick)        | Signature colour for emphasis and interactive highlights |

Use `accent-foreground` for:

- Step numbers in recipe method
- Category labels (cuisine, meal type)
- Title hover colour
- Active navigation links
- Checkbox borders and checked state
- Focus ring (`--ring` resolves to `accent-foreground`)

Use `accent` as a light background paired with `accent-foreground` text (e.g. the outline badge variant).

### Utility

| Token    | Role                                            |
| -------- | ----------------------------------------------- |
| `border` | Default border colour                           |
| `input`  | Input field borders                             |
| `ring`   | Focus ring colour (maps to `accent-foreground`) |

## Badge Variants

Defined in `app/_components/ui/badge.tsx`:

| Variant       | Styling                                      | Use for                     |
| ------------- | -------------------------------------------- | --------------------------- |
| `default`     | `bg-primary text-primary-foreground`         | Primary categorisation      |
| `secondary`   | `bg-secondary text-secondary-foreground`     | Secondary categorisation    |
| `tertiary`    | `bg-tertiary text-tertiary-foreground`       | Tertiary categorisation     |
| `outline`     | `bg-accent text-accent-foreground`           | Subtle/informational labels |
| `destructive` | `bg-destructive text-destructive-foreground` | Warnings, errors            |

## Checkbox

Uses `accent-foreground` for border and checked fill, with `accent` as the check icon colour. Focus ring uses `ring` (same red).

## Drawer

Bottom-sheet component built on `@radix-ui/react-dialog` (`app/_components/ui/drawer.tsx`). Slides up from the bottom on mobile, with a backdrop overlay. Max height `85dvh` with `overflow-y-auto` for scrollable content. Rounded top corners (`rounded-t-2xl`). Uses `tw-animate-css` slide/fade animations.

## Filter Pills

Active filter pills use `bg-accent-foreground text-background` with `rounded-full` and a × icon for removal. Displayed in a horizontally-scrollable row (`overflow-x-auto`) on mobile only (`lg:hidden`).

## Filter Button

Mobile-only sticky button (`fixed inset-x-0 bottom-0`) using `bg-accent-foreground text-background` with a pill shape (`rounded-full`). Shows active filter count as a badge suffix: "Filters (3)".

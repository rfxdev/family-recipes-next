# Design System

Colour tokens and component variants are defined in `app/globals.css` using oklch values, mapped to Tailwind via `@theme inline`.

## Layout

Page-level container styles are defined once on `<main>` in `app/layout.tsx`:

```
mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8
```

Individual pages and components should **not** redeclare container padding or max-width — they receive it from the layout. The Header mirrors the same horizontal padding independently since it sits outside `<main>`.

## Component Library

Primitive UI components live in `app/_components/ui/`. These are thin wrappers over shadcn/Radix UI primitives (or `vaul` for the Drawer) and are excluded from test coverage — they wrap third-party code we don't own.

**Adding a new primitive:**

- Run `npx shadcn add <component>` where a shadcn recipe exists, or
- Import directly from the `radix-ui` package (already installed) and create the wrapper manually in `app/_components/ui/` — all Radix primitives are available as named namespace exports, e.g. `import { Collapsible } from 'radix-ui'`

**Do not** put bespoke application components in this folder. Components with business logic, application-specific props, or that compose multiple primitives belong elsewhere in `app/_components/`.

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

## Button Variants

Defined in `app/_components/ui/button.tsx` (shadcn-style wrapper over Radix `Slot`). Supports `variant` and `size` props; use `className` to override radius (e.g. `rounded-full` for pill shapes).

| Variant        | Styling                                                   | Use for                                      |
| -------------- | --------------------------------------------------------- | -------------------------------------------- |
| `default`      | `bg-primary text-primary-foreground`                      | Primary actions                              |
| `accent`       | `bg-accent-foreground text-background`                    | Signature brand actions (filter FAB, pills)  |
| `secondary`    | `bg-secondary text-secondary-foreground`                  | Secondary actions                            |
| `destructive`  | `bg-destructive text-white`                               | Destructive actions                          |
| `outline`      | `border bg-background hover:bg-accent`                    | Bordered secondary actions                   |
| `ghost`        | `hover:bg-accent` (text inherits)                         | Subtle actions, menu items                   |
| `ghost-accent` | `text-accent-foreground hover:bg-accent`                  | Ghost actions where brand colour is required |
| `link`         | `text-accent-foreground underline` (no padding or height) | Inline text-style actions                    |

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

Bottom-sheet component built on `vaul` (`app/_components/ui/drawer.tsx`). Note: `@radix-ui/react-dialog` appears in `package.json` as a peer dependency of `vaul`, not a direct dependency of our wrapper. Slides up from the bottom on mobile, with a backdrop overlay. Max height `85dvh` with `overflow-y-auto` for scrollable content. Rounded top corners (`rounded-t-2xl`). Uses `tw-animate-css` slide/fade animations.

`DrawerContent` accepts a `direction` prop (`'bottom' | 'top' | 'left' | 'right'`, default `'bottom'`). Side drawers use `inset-y-0 left-0/right-0 h-full w-4/5 max-w-sm`; the drag handle is suppressed for left/right directions.

**Note:** vaul keeps `DrawerContent` mounted when closed (hides via CSS transform, not unmount). Uncontrolled components inside it will not reinitialise on re-open — use `key={derivedValue}` to force remount when needed.

## Nav Drawer

Mobile-only side navigation (`app/_components/NavDrawer.tsx`). Opens from the left via `Drawer direction="left"`. Contains a `Tabs` mode toggle (Recipes / Planner) styled with `bg-accent-foreground` active state. Active tab is derived from `pathname` and passed as both `defaultValue` and `key` to reset the uncontrolled Tabs on section change. Nav content is driven by `CATEGORY_SECTIONS` (recipes tab) and `PLANNER_NAV_LINKS` from `app/_config/planner.ts` (planner tab). Hidden on `sm+` — desktop uses inline nav links in the Header.

## Tabs

Shadcn wrapper over Radix Tabs (`app/_components/ui/tabs.tsx`). Exports `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`. `TabsList` supports a `variant` prop: `default` (filled pill container) or `line` (underline indicator). Override `TabsTrigger` active state with `data-[state=active]:` classes — e.g. `data-[state=active]:bg-accent-foreground data-[state=active]:text-background` for the brand red style used in `NavDrawer`.

## Filter Pills

Active filter pills use `Button variant="accent" className="rounded-full"` with a × icon for removal. Displayed in a horizontally-scrollable row (`overflow-x-auto`) on mobile only (`lg:hidden`).

## Filter Button

Mobile-only sticky button (`fixed inset-x-0 bottom-1`) using `Button variant="accent" className="rounded-full"`. Shows active filter count as a badge suffix: "Filters (3)".

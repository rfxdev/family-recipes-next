# Recipe Homepage — Changes Tracker

## Layout

- Search bar sub-header (below sticky nav, scrolls out of view on scroll)
- h1 page heading
- Hero collections grid — first card full-width on mobile, two below side by side; 3-col equal grid on desktop
- View All CTA → `/recipes/all`
- Additional sections as carousels below

## Sources

| Source                                                      | Reviewed | Notes                                                                                                                                                                                                                                     |
| ----------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NYT https://cooking.nytimes.com/                            | 🏗️       | Fewer, more confident sections. Let search and filters do the heavy lifting rather than exposing everything as a collection.                                                                                                              |
| Pinch of Yum https://pinchofyum.com/                        | 🏗️🎨     | /recipes page confirms intro → search → collections pattern. Homepage shows hero-first layout with collections grid. View All CTA sits naturally at the end of collections. Palette warmer and more appealing than NYT.                   |
| Becky Excell https://glutenfreecuppatea.co.uk/recipe-index/ | 🎨       | Structure not useful — standard food blogger index. Palette flagged for review alongside other sites.                                                                                                                                     |
| Jamie Oliver https://www.jamieoliver.com/recipes/all        | 🏗️🎨     | Search leads the page — strong case for search-first. Navigation groups elevate effort/context alongside taxonomy (reinforces Pick Your Pace). Palette clean and fresh but lacks colour. Spacing notably generous — a quality to aim for. |

---

## Decisions

| Decision                                         | Status                 | Notes                                                                                                                                                                                      |
| ------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Layout                                           | ✅ Implemented         | search bar → h1 → hero collections → View All CTA → additional collections.                                                                                                                |
| Hero collections display                         | ✅ Implemented         | Featured grid — first card spans full width on mobile with two cards side by side below; equal 3-col grid on desktop. No carousel.                                                         |
| View All destination                             | ✅ Implemented         | Links to `/recipes/all` — browse-all route with filters available, rather than `/recipes/search` which implies intent.                                                                     |
| Search placement                                 | ✅ Implemented         | No search icon in header. Search is a sub-header `<div>` below the sticky nav, shown on all `/recipes/*` pages. Not sticky — scrolls out of view. Same layout on desktop and mobile.       |
| Reduce number of homepage sections               | ✅ Agreed              | Fewer, more confident sections. Let search and filters do the heavy lifting rather than exposing everything as a collection.                                                               |
| No individual recipe surfacing                   | ✅ Implemented         | Collections only — no editorial picks or 'recipe of the day'. We don't have the logic or volume for per-recipe curation.                                                                   |
| Flat category list as lightweight alternative    | ❌ Rejected            | Feels like keyword fishing. Prefer strong search over dumping category links.                                                                                                              |
| "Family Favourites" or curated anchor collection | 🆕 Under consideration | A manually curated collection (no algorithm needed) that gives the page a personal anchor beyond pure taxonomy.                                                                            |
| Colour palette                                   | 🆕 Under consideration | Pinch of Yum and Becky Excell flagged as having warmer, more colourful palettes worth reviewing. Jamie Oliver clean but lacking colour. Cream background probably to be dropped for white. |
| Search bar scroll behaviour                      | 🆕 Under consideration | Search bar disappears too abruptly on scroll. Should remain visible for a bit longer — a grace period before sliding out of view.                                                          |
| Page text alignment                              | ✅ Implemented         | h1 and subtitle centre-aligned to reinforce the centred nav aesthetic.                                                                                                                     |
| View All CTA styling                             | ✅ Implemented         | Switched from ghost-accent to solid accent variant at lg size, centred below the hero grid.                                                                                                |
| Navigation — desktop mega-menu                   | 🆕 Under consideration | Links in the desktop nav may be broken. Needs review — consider click-through or accordion pattern rather than hover-only. Broader than homepage; affects all pages.                       |

---

## Section Review

| Section                     | Status | Notes |
| --------------------------- | ------ | ----- |
| Pick Your Pace              |        |       |
| In the Mood For             |        |       |
| How Do You Want to Cook It? |        |       |
| By Meal Type                |        |       |
| By Cuisine                  |        |       |
| By Ingredient               |        |       |
| By Diet                     |        |       |
| Author                      |        |       |

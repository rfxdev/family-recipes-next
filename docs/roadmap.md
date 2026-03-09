# Roadmap

Development phases for the Kitchen Companion application.

---

## Phase 0: Foundation - Complete

- [x] Project setup — Next.js, TypeScript, linting, formatting, and testing tooling
- [x] CI/CD pipeline — GitHub Actions and Dependabot

## Phase 1: Core Features (Dummy Data) - Complete

- [x] Sample recipe data
- [x] App layout and navigation
- [x] Recipe list and detail pages
- [x] Deploy to Vercel

## Phase 2: Design & Content Discovery

- [x] Design system — warm colour palette, typography, and spacing
- [x] Recipe homepage — category tiles grouped by cuisine, meal type, occasion, etc.
- [x] Filtered browsing — URL-driven, multi-select within a category (OR), AND across categories
- [x] Search — whole-word matching across title, description, ingredients, and method
- [x] Filter sidebar (desktop) — collapsible sections, checkboxes with recipe counts, sort, clear all
- [x] Filter drawer (mobile) — bottom sheet with active filter pills above results, immediate URL updates
- [x] Planner scaffold — placeholder pages for week view, shopping list, and tracker
- [ ] Navigation
  - [x] Desktop: mega dropdown on Recipes nav with category sections
  - [ ] Mobile: grouped nav with recipe categories listed under Recipes
  - [ ] Clicking a category clears active search and navigates to filtered browse
- [x] Browse context
  - [x] Homepage: section headings with short descriptions per category group
  - [x] Collection pages — `/recipes/collections/{id}` with title and description per curated view
- [ ] Empty states & result counts
  - [ ] Browse: recipe count; "no results" with clear filters option
  - [ ] Search: result count with query; "no results" with suggestions
  - [ ] Search + filters: option to clear search or filters independently
- [ ] Testing & polish — route behaviour, filter combinations, search flows, responsiveness, keyboard nav, URL sharing

## Phase 3: Firebase Integration & Recipe Management

- [ ] Firebase setup — demo and production projects
- [ ] Authentication — admin-managed users
- [ ] Firestore data layer — replace dummy data
- [ ] Error handling for data-fetching routes
- [ ] Create, edit, and delete recipes
- [ ] Image upload and storage
- [ ] Security rules

## Phase 4: Recipe Features

- [ ] URL import (schema.org structured data)
- [ ] Camera / OCR import
- [ ] Favourites

## Phase 5: Meal Planning & Extensions

- [ ] Meal planner — assign recipes to dates and meal slots
- [ ] Meal history tracker with usage statistics
- [ ] Shopping list generation from planned meals
- [ ] Discovery prompts — try new recipes, revisit favourites

## Phase 6: Flutter Mobile App

- [ ] Flutter app with shared Firebase backend
- [ ] Native camera integration
- [ ] iOS, Android, and offline support

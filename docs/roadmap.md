# Roadmap

Development phases for the Kitchen Companion application.

---

## Phase 0: Foundation - Complete

- [x] Project documentation (README)
- [x] Next.js project structure with colocation strategy
- [x] TypeScript configuration with strict settings
- [x] Development tooling (ESLint, Prettier, Vitest, Husky, commitlint)
- [x] GitHub Actions for CI/CD
- [x] Dependabot for dependency updates

## Phase 1: Core Features (Dummy Data) - Complete

- [x] TypeScript interfaces (Recipe types)
- [x] Sample recipes in JSON format
- [x] App layout and navigation (Header component)
- [x] Recipe list page with grid layout
- [x] Recipe detail page with full recipe display
- [x] Deploy to Vercel

## Phase 2: Design & Discovery - In Progress

Visual design pass and recipe browsing features.

- [x] Design refresh (layout, typography, colour, spacing)
- [ ] Search functionality
- [ ] Filtering by metadata (cuisine, meal type, difficulty, time, dietary, etc.)

## Phase 3: Firebase Integration & Recipe Management

Backend integration and CRUD functionality.

- [ ] Firebase setup and configuration (demo + production projects)
- [ ] Authentication (admin-managed users)
- [ ] Firestore integration (replace dummy data)
- [ ] Create, edit, and delete recipes via forms
- [ ] Image upload and storage
- [ ] Security rules deployment

## Phase 4: Recipe Features

Import methods and user experience improvements.

- [ ] URL import (schema.org structured data)
- [ ] Camera scanning / OCR import
- [ ] Favourites

## Phase 5: Meal Planning & Extensions

Build incrementally: meal planner → shopping list → meal tracker.

- [ ] Meal planner (assign recipes to dates/meal slots)
- [ ] Shopping list generation from planned meals
- [ ] Meal history tracker with usage statistics
- [ ] Discovery prompts (try new recipes, revisit favourites)

## Phase 6: Flutter Mobile App - Future

- [ ] Flutter app with Material Design
- [ ] Shared Firebase backend with web app
- [ ] Native camera integration for recipe scanning
- [ ] iOS and Android support
- [ ] Offline support with local caching

# Family Recipes

A modern web application for storing, organising, and sharing recipes within a family.

Built for personal use and as a portfolio demonstration of modern web development practices. The web version uses Next.js, TypeScript, and Tailwind CSS, with Firebase integration planned. A companion Flutter mobile app will share the same Firebase backend.

---

## Project Status & Roadmap

### Phase 0: Foundation 🔄 In Progress

- [x] Project documentation (README)
- [x] Next project structure with colocation strategy
- [x] TypeScript configuration with strict settings
- [x] Development tooling (ESLint, Prettier, Vitest, Husky, commitlint)
- [x] GitHub Actions for CI/CD
- [x] Dependabot for dependency updates

### Phase 1: Core Features (Dummy Data) 🔄 In Progress

**Current Focus:** Build core recipe browsing experience with static JSON data

- [ ] Define TypeScript interfaces (Recipe, User, Ingredient types)
- [ ] Create 2 sample recipes in JSON format
- [ ] Build basic app layout (Header component)
- [ ] Recipe list page with grid layout
- [ ] Recipe detail page with full recipe display
- [ ] Deploy to Vercel

### Phase 2: Firebase Integration 📋 Planned

- [ ] Firebase setup and configuration
- [ ] Authentication and security rules
- [ ] Firestore integration (replace dummy data)
- [ ] Image storage

### Phase 3: Recipe Management 📋 Planned

- [ ] Create, edit, and delete recipes
- [ ] Image upload with thumbnails
- [ ] Structured ingredient input (groups, quantities, units)
- [ ] Form validation

### Phase 4: Advanced Features 📋 Future

- [ ] Recipe scaling and unit conversion (imperial ↔ metric)
- [ ] Search, filtering, and favorites
- [ ] Recipe import (camera scanning and URL parsing)
- [ ] User preferences and settings
- [ ] UI polish (dark mode, accessibility)

### Phase 5: Flutter Mobile App 📋 Future

- [ ] Flutter app with Material Design
- [ ] Native camera integration for recipe scanning
- [ ] Shared Firebase backend with web app
- [ ] iOS and Android support
- [ ] Offline support with local caching

---

## Tech Stack

**Core:** Next.js 16, TypeScript, Tailwind CSS v4  
**Backend:** Firebase (Firestore, Auth, Storage)  
**Development:** ESLint, Prettier, Vitest, Husky, commitlint  
**Deployment:** Vercel

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Project Structure

```
app/
├── _components/     # Global UI components (private)
├── _lib/            # Hooks, utils, dummy data (private)
├── _types/          # TypeScript interfaces (private)
├── layout.tsx
├── page.tsx
└── recipes/
    ├── _components/
    ├── page.tsx
    └── [id]/page.tsx
```

**Key concepts:**

- Private folders (`_prefix`) - not routable, for code organisation
- Colocation - components live near their routes
- Single alias - `@/*` maps to `app/*`

---

## Development Workflow

**Local Development:**

- Conventional commits (`feat:`, `fix:`, `docs:`, `chore:`)
- Pre-commit: lint, format, type-check
- Pre-push: run tests

**CI/CD:**

- GitHub Actions on pull requests (lint, test, build)
- Dependabot for dependency updates

---

## Design Decisions

Architecture documented in `docs/`:

- [`data-model.md`](docs/data-model.md) - Database schemas and unit conversion
- [`security-rules.md`](docs/security-rules.md) - Firebase security and authentication
- [`recipe-import.md`](docs/recipe-import.md) - Camera scanning and URL parsing

Note: Some Flutter-specific documentation also exists for the planned mobile implementation.

---

## Related Projects

A Flutter mobile app for iOS and Android is planned (Phase 5) to share the same Firebase backend. The `docs/` folder contains platform-agnostic specifications applicable to both implementations.

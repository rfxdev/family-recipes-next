# Kitchen Companion

A modern web application for storing, organising, and sharing recipes within a family. Beyond a digital cookbook, the app helps families plan meals, generate shopping lists, and track cooking history to encourage trying new recipes.

Built for personal use and as a portfolio demonstration of modern web development practices. The web version uses Next.js, TypeScript, and Tailwind CSS, with Firebase integration planned. A companion Flutter mobile app is planned to share the same Firebase backend.

**Live Demo:** [lovegrills-recipes.vercel.app](https://lovegrills-recipes.vercel.app)

---

## Project Status

Phase 2 in progress — building the browsing, filtering, and navigation experience.

See [`roadmap.md`](docs/roadmap.md) for the full development plan.

---

## Tech Stack

- **Core:** Next.js 16, TypeScript, Tailwind CSS v4
- **Backend:** Firebase (Firestore, Auth, Storage)
- **Development:** ESLint, Prettier, Vitest, Husky, commitlint
- **Deployment:** Vercel

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
├── _components/     # Global UI components
├── _config/         # Static configuration (routes, recipe categories)
├── _lib/
│   ├── data/        # Dummy/seed data
│   └── utils/       # Utility/helper functions
├── _types/          # TypeScript interfaces and type unions
├── layout.tsx
├── page.tsx
└── recipes/
    ├── _components/
    ├── page.tsx
    └── [id]/page.tsx
```

**Key concepts:**

- Private folders (`_prefix`) — not routable, for code organisation
- Colocation — components live near their routes
- Single alias — `@/*` maps to `app/*`

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

## Documentation

Architecture decisions and specifications:

- [`data-model.md`](docs/data-model.md) - Database schemas and field definitions
- [`design-system.md`](docs/design-system.md) - Colour tokens, component variants, and layout conventions
- [`recipe-management.md`](docs/recipe-management.md) - Manual entry, editing, import methods, and shared utilities
- [`recipe-views.md`](docs/recipe-views.md) - Browse groups, category children, and homepage structure
- [`roadmap.md`](docs/roadmap.md) - Development phases and priorities
- [`routes.md`](docs/routes.md) - URL conventions and filter param patterns
- [`security-rules.md`](docs/security-rules.md) - Firebase security and authentication
- [`recipe-style-guide.md`](docs/recipe-style-guide.md) - Conventions for writing recipe content

Documentation is platform-agnostic where possible, applicable to both the web and planned mobile implementations.

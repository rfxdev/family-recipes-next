# Family Recipes

A modern web application for storing, organising, and sharing recipes within a family.

Built for personal use and as a portfolio demonstration of modern web development practices. The web version uses Next.js, TypeScript, and Tailwind CSS, with Firebase integration planned. A companion Flutter mobile app is planned to share the same Firebase backend.

---

## Project Status

Phase 1 (core recipe browsing with dummy data) is complete — currently preparing for Vercel deployment. Next up is a design pass and adding search/filters.

See [`roadmap.md`](docs/roadmap.md) for the full development plan.

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

- [`data-model.md`](docs/data-model.md) — Database schemas and field definitions
- [`recipe-management.md`](docs/recipe-management.md) — Manual entry, editing, import methods, and shared utilities
- [`security-rules.md`](docs/security-rules.md) — Firebase security and authentication
- [`roadmap.md`](docs/roadmap.md) — Development phases and priorities

Documentation is platform-agnostic where possible, applicable to both the web and planned mobile implementations.

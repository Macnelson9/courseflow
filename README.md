# CourseFlow Frontend

CourseFlow is a Next.js (App Router) frontend for student enrollment, application review, and attendance management.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS v4
- Lucide React icons
- `qrcode.react` for attendance QR rendering

## Design System

This project follows a monochrome design language inspired by Pencil style guide:

- `webapp-2-monochromeexpressive`

Core tokens and styling are defined in:

- `src/app/globals.css`
- `tailwind.config.ts`

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Create production build
npm run start      # Run production server
npm run typecheck  # TypeScript check
npm run lint       # Next lint
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open:

- `http://localhost:3000`

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Main Route Map

### Public

- `/` Home page (includes welcome section)
- `/apply` Application form
- `/login` Unified login (student/admin switch)

### Student

- `/dashboard`
- `/dashboard/attendance`
- `/dashboard/peers`

### Admin

- `/admin`
- `/admin/acceptance`
- `/admin/applications`
- `/admin/attendance`
- `/admin/course`
- `/admin/mentors`

## Project Structure

```text
src/
  app/                 # Next.js route groups and pages
  components/          # UI primitives + feature components
  lib/
    api/               # Typed API wrappers
    auth/              # Session/guard utilities
    hooks/             # Client hooks
    types/             # Domain types
    utils/             # Helpers
```

## Notes

- Sidebar behavior:
  - Student + Admin desktop sidebars support expand/collapse.
  - In collapsed state, sidebar logo is hidden and icon-only nav is shown.
- Public header/footer/nav are black-themed for high contrast.

## Troubleshooting

If you see missing `.next` manifest errors (for example `routes-manifest.json`), run:

```bash
rm -rf .next
npm run dev
```

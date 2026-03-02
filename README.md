# CourseFlow Frontend

CourseFlow is a Next.js App Router frontend for course discovery, application intake, and role-based dashboards (student, admin, mentor).

## Current Status

- Public website and application flow are implemented.
- Unified login screen supports Student, Mentor, and Admin role selection.
- Student dashboard area is implemented.
- Admin dashboard area is implemented.
- Mentor dashboard area is implemented with dedicated `/mentor/*` routes.
- Shared monochrome UI system is in place (stacked button style, black/white theme, reusable primitives).
- Mobile navigation uses hamburger slide panels with GSAP transitions.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- GSAP (micro-interactions and menu transitions)
- Lucide React
- `qrcode.react`
- `clsx` + `tailwind-merge`

## Design System

Project styling is based on the monochrome direction:

- `webapp-2-monochromeexpressive`

Key style files:

- `src/app/globals.css`
- `tailwind.config.ts`

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080
```

3. Run development server:

```bash
npm run dev
```

4. Open:

- `http://localhost:3000`

## Scripts

```bash
npm run dev        # start dev server
npm run build      # production build
npm run start      # run production server
npm run typecheck  # TypeScript noEmit check
npm run lint       # Next lint
```

## Route Map

### Public

- `/` Home page (welcome + active courses + all courses)
- `/apply` Student application form
- `/login` Unified login (choose student/mentor/admin)
- `/courses/[slug]` Public course curriculum page

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

### Mentor

- `/mentor`
- `/mentor/courses`
- `/mentor/students`
- `/mentor/attendance`
- `/mentor/content`

## Notable UI Behaviors

- Public header/footer use black background.
- Public nav on mobile/tablet uses a hamburger panel.
- Dashboard sidebars (student/admin/mentor) are collapsible on desktop.
- In collapsed mode, sidebars are icon-first; logo is hidden.
- Modal dialogs use themed stacked styling with blurred backdrop.
- Shared button system uses stacked black/white visual treatment.

## Project Structure

```text
src/
  app/
    (public)/
    (auth)/
    (student)/
    (admin)/
    (mentor)/
  components/
    ui/
    layout/
    auth/
    course/
    application/
    attendance/
    mentors/
    students/
    dashboard/
    motion/
  lib/
    api/
    auth/
    hooks/
    types/
    utils/
```

## TypeScript Settings

Strictness is enabled:

- `strict: true`
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`

## Troubleshooting

If Next.js build/dev state becomes inconsistent (for example missing `.next` manifest files), clear cache and rerun:

```bash
rm -rf .next
npm run dev
```

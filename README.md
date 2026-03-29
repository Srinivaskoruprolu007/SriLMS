# SriLMS

SriLMS is a modern Learning Management System starter built with Next.js 16, React 19, Prisma, and Better Auth. The current codebase focuses on a polished public landing experience, a complete authentication foundation, and the supporting infrastructure needed to grow into a full LMS product.

It is designed as an auth-first app scaffold with database-backed sessions, email/password login, GitHub OAuth, email verification support, Prisma-managed persistence, and a reusable UI layer powered by Tailwind CSS v4 and shadcn-style components.

## Overview

This repository currently includes:

- A public marketing-style landing page
- A reusable public navbar with theme switching
- Authentication flows for sign in and sign up
- GitHub social login via Better Auth
- Email OTP verification support
- Prisma models and migrations for auth-related data
- Resend integration for verification emails
- Arcjet setup for application protection
- Husky and Commitlint for commit quality checks

This repository does not yet include full course, dashboard, or learner management features. Navigation links for areas like `/courses` and `/dashboard` are present as part of the product direction, but those sections are not implemented in the current structure.

## Tech Stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn-style UI components
- Better Auth
- Prisma ORM with PostgreSQL
- Resend for transactional email
- Arcjet for app protection and security rules
- ESLint, Husky, and Commitlint for code quality

## Current Feature Set

### Public experience

- Landing page with product messaging and feature cards
- Shared public layout and top navigation
- Light/dark theme support with `next-themes`

### Authentication

- Email and password sign up
- Email and password sign in
- GitHub OAuth sign in
- Session-aware UI state
- Email OTP verification screen
- Better Auth API route mounted at `app/api/auth/[...all]/route.ts`

### Data layer

- Prisma schema for `User`, `Session`, `Account`, and `Verification`
- Initial migration checked into source control
- Generated Prisma client inside `lib/generated/prisma`
- PostgreSQL adapter configuration through `@prisma/adapter-pg`

### Developer experience

- ESLint configuration for Next.js and TypeScript
- Husky `commit-msg` hook
- Conventional commit enforcement with Commitlint
- Centralized environment variable validation using `@t3-oss/env-nextjs` and Zod

## Project Structure

```text
.
|-- app
|   |-- (auth)
|   |   |-- login
|   |   |-- reset-password
|   |   `-- verify-email
|   |-- (public)
|   |   |-- _components
|   |   `-- page.tsx
|   `-- api
|       `-- auth
|           `-- [...all]
|-- components
|   |-- theme-provider.tsx
|   `-- ui
|-- constants
|-- hooks
|-- lib
|   |-- generated
|   |-- arcjet.ts
|   |-- auth.ts
|   |-- auth-client.ts
|   |-- env.ts
|   |-- prisma.ts
|   `-- resend.ts
|-- prisma
|   |-- migrations
|   `-- schema.prisma
|-- public
|-- .husky
`-- package.json
```

## Environment Variables

The app validates environment variables at runtime, so all required values must be present before starting the server.

Create a local environment file:

```bash
cp .env.example .env.local
```

On PowerShell, you can use:

```powershell
Copy-Item .env.example .env.local
```

Add the following variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"
BETTER_AUTH_SECRET="replace-with-a-long-random-secret"
BETTER_AUTH_URL="http://localhost:3000"

AUTH_GITHUB_CLIENT_ID="your-github-client-id"
AUTH_GITHUB_CLIENT_SECRET="your-github-client-secret"

RESEND_API_KEY="your-resend-api-key"
ARCJET_KEY="your-arcjet-key"
```

### Variable reference

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Prisma |
| `BETTER_AUTH_SECRET` | Yes | Secret used by Better Auth for signing and encryption |
| `BETTER_AUTH_URL` | Yes | Base application URL, usually `http://localhost:3000` in development |
| `AUTH_GITHUB_CLIENT_ID` | Yes in current validation | GitHub OAuth client ID |
| `AUTH_GITHUB_CLIENT_SECRET` | Yes in current validation | GitHub OAuth client secret |
| `RESEND_API_KEY` | Yes | API key used to send verification emails |
| `ARCJET_KEY` | Yes | Arcjet key used for request protection rules |

Note: `.env.example` currently includes the core auth variables, but the runtime validation in `lib/env.ts` also requires GitHub, Resend, and Arcjet values.

## Getting Started

### 1. Install dependencies

This repository is best used with `pnpm`.

```bash
pnpm install
```

### 2. Configure environment variables

Set up `.env.local` using the variables listed above.

### 3. Generate the Prisma client

```bash
pnpm prisma:generate
```

### 4. Run database migrations

```bash
pnpm prisma:migrate
```

### 5. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Next.js development server |
| `pnpm build` | Build the application for production |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Alias for linting in the current setup |
| `pnpm prisma:generate` | Generate the Prisma client |
| `pnpm prisma:migrate` | Run Prisma development migrations |
| `pnpm prisma:studio` | Open Prisma Studio |
| `pnpm commitlint` | Validate the current commit message |
| `pnpm commitlint:ci` | Validate commits from `origin/main` to `HEAD` |

## Authentication Flow

The authentication system is built around Better Auth and Prisma:

- Server configuration lives in `lib/auth.ts`
- Client helpers live in `lib/auth-client.ts`
- Next.js route handlers are exposed from `app/api/auth/[...all]/route.ts`
- User, session, account, and verification records are stored in PostgreSQL
- Verification emails are sent through Resend

## UI and Styling

The UI layer uses Tailwind CSS v4 together with a large reusable component set under `components/ui`. The app also includes:

- `next-themes` for theme switching
- `sonner` for toast notifications
- `lucide-react` and `@phosphor-icons/react` for icons
- Shared layouts for public and auth pages

## Development Notes

- The root metadata in `app/layout.tsx` still contains the default Next.js title and description and can be customized for the SriLMS brand.
- The `reset-password` route directory exists, but the feature is not wired up yet.
- The homepage references `/courses` and `/dashboard`, which are not yet implemented.
- The auth flow is the most complete part of the application at the moment and provides a strong base for expanding the LMS domain.

## Suggested Next Steps

- Build the courses catalog and course detail pages
- Add learner and instructor dashboards
- Implement role-based access control
- Complete password reset and email verification flows end to end
- Add tests for auth flows and route protection
- Replace placeholder metadata and copy with production branding

## License

Add a project license here if you plan to distribute or open-source the repository.

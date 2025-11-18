# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Plugin Admin Dashboard built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS. This is an admin dashboard with authentication flow including login, signup, and OTP verification.

## Development Commands

```bash
# Development server (runs on http://localhost:3000)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint
```

## Architecture

### Route Structure

The app uses Next.js App Router with route groups for organization:

- **`app/(auth)/`** - Authentication pages (login, signup, verify-otp)
  - These routes are standalone without the main dashboard layout

- **`app/(dashboard)/`** - Main dashboard pages
  - Uses `SidebarProvider` and `AppSidebar` components for navigation
  - All dashboard pages should include the sidebar layout

### API Layer

- **`lib/api/client.ts`** - Axios instance configured with base URL from `NEXT_PUBLIC_BASE_URL`
- **`lib/api/auth/actions.ts`** - Authentication API calls (signup, login, verifySignupOtp)
  - All API functions use the centralized apiClient
  - All functions throw `AxiosError` on failure

### Form Validation

- **`lib/validation/`** - Zod schemas for form validation
  - `userSchema.ts` contains schemas for login, signup, and OTP forms
- Forms use React Hook Form with `@hookform/resolvers/zod` for validation
- Form components are in `components/forms/`

### State Management

- **React Query** (`@tanstack/react-query`) for server state
  - Configured in `providers/ReactQueryClientProvider.tsx`
  - Global error handling via `MutationCache.onError`
  - Errors are automatically displayed as toasts via Sonner
  - Mutations can opt out of global error handling with `meta.skipGlobalErrorHandler`
  - Query defaults: 10min staleTime, 30min gcTime, 2 retries, no refetch on window focus

- **Zustand** for client state (installed but not yet configured)

### UI Components

- Uses **shadcn/ui** components (Radix UI primitives + Tailwind)
- Component library in `components/ui/`
- Custom components:
  - `app-sidebar.tsx` - Main navigation sidebar
  - `nav-main.tsx`, `nav-projects.tsx`, `nav-user.tsx` - Sidebar sections
  - `team-switcher.tsx` - Team/organization switcher

### Styling

- **Tailwind CSS v4** with PostCSS
- Custom fonts: Geist Sans and Geist Mono
- Dark mode support via `next-themes`

## Key Patterns

### Adding New Forms

1. Create Zod schema in `lib/validation/`
2. Create API action in `lib/api/` (use the pattern from auth/actions.ts)
3. Create form component in `components/forms/` using React Hook Form + Controller pattern
4. Use `useMutation` from React Query for form submission
5. Errors are automatically handled globally unless `skipGlobalErrorHandler` is set

### Adding New Dashboard Pages

1. Create page in `app/(dashboard)/[route]/page.tsx`
2. The page automatically inherits the sidebar layout (if needed, wrap in `SidebarProvider`)
3. Use breadcrumbs from `components/ui/breadcrumb` for navigation context

### Custom Field Component

The codebase uses a custom `Field` component (`components/ui/field.tsx`) instead of the standard shadcn Form components. This provides:
- `Field` - Wrapper with data-invalid state
- `FieldLabel` - Label component
- `FieldGroup` - Groups multiple fields
- `FieldError` - Displays validation errors

## Environment Variables

- `NEXT_PUBLIC_BASE_URL` - API base URL (required for API client)

## Import Aliases

- `@/*` maps to project root (configured in tsconfig.json)

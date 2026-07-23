# AGENTS.md

## Project

Snowfox Automation develops tailored automation software for the Canadian defence and intelligence sector.

The public website communicates the company's mission, capabilities, and contact information.

The design language should be:

- professional
- modern
- minimal
- trustworthy
- Canadian
- security-focused

Avoid generic SaaS styling and stock imagery.

## Purpose

This repository contains the public marketing website for Snowfox Automation.

Implement changes that preserve the existing architecture and coding standards. Do not redesign or replace established patterns unless explicitly instructed.

---

# Technology

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui

---

# Architecture

Follow this hierarchy:

Tokens → Variants → Components → Pages

Server Components are the default.

Only introduce Client Components when browser APIs or interactivity require them.

---

# Styling

Never place Tailwind classes in:

- pages
- content files

Tailwind utility classes belong only inside:

- `*.variants.ts`

Components consume variants and contain presentation/behaviour only.

Design tokens originate from:

```
src/styles/tokens.css
```

---

# Content

User-facing copy belongs under:

```
src/content
```

Do not hardcode content inside components.

---

# Components

Prefer composing existing shared components before creating new ones.

Only create a new shared component if genuine reuse exists.

Homepage-specific artwork belongs inside:

```
src/components/home
```

---

# Performance

Prefer:

- Server Components
- Static rendering
- SVG artwork
- CSS animations

Avoid unnecessary JavaScript.

Animations must remain lightweight.

---

# Accessibility

Always preserve:

- semantic HTML
- keyboard accessibility
- focus states
- colour contrast

Respect:

```
prefers-reduced-motion
```

---

# Security

Do not weaken existing protections.

Maintain:

- Turnstile
- Zod validation
- React Hook Form validation
- Honeypot
- Rate limiting

---

# Development

Do not change architecture without explicit approval.

Prefer modifying existing files over introducing abstractions.

Keep components small and focused.

---

## Completion Requirements

Before reporting a task complete:

1. Run:

```sh
npm run build
```

2. Run:

```sh
npm run lint
```

3. Resolve any build or lint failures.

If command execution requires user approval, request approval before proceeding.

Do not report a task complete until the build and lint pass.

When complete, provide:

- a brief summary of the implementation
- the key files changed
- any important implementation notes
- complete Conventional Commit message including subject and body

## Git Commits

Each task should correspond to one logical commit.

Do not combine unrelated work into the same implementation.

If additional improvements are discovered, note them separately rather than including them in the current milestone.

Always suggest commit messages using this format.

Example:

feat: create dedicated contact page

- move the contact form to a dedicated route
- replace the homepage form with a contact call-to-action
- centralize contact page content
- reuse shared content card components
- update navigation for the dedicated contact route
- add schema-driven client-side form validation
- display field-specific validation messages
- improve accessible form error feedback
- simplify success and error message presentation
- retain the header login link

Keep the first line under 72 characters.

The bullet list should describe the user-visible implementation rather than low-level code changes.

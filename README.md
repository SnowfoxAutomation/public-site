# Snowfox Automation Public Website

The public website for **Snowfox Automation**, a Canadian company developing secure AI and automation solutions for the defence and intelligence sector.

This repository contains the marketing website only. It is intentionally separate from the authenticated application to provide a smaller attack surface, simpler deployment, and independent development.

---

# Technology

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- React Hook Form
- Zod
- Resend
- Cloudflare Turnstile

---

# Project Goals

The website should:

- communicate the Snowfox mission
- present company capabilities
- provide a secure contact workflow
- establish a professional visual identity
- load quickly
- be accessible
- be SEO friendly

---

# Design Principles

The website should appear:

- Professional
- Modern
- Minimal
- Trustworthy
- Canadian
- Security-focused

Avoid generic SaaS styling, excessive animation, and stock illustrations.

---

# Architecture

The project follows a strict separation of responsibilities.

```
Tokens
    ↓
Variants
    ↓
Components
    ↓
Pages
```

Server Components are the default.

Client Components are introduced only when browser APIs or interactivity require them.

---

# Folder Structure

```
src/

app/
components/
content/
config/
lib/
styles/
types/
```

## Components

```
components/

shared/
shell/
home/
contact/
state/
ui/
```

Shared components should be reused whenever possible.

Homepage-specific components belong under:

```
components/home
```

---

# Styling

Visual styling follows:

```
Design Tokens
        ↓
Variant Files
        ↓
Components
```

Tailwind utility classes belong only inside:

```
*.variants.ts
```

Component files should not contain styling logic.

---

# Content

User-facing copy belongs under:

```
src/content
```

Components should not hardcode copy.

This allows presentation and content to evolve independently.

---

# Illustrations

Future custom artwork should be implemented as inline SVG components.

Goals:

- lightweight
- responsive
- theme consistent
- accessible
- no external illustration libraries
- no stock artwork

---

# Animation

Animations should be:

- subtle
- purposeful
- lightweight
- GPU friendly

Respect:

```
prefers-reduced-motion
```

Animations should degrade gracefully.

---

# Security

The contact form includes:

- React Hook Form validation
- Zod validation
- Cloudflare Turnstile
- Honeypot protection
- Rate limiting
- Server Actions
- Resend email integration

Future improvements include:

- production rate limiting
- audit logging
- security headers
- spam detection
- abuse protection

---

# Accessibility

Maintain:

- semantic HTML
- keyboard navigation
- visible focus states
- sufficient colour contrast
- reduced motion support

---

# Performance

Prefer:

- Server Components
- SVG artwork
- CSS animations
- static rendering

Avoid unnecessary client-side JavaScript.

---

# Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

---

# Development Standards

- Preserve the existing architecture.
- Prefer extending existing shared components.
- Do not introduce abstractions without clear reuse.
- Keep components focused on a single responsibility.
- Keep styling inside variant files.
- Keep content inside `src/content`.

---

# Definition of Done

Before a task is complete:

1. Build successfully.

```bash
npm run build
```

2. Lint successfully.

```bash
npm run lint
```

3. Resolve all errors.

4. Verify:

- responsive layout
- accessibility
- reduced-motion support

5. Prepare a Conventional Commit message.

Never report a task complete if the build or lint fails.

---

# Roadmap

Future priorities:

- Snowfox visual identity
- Contact form hardening
- SEO improvements
- Accessibility improvements
- Performance optimization
- Legal pages
- Blog / News
- Authentication

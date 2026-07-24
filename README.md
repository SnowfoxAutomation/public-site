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

# Sensitive Information Detection

The `/documents` route provides a proof-of-concept interface for the existing Python PII detection service. It supports multiple-file selection, sequential analysis, upload progress, a configurable minimum confidence threshold and structured findings.

Supported formats are configured centrally and currently include:

- TXT, Markdown, CSV, log and JSON
- DOCX and PPTX
- PDF
- PNG, JPG, JPEG, TIFF, TIF, BMP and WebP

The browser communicates only with same-origin Next.js endpoints under:

```text
/api/document-analysis
```

The Next.js API boundary validates upload limits and backend responses, then communicates with the separately deployed document service. The Python service location and credentials remain server-only:

```bash
DOCUMENT_API_BASE_URL=http://127.0.0.1:8000
DOCUMENT_API_TIMEOUT_MS=120000
DOCUMENT_API_TOKEN=
```

The backend contract is synchronous and accepts one file per request:

```text
POST /analyze
```

The Next.js boundary forwards one multipart `file` and `score_threshold` value. When several files are selected, the frontend analyzes them sequentially to avoid overwhelming the local OCR and transformer process.

The backend returns a PII report containing a summary, findings with entity types and confidence scores, tagged text, and annotated HTML. The frontend validates the response at runtime and renders the structured report and tagged text. Backend-generated HTML is not injected into the page.

The backend must independently verify file signatures, sizes and content. Client and gateway checks are usability and defence-in-depth controls, not substitutes for malware scanning, parser isolation, authorization, secure retention or an approved data-handling environment.

Do not upload classified, protected, export-controlled, personal or operationally sensitive information while this route remains unauthenticated.

## Deployment

For local development, run the Python service separately and configure `DOCUMENT_API_BASE_URL` in `.env.local`.

For Docker or cloud deployment, provide the internal service URL through the same environment variable. Do not bake backend URLs or service tokens into the frontend image. The browser continues using the same-origin API regardless of whether the Python service runs locally, in another container, or as a managed cloud service.

The proof of concept does not provide backend jobs, persistent history or true server-side cancellation. Stopping a request stops the frontend from waiting, but the synchronous backend may continue processing that request.

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

Test:

```bash
npm run test
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

4. Run automated tests.

```bash
npm run test
```

5. Verify:

- responsive layout
- accessibility
- reduced-motion support

6. Prepare a Conventional Commit message.

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

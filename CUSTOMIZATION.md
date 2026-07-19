# Customization Guide

How to personalize the Clarity Developer Set shell.

## Table of contents

1. [Site configuration](#site-configuration)
2. [Projects (JSON workflow)](#projects-json-workflow)
3. [Route stubs](#route-stubs)
4. [Contact form](#contact-form)
5. [Navigation & footer](#navigation--footer)
6. [Colors & theme](#colors--theme)
7. [Typography](#typography)
8. [Adding sections (design phase)](#adding-sections-design-phase)
9. [Adding a new page](#adding-a-new-page)
10. [Tips](#tips)

---

## Site configuration

**File:** `config/site.ts`

Central config for brand, nav, contact, social links, and hero copy.

```typescript
export const siteConfig = {
  name: "John Doe",
  shortName: "John",
  role: "Front End Developer",
  description: "Your custom description",
  url: "https://johndoe.dev",
  contact: {
    location: "United States",
    email: "john.doe@example.com",
  },
  navItems: [
    { title: "Home", href: "/" },
    { title: "Projects", href: "/projects" },
    { title: "Contact", href: "/contact" },
  ],
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "mailto:john.doe@example.com",
  },
}
```

Consumed by: `site-navbar`, `site-footer`, contact page, home hero, and `app/layout.tsx` metadata. Do not duplicate URLs elsewhere.

### Hero copy

Under `siteConfig.hero`:

| Field | Purpose |
| ----- | ------- |
| `headlineSuffix` | Text after the name in the H1 |
| `bio` | Supporting paragraph |
| `primaryCta` / `secondaryCta` | Label + href for the two actions |
| `stats` | Three `{ label, value }` items in the meta bar |

Component: `components/sections/hero-section.tsx`.

### Disciplines / skills

Under `siteConfig.disciplines`:

| Field | Purpose |
| ----- | ------- |
| `title` | Section heading |
| `intro` | Supporting paragraph |
| `items` | Rows: `{ title, description, tools: string[] }` |

Component: `components/portfolio/disciplines-section.tsx`.

### Case studies / technical work

Under `siteConfig.caseStudies`:

| Field | Purpose |
| ----- | ------- |
| `title` | Section heading |
| `intro` | Supporting paragraph |
| `ctaLabel` | Card link text (default “Read case study”) |

Card content comes from **featured** projects in `data/projects.json`. Useful fields: `label`, `year`, `keyOutcome`, `description`, `coverImage`, `tags`.

Component: `components/portfolio/case-studies-section.tsx`.

---

## Projects (JSON workflow)

All projects read from one file:

**File:** `data/projects.json`

Helpers live in `lib/projects-data.ts` (types, published filter, SSG slugs, SVG placeholders).

### Required fields

`id`, `slug`, `title`, `description`, `category`, `tech`, `completed`

### Useful optional fields

| Field           | Purpose                                      |
| --------------- | -------------------------------------------- |
| `status`        | `"draft"` hides the project                  |
| `featured`      | Marks projects for a future homepage strip   |
| `client`        | Shown on the detail page                     |
| `duration`      | Shown on the detail page                     |
| `websiteUrl`    | Live site button                             |
| `githubUrl`     | GitHub button                                |
| `highlights`    | Bullet list on the detail page               |
| `coverImage`    | Path under `/public` or a full URL           |

### Enums

- `category`: `"creative" | "real-estate" | "corporate"`
- `tech`: `"wordpress" | "react" | "nextjs" | "php"`

Workflow: edit JSON → `npm run dev` → commit → push → host redeploys.

---

## Route stubs

| Route              | File                         | Notes                                      |
| ------------------ | ---------------------------- | ------------------------------------------ |
| `/`                | `app/page.tsx`               | Home — editorial hero section              |
| `/projects`        | `app/projects/page.tsx`      | Simple list from JSON                      |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | Detail shell + `generateStaticParams`    |
| `/contact`         | `app/contact/page.tsx`       | Info from config + form stub               |

Stubs are valid and accessible. Labels like “replace with your design” mark what to redesign.

---

## Contact form

**File:** `components/contact-form.tsx`

UI-only: `preventDefault` on submit. To go live, connect a provider (Formspree, Getform, Resend + API route, etc.) inside `handleSubmit` or via a form `action` URL.

Do not add a database, Prisma, or admin dashboard for the default product.

---

## Navigation & footer

- **Navbar:** `components/site-navbar.tsx` — reads `siteConfig.navItems` and `siteConfig.name`
- **Footer:** `components/site-footer.tsx` — social icons from `siteConfig.links` only

Edit config first; only change these components when designing a new layout.

---

## Colors & theme

**File:** `app/globals.css`

Light minimal tokens live on `:root` as CSS variables (`--background`, `--foreground`, `--primary`, …). Tailwind maps them via `tailwind.config.ts`.

Prefer theme classes (`bg-background`, `text-muted-foreground`) over hardcoded hex in components.

---

## Typography

Default font is set in `app/layout.tsx` (Next.js `next/font`). Swap it during design for a more distinctive typeface.

---

## Adding sections (design phase)

1. Create files under `components/sections/` (e.g. `hero-section.tsx`)
2. Import them from `app/page.tsx`
3. Keep copy tied to `config/site.ts` / `data/projects.json` where possible

Do not clone another Portfolio Sets product’s sections unless you intentionally want that design.

---

## Adding a new page

1. Add `app/your-page/page.tsx`
2. Add a nav item in `config/site.ts`
3. Keep a single `h1` and accessible landmarks

---

## Tips

- One source of truth for identity (`config/site.ts`) and projects (`data/projects.json`)
- Prefer small edits over rewrites
- Run `npm run build` before you deploy
- Private Git repo + Vercel is the intended publish path (see `LICENSE.md`)

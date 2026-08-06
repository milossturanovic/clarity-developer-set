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
| `primaryCta` / `secondaryCta` | Label + href (secondary defaults to resume PDF download) |
| `image` / `imageAlt` | Hero panel image URL (Pexels or `/public`) and alt text |
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

### Services

Under `siteConfig.services`:

| Field | Purpose |
| ----- | ------- |
| `title` / `intro` | Heading and supporting copy |
| `items` | `{ id, title, description, image?, imageTone }` |

Hover/focus a list item to update the left preview and accent title. Component: `components/portfolio/services-section.tsx`.

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
| `label`         | Category pill and “Category” sidebar row     |
| `year`          | Year shown on cards and rows                 |
| `role`          | Your contribution, e.g. “Solo front end build” |
| `deliverables`  | Ruled list on the `/projects` rows           |
| `keyOutcome`    | Bold metric on homepage cards                |
| `summary`       | One-sentence hero line on the case study     |
| `caseStudy`     | Long-form body — see below                   |
| `client`        | Shown on the detail page                     |
| `duration`      | Shown on the detail page                     |
| `websiteUrl`    | Live preview button                          |
| `githubUrl`     | View source button                           |
| `highlights`    | Fallback list when `deliverables` is missing |
| `coverImage`    | Path under `/public` or a full URL           |

### Case-study content

`caseStudy` powers the long-form body on `/projects/[slug]`:

```json
"caseStudy": {
  "intro": "Opening paragraph.",
  "sections": [
    { "title": "The challenge", "body": "..." },
    { "title": "The approach", "body": "..." }
  ]
}
```

Add or rename sections freely — they render in order. Sidebar labels (Project info,
Technologies, Related projects, share and next-project text) live in
`config/site.ts` → `caseStudyPage`.

Share links build their URL from `siteConfig.url`, so set that to your real domain
before launch.

### Enums

- `category`: `"creative" | "real-estate" | "corporate"`
- `tech`: `"wordpress" | "react" | "nextjs" | "php"`

Workflow: edit JSON → `npm run dev` → commit → push → host redeploys.

---

## Route stubs

| Route              | File                         | Notes                                      |
| ------------------ | ---------------------------- | ------------------------------------------ |
| `/`                | `app/page.tsx`               | Home — editorial hero section              |
| `/projects`        | `app/projects/page.tsx`      | Alternating selected-work rows             |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | Case study + `generateStaticParams`      |
| `/contact`         | `app/contact/page.tsx`       | Channels, availability + message form      |

Stubs are valid and accessible. Labels like “replace with your design” mark what to redesign.

---

## Contact page

**Files:** `app/contact/page.tsx` (server) and `components/contact-form.tsx` (client)

All copy lives in `config/site.ts` → `contactPage`:

| Field              | Purpose                                               |
| ------------------ | ----------------------------------------------------- |
| `title` / `intro`  | Page heading and opening paragraph                    |
| `channels`         | The stacked cards (email, response time, availability, location) |
| `openTo`           | Ruled list of the work you want to be contacted about |
| `form`             | Labels, project types, consent line, success message  |

Each channel takes an `icon` key: `"mail"`, `"clock"`, `"calendar"`, `"map"`,
`"github"`, or `"linkedin"`. Add an `href` to make the value a link, or omit it
for plain text.

### Wiring the form

The form validates in the browser and shows a success panel, but nothing is sent
by default. Replace the body of `sendInquiry` in `components/contact-form.tsx`
with your provider (Formspree, Getform, Resend + a route handler, ...), then
delete `contactPage.form.stubNote` from `config/site.ts` to remove the demo
notice under the button.

Do not add a database, Prisma, or admin dashboard for the default product.

---

## Navigation & footer

- **Navbar:** `components/site-navbar.tsx` — reads `siteConfig.navItems` and `siteConfig.name`
- **Footer:** `components/site-footer.tsx` — global (root layout). Blurb + availability from `siteConfig.footer`; socials from `siteConfig.links` (X, LinkedIn, Instagram, GitHub); email from `contact.email`

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

# Customization Guide

How to personalize the Clarity Developer Set portfolio template.

## Table of contents

1. [Site configuration](#site-configuration)
2. [Projects (JSON workflow)](#projects-json-workflow)
3. [Pages](#pages)
4. [Contact page](#contact-page)
5. [Navigation & footer](#navigation--footer)
6. [Images](#images)
7. [Colors & theme](#colors--theme)
8. [Typography](#typography)
9. [Adding a new section](#adding-a-new-section)
10. [Adding a new page](#adding-a-new-page)
11. [Tips](#tips)

---

## Site configuration

**File:** `config/site.ts`

Central config for brand, nav, contact, social links, and all section copy.

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
    instagram: "https://instagram.com/yourusername",
    email: "mailto:john.doe@example.com",
  },
}
```

Also edit these blocks in the same file:

| Block | Used by |
| ----- | ------- |
| `footer` | Global footer blurb + availability |
| `hero` | Home hero |
| `disciplines` | Skills section |
| `services` | Services preview list |
| `caseStudies` | Homepage project cards title/intro/CTA |
| `projectsPage` | `/projects` title, intro, row CTA |
| `caseStudyPage` | Labels on `/projects/[slug]` |
| `contactPage` | Channels, open-to list, form copy |

Consumed by navbar, footer, contact, home sections, and `app/layout.tsx` metadata. Do not duplicate URLs elsewhere.

### Hero

| Field | Purpose |
| ----- | ------- |
| `headlineSuffix` | Text after the name in the H1 |
| `bio` | Supporting paragraph |
| `primaryCta` / `secondaryCta` | Label + href (secondary defaults to `/resume.pdf`) |
| `image` / `imageAlt` | Hero panel path under `/public` (or remote URL) and alt text |
| `stats` | Three `{ label, value }` items |

Component: `components/sections/hero-section.tsx`.

### Disciplines / skills

| Field | Purpose |
| ----- | ------- |
| `title` / `intro` | Section heading and supporting copy |
| `items` | Rows: `{ title, description, tools: string[] }` |

Component: `components/portfolio/disciplines-section.tsx`.

### Services

| Field | Purpose |
| ----- | ------- |
| `title` / `intro` | Heading and supporting copy |
| `items` | `{ id, title, description, image?, imageTone }` |

Hover/focus a list item to update the left preview. Component: `components/portfolio/services-section.tsx`.

### Case studies (homepage cards)

| Field | Purpose |
| ----- | ------- |
| `title` / `intro` | Section heading and supporting copy |
| `ctaLabel` | Card link text |

Card content comes from **featured** projects in `data/projects.json`. Useful fields: `label`, `year`, `keyOutcome`, `description`, `coverImage`, `tags`.

Component: `components/portfolio/case-studies-section.tsx`.

### Projects page

Under `siteConfig.projectsPage`: title, intro, and `ctaLabel` for the alternating rows on `/projects`.

### Case study page labels

Under `siteConfig.caseStudyPage`: sidebar headings, live/source button labels, share label, next-project label.

---

## Projects (JSON workflow)

All projects read from one file:

**File:** `data/projects.json`

Helpers live in `lib/projects-data.ts` (types, published filter, SSG slugs, placeholders).

If this file is missing or invalid JSON, **`npm run build` fails** so you catch it before deploy.

### Required fields

`id`, `slug`, `title`, `description`, `category`, `tech`, `completed`

### Useful optional fields

| Field           | Purpose                                      |
| --------------- | -------------------------------------------- |
| `status`        | `"draft"` hides the project                  |
| `featured`      | Shows on the homepage case-studies grid      |
| `label`         | Category pill and sidebar “Category”         |
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

Add or rename sections freely — they render in order.

Share links use `siteConfig.url`, so set that to your real domain before launch.

### Enums

- `category`: `"creative" | "real-estate" | "corporate"`
- `tech`: `"wordpress" | "react" | "nextjs" | "php"`

Workflow: edit JSON → `npm run dev` → commit → push → host redeploys.

---

## Pages

Designed routes (no stubs to replace):

| Route              | File                           | Notes                                      |
| ------------------ | ------------------------------ | ------------------------------------------ |
| `/`                | `app/page.tsx`                 | Hero → Services → Disciplines → Case studies |
| `/projects`        | `app/projects/page.tsx`        | Alternating selected-work rows             |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | Case study + `generateStaticParams`        |
| `/contact`         | `app/contact/page.tsx`         | Channels, availability + message form      |

---

## Contact page

**Files:** `app/contact/page.tsx` (server) and `components/contact-form.tsx` (client)

All copy lives in `config/site.ts` → `contactPage`:

| Field              | Purpose                                               |
| ------------------ | ----------------------------------------------------- |
| `title` / `intro`  | Page heading and opening paragraph                    |
| `channels`         | Stacked cards (email, response time, availability, location) |
| `openTo`           | Ruled list of the work you want to be contacted about |
| `form`             | Labels, project types, consent line, success message, `stubNote` |

Each channel takes an `icon` key: `"mail"`, `"clock"`, `"calendar"`, `"map"`, `"github"`, or `"linkedin"`. Add an `href` to make the value a link, or omit it for plain text.

### Wiring the form

The form validates in the browser and shows a success panel, but **nothing is sent** until you connect a provider.

**Recommended (easiest):** [Formspree](https://formspree.io) — replace the body of `sendInquiry` in `components/contact-form.tsx` with a `fetch` to your Formspree endpoint (copy-paste example is in the file header and in `DEPLOYMENT.md`).

Also works: Getform, Basin, or Resend + `app/api/contact/route.ts` with an API key in host env vars (never commit `.env` files).

When live, delete `contactPage.form.stubNote` from `config/site.ts` to remove the demo notice under the button.

Do not add a database, Prisma, or admin dashboard for the default product.

---

## Navigation & footer

- **Navbar:** `components/site-navbar.tsx` — reads `siteConfig.navItems` and `siteConfig.name`
- **Footer:** `components/site-footer.tsx` — global (root layout). Blurb + availability from `siteConfig.footer`; socials from `siteConfig.links`; email from `contact.email`

Edit config first; only change these components when designing a new layout.

---

## Images

| Asset | Path |
| ----- | ---- |
| Hero | `public/hero.png` (or change `hero.image` in config) |
| Service previews | `public/services/*.png` (paths in `services.items[].image`) |
| Project covers | `public/projects/*.jpg` (or URLs) via each project’s `coverImage` |
| Resume PDF | `public/resume.pdf` — add your file for the hero download CTA |

Commit everything under `public/` before deploy. Local paths are served from that folder; remote URLs load from the internet.

---

## Colors & theme

**File:** `app/globals.css`

Light minimal tokens live on `:root` as CSS variables (`--background`, `--foreground`, `--primary`, …). Tailwind maps them via `tailwind.config.ts`.

Prefer theme classes (`bg-background`, `text-muted-foreground`) over hardcoded hex in components.

---

## Typography

Default font is set in `app/layout.tsx` (Next.js `next/font`). Swap it there if you want a different typeface.

---

## Adding a new section

Home already includes Hero, Services, Disciplines, and Case studies. To add another:

1. Create a file under `components/sections/` or `components/portfolio/`
2. Import it from `app/page.tsx`
3. Keep copy in `config/site.ts` / `data/projects.json` where possible

---

## Adding a new page

1. Add `app/your-page/page.tsx`
2. Add a nav item in `config/site.ts` → `navItems`
3. Keep a single `h1` and accessible landmarks

---

## Tips

- One source of truth for identity (`config/site.ts`) and projects (`data/projects.json`)
- Prefer small edits over rewrites
- Run `npm run build` before you deploy (it fails if `projects.json` is missing or invalid)
- Push to GitHub (public or private) and deploy on Vercel (see `LICENSE.md` and `DEPLOYMENT.md`)

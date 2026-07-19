# Clarity Developer Set

A light minimal developer portfolio **shell** built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui. Ready for you (or your designer) to build unique sections on top of a standards-compliant foundation.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwindcss)

---

## What's inside

- **Routes**: Home (`/`), `/projects`, `/projects/[slug]`, `/contact`
- **Shell UI**: Minimal navbar + footer wired to `config/site.ts`
- **Home hero**: Editorial two-column layout (copy + stats + image panel)
- **Content workflow**: Projects from `data/projects.json` only
- **No backend, no database, no env vars required**

---

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build
npm run start
```

---

## How to edit your portfolio

1. **Edit `config/site.ts`** — name, role, email, social links, nav
2. **Edit `data/projects.json`** — add, edit, or remove projects
3. **Run `npm run dev`** to preview
4. **`git commit` and `git push`** — your host redeploys

No CMS, no database, no admin login.

### Project schema

Required: `id`, `slug`, `title`, `description`, `category`, `tech`, `completed`.

Optional: `featured`, `status`, `client`, `duration`, `completionDate`, `websiteUrl`, `githubUrl`, `tags`, `highlights`, `impact`, `coverImage`, `screenshots`.

Enums:

- `category`: `"creative" | "real-estate" | "corporate"`
- `tech`: `"wordpress" | "react" | "nextjs" | "php"`
- `status`: `"published"` (default) or `"draft"` (hidden)

Full schema: top of `lib/projects-data.ts`.

---

## Where to edit

| What you want to change        | File                          |
| ------------------------------ | ----------------------------- |
| Site name, role, email, social | `config/site.ts`              |
| Page title & meta description  | `config/site.ts` (via layout) |
| Projects (every page)          | `data/projects.json`          |
| Hero headline, bio, CTAs, stats | `config/site.ts` → `hero`    |
| Hero layout                     | `components/sections/hero-section.tsx` |
| Contact form stub              | `components/contact-form.tsx` |
| Theme colors                   | `app/globals.css`             |
| New homepage sections          | `components/sections/`        |

See `CUSTOMIZATION.md` for details.

---

## Project structure

```
clarity-developer-set/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx                 # home → HeroSection
│   ├── contact/page.tsx
│   └── projects/
│       ├── page.tsx
│       └── [slug]/page.tsx
├── components/
│   ├── site-navbar.tsx
│   ├── site-footer.tsx
│   ├── contact-form.tsx
│   ├── sections/
│   │   └── hero-section.tsx
│   └── ui/                      # shadcn primitives
├── config/site.ts
├── data/projects.json
├── lib/projects-data.ts
└── public/
```

---

## Documentation

| File                         | Purpose                          |
| ---------------------------- | -------------------------------- |
| `QUICK-START.md`             | 15-minute setup checklist        |
| `CUSTOMIZATION.md`           | Edit paths for the shell         |
| `DEPLOYMENT.md`              | Vercel-first deploy guide        |
| `AI_CUSTOMIZATION_PROMPT.md` | Copy-paste AI prompt             |
| `LICENSE.md`                 | Terms + Git hosting exception    |

---

## License

See `LICENSE.md`. You may deploy from a **private** Git repo. Do not publish the template source publicly or redistribute the zip.

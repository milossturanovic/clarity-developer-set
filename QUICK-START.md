# Quick Start Checklist

Get the Clarity Developer Set portfolio running in about 15 minutes.

## Prerequisites

- **Node.js 18.17+** (Node 20 LTS recommended) — `node --version`
- **npm 9+** — `npm --version`
- **Git 2.30+** — for the edit → commit → push deploy workflow

No environment variables are required for the default template.

---

## Setup (5 minutes)

- [ ] **Extract the bundle** to your desired location
- [ ] **Open a terminal** in the project folder
- [ ] **Install dependencies:**
  ```bash
  npm install
  ```
- [ ] **Start the dev server:**
  ```bash
  npm run dev
  ```
- [ ] **Open** <http://localhost:3000> and confirm the site loads
- [ ] **Click through** `/`, `/projects`, one project case study, and `/contact`

---

## Essential customization (10 minutes)

### 1. Site branding (3 min)

**File:** `config/site.ts`

- [ ] Change `name`, `shortName`, and `role`
- [ ] Update `description` and `url` (use your real domain — share links use this)
- [ ] Set `contact.location` and `contact.email`
- [ ] Replace social URLs in `links` (GitHub, LinkedIn, X, Instagram, email)
- [ ] Skim `footer`, `hero`, `services`, `disciplines`, and `contactPage` and adjust copy

Page title and meta description update via `app/layout.tsx`.

### 2. Projects (5 min)

**File:** `data/projects.json`

- [ ] Replace the 3 demo projects with your own
- [ ] Set `"status": "draft"` to temporarily hide a project
- [ ] Keep required fields: `id`, `slug`, `title`, `description`, `category`, `tech`, `completed`
- [ ] Fill case-study fields where useful: `summary`, `caseStudy`, `role`, `deliverables`, `coverImage`

### 3. Contact (2 min)

- [ ] Confirm email/location from `config/site.ts` look correct on `/contact`
- [ ] Note: the form is UI-only until you wire a provider (see `CUSTOMIZATION.md`)

---

## Optional polish

- [ ] Swap the hero image at `public/hero.png`
- [ ] Swap service preview images under `public/services/`
- [ ] Add your PDF at `public/resume.pdf` (hero “Download resume” CTA)
- [ ] Update project `coverImage` paths or URLs in `data/projects.json`
- [ ] Tweak theme colors in `app/globals.css`
- [ ] Change the font in `app/layout.tsx`
- [ ] Copy the prompt from `AI_CUSTOMIZATION_PROMPT.md` into your AI tool

---

## Pre-launch

- [ ] Spell-check text in `config/site.ts` and `data/projects.json`
- [ ] Verify external links (socials, live sites, GitHub)
- [ ] Confirm images under `public/` are committed (Vercel only deploys what’s in git)
- [ ] Test the mobile menu on a phone or browser tools
- [ ] Click through `/`, `/projects`, a case study slug, and `/contact` again
- [ ] Production build:
  ```bash
  npm run build
  npm run start
  ```

---

## Deployment

- [ ] Commit:
  ```bash
  git add .
  git commit -m "Initial portfolio content"
  ```
- [ ] Push to GitHub (**private** repo recommended — see `LICENSE.md`)
- [ ] Import the repo into [Vercel](https://vercel.com)
- [ ] Deploy — no environment variables required

Later: edit `data/projects.json` or `config/site.ts`, commit, push. Done.

See `DEPLOYMENT.md` for other hosts.

---

## Pro tips

1. **Use Git from day one.** Editing config/JSON + pushing is the publishing workflow.
2. **Edit `config/site.ts` first.** Name, role, email, and socials flow to navbar, footer, and contact.
3. **Content first.** Homepage, projects, case studies, and contact are already designed — swap your details and images, then deploy.
4. **Don’t over-customize on day one.** Ship content, iterate on visuals later.

---

## More documentation

- `README.md` — overview and structure
- `CUSTOMIZATION.md` — file-by-file guide
- `DEPLOYMENT.md` — host-specific steps
- `AI_CUSTOMIZATION_PROMPT.md` — AI prompt
- `LICENSE.md` — terms + Git hosting exception

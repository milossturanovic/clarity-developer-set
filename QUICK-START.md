# Quick Start Checklist

Get the Clarity Developer Set shell running in about 15 minutes.

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
- [ ] **Open** <http://localhost:3000> and confirm the shell loads

---

## Essential customization (10 minutes)

### 1. Site branding (3 min)

**File:** `config/site.ts`

- [ ] Change `name`, `shortName`, and `role`
- [ ] Update `description` and `url`
- [ ] Set `contact.location` and `contact.email`
- [ ] Replace social URLs in `links` (GitHub, LinkedIn, email)

Page title and meta description update via `app/layout.tsx`.

### 2. Projects (5 min)

**File:** `data/projects.json`

- [ ] Replace the 2 placeholder projects with your own
- [ ] Set `"status": "draft"` to temporarily hide a project
- [ ] Keep required fields: `id`, `slug`, `title`, `description`, `category`, `tech`, `completed`

### 3. Contact (2 min)

- [ ] Confirm email/location from `config/site.ts` look correct on `/contact`
- [ ] Note: the form is UI-only until you wire a provider (see `CUSTOMIZATION.md`)

---

## Optional polish

- [ ] Tweak theme colors in `app/globals.css`
- [ ] Change the font in `app/layout.tsx`
- [ ] Replace home stub in `app/page.tsx` with your designed sections under `components/sections/`
- [ ] Copy the prompt from `AI_CUSTOMIZATION_PROMPT.md` into your AI tool

---

## Pre-launch

- [ ] Spell-check text in `config/site.ts` and `data/projects.json`
- [ ] Verify external links
- [ ] Test the mobile menu on a phone or browser tools
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

Later: edit `data/projects.json`, commit, push. Done.

See `DEPLOYMENT.md` for other hosts.

---

## Pro tips

1. **Use Git from day one.** Editing JSON + pushing is the publishing workflow.
2. **Edit `config/site.ts` first.** Name, role, email, and socials flow to navbar, footer, and contact.
3. **This is a shell.** Design homepage sections when you are ready — stubs are intentional.
4. **Don’t over-customize on day one.** Ship content, iterate on visuals later.

---

## More documentation

- `README.md` — overview and structure
- `CUSTOMIZATION.md` — file-by-file guide
- `DEPLOYMENT.md` — host-specific steps
- `AI_CUSTOMIZATION_PROMPT.md` — AI prompt
- `LICENSE.md` — terms + Git hosting exception

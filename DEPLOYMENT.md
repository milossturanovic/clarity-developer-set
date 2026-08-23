# Deployment Guide

Deploying Clarity Developer Set to common hosts.

> The template requires **no environment variables** out of the box. Content lives in `config/site.ts` and `data/projects.json` (tracked in git). Every push to your main branch redeploys the latest portfolio.

## Before you deploy

- [ ] Run `npm run build` locally — fix any errors before pushing
- [ ] Set `url` in `config/site.ts` to your real domain (used for case-study share links)
- [ ] Commit files under `public/` — hero, service images, project covers, optional `resume.pdf`. Vercel only serves assets that are in your repo
- [ ] Wire the contact form if you need live submissions (see below); the default form is UI-only

## Contact form (recommended wiring)

The contact form validates and shows a success state, but **nothing is emailed until you connect a provider**. Best options for this template (no database):

### Option A — Formspree (simplest)

1. Create a free form at [formspree.io](https://formspree.io) and copy your form endpoint (`https://formspree.io/f/xxxxxx`).
2. Open `components/contact-form.tsx` and replace the body of `sendInquiry` with:

```ts
async function sendInquiry(values: FormValues): Promise<void> {
  const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(values),
  })
  if (!res.ok) throw new Error("Failed to send")
}
```

3. Delete `contactPage.form.stubNote` from `config/site.ts` so the demo notice disappears.

### Option B — Getform / Basin / similar

Same pattern as Formspree: `POST` JSON (or `FormData`) to their endpoint inside `sendInquiry`.

### Option C — Resend (or similar) + a Next.js route handler

1. Add a route like `app/api/contact/route.ts` that sends mail with your provider’s API.
2. Put the API key in Vercel **Environment Variables** (never commit `.env` files).
3. From `sendInquiry`, `fetch("/api/contact", { method: "POST", body: JSON.stringify(values) })`.

Full field notes: `CUSTOMIZATION.md` → Contact page.

---

## Recommended: Vercel

Vercel is built by the creators of Next.js and offers the best integration.

### Deploy from GitHub (recommended)

> **License note:** You may use a **private** GitHub repository to deploy your customized portfolio. That is the intended workflow. Do **not** publish the template source as a public repo or share it as a starter kit. See `LICENSE.md` → *Git Hosting and Deployment*.

1. **Push your code to GitHub** (create a **private** repository):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js
   - Click "Deploy"

3. **Done.** Your site is live in about two minutes.

### Deploy with Vercel CLI

```bash
npm i -g vercel
vercel
```

### Custom domain on Vercel

1. Project → Settings → Domains
2. Add your domain and follow DNS instructions
3. SSL is issued automatically

---

## Netlify (App Router)

This template uses the Next.js **App Router**. Do **not** treat it like a static site and publish `.next` by itself — that breaks routing and server features.

1. Install the official plugin once:
   ```bash
   npm install -D @netlify/plugin-nextjs
   ```
2. Add a `netlify.toml` at the project root:
   ```toml
   [build]
     command = "npm run build"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```
3. In the Netlify UI, connect your Git repo (Node **18+**). Leave build settings to `netlify.toml` / auto-detect. Or deploy with the CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```
4. **Environment variables:** not required by default. Add any you introduce later (e.g. a mail API key) under Site configuration → Environment variables.

For the fewest moving parts, **Vercel is still the recommended host** for this product.

---

## Railway

1. Connect the repository at [railway.app](https://railway.app)
2. Railway detects Next.js — deploy
3. Or use the Railway CLI (`railway up`)

No env vars required for the default template.

---

## AWS Amplify

1. Amplify Hosting → New app → Host web app
2. Connect your Git provider
3. Build settings (Amplify usually auto-detects Next.js):
   - Build command: `npm run build`
   - Node 18+
4. Save and deploy

---

## DigitalOcean App Platform

1. Create app from GitHub
2. Select the repo (keep it **private**)
3. Use the detected Next.js buildpack
4. Deploy — no env vars required by default

---

## VPS / Node server

```bash
npm install
npm run build
npm run start
```

Put a reverse proxy (Nginx/Caddy) in front and point DNS at the server. Use a process manager (PM2, systemd) for production.

---

## After you deploy

Publishing updates is the same everywhere:

1. Edit `config/site.ts`, `data/projects.json`, and/or files in `public/`
2. `git commit` and `git push`
3. Wait for the host to redeploy

### Static images

Local image paths (e.g. `/hero.png`, `/services/responsive-layouts.png`) are served from `public/`. They are **not** uploaded separately — they deploy with your git commit. Remote URLs in config or JSON (Pexels, etc.) load from the internet and do not need to live in `public/`.

---

## Troubleshooting

| Issue | What to try |
| ----- | ----------- |
| Build fails | Run `npm run build` locally; fix TypeScript/ESLint errors |
| Broken images after deploy | Confirm files exist in `public/` and were committed (`git add public/`) |
| Dev server weird errors (`Cannot find module './vendor-chunks/...'`) | Stop the server, delete `.next`, run `npm run dev` again |
| 404 on project pages | Confirm `slug` values in JSON; rebuild so SSG params regenerate |
| Styles missing | Ensure `app/globals.css` is imported in `app/layout.tsx` |
| Wrong metadata or share URLs | Edit `url`, `name`, and `description` in `config/site.ts` |
| Contact form does nothing | Expected until wired — see [Contact form](#contact-form-recommended-wiring) and `components/contact-form.tsx` |

---

## License reminder

- **Allowed:** private repo + Vercel/Netlify/etc. + public live portfolio site
- **Not allowed:** public template source, sharing the zip, reselling as a starter

Full terms: `LICENSE.md`.

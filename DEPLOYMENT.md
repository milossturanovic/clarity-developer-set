# Deployment Guide

Deploying Clarity Developer Set to common hosts.

> The template requires **no environment variables** out of the box. Content lives in `data/projects.json` (tracked in git). Every push to your main branch redeploys the latest portfolio.

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

## Netlify

1. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18 or higher

2. Connect your Git repo for auto-deploys on push, or use the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

3. **Environment variables:** not required by default. Add any you introduce later under Site settings.

---

## Railway

1. Connect the repository at [railway.app](https://railway.app)
2. Railway detects Next.js — deploy
3. Or use the Railway CLI (`railway up`)

No env vars required for the default shell.

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

1. Edit `data/projects.json` and/or `config/site.ts`
2. `git commit` and `git push`
3. Wait for the host to redeploy

---

## Troubleshooting

| Issue | What to try |
| ----- | ----------- |
| Build fails | Run `npm run build` locally; fix TypeScript/ESLint errors |
| 404 on project pages | Confirm `slug` values in JSON; rebuild so SSG params regenerate |
| Styles missing | Ensure `app/globals.css` is imported in `app/layout.tsx` |
| Wrong metadata | Edit `config/site.ts` — layout reads from there |

---

## License reminder

- **Allowed:** private repo + Vercel/Netlify/etc. + public live portfolio site
- **Not allowed:** public template source, sharing the zip, reselling as a starter

Full terms: `LICENSE.md`.

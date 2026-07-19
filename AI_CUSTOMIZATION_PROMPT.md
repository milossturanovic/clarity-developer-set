# AI Customization Prompt

Copy the prompt below into ChatGPT, Claude, or Cursor after you unzip the template. Replace the bracketed placeholders with your details.

---

```text
I purchased the Clarity Developer Set (Next.js 14 portfolio shell). Help me customize it for my job search. Do not add a database, admin panel, or backend unless I ask. Do not clone another Portfolio Sets product’s sections unless I request a specific design.

My details:
- Name: [Your Name]
- Role/title: [e.g. Junior Frontend Developer]
- Location: [City, Country]
- Email: [your@email.com]
- GitHub: [URL]
- LinkedIn: [URL]
- Skills to highlight: [e.g. React, TypeScript, Tailwind]
- Target roles: [e.g. junior frontend, freelance web dev]

Project workflow rules (important):
- All projects live in data/projects.json — edit that file only for project content.
- Site name, role, email, location, nav, and social links live in config/site.ts.
- Page title and meta description in app/layout.tsx read from config/site.ts automatically.
- Home is a stub in app/page.tsx — replace with designed sections under components/sections/ when I ask for design work.
- Contact form is UI-only in components/contact-form.tsx.
- Footer and navbar social links read from config/site.ts — do not duplicate URLs elsewhere.

Tasks (do in order):
1. Update config/site.ts with my real branding and links.
2. Replace the placeholder projects in data/projects.json with [N] real or realistic portfolio projects. Keep valid slugs and required fields (id, slug, title, description, category, tech, completed).
3. Lightly update the home stub copy in app/page.tsx so it uses my name/role from config (or imports siteConfig).
4. List every file you changed and give me a short test checklist (npm run dev, npm run build).

Constraints:
- Keep TypeScript types valid.
- Do not break existing routes (/ , /projects, /projects/[slug], /contact).
- Do not introduce Supabase, Prisma, or env vars unless required for a feature I requested.
- Prefer small, focused edits over rewriting entire components.
- This is a shell — do not invent a full marketing homepage unless I ask for a design phase.
```

---

## Tips

- Run **one step at a time** if the model makes mistakes (e.g. only `config/site.ts` and `data/projects.json` first).
- After AI edits, always run `npm run dev` and click through every page before deploying.
- Commit after each working batch: `git commit -am "Customize site config and projects"`.

## More help

- `QUICK-START.md` — 15-minute setup checklist
- `CUSTOMIZATION.md` — file-by-file reference
- `DEPLOYMENT.md` — publish to Vercel

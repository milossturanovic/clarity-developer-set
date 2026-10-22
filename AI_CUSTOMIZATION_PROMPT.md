# AI Customization Prompt

Copy the prompt below into ChatGPT, Claude, or Cursor after you unzip the template. Replace the bracketed placeholders with your details.

---

```text
I cloned the free Clarity Developer Set (Next.js 14 portfolio template, MIT). Help me customize it for my job search. The design is already built — do not redesign layouts or rebuild sections unless I explicitly ask.

Do not add a database, admin panel, or backend unless I ask. Do not clone another Portfolio Sets product’s sections unless I request a specific design.

My details:
- Name: [Your Name]
- Role/title: [e.g. Junior Frontend Developer]
- Location: [City, Country]
- Email: [your@email.com]
- GitHub: [URL]
- LinkedIn: [URL]
- Skills to highlight: [e.g. React, TypeScript, Tailwind]
- Target roles: [e.g. junior frontend, freelance web dev]

What is already built (do not rebuild unless I ask):
- Home (/) — Hero, Services, Disciplines, Case studies
- Projects (/projects) — alternating selected-work rows
- Case study pages (/projects/[slug]) — long-form detail with sidebar
- Contact (/contact) — channels + message form
- Navbar and footer (global layout)

Project workflow rules (important):
- All project content lives in data/projects.json — edit that file only for projects.
- Site branding, section copy, nav, social links, and page labels live in config/site.ts.
- Page title and meta description in app/layout.tsx read from config/site.ts automatically.
- Home page (app/page.tsx) already composes designed sections — edit copy in config/site.ts, not the page layout.
- Contact form is UI-only in components/contact-form.tsx (wire sendInquiry when I ask).
- Footer and navbar social links read from config/site.ts — do not duplicate URLs elsewhere.
- Images: public/hero.png, public/services/*.png, optional public/resume.pdf; project coverImage in JSON (path or URL).

Tasks (do in order):
1. Update config/site.ts with my real branding and links:
   - name, role, description, url, contact, links, navItems
   - footer, hero, disciplines, services, caseStudies
   - projectsPage, caseStudyPage, contactPage
2. Replace the 3 demo projects in data/projects.json with [N] real or realistic portfolio projects. Keep valid slugs and required fields (id, slug, title, description, category, tech, completed). Fill optional fields where useful: featured, label, year, role, deliverables, keyOutcome, summary, caseStudy, coverImage, websiteUrl, githubUrl, tags.
3. Update image paths if needed (public/hero.png, public/services/, project coverImage).
4. List every file you changed and give me a short test checklist (npm run dev, npm run build, click /, /projects, a case study slug, /contact).

Constraints:
- Keep TypeScript types valid.
- Do not break existing routes (/ , /projects, /projects/[slug], /contact).
- Do not introduce Supabase, Prisma, or env vars unless required for a feature I requested.
- Prefer small, focused edits over rewriting entire components.
- Do not replace or restructure designed section components unless I ask for a layout change.
```

---

## Tips

- Run **one step at a time** if the model makes mistakes (e.g. only `config/site.ts` and `data/projects.json` first).
- After AI edits, always run `npm run dev` and click through every page before deploying.
- Commit after each working batch: `git commit -am "Customize site config and projects"`.
- If you swap images, make sure files under `public/` are saved and committed so Vercel can serve them.

## More help

- `QUICK-START.md` — 15-minute setup checklist
- `CUSTOMIZATION.md` — file-by-file reference
- `DEPLOYMENT.md` — publish to Vercel

/**
 * ============================================================================
 * PROJECTS DATA — JSON FILE + RUNTIME HELPERS
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Typed loader and helpers for data/projects.json. Pages import these
 *   functions — they never read the JSON file directly.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit project content in data/projects.json only (not this file).
 *   2. Required fields: id, slug, title, description, category, tech, completed.
 *   3. status "draft" hides a project everywhere. Omit status or use "published".
 *   4. Missing images get SVG placeholders automatically.
 *
 * ============================================================================
 */

import { cache } from "react"
import { readFile } from "fs/promises"
import { join } from "path"

// ---------------------------------------------------------------------------
// SHARED TYPES — used by JSON, list UI, and the detail page
// ---------------------------------------------------------------------------

export type ProjectCategory = "creative" | "real-estate" | "corporate"
export type ProjectTech = "wordpress" | "react" | "nextjs" | "php"

/** Shape stored in `data/projects.json` (the only file you edit for projects). */
export type JsonProject = {
  id: string
  slug: string
  /** "draft" hides the project everywhere. Defaults to "published". */
  status?: "draft" | "published"
  /** When true, eligible for featured helpers (use when you add a homepage strip). */
  featured?: boolean
  title: string
  description: string
  category: ProjectCategory
  tech: ProjectTech[]
  /** Display tags shown on cards (defaults to humanised `tech`). */
  tags?: string[]
  /** Short label for case-study cards, e.g. "Fintech dashboard". */
  label?: string
  /** Year or short date shown on case-study cards, e.g. "2025". Defaults to `completed`. */
  year?: string
  /** Bold metric on homepage case-study cards, e.g. "+28% activation". */
  keyOutcome?: string
  /** Role / contribution shown on the projects page, e.g. "Solo front end build". */
  role?: string
  /** Ruled list on the projects page alternating rows. */
  deliverables?: string[]
  /** One-sentence hero summary on the case-study page. Defaults to `description`. */
  summary?: string
  /** Long-form case-study body on /projects/[slug]. */
  caseStudy?: {
    /** Opening paragraph before the titled sections. */
    intro?: string
    /** Titled sections, e.g. "The challenge", "Approach", "Results". */
    sections?: { title: string; body: string }[]
  }
  /** Short completion label, e.g. "Oct 2024". */
  completed: string
  /** Long completion label, e.g. "October 2024". Defaults to `completed`. */
  completionDate?: string
  client?: string
  duration?: string
  /** Path under /public, full URL, or data URI. Defaults to a generated SVG. */
  coverImage?: string
  websiteUrl?: string
  githubUrl?: string
  highlights?: string[]
  impact?: { title: string; description: string }[]
  /** Override the auto-generated detail-page screenshots. */
  screenshots?: { homepage?: string; secondary?: string }
}

/** Rich shape consumed by the single-project page. */
export type ProjectDetail = {
  slug: string
  title: string
  category: ProjectCategory
  client: string
  logo: string
  duration: string
  completionDate: string
  websiteUrl?: string
  githubUrl?: string
  description: string
  tech: string[]
  highlights?: string[]
  impact?: { title: string; description: string }[]
  screenshots: {
    homepage: string
    secondary: string
  }
}

/** Lightweight card shape for featured strips (optional on home). */
export type FeaturedProjectCard = {
  id: string
  slug: string
  title: string
  completed: string
  tags: string[]
  imageSvgDataUri: string
  description?: string
  href?: { live?: string; github?: string } | string
}

/** Card shape used by the /projects list page. */
export type ListProjectCard = {
  id: string
  slug: string
  title: string
  category: ProjectCategory
  tech: ProjectTech[]
  image: string
  completed: string
  description?: string
  href?: { live?: string; github?: string } | string
}

const DATA_PATH = join(process.cwd(), "data", "projects.json")

// ---------------------------------------------------------------------------
// SVG PLACEHOLDERS (used when JSON omits image fields)
// ---------------------------------------------------------------------------

function makeScreenshot(label: string, accent: string) {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${accent};stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#e8e8ec;stop-opacity:1"/>
        </linearGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#bg)"/>
      <rect x="60" y="40" width="200" height="30" rx="4" fill="#00000010"/>
      <rect x="60" y="90" width="520" height="60" rx="8" fill="#00000012"/>
      <rect x="60" y="170" width="380" height="20" rx="4" fill="#00000010"/>
      <rect x="60" y="200" width="300" height="20" rx="4" fill="#00000008"/>
      <rect x="60" y="340" width="1160" height="320" rx="16" fill="#00000008"/>
      <text x="640" y="500" font-family="Arial,sans-serif" font-size="18" fill="#666" text-anchor="middle">${label}</text>
    </svg>`
  )}`
}

function makeLogo(initials: string, bg: string) {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" rx="12" fill="${bg}"/>
      <text x="50%" y="55%" font-family="Arial,sans-serif" font-weight="bold" font-size="26" fill="#fff" text-anchor="middle" dominant-baseline="middle">${initials}</text>
    </svg>`
  )}`
}

function accentForCategory(c: ProjectCategory): string {
  switch (c) {
    case "creative":
      return "#d4d0e0"
    case "real-estate":
      return "#d0e0d4"
    case "corporate":
      return "#d0d4e0"
    default:
      return "#e0e0e0"
  }
}

function initialsFromClient(client: string): string {
  const parts = client.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return client.slice(0, 2).toUpperCase() || "PR"
}

function techLabel(t: ProjectTech): string {
  switch (t) {
    case "nextjs":
      return "Next.js"
    case "wordpress":
      return "WordPress"
    case "php":
      return "PHP"
    case "react":
      return "React"
    default:
      return t
  }
}

function hrefFromLinks(p: JsonProject): ListProjectCard["href"] {
  const live = p.websiteUrl?.trim()
  const github = p.githubUrl?.trim()
  if (live || github) {
    return { live: live || undefined, github: github || undefined }
  }
  return undefined
}

// ---------------------------------------------------------------------------
// LOAD (cached per render)
// ---------------------------------------------------------------------------

export const loadJsonProjects = cache(async (): Promise<JsonProject[]> => {
  let raw: string
  try {
    raw = await readFile(DATA_PATH, "utf8")
  } catch (error) {
    throw new Error(
      `[projects-data] Could not read data/projects.json. Ensure the file exists at the project root.\n${String(error)}`
    )
  }

  let parsed: { projects?: JsonProject[] }
  try {
    parsed = JSON.parse(raw) as { projects?: JsonProject[] }
  } catch (error) {
    throw new Error(
      `[projects-data] data/projects.json is not valid JSON.\n${String(error)}`
    )
  }

  if (!parsed.projects || !Array.isArray(parsed.projects)) {
    throw new Error(
      '[projects-data] data/projects.json must contain a { "projects": [...] } array.'
    )
  }

  return parsed.projects
})

export async function getPublishedJsonProjects(): Promise<JsonProject[]> {
  const all = await loadJsonProjects()
  return all.filter((p) => (p.status ?? "published") === "published")
}

// ---------------------------------------------------------------------------
// MAPPERS — JSON → page-specific shapes
// ---------------------------------------------------------------------------

export function toProjectDetail(p: JsonProject): ProjectDetail {
  const client = p.client?.trim() || "Confidential client"
  const accent = accentForCategory(p.category)
  const homepage =
    p.screenshots?.homepage?.trim() ||
    p.coverImage?.trim() ||
    makeScreenshot(`${p.title} — preview`, accent)
  const secondary =
    p.screenshots?.secondary?.trim() ||
    makeScreenshot(`${p.title} — detail`, accent)

  return {
    slug: p.slug,
    title: p.title,
    category: p.category,
    client,
    logo: makeLogo(initialsFromClient(client), accent),
    duration: p.duration?.trim() || "—",
    completionDate: p.completionDate?.trim() || p.completed,
    websiteUrl: p.websiteUrl?.trim() || undefined,
    githubUrl: p.githubUrl?.trim() || undefined,
    description: p.description,
    tech: p.tags?.length ? p.tags : p.tech.map(techLabel),
    highlights: p.highlights,
    impact: p.impact,
    screenshots: { homepage, secondary },
  }
}

export async function getAllProjectDetails(): Promise<ProjectDetail[]> {
  const published = await getPublishedJsonProjects()
  return published.map(toProjectDetail)
}

export async function getProjectBySlug(
  slug: string
): Promise<ProjectDetail | undefined> {
  const published = await getPublishedJsonProjects()
  const raw = published.find((p) => p.slug === slug)
  return raw ? toProjectDetail(raw) : undefined
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const published = await getPublishedJsonProjects()
  return published.map((p) => p.slug)
}

export async function getListProjects(): Promise<ListProjectCard[]> {
  const published = await getPublishedJsonProjects()
  return published.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    category: p.category,
    tech: p.tech,
    image:
      p.coverImage?.trim() ||
      makeScreenshot(p.title, accentForCategory(p.category)),
    completed: p.completed,
    description: p.description,
    href: hrefFromLinks(p),
  }))
}

/** Card shape for the homepage case-studies / technical-work grid. */
export type CaseStudyCard = {
  id: string
  slug: string
  title: string
  description: string
  label: string
  year: string
  keyOutcome?: string
  tags: string[]
  image: string
}

export async function getCaseStudyCards(limit = 3): Promise<CaseStudyCard[]> {
  const published = await getPublishedJsonProjects()
  const featured = published.filter((p) => p.featured)
  const ordered = featured.length > 0 ? featured : published
  return ordered.slice(0, limit).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    label: p.label?.trim() || techLabel(p.tech[0] ?? "react"),
    year: p.year?.trim() || p.completed,
    keyOutcome: p.keyOutcome?.trim() || undefined,
    tags: p.tags?.length ? p.tags : p.tech.map(techLabel),
    /** Buyer cover under /public or URL; empty → editorial placeholder in the UI. */
    image: p.coverImage?.trim() || "",
  }))
}

/** Rich row shape for the /projects alternating work layout. */
export type SelectedWorkProject = {
  id: string
  slug: string
  title: string
  year: string
  label: string
  role: string
  description: string
  deliverables: string[]
  image: string
}

export async function getSelectedWorkProjects(): Promise<SelectedWorkProject[]> {
  const published = await getPublishedJsonProjects()
  return published.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    year: p.year?.trim() || p.completed,
    label: p.label?.trim() || techLabel(p.tech[0] ?? "react"),
    role: p.role?.trim() || "Front end",
    description: p.description,
    deliverables:
      p.deliverables?.filter((d) => d.trim().length > 0) ??
      p.highlights?.filter((h) => h.trim().length > 0) ??
      [],
    image:
      p.coverImage?.trim() ||
      makeScreenshot(p.title, accentForCategory(p.category)),
  }))
}

// ---------------------------------------------------------------------------
// CASE STUDY PAGE (/projects/[slug])
// ---------------------------------------------------------------------------

/** Small thumbnail card used by the "Related projects" sidebar. */
export type RelatedProjectCard = {
  slug: string
  title: string
  year: string
  image: string
}

/** Everything the /projects/[slug] case-study layout renders. */
export type CaseStudyPageData = {
  slug: string
  title: string
  /** Category pill + sidebar "Category" value, e.g. "Landing page". */
  label: string
  /** Short sentence under the title. */
  summary: string
  heroImage: string
  /** Sidebar rows: Client, Date, Role, Category. */
  meta: { label: string; value: string }[]
  /** Opening paragraph of the long-form body. */
  intro: string
  sections: { title: string; body: string }[]
  technologies: string[]
  websiteUrl?: string
  githubUrl?: string
  related: RelatedProjectCard[]
  next?: { slug: string; title: string }
}

function toRelatedCard(p: JsonProject): RelatedProjectCard {
  return {
    slug: p.slug,
    title: p.title,
    year: p.year?.trim() || p.completed,
    image:
      p.coverImage?.trim() ||
      makeScreenshot(p.title, accentForCategory(p.category)),
  }
}

/**
 * Builds the case-study payload for one slug, plus the sibling projects used by
 * the "Related projects" sidebar and the next-project footer link.
 */
export async function getProjectCaseStudy(
  slug: string,
  relatedLimit = 3
): Promise<CaseStudyPageData | undefined> {
  const published = await getPublishedJsonProjects()
  const index = published.findIndex((p) => p.slug === slug)
  if (index === -1) return undefined

  const p = published[index]
  const label = p.label?.trim() || techLabel(p.tech[0] ?? "react")
  const role = p.role?.trim() || "Front end"
  const others = published.filter((other) => other.slug !== slug)
  const nextProject = published[(index + 1) % published.length]

  const meta = [
    { label: "Client", value: p.client?.trim() || "Personal project" },
    { label: "Date", value: p.completionDate?.trim() || p.completed },
    { label: "Role", value: role },
    { label: "Category", value: label },
  ]
  if (p.duration?.trim()) {
    meta.push({ label: "Timeline", value: p.duration.trim() })
  }

  return {
    slug: p.slug,
    title: p.title,
    label,
    summary: p.summary?.trim() || p.description,
    heroImage:
      p.screenshots?.homepage?.trim() ||
      p.coverImage?.trim() ||
      makeScreenshot(`${p.title} — preview`, accentForCategory(p.category)),
    meta,
    intro: p.caseStudy?.intro?.trim() || p.description,
    sections:
      p.caseStudy?.sections?.filter(
        (s) => s.title.trim().length > 0 && s.body.trim().length > 0
      ) ?? [],
    technologies: p.tags?.length ? p.tags : p.tech.map(techLabel),
    websiteUrl: p.websiteUrl?.trim() || undefined,
    githubUrl: p.githubUrl?.trim() || undefined,
    related: others.slice(0, relatedLimit).map(toRelatedCard),
    next:
      nextProject && nextProject.slug !== slug
        ? { slug: nextProject.slug, title: nextProject.title }
        : undefined,
  }
}

export async function getFeaturedProjects(
  limit = 3
): Promise<FeaturedProjectCard[]> {
  const published = await getPublishedJsonProjects()
  const featured = published.filter((p) => p.featured)
  const ordered = featured.length > 0 ? featured : published
  return ordered.slice(0, limit).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    completed: p.completed,
    tags: p.tags?.length ? p.tags : p.tech.map(techLabel),
    imageSvgDataUri:
      p.coverImage?.trim() ||
      makeScreenshot(p.title, accentForCategory(p.category)),
    description: p.description,
    href: hrefFromLinks(p),
  }))
}

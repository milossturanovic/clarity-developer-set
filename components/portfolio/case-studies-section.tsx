/**
 * ============================================================================
 * CASE STUDIES SECTION — technical work / project cards
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Editorial 3-card grid of featured projects. Section title/intro come from
 *   config/site.ts → caseStudies. Card content comes from data/projects.json
 *   (featured published projects).
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit title / intro / ctaLabel in config/site.ts → caseStudies.
 *   2. Edit cards in data/projects.json (set featured: true; use label, year,
 *      keyOutcome, description, optional coverImage and tags).
 *   3. Links go to /projects/[slug].
 *
 * ============================================================================
 */

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { siteConfig } from "@/config/site"
import {
  getCaseStudyCards,
  type CaseStudyCard,
} from "@/lib/projects-data"
import { cn } from "@/lib/utils"

function CardImagePlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex aspect-[4/3] w-full items-center justify-center bg-zinc-100",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 320"
        className="h-24 w-24 text-zinc-300 sm:h-28 sm:w-28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="160" cy="160" r="100" stroke="currentColor" strokeWidth="1" />
        <circle cx="160" cy="160" r="72" stroke="currentColor" strokeWidth="1" />
        <circle cx="160" cy="160" r="48" stroke="currentColor" strokeWidth="1.25" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4
          const x1 = 160 + Math.cos(angle) * 52
          const y1 = 160 + Math.sin(angle) * 52
          const x2 = 160 + Math.cos(angle) * 96
          const y2 = 160 + Math.sin(angle) * 96
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="1"
            />
          )
        })}
        <rect
          x="136"
          y="142"
          width="48"
          height="36"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="150" cy="154" r="3.5" fill="currentColor" />
        <path
          d="M142 170 L152 158 L162 166 L168 160 L178 170 Z"
          fill="currentColor"
          opacity="0.55"
        />
      </svg>
    </div>
  )
}

function CaseStudyCardItem({
  project,
  ctaLabel,
  showTags = false,
}: {
  project: CaseStudyCard
  ctaLabel: string
  /** Optional — off by default to match the reference layout. */
  showTags?: boolean
}) {
  const href = `/projects/${project.slug}`

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="overflow-hidden">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element -- buyer cover paths / remote URLs
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="aspect-[4/3] w-full object-cover"
          />
        ) : (
          <CardImagePlaceholder />
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
        <p className="text-sm text-zinc-500">
          {project.label}
          <span className="mx-1.5 text-zinc-300" aria-hidden="true">
            ·
          </span>
          {project.year}
        </p>

        <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-950">
          <Link
            href={href}
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {project.title}
          </Link>
        </h3>

        {showTags && project.tags.length > 0 ? (
          <ul
            className="mt-3 flex list-none flex-wrap gap-2"
            aria-label={`Tags for ${project.title}`}
          >
            {project.tags.map((tag) => (
              <li key={tag}>
                <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <p className="mt-3 text-sm leading-relaxed text-zinc-500">
          {project.description}
        </p>

        {project.keyOutcome ? (
          <div className="mt-6">
            <p className="text-base font-semibold tracking-tight text-zinc-950">
              {project.keyOutcome}
            </p>
            <p className="mt-1 text-xs text-zinc-400">Key outcome</p>
          </div>
        ) : null}

        <div className="mt-auto pt-6">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-950 transition-colors hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            {ctaLabel}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}

type CaseStudiesSectionProps = {
  className?: string
  title?: string
  intro?: string
  ctaLabel?: string
  limit?: number
  /** Show tag pills under the title (off by default — matches reference). */
  showTags?: boolean
}

export async function CaseStudiesSection({
  className,
  title = siteConfig.caseStudies.title,
  intro = siteConfig.caseStudies.intro,
  ctaLabel = siteConfig.caseStudies.ctaLabel,
  limit = 3,
  showTags = false,
}: CaseStudiesSectionProps) {
  const projects = await getCaseStudyCards(limit)
  const headingId = "case-studies-heading"

  if (projects.length === 0) return null

  return (
    <section
      aria-labelledby={headingId}
      className={cn("bg-white", className)}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <header className="max-w-3xl">
          <h2
            id={headingId}
            className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl sm:leading-tight"
          >
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-[1.05rem]">
            {intro}
          </p>
        </header>

        <ul className="mt-10 grid list-none gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {projects.map((project) => (
            <li key={project.id} className="min-w-0">
              <CaseStudyCardItem
                project={project}
                ctaLabel={ctaLabel}
                showTags={showTags}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

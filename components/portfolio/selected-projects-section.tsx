/**
 * ============================================================================
 * SELECTED PROJECTS — alternating work rows (/projects)
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Full-width alternating image / details rows for the projects page.
 *   Page title/intro from config/site.ts → projectsPage.
 *   Project content from data/projects.json via getSelectedWorkProjects().
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit projectsPage.title / intro in config/site.ts.
 *   2. Edit each project’s label, role, description, deliverables, coverImage
 *      in data/projects.json.
 *
 * ============================================================================
 */

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { siteConfig } from "@/config/site"
import {
  getSelectedWorkProjects,
  type SelectedWorkProject,
} from "@/lib/projects-data"
import { cn } from "@/lib/utils"

function ProjectVisual({
  project,
  className,
}: {
  project: SelectedWorkProject
  className?: string
}) {
  const isRemoteOrPath = Boolean(project.image)

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] bg-zinc-100",
        className
      )}
    >
      {isRemoteOrPath ? (
        // eslint-disable-next-line @next/next/no-img-element -- remote / public covers from JSON
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="aspect-[4/3] h-full w-full object-cover lg:aspect-[5/4]"
        />
      ) : (
        <div
          className="flex aspect-[4/3] items-center justify-center lg:aspect-[5/4]"
          aria-hidden="true"
        >
          <span className="text-sm text-zinc-400">No cover image</span>
        </div>
      )}
    </div>
  )
}

function ProjectDetails({
  project,
  ctaLabel,
}: {
  project: SelectedWorkProject
  ctaLabel: string
}) {
  const href = `/projects/${project.slug}`

  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
          {project.title}
        </h2>
        <p className="shrink-0 text-sm text-zinc-400 sm:text-base">
          {project.year}
        </p>
      </div>

      <p className="mt-2 text-sm text-zinc-500 sm:text-[0.95rem]">
        {project.label}
        <span className="mx-1.5 text-zinc-300" aria-hidden="true">
          ·
        </span>
        {project.role}
      </p>

      <p className="mt-5 text-base leading-relaxed text-zinc-500 sm:text-[1.05rem]">
        {project.description}
      </p>

      {project.deliverables.length > 0 ? (
        <ul className="mt-8 list-none overflow-hidden rounded-2xl border border-zinc-200">
          {project.deliverables.map((item, index) => (
            <li
              key={item}
              className={cn(
                "px-5 py-3.5 text-sm font-medium text-zinc-950 sm:px-6 sm:text-[0.95rem]",
                index > 0 && "border-t border-zinc-200"
              )}
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-8">
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-950 transition-colors hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          {ctaLabel}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

export async function SelectedProjectsSection() {
  const projects = await getSelectedWorkProjects()
  const { title, intro, ctaLabel } = siteConfig.projectsPage
  const headingId = "selected-projects-heading"

  return (
    <section
      aria-labelledby={headingId}
      className="bg-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <header className="max-w-3xl">
          <h1
            id={headingId}
            className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl sm:leading-tight"
          >
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-[1.05rem]">
            {intro}
          </p>
        </header>

        {projects.length === 0 ? (
          <p className="mt-10 text-sm text-zinc-500">
            No published projects yet. Add entries in{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm">
              data/projects.json
            </code>
            .
          </p>
        ) : (
          <ul className="mt-12 list-none space-y-16 sm:mt-16 sm:space-y-20 lg:space-y-24">
            {projects.map((project, index) => {
              const imageFirst = index % 2 === 0
              return (
                <li key={project.id}>
                  <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
                    <div className={cn(!imageFirst && "lg:order-2")}>
                      <ProjectVisual project={project} />
                    </div>
                    <div className={cn(!imageFirst && "lg:order-1")}>
                      <ProjectDetails
                        project={project}
                        ctaLabel={ctaLabel}
                      />
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}

/**
 * ============================================================================
 * PROJECT DETAIL PAGE — scaffold stub
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Static project detail route. Slugs come from data/projects.json (SSG).
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit project fields in data/projects.json.
 *   2. Replace this stub layout with your designed detail page later.
 *
 * ============================================================================
 */

import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/lib/projects-data"

type PageProps = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  if (!project) return { title: "Project" }
  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug)
  if (!project) notFound()

  return (
    <article className="container mx-auto max-w-5xl px-4 py-16">
      <p className="text-sm text-muted-foreground">
        <Link
          href="/projects"
          className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          ← Projects
        </Link>
      </p>

      <header className="mt-6 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {project.client} · {project.completionDate} · {project.duration}
        </p>
        <p className="mt-4 text-base text-muted-foreground">
          {project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.websiteUrl ? (
            <Button asChild>
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live site
              </a>
            </Button>
          ) : null}
          {project.githubUrl ? (
            <Button variant="outline" asChild>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
          ) : null}
        </div>
      </header>

      <div className="mt-10 space-y-6">
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element -- data-URI placeholders */}
          <img
            src={project.screenshots.homepage}
            alt={`${project.title} preview`}
            className="w-full rounded-lg border border-border"
          />
        </figure>
        {project.highlights?.length ? (
          <section aria-labelledby="highlights-heading">
            <h2 id="highlights-heading" className="text-lg font-medium">
              Highlights
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  )
}

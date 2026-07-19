/**
 * ============================================================================
 * PROJECTS LIST PAGE — scaffold stub
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Lists published projects from data/projects.json.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Add / edit projects in data/projects.json only.
 *   2. Replace this list UI with your designed cards/filters later.
 *
 * ============================================================================
 */

import type { Metadata } from "next"
import Link from "next/link"

import { getListProjects } from "@/lib/projects-data"

export const metadata: Metadata = {
  title: "Projects",
}

export default async function ProjectsPage() {
  const projects = await getListProjects()

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-2 text-muted-foreground">
          Projects list shell — wired to{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            data/projects.json
          </code>
          . Replace this layout with your design.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">
          No published projects yet. Add entries in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            data/projects.json
          </code>
          .
        </p>
      ) : (
        <ul className="mt-10 space-y-6">
          {projects.map((project) => (
            <li key={project.id} className="border-b border-border pb-6">
              <Link
                href={`/projects/${project.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              >
                <h2 className="text-lg font-medium text-foreground group-hover:underline">
                  {project.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {project.completed} · {project.category}
                </p>
                {project.description ? (
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                    {project.description}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/**
 * ============================================================================
 * PROJECT DETAIL PAGE — case study route
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Static case-study route. Slugs come from data/projects.json (SSG).
 *   Navbar and footer are rendered by the root layout.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit project fields in data/projects.json (summary, caseStudy, client,
 *      completionDate, role, tags, coverImage, websiteUrl, githubUrl).
 *   2. Edit section labels in config/site.ts → caseStudyPage.
 *
 * ============================================================================
 */

import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectCaseStudy } from "@/components/portfolio/project-case-study"
import {
  getAllProjectSlugs,
  getProjectCaseStudy,
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
  const project = await getProjectCaseStudy(params.slug)
  if (!project) return { title: "Project" }
  return {
    title: project.title,
    description: project.summary,
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getProjectCaseStudy(params.slug)
  if (!project) notFound()

  return <ProjectCaseStudy project={project} />
}

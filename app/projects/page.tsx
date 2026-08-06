/**
 * ============================================================================
 * PROJECTS PAGE — selected work (alternating rows)
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Full-page selected projects layout. Navbar/footer come from root layout.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit title / intro / ctaLabel in config/site.ts → projectsPage.
 *   2. Edit project rows in data/projects.json (label, role, description,
 *      deliverables, coverImage).
 *
 * ============================================================================
 */

import type { Metadata } from "next"

import { SelectedProjectsSection } from "@/components/portfolio/selected-projects-section"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: siteConfig.projectsPage.title,
  description: siteConfig.projectsPage.intro,
}

export default function ProjectsPage() {
  return <SelectedProjectsSection />
}

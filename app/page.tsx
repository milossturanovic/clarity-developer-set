/**
 * ============================================================================
 * HOME PAGE
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Home route. Composes designed sections; navbar + footer come from layout.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Hero copy lives in config/site.ts → hero.
 *   2. Disciplines copy lives in config/site.ts → disciplines.
 *   3. Case studies title/intro in config/site.ts → caseStudies; cards in data/projects.json.
 *   4. Add more sections and import them here.
 *
 * ============================================================================
 */

import { CaseStudiesSection } from "@/components/portfolio/case-studies-section"
import { DisciplinesSection } from "@/components/portfolio/disciplines-section"
import { HeroSection } from "@/components/sections/hero-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DisciplinesSection />
      <CaseStudiesSection />
    </>
  )
}

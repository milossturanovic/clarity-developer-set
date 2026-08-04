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
 *   3. Services copy lives in config/site.ts → services.
 *   4. Case studies title/intro in config/site.ts → caseStudies; cards in data/projects.json.
 *   5. Add more sections and import them here.
 *
 * ============================================================================
 */

import { CaseStudiesSection } from "@/components/portfolio/case-studies-section"
import { DisciplinesSection } from "@/components/portfolio/disciplines-section"
import { ServicesSection } from "@/components/portfolio/services-section"
import { HeroSection } from "@/components/sections/hero-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <DisciplinesSection />
      <CaseStudiesSection />
    </>
  )
}

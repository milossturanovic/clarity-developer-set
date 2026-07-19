/**
 * ============================================================================
 * SITE CONFIGURATION
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Single source of truth for brand, navigation, contact, social links,
 *   hero copy, and disciplines. Navbar, footer, contact, layout metadata,
 *   and home sections import this file.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Update name, shortName, role, description, and url to match your profile.
 *   2. Set contact.location and contact.email.
 *   3. Replace links.github, links.linkedin, and links.email with your URLs.
 *   4. Edit hero.headlineSuffix, hero.bio, hero CTAs, and hero.stats for the home page.
 *   5. Edit disciplines.title, disciplines.intro, and disciplines.items for the skills section.
 *   6. Edit caseStudies.title and caseStudies.intro; card content lives in data/projects.json.
 *   7. Add or remove navItems as needed (href should match a real route).
 *
 * ============================================================================
 */

export type SiteConfig = typeof siteConfig

// ---------------------------------------------------------------------------
// EDITABLE CONTENT — update these to match your details
// ---------------------------------------------------------------------------
export const siteConfig = {
  name: "John Doe",
  shortName: "John",
  role: "Front End Developer",
  description:
    "Junior front end developer portfolio — React, TypeScript, and small shipped UI projects.",
  url: "https://johndoe.dev",
  contact: {
    location: "United States",
    email: "john.doe@example.com",
  },

  // ---------------------------------------------------------------------------
  // NAVIGATION LINKS
  // ---------------------------------------------------------------------------
  navItems: [
    { title: "Home", href: "/" },
    { title: "Projects", href: "/projects" },
    { title: "Contact", href: "/contact" },
  ],

  // ---------------------------------------------------------------------------
  // SOCIAL & CONTACT LINKS
  // ---------------------------------------------------------------------------
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "mailto:john.doe@example.com",
  },

  // ---------------------------------------------------------------------------
  // HERO — home page editorial section
  // ---------------------------------------------------------------------------
  hero: {
    /** Second half of the headline after the name (name is injected from `name`). */
    headlineSuffix: "builds clean, accessible interfaces.",
    bio: "A junior front end developer learning in public — focused on React, TypeScript, and thoughtful UI. I care about clear layouts, solid fundamentals, and shipping small projects that show how I think.",
    primaryCta: {
      label: "See the work",
      href: "/projects",
    },
    secondaryCta: {
      label: "Get in touch",
      href: "/contact",
    },
    stats: [
      { label: "Discipline", value: "Front end" },
      { label: "Experience", value: "Starting out" },
      { label: "Available", value: "Open to roles" },
    ],
  },

  // ---------------------------------------------------------------------------
  // DISCIPLINES — core skills + tools section
  // ---------------------------------------------------------------------------
  disciplines: {
    title: "Core disciplines and tools.",
    intro:
      "What I’m practicing and what I use day to day, grouped by skill area — not by every tool I’ve ever opened.",
    items: [
      {
        title: "HTML & CSS",
        description:
          "Semantic markup, responsive layouts, and clean styling. I’m building the habit of accessible structure before fancy effects.",
        tools: ["HTML5", "CSS3", "Flexbox", "Grid", "Tailwind CSS"],
      },
      {
        title: "JavaScript & React",
        description:
          "Components, props, state, and effects. I learn by building small apps and refactoring them as patterns start to click.",
        tools: ["JavaScript", "TypeScript", "React", "Next.js", "Vite"],
      },
      {
        title: "UI implementation",
        description:
          "Turning designs into working screens — spacing, typography, and interactive bits like forms, modals, and navigation.",
        tools: ["Figma", "shadcn/ui", "Lucide", "Chrome DevTools"],
      },
      {
        title: "Workflow & shipping",
        description:
          "Version control, previews, and deploys. I want every project to be easy to run locally and share online.",
        tools: ["Git", "GitHub", "VS Code", "Vercel", "npm"],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // CASE STUDIES — homepage project cards (content from data/projects.json)
  // ---------------------------------------------------------------------------
  caseStudies: {
    title: "Projects",
    intro:
      "A few builds from my learning path — each one focused on a concrete skill, not a made-up client metric.",
    ctaLabel: "View project",
  },
}

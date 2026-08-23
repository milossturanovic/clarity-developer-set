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
 *   3. Replace links.github, links.linkedin, links.twitter, links.instagram, and links.email.
 *   4. Edit footer.blurb and footer.availability for the global footer.
 *   5. Edit hero.headlineSuffix, hero.bio, hero CTAs, and hero.stats for the home page.
 *   6. Edit disciplines.title, disciplines.intro, and disciplines.items for the skills section.
 *   7. Edit caseStudies.title and caseStudies.intro; card content lives in data/projects.json.
 *   8. Edit projectsPage.title / intro / ctaLabel for the /projects alternating rows.
 *   9. Edit caseStudyPage labels for the /projects/[slug] detail page.
 *  10. Edit contactPage channels, openTo items, and form copy.
 *  11. Edit services.title, services.intro, and services.items.
 *  12. Add or remove navItems as needed (href should match a real route).
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
    instagram: "https://instagram.com/yourusername",
    email: "mailto:john.doe@example.com",
  },

  // ---------------------------------------------------------------------------
  // FOOTER — global (root layout)
  // ---------------------------------------------------------------------------
  footer: {
    blurb:
      "Front end developer, building clean interfaces and learning in public from the United States.",
    availability: {
      label: "Available",
      detail: "Open to junior roles and internship opportunities",
    },
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
      label: "Download resume",
      /** Put your PDF at public/resume.pdf (or change this path). */
      href: "/resume.pdf",
      download: true,
    },
    /** Remote or /public image for the hero panel. Leave empty for the placeholder. */
    image: "/hero.png",
    imageAlt: "Portrait of a developer at a desk with a laptop",
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

  // ---------------------------------------------------------------------------
  // PROJECTS PAGE — alternating selected-work rows
  // ---------------------------------------------------------------------------
  projectsPage: {
    title: "Selected projects",
    intro:
      "Three projects from the last two years. Each started with a real constraint and ended with a shipped product.",
    ctaLabel: "Read case study",
  },

  // ---------------------------------------------------------------------------
  // CASE STUDY PAGE — labels for /projects/[slug] (content from data/projects.json)
  // ---------------------------------------------------------------------------
  caseStudyPage: {
    backLabel: "All projects",
    infoTitle: "Project info",
    technologiesTitle: "Technologies",
    relatedTitle: "Related projects",
    livePreviewLabel: "View live preview",
    sourceLabel: "View source",
    shareLabel: "Share this project",
    nextLabel: "Next project",
  },

  // ---------------------------------------------------------------------------
  // CONTACT PAGE — /contact
  //
  // `channels[].icon` accepts: "mail" | "clock" | "calendar" | "map" | "github"
  // | "linkedin". Set `href` to make a channel clickable (omit for plain text).
  // ---------------------------------------------------------------------------
  contactPage: {
    title: "Let’s build something",
    intro:
      "I’m always up for a conversation about front end work — whether it’s a role, a small build, or a project you’d like a second pair of hands on.",
    channels: [
      {
        icon: "mail",
        title: "Email",
        description: "The most reliable way to reach me",
        value: "john.doe@example.com",
        href: "mailto:john.doe@example.com",
      },
      {
        icon: "clock",
        title: "Response time",
        description: "I read and reply to every message",
        value: "Usually within 1–2 days",
      },
      {
        icon: "calendar",
        title: "Availability",
        description: "Open to junior roles and internships",
        value: "Taking on new work",
      },
      {
        icon: "map",
        title: "Where I work",
        description: "Remote-friendly, happy to overlap with your hours",
        value: "United States",
      },
    ],
    openTo: {
      title: "What I’m open to",
      items: [
        "Junior front end or internship roles",
        "Freelance landing pages and marketing sites",
        "Small React and Next.js builds",
        "Pairing on an open-source issue",
      ],
    },
    form: {
      title: "Send a message",
      intro:
        "Tell me a little about what you’re working on and I’ll get back to you within a couple of days.",
      projectTypeLabel: "What’s this about?",
      projectTypes: [
        "A role or internship",
        "Freelance project",
        "Collaboration",
        "Something else",
      ],
      consentLabel: "I’m happy for you to reply to me by email.",
      submitLabel: "Send message",
      submittingLabel: "Sending…",
      successTitle: "Thanks for reaching out",
      successMessage:
        "Your message is on its way. I’ll get back to you within a couple of days.",
      /** Shown under the button while the form is still a UI-only stub. Delete once wired. */
      stubNote:
        "Demo form — connect a provider in components/contact-form.tsx before launch.",
    },
  },

  // ---------------------------------------------------------------------------
  // SERVICES — interactive preview + list section
  // ---------------------------------------------------------------------------
  services: {
    title: "What I can help with",
    intro:
      "Practical front-end work I’m ready to take on — clear layouts, React UIs, and careful polish on every screen.",
    items: [
      {
        id: "responsive-layouts",
        title: "Responsive layouts",
        description:
          "Mobile-first pages that stay readable and tidy from phone to desktop — solid structure before fancy flourishes.",
        image: "/services/responsive-layouts.png",
        imageTone: "sand",
      },
      {
        id: "react-interfaces",
        title: "React interfaces",
        description:
          "Component-driven UI with React and TypeScript — forms, navigation, and interactive pieces that stay easy to follow.",
        image: "/services/react-interfaces.png",
        imageTone: "slate",
      },
      {
        id: "landing-pages",
        title: "Landing pages",
        description:
          "Marketing and portfolio pages with clear hierarchy, spacing, and CTAs that guide someone to the next step.",
        image: "/services/landing-pages.png",
        imageTone: "rose",
      },
      {
        id: "ui-polish",
        title: "UI polish",
        description:
          "Accessibility basics, focus states, loading and empty states — the small details that make a build feel finished.",
        image: "/services/ui-polish.png",
        imageTone: "teal",
      },
    ],
  },
}

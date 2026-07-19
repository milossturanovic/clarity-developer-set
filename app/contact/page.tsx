/**
 * ============================================================================
 * CONTACT PAGE — scaffold stub
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Contact info from config/site.ts plus a UI-only form (no backend).
 *
 * DEVELOPER EDIT NOTES:
 *   1. Update location, email, and social links in config/site.ts.
 *   2. Wire the form in components/contact-form.tsx to a provider later.
 *   3. Do not add a database or admin API for the default product.
 *
 * ============================================================================
 */

import type { Metadata } from "next"
import Link from "next/link"
import { Github, Linkedin, Mail, MapPin } from "lucide-react"

import { ContactForm } from "@/components/contact-form"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Contact",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-2 text-muted-foreground">
          Contact stub — info from{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            config/site.ts
          </code>
          . The form is UI-only until you wire a provider.
        </p>
      </header>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <section aria-labelledby="contact-info-heading" className="space-y-4">
          <h2 id="contact-info-heading" className="sr-only">
            Contact information
          </h2>
          <p className="flex items-start gap-3 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{siteConfig.contact.location}</span>
          </p>
          <p className="flex items-start gap-3 text-sm">
            <Mail
              className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="rounded-sm text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {siteConfig.contact.email}
            </a>
          </p>
          <ul className="flex gap-3 pt-2">
            <li>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </section>

        <section aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading" className="text-lg font-medium">
            Send a message
          </h2>
          <ContactForm />
        </section>
      </div>
    </div>
  )
}

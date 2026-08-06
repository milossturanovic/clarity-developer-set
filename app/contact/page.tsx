/**
 * ============================================================================
 * CONTACT PAGE — /contact
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Server-rendered contact page: heading, contact channels, what you are open
 *   to, social links, and the message form. Only the form is a client
 *   component. Navbar and footer come from the root layout.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit all copy in config/site.ts → contactPage.
 *   2. Update email / location in config/site.ts → contact and links.
 *   3. Wire the form in components/contact-form.tsx to a provider before launch.
 *   4. Do not add a database or admin API for the default product.
 *
 * ============================================================================
 */

import type { Metadata } from "next"
import Link from "next/link"
import {
  Calendar,
  Clock,
  Github,
  Linkedin,
  Mail,
  MapPin,
  type LucideIcon,
} from "lucide-react"

import { ContactForm } from "@/components/contact-form"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Contact",
  description: siteConfig.contactPage.intro,
  alternates: { canonical: "/contact" },
}

/** Icon keys accepted by contactPage.channels[].icon in config/site.ts. */
const CHANNEL_ICONS: Record<string, LucideIcon> = {
  mail: Mail,
  clock: Clock,
  calendar: Calendar,
  map: MapPin,
  github: Github,
  linkedin: Linkedin,
}

const SOCIAL_LINKS = [
  { name: "GitHub", href: siteConfig.links.github, icon: Github },
  { name: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
]

export default function ContactPage() {
  const { title, intro, channels, openTo, form } = siteConfig.contactPage

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        {/* -------------------------------------------------------------
            HEADER
        ------------------------------------------------------------- */}
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl sm:leading-[1.1]">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-500 sm:text-[1.05rem]">
            {intro}
          </p>
        </header>

        <div className="mt-14 grid gap-10 sm:mt-16 lg:grid-cols-2 lg:gap-14">
          {/* -----------------------------------------------------------
              LEFT — channels, what I'm open to, socials
          ----------------------------------------------------------- */}
          <section aria-labelledby="contact-channels-heading">
            <h2 id="contact-channels-heading" className="sr-only">
              Ways to get in touch
            </h2>

            <ul className="list-none space-y-4">
              {channels.map((channel) => {
                const Icon = CHANNEL_ICONS[channel.icon] ?? Mail
                const href = "href" in channel ? channel.href : undefined
                return (
                  <li
                    key={channel.title}
                    className="flex items-start gap-4 rounded-2xl bg-zinc-50 px-5 py-5 sm:px-6"
                  >
                    <span
                      className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-zinc-600"
                      aria-hidden="true"
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-zinc-950">
                        {channel.title}
                      </span>
                      <span className="mt-1 block text-sm text-zinc-500">
                        {channel.description}
                      </span>
                      {href ? (
                        <a
                          href={href}
                          className="mt-2.5 inline-block rounded-sm text-sm font-medium text-zinc-950 underline-offset-4 transition-colors hover:text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          {channel.value}
                        </a>
                      ) : (
                        <span className="mt-2.5 block text-sm font-medium text-zinc-950">
                          {channel.value}
                        </span>
                      )}
                    </span>
                  </li>
                )
              })}
            </ul>

            {openTo.items.length > 0 ? (
              <div className="mt-8">
                <h3 className="text-sm font-semibold tracking-tight text-zinc-950">
                  {openTo.title}
                </h3>
                <ul className="mt-4 list-none overflow-hidden rounded-2xl border border-zinc-200">
                  {openTo.items.map((item, index) => (
                    <li
                      key={item}
                      className={cn(
                        "px-5 py-3.5 text-sm text-zinc-600 sm:px-6",
                        index > 0 && "border-t border-zinc-200"
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-8 flex items-center gap-3">
              <p className="text-sm text-zinc-500">Elsewhere</p>
              <ul className="flex list-none items-center gap-2">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon
                  return (
                    <li key={social.name}>
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>

          {/* -----------------------------------------------------------
              RIGHT — message form
          ----------------------------------------------------------- */}
          <section
            aria-labelledby="contact-form-heading"
            className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8"
          >
            <h2
              id="contact-form-heading"
              className="text-lg font-semibold tracking-tight text-zinc-950"
            >
              {form.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {form.intro}
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

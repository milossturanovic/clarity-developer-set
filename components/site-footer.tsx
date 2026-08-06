/**
 * ============================================================================
 * SITE FOOTER
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Global footer rendered from the root layout on every page.
 *   Brand blurb, email, availability, and socials come from config/site.ts.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit name, contact.email, footer.blurb, footer.availability in config/site.ts.
 *   2. Update social URLs in config/site.ts → links (do not hardcode here).
 *
 * ============================================================================
 */

import Link from "next/link"
import { Github, Instagram, Linkedin } from "lucide-react"

import { siteConfig } from "@/config/site"

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.739L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  { name: "X", href: siteConfig.links.twitter, icon: XIcon },
  { name: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
  { name: "Instagram", href: siteConfig.links.instagram, icon: Instagram },
  { name: "GitHub", href: siteConfig.links.github, icon: Github },
]

export function SiteFooter() {
  const year = new Date().getFullYear()
  const { name, contact, footer, links } = siteConfig

  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          {/* Left — brand */}
          <div className="max-w-xl">
            <p className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              {name}
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-500 sm:text-[1.05rem]">
              {footer.blurb}
            </p>
            <a
              href={links.email}
              className="mt-5 inline-block text-base font-semibold text-zinc-950 transition-colors hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              {contact.email}
            </a>
          </div>

          {/* Right — availability + socials */}
          <div className="flex w-full flex-col gap-5 sm:max-w-xs lg:items-end">
            <div className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 sm:w-auto sm:min-w-[16rem]">
              <p className="flex items-center gap-2 text-sm font-semibold text-zinc-950">
                <span
                  className="inline-block h-2 w-2 shrink-0 rounded-full bg-zinc-950"
                  aria-hidden="true"
                />
                {footer.availability.label}
              </p>
              <p className="mt-1.5 text-sm text-zinc-500">
                {footer.availability.detail}
              </p>
            </div>

            <ul className="flex items-center gap-4 lg:justify-end">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon
                return (
                  <li key={social.name}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-zinc-200 pt-6 sm:mt-16">
          <p className="text-sm text-zinc-400">
            © {year} {name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

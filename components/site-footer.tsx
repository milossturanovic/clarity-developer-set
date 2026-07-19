/**
 * ============================================================================
 * SITE FOOTER
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Quiet site-wide footer. Social links come from config/site.ts only.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Update social URLs in config/site.ts — do not hardcode links here.
 *
 * ============================================================================
 */

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

import { siteConfig } from "@/config/site"

const SOCIAL_LINKS = [
  { name: "GitHub", href: siteConfig.links.github, icon: Github },
  { name: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
  { name: "Email", href: siteConfig.links.email, icon: Mail },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-sm font-medium text-zinc-950">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-zinc-500">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>

        <ul className="flex items-center gap-2">
          {SOCIAL_LINKS.map((social) => {
            const Icon = social.icon
            return (
              <li key={social.name}>
                <Link
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    social.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={social.name}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </footer>
  )
}

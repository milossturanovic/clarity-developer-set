/**
 * ============================================================================
 * SITE NAVBAR
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Quiet editorial navigation. Brand name and links come from config/site.ts.
 *   Desktop: inline links. Mobile: slide-over sidemenu (light theme).
 *
 * DEVELOPER EDIT NOTES:
 *   1. Change brand text and nav items in config/site.ts — not here.
 *   2. Social icons in the drawer read from config/site.ts → links.
 *
 * ============================================================================
 */

"use client"

import * as React from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, Menu } from "lucide-react"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import {
  Sidemenu,
  SidemenuContent,
  SidemenuHeader,
  SidemenuTitle,
  SidemenuTrigger,
} from "@/components/ui/sidemenu"

const SHEET_DURATION_MS = 400
const MOBILE_MENU_ID = "site-mobile-menu"

export function SiteNavbar() {
  const [open, setOpen] = React.useState(false)
  const close = React.useCallback(() => setOpen(false), [])

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="rounded-sm text-xl font-semibold tracking-tight text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm text-sm text-zinc-500 transition-colors hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <Sidemenu open={open} onOpenChange={setOpen}>
          <SidemenuTrigger asChild className="md:hidden">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls={MOBILE_MENU_ID}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Button>
          </SidemenuTrigger>

          <SidemenuContent
            id={MOBILE_MENU_ID}
            side="right"
            duration={SHEET_DURATION_MS}
          >
            <SidemenuHeader className="pr-10">
              <SidemenuTitle>{siteConfig.shortName}</SidemenuTitle>
              <p className="text-sm text-zinc-500">{siteConfig.role}</p>
            </SidemenuHeader>

            <div className="mt-8 flex flex-col gap-8">
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {siteConfig.navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="rounded-md px-1 py-2.5 text-lg font-medium text-zinc-950 transition-colors hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              <a
                href={siteConfig.links.email}
                onClick={close}
                className="rounded-sm text-sm text-zinc-500 transition-colors hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {siteConfig.links.email.replace(/^mailto:/, "")}
              </a>

              <div className="flex gap-2">
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    onClick={close}
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    onClick={close}
                  >
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={siteConfig.links.email}
                    aria-label="Email"
                    onClick={close}
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
          </SidemenuContent>
        </Sidemenu>
      </div>
    </header>
  )
}

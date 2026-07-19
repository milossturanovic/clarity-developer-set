/**
 * ============================================================================
 * ROOT LAYOUT
 * ============================================================================
 *
 * WHAT THIS IS:
 *   App-wide layout: fonts, metadata, navbar, footer, and page children.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Title and description come from config/site.ts — edit that file.
 *   2. Font is Geist Sans (premium product UI). Swap in this file if needed.
 *
 * ============================================================================
 */

import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"

import { SiteFooter } from "@/components/site-footer"
import { SiteNavbar } from "@/components/site-navbar"
import { siteConfig } from "@/config/site"

import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} min-h-screen bg-white antialiased`}>
        <div className="flex min-h-screen flex-col">
          <SiteNavbar />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}

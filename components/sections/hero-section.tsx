/**
 * ============================================================================
 * HERO SECTION — editorial two-column home hero
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Minimal product-design hero: copy + CTAs + stats on the left,
 *   large rounded image panel on the right. Copy comes from config/site.ts.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit headline, bio, CTAs, and stats in config/site.ts → hero.
 *   2. Set hero.image to a remote URL or /public path (leave empty for the SVG placeholder).
 *   3. Keep a single h1 on the home page.
 *
 * ============================================================================
 */

import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

function HeroImagePlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden rounded-[1.75rem] bg-zinc-50",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 320"
        className="h-40 w-40 text-zinc-300 sm:h-48 sm:w-48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Concentric rings */}
        <circle cx="160" cy="160" r="118" stroke="currentColor" strokeWidth="1" />
        <circle cx="160" cy="160" r="88" stroke="currentColor" strokeWidth="1" />
        <circle cx="160" cy="160" r="58" stroke="currentColor" strokeWidth="1.25" />

        {/* Radial ticks */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4
          const x1 = 160 + Math.cos(angle) * 62
          const y1 = 160 + Math.sin(angle) * 62
          const x2 = 160 + Math.cos(angle) * 112
          const y2 = 160 + Math.sin(angle) * 112
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="1"
            />
          )
        })}

        {/* Image icon */}
        <rect
          x="132"
          y="138"
          width="56"
          height="44"
          rx="6"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="148" cy="152" r="4" fill="currentColor" />
        <path
          d="M138 172 L152 158 L164 168 L172 160 L182 172 Z"
          fill="currentColor"
          opacity="0.55"
        />
      </svg>
    </div>
  )
}

export function HeroSection() {
  const { name, hero } = siteConfig

  return (
    <section
      aria-labelledby="hero-heading"
      className="flex min-h-[100dvh] flex-col justify-center bg-background"
    >
      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        {/* ------------------------------------------------------------------ */}
        {/* LEFT — copy, CTAs, stats                                            */}
        {/* ------------------------------------------------------------------ */}
        <div className="hero-fade-up flex max-w-xl flex-col justify-center">
          <h1
            id="hero-heading"
            className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl sm:leading-[1.1] lg:text-[3.25rem] lg:leading-[1.08]"
          >
            {name} {hero.headlineSuffix}
          </h1>

          <p className="mt-6 text-base leading-relaxed text-zinc-500 sm:text-[1.05rem] sm:leading-relaxed">
            {hero.bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Button
              asChild
              className="group h-11 rounded-lg bg-zinc-950 px-5 text-sm font-medium text-white shadow-none hover:bg-zinc-800"
            >
              <Link href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight
                  className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <a
              href={hero.secondaryCta.href}
              download={hero.secondaryCta.download ? true : undefined}
              className="inline-flex items-center gap-2 rounded-sm text-sm font-medium text-zinc-950 transition-colors hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {hero.secondaryCta.label}
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-3 divide-x divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="px-3 py-4 sm:px-5 sm:py-5">
                <dt className="text-xs font-medium text-zinc-400">{stat.label}</dt>
                <dd className="mt-1.5 text-sm font-medium tracking-tight text-zinc-950 sm:text-[0.95rem]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* RIGHT — image panel                                                 */}
        {/* ------------------------------------------------------------------ */}
        <div className="hero-fade-in relative w-full lg:h-full lg:max-h-[min(38rem,calc(100dvh-8rem))] lg:justify-self-end">
          {hero.image ? (
            // eslint-disable-next-line @next/next/no-img-element -- remote Pexels URL from config
            <img
              src={hero.image}
              alt={hero.imageAlt}
              className="aspect-[4/5] h-full w-full min-h-0 rounded-[1.75rem] object-cover sm:aspect-[3/4] lg:aspect-auto"
            />
          ) : (
            <HeroImagePlaceholder className="aspect-[4/5] w-full min-h-0 sm:aspect-[3/4] lg:aspect-auto lg:h-full" />
          )}
        </div>
      </div>
    </section>
  )
}

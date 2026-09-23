/**
 * ============================================================================
 * SERVICES SECTION — interactive preview + service list
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Editorial services block with a left preview and a hover/focus-driven
 *   list on the right. Copy and items live in config/site.ts → services.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit title, intro, and items in config/site.ts → services.
 *   2. Optional item.image: path under /public or a full URL.
 *   3. item.imageTone picks the fallback placeholder palette when image is empty.
 *
 * ============================================================================
 */

"use client"

import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

type ServiceItem = (typeof siteConfig.services.items)[number]
type ImageTone = ServiceItem["imageTone"]

const TONE_STYLES: Record<
  ImageTone,
  { panel: string; orb: string; ground: string }
> = {
  sand: {
    panel: "bg-[#d4c4a8]",
    orb: "bg-[#c45c26]/80",
    ground: "bg-[#b8a078]",
  },
  slate: {
    panel: "bg-zinc-700",
    orb: "bg-zinc-400/70",
    ground: "bg-zinc-800",
  },
  rose: {
    panel: "bg-[#8a3a3a]",
    orb: "bg-[#e8d5d0]/70",
    ground: "bg-[#6b2d2d]",
  },
  teal: {
    panel: "bg-[#2a5a55]",
    orb: "bg-brand/70",
    ground: "bg-[#1e3f3c]",
  },
}

function ServicePreview({
  item,
  className,
}: {
  item: ServiceItem
  className?: string
}) {
  const tone = TONE_STYLES[item.imageTone] ?? TONE_STYLES.sand

  if (item.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- buyer URLs / public paths
      <img
        src={item.image}
        alt=""
        className={cn(
          "h-full w-full rounded-2xl object-cover transition-opacity duration-300",
          className
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-2xl transition-colors duration-500",
        tone.panel,
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute -right-8 top-10 h-28 w-28 rounded-full blur-[2px] transition-colors duration-500",
          tone.orb
        )}
      />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-2/5 rounded-t-[40%] transition-colors duration-500",
          tone.ground
        )}
      />
      <div className="absolute inset-0 flex items-end p-6 sm:p-8">
        <p className="max-w-[12rem] text-sm font-medium text-white/90">
          {item.title}
        </p>
      </div>
    </div>
  )
}

type ServicesSectionProps = {
  className?: string
}

export function ServicesSection({ className }: ServicesSectionProps) {
  const { services } = siteConfig
  const items = services.items
  const [activeId, setActiveId] = React.useState(items[0]?.id ?? "")
  const active = items.find((item) => item.id === activeId) ?? items[0]
  const headingId = "services-heading"
  const titleRefs = React.useRef<Record<string, HTMLElement | null>>({})
  const lastPointer = React.useRef<{ x: number; y: number } | null>(null)
  const activeIdRef = React.useRef(activeId)
  activeIdRef.current = activeId

  function idFromPointerY(clientY: number): string | null {
    const titles = items
      .map((item) => {
        const el = titleRefs.current[item.id]
        if (!el) return null
        return { id: item.id, top: el.getBoundingClientRect().top }
      })
      .filter((row): row is { id: string; top: number } => row !== null)

    if (titles.length === 0) return null

    let chosen = titles[0].id
    for (const title of titles) {
      if (title.top <= clientY) chosen = title.id
      else break
    }
    return chosen
  }

  function onListPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return

    const last = lastPointer.current
    if (last && last.x === event.clientX && last.y === event.clientY) {
      return
    }
    lastPointer.current = { x: event.clientX, y: event.clientY }

    const nextId = idFromPointerY(event.clientY)
    if (!nextId || nextId === activeIdRef.current) return

    setActiveId(nextId)
  }

  if (!active || items.length === 0) return null

  return (
    <section
      aria-labelledby={headingId}
      className={cn("bg-white", className)}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <header className="max-w-3xl">
          <h2
            id={headingId}
            className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl sm:leading-tight"
          >
            {services.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-[1.05rem]">
            {services.intro}
          </p>
        </header>

        <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/6] lg:aspect-auto lg:min-h-[28rem]">
            {items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-300 ease-out",
                  item.id === active.id
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                )}
                aria-hidden={item.id !== active.id}
              >
                <ServicePreview item={item} />
              </div>
            ))}
          </div>

          <div
            role="listbox"
            aria-label="Services"
            aria-activedescendant={`service-${active.id}`}
            onPointerMove={onListPointerMove}
            onPointerLeave={() => {
              lastPointer.current = null
            }}
            className="flex flex-col border-y border-zinc-200"
          >
            {items.map((item) => {
              const isActive = item.id === active.id
              return (
                <button
                  key={item.id}
                  id={`service-${item.id}`}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onFocus={() => setActiveId(item.id)}
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    "group grid w-full grid-cols-1 gap-3 border-b border-zinc-200 py-6 text-left transition-colors last:border-b-0 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-6 sm:py-7",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  )}
                >
                  <span
                    ref={(node) => {
                      titleRefs.current[item.id] = node
                    }}
                    className={cn(
                      "text-xl font-semibold tracking-tight transition-colors duration-200 sm:text-2xl",
                      isActive
                        ? "text-brand"
                        : "text-zinc-950 group-hover:text-brand/80"
                    )}
                  >
                    {item.title}
                  </span>
                  <span
                    className={cn(
                      "pointer-events-none grid min-h-0 transition-[grid-template-rows] duration-300 ease-out",
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                    aria-hidden={!isActive}
                  >
                    <span className="min-h-0 overflow-hidden">
                      <span
                        className={cn(
                          "block text-sm leading-relaxed text-zinc-500 transition-opacity duration-300 sm:text-[0.95rem]",
                          isActive ? "opacity-100" : "opacity-0"
                        )}
                      >
                        {item.description}
                      </span>
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

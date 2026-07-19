/**
 * ============================================================================
 * DISCIPLINES SECTION — core skills and tools
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Editorial list of practice areas with tool tags. Copy comes from
 *   config/site.ts → disciplines.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit title, intro, and items (title, description, tools) in config/site.ts.
 *   2. Add or remove rows by changing the items array — layout adapts.
 *   3. Keep a single h1 on the page (this section uses h2).
 *
 * ============================================================================
 */

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

type DisciplineItem = (typeof siteConfig.disciplines.items)[number]

type DisciplinesSectionProps = {
  className?: string
  /** Override config title when reusing the section. */
  title?: string
  /** Override config intro when reusing the section. */
  intro?: string
  /** Override config items when reusing the section. */
  items?: DisciplineItem[]
}

export function DisciplinesSection({
  className,
  title = siteConfig.disciplines.title,
  intro = siteConfig.disciplines.intro,
  items = siteConfig.disciplines.items,
}: DisciplinesSectionProps) {
  const headingId = "disciplines-heading"

  return (
    <section
      aria-labelledby={headingId}
      className={cn("bg-white", className)}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
        <header className="max-w-3xl">
          <h2
            id={headingId}
            className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl sm:leading-tight"
          >
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-[1.05rem]">
            {intro}
          </p>
        </header>

        <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white sm:mt-12">
          {items.map((item, index) => (
            <article
              key={item.title}
              className={cn(
                "grid md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]",
                index > 0 && "border-t border-zinc-200"
              )}
            >
              {/* Left — discipline */}
              <div
                className={cn(
                  "px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12",
                  "md:border-r md:border-zinc-200"
                )}
              >
                <h3 className="text-lg font-semibold tracking-tight text-zinc-950 sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-[0.95rem] sm:leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Right — tools */}
              <div className="border-t border-zinc-200 px-6 py-8 sm:px-8 sm:py-10 md:border-t-0 lg:px-10 lg:py-12">
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.12em] text-zinc-400">
                  Tools
                </p>
                <ul
                  className="mt-3 flex list-none flex-wrap gap-2"
                  aria-label={`Tools for ${item.title}`}
                >
                  {item.tools.map((tool) => (
                    <li key={tool}>
                      <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-800 sm:text-[0.8rem]">
                        {tool}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

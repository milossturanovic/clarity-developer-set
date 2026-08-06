/**
 * ============================================================================
 * PROJECT CASE STUDY — single project layout (/projects/[slug])
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Editorial light-theme case-study layout: hero, cover image, long-form body,
 *   sticky sidebar (project info, technologies, related projects), share links,
 *   and next-project navigation. Server-rendered — no client JavaScript.
 *
 * DEVELOPER EDIT NOTES:
 *   1. Edit the labels (Project info, Technologies, ...) in
 *      config/site.ts → caseStudyPage.
 *   2. Edit project content in data/projects.json: summary, caseStudy.intro,
 *      caseStudy.sections, client, completionDate, role, tags, coverImage.
 *   3. Share links use siteConfig.url — set it to your real domain.
 *
 * ============================================================================
 */

import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Clock,
  Facebook,
  Github,
  Linkedin,
  Mail,
  Tag,
  User,
  type LucideIcon,
} from "lucide-react"

import { siteConfig } from "@/config/site"
import type { CaseStudyPageData } from "@/lib/projects-data"
import { cn } from "@/lib/utils"

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.739L1.254 2.25H8.08l4.253 5.622L18.244 2.25z" />
    </svg>
  )
}

/** Sidebar row icons, matched to the meta labels built in lib/projects-data.ts. */
const META_ICONS: Record<string, LucideIcon> = {
  Client: User,
  Date: Calendar,
  Role: Briefcase,
  Category: Tag,
  Timeline: Clock,
}

function SidebarCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6">
      <h2 className="text-sm font-semibold tracking-tight text-zinc-950">
        {title}
      </h2>
      <span
        className="mt-3 block h-px w-8 bg-brand"
        aria-hidden="true"
      />
      <div className="mt-5">{children}</div>
    </section>
  )
}

function ShareLinks({
  shareLabel,
  shareUrl,
  title,
}: {
  shareLabel: string
  shareUrl: string
  title: string
}) {
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)

  const targets = [
    {
      name: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: XIcon,
    },
    {
      name: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
    {
      name: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
    },
    {
      name: "Share by email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: Mail,
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-zinc-200 bg-zinc-50/60 px-6 py-4">
      <p className="text-sm font-medium text-zinc-950">{shareLabel}</p>
      <ul className="flex list-none items-center gap-2">
        {targets.map((target) => {
          const Icon = target.icon
          return (
            <li key={target.name}>
              <a
                href={target.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={target.name}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Icon className="h-4 w-4" />
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function ProjectCaseStudy({ project }: { project: CaseStudyPageData }) {
  const labels = siteConfig.caseStudyPage
  const shareUrl = `${siteConfig.url.replace(/\/$/, "")}/projects/${project.slug}`

  return (
    <article className="bg-white">
      {/* ---------------------------------------------------------------
          HERO — category, title, summary
      --------------------------------------------------------------- */}
      <header className="border-b border-zinc-200 bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:px-8 sm:pb-28 sm:pt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-sm text-sm text-zinc-500 transition-colors hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {labels.backLabel}
          </Link>

          <div className="mx-auto mt-10 max-w-3xl text-center sm:mt-12">
            <p className="inline-flex items-center rounded-full border border-brand/20 bg-brand/5 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.14em] text-brand">
              {project.label}
            </p>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl sm:leading-[1.1]">
              {project.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-[1.05rem]">
              {project.summary}
            </p>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------------
          COVER IMAGE — lifted over the hero edge
      --------------------------------------------------------------- */}
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <figure className="-mt-16 overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-100 sm:-mt-20">
          {/* eslint-disable-next-line @next/next/no-img-element -- remote / public covers from JSON */}
          <img
            src={project.heroImage}
            alt={`${project.title} preview`}
            className="aspect-[16/9] w-full object-cover"
          />
        </figure>
      </div>

      {/* ---------------------------------------------------------------
          BODY — long-form content + sticky sidebar
      --------------------------------------------------------------- */}
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14">
          <div className="min-w-0">
            {/* Inline overview strip */}
            <ul className="flex list-none flex-wrap items-center gap-x-6 gap-y-2 border-b border-zinc-200 pb-6">
              {project.meta.map((item) => {
                const Icon = META_ICONS[item.label] ?? Tag
                return (
                  <li
                    key={item.label}
                    className="flex items-center gap-2 text-sm text-zinc-500"
                  >
                    <Icon
                      className="h-4 w-4 shrink-0 text-zinc-400"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{item.label}: </span>
                    {item.value}
                  </li>
                )
              })}
            </ul>

            <p className="mt-8 text-base leading-relaxed text-zinc-600 sm:text-[1.05rem]">
              {project.intro}
            </p>

            {project.sections.length > 0 ? (
              <div className="mt-10 space-y-9">
                {project.sections.map((section) => (
                  <section key={section.title}>
                    <h2 className="text-lg font-semibold tracking-tight text-zinc-950 sm:text-xl">
                      {section.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-zinc-500 sm:text-[1.05rem]">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>
            ) : null}

            {project.websiteUrl || project.githubUrl ? (
              <div className="mt-12 flex flex-wrap gap-3">
                {project.websiteUrl ? (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {labels.livePreviewLabel}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    {labels.sourceLabel}
                  </a>
                ) : null}
              </div>
            ) : null}

            <div className="mt-12">
              <ShareLinks
                shareLabel={labels.shareLabel}
                shareUrl={shareUrl}
                title={project.title}
              />
            </div>
          </div>

          {/* -------------------------------------------------------------
              SIDEBAR
          ------------------------------------------------------------- */}
          <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            <SidebarCard title={labels.infoTitle}>
              <dl className="space-y-5">
                {project.meta.map((item) => {
                  const Icon = META_ICONS[item.label] ?? Tag
                  return (
                    <div key={item.label}>
                      <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-zinc-400">
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        {item.label}
                      </dt>
                      <dd className="mt-1.5 text-sm font-medium text-zinc-950">
                        {item.value}
                      </dd>
                    </div>
                  )
                })}
              </dl>
            </SidebarCard>

            {project.technologies.length > 0 ? (
              <SidebarCard title={labels.technologiesTitle}>
                <ul className="flex list-none flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </SidebarCard>
            ) : null}

            {project.related.length > 0 ? (
              <SidebarCard title={labels.relatedTitle}>
                <ul className="list-none space-y-4">
                  {project.related.map((related) => (
                    <li key={related.slug}>
                      <Link
                        href={`/projects/${related.slug}`}
                        className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <span className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                          {/* eslint-disable-next-line @next/next/no-img-element -- remote / public covers from JSON */}
                          <img
                            src={related.image}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-zinc-950 transition-colors group-hover:text-brand">
                            {related.title}
                          </span>
                          <span className="mt-0.5 flex items-center gap-1.5 text-xs text-zinc-400">
                            <Calendar className="h-3 w-3" aria-hidden="true" />
                            {related.year}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </SidebarCard>
            ) : null}
          </aside>
        </div>

        {/* -------------------------------------------------------------
            NEXT PROJECT
        ------------------------------------------------------------- */}
        {project.next ? (
          <nav
            aria-label="Project navigation"
            className={cn(
              "mt-14 border-t border-zinc-200 pt-8 sm:mt-16",
              "flex justify-end"
            )}
          >
            <Link
              href={`/projects/${project.next.slug}`}
              className="group inline-flex items-center gap-4 rounded-2xl px-2 py-2 text-right transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span>
                <span className="block text-xs uppercase tracking-[0.14em] text-zinc-400">
                  {labels.nextLabel}
                </span>
                <span className="mt-1 block text-base font-semibold text-zinc-950 sm:text-lg">
                  {project.next.title}
                </span>
              </span>
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-colors group-hover:border-zinc-300 group-hover:text-zinc-950">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </nav>
        ) : null}
      </div>
    </article>
  )
}

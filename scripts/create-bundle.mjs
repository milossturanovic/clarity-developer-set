#!/usr/bin/env node
/**
 * create-bundle.mjs
 *
 * INTERNAL SELLER TOOLING — not for buyers.
 *
 * Produces a clean copy of the project in `dist-bundle/<name>/` that contains
 * only the files a buyer should receive. Everything listed in EXCLUDED is
 * skipped: node_modules, build caches, git history, editor cruft, etc.
 *
 * USAGE (seller only — not shipped to buyers):
 *   node scripts/create-bundle.mjs
 *
 * OUTPUT:
 *   dist-bundle/clarity-developer-set/
 *
 * Then right-click that folder and "Send to > Compressed (zipped) folder"
 * on Windows, or `zip -r clarity-developer-set.zip dist-bundle/clarity-developer-set`
 * on macOS/Linux. That zip is what you upload to your sales platform.
 *
 * Zero external dependencies — uses only Node built-ins.
 */

import { readdir, mkdir, copyFile, rm } from "node:fs/promises"
import { existsSync } from "node:fs"
import { resolve, join, relative, sep } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = fileURLToPath(new URL(".", import.meta.url))
const ROOT = resolve(__dirname, "..")
const BUNDLE_NAME = "clarity-developer-set"
const OUT_DIR = join(ROOT, "dist-bundle")
const DEST = join(OUT_DIR, BUNDLE_NAME)

/** Top-level files that must NEVER be shipped to buyers. */
const EXCLUDED_FILES = new Set(["CHANGELOG.md"])

/**
 * Top-level paths (relative to project root) that must NEVER be shipped.
 * Add to this list if you introduce new dev-only files or caches.
 */
const EXCLUDED_TOP_LEVEL = new Set([
  "node_modules",
  ".next",
  ".git",
  ".vercel",
  ".turbo",
  "coverage",
  "out",
  "build",
  "dist-bundle",
  "scripts",
  "tsconfig.tsbuildinfo",
  ".DS_Store",
  ".eslintcache",
  "npm-debug.log",
  "yarn-debug.log",
  "yarn-error.log",
])

/** File suffixes that should never ship, regardless of depth. */
const EXCLUDED_SUFFIXES = [".tsbuildinfo", ".log", ".tmp", ".tmp.md"]

/** Returns true when the given relative path should be skipped. */
function shouldExclude(relPath) {
  if (EXCLUDED_FILES.has(relPath)) return true
  const first = relPath.split(sep)[0]
  if (EXCLUDED_TOP_LEVEL.has(first)) return true
  if (EXCLUDED_SUFFIXES.some((s) => relPath.endsWith(s))) return true
  if (/(^|[\\/])\.env(\..+)?\.local$/.test(relPath)) return true
  if (relPath === ".DS_Store" || relPath.endsWith(`${sep}.DS_Store`)) return true
  return false
}

let fileCount = 0

async function walk(srcDir, destDir) {
  await mkdir(destDir, { recursive: true })
  const entries = await readdir(srcDir, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = join(srcDir, entry.name)
    const rel = relative(ROOT, srcPath)

    if (shouldExclude(rel)) continue

    const destPath = join(destDir, entry.name)

    if (entry.isDirectory()) {
      await walk(srcPath, destPath)
    } else if (entry.isFile()) {
      await copyFile(srcPath, destPath)
      fileCount++
    }
  }
}

async function main() {
  console.log(`\n[bundle] building clean copy of "${BUNDLE_NAME}"...`)

  if (existsSync(OUT_DIR)) {
    console.log(`[bundle] cleaning previous output at ${relative(ROOT, OUT_DIR)}`)
    await rm(OUT_DIR, { recursive: true, force: true })
  }

  await walk(ROOT, DEST)

  console.log(`\n[bundle] done — copied ${fileCount} file(s).`)
  console.log(`[bundle] clean project is at: ${relative(ROOT, DEST)}`)
  console.log(
    `[bundle] next step: zip that folder and upload to your sales platform.\n`
  )
}

main().catch((err) => {
  console.error("[bundle] failed:", err)
  process.exit(1)
})

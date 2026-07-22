import fs from "fs"
import path from "path"
import YAML from "yaml"

const root = process.cwd()
const content = path.join(root, "content")
const statuses = new Set(["stub", "draft", "review", "complete"])
const levels = new Set(["foundational", "intermediate", "advanced"])
const pageTypes = new Set([
  "area-index",
  "topic-index",
  "concept",
  "algorithm",
  "model",
  "implementation",
  "system-design",
  "comparison",
  "case-study",
  "history",
  "reference",
])
const required = [
  "title",
  "slug",
  "description",
  "area",
  "topics",
  "level",
  "status",
  "page_type",
  "aliases",
  "prerequisites",
  "related",
  "historical_context",
]
const expectedAreas = [
  "00-home-and-navigation",
  "01-mathematical-foundations",
  "02-probability-and-statistics",
  "03-classical-machine-learning",
  "04-recommendation-systems",
  "05-time-series-and-forecasting",
  "06-deep-learning",
  "07-reinforcement-learning",
  "08-natural-language-processing",
  "09-computer-vision",
  "10-video-understanding",
  "11-generative-ai",
  "12-information-retrieval-and-search",
  "13-data-engineering",
  "14-ml-engineering-and-mlops",
  "15-cloud-and-distributed-systems",
  "16-software-engineering",
  "17-experimentation-and-evaluation",
  "18-responsible-ai-safety-and-governance",
  "19-domain-applications",
  "20-history-of-ai-and-machine-learning",
  "21-references-and-glossary",
]
const bibliographyPath = path.join(root, "references", "bibliography.yml")
const bibliography = fs.existsSync(bibliographyPath)
  ? YAML.parse(fs.readFileSync(bibliographyPath, "utf8"))
  : {}
const bibliographyKeys = new Set(Object.keys(bibliography || {}))

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (["assets", ".obsidian", "_templates"].includes(entry.name)) return []
      return walk(p)
    }
    return entry.isFile() && entry.name.endsWith(".md") ? [p] : []
  })

let errors = 0
let warnings = 0
const slugs = new Map()
const aliases = new Map()
const files = walk(content)
const incoming = new Map(files.map((file) => [path.relative(root, file), 0]))
const linkRe = /!?\[[^\]]*\]\(([^)]+)\)/g
const metricTermsThatMustBeLinked = [
  "recall at k",
  "precision at k",
  "MRR",
  "NDCG",
  "source coverage",
]

const fail = (msg) => {
  console.error("ERROR:", msg)
  errors++
}
const warn = (msg) => {
  console.warn("WARN:", msg)
  warnings++
}

for (const area of expectedAreas) {
  const index = path.join(content, area, "index.md")
  if (!fs.existsSync(index)) fail("missing top-level index " + path.relative(root, index))
}

const expectedAreaSet = new Set(expectedAreas)
const topLevelAreas = fs
  .readdirSync(content, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && /^\d{2}-/.test(entry.name))
  .map((entry) => entry.name)
  .sort()

for (const area of topLevelAreas) {
  if (!expectedAreaSet.has(area)) fail("unexpected top-level area " + area)
}

for (const [index, area] of expectedAreas.entries()) {
  const prefix = String(index).padStart(2, "0") + "-"
  if (!area.startsWith(prefix)) {
    fail(`top-level area numbering is not sequential: expected ${prefix} but found ${area}`)
  }
}

for (const [key, entry] of Object.entries(bibliography || {})) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(key)) fail("bibliography key is not portable: " + key)
  for (const requiredField of ["type", "title", "authors", "year", "primary"]) {
    if (!(requiredField in entry)) fail(`bibliography entry ${key} missing ${requiredField}`)
  }
  if (!Array.isArray(entry.authors)) fail(`bibliography entry ${key} authors must be a list`)
  if (entry.url && !/^https?:\/\//.test(entry.url)) {
    fail(`bibliography entry ${key} has non-HTTP URL`)
  }
}

const homePath = path.join(content, "index.md")
const homeRaw = fs.existsSync(homePath) ? fs.readFileSync(homePath, "utf8") : ""
for (const area of expectedAreas) {
  if (!homeRaw.includes(`${area}/index.md`)) {
    fail("top-level area is not reachable from home page: " + area)
  }
}

for (const file of files) {
  const rel = path.relative(root, file)
  const raw = fs.readFileSync(file, "utf8")
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) {
    fail(rel + " missing YAML front matter")
    continue
  }
  let meta
  try {
    meta = YAML.parse(match[1])
  } catch (err) {
    fail(rel + " invalid YAML: " + err.message)
    continue
  }
  for (const key of required) if (!(key in meta)) fail(rel + " missing " + key)
  if (!statuses.has(meta.status)) fail(rel + " invalid status " + meta.status)
  if (!levels.has(meta.level)) fail(rel + " invalid level " + meta.level)
  if (!pageTypes.has(meta.page_type)) fail(rel + " invalid page_type " + meta.page_type)
  if (!Array.isArray(meta.topics)) fail(rel + " topics must be a list")
  if (!Array.isArray(meta.aliases)) fail(rel + " aliases must be a list")
  if ("references" in meta) {
    if (!Array.isArray(meta.references)) {
      fail(rel + " references must be a list")
    } else {
      for (const key of meta.references) {
        if (!bibliographyKeys.has(key)) fail(rel + " unknown bibliography key " + key)
      }
    }
  }
  if (typeof meta.historical_context !== "boolean")
    fail(rel + " historical_context must be boolean")
  if (typeof meta.slug === "string") {
    if (meta.slug.startsWith("/") || meta.slug.includes("..")) fail(rel + " malformed slug")
    if (slugs.has(meta.slug))
      fail("duplicate slug " + meta.slug + " in " + rel + " and " + slugs.get(meta.slug))
    slugs.set(meta.slug, rel)
  }
  for (const alias of meta.aliases || []) {
    const key = String(alias).toLowerCase()
    if (aliases.has(key))
      warn("duplicate alias " + alias + " in " + rel + " and " + aliases.get(key))
    aliases.set(key, rel)
  }
  const body = raw.slice(match[0].length)
  if (/^#{1,6}\s*$/m.test(body)) fail(rel + " has empty heading")
  if (
    meta.status === "complete" &&
    /\bTODO\b|\bTBD\b|\bFIXME\b|\[placeholder\]|placeholder text/i.test(body)
  )
    fail(rel + " complete page contains placeholder text")
  if (raw.length < 250 && !rel.includes("_templates")) warn(rel + " is very short")

  const isMetricReferencePage =
    rel.endsWith("content/12-information-retrieval-and-search/ranking-and-retrieval-metrics.md") ||
    rel.endsWith("content/12-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md") ||
    rel.endsWith("content/17-experimentation-and-evaluation/coverage.md")
  if (!isMetricReferencePage) {
    // Only prose must link metric terms. Code identifiers (`ndcg`, `mrr`) and
    // LaTeX cannot hold Markdown links, so strip fenced code, inline code, and
    // math before checking.
    const textWithoutLinks = body
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`[^`]*`/g, "")
      .replace(/\$\$[\s\S]*?\$\$/g, "")
      .replace(/\$[^$\n]*\$/g, "")
      .replace(/\[[^\]]+\]\([^)]+\)/g, "")
    for (const metric of metricTermsThatMustBeLinked) {
      const pattern = new RegExp(`\\b${metric.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i")
      if (pattern.test(textWithoutLinks)) {
        fail(rel + " mentions metric without a Markdown link: " + metric)
      }
    }
  }

  // Guard against a literal "|" inside inline math within a table row. Markdown
  // parses "|" as a column separator, so "$P(s'|s)$" silently splits the cell
  // and corrupts the table (and prettier then reflows the broken grid). Strip
  // code first so backticked currency like `$42.10` is ignored, and only flag
  // spans that also carry a LaTeX-structure char (\ _ ^) so bare currency such
  // as "$0.02/GB | $40" is not a false positive. Use \mid instead of a raw "|".
  const bodyNoCode = body.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "")
  for (const line of bodyNoCode.split("\n")) {
    if (!/^\s*\|.*\|/.test(line)) continue
    for (const span of line.matchAll(/\$[^$\n]+\$/g)) {
      if (span[0].includes("|") && /[\\_^]/.test(span[0])) {
        fail(rel + " has a literal | inside inline math in a table cell (use \\mid): " + span[0])
      }
    }
  }

  for (const m of raw.matchAll(linkRe)) {
    let href = m[1].trim().replace(/^<|>$/g, "")
    if (!href || href.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(href)) continue
    href = href.split("#")[0]
    if (!href) continue
    const target = path.resolve(path.dirname(file), href)
    const candidates = [target]
    if (!path.extname(target)) candidates.push(target + ".md", path.join(target, "index.md"))
    const found = candidates.find((candidate) => incoming.has(path.relative(root, candidate)))
    if (found)
      incoming.set(path.relative(root, found), incoming.get(path.relative(root, found)) + 1)
  }
}

for (const [rel, count] of incoming) {
  if (rel === "content/index.md" || rel.includes("/_templates/")) continue
  if (count === 0) warn("orphan page has no incoming Markdown links: " + rel)
}

// Reading-path completeness: if a section index has a "## Reading path" section,
// its same-folder links must be exactly the section's non-index pages. This
// keeps the per-section chapter navigation (scripts/gen-nav-footers.mjs) from
// silently dropping a page when one is added or removed. Sections without a
// reading path yet are skipped, so the convention can be rolled out gradually.
for (const area of expectedAreas) {
  const indexPath = path.join(content, area, "index.md")
  if (!fs.existsSync(indexPath)) continue
  const lines = fs.readFileSync(indexPath, "utf8").split("\n")
  let inPath = false
  const listed = new Set()
  let hasReadingPath = false
  for (const line of lines) {
    if (/^##\s/.test(line)) {
      inPath = /^##\s+Reading path\s*$/.test(line)
      if (inPath) hasReadingPath = true
      continue
    }
    if (!inPath) continue
    const hit = line.match(/^\s*(?:\d+\.|[-*])\s+\[[^\]]*\]\(([^)]+)\)/)
    if (!hit) continue
    const target = hit[1].split("#")[0].trim()
    if (/^https?:|\//.test(target) || !target.endsWith(".md")) continue
    if (listed.has(target)) fail(`${area}/index.md reading path lists ${target} twice`)
    listed.add(target)
  }
  if (!hasReadingPath) continue
  const actual = new Set(
    fs.readdirSync(path.join(content, area)).filter((f) => f.endsWith(".md") && f !== "index.md"),
  )
  for (const f of actual) if (!listed.has(f)) fail(`${area}/index.md reading path is missing ${f}`)
  for (const f of listed)
    if (!actual.has(f)) fail(`${area}/index.md reading path links non-existent ${f}`)
}

const forbiddenObsidian = [
  "content/.obsidian/workspace.json",
  "content/.obsidian/workspace",
  "content/.obsidian/workspaces.json",
]
for (const p of forbiddenObsidian)
  if (fs.existsSync(path.join(root, p))) fail("committed Obsidian workspace state: " + p)

const assetRoot = path.join(content, "assets")
if (fs.existsSync(assetRoot)) {
  const assetFiles = []
  const walkAssets = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) walkAssets(p)
      else assetFiles.push(p)
    }
  }
  walkAssets(assetRoot)
  for (const a of assetFiles) {
    if (fs.statSync(a).size > 5 * 1024 * 1024) fail("oversized asset: " + path.relative(root, a))
  }
}

const secretPatterns = [
  /sk-[A-Za-z0-9]{20,}/,
  /ghp_[A-Za-z0-9]{20,}/,
  /AKIA[0-9A-Z]{16}/,
  /-----BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY-----/,
]
for (const file of [
  ...files,
  ...["README.md", "CONTRIBUTING.md"].map((f) => path.join(root, f)).filter(fs.existsSync),
]) {
  const raw = fs.readFileSync(file, "utf8")
  for (const pattern of secretPatterns)
    if (pattern.test(raw)) fail("possible secret in " + path.relative(root, file))
}

console.log(`content validation: ${files.length} pages, ${warnings} warnings`)
if (errors) process.exit(1)

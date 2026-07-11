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
  "history",
  "interview-question",
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
  "07-natural-language-processing",
  "08-computer-vision",
  "09-video-understanding",
  "10-generative-ai",
  "11-information-retrieval-and-search",
  "12-data-engineering",
  "13-ml-engineering-and-mlops",
  "14-cloud-and-distributed-systems",
  "15-software-engineering",
  "16-experimentation-and-evaluation",
  "17-responsible-ai-safety-and-governance",
  "18-domain-applications",
  "19-history-of-ai-and-machine-learning",
  "20-interview-preparation",
  "21-project-and-experience-map",
  "22-references-and-glossary",
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
  if (meta.status === "complete" && /TODO|TBD|placeholder/i.test(body))
    fail(rel + " complete page contains placeholder text")
  if (raw.length < 250 && !rel.includes("_templates")) warn(rel + " is very short")

  const isMetricReferencePage =
    rel.endsWith("content/11-information-retrieval-and-search/ranking-and-retrieval-metrics.md") ||
    rel.endsWith("content/11-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md")
  if (!isMetricReferencePage) {
    const textWithoutLinks = body.replace(/\[[^\]]+\]\([^)]+\)/g, "")
    for (const metric of metricTermsThatMustBeLinked) {
      const pattern = new RegExp(`\\b${metric.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i")
      if (pattern.test(textWithoutLinks)) {
        fail(rel + " mentions metric without a Markdown link: " + metric)
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

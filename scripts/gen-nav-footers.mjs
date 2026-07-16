import fs from "fs"
import path from "path"

// Generate the navigation footers that let a reader move through the wiki in a
// suited order. Two footer types, both plain-markdown blockquotes (Obsidian- and
// GitHub-safe):
//
//   Section footer  — chapter navigation through ONE section, driven by the
//                     ordered `## Reading path` list in that section's index.md.
//                     Emitted on every page named in a reading path.
//   Learning path   — cross-section curated sequences, driven by the arrow
//                     chains in content/00-home-and-navigation/learning-paths.md.
//
// A page may carry both (Section footer first, then Learning path). Existing
// footers of either type are stripped and regenerated, so this is the single
// source of truth. Run `--check` to fail (exit 1) when regeneration would change
// anything, without writing.
//
// Usage: node scripts/gen-nav-footers.mjs [--check]
const checkOnly = process.argv.includes("--check")
const root = process.cwd()
const contentDir = path.join(root, "content")
const LEARNING_PATHS = "content/00-home-and-navigation/learning-paths.md"
// Not a linear reading order — samples index pages already on other paths.
const SKIP_LEARNING_HEADINGS = new Set(["focused review and explanation", "how to study a path"])

const toPosix = (p) => p.split(path.sep).join("/")
const abs = (rel) => path.join(root, rel)
const readFile = (rel) => fs.readFileSync(abs(rel), "utf8")

const titleOf = (rel) => {
  const raw = readFile(rel)
  const m = raw.match(/^---\n([\s\S]*?)\n---/)
  const t = m && m[1].match(/^title:\s*(.+)$/m)
  return t ? t[1].trim().replace(/^["']|["']$/g, "") : path.basename(rel, ".md")
}
const relLink = (fromRel, toRel) => toPosix(path.relative(path.dirname(fromRel), toRel))
const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

// --- Section reading paths (source: each section index's "## Reading path") ---
const sectionPaths = []
for (const name of fs
  .readdirSync(contentDir, { withFileTypes: true })
  .filter((e) => e.isDirectory() && /^\d{2}-/.test(e.name))
  .map((e) => e.name)
  .sort()) {
  const indexRel = `content/${name}/index.md`
  if (!fs.existsSync(abs(indexRel))) continue
  const lines = readFile(indexRel).split("\n")
  // Collect the list items under "## Reading path" until the next H2.
  let inPath = false
  const pages = []
  for (const line of lines) {
    if (/^##\s/.test(line)) {
      inPath = /^##\s+Reading path\s*$/.test(line)
      continue
    }
    if (!inPath) continue
    const hit = line.match(/^\s*(?:\d+\.|[-*])\s+\[[^\]]*\]\(([^)]+)\)/)
    if (!hit) continue
    const target = hit[1].split("#")[0].trim()
    if (/^https?:|\//.test(target) || !target.endsWith(".md")) continue // same-folder only
    pages.push(`content/${name}/${target}`)
  }
  if (pages.length) {
    sectionPaths.push({ kind: "section", name: titleOf(indexRel), index: indexRel, pages })
  }
}

// --- Learning paths (source: learning-paths.md H2 arrow chains) ---
const learningPaths = []
{
  const raw = readFile(LEARNING_PATHS)
  const dir = path.dirname(LEARNING_PATHS)
  const sections = raw.split(/^##\s+/m).slice(1)
  for (const sec of sections) {
    const name = sec.split("\n")[0].trim()
    if (SKIP_LEARNING_HEADINGS.has(name.toLowerCase())) continue
    const pages = []
    for (const lm of sec.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = lm[1].split("#")[0].trim()
      if (/^https?:/.test(target) || !target.endsWith(".md")) continue
      const repoRel = toPosix(path.normalize(path.join(dir, target)))
      if (fs.existsSync(abs(repoRel))) pages.push(repoRel)
    }
    if (pages.length >= 2) learningPaths.push({ kind: "learning", name, anchor: slug(name), pages })
  }
}

// --- Build one nav row per membership: a label (kind + linked name) and a pager
// (prev/next chips with arrows). All rows render inside a single [!nav] callout,
// styled as a compact, non-wrapping pager by quartz/styles/custom.scss. Links are
// normal Markdown, so they still resolve and are checked like any other link. ---
const memberBlock = (cur, p, i) => {
  const prev = i > 0 ? p.pages[i - 1] : null
  const next = i < p.pages.length - 1 ? p.pages[i + 1] : null
  const nameLink =
    p.kind === "section"
      ? "[" + p.name + "](" + relLink(cur, p.index) + ")"
      : "[" + p.name + "](" + relLink(cur, LEARNING_PATHS) + "#" + p.anchor + ")"
  const kind = p.kind === "section" ? "Section" : "Learning path"
  const chips = []
  if (prev) chips.push("[← " + titleOf(prev) + "](" + relLink(cur, prev) + ")")
  if (next) chips.push("[" + titleOf(next) + " →](" + relLink(cur, next) + ")")
  return { label: "**" + kind + "** — " + nameLink, pager: chips.join(" ") }
}

const memberships = new Map() // repoRel -> [{label, pager}, ...]
const add = (rel, block) => {
  if (!memberships.has(rel)) memberships.set(rel, [])
  memberships.get(rel).push(block)
}
for (const p of sectionPaths) p.pages.forEach((pg, i) => add(pg, memberBlock(pg, p, i)))
for (const p of learningPaths) p.pages.forEach((pg, i) => add(pg, memberBlock(pg, p, i)))

// One callout per page; a blank ">" between rows makes each its own paragraph so
// the label and pager style independently (odd = label, even = pager).
const composeCallout = (blocks) => {
  const rows = []
  for (const b of blocks) rows.push("> " + b.label, "> " + b.pager)
  return "> [!nav]\n" + rows.join("\n>\n")
}

// Strip any prior footer (the [!nav] callout block, or the legacy single-line
// footers) before appending the freshly generated callout.
const stripFooters = (raw) => {
  const lines = raw.split("\n")
  const kept = []
  for (let i = 0; i < lines.length; i++) {
    if (/^>\s*\[!nav\]/i.test(lines[i])) {
      i++
      while (i < lines.length && /^>/.test(lines[i])) i++
      i--
      continue
    }
    if (/^>\s*\*\*(Section|Learning path) —/.test(lines[i])) continue
    kept.push(lines[i])
  }
  return kept.join("\n").replace(/\s+$/, "")
}

// --- Apply ---
let changed = 0
const drift = []
for (const [rel, blocks] of memberships) {
  const raw = readFile(rel)
  const nextContent = stripFooters(raw) + "\n\n" + composeCallout(blocks) + "\n"
  if (nextContent !== raw) {
    changed++
    drift.push(rel)
    if (!checkOnly) fs.writeFileSync(abs(rel), nextContent)
  }
}

console.log(
  `sections: ${sectionPaths.length}, learning paths: ${learningPaths.length}, pages with footers: ${memberships.size}`,
)
if (checkOnly) {
  if (changed) {
    console.error(`nav footers OUT OF DATE (${changed} files). Run: make nav-footers`)
    for (const d of drift.slice(0, 20)) console.error("  " + d)
    process.exit(1)
  }
  console.log("nav footers: up to date")
} else {
  console.log(`nav footers written: ${changed} file(s) changed`)
}

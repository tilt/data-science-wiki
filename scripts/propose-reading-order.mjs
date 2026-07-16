import fs from "fs"
import path from "path"
import YAML from "yaml"

// Read-only helper: propose a per-section reading order by topologically sorting
// the section's non-index pages over their intra-section `prerequisites`, then
// breaking ties by level (foundational < intermediate < advanced) and title.
// This only seeds a reading order; the author hand-tunes it into the index's
// `## Reading path`. Usage:
//   node scripts/propose-reading-order.mjs [NN]      (one section, or all)
const root = process.cwd()
const contentDir = path.join(root, "content")
const only = process.argv[2]
const levelRank = { foundational: 0, intermediate: 1, advanced: 2 }

const readMeta = (file) => {
  const raw = fs.readFileSync(file, "utf8")
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/)
  return m ? YAML.parse(m[1]) : {}
}

const sections = fs
  .readdirSync(contentDir, { withFileTypes: true })
  .filter((e) => e.isDirectory() && /^\d{2}-/.test(e.name))
  .map((e) => e.name)
  .filter((name) => !only || name.startsWith(only))
  .sort()

for (const section of sections) {
  const dir = path.join(contentDir, section)
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") && f !== "index.md")
  const meta = new Map(files.map((f) => [f, readMeta(path.join(dir, f))]))

  // Build prerequisite edges that stay inside this section. A prereq entry can
  // be "page.md" or "./page.md"; ignore cross-section ("../…") and index.md.
  const inSection = new Set(files)
  const deps = new Map(files.map((f) => [f, new Set()]))
  for (const f of files) {
    for (const pre of meta.get(f).prerequisites || []) {
      const base = path.basename(String(pre))
      if (base !== f && inSection.has(base)) deps.get(f).add(base)
    }
  }

  // Kahn topological sort; among ready nodes pick by level then title so the
  // order reads foundational -> advanced.
  const order = []
  const remaining = new Set(files)
  const ready = () =>
    [...remaining]
      .filter((f) => [...deps.get(f)].every((d) => !remaining.has(d)))
      .sort((a, b) => {
        const la = levelRank[meta.get(a).level] ?? 1
        const lb = levelRank[meta.get(b).level] ?? 1
        if (la !== lb) return la - lb
        return (meta.get(a).title || a).localeCompare(meta.get(b).title || b)
      })
  while (remaining.size) {
    const r = ready()
    if (!r.length) {
      // cycle: emit the rest alphabetically and stop
      for (const f of [...remaining].sort()) order.push(f + "  (cycle)")
      break
    }
    order.push(r[0])
    remaining.delete(r[0])
  }

  const noPrereq = files.filter((f) => deps.get(f).size === 0).length
  console.log(`\n=== ${section} (${files.length} pages, ${noPrereq} with no in-section prereq) ===`)
  order.forEach((f, i) => {
    const base = f.replace(/\s+\(cycle\)$/, "")
    const t = meta.get(base)?.title || base
    console.log(`${String(i + 1).padStart(2)}. ${t}  [${base}]`)
  })
}

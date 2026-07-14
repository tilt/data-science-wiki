import fs from "fs"
import path from "path"
import YAML from "yaml"

// List pages whose `last_reviewed` date is older than a threshold, so the
// freshness metadata becomes an actionable maintenance signal instead of an
// unused field. Default threshold is 180 days; override with an argument:
//   node scripts/list-stale.mjs 365
const days = Number(process.argv[2]) || 180
const root = process.cwd()
const now = Date.now()
const cutoffMs = days * 24 * 60 * 60 * 1000

const files = []
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (["assets", ".obsidian", "_templates"].includes(e.name)) continue
      walk(p)
    } else if (e.isFile() && e.name.endsWith(".md")) files.push(p)
  }
}
walk(path.join(root, "content"))

const stale = []
const missing = []
for (const f of files) {
  const raw = fs.readFileSync(f, "utf8")
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (!m) continue
  const meta = YAML.parse(m[1])
  const rel = path.relative(root, f)
  const value = meta.last_reviewed
  if (!value) {
    missing.push(rel)
    continue
  }
  // YAML may parse an unquoted date as a Date; quoted stays a string.
  const reviewed = value instanceof Date ? value : new Date(String(value))
  if (Number.isNaN(reviewed.getTime())) {
    missing.push(rel + " (unparseable last_reviewed: " + value + ")")
    continue
  }
  const ageMs = now - reviewed.getTime()
  if (ageMs > cutoffMs) {
    stale.push({ rel, title: meta.title, ageDays: Math.floor(ageMs / 86400000) })
  }
}

stale.sort((a, b) => b.ageDays - a.ageDays)

for (const s of stale) {
  console.log(`${String(s.ageDays).padStart(4)}d  ${s.rel} - ${s.title}`)
}
for (const rel of missing) {
  console.log(`   ?  ${rel} - missing last_reviewed`)
}

console.log(
  `\nstale pages (> ${days} days): ${stale.length}` +
    (missing.length ? `, missing last_reviewed: ${missing.length}` : "") +
    `, scanned ${files.length}`,
)

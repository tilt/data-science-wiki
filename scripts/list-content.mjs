import fs from "fs"
import path from "path"
import YAML from "yaml"

const mode = process.argv[2] || "stubs"
const root = process.cwd()
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

for (const f of files) {
  const raw = fs.readFileSync(f, "utf8")
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (!m) continue
  const meta = YAML.parse(m[1])
  if (
    (mode === "stubs" && meta.status === "stub") ||
    (mode === "drafts" && meta.status === "draft")
  ) {
    console.log(path.relative(root, f) + " - " + meta.title)
  }
}

import fs from "fs"
import path from "path"

const root = process.cwd()
const content = path.join(root, "content")
const files = []
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if ([".obsidian", "_templates"].includes(e.name)) continue
      walk(p)
    } else if (e.isFile() && e.name.endsWith(".md")) files.push(p)
  }
}
walk(content)

let errors = 0
const fail = (msg) => {
  console.error("ERROR:", msg)
  errors++
}
const linkRe = /!?\[[^\]]*\]\(([^)]+)\)/g
for (const file of files) {
  const raw = fs.readFileSync(file, "utf8")
  for (const m of raw.matchAll(linkRe)) {
    let href = m[1].trim().replace(/^<|>$/g, "")
    if (!href || href.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(href)) continue
    href = href.split("#")[0]
    if (!href) continue
    const target = path.resolve(path.dirname(file), href)
    const candidates = [target]
    if (!path.extname(target)) candidates.push(target + ".md", path.join(target, "index.md"))
    if (!candidates.some(fs.existsSync)) fail(path.relative(root, file) + " broken link " + m[1])
  }
}
if (errors) process.exit(1)
console.log("link check: ok")

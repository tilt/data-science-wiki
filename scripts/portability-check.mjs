import fs from "fs"
import path from "path"

const root = process.cwd()
const content = path.join(root, "content")
const files = []
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if ([".obsidian", "assets"].includes(e.name)) continue
      walk(p)
    } else if (e.isFile() && e.name.endsWith(".md")) files.push(p)
  }
}
walk(content)

const checks = [
  [/!\[\[/, "Obsidian transclusion"],
  [/\[\[/, "Obsidian wikilink"],
  [/^\^[-A-Za-z0-9_]+$/m, "Obsidian block reference"],
  [/^%%/m, "Obsidian comment"],
  [/^import\s.+from\s/m, "MDX import"],
  [/^export\s/m, "MDX export"],
  [/<[A-Z][A-Za-z0-9]*(\s|>)/, "JSX component"],
  [/^```dataview\b/m, "Dataview block"],
]
let errors = 0
for (const file of files) {
  const raw = fs.readFileSync(file, "utf8")
  // Obsidian/MDX/JSX syntax only matters in prose. Inside fenced or inline code
  // it is literal text (e.g. numpy output like `[[0, 1]]`) that renders the same
  // in MkDocs, so strip code before these checks to avoid false positives.
  const prose = raw.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "")
  for (const [re, label] of checks) {
    if (re.test(prose)) {
      console.error("ERROR:", path.relative(root, file), "uses", label)
      errors++
    }
  }
  const dollarCount = (raw.match(/(?<!\\)\$\$/g) || []).length
  if (dollarCount % 2 !== 0) {
    console.error("ERROR:", path.relative(root, file), "has unbalanced display math delimiters")
    errors++
  }
}
if (errors) process.exit(1)
console.log("portability check: ok")

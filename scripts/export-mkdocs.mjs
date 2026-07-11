import fs from "fs"
import path from "path"

const root = process.cwd()
const out = path.join(root, ".generated", "mkdocs")
fs.rmSync(out, { recursive: true, force: true })
fs.mkdirSync(out, { recursive: true })
fs.cpSync(path.join(root, "content"), path.join(out, "docs"), {
  recursive: true,
  filter: (src) =>
    !src.includes(path.sep + ".obsidian" + path.sep) &&
    !src.includes(path.sep + "_templates" + path.sep),
})
fs.writeFileSync(
  path.join(out, "mkdocs.yml"),
  `site_name: Data Science, Machine Learning & AI Wiki
theme:
  name: material
markdown_extensions:
  - admonition
  - tables
  - pymdownx.arithmatex:
      generic: true
  - pymdownx.superfences
`,
)
console.log("exported " + path.relative(root, out))

import fs from "fs"
import path from "path"

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [k, ...rest] = arg.split("=")
    return [k.replace(/^--/, ""), rest.join("=")]
  }),
)

if (!args.type || !args.path || !args.title) {
  console.error(
    "Usage: node scripts/new-page.mjs --type=concept --path=04-recommendation-systems/new-page.md --title='New Page'",
  )
  process.exit(1)
}

const target = path.resolve(process.cwd(), "content", args.path)
if (fs.existsSync(target) && args.force !== "true") {
  console.error("Refusing to overwrite existing page: " + path.relative(process.cwd(), target))
  process.exit(1)
}
fs.mkdirSync(path.dirname(target), { recursive: true })
const slug = args.path.replace(/\.md$/, "").replace(/\/index$/, "")
const area = args.path.split("/")[0].replace(/^\d+-/, "")
fs.writeFileSync(
  target,
  `---
title: "${args.title}"
slug: "${slug}"
description: "Short description."
area: "${area}"
topics:
  - "${slug.split("/").pop()}"
level: "foundational"
status: "stub"
page_type: "${args.type}"
aliases: []
prerequisites: []
related: []
historical_context: false
---

# ${args.title}

## Summary

`,
)
console.log("created " + path.relative(process.cwd(), target))

import fs from "node:fs"
import path from "node:path"

const root = process.env.MERMAID_PATCH_ROOT
  ? path.resolve(process.env.MERMAID_PATCH_ROOT)
  : process.cwd()
const pluginRoot = path.join(root, ".quartz/plugins/obsidian-flavored-markdown")
const sourcePath = path.join(pluginRoot, "src/scripts/mermaid.inline.ts")
const distPath = path.join(pluginRoot, "dist/index.js")

function warn(message) {
  console.warn(`WARN: ${message}`)
}

function patchSource() {
  if (!fs.existsSync(sourcePath)) {
    warn(`Mermaid source config not found at ${sourcePath}; skipping source patch.`)
    return false
  }

  const input = fs.readFileSync(sourcePath, "utf8")
  const normalized = input.replace(
    /(\n(\s*)securityLevel:\s*"loose",\n)(?:\s*htmlLabels:\s*false,\n)+/,
    (_match, anchor, indent) => `${anchor}${indent}htmlLabels: false,\n`,
  )
  if (normalized !== input) {
    fs.writeFileSync(sourcePath, normalized)
    return true
  }

  if (/\n\s*securityLevel:\s*"loose",\n\s*htmlLabels:\s*false,/.test(input)) return false

  const sourceAnchor = /(\n\s*securityLevel:\s*"loose",\n)/
  const output = input.replace(sourceAnchor, (match) => {
    const indent = match.match(/\n(\s*)securityLevel:/)?.[1] ?? "      "
    return `${match}${indent}htmlLabels: false,\n`
  })

  if (output === input) {
    warn(`Could not find Mermaid source config anchor in ${sourcePath}; leaving source unchanged.`)
    return false
  }

  fs.writeFileSync(sourcePath, output)
  return true
}

function patchDist() {
  if (!fs.existsSync(distPath)) {
    warn(`Mermaid bundled config not found at ${distPath}; skipping bundled patch.`)
    return false
  }

  const input = fs.readFileSync(distPath, "utf8")
  const normalized = input.replace(
    /(securityLevel:\\?"loose\\?",)(?:htmlLabels:!1,)+/g,
    "$1htmlLabels:!1,",
  )
  if (normalized !== input) {
    fs.writeFileSync(distPath, normalized)
    return true
  }

  if (/securityLevel:\\?"loose\\?",htmlLabels:!1,/.test(input)) return false

  const distAnchor = /securityLevel:\\?"loose\\?",/
  const output = input.replace(distAnchor, (match) => `${match}htmlLabels:!1,`)

  if (output === input) {
    warn(`Could not find Mermaid bundled config anchor in ${distPath}; leaving bundle unchanged.`)
    return false
  }

  fs.writeFileSync(distPath, output)
  return true
}

const changed = [patchSource(), patchDist()].some(Boolean)
console.log(
  changed
    ? "Patched Mermaid config to disable HTML labels globally."
    : "Mermaid config patch already applied.",
)

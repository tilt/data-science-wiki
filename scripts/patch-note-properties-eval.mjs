import fs from "node:fs"
import path from "node:path"

const root = process.env.NOTE_PROPERTIES_PATCH_ROOT
  ? path.resolve(process.env.NOTE_PROPERTIES_PATCH_ROOT)
  : process.cwd()
const distPath = path.join(root, ".quartz/plugins/note-properties/dist/index.js")

function warn(message) {
  console.warn(`WARN: ${message}`)
}

if (!fs.existsSync(distPath)) {
  warn(`Note properties bundle not found at ${distPath}; skipping eval patch.`)
  process.exit(0)
}

const input = fs.readFileSync(distPath, "utf8")

if (input.includes("return (0, eval)(str) || {};")) {
  console.log("Note properties eval patch already applied.")
  process.exit(0)
}

const output = input.replace("return eval(str) || {};", "return (0, eval)(str) || {};")

if (output === input) {
  warn(
    `Could not find note-properties direct eval anchor in ${distPath}; leaving bundle unchanged.`,
  )
  process.exit(0)
}

fs.writeFileSync(distPath, output)
console.log("Patched note-properties bundle to avoid esbuild direct-eval warning.")

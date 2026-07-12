import fs from "node:fs/promises"
import path from "node:path"
import process from "node:process"

const pluginRoot = path.resolve(import.meta.dirname, "..")
const src = path.join(pluginRoot, "src")
const dist = path.join(pluginRoot, "dist")

await fs.rm(dist, { recursive: true, force: true })
await fs.cp(src, dist, { recursive: true })

console.log(`Built ${path.relative(process.cwd(), dist)} from ${path.relative(process.cwd(), src)}`)

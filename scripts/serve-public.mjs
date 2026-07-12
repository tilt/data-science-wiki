import http from "node:http"
import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import handler from "serve-handler"
import YAML from "yaml"

function readArg(name, fallback) {
  const index = process.argv.indexOf(`--${name}`)
  if (index !== -1 && process.argv[index + 1]) return process.argv[index + 1]
  return fallback
}

const port = Number(readArg("port", process.env.PORT ?? "8080"))
const publicDir = path.resolve(readArg("dir", "public"))
const indexPath = path.join(publicDir, "index.html")

function readConfiguredBaseDir() {
  const explicit = readArg("baseDir", undefined)
  if (explicit !== undefined) return explicit

  try {
    const config = YAML.parse(fs.readFileSync(path.resolve("quartz.config.yaml"), "utf8"))
    const baseUrl = config?.configuration?.baseUrl
    if (typeof baseUrl !== "string" || baseUrl.trim() === "") return ""
    return new URL(`https://${baseUrl}`).pathname
  } catch {
    return ""
  }
}

function normalizeBaseDir(value) {
  if (!value || value === "/") return ""
  return "/" + value.replace(/^\/+|\/+$/g, "")
}

const baseDir = normalizeBaseDir(readConfiguredBaseDir())

if (!fs.existsSync(indexPath)) {
  console.error(`Cannot preview because ${path.relative(process.cwd(), indexPath)} does not exist.`)
  console.error("Run `make build` first, or use `make preview-watch` for Quartz live rebuilds.")
  process.exit(1)
}

const server = http.createServer((request, response) => {
  if (
    baseDir &&
    request.url &&
    (request.url === baseDir || request.url.startsWith(`${baseDir}/`))
  ) {
    request.url = request.url.slice(baseDir.length) || "/"
  }

  return handler(request, response, {
    public: publicDir,
    cleanUrls: true,
    directoryListing: false,
  })
})

server.on("error", (error) => {
  console.error(`Unable to start preview server on http://localhost:${port}: ${error.message}`)
  process.exit(1)
})

server.listen(port, "127.0.0.1", () => {
  const baseUrl = `http://localhost:${port}${baseDir}`
  console.log(`Serving ${path.relative(process.cwd(), publicDir)} at ${baseUrl}`)
})

function close() {
  server.close(() => process.exit(0))
}

process.on("SIGINT", close)
process.on("SIGTERM", close)

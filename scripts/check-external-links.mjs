import fs from "fs"
import path from "path"
import { EventEmitter } from "node:events"

// Check external http(s) links for liveness. Unlike check-links.mjs (which
// validates internal Markdown targets), this reaches out over the network, so
// it is intended for a scheduled or on-demand run rather than the core
// `make validate` loop. It is non-blocking by default: it reports dead links
// and exits 0. Pass --strict to exit non-zero when any link is broken.
//
// Usage:
//   node scripts/check-external-links.mjs [--strict] [--concurrency=N] [--timeout=MS]
const args = process.argv.slice(2)
const strict = args.includes("--strict")
const getArg = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`))
  return hit ? Number(hit.split("=")[1]) : fallback
}
const concurrency = getArg("concurrency", 12)
const timeoutMs = getArg("timeout", 15000)

// Each in-flight fetch registers an abort listener on the shared dispatcher;
// with concurrent probes this trips Node's default 10-listener warning. Raise
// the ceiling to match the fan-out so the output stays clean.
EventEmitter.defaultMaxListeners = Math.max(concurrency * 2, 20)

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

// Collect unique external URLs and remember one source file per URL for the
// report. Strip trailing punctuation that Markdown prose commonly leaves on a
// bare URL, and drop the fragment (servers ignore it anyway).
// Allow one level of balanced parentheses inside the link target so URLs like
// DOIs (…/0004-3702(81)90008-1) are captured whole instead of truncated at the
// first ")". An optional Markdown title after the URL is tolerated.
const linkRe = /!?\[[^\]]*\]\(((?:[^()\s]|\([^()]*\))+)(?:\s+"[^"]*")?\)/g
// Exclude "(" from the normal-character class so the balanced-paren branch is
// the only thing that can consume a "(" — otherwise a bare DOI truncates at
// its first opening paren instead of matching "(81)" as a unit.
const bareUrlRe = /(?<![("[])\bhttps?:\/\/(?:[^\s()<>\]]|\([^()\s]*\))+/g
const sources = new Map()
const record = (url, rel) => {
  let clean = url.trim().replace(/^<|>$/g, "")
  clean = clean.split("#")[0].replace(/[.,;:'")\]]+$/, "")
  if (!/^https?:\/\//i.test(clean)) return
  if (!sources.has(clean)) sources.set(clean, rel)
}
for (const file of files) {
  const rel = path.relative(root, file)
  const raw = fs.readFileSync(file, "utf8")
  for (const m of raw.matchAll(linkRe)) {
    // Strip the angle brackets of a Markdown autolink target (<https://…>)
    // before the scheme test, or such links would be skipped here and left to
    // the more error-prone bare-URL pass.
    const href = m[1].trim().replace(/^<|>$/g, "")
    if (/^https?:\/\//i.test(href)) record(href, rel)
  }
  for (const m of raw.matchAll(bareUrlRe)) record(m[0], rel)
}

const urls = [...sources.keys()].sort()
console.log(`checking ${urls.length} unique external URLs (concurrency ${concurrency})...`)

// A HEAD request is cheapest, but many hosts reject it; fall back to a ranged
// GET before declaring a URL dead. A 401/403/405 means the resource exists but
// gates automated access, which is not link rot, so we treat it as alive.
const aliveStatus = (status) => status < 400 || status === 401 || status === 403 || status === 405
const probe = async (url, method) => {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "data-science-wiki-link-checker/1.0",
        accept: "*/*",
        ...(method === "GET" ? { range: "bytes=0-2048" } : {}),
      },
    })
  } finally {
    clearTimeout(timer)
  }
}
const check = async (url) => {
  try {
    let res = await probe(url, "HEAD")
    if (!aliveStatus(res.status)) res = await probe(url, "GET")
    if (aliveStatus(res.status)) return null
    return `HTTP ${res.status}`
  } catch (err) {
    try {
      const res = await probe(url, "GET")
      if (aliveStatus(res.status)) return null
      return `HTTP ${res.status}`
    } catch (err2) {
      return err2.name === "AbortError" ? "timeout" : err2.cause?.code || err2.message
    }
  }
}

const broken = []
let index = 0
const worker = async () => {
  while (index < urls.length) {
    const url = urls[index++]
    const reason = await check(url)
    if (reason) broken.push({ url, reason, source: sources.get(url) })
  }
}
await Promise.all(Array.from({ length: Math.min(concurrency, urls.length) }, worker))

broken.sort((a, b) => a.url.localeCompare(b.url))
for (const b of broken) {
  console.error(`BROKEN [${b.reason}] ${b.url}\n         first seen in ${b.source}`)
}
console.log(
  `\nexternal link check: ${urls.length} checked, ${broken.length} broken` +
    (broken.length && !strict ? " (non-blocking)" : ""),
)
if (broken.length && strict) process.exit(1)

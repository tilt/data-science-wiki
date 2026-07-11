import { h } from "preact"
import {
  resolveRelative,
  simplifySlug,
  splitAnchor,
  stripSlashes,
  transformLink,
} from "@quartz-community/utils"

const isAbsoluteUrl = (target) => /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(target)

function relatedTargets(frontmatter, field) {
  const value = frontmatter?.[field]
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === "string" && item.trim() !== "")
  }
  if (typeof value === "string" && value.trim() !== "") {
    return [value]
  }
  return []
}

function fallbackTitle(target) {
  const [withoutAnchor] = splitAnchor(target)
  const cleaned = withoutAnchor.replace(/\.md$/, "").replace(/\/index$/, "")
  return cleaned.split("/").filter(Boolean).at(-1)?.replaceAll("-", " ") ?? target
}

function resolveTarget(fileSlug, target, allFiles) {
  if (isAbsoluteUrl(target)) {
    return { href: target, title: target, external: true }
  }

  const allSlugs = allFiles.map((file) => file.slug).filter(Boolean)
  const transformOptions = { strategy: "relative", allSlugs }
  const href = transformLink(fileSlug, target, transformOptions)
  const base = "https://base.com/" + stripSlashes(simplifySlug(fileSlug), true)
  const url = new URL(href, base)
  const [canonicalRaw, anchor] = splitAnchor(url.pathname)
  let canonical = canonicalRaw
  if (canonical.endsWith("/")) canonical += "index"

  const fullSlug = decodeURIComponent(stripSlashes(canonical, true))
  const page = allFiles.find((file) => simplifySlug(file.slug) === simplifySlug(fullSlug))
  const resolvedHref = page
    ? resolveRelative(fileSlug, page.slug) + (anchor ? `#${anchor}` : "")
    : href

  return {
    href: resolvedHref,
    title: page?.frontmatter?.title ?? fallbackTitle(target),
    external: false,
    slug: page?.slug ?? fullSlug,
  }
}

export default function RelatedLinks(opts = {}) {
  const field = opts.field ?? "related"
  const title = opts.title ?? "Related"

  const RelatedLinksComponent = ({ fileData, allFiles, displayClass }) => {
    const targets = relatedTargets(fileData.frontmatter, field)
    if (targets.length === 0) return null

    const seen = new Set()
    const links = targets
      .map((target) => resolveTarget(fileData.slug, target, allFiles))
      .filter((link) => {
        const key = link.external ? link.href : link.slug
        if (!key || key === simplifySlug(fileData.slug) || seen.has(key)) return false
        seen.add(key)
        return true
      })

    if (links.length === 0) return null

    return h(
      "nav",
      { class: [displayClass, "related-links"].filter(Boolean).join(" "), "aria-label": title },
      h("h3", null, title),
      h(
        "ul",
        null,
        links.map((link) =>
          h(
            "li",
            { key: link.href },
            h(
              "a",
              { href: link.href, class: link.external ? "external external-link" : "internal" },
              link.title,
            ),
          ),
        ),
      ),
    )
  }

  RelatedLinksComponent.css = `
.related-links {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--lightgray);
}

.related-links h3 {
  margin: 0 0 0.6rem;
  font-size: 1rem;
}

.related-links ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.related-links li {
  margin: 0;
}

.related-links a {
  display: inline-block;
  border: 1px solid var(--lightgray);
  border-radius: 4px;
  padding: 0.15rem 0.45rem;
  font-size: 0.9rem;
  line-height: 1.4;
}
`

  return RelatedLinksComponent
}

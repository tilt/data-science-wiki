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

export function RelatedLinksPlugin(opts = {}) {
  const field = opts.field ?? "related"

  return {
    name: "RelatedLinksPlugin",
    htmlPlugins() {
      return [
        () => (_tree, file) => {
          const links = relatedTargets(file.data.frontmatter, field)
          if (links.length === 0) return

          const existing = Array.isArray(file.data.frontmatterLinks)
            ? file.data.frontmatterLinks
            : []
          file.data.frontmatterLinks = [...new Set([...existing, ...links])]
        },
      ]
    },
  }
}

export default RelatedLinksPlugin

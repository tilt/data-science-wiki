import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { Explorer } from "./.quartz/plugins"

type ExplorerTrieNode = {
  slugSegment?: string
  displayName?: string
  isFolder: boolean
}

Explorer({
  sortFn: (a: ExplorerTrieNode, b: ExplorerTrieNode) => {
    const aMatch = (a.slugSegment ?? "").match(/^(\d+)-/)
    const bMatch = (b.slugSegment ?? "").match(/^(\d+)-/)
    const aSection = aMatch ? Number.parseInt(aMatch[1], 10) : undefined
    const bSection = bMatch ? Number.parseInt(bMatch[1], 10) : undefined
    if (aSection !== undefined || bSection !== undefined) {
      if (aSection === undefined) return 1
      if (bSection === undefined) return -1
      if (aSection !== bSection) return aSection - bSection
    }

    if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
      return (a.displayName ?? "").localeCompare(b.displayName ?? "", undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }

    return a.isFolder ? -1 : 1
  },
})

const inferredBaseUrl = process.env.QUARTZ_BASE_URL?.replace(/^https?:\/\//, "").replace(/\/$/, "")

const config = await loadQuartzConfig(inferredBaseUrl ? { baseUrl: inferredBaseUrl } : undefined)
export default config
export const layout = await loadQuartzLayout()

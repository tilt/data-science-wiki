import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"

const inferredBaseUrl = process.env.QUARTZ_BASE_URL?.replace(/^https?:\/\//, "").replace(/\/$/, "")

const config = await loadQuartzConfig(inferredBaseUrl ? { baseUrl: inferredBaseUrl } : undefined)
export default config
export const layout = await loadQuartzLayout()

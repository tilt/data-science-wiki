const afterDOMLoaded = `
const mermaidTargetSelector = "code.mermaid, pre:has(> code.mermaid), .mermaid svg, svg[id^='mermaid-']"
let mermaidStabilityScheduled = false
let lastForcedRenderKey = ""

function currentQuartzTheme() {
  const rootTheme = document.documentElement.getAttribute("saved-theme")
  if (rootTheme === "dark" || rootTheme === "light") return rootTheme
  if (document.body.classList.contains("dark")) return "dark"
  if (window.matchMedia?.("(prefers-color-scheme: dark)")?.matches) return "dark"
  return "light"
}

function hasMermaidTargets() {
  return Boolean(document.querySelector(mermaidTargetSelector))
}

function hasRenderedMermaidSvg() {
  return Boolean(document.querySelector(".mermaid svg, code.mermaid svg, svg[id^='mermaid-']"))
}

function waitForFonts() {
  return document.fonts?.ready?.catch?.(() => undefined) ?? Promise.resolve()
}

function forceThemeRender(reason) {
  if (reason === "themechange" || !hasMermaidTargets()) return
  if (!hasRenderedMermaidSvg()) return

  const theme = currentQuartzTheme()
  const renderKey = location.pathname + "|" + theme
  if (lastForcedRenderKey === renderKey) return
  lastForcedRenderKey = renderKey

  window.setTimeout(() => {
    document.dispatchEvent(new Event("themechange"))
  }, 0)
}

function markMermaidSvgs() {
  for (const svg of document.querySelectorAll(".mermaid svg, code.mermaid svg, svg[id^='mermaid-']")) {
    svg.dataset.mermaidStabilityTheme = currentQuartzTheme()
  }
}

function scheduleMermaidStability(reason) {
  if (mermaidStabilityScheduled) return
  mermaidStabilityScheduled = true

  requestAnimationFrame(() => {
    window.setTimeout(() => {
      waitForFonts().then(() => {
        mermaidStabilityScheduled = false
        forceThemeRender(reason)
        markMermaidSvgs()
      })
    }, 50)
  })
}

document.addEventListener("nav", () => scheduleMermaidStability("nav"))
document.addEventListener("render", () => scheduleMermaidStability("render"))
document.addEventListener("themechange", () => scheduleMermaidStability("themechange"))

new MutationObserver(() => scheduleMermaidStability("mutation")).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["saved-theme"],
})

const center = document.querySelector(".center") ?? document.body
new MutationObserver(() => scheduleMermaidStability("mutation")).observe(center, {
  childList: true,
  subtree: true,
})

scheduleMermaidStability("initial")
`

export default function MermaidStability() {
  const MermaidStabilityComponent = () => null

  MermaidStabilityComponent.css = `
pre:has(> code.mermaid),
pre:has(> code.mermaid) code.mermaid,
code.mermaid {
  overflow: visible;
}

pre:has(> code.mermaid) svg,
code.mermaid svg,
.mermaid svg,
svg[id^="mermaid-"] {
  overflow: visible;
}

code.mermaid svg text,
.mermaid svg text,
svg[id^="mermaid-"] text {
  font-family: var(--codeFont), Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  text-rendering: geometricPrecision;
  overflow-wrap: normal;
  text-wrap: nowrap;
  white-space: pre;
}
`

  MermaidStabilityComponent.afterDOMLoaded = afterDOMLoaded

  return MermaidStabilityComponent
}

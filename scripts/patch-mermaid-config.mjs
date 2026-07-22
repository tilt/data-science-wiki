import fs from "node:fs"
import path from "node:path"

const root = process.env.MERMAID_PATCH_ROOT
  ? path.resolve(process.env.MERMAID_PATCH_ROOT)
  : process.cwd()
const pluginRoot = path.join(root, ".quartz/plugins/obsidian-flavored-markdown")
const sourcePath = path.join(pluginRoot, "src/scripts/mermaid.inline.ts")
const distPath = path.join(pluginRoot, "dist/index.js")

const sourceEdgeLabelPatch = `function padMermaidEdgeLabels(nodes: NodeListOf<HTMLElement>) {
  const padX = 10;
  const padY = 4;
  for (const node of nodes) {
    const svg = node.querySelector("svg") as SVGSVGElement | null;
    if (!svg) continue;

    svg.style.overflow = "visible";
    svg.dataset.mermaidStabilityTheme =
      document.documentElement.getAttribute("saved-theme") ?? "";

    const labels = svg.querySelectorAll<SVGGElement>("g.edgeLabel, g.edgeLabels");
    for (const label of labels) {
      const backgrounds = label.querySelectorAll<SVGRectElement>(
        "rect, .background, .label-container, .labelBkg",
      );
      for (const background of backgrounds) {
        if (background.dataset.dswMermaidEdgeLabelPadded === "true") continue;

        const x = Number.parseFloat(background.getAttribute("x") ?? "0");
        const y = Number.parseFloat(background.getAttribute("y") ?? "0");
        const width = Number.parseFloat(background.getAttribute("width") ?? "0");
        const height = Number.parseFloat(background.getAttribute("height") ?? "0");
        if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
          continue;
        }

        background.setAttribute("x", String(x - padX));
        background.setAttribute("y", String(y - padY));
        background.setAttribute("width", String(width + padX * 2));
        background.setAttribute("height", String(height + padY * 2));
        background.setAttribute("rx", "5");
        background.setAttribute("ry", "5");
        background.style.fill = "var(--light)";
        background.dataset.dswMermaidEdgeLabelPadded = "true";
      }
    }
  }
}

`

const distEdgeLabelPatch =
  'function __dswPadMermaidEdgeLabels(e){let t=10,n=4;for(let o of e){let r=o.querySelector("svg");if(!r)continue;r.style.overflow="visible",r.dataset.mermaidStabilityTheme=document.documentElement.getAttribute("saved-theme")??"";for(let a of r.querySelectorAll("g.edgeLabel,g.edgeLabels"))for(let i of a.querySelectorAll("rect,.background,.label-container,.labelBkg")){if(i.dataset.dswMermaidEdgeLabelPadded==="true")continue;let d=Number.parseFloat(i.getAttribute("x")??"0"),u=Number.parseFloat(i.getAttribute("y")??"0"),l=Number.parseFloat(i.getAttribute("width")??"0"),h=Number.parseFloat(i.getAttribute("height")??"0");Number.isFinite(l)&&Number.isFinite(h)&&l>0&&h>0&&(i.setAttribute("x",String(d-t)),i.setAttribute("y",String(u-n)),i.setAttribute("width",String(l+t*2)),i.setAttribute("height",String(h+n*2)),i.setAttribute("rx","5"),i.setAttribute("ry","5"),i.style.fill="var(--light)",i.dataset.dswMermaidEdgeLabelPadded="true")}}}'

function warn(message) {
  console.warn(`WARN: ${message}`)
}

function patchSource() {
  if (!fs.existsSync(sourcePath)) {
    warn(`Mermaid source config not found at ${sourcePath}; skipping source patch.`)
    return false
  }

  const input = fs.readFileSync(sourcePath, "utf8")
  let output = input.replace(
    /(\n(\s*)securityLevel:\s*"loose",\n)(?:\s*htmlLabels:\s*false,\n)+/,
    (_match, anchor, indent) => `${anchor}${indent}htmlLabels: false,\n`,
  )
  if (!/\n\s*securityLevel:\s*"loose",\n\s*htmlLabels:\s*false,/.test(output)) {
    const sourceAnchor = /(\n\s*securityLevel:\s*"loose",\n)/
    output = output.replace(sourceAnchor, (match) => {
      const indent = match.match(/\n(\s*)securityLevel:/)?.[1] ?? "      "
      return `${match}${indent}htmlLabels: false,\n`
    })
  }

  if (!output.includes("function padMermaidEdgeLabels(")) {
    output = output.replace(
      "\nlet mermaidImport = undefined;",
      `\n${sourceEdgeLabelPatch}let mermaidImport = undefined;`,
    )
  }
  if (!output.includes("padMermaidEdgeLabels(nodes);")) {
    output = output.replace(
      "    await mermaid.run({ nodes });",
      "    await mermaid.run({ nodes });\n    padMermaidEdgeLabels(nodes);",
    )
  }

  if (output === input) return false
  if (
    !/\n\s*securityLevel:\s*"loose",\n\s*htmlLabels:\s*false,/.test(output) ||
    !output.includes("function padMermaidEdgeLabels(") ||
    !output.includes("padMermaidEdgeLabels(nodes);")
  ) {
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
  let output = input.replace(
    /(securityLevel:\\?"loose\\?",)(?:htmlLabels:!1,)+/g,
    "$1htmlLabels:!1,",
  )
  if (!/securityLevel:\\?"loose\\?",htmlLabels:!1,/.test(output)) {
    const distAnchor = /securityLevel:\\?"loose\\?",/
    output = output.replace(distAnchor, (match) => `${match}htmlLabels:!1,`)
  }
  if (!output.includes("function __dswPadMermaidEdgeLabels(")) {
    output = output.replace("async function M(){", `${distEdgeLabelPatch}async function M(){`)
  }
  if (!output.includes("await t.run({nodes:e}),__dswPadMermaidEdgeLabels(e)")) {
    output = output.replace(
      "await t.run({nodes:e})",
      "await t.run({nodes:e}),__dswPadMermaidEdgeLabels(e)",
    )
  }

  if (output === input) return false
  if (
    !/securityLevel:\\?"loose\\?",htmlLabels:!1,/.test(output) ||
    !output.includes("function __dswPadMermaidEdgeLabels(") ||
    !output.includes("await t.run({nodes:e}),__dswPadMermaidEdgeLabels(e)")
  ) {
    warn(`Could not find Mermaid bundled config anchor in ${distPath}; leaving bundle unchanged.`)
    return false
  }

  fs.writeFileSync(distPath, output)
  return true
}

const changed = [patchSource(), patchDist()].some(Boolean)
console.log(
  changed
    ? "Patched Mermaid config to disable HTML labels and pad edge labels globally."
    : "Mermaid config patch already applied.",
)

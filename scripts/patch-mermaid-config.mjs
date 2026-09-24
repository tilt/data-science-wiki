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

    for (const label of svg.querySelectorAll<SVGGElement>("g.edgeLabel")) {
      const text = label.querySelector<SVGTextElement>("text");
      const background = label.querySelector<SVGRectElement>("rect.background, rect");
      if (!text || !background || background.dataset.dswMermaidEdgeLabelPadded === "true") {
        continue;
      }

      const box = text.getBBox();
      if (!box.width || !box.height) continue;

      background.setAttribute("x", String(box.x - padX));
      background.setAttribute("y", String(box.y - padY));
      background.setAttribute("width", String(box.width + padX * 2));
      background.setAttribute("height", String(box.height + padY * 2));
      background.setAttribute("rx", "5");
      background.setAttribute("ry", "5");
      // Opaque so the connector line does not show through the label.
      background.style.fill = "var(--light)";
      background.style.opacity = "1";
      background.dataset.dswMermaidEdgeLabelPadded = "true";
    }
  }
}

`

const distEdgeLabelPatch =
  'function __dswPadMermaidEdgeLabels(e){let t=10,n=4;for(let o of e){let r=o.querySelector("svg");if(!r)continue;r.style.overflow="visible",r.dataset.mermaidStabilityTheme=document.documentElement.getAttribute("saved-theme")??"";for(let a of r.querySelectorAll("g.edgeLabel")){let x=a.querySelector("text"),i=a.querySelector("rect.background,rect");if(!x||!i||i.dataset.dswMermaidEdgeLabelPadded==="true")continue;let b=x.getBBox();b.width&&b.height&&(i.setAttribute("x",String(b.x-t)),i.setAttribute("y",String(b.y-n)),i.setAttribute("width",String(b.width+t*2)),i.setAttribute("height",String(b.height+n*2)),i.setAttribute("rx","5"),i.setAttribute("ry","5"),i.style.fill="var(--light)",i.style.opacity="1",i.dataset.dswMermaidEdgeLabelPadded="true")}}}'

function warn(message) {
  console.warn(`WARN: ${message}`)
}

// Top-level htmlLabels only switches nodes to SVG text; Mermaid 11 flowchart edge labels
// read flowchart.htmlLabels and otherwise stay HTML inside a clipped foreignObject.
const sourceLabelConfig =
  /\n\s*securityLevel:\s*"loose",\n\s*htmlLabels:\s*false,\n\s*flowchart:\s*\{\s*htmlLabels:\s*false\s*\},\n/
const distLabelConfig = /securityLevel:\\?"loose\\?",htmlLabels:!1,flowchart:\{htmlLabels:!1\},/

function replaceBetween(text, startMarker, endMarker, replacement) {
  const start = text.indexOf(startMarker)
  if (start === -1) return text
  const end = text.indexOf(endMarker, start)
  if (end === -1) return text
  return text.slice(0, start) + replacement + text.slice(end)
}

function patchSource() {
  if (!fs.existsSync(sourcePath)) {
    warn(`Mermaid source config not found at ${sourcePath}; skipping source patch.`)
    return false
  }

  const input = fs.readFileSync(sourcePath, "utf8")
  let output = input.replace(
    /(\n(\s*)securityLevel:\s*"loose",\n)(?:\s*(?:htmlLabels:\s*false|flowchart:\s*\{\s*htmlLabels:\s*false\s*\}),\n)*/,
    (_match, anchor, indent) =>
      `${anchor}${indent}htmlLabels: false,\n${indent}flowchart: { htmlLabels: false },\n`,
  )

  // Replace any previously inserted version so an already-patched cache picks up changes.
  if (output.includes("function padMermaidEdgeLabels(")) {
    output = replaceBetween(
      output,
      "function padMermaidEdgeLabels(",
      "let mermaidImport = undefined;",
      sourceEdgeLabelPatch,
    )
  } else {
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
    !sourceLabelConfig.test(output) ||
    !output.includes(sourceEdgeLabelPatch) ||
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
    /(securityLevel:\\?"loose\\?",)(?:htmlLabels:!1,|flowchart:\{htmlLabels:!1\},)*/,
    "$1htmlLabels:!1,flowchart:{htmlLabels:!1},",
  )

  if (output.includes("function __dswPadMermaidEdgeLabels(")) {
    output = replaceBetween(
      output,
      "function __dswPadMermaidEdgeLabels(",
      "async function M(){",
      distEdgeLabelPatch,
    )
  } else {
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
    !distLabelConfig.test(output) ||
    !output.includes(distEdgeLabelPatch) ||
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
    ? "Patched Mermaid config to use SVG node and edge labels and pad edge labels globally."
    : "Mermaid config patch already applied.",
)

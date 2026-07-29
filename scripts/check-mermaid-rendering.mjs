import { execFile } from "node:child_process"
import fs from "node:fs/promises"
import http from "node:http"
import os from "node:os"
import path from "node:path"
import process from "node:process"
import { promisify } from "node:util"
import handler from "serve-handler"

const execFileAsync = promisify(execFile)
const root = process.cwd()

async function loadPlaywright() {
  try {
    return await import("@playwright/test")
  } catch {
    console.error("Missing @playwright/test. Run `npm install` to install locked dev dependencies.")
    process.exit(1)
  }
}

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once("error", reject)
    server.listen(0, "127.0.0.1", () => {
      server.off("error", reject)
      resolve(server.address())
    })
  })
}

async function buildFixture(contentDir, outputDir) {
  await fs.mkdir(contentDir, { recursive: true })
  await fs.writeFile(
    path.join(contentDir, "index.md"),
    `---
title: Mermaid Stability Fixture
slug: index
description: Browser fixture for Mermaid dark-mode and label sizing.
area: test
topics:
  - mermaid
level: foundational
status: draft
page_type: concept
aliases: []
prerequisites: []
related: []
historical_context: false
---
# Mermaid Stability Fixture

\`\`\`mermaid
flowchart TD
  A["Wide WebKit label with mixed characters WWWWWW iiiiii metrics check"] --> D{"Model decision"}
  D --> B["Second node label that should stay inside the rendered rectangle"]
  D --> C["Dark mode node checks theme variables after navigation render settles"]
\`\`\`

\`\`\`mermaid
flowchart LR
  Goal[User goal] --> Builder[Policy and context builder]
  Builder -->|bootstrap sample| Sample[Bootstrap sample]
  Sample -->|feature subset per split| Decision[Model decision]
  Decision -->|validation route| Validator[Validator]
  Validator -->|runtime call| Runtime[Tool or runtime]
  Runtime -->|observation log| Log[Observation log]
  Log -->|retry decision| Decision
\`\`\`
`,
    "utf8",
  )

  await execFileAsync(
    "npm",
    ["run", "quartz", "--", "build", "--directory", contentDir, "--output", outputDir],
    {
      cwd: root,
      maxBuffer: 1024 * 1024 * 20,
    },
  )
}

async function checkBrowser(name, browserType, url) {
  const browser = await browserType.launch()
  try {
    const page = await browser.newPage()
    await page.addInitScript(() => {
      localStorage.setItem("theme", "dark")
    })
    await page.goto(url, { waitUntil: "networkidle" })
    await page.waitForSelector(".mermaid svg, code.mermaid svg, svg[id^='mermaid-']", {
      timeout: 15000,
    })
    await page.waitForTimeout(700)

    const result = await page.evaluate(() => {
      const svgSelector = ".mermaid svg, code.mermaid svg, svg[id^='mermaid-']"
      const svgs = [...document.querySelectorAll(svgSelector)]

      function unionRect(elements) {
        let union = null
        for (const element of elements) {
          const rect = element.getBoundingClientRect()
          if (!rect.width || !rect.height) continue
          if (!union) {
            union = {
              left: rect.left,
              right: rect.right,
              top: rect.top,
              bottom: rect.bottom,
            }
          } else {
            union.left = Math.min(union.left, rect.left)
            union.right = Math.max(union.right, rect.right)
            union.top = Math.min(union.top, rect.top)
            union.bottom = Math.max(union.bottom, rect.bottom)
          }
        }
        return union
      }

      function shapeForNode(node) {
        for (const child of node.children) {
          if (
            ["rect", "polygon", "path", "circle", "ellipse"].includes(child.tagName?.toLowerCase())
          ) {
            return child
          }
        }
        return node.querySelector("rect, polygon, path, circle, ellipse")
      }

      function labelContentForNode(node) {
        return (
          node.querySelector("foreignObject p") ??
          node.querySelector("foreignObject span") ??
          node.querySelector("foreignObject div") ??
          node.querySelector("foreignObject") ??
          null
        )
      }

      const violations = []
      const centerViolations = []
      const edgeLabelViolations = []
      for (const [svgIndex, svg] of svgs.entries()) {
        for (const [nodeIndex, node] of [...svg.querySelectorAll("g.node")].entries()) {
          const shape = shapeForNode(node)
          const texts = [...node.querySelectorAll("text")]
          const htmlLabel = labelContentForNode(node)
          if (!shape || (texts.length === 0 && !htmlLabel)) continue

          const shapeBox = shape.getBoundingClientRect()
          const textBox = htmlLabel?.getBoundingClientRect() ?? unionRect(texts)
          if (!textBox || !textBox.width || !textBox.height) continue

          const tolerance = 1
          if (
            textBox.left < shapeBox.left - tolerance ||
            textBox.right > shapeBox.right + tolerance ||
            textBox.top < shapeBox.top - tolerance ||
            textBox.bottom > shapeBox.bottom + tolerance
          ) {
            violations.push({
              svgIndex,
              nodeIndex,
              shape: {
                width: shapeBox.width,
                height: shapeBox.height,
              },
              text: {
                width: textBox.right - textBox.left,
                height: textBox.bottom - textBox.top,
              },
            })
          }

          const shapeCenterX = shapeBox.left + shapeBox.width / 2
          const shapeCenterY = shapeBox.top + shapeBox.height / 2
          const textCenterX = textBox.left + (textBox.right - textBox.left) / 2
          const textCenterY = textBox.top + (textBox.bottom - textBox.top) / 2
          if (
            Math.abs(shapeCenterX - textCenterX) > 2 ||
            Math.abs(shapeCenterY - textCenterY) > 2
          ) {
            centerViolations.push({
              svgIndex,
              nodeIndex,
              deltaX: shapeCenterX - textCenterX,
              deltaY: shapeCenterY - textCenterY,
            })
          }
        }

        for (const [labelIndex, label] of [
          ...svg.querySelectorAll("g.edgeLabel, g.edgeLabels"),
        ].entries()) {
          const background = label.querySelector("rect, .background, .label-container, .labelBkg")
          const textBox = unionRect([...label.querySelectorAll("text")])
          if (!background || !textBox || !textBox.width || !textBox.height) continue

          const backgroundBox = background.getBoundingClientRect()
          if (!backgroundBox.width || !backgroundBox.height) continue

          const minXPad = 4
          const minYPad = 2
          if (
            backgroundBox.left > textBox.left - minXPad ||
            backgroundBox.right < textBox.right + minXPad ||
            backgroundBox.top > textBox.top - minYPad ||
            backgroundBox.bottom < textBox.bottom + minYPad
          ) {
            edgeLabelViolations.push({
              svgIndex,
              labelIndex,
              background: {
                width: backgroundBox.width,
                height: backgroundBox.height,
              },
              text: {
                width: textBox.right - textBox.left,
                height: textBox.bottom - textBox.top,
              },
              padding: {
                left: textBox.left - backgroundBox.left,
                right: backgroundBox.right - textBox.right,
                top: textBox.top - backgroundBox.top,
                bottom: backgroundBox.bottom - textBox.bottom,
              },
            })
          }
        }
      }

      return {
        htmlTheme: document.documentElement.getAttribute("saved-theme"),
        foreignObjectCount: document.querySelectorAll("g.node foreignObject").length,
        svgCount: svgs.length,
        svgThemes: svgs.map((svg) => svg.dataset.mermaidStabilityTheme ?? null),
        nodeFills: [...document.querySelectorAll("g.node rect, g.node polygon")]
          .map((shape) => getComputedStyle(shape).fill)
          .filter(Boolean),
        violations,
        centerViolations,
        edgeLabelViolations,
      }
    })

    if (result.htmlTheme !== "dark") {
      throw new Error(`${name}: expected dark HTML theme, got ${result.htmlTheme}`)
    }
    if (result.svgCount === 0) {
      throw new Error(`${name}: Mermaid SVG was not rendered`)
    }
    if (result.foreignObjectCount !== 0) {
      throw new Error(
        `${name}: expected SVG text labels, got ${result.foreignObjectCount} HTML labels`,
      )
    }
    if (!result.svgThemes.every((theme) => theme === "dark")) {
      throw new Error(`${name}: Mermaid stabilization did not mark every SVG as dark`)
    }
    if (result.nodeFills.some((fill) => fill === "rgb(255, 255, 255)" || fill === "white")) {
      throw new Error(`${name}: Mermaid node fill is light in dark mode: ${result.nodeFills}`)
    }
    if (result.violations.length > 0) {
      throw new Error(`${name}: Mermaid label clipping risk: ${JSON.stringify(result.violations)}`)
    }
    if (result.centerViolations.length > 0) {
      throw new Error(
        `${name}: Mermaid label centering risk: ${JSON.stringify(result.centerViolations)}`,
      )
    }
    if (result.edgeLabelViolations.length > 0) {
      throw new Error(
        `${name}: Mermaid edge label padding risk: ${JSON.stringify(result.edgeLabelViolations)}`,
      )
    }

    console.log(`${name}: Mermaid dark mode and label sizing passed`)
  } finally {
    await browser.close()
  }
}

const { firefox, webkit } = await loadPlaywright()
const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "dsw-mermaid-"))
const contentDir = path.join(tempRoot, "content")
const outputDir = path.join(tempRoot, "public")

try {
  await buildFixture(contentDir, outputDir)

  const server = http.createServer((request, response) =>
    handler(request, response, {
      public: outputDir,
      cleanUrls: true,
      directoryListing: false,
    }),
  )
  const address = await listen(server)
  const url = `http://127.0.0.1:${address.port}`

  try {
    await checkBrowser("webkit", webkit, url)
    await checkBrowser("firefox", firefox, url)
  } finally {
    await new Promise((resolve) => server.close(resolve))
  }
} finally {
  await fs.rm(tempRoot, { recursive: true, force: true })
}

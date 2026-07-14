# Mermaid Rendering

Quartz renders Mermaid diagrams through the `obsidian-flavored-markdown` plugin. This repository adds a small compatibility patch and a local stability plugin to make Mermaid output more reliable across browsers, especially Safari.

## Why the patch exists

The upstream Mermaid client config emitted by `obsidian-flavored-markdown` uses SVG labels that can depend on HTML-in-SVG layout behavior. Safari can measure those labels inconsistently, which leads to clipped or unstable diagram text.

This repository forces Mermaid to use plain SVG text labels:

```js
htmlLabels: false
```

The patch is intentionally narrow. It does not change wiki Markdown syntax; authors should continue using fenced `mermaid` blocks.

## Patch mechanism

The script [scripts/patch-mermaid-config.mjs](../scripts/patch-mermaid-config.mjs) patches the installed plugin cache under `.quartz/plugins/obsidian-flavored-markdown`:

- `src/scripts/mermaid.inline.ts`
- `dist/index.js`

It inserts `htmlLabels: false` immediately after Mermaid's `securityLevel: "loose"` config and normalizes duplicate insertions. The script is idempotent and prints either:

- `Patched Mermaid config to disable HTML labels globally.`
- `Mermaid config patch already applied.`

## When it runs

The patch is part of normal setup, preview, and build paths:

- `npm run install-plugins`
- `npm run patch-plugins`
- `make install`
- `make build`
- `make preview-watch`
- GitHub Pages and GitLab Pages deployment workflows

The deployment workflows install Quartz plugins first, then run the patch before building the site.

## Local stability plugin

The repository also includes `plugins/mermaid-stability`, enabled in [quartz.config.yaml](../quartz.config.yaml). It adds a no-UI Quartz component that:

- keeps Mermaid SVG overflow visible
- applies stable monospace text styling to Mermaid SVG text
- waits for fonts after navigation/render events
- triggers one post-render Mermaid theme refresh when needed
- marks Mermaid SVGs with the current Quartz theme

This plugin complements the config patch. The patch changes Mermaid initialization; the stability plugin handles rendering and SPA navigation behavior after diagrams are on the page.

## Maintenance guidance

Keep the patch until `obsidian-flavored-markdown` exposes a supported Mermaid config option or upstream defaults make `htmlLabels: false` unnecessary.

When updating Quartz or `obsidian-flavored-markdown`:

1. Run `npm ci`.
2. Run `npx quartz plugin install`.
3. Run `npm run patch-plugins`.
4. Confirm the output says the patch was applied or already present.
5. Run `npm run quartz -- build`.
6. If Mermaid behavior changed, run `npm run test:mermaid`.

If the patch script warns that it cannot find the Mermaid config anchor, inspect the installed plugin's Mermaid inline script and update the patch script deliberately. Do not silently remove the patch unless Mermaid diagrams have been checked in Safari and the generated bundle no longer needs `htmlLabels: false`.

## Verification

For a quick local check:

```sh
npm run patch-plugins
npm run quartz -- build
```

For the browser-rendering harness:

```sh
npm run test:mermaid
```

The browser test may require Playwright browser binaries in a fresh environment.

# Visual Content

Use visual assets only when they clarify a concept, workflow, architecture, or result. Keep source files alongside generated media when practical.

## Mermaid

Use fenced `mermaid` blocks for taxonomies, pipelines, sequence diagrams, and architecture sketches.

Quartz Mermaid rendering is patched for browser stability. Authors do not need special syntax, but maintainers should read [Mermaid Rendering](MERMAID_RENDERING.md) before changing Mermaid-related Quartz plugins.

## Images

Store SVG diagrams in `content/assets/diagrams/` and raster images in `content/assets/images/`. Always write useful alt text.

## Animations

Use small WebM or MP4 files when animation is necessary. Keep an accessible poster or fallback image.

Recommended convention:

```
content/assets/animations/topic-name/
  source.py
  output.webm
  poster.svg
  README.md
```

Generated media is not rebuilt during normal Quartz builds. Tools such as Matplotlib, Manim, Plotly, and Vega-Lite can be used to create media, but canonical Markdown should remain portable to MkDocs.

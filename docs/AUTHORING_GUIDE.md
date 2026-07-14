# Authoring Guide

## Workflow

1. Run `make doctor`.
2. Run `make preview`.
3. Open `content/` in Obsidian.
4. Create or edit a page.
5. Check local browser rendering.
6. Run `make validate`.
7. Commit and push.
8. Let GitHub Actions deploy.

## Markdown policy

Use standard Markdown links, YAML front matter, fenced Mermaid, standard math delimiters, and portable media paths. Avoid Obsidian transclusions, block references, MDX, JSX, and Quartz-specific content components.

For admonition-like content, use portable Markdown:

> Note: Keep the note readable without depending on a special callout renderer.

## Expanding topic coverage

When adding many taxonomy entries:

```sh
make generate-subtopics
make improve-generated-content
make validate
```

Generated pages are drafts. Treat them as concise first explanations, then hand-edit high-priority pages with formulas, examples, references, and production notes.

## Forecasting content

Forecasting material belongs under `content/05-time-series-and-forecasting/`. Add new forecasting methods as focused concept, model, algorithm, or system-design pages and link them from the area index. Cross-link related machine learning, evaluation, deep learning, and MLOps pages with standard Markdown links.

Before adding project-derived forecasting notes, generalize identifiers, package names, class names, client names, repository paths, and operational details. Keep reusable concepts, assumptions, formulas, evaluation protocols, and engineering patterns.

## Integrating project knowledge

The rule above applies to any project-derived content, not only forecasting. To turn findings from a pitch, workshop, or engagement into generic wiki knowledge — sanitize, generalize, place in the owning numbered section, reuse existing page types, cross-link instead of duplicating — follow [Integrating Project Knowledge](integrating-project-knowledge.md). The RAG architecture pages under `content/11-generative-ai/` are the worked example.

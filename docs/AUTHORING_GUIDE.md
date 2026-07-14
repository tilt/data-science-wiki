# Authoring Guide

Use this guide for routine edits to pages under `content/`. For prose quality rules, see [Authoring Style](AUTHORING_STYLE.md). For required metadata, see [Content Model](CONTENT_MODEL.md).

## Workflow

1. Run `make doctor`.
2. Run `make preview-watch`.
3. Open `content/` in Obsidian.
4. Create or edit a page.
5. Check local browser rendering.
6. Run `make validate`.
7. Commit and push.
8. Let GitHub Actions or GitLab CI deploy from the default branch.

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

## Placement rules

- Put new pages in the owning numbered section.
- Cross-link instead of duplicating existing concepts.
- Keep public URLs and paths generic; do not include private project names or internal identifiers.
- Use `references` front matter only for keys present in `references/bibliography.yml`.

To turn findings from a pitch, workshop, or engagement into generic wiki knowledge, follow [Integrating Project Knowledge](integrating-project-knowledge.md).

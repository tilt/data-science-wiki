# MkDocs Material Migration

## Already compatible

Canonical content uses Markdown, YAML front matter, relative links, standard math delimiters, fenced Mermaid blocks, and source-controlled assets.

## Quartz configuration with no direct MkDocs equivalent

Quartz graph view, backlinks, popover previews, SPA routing, plugin layouts, and alias redirects require MkDocs plugins or custom theme work.

## Export procedure

```sh
make portability-check
make export-mkdocs
cd .generated/mkdocs
mkdocs serve
```

The export is generated and must not be edited as a second source tree.

## Migration mapping

- Math: enable pymdownx.arithmatex or equivalent.
- Mermaid: enable pymdownx.superfences with Mermaid support or a Mermaid plugin.
- Tags and aliases: preserve YAML fields and generate plugin configuration later.
- Assets: copy `content/assets/` unchanged.
- Navigation: derive from directory indexes and front matter.

## Manual work estimate

Expect one to three days to tune theme navigation, graph/backlink replacements, search behavior, and any citation plugin decisions. Content migration should be low effort if `make portability-check` passes.

# Content Model

Every canonical page under `content/` uses YAML front matter.

## Required fields

- `title`: human-readable page title.
- `slug`: portable stable route identifier.
- `description`: one-sentence page description.
- `area`: top-level area slug.
- `topics`: topic slugs.
- `level`: `foundational`, `intermediate`, or `advanced`.
- `status`: `stub`, `draft`, `review`, or `complete`.
- `page_type`: controlled page type.
- `aliases`: alternate search names.
- `prerequisites`: prerequisite slugs or links.
- `related`: related slugs or links.
- `historical_context`: boolean.

Use `last_reviewed` only when a page has been substantively reviewed or created on that date.

## Optional fields

- `references`: bibliography keys from `references/bibliography.yml`.
- `last_reviewed`: date used only when a page has been substantively reviewed or created.

When `references` is present, `make validate` verifies that every key exists in the centralized bibliography. Keep human-readable source notes in a page-level `## References` section as well; the front-matter keys are for validation and future export.

## Page types

`area-index`, `topic-index`, `concept`, `algorithm`, `model`, `implementation`, `system-design`, `comparison`, `history`, `interview-question`, `reference`.

## Status values

- `stub`: placeholder or very thin page.
- `draft`: useful seed explanation that still needs review or depth.
- `review`: substantively checked and suitable for normal browsing.
- `complete`: high-confidence page that should change only intentionally.

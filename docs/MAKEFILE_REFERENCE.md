# Makefile Reference

Run `make help` for the current target list.

Important targets:

- `make doctor`: non-mutating environment checks.
- `make setup`: install dependencies.
- `make preview`: serve the existing `public/` build locally; builds once first only if `public/` is missing.
- `make preview-watch`: serve Quartz locally with watching and rebuilds.
- `make build`: build `public/`.
- `make validate`: run content, link, and portability checks.
- `make check-content`: validate page metadata, top-level reachability, orphan warnings, repository hygiene, and bibliography keys.
- `make ci`: run validation, lint, tests, and build.
- `make deploy-info`: print inferred GitHub Pages URL information.
- `make generate-subtopics`: create concise pages for missing subtopics and link area index subtopic lists.
- `make improve-generated-content`: rewrite generated topic pages with concise topic-specific explanations and examples.

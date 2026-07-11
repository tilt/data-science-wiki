# Architecture

The repository keeps source, content, validation, and deployment in one Git repository.

## Components

- Obsidian edits `content/` directly.
- Quartz reads the same Markdown files and writes static output to `public/`.
- GitHub Actions runs `make ci`.
- GitHub Pages deploys only the generated `public/` artifact.
- Validation scripts enforce metadata, internal links, portability, assets, and repository hygiene.

## Version choices

Current official Quartz documentation identifies Quartz 5 and shows Quartz v5.0.0. The included application source was taken from the official `jackyzha0/quartz` v5 branch and package metadata records `version: 5.0.0`.

Runtime versions are recorded in `.nvmrc`, `.node-version`, and `site.config.json`.

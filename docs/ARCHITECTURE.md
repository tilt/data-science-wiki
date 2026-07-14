# Architecture

The repository keeps source, content, validation, and deployment in one Git tree. The canonical source of truth is Markdown under `content/`.

## Build flow

```text
Obsidian / editor
      |
      v
content/*.md -> validation scripts -> Quartz -> public/ -> Pages host
```

## Components

| Component                                    | Responsibility                                                             |
| -------------------------------------------- | -------------------------------------------------------------------------- |
| `content/`                                   | Canonical Markdown wiki and Obsidian vault.                                |
| `quartz/`, `quartz.config.yaml`, `quartz.ts` | Quartz application source, plugin configuration, and TypeScript overrides. |
| `plugins/`                                   | Local custom Quartz plugins.                                               |
| `scripts/`                                   | Validation, portability, authoring, and preview helpers.                   |
| `.github/workflows/`                         | GitHub Actions validation and GitHub Pages deployment.                     |
| `.gitlab-ci.yml`                             | GitLab CI validation and GitLab Pages deployment.                          |
| `public/`                                    | Generated static site output. This is build output, not source.            |

Validation scripts enforce required metadata, internal links, portability rules, bibliography keys, asset paths, and repository hygiene before deployment.

## Version choices

The included application source is Quartz 5, and `package.json` records `version: 5.0.0`.

Runtime versions are recorded in `.nvmrc`, `.node-version`, and `site.config.json`.

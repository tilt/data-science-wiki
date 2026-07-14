# Data Science, Machine Learning & AI Wiki

A production-oriented Markdown wiki for data science, machine learning, and AI. The repository is designed to be useful in three modes:

- Publish a static website with Quartz 5 and GitHub or GitLab Pages.
- Author locally in Obsidian using `content/` as the vault.
- Browse the source Markdown directly in GitHub or a local editor.

The canonical wiki entry point is [content/index.md](content/index.md). From there, the main sections, learning paths, interview-preparation pages, and reference material can all be browsed as plain Markdown.

Published site:

- GitLab Pages: <https://data-science-wiki-5e0a3b.gitlab.io/>

## What Is Included

- A numbered top-level taxonomy under [content/](content/) for stable Obsidian and Quartz ordering.
- Portable Markdown pages with YAML front matter, relative links, math, Mermaid diagrams, and source-controlled assets.
- Quartz 5 configuration, custom plugin setup, local preview, and GitHub/GitLab Pages deployment.
- Validation scripts for front matter, links, portability, references, and generated assets.
- Documentation for authoring, architecture, local setup, deployment, maintenance, and troubleshooting.

## Repository Layout

| Path                                     | Purpose                                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------------------ |
| [content/](content/)                     | Canonical wiki content and Obsidian vault.                                                 |
| [content/index.md](content/index.md)     | Markdown entry point for browsing from the repository.                                     |
| [quartz/](quartz/)                       | Vendored Quartz application source.                                                        |
| [quartz.config.yaml](quartz.config.yaml) | Main Quartz plugin and layout configuration.                                               |
| [quartz.ts](quartz.ts)                   | TypeScript Quartz overrides, including Explorer sorting.                                   |
| [plugins/](plugins/)                     | Local custom Quartz plugins.                                                               |
| [scripts/](scripts/)                     | Validation, authoring, portability, preview, and export helpers.                           |
| [docs/](docs/)                           | Operational documentation for setup, authoring, architecture, deployment, and maintenance. |
| [.github/workflows/](.github/workflows/) | CI and GitHub Pages publishing workflows.                                                  |
| [.gitlab-ci.yml](.gitlab-ci.yml)         | GitLab CI and GitLab Pages publishing workflow.                                            |
| [Makefile](Makefile)                     | Primary local interface for setup, validation, build, and preview.                         |

## Architecture

The source of truth is the Markdown tree under `content/`.

```text
Obsidian / editor
      |
      v
content/*.md  -> validation scripts -> Quartz build -> public/ -> GitHub/GitLab Pages
```

The same Markdown files are used for local authoring, repository browsing, static-site generation, and portability checks. Quartz emits static HTML into `public/`; GitHub Actions or GitLab CI can build that artifact and deploy it through Pages. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for more detail.

## Prerequisites

- Node.js 22.13.0 or compatible Node 22+
- npm 10.9.2+
- Git
- GNU Make

Run the environment check before installing dependencies:

```sh
make doctor
```

## Quick Start

```sh
make setup
make validate
make build
make preview
```

The default preview URL is `http://localhost:8080`. If that port is busy:

```sh
PORT=8090 make preview
```

Use `make preview-watch` while editing if you want Quartz to rebuild on file changes. See [docs/LOCAL_SETUP.md](docs/LOCAL_SETUP.md) and [docs/OBSIDIAN_SETUP.md](docs/OBSIDIAN_SETUP.md) for local setup details.

## Authoring Workflow

1. Open Obsidian and choose `content/` as the vault, or edit Markdown files directly.
2. Add or update pages using standard Markdown links and the front-matter model in [docs/CONTENT_MODEL.md](docs/CONTENT_MODEL.md).
3. Preview locally with `make preview-watch`.
4. Run `make validate`.
5. Commit and push to trigger CI and deployment.

Keep content portable: avoid Obsidian-only embeds, MDX/JSX, Quartz-only content components, and local absolute paths. See [docs/AUTHORING_GUIDE.md](docs/AUTHORING_GUIDE.md).

## Validation And CI

For normal content changes:

```sh
make validate
```

For a production-style local check:

```sh
make ci
```

Important checks include:

- `make check-content`: validates required metadata, areas, slugs, references, and hygiene.
- `make check-links`: verifies internal Markdown links and asset paths.
- `make portability-check`: catches non-portable Markdown constructs.
- `make build`: generates the Quartz site into `public/`.

The GitHub Actions and GitLab CI workflows run the production checks on pushed changes.

## Deployment

The repository is ready for both GitHub Pages and GitLab Pages deployment.

For GitHub Pages:

1. Push the repository to GitHub.
2. In GitHub, set Pages source to **GitHub Actions**.
3. Push to `main`.

The Pages workflow builds Quartz, writes `public/`, and uploads the generated static site. For first-time repository setup, base URL handling, and custom domains, see [docs/GITHUB_PAGES_DEPLOYMENT.md](docs/GITHUB_PAGES_DEPLOYMENT.md).

For GitLab Pages:

1. Push the repository to GitLab.
2. Make sure CI/CD is enabled.
3. Make the project and Pages access public if the site should be reachable without signing in.
4. Push to the default branch.

The GitLab pipeline validates the wiki, builds Quartz, and publishes `public/` through GitLab Pages. For first-time project setup, base URL handling, and custom domains, see [docs/GITLAB_PAGES_DEPLOYMENT.md](docs/GITLAB_PAGES_DEPLOYMENT.md).

## Useful Commands

```sh
make help              # list available targets
make doctor            # check local environment
make setup             # install dependencies and Quartz plugins
make preview           # serve the current built site
make preview-watch     # rebuild and serve while editing
make validate          # run content, link, and portability checks
make ci                # run validation, lint/test/build sequence
make build             # generate public/
```

See [docs/MAKEFILE_REFERENCE.md](docs/MAKEFILE_REFERENCE.md) for the full command reference.

## Documentation

- [Documentation Index](docs/README.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Local Setup](docs/LOCAL_SETUP.md)
- [Obsidian Setup](docs/OBSIDIAN_SETUP.md)
- [Authoring Guide](docs/AUTHORING_GUIDE.md)
- [Content Model](docs/CONTENT_MODEL.md)
- [GitHub Pages Deployment](docs/GITHUB_PAGES_DEPLOYMENT.md)
- [GitLab Pages Deployment](docs/GITLAB_PAGES_DEPLOYMENT.md)
- [Maintenance](docs/MAINTENANCE.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)

## Content Status

The wiki has a complete high-level taxonomy, section indexes, validation tooling, Quartz configuration, Obsidian settings, and deployment workflows. Many pages are intentionally marked `draft`: they are useful seed explanations, not final textbook chapters. Page maturity is tracked in front matter with `status`.

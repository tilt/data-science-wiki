# Data Science, Machine Learning & AI Wiki

This repository is a production-oriented personal wiki for data science, machine learning, and artificial intelligence. It uses Obsidian for local authoring, Quartz 5 for static site generation, GitHub Actions for CI, and GitHub Pages for hosting.

## Architecture

- `content/`: canonical Markdown wiki and Obsidian vault.
- `quartz/`, `quartz.config.yaml`, `quartz.ts`: Quartz application and configuration.
- `scripts/`: validation, export, and authoring helpers.
- `docs/`: platform, authoring, deployment, and maintenance documentation.
- `.github/workflows/`: CI and GitHub Pages deployment.
- `Makefile`: primary local interface.

## Prerequisites

- Node.js 22.13.0 or compatible Node 22+
- npm 10.9.2+
- Git
- GNU Make

## Five-minute setup

```sh
make doctor
make setup
make validate
make build
```

## Open in Obsidian

Open Obsidian, choose "Open folder as vault", and select this repository's `content/` directory.

## Local preview

```sh
make preview
```

The default URL is `http://localhost:8080`. Use `PORT=8090 make preview` to choose another port. `make preview` serves the existing `public/` build when present; use `make preview-watch` when you want Quartz to rebuild on file changes.

## Validation

```sh
make ci
```

## Deployment

Create an empty GitHub repository, push this repository, set Pages source to "GitHub Actions", and use the included deployment workflow. See [GitHub Pages Deployment](docs/GITHUB_PAGES_DEPLOYMENT.md).

## Status

The first version includes the full high-level taxonomy, index pages, detailed seed interview answers, validation scripts, Quartz 5 configuration, Obsidian settings, and deployment workflows. Many topic pages are intentionally marked `draft` because they are seed overviews rather than complete textbook chapters.

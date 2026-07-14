# GitHub Pages Deployment

This document covers GitHub Pages. For GitLab Pages, see [GitLab Pages Deployment](GITLAB_PAGES_DEPLOYMENT.md).

This repository can deploy the Quartz site to GitHub Pages with `.github/workflows/pages.yml`.

## First deployment from an empty GitHub repository

1. Create a new empty repository on GitHub. Do not initialize it with a README, license, or gitignore.
2. In this local repository, initialize Git if needed:

```sh
git init
git add .
git commit -m "Initial wiki"
git branch -M main
git remote add origin REMOTE-URL
git push -u origin main
```

3. In GitHub, go to Settings -> Pages.
4. Set Source to "GitHub Actions".
5. In Settings -> Actions -> General, allow GitHub Actions and set workflow permissions to read repository contents and write Pages only through the workflow permissions.
6. Push to `main`. The deploy workflow builds Quartz and uploads `public/` using official Pages actions.

After the workflow completes, open the deployment URL from the GitHub Actions run summary or from Settings -> Pages.

## Workflow shape

The GitHub Pages workflow has two jobs:

- `build`: checks out the full Git history, installs Node and dependencies, installs Quartz plugins, runs `make validate`, builds Quartz, and uploads `public/` as a Pages artifact.
- `deploy`: deploys the uploaded artifact to GitHub Pages with the official `actions/deploy-pages` action.

The Pages deployment runs on pushes to `main` and can also be started manually:

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
```

The workflow declares the minimum permissions needed for GitHub Pages:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

## Base URL

For project pages, the workflow sets:

```sh
QUARTZ_BASE_URL=$OWNER.github.io/$REPOSITORY
```

For a user or organization site at `https://owner.github.io/`, set `QUARTZ_BASE_URL=owner.github.io`.

The value must not include `https://` and should not end with a trailing slash. The Quartz entry point strips protocols and trailing slashes defensively, but keeping the workflow value normalized makes deployment behavior explicit.

## Custom domain

Configure the custom domain in GitHub under Settings -> Pages. If the site moves to a custom domain, update the workflow's `QUARTZ_BASE_URL` to the custom domain without protocol:

```yaml
env:
  QUARTZ_BASE_URL: wiki.example.com
```

If you enable the Quartz CNAME plugin later, keep the configured CNAME aligned with the GitHub Pages custom domain.

## GitHub references

- GitHub Pages overview: <https://docs.github.com/en/pages>
- GitHub Pages with custom workflows: <https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages>
- `actions/configure-pages`: <https://github.com/actions/configure-pages>
- `actions/upload-pages-artifact`: <https://github.com/actions/upload-pages-artifact>
- `actions/deploy-pages`: <https://github.com/actions/deploy-pages>

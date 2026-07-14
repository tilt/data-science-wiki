# Troubleshooting

## Node is too old

Install Node 22 and rerun `make doctor`.

## Port is already in use

```sh
PORT=8090 make preview
```

## GitHub Pages 404

Check that Pages source is set to GitHub Actions and that `QUARTZ_BASE_URL` matches `owner.github.io/repository` for project pages.

## GitLab Pages 404

Check the `deploy-pages` job logs, then open Deploy -> Pages in GitLab to confirm the active URL. The GitLab job derives `QUARTZ_BASE_URL` from `CI_PAGES_URL`; custom domains should be configured in GitLab Pages first.

## Plugin install fails

Run `npm ci`, then `npx quartz plugin install`. If the lock file is outdated, read Quartz maintenance docs before using `--latest`.

## Quartz build fails after plugin changes

Run:

```sh
npm run patch-plugins
npm run quartz -- build
```

The deployment workflows use this sequence after plugin installation.

## Build shows an esbuild direct-eval warning

Run `npm run patch-plugins` and rebuild. The note-properties patch rewrites a bundled `gray-matter` direct eval so esbuild does not warn during the Quartz build.

## Mermaid diagrams are clipped or unstable

Run `npm run patch-plugins` and confirm it reports that the Mermaid config patch is applied or already present. Then rebuild with `npm run quartz -- build`.

The expected behavior and maintenance path are documented in [Mermaid Rendering](MERMAID_RENDERING.md).

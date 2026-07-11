# Troubleshooting

## Node is too old

Install Node 22 and rerun `make doctor`.

## Port is already in use

```sh
PORT=8090 make preview
```

## GitHub Pages 404

Check that Pages source is set to GitHub Actions and that `QUARTZ_BASE_URL` matches `owner.github.io/repository` for project pages.

## Plugin install fails

Run `npm ci`, then `npx quartz plugin install`. If the lock file is outdated, read Quartz maintenance docs before using `--latest`.

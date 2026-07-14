# Maintenance

## Routine checks

Before merging production changes, run:

```sh
make validate
make build
```

Use `make ci` for the full local gate when the repo is already formatting-clean.

## Update dependencies or Quartz

1. Read the Quartz release notes.
2. Update Quartz source intentionally.
3. Run `npm install` to refresh the lock file.
4. Run `npx quartz plugin install --from-config` if plugin configuration changed.
5. Run `npm run patch-plugins` and confirm the Mermaid patch still applies.
6. Run `make validate` and `make build`.
7. Inspect deployment docs if Pages behavior or base URL handling changed.

Do not use unpinned `latest` actions in CI. GitHub Actions are pinned by stable major version.

## Mermaid patch

This repo intentionally patches the installed `obsidian-flavored-markdown` plugin so Mermaid uses `htmlLabels: false`, and it enables a local `mermaid-stability` plugin for post-render behavior. See [Mermaid Rendering](MERMAID_RENDERING.md) before changing Quartz Mermaid dependencies or removing `patch-plugins`.

## Generated output

Do not edit `public/` or `.generated/` directly. Regenerate them from source Markdown and scripts.

## Historical records

Large one-off ledgers and prompt records belong under `docs/archive/` or `docs/prompts/`, not in the operational docs root.

# Maintenance

## Update dependencies

1. Read the Quartz release notes.
2. Update Quartz source intentionally.
3. Run `npm install` to refresh the lock file.
4. Run `npx quartz plugin install --from-config` if plugin configuration changed.
5. Run `make ci`.

Do not use unpinned `latest` actions in CI. GitHub Actions are pinned by stable major version.

# Local Setup

## Prerequisites

- Node.js 22.13.0 or compatible Node 22+
- npm 10.9.2+
- Git
- GNU Make

## Install and preview

```sh
git clone REMOTE-URL data-science-wiki
cd data-science-wiki
make doctor
make setup
make preview
```

Install Node 22 with nvm or the official Node installer if `make doctor` reports an older version.

Stop the preview server with `Ctrl-C`.

`make preview` serves an existing `public/` build when present and builds once first only if needed. Use `make preview-watch` while editing if you want Quartz to rebuild on changes.

If port 8080 is busy, run:

```sh
PORT=8090 make preview
```

For Obsidian-specific setup, see [Obsidian Setup](OBSIDIAN_SETUP.md).

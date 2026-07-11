# Obsidian Setup

1. Clone the repository.
2. Install Node.js 22.13.0 or newer Node 22, npm 10.9.2 or newer, Git, and Make.
3. Run:

```sh
make setup
```

4. Open Obsidian.
5. Choose "Open folder as vault".
6. Select the repository's `content/` folder.
7. Use Markdown links and store attachments under `assets/`. The committed settings set relative Markdown links and automatic link updates.
8. Create or edit a page under the relevant subject directory.
9. Preview formulas with `$...$`, `$$...$$`, and fenced `mermaid` blocks in Obsidian.
10. Run the local web preview:

```sh
make preview
```

11. Run validation, commit, and push:

```sh
make validate
git status
git add .
git commit -m "Update wiki content"
git push
```

12. Ignored files include Obsidian workspace state, local plugin caches, `node_modules/`, `public/`, and generated exports.

## Optional plugins

The wiki does not require community plugins. Optional choices include Obsidian Git, Omnisearch, Dataview for local-only views, and Excalidraw for sketching. Do not commit plugin credentials, local caches, or machine-specific paths.

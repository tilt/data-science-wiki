# Content Operations

This repository is a Markdown wiki maintained by humans and LLM agents. The stable operating rules live in tracked docs; local prompts and temporary agent state live outside git.

## Architecture

Use three layers:

1. **Source content** — `content/` is the public wiki. Pages are canonical Markdown files with required front matter, cross-links, references, and generated navigation footers.
2. **Operating schema** — tracked docs such as `docs/AUTHORING_STYLE.md`, `docs/AUTHORING_GUIDE.md`, `docs/CONTENT_MODEL.md`, this file, and the validation scripts define how agents should edit the wiki.
3. **Local agent workbench** — `docs/prompts/` is gitignored. Use it for disposable prompts, local section briefs, draft orchestration notes, and scratch instructions that should not be required by a clean clone.

The useful idea is compounding maintenance: when a page is improved, the durable result belongs in `content/`; when a workflow rule proves reusable, promote it into tracked docs; when a note is only session scaffolding, keep it in the ignored workbench.

## What Travels With The Repo

Tracked files must be enough for a new agent to work safely without private context:

- authoring rules: `docs/AUTHORING_STYLE.md`
- routine workflow: `docs/AUTHORING_GUIDE.md`
- frontmatter and status model: `docs/CONTENT_MODEL.md`
- validation and maintenance commands: `docs/MAINTENANCE.md`
- private-to-public generalization rules: `docs/integrating-project-knowledge.md`
- current content-progress ledger: `docs/archive/current-content-progress-ledger.md`

Do not make tracked docs depend on files inside `docs/prompts/`.

## Local-Only Workbench

`docs/prompts/` may contain:

- one-off master prompts
- temporary sub-agent instructions
- exploratory audits
- local notes that assume current chat context
- abandoned or superseded prompt variants

Treat those files as disposable implementation notes. If a local prompt contains a rule that future agents need, copy the rule into a tracked operations or authoring document rather than linking to the ignored prompt.

## Ledger Policy

Only the currently maintained progress ledger should be tracked outside the ignored workbench. Keep it at:

```text
docs/archive/current-content-progress-ledger.md
```

Append a short dated entry after a substantive section-level pass or repo-wide content-quality pass. The entry should state:

- pages or sections touched
- pages promoted or deliberately left unchanged
- diagrams, examples, citations, or cross-links added
- validation commands run and their results
- any follow-up work that remains

Older one-off ledgers may stay in `docs/archive/` as historical evidence, but do not start multiple parallel maintained ledgers.

## Agent Workflow

Before a nontrivial content pass:

1. Read `docs/AUTHORING_STYLE.md`, `docs/AUTHORING_GUIDE.md`, `docs/CONTENT_MODEL.md`, and the relevant section `index.md`.
2. Check `docs/archive/current-content-progress-ledger.md` for the latest known state.
3. Inventory the target pages before editing.
4. Prefer concise, concept-specific improvements over padding.
5. Use real sources, executed examples, or concrete artifacts where the page needs them.
6. Cross-link at the point of conceptual contact and mirror important links in `related:`.
7. Run the validation gates before reporting completion.
8. Append to the current ledger when the work changes section status or establishes a reusable convention.

## Validation Gates

For ordinary content edits, run:

```sh
npx prettier --write "content/<section>/*.md"
node scripts/validate-content.mjs
node scripts/check-links.mjs
node scripts/portability-check.mjs
node scripts/gen-nav-footers.mjs --check
git diff --check
```

For broader maintenance, use `make validate` and the commands in `docs/MAINTENANCE.md`.

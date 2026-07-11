# Master Prompt — Prune Filler & Relax the Page Schema

You are editing a personal data-science wiki under `content/` (Quartz, Obsidian-compatible Markdown, ~471 pages across numbered sections `00`–`22`). Prior passes fixed duplicate summaries, added correct math to flagship pages, and made content accurate. **Your job now is different: remove low-information sections and break the rigid uniform page structure where it fights the topic.** Do not add bulk. This is a subtraction-and-reshaping pass.

## Guiding principle

The current template forces ~86% of pages into an identical 5–6 section mold (`Summary` → `Core idea` → `Example` → `…guidance` → `Failure modes` → `Related navigation`). Uniformity was useful for a first draft; now it produces filler. **A section earns its place only if it tells the reader something specific to *this* topic that they could not have guessed from the section on a neighboring page. If it doesn't, delete it — do not pad it.**

Structure serves the topic, not the reverse. Some topics are best as prose, a table, a Q&A, or a single worked derivation. You are authorized — and expected — to depart from the template when that presents the topic better.

## Part A — Prune these information-poor sections

Work through every page. Apply these rules:

1. **`## Levels`** — DELETE everywhere. It is boilerplate (23 pages, only 1 distinct body). If a level distinction genuinely matters on an index page, fold one clause into the Summary instead.
2. **`## Suggested learning path`** — DELETE on pages where it just restates the subtopic list order (23 pages, 3 distinct bodies). Keep only where it encodes a genuinely non-obvious ordering with a one-line reason per step.
3. **`## Related navigation` / `## Related areas`** — DELETE when it is a generic 1–3 link footer that merely duplicates the frontmatter `related:` field or the parent index (median is 9 words). Quartz already renders backlinks and a graph. Keep a "Related" section ONLY when it adds a *contrastive* pointer the reader wouldn't otherwise find (e.g., "unlike X, this handles Y — see [X]"). Prefer inline links inside prose over a footer list.
4. **Thin one-line guidance sections** (`## When to use it`, `## Production guidance`, `## Evaluation guidance`, `## Practical guidance`, `## Practical concerns`) — these are strong on system/MLOps/evaluation pages and forced on foundational ones. On any page where the section is a single generic sentence that would read identically on a sibling page, DELETE it or merge its one real clause into an adjacent section. Keep it only where it carries topic-specific, actionable content.
5. **`## Core idea`** — if it merely re-states the Summary (prior passes mostly fixed this, but recheck), delete it or replace with the actual mechanism/derivation.
6. **`## Failure modes` / `## Common failure modes`** — DO NOT blanket-delete; many are genuine, useful caveats. But delete or rewrite any instance that is generic ("check data quality, inspect slices, watch latency" applied to a topic where it says nothing specific). On a page where the only honest failure mode is trivial, cut the section rather than invent one.

**Deletion test for any section:** copy its body next to the same-named section on 2 sibling pages. If a reader couldn't tell which topic it belongs to, it's filler — delete it.

## Part B — Go schema-less for these page types

For the following, the concept template is the wrong shape. Rewrite to the natural form; do not force `Summary/Example/Failure modes/etc.` Keep frontmatter intact (title, slug, area, `related`, `status`), but let the body structure follow the content.

- **Reference & glossary** (`22-references-and-glossary/*`, `page_type: reference`) — definition lists, tables, or alphabetized entries. No "Example"/"Failure modes" sections.
- **Comparison pages** (`page_type: comparison`, "X versus Y" slugs) — lead with a short framing paragraph, then a comparison **table** (axis · X · Y) and a "when to pick which" line. No forced concept sections.
- **Interview questions** (`20-interview-preparation/*`, `page_type: interview-question`) — a crisp **answer** first, then optional "what a strong answer adds" and a link to the canonical concept. Q→A shape, not the concept mold.
- **History pages** (`19-history-of-ai-and-machine-learning/*`) — narrative/chronological prose or a timeline. No "Production guidance".
- **Project/experience map** (`21-project-and-experience-map/*`) — themed prose mapping experience to canonical topics; drop the checklist scaffolding.
- **Index pages** (`page_type: area-index`) — Summary + curated subtopic list is enough. Remove `Levels`; keep `Suggested learning path` only if non-trivial.
- **Atomic math pages** (`01-mathematical-foundations/*`) — `Definition → Intuition → ML use → Caveats` is natural; do NOT force "Production guidance". A "Failure modes" section is fine only when reframed as concrete mathematical/numerical caveats (the good ones already are).

## Part C — Update the authoring guidance so future agents stay flexible

1. Rewrite `content/_templates/concept.md` so it is explicitly a **menu, not a mandate**. State at the top: "These sections are optional building blocks. Include a section only if it carries topic-specific information. Prefer deleting a section over padding it. For reference, comparison, interview, history, index, and atomic-math pages, ignore this template and use the natural form for the topic." List the sections as suggestions with a one-line 'use when' note each.
2. Add a short `docs/authoring-style.md` (or a section in the existing README/CONTRIBUTING) capturing the same rule: **flexible schema, subtraction over padding, delete filler, structure follows topic.** One paragraph, plus the "deletion test" from Part A.

## Constraints

- **Do not** delete correct math, worked examples, or topic-specific caveats. This is a filler-removal pass, not a length-reduction quota.
- **Do not** reintroduce duplicate summaries or generic boilerplate. Every section you keep must be topic-specific.
- Preserve all frontmatter fields; keep `status` honest (a page you meaningfully improved can go to `review`).
- Preserve the canonical + cross-reference relationships already established for duplicate concepts across sections.
- Keep internal links valid — if you remove a link target's section anchor, fix referrers. Run a broken-link check at the end.
- Do not touch `.obsidian/`, build output, or config.

## Definition of done

- `## Levels` removed everywhere; `Suggested learning path` and `Related navigation`/`Related areas` reduced to only non-trivial instances.
- No section body is a generic sentence that reads identically to the same section on a sibling page (spot-check the previously-repeated headings).
- Reference, comparison, interview, history, project-map, index, and atomic-math pages use a form that fits their content, not the concept mold.
- `_templates/concept.md` reframed as an optional menu; `docs/authoring-style.md` states the flexible-schema + delete-filler policy.
- Zero broken internal links. Report: sections deleted (by heading, with counts), pages restructured (by page_type), and any pages you judged should stay uniform and why.

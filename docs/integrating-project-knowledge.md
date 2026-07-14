# Integrating Project Knowledge

How to turn findings from a real project (pitch, workshop, engagement) into generic, reusable wiki
knowledge. The goal is durable concepts that help any reader, with **no** trace of the originating
client, corpus, or codebase. The RAG architecture pages
(`content/11-generative-ai/rag-architecture-comparison.md`, `rag-benchmark-design.md`) are the worked
example of this process.

## Method

1. **Sanitize first.** Remove every customer, organization, product, and domain-specific detail:
   client names, corpus and document names, internal identifiers, package/class/repo paths, private
   endpoints, and any non-public numbers (accuracy, cost, latency, revenue). Replace concrete
   examples with neutral placeholders (`document A/B/C`, `source_a`, `field X`, `parameter X`). If a
   fact cannot be stated without the private context, drop it.
2. **Generalize to concepts.** Keep the reusable substance — architectures, assumptions, formulas,
   evaluation protocols, trade-offs, failure modes — and phrase it as a pattern, not a war story. If
   a sentence would only be true for the original project, it does not belong.
3. **Place it in the owning numbered section.** Do not create a new top-level directory for a project.
   Find the section that already owns the topic (e.g. RAG lives in `11-generative-ai/`, retrieval
   primitives in `12-information-retrieval-and-search/`) and add or extend pages there. Cross-link
   between sections rather than duplicating.
4. **Reuse existing page types.** A cross-architecture or option comparison is `page_type: comparison`;
   an applied, end-to-end account is `page_type: case-study` (see `19-domain-applications/`); a single
   design is `page_type: system-design`. No new page type is needed.
5. **Do not duplicate — cross-link.** Before writing, check whether the concept already exists
   (e.g. reciprocal rank fusion is fully documented in
   `12-information-retrieval-and-search/hybrid-search.md`). Link to the canonical page and add the
   genuinely new material only.
6. **Follow the house style.** Match the frontmatter convention (model page:
   `content/12-information-retrieval-and-search/bm25.md`), weave ≥3 lateral cross-links into prose and
   mirror them in `related:` frontmatter (the `plugins/related-links` component renders them and feeds
   the graph), include one concrete artifact per page (a table, a Mermaid diagram, an executed example,
   or a cited fact — see `docs/AUTHORING_STYLE.md`), and cite only real, public sources.
7. **Diagram where it helps.** Use fenced ```mermaid blocks for architecture and flow diagrams.
8. **Verify.** Run `npx quartz build` (or `make validate`), a repo-wide broken-link check, and a
   **banned-term grep** over the new and edited pages to confirm no client/corpus/domain terms leaked.

## Checklist before committing

- [ ] No client, corpus, document, or product names; no private numbers.
- [ ] New material lives in the owning numbered section; nothing duplicated.
- [ ] ≥3 cross-links woven in prose and mirrored in `related:`.
- [ ] One concrete artifact per page; references are real public URLs.
- [ ] Build passes, zero broken links, banned-term grep is clean.

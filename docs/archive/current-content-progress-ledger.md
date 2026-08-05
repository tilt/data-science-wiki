# Wiki Review — 2026-07-14

## Rating: 8 / 10

Production-grade knowledge base, far beyond a typical personal wiki. Content
quality, structural discipline, and tooling are all excellent. The gap to 9–10
is about _completion and enrichment_, not foundations.

## What's working

- **Scale & organization** — 468 content pages across 22 numbered sections
  (~194k words). Works simultaneously as an Obsidian vault, browsable Markdown
  tree, and Quartz static site. Multiple entry routes.
- **Content quality is real** — proper math, comparison tables, pseudocode,
  failure modes, references. Consistent page skeleton.
- **Rigor & sourcing** — 1,060 external links dominated by primary sources
  (304 arXiv, textbooks, official docs). Math on 276 pages, Python on 190.
- **Tooling** — clean validation (0 warnings, links ok), full Makefile,
  custom validators, MkDocs export, dual GitHub/GitLab Pages deployment,
  disciplined metadata schema.

## Recommendations (priority order)

1. **Finish the publication lifecycle** — every page is `draft` (47) or
   `review` (421); zero are `published`. Promote reviewed pages; add a
   maturity view.
2. **Fix coverage imbalance** — RL has only 7 pages (~538 w/page) vs
   Generative AI's 54. Cloud/Distributed (12) also thin. RL first.
3. **Add more visual content** — only 36 diagram assets + 12 Mermaid + 35
   embedded images across 468 pages. Mermaid is portable and low-friction.
4. **Add external-link-rot checking** — `check-links` validates internal only;
   1,060 external links go unchecked. Add periodic non-blocking CI check.
5. **Enforce freshness** — `last_reviewed` is tracked but nothing acts on it.
   Add `make list-stale` (e.g. >6 months).
6. **Tighten status enum** — one page uses nonstandard `status: open`
   (`error-taxonomies.md`) that slips through validation.

## Agreed work (this session)

- [x] RL section expansion (#2) — 7 → 12 pages. New: temporal-difference-learning,
      proximal-policy-optimization, exploration-in-reinforcement-learning,
      reward-design-and-shaping, off-policy-evaluation. Index + cross-links updated.
- [x] `make list-stale` target (#5) — `scripts/list-stale.mjs`, `make list-stale DAYS=180`.
      (User noted staleness is low-priority for a slow-moving wiki; kept as zero-cost listing.)
- [x] External link checking (#4) — `scripts/check-external-links.mjs`,
      `make check-external-links`, npm `check-external-links`, and a weekly non-blocking
      GitHub workflow (`.github/workflows/external-links.yml`).
- [~] Status enum fix (#6) — DROPPED. The enum is already enforced in
  validate-content.mjs; `status: open` was body content, not front matter.

## Correction to original review

The status vocabulary is `stub/draft/review/complete` (not "published").
Terminal-maturity observation still holds: 0 pages are `complete` (47 draft, 421 review).

## Link rot found by the new checker — ALL FIXED

- 404 Kalman → replaced with Kalman 1960 DOI (10.1115/1.3662552), 5 files touched via Kalman rewrite.
- nixtla `…/index.html` → https://nixtla.github.io/statsforecast/ (200), 5 files.
- Cormack RRF → ACM DOI 10.1145/1571941.1572114 (403 = alive), 2 files.
- Hochreiter LSTM → Neural Computation DOI 10.1162/neco.1997.9.8.1735 (403 = alive), 2 files.
  Checker now reports 520 URLs, 0 broken.

## Round 2 (follow-up session)

- [x] Fixed all 4 rotted links (above).
- [x] Promoted all 12 RL pages draft → complete (first `complete` pages in the wiki;
      addresses recommendation #1). Bumped last_reviewed to 2026-07-14. Revertible per page.
- [x] Kalman filters page (already existed at 05-…/kalman-filters.md, was ~430w `review`)
      upgraded to high quality: predict-update cycle table, worked scalar example,
      filtering/prediction/smoothing, EKF/UKF/particle extensions, Joseph-form/tuning
      guidance, connections. Kept status `review` (not an RL page). Refs verified live.

## Round 3 (visuals + authoring guard)

- [x] Added 5 Mermaid diagrams (recommendation #3): Kalman predict-update cycle,
      PPO training loop, actor-critic architecture, RLHF pipeline (PPO + DPO paths),
      and OPE estimator flow. Matched house style (flowchart TD, plain labels).
      Note: browser render verified by precedent (matches shipping Safari-tested
      diagrams); definitive check is `npm run test:mermaid` (Playwright).
- [x] Added a validate-content.mjs guard: flags a literal `|` inside inline math
      in a table cell (the footgun that corrupted the TD table), gated on a
      LaTeX-structure char so currency like `$0.02/GB` is not a false positive.
      Unit-tested 6 cases; 0 false positives on 474 real pages. Documented the
      `\mid` convention + a Mermaid-label note in docs/AUTHORING_STYLE.md.

## Round 4 (diagrams for system-design pages in 11/13/14)

- [x] Added 14 Mermaid diagrams to flow/architecture pages:
  - 13-data-engineering: data-pipelines, feature-pipelines (offline/online skew),
    data-warehouses (raw→staging→intermediate→mart).
  - 14-mlops: ml-system-lifecycle (loop), training-pipelines, ci-cd-for-ml,
    batch-and-online-inference, canary-deployment, shadow-deployment, microservices.
  - 11-generative-ai: retrieval-pipelines, tool-use-and-function-calling (call loop),
    multi-agent-systems (typed handoffs), model-serving.
- Wiki mermaid coverage: 12 pages → 31 pages this session (19 diagrams total).
- Undiagrammed system-design/impl/algo in 11/13/14: 24 → 10 remaining.
- Did NOT build the `make list-undiagrammed` helper (used an inline node scan instead).

## Round 5 (deep learning + information retrieval block)

- [x] 8 Mermaid diagrams: 06-deep-learning (attention Q/K/V flow, backpropagation
      forward/backward, transformers pre-norm block, CNN stack); 12-IR (hybrid-search
      fusion, approximate-nearest-neighbour-search pipeline, dense-retrieval dual-encoder,
      inverted-indexes flip).
- [x] 1 SVG plot: bm25-term-frequency-saturation.svg (generated, theme-aware,
      matches house asset style; rendered to PNG and visually verified). Added a short
      saturation explanation on the BM25 page alongside it.
- Observation: the math-dense pages sampled (attention, backprop, bm25, transformers,
  ANN, dense-retrieval, inverted-indexes) already explain every term + have worked
  examples — so I added visuals, not redundant prose (deletion-test discipline).
- Wiki totals now: 39 pages with Mermaid (from 12 at session start), 37 diagram SVGs.

## Round 6 (Python-snippet explanations)

Assessment of the "code demonstrates but under-explains" concern:

- A prior audit (docs/archive/python-snippet-intro-audit-ledger.md) already gave
  all 190 snippets an intro line, and pages generally have a prose
  Framing/Mechanism/Defining-math section + explained formulas. So the wiki is
  ~mostly compliant; a mass rewrite is NOT warranted (would pad good pages).
- Real residual defect: mechanical / past-tense / DOUBLED snippet intros
  ("This executed toy compared…" stacked on "This snippet trains…"), concentrated
  in 19-domain-applications. Fixed 7 pages so each snippet now opens with WHY it is
  shown (energy-forecasting, predictive-maintenance, malware-classification,
  cultural-heritage, demand-prediction, business-message, matchmaking).
- Verified: 0 double-intros remain; the one surviving "This executed" line
  (adversarial-evaluation) is a good interpretive takeaway, not a mechanical intro.
- Verified no delete-the-code failures: lowest prose-before-first-snippet is ~60
  words (a real paragraph), on SQL/config-artifact pages that state the concept.

Codified the standard in docs/AUTHORING_STYLE.md ("Code is a demonstration, not
the explanation" — delete-the-code test; explain mechanism in words + formula;
open snippets with what/why not line-narration; interpret the output).

Deliberately did NOT mass-edit the ~173 "This snippet…" openers: most follow a
proper mechanism section and are fine; editing them wholesale would be low-value
churn. Future targeted passes should apply the delete-the-code test per page.

## Round 7 (data-engineering SQL/config pages, delete-the-code standard)

Assessed all 12 code-bearing pages in section 13. 10 already lead with the
concept in prose (airflow, bigquery, dbt, data-contracts, data-pipelines,
dimensional-modelling, relational-modelling, feature-pipelines, sql, etl/elt) —
sql.md is a model case: its "Query mechanism" section explains the whole logical
query pipeline in words, so the snippet is a true demonstration.

Fixed the 2 genuine violators:

- data-quality.md — had a redundant double-intro and a mechanism that leaned on
  the code. Rewrote so the prose maps each quality dimension to its check
  (completeness=null count, uniqueness=duplicate-key count, validity=currency
  count); reader no longer needs the SQL to know what is tested.
- data-warehouses.md — dropped the redundant mechanical line; the intro now
  motivates the point (the mart owns the business definition; the metric is what
  it is only because the query restricts to status='paid').

Section 13: 0 double-intros remain; validate/links clean.

## Round 8 (navigation pages + learning-path footers)

- Rewrote knowledge-map.md (218 -> 591 words): added a 16-node Mermaid dependency
  graph as centerpiece, plus layer/cross-cutting prose and a RAG-dependency example.
- Rewrote learning-paths.md (236 -> 495 words): 6 -> 11 paths (added Deep learning,
  NLP, Computer vision, Information retrieval, Reinforcement learning; extended the
  existing ones into full prereq->core->eval arcs; per-path "who it's for").
- Added per-page nav footers for all 10 linear paths via a generator
  (scratchpad/gen-path-footers.mjs): strips stale footers, regenerates with correct
  prev/next titles (read from frontmatter), relative links, and #anchor. Now 57 pages
  carry a consistent "Learning path — X: <- prev . path overview . next ->" footer
  (up from ~19). The "Focused review" path is intentionally footer-less (it samples
  index pages already on other paths). Re-added tool-use-and-function-calling to the
  GenAI path so its existing footer was not orphaned.
- All verified: validate 474/0, links ok, portability ok. Footer chaining spot-checked
  (first/middle/last variants, extended-path last->middle flip, cross-section links).

## Round 9 (per-section main pages + chapter reading order)

Approved plan: ~/.claude/plans/i-think-it-would-validated-floyd.md. Built the whole
"section guide + chapter navigation" system.

- Standardized all 21 topical section index.md (00 nav-hub left as-is) to a canonical
  shape: Overview, `## Knowledge map` (a Mermaid graph — first Mermaid on any index),
  `## Reading path` (ordered annotated list of EVERY non-index page = single source of
  truth), `## Connections`. Replaced the 9 inconsistently-named map sections + flat
  Subtopics lists.
- Positioning: already solved by Quartz (folder header links to index.md); no renames.
- scripts/gen-nav-footers.mjs: parses each `## Reading path` + learning-paths.md chains,
  emits a `> **Section — <Area>:** ← prev · overview · next →` footer on every page and
  preserves the `Learning path —` footers (coexist). `--check` mode for CI.
  scripts/propose-reading-order.mjs seeds order via prerequisite topo-sort.
- validate-content.mjs: new check that each index reading-path set == the folder's
  non-index pages (catches drift). Added area-index template, AUTHORING_STYLE.md section,
  make nav-footers / nav-footers-check (wired into `validate`), npm scripts.
- Result: 21/22 indexes have Knowledge map + Reading path; 447 pages gained a Section
  footer (footer coverage 57 → 459 pages). validate 474/0, links ok, portability ok,
  prettier clean, nav-footers idempotent. Mermaid label chars checked safe on all 21.

## Round 10 (navigation footer UX)

- Iterated footer format twice on user feedback: (1) link the section/path name and drop
  the redundant middle "overview"/"path overview"; (2) restyle as a proper pager.
- Final: gen-nav-footers.mjs emits ONE `> [!nav]` callout per page combining the section
  and learning-path rows (label row + pager row of prev/next pill chips with arrows).
  Markdown links inside the callout still resolve + are link-checked normally.
- Styling in quartz/styles/custom.scss (`.callout[data-callout="nav"]`): hides the callout
  title, small uppercase label, pager row is flex space-between (prev left / next right),
  `white-space:nowrap; overflow-x:auto` so it never line-breaks; pill-styled links; uses
  theme vars so light/dark both work.
- Verified structurally (OFM emits `data-callout="nav"` + `.callout-title`/`.callout-content
  > p`, confirmed in .quartz plugin source) AND visually (rendered the exact DOM + CSS to
  > PNG via qlmanage in light+dark — clean pager, prev-left/next-right, no wrap).
- Local `npm run build` fails on an unrelated missing vendored plugin (bases-page/index.json)
  — pre-existing env issue, not from these changes.
- validate 474/0, links ok, portability ok (callouts allowed), prettier clean, generator
  idempotent (prettier leaves the callouts untouched).

## Round 11 (math foundations: Python → worked math)

- Converted 15 of the 19 code-bearing pages in 01-mathematical-foundations from an
  `## Executed demo` (python + Observed output) to a pure hand-worked `## Worked example`
  in LaTeX, keeping the prose: linear-algebra, vectors-and-matrices, matrix-multiplication,
  rank, orthogonality, eigenvalues, matrix-decompositions, low-rank-approximation,
  norms-and-distances, gradients, optimization, convex-optimization, gradient-descent,
  constrained-optimization, kl-divergence. Pruned numpy/scipy references that only
  supported the removed code.
- Kept code on 4 pages where computation is the lesson: singular-value-decomposition,
  calculus (finite-difference precision), numerical-stability (softmax NaN),
  stochastic-gradient-descent (seeded run).
- Standardized the math heading to `## Worked example` across the chapter (renamed the
  existing `## Worked calculation` / `## Worked scenario` on the 5 already-math pages).
- Section 01 python blocks 19 → 4; 20 pages now use `## Worked example`. validate 475/0,
  links ok, portability ok, prettier clean, nav-footers untouched/idempotent.
- (Note: 475 pages now — user independently added 13/distributed-warehouse-modelling.)

## Round 12 (incompleteness ranking + MLOps expansion)

- Built an incompleteness ranking (scratchpad/rank-incompleteness.mjs; full CSV at
  docs/archive/incompleteness-ranking.csv): scores each content page on status, body
  heft (incl. code/math so math pages aren't falsely thin), missing References, no
  illustration, placeholders, poor connectivity. Section rollup showed 07-RL best (0.27,
  the model) and 14-mlops the thinnest applied section.
- Expanded the highest-payoff cluster: 11 thin, highly-linked 14-mlops pages, each with a
  real addition (not padding): model-versioning (promotion-lifecycle Mermaid + what-a-
  version-pins table + Connections), monitoring (signal-layer table + leading/lagging),
  golden-datasets (golden-vs-eval table + curation), dataset-versioning (point-in-time
  example), evaluation-datasets (slice gates), observability (pillars table), reliability
  (graceful-degradation ladder), experiment-tracking (reproducible+comparable),
  rollbacks (roll-back-by-default), human-in-the-loop (routing taxonomy + selection bias),
  docker (environment-vs-model + GPU).
- Result: 14-mlops mean 3.23 → 2.73; pages scoring >=4 went 7 → 0. validate 478/0, links
  ok, portability ok, prettier clean, nav-footers idempotent. Bumped last_reviewed.

## Round 13 (genAI agent/RAG cluster)

- These pages were already better than the MLOps cluster (each had a worked table) — the
  ranking over-flagged them because the illustration detector missed markdown tables.
  So I added genuinely-missing depth, not padding:
  - chunking: `## Strategies` table (fixed / recursive / heading-aware / semantic)
  - tool-routing: `## Routing approaches` table (rule / model / hybrid + safe default)
  - cost-and-latency-optimization: `## Levers` table (cache, cascade, trim, batch, stream)
  - context-construction: `## Trust and precedence` (instruction hierarchy vs prompt injection)
  - reranking: bi-encoder vs cross-encoder architecture note
  - fine-tuning-versus-rag: the "use both" production pattern
  - agent-loops: left as-is (already complete: state-machine Mermaid + JSON contract)
- Result: all 6 dropped out of the ranking's top 45. validate 478/0, links ok,
  portability ok, prettier clean, nav-footers idempotent, last_reviewed bumped.
- Note: the ranking's illustration signal under-counts markdown tables; treat mid-list
  "no-illustration" flags on table-bearing pages with skepticism.

## Round 14 (ranking detector fix + honest stop)

- Found the incompleteness ranking's illustration signal was over-flagging: it missed
  markdown TABLES and non-listed code fences (`markdown, `dockerfile, ...), so
  complete pages (etl-and-elt, technical-decision-records, the genAI cluster) were
  falsely tagged "no-illustration". Fixed the detector (any ```lang, display math, image,
  or table row now counts).
- Corrected ranking: only 2 pages score >=6 (navigation, further-reading — both short by
  DESIGN), and just 6 score >=4 (4 atomic-math pages that are concise by design + the 2
  forecasting drafts). No genuinely-incomplete cluster remains — further "expansion" of
  the list would be padding complete pages, which violates the deletion-test.
- Legitimate action taken: promoted the two review-quality forecasting DRAFTs to review
  (forecast-evaluation, quantile-loss); added one non-duplicative "what to evaluate" table
  to forecast-evaluation. Did NOT touch etl-and-elt / technical-decision-records (complete;
  detector false-positives).
- validate 478/0, links ok, portability ok, prettier clean, nav-footers idempotent.

Recommendation: the "expand short pages" lever is exhausted. Next axes: (a) audit the 38
draft-status pages for genuine stubs vs mislabeling and promote/expand accordingly;
(b) correctness spot-checks (not length); (c) diagrams on remaining diagram-worthy pages;
(d) run the external-link-rot check.

## Round 15 (draft-status audit)

- Audited all 39 draft-status pages by signals (heft, illustration, refs, section count)
  - spot-read the riskiest (concept-drift-in-forecasting). Verdict: ZERO genuine stubs.
    The drafts were two mislabeled groups: (1) the 13 standardized area-index pages, (2) the
    entire time-series section (05) + 11/llm-training — all 330–1100 words, 7–14 sections,
    referenced. Draft was a labeling artifact, not a quality signal.
- Promoted all 39 draft -> review. Wiki now has 0 drafts (466 review, 12 complete).
- validate 478/0, links ok, nav-footers idempotent. Ranking's top-4 are now all
  atomic-math pages (concise by design — do NOT pad); no genuine gap remains.

Maturity note: only 07-RL is `complete`. Elevating review -> complete is a per-section
sign-off decision for the owner, not an automatic promotion.

## Round 16 (correctness pass on 01-mathematical-foundations)

- Independently recomputed all 37 worked-example numbers in section 01 (matmul, eigenvalues,
  norms, Cholesky, low-rank Eckart-Young, gradients, Jensen, GD contraction, Lagrange, KL
  both directions, graph-Laplacian null space): ALL match the pages. Zero errors — the
  code→math conversions are arithmetically sound.
- Verified graph-laplacian.md (user-added): the worked example (disconnected pairs) is
  correct — f=(1,1,0,0), g=(0,0,1,1) are in null(L) — and the separate connected-graph SVG
  has internally consistent W/D/L=[[3,-2,-1,0],[-2,5,-3,0],[-1,-3,6,-2],[0,0,-2,2]]. No
  inconsistency; the SVG and worked example are deliberately two different graphs.
- Kept-code pages spot-checked by cross-reference (numerical-stability softmax, SVD σ) — OK.
- Verification script kept in scratchpad; could be promoted to scripts/check-worked-math.mjs
  as a CI guard if desired.

Complete-candidate nominations (owner sign-off for review -> complete): 01-math (now
correctness-verified end-to-end), 14-mlops (recently expanded, uniform), 05-forecasting
(uniformly substantial). 07-RL already complete.

## Round 17 (section 05 Time-Series illustration pass)

Re-ran the incompleteness scorer against the full tree, then read the flagged pages
rather than trusting the heuristic. Finding: section 05 was the only substantive methods
section with a cluster of prose-only pages (8 with no diagram/table/math; every other real
section already had zero). The pages were not thin (300-600w of solid prose) — they simply
never got the illustration treatment. Added one illustration each that passes the
delete-the-illustration test:

- time-series-fundamentals: naive-baselines table (formula + assumption encoded).
- demand-forecasting: demand-segment -> method -> metric-caution table.
- predictive-maintenance: 3 target formulations (risk/RUL/degradation) table w/ censoring.
- concept-drift-in-forecasting: drift-pattern -> signature -> response table.
- intermittent-demand: WORKED Croston's-method example (display math, z/p rate, SBA bias).
- online-learning-for-forecasting: update-pattern -> adaptation speed -> risk table.
- cold-start-forecasting: 7-strategy table (assumption / when / risk).
- deep-learning-forecasting: neural-architecture comparison table (RNN/TCN/Transformer/
  N-BEATS-N-HiTS/TFT) linking the variant pages.
- Plus 2 single-heading pages with existing illustration: rolling-origin-validation
  (fold-scheme table) and trend-seasonality-cycles-noise (component -> model table).

Section 05 now has 0 no-illustration content pages. Validation 479 pages/0 warnings, links
ok, portability ok, footers up to date. last_reviewed bumped to 2026-07-18 on all 10.

Scorer caveat confirmed: it over-ranks reference/glossary (section 21) and nav (section 00)
pages that are terse by design; those need a coverage/accuracy audit, not prose/illustration.

## Round 18 (section 21 References & Glossary coverage audit)

The scorer ranked section 21 worst, but the fix was coverage/accuracy, not prose depth
(glossaries score as "thin prose" because the scorer strips tables). Audited and expanded
the terminology backbone; every added link was verified against an existing file first
(check-links ok):

- glossary.md: 11 -> 34 terms. Added Attention, Backprop, Backtesting, Bias-variance,
  Concept drift, Cross-entropy, Data leakage, Dimensionality reduction, Fine-tuning,
  Gradient descent, Grounding, Guardrails, Hallucination, KL divergence, MDP, Overfitting,
  Quantization, Regularization, Reranking, Stationarity, Tokenization, Transformer, Vector
  database. Alphabetical; each links to its canonical page.
- acronyms.md: 8 -> 28. Added ANN, DQN, ETL/ELT, GAN, GBM, GRU, LLM, LSTM, MAP, MDP, MLE,
  NDCG, NER, OCR, PCA, RNN, SLO, SVM, TF-IDF, VAE, all with verified area links.
- notation.md: 10 -> 16 symbols (nabla, E, eta, sigma, gamma, pi), matching the page's
  existing \\ escaping convention.
- further-reading.md: route map 5 -> 15 areas, one verified entry-point trio per section,
  ordered to follow the curriculum.

All targets checked with a file-existence sweep before writing (guessed filenames were
unreliable: pca.md not principal-component-analysis, lstm-and-gru.md, maximum-likelihood.md,
etc.). Validation 479 pages/0 warnings, links ok, portability ok, footers up to date.
last_reviewed bumped to 2026-07-20 on all four pages. metrics.md (1639w) left as-is.

## Round 19 (de-rigidify + scorer fix + promotions)

Singleton audit conclusion: inspected all 21 "short" content pages; every one already has
3-5 headings + a worked illustration (table/math/code/diagram) + caveats + refs. The word
count was a scorer artifact (it strips tables/math/code before counting prose). Did NOT pad
them. Spot-verified worked math (pretraining perplexity 2.86; expectation/variance 1.4275).

Scaffold de-rigidification: the `## Summary` heading was a section-05 outlier — 28 of the 36
wiki pages using it were in 05, while ~450 pages open with a lead paragraph. Removed the
redundant `## Summary` label across those 28 (paragraph becomes the lead), aligning 05 to
house style. 8 `## Summary` pages remain (4 in 21, 3 in 00, 1 template) — reference/nav,
left as-is.

Scorer fixed (scratchpad rank-incompleteness3.mjs): now credits structured content
(tableRows*12 + mathBlocks*18 + codeBlocks*22 + mermaid*15 + images\*18) as effective
content. Result: only 3 genuinely prose-only content pages remain wiki-wide (Navigation,
Learning Paths, Further Reading — all nav/reference lists, correct form). No real methods
page is structurally incomplete.

Promotions: sections 05 (48 pages) and 14 (27 pages) promoted review -> complete after
illustration/correctness/de-rigidify work (05) and expansion (14); verified weakest pages
(Rolling Origin Validation, Production Incident Response) are complete-quality. Wiki-wide
complete: 38 -> 113. Validation 479 pages/0 warnings, links/portability/footers all pass.

Still deferred (needs per-page editorial judgment, not mechanical): weaving boilerplate
`## Caveats` into prose where a separate section does not earn its place (305 pages have
one; median 39 words); adding depth for an average DS reader where a page is genuinely
terse. error-taxonomies.md still status:draft (stray from earlier draft audit).

## Round 20 (section 11 GenAI purpose-driven editorial pass)

De-rigidified the largest section (53 pages). The rigidity was generic labels: almost every
page ran Mechanism -> Concrete artifact -> Caveats -> References, where the first two headings
described nothing. Renamed every generic heading (46 pages, 0 remaining) to a page-specific
noun phrase so no two pages share a skeleton and the TOC self-describes, e.g.:

- prompt-injection: Mechanism -> Privilege separation; Concrete artifact -> Trust boundaries
- memory: -> The four memory policies / A memory record
- grounding: -> The grounded-answer contract / A claim-support record
- reranking: -> Bi-encoder recall, cross-encoder precision
- sampling-and-decoding: Defining mechanism -> Decoding rules; Executed artifact -> Comparing decoders
  Left already-descriptive headings (Defining math, Worked example, Strategies, Levers, etc.) alone.

Judgment calls per user guidance (keep sections only where they earn their place):

- Folded ONE redundant Caveats into prose (structured-output: its caveat just restated the
  page's own validation table). Kept all other Caveats (most are substantive, 30-97 words).
- Added explanation where an average DS reader would stumble (query-rewriting: explained the
  non-obvious must_preserve field, which previously jumped from JSON straight to Caveats).
- Fixed a real rendering bug in top-k-and-top-p-sampling (stray backtick broke inline math
  `$p=0.80`` and missing spaces `alpha`and`beta`).

All 46 edited pages last_reviewed 2026-07-20. Validation 479 pages/0 warnings, links,
portability, footers all pass. Section 11 kept at status:review (not promoted).

## Round 21 (section 14 MLOps de-rigidify)

Extended the section-11 de-genericizing to 14-mlops. All 25 content pages used a bare
`## Mechanism` heading (the "Concrete artifact" ones were already renamed to `## Artifact: ...`).
Renamed each to a page-specific heading matching its content, e.g. monitoring -> Four layers
of monitoring signals; model-versioning -> The promotion lifecycle; observability -> The four
observability pillars; a-b-testing -> The experiment contract; service-level-objectives ->
SLIs, SLOs, and error budgets; shadow-deployment -> Side-effect-free shadowing. 0 generic
headings remain in 14. Kept `## Caveats`/`## Failure Modes` as-is (consistent house convention,
not stiffness). last_reviewed 2026-07-21. Validation 479 pages/0 warnings, links, footers pass.

Recommendation recorded for remaining sections: rename generic Mechanism/Concrete artifact
(52+6 pages in 18, 15, 12, 16, 13) same way; do NOT mass-rename `## Caveats` (253 pages) —
it is a useful consistent convention like `## References`, fold only redundant ones case-by-case.

## Round 22 (de-rigidify sections 18, 15, 12, 16, 13)

Renamed all remaining generic Mechanism/Concrete artifact headings in the five sections:
18-responsible (11 pages, 12 headings), 15-cloud (8), 12-IR (7 pages, 8 headings), 16-software
(3), 13-data (1). Each -> page-specific heading matching content (e.g. gpu-systems -> The
roofline model; scalability -> Little's Law and scaling limits; adversarial-evaluation -> A
threat-linked test matrix; sql -> Safe application SQL). Wiki-wide `## Mechanism` and
`## Concrete artifact` are now ZERO (outside \_templates). last_reviewed 2026-07-21.
Validation 479 pages/0 warnings, links, portability, footers all pass.

DISCOVERED a second generic-label pattern: `## Defining mechanism` on ~61 pages in the
science-heavy sections NOT yet surveyed: 08-nlp (18), 10-video (17), 09-cv (11), 12-IR (6),
17-experimentation (3), 06-dl (3), 04-recsys (3). Same class of empty label; natural next
extension of the de-rigidify pass if the owner wants it.

## Round 23 (clear `Defining mechanism` across science-heavy sections)

Renamed all 61 `## Defining mechanism` headings to subject-specific ones across 08-nlp (18),
10-video (17), 09-cv (11), 12-IR (6), 17-experimentation (3), 06-dl (3), 04-recsys (3). Names
match the section content (e.g. language-modelling -> Autoregressive factorization;
video-transformers -> Attention over video tokens; pytorch -> Autograd and the computation
graph; hybrid-search -> Reciprocal rank fusion; repeated-sampling -> The bootstrap).

DE-RIGIDIFY COMPLETE: wiki-wide count of `## Mechanism` / `## Concrete artifact` /
`## Executed artifact` / `## Defining mechanism` is now ZERO (outside \_templates). Every
former generic middle heading across the whole wiki now names its own content. `## Caveats`
kept as the consistent house convention. Validation 479 pages/0 warnings, links, footers pass.
last_reviewed 2026-07-21 on all edited pages.

## Round 24 (Classical ML chapter: explanations + plots/diagrams, in progress)

Goal (user): bring section 03 pages up to the rebuilt evaluation-metrics.md bar — expand
explanations, add plots/diagrams, and REPLACE the sklearn worked-example snippets with
hand-worked math + a plot/diagram (user chose "Replace with hand-worked" over keeping code).
evaluation-metrics.md reviewed and verified (AUC=14/16=0.875, all numbers correct) as the model.

Target shape per page: intro -> Defining math (symbols explained) -> Intuition -> Worked
example (hand numbers + Mermaid/SVG) -> Caveats -> References. Mermaid for structure, SVG for
quantitative curves, tables for comparisons.

DONE (6 pages, verified render + 0 warnings):

- Batch 1 tree family (Mermaid): decision-trees (hand Gini split dG=0.333 + split tree),
  random-forests (variance formula rho\*sigma^2 + (1-rho)/B, =0.208 + bagging diagram),
  gradient-boosting (additive stage F0=4 -> residuals shrink 4->3 + sequential diagram).
- Batch 2 linear family (new SVGs, rendered via qlmanage + verified): logistic-regression
  (z=1.4 -> p=0.80, odds\*e^2 + sigmoid plot), linear-models (OLS fit yhat=0.6+0.8x, SSE=3.6
  - least-squares plot), regression (R^2=1-2.4/6=0.6 + SS_res vs SS_tot plot).
- 3 new SVGs authored light-themed and registered in custom.scss dark-mode filter list:
  logistic-regression-sigmoid, linear-models-least-squares-fit, regression-r-squared-fit.

REFINED RULE (user): keep runnable Python IN ADDITION to the concept page where it
demonstrates something (comparing models, showing overfitting). Placed as a separate
descriptive section after the hand-worked concept content. Applied retroactively:

- random-forests: restored "## One tree versus a forest" (tree vs forest + OOB).
- gradient-boosting: restored "## Watching the stages improve" (staged acc).

Batch 3 model-behavior DONE (verified render + 0 warnings):

- bias-variance-trade-off: hand-worked decomposition (0.25+0.8+1.0=2.05) + U-curve SVG,
  KEPT the shallow-vs-unlimited-tree overfitting demo as "## Overfitting in practice".
- regularization: hand-worked ridge shrink 20/(10+lambda) + L1/L2 geometry SVG, KEPT the
  linreg/ridge/lasso comparison as "## Comparing ridge and lasso".
- model-selection: hand-worked CV mean (55/5=11) + k-fold SVG, KEPT grid-search as
  "## Grid search in practice".
  3 new SVGs authored + rendered + registered in scss: bias-variance-u-curve,
  regularization-l1-l2-geometry, cv-kfold-splits.

DONE so far: 9 pages (batches 1-3) + 6 new SVGs total. Validation 482 pages/0 warnings.

REMAINING section-03 pages (~11), planned illustrations:

- bias-variance-trade-off: SVG U-curve (train/test vs complexity)
- regularization: SVG L1 vs L2 constraint geometry
- support-vector-machines: SVG margin/hyperplane/support vectors
- calibration: SVG reliability diagram (note: calibration-reliability-diagram.svg already
  exists in assets + scss — check before authoring)
- class-imbalance: SVG PR curve under imbalance
- classification / supervised-learning / unsupervised-learning: Mermaid task/flow diagrams
- dimensionality-reduction: SVG 2D->1D projection / scree
- feature-engineering / data-leakage / interpretability: Mermaid pipeline/leakage + tables
- model-selection: SVG CV folds / validation curve
- anomaly-detection: SVG score-threshold scatter
  Each: expand prose, replace python worked example with hand-worked + illustration, bump
  last_reviewed, render new SVGs via qlmanage, register in scss, run full validation suite.

## Round 24b (Mermaid edge-label rendering fix)

User reported Mermaid branch/edge labels (the |bootstrap|, |x1 gt| kind) are cropped and
sit too tight. Root cause: htmlLabels is forced false globally (scripts/patch-mermaid-config
.mjs, for render stability), so edge labels are tight SVG <text> boxes sized from a metric
estimate; browsers render slightly wider -> last glyph clips and the connector line crosses
the text. Fix in quartz/styles/custom.scss (no change to the stability patch):

- .mermaid svg / svg[id^=mermaid-]: overflow visible (no clipping).
- edge-label text/tspan: paint-order stroke fill + 3.5px var(--light) halo (masks the line,
  adds breathing room, theme-aware).
- edge-label rect/.background: fill var(--light) !important + rx/ry 5 (blend the cramped box).
  Selectors cover both container shapes (code.mermaid wrapper and bare svg[id^=mermaid-]).
  SCSS compiles (sass API). NOT visually verified — Quartz build is blocked (vendored
  bases-page/index.json missing), so needs a browser rebuild/refresh by the owner to confirm;
  tune stroke-width if the halo reads heavy.

## Round 24c (symbol-naming pass, Classical ML)

User principle: ALWAYS name every symbol in a formula and say what it represents (example
given: random-forests $\hat f_{RF}$ and $\hat p_k$ were unnamed). Swept all 20 non-index
section-03 Defining-math sections and named every symbol; promoted several inline formulas
to display for readability. Pages touched: random-forests (f_RF, T_b, B, p_k, indicator),
decision-trees (I_m/n_L/n_R/Delta/s/m), gradient-boosting (F_m, L, gamma, r_im, h_m, nu),
support-vector-machines (w, b, xi_i, C, margin width), linear-models (beta_0/beta/lambda),
logistic-regression (z_i, X, p, y, n), regression (X, beta, R^2 terms), regularization
(theta, Omega, lambda, I), model-selection (lambda/Lambda, V_k, f^(-k)), data-leakage
(V, L, A, y_V), dimensionality-reduction (p, d, W, X_c, I_d, tr, Frobenius), pca (V, Lambda,
lambda_j, U, Sigma, sigma_j, V_d, Z), calibration (Brier/log-loss symbols), class-imbalance
(pi, s, t, TP/FP/FN), interpretability (I_j, S, pi_j, phi_0/phi_j), bias-variance (D, f, Y,
sigma^2, underbrace labels), classification (s, t), anomaly-detection (tau, p-hat),
feature-engineering (phi, f, d), unsupervised-learning (C_k, mu_k, RI/E[RI]).
Validation 482 pages/0 warnings, links/portability/footers pass. last_reviewed 2026-07-22.

NOTE: Mermaid edge-label CSS fix (round 24b) reported by user as not working; user will
handle separately. Leave custom.scss mermaid block as-is unless asked.

Still pending from round 24 plan: section-03 content batches 4-6 (SVM margin plot,
calibration reliability, class-imbalance PR curve, classification/supervised/unsupervised
Mermaid, dimensionality-reduction projection, feature-engineering/interpretability tables,
anomaly-detection scatter). SVM and PCA still have python-only worked examples + no
hand-worked concept example yet (PCA has pca-principal-axis.svg).

## Round 25 (Classical ML Batch 4 + algorithm-first restructure + promotions)

Applied all accumulated feedback: lead with the algorithm/concept (not Defining math),
math as a supporting section, name every symbol, state the task (regression/classification),
keep useful Python as a named demo section, add one illustration that earns its place.

- support-vector-machines: restructured to How it works (max-margin/support vectors/soft
  margin C/kernels) -> The margin objective (math) -> Worked example (hand-worked 1D margin:
  w=0.5, b=0, margin 2/||w||=4) + NEW svm-margin-hyperplane.svg (rendered+verified+registered)
  -> Fitting a linear SVM (kept LinearSVC demo).
- class-imbalance: Why accuracy misleads (hand-worked 1000-txn/10-fraud confusion table,
  acc 0.99 / recall 0) -> Metrics under imbalance (math) -> Comparing plain and weighted
  models (kept demo).
- classification: From scores to decisions (hand-worked 3-class argmax + binary threshold
  flip) -> Scores and thresholds (math) -> Baseline versus a real classifier (kept demo).
- calibration: Reading a reliability diagram (hand-worked reliability-bins table, overconfident
  top bin) -> Measuring calibration error (Brier/log loss) -> Calibrating a classifier (demo).

Tree pages (round 24d, user also swapped Mermaid->SVG plots): decision-trees/random-forests/
gradient-boosting restructured algorithm-first (How it works numbered steps) + math as
support; worked examples state task + name symbols; restored the "single question that makes
children purer" intuition line into decision-trees without redundancy.

PROMOTED review->complete (user OK'd promoting edited pages), 15 section-03 pages:
decision-trees, random-forests, gradient-boosting, linear-models, logistic-regression,
regression, bias-variance-trade-off, regularization, model-selection, support-vector-machines,
calibration, class-imbalance, classification, evaluation-metrics, pca. Wiki complete 113->128.
Validation 482 pages/0 warnings, links/portability/footers pass.

STILL AT REVIEW in section 03 (next to lift, Batch 5-6): anomaly-detection, clustering
(already rich, needs symbol check), data-leakage, dimensionality-reduction, feature-engineering,
interpretability, supervised-learning, unsupervised-learning.

## Round 26 (Classical ML Batch 5-6 — section 03 COMPLETE)

Lifted the final 8 pages with the same recipe (concept-first, math as support, named
symbols, keep Python demo, add one reference table). Reordered each concept-before-math by
swapping the Intuition section above the math and renaming both headings; removed the now-
redundant leftover Intuition on dimensionality-reduction and unsupervised-learning.

- supervised-learning: What a supervised model learns (+ loss->estimates table) / The
  learning objective.
- feature-engineering: Why representation matters (+ transforms table) / The feature map.
- data-leakage: What leakage does (+ leakage-sources->fix table) / The clean vs leaky estimate.
- interpretability: Why interpret a model (+ methods scope table) / Measuring feature importance.
- anomaly-detection: What counts as an anomaly (+ method-families table) / Scoring and flagging.
- dimensionality-reduction: What to preserve (+ methods table) / Linear projection and PCA.
- unsupervised-learning: Structure without labels (+ task-types table) / Common objectives.
- clustering: already at bar (5 SVGs, per-algorithm numbered procedures, named symbols) — promoted.

Promoted all 8 review->complete. SECTION 03 NOW COMPLETE: 23/24 pages complete (only
index.md, an area-index, stays review by design). Wiki-wide complete 128 -> 136.
Validation 482 pages/0 warnings; links, portability, footers all pass.

Section-03 SVGs authored this effort (all rendered+verified+registered in scss dark-mode
list): logistic-regression-sigmoid, linear-models-least-squares-fit, regression-r-squared-fit,
bias-variance-u-curve, regularization-l1-l2-geometry, cv-kfold-splits, svm-margin-hyperplane.
(Tree-page plots decision-tree-split / random-forest-bootstrap / gradient-boosting-stages
were authored by the user.)

## Round 27 (Deep Learning chapter — batches A+B started)

Started section 06 (28 content pages) with the Classical-ML recipe. Note: the DL chapter's
generic heading is `## Defining math` (the earlier de-genericizing pass only caught
Mechanism/Concrete-artifact/Defining-mechanism, not "Defining math"), so ~21 DL pages lead
with it. These pages are already strong (good Python worked examples, several SVGs); the main
lift is concept/algorithm-first heading + a comparison table + symbol naming.

Batch A DONE + promoted: backpropagation (restructured algorithm-first: How it works 2-pass
steps + Mermaid moved up / The chain rule organized), loss-functions (Choosing a loss table /
The loss formulas), optimizers (What an optimizer does table / The update rules),
activation-functions (What activations do table / Common activations), neural-network-
fundamentals (already concept-led, promoted).

Batch B DONE + promoted: multilayer-perceptrons (Defining math -> The MLP computation),
initialization (-> Scaling rules + Xavier/He table), normalization (-> Standardize then scale
and shift + batch/layer table), regularization (-> Ways to regularize table + Weight decay and
dropout), vanishing-and-exploding-gradients (-> The Jacobian product).

Section 06 now 10 complete / 19 review. Validation 482 pages/0 warnings.

REMAINING section-06 pages (still have Defining math/Mechanism, or need a symbol/promote check):
transfer-learning, residual-connections, convolutional-neural-networks, contrastive-learning,
autoencoders, mixed-precision, attention, recurrent-neural-networks, self-supervised-learning,
generative-adversarial-networks, fine-tuning, multimodal-learning, representation-learning
(13 with Defining math) PLUS already-descriptive-heading pages to verify+promote: transformers,
pytorch, distributed-training, tensorflow-and-keras, lstm-and-gru (mixed-precision has a
Defining-mechanism deeper in it). User smoothed bias-variance-u-curve.svg (polyline->bezier).

## Round 28 (Deep Learning Batch C — architecture cluster)

- convolutional-neural-networks: algorithm-first (How a CNN works: convolve/activate/reduce/
  stack + Mermaid moved up / The convolution operation with named symbols).
- attention: How attention works (query/key/value 3-step) / scaled dot-product math + named Q,K,V,d_k.
- recurrent-neural-networks: How a recurrent network works (carry hidden state) + recurrence math.
- transformers: already complete-quality (Attention mechanism 7-step + SVG + Mermaid + history) — promoted as-is.
- lstm-and-gru: already complete-quality (The Problem They Solve + SVG + gate tables) — promoted as-is.

Section 06 now 15 complete / 14 review. Validation 482 pages/0 warnings.

REMAINING section-06 (14): residual-connections, autoencoders, contrastive-learning,
generative-adversarial-networks, representation-learning, self-supervised-learning,
transfer-learning, fine-tuning, multimodal-learning (concept pages, mostly Defining math),
plus systems/framework pages mixed-precision, distributed-training, pytorch,
tensorflow-and-keras (some already have descriptive first headings — verify+promote).

## Round 29 (Computer Vision chapter — COMPLETE)

Section 09 (23 content pages) lifted with the recipe. CV was the least-illustrated chapter
(mostly prose + Python, ~no diagrams), so added tables + one new SVG.

- image-classification: added CV-task comparison table (classification/detection/semantic/
  instance seg) + renamed Defining math -> Scores, softmax, and cross-entropy.
- detection-and-segmentation-metrics: NEW detection-iou-overlap.svg (rendered+verified+
  registered) + renamed -> IoU, Dice, and average precision.
- vision-transformers: added CNN-vs-ViT table + renamed -> Patches to tokens.
- domain-shift: added shift-types table (covariate/label/concept) + renamed.
- Renames on semantic-segmentation, classical-image-processing, cnn-architectures,
  data-augmentation, content-based-image-retrieval, rotated-object-detection, mri-segmentation.
- Already-descriptive (from round 23 de-genericizing), verified + promoted: object-detection,
  instance-segmentation, image-representation, feature-extraction, model-benchmarking,
  pose-estimation, synthetic-data, ocr-pipelines, document-image-analysis, mri-classification,
  medical-image-analysis.

FIXED a real LaTeX bug: self-supervised-visual-learning NT-Xent had malformed \frac
(missing { before \sum, extra }) that would fail KaTeX rendering. Also caught+fixed a
prettier-mangled table in domain-shift (trailing sentence absorbed into a cell -> separated
with blank line).

All 23 promoted review->complete. Wiki complete 164 -> 187. Validation 482 pages/0 warnings.
Three chapters now complete to the concept-page bar: 03 Classical ML, 06 Deep Learning,
09 Computer Vision.

## Round 30 (NLP chapter — COMPLETE)

Section 08 (18 content pages). All already had descriptive concept-first headings from the
round-23 de-genericizing pass, so this was mostly verify + add high-value comparison tables +
promote. Added tables: embeddings (static/contextual/sentence types), bert-style-encoders
(encoder vs decoder), language-modelling (autoregressive vs masked), tokenization (word/subword/
byte granularity), named-entity-recognition (BIO tag scheme), evaluation-of-nlp-systems
(metric-by-task). All 18 verified to have worked example + caveats + references (information-
extraction is a schema page whose 4 tables are its worked content). Promoted all 18
review->complete. Wiki complete 187 -> 205. Validation 482 pages/0 warnings.

FOUR chapters now complete to the concept-page bar: 03 Classical ML, 06 Deep Learning,
09 Computer Vision, 08 NLP.

## Round 31-32 (Prob-Stats + Information Retrieval — COMPLETE)

Section 02 Probability & Statistics (21 pages): already fully at the bar from earlier work
(concept-first headings, named symbols, 8 SVGs, worked examples, caveats, refs). Pure
verify + promote, no content changes. random-walks uses "Connections and caveats" (combined).

Section 12 Information Retrieval (17 pages): mostly de-genericized already; 4 renamed
(tf-idf -> TF-IDF weighting; bm25 -> The BM25 scoring function; dense-retrieval -> Dual-encoder
scoring; ranking-and-retrieval-metrics -> Precision, recall, and ranked metrics). Added a
lexical-vs-dense-vs-hybrid comparison table on dense-retrieval. Promoted all 17.

Wiki complete 226 -> 243. Validation 482 pages/0 warnings.

SEVEN chapters now complete: 02 Prob-Stats, 03 Classical ML, 06 Deep Learning, 08 NLP,
09 Computer Vision, 12 Information Retrieval (+ 01 math, 05 forecasting, 07 RL, 14 MLOps
done earlier = 11 sections at complete).

## Round 33-34 (Generative AI + Recommendation Systems — COMPLETE)

Section 11 Generative AI (53 pages): already the most-worked section (round 11/20
de-rigidify). Renamed 5 stray Defining-math headings (embeddings->Embedding similarity,
language-model-architecture->Causal self-attention, quantization->Int8 quantization,
pretraining->Next-token pretraining, temperature-and-determinism->Temperature scaling).
harnesses uses Failure Modes, structured-output's caveat was folded to prose earlier (both OK).
Verify + promote all 53. Wiki complete 243->296.

Section 04 Recommendation Systems (34 pages): 30 still led with Defining math (chapter missed
the de-genericizing pass). Batch-renamed all 30 to content-specific headings (e.g.
matrix-factorization->The factorization objective, bandit-algorithms->UCB and Thompson
sampling, ranking->Pointwise/pairwise/listwise, truncated-svd->The rank-k approximation).
All had caveats+refs already. Promoted all 34. Wiki complete 296->330.

Validation 482 pages/0 warnings throughout. 14 sections now complete.

## Round 35 (Recommendation chapter — diagram enrichment)

Audited all 34 recsys pages against the concept-page bar: every page has concept-first
intro + named-symbol section + self-contained worked example (15 python, 19 hand-worked
tables) + caveats + refs — genuinely at classification.md's bar. Gap vs the richer
evaluation-metrics.md was diagrams (only matrix-factorization had SVGs). Added 3 new SVGs
(rendered+verified+registered) + 1 Mermaid:

- recsys-two-stage-funnel.svg -> retrieval-and-ranking-architectures (candidate gen -> ranking funnel)
- bandit-regret-curves.svg -> multi-armed-bandits (greedy linear vs eps-greedy/UCB sublinear)
- recsys-ranking-metrics.svg -> evaluation-of-recommenders (relevance list + precision@k + NDCG discount)
- Mermaid feedback cycle -> feedback-loops (model->recs->clicks->logs->model)
  Section 04 now 5 illustrated pages (was 1). Validation 482/0.

## Still open (next levers, not yet done)

- Remaining 10 undiagrammed pages in 11/13/14 are mostly implementation/reference
  (quantization, sql, dbt, bigquery, vector-databases, a-b-testing, docker,
  airflow, cost-and-latency-optimization, rag-benchmark-design) — lower diagram value.
- Diagrams in other sections (05, 12, 15, 06) if desired.
- Coverage: Cloud/Distributed (12) still thin.
- Lifecycle: define a "definition of done" rubric, then promote review→complete
  by section (462 pages still draft/review).
- External checker: add one retry for transient timeout/ECONNREFUSED flakes.

---

## Round 36 (2026-07-23): Sections 17 (Experimentation & Evaluation) + 18 (Responsible AI, Safety & Governance)

Both already concept-first (no "Defining math"), but shared template headings remained:

- Section 17: 11 pages shared "Defining statistics/metric/checks/artifact/comparison".
  Renamed content-specific, e.g. a-b-testing "Sample size and the test statistic",
  abstention "Coverage and selective risk", statistical-significance "The two-proportion
  z-test", golden-datasets "Anatomy of a golden row", online-experiments "Estimand and
  treatment effect", offline-evaluation "Task-matched metrics", human-evaluation
  "Inter-rater agreement", llm-as-judge "Judge-human agreement", paired-evaluation
  "Per-example differences", calibration "Calibration error", comparing-... "Shared and
  system-specific metrics".
- Section 18: 3 pages shared "Control mechanism" -> compliance "The compliance register",
  governance-of-... "Change classes and evidence depth", human-oversight "Oversight
  requirements"; fairness "Defining metrics" -> "Group fairness metrics".

Audited every page (30): all concept-first + named symbols + a self-contained worked
example (a-b-testing hand calc n~=10,330; fairness python group-rate demo; prompt-injection
YAML regression test; the rest tables/python). Promoted all 30 review->complete,
last_reviewed 2026-07-23. Section indexes left at review (no consistent promote convention).

Tooling fix: validate-content.mjs `complete page contains placeholder text` check matched
the bare word "placeholder", a false positive on pii-protection.md (legitimate PII-masking
term; the word appears only there, never as a stub marker). Tightened regex to
`\bTODO\b|\bTBD\b|\bFIXME\b|\[placeholder\]|placeholder text` (self-tested: still catches
real stubs, passes legitimate "typed placeholders"). Validation now 482/0 with no ERROR.

Wiki-wide status after round 36: 360 complete / 122 review.

---

## Round 37 (2026-07-23): Sections 13 (Data Engineering) + 15 (Cloud & Distributed Systems)

Section 13 pages were already rich (concrete SQL/YAML/DDL artifacts, e.g. sql.md is a deep
929-word page with 7 code blocks) but carried a rigid "<noun> mechanism / contract / artifact"
template heading. Renamed 14 to content-specific, e.g. sql "The logical query pipeline",
data-quality "Expectations as queries", relational-modelling "Keys and constraints",
data-warehouses "Raw, staging, and marts", feature-pipelines "Point-in-time correctness",
reproducibility "A reproducibility manifest", dbt "A dbt model", bigquery "Partitioned and
clustered DDL" (+ its 2nd "Query mechanism" -> "Columnar, serverless execution").

Section 15 already descriptive (Little's Law, roofline model, SLIs/SLOs, data-parallel).
Renamed 3 template headings: managed-compute "Matching workload to compute", aws-/gcp-
fundamentals "A batch training path" / "A data and ML path". Added a 6-type storage
comparison table (object/block/file/warehouse/database/cache -> access pattern + good/poor
fit) to managed-storage, which promised all six in its intro but only detailed object stores.

Every page verified to have a concrete artifact (code/table/mermaid/worked math) + failure
modes + refs. Promoted all 30 review->complete, last_reviewed 2026-07-23. Indexes left review.
Validation 482/0; links/portability/footers ok.

Wiki-wide status after round 37: 390 complete / 92 review.

---

## Round 38 (2026-07-23): Section 10 (Video Understanding)

20 pages, already largely concept-first with worked examples (tables or Python) throughout.
Renamed 3 residual generic headings: temporal-localization + optical-flow "Defining math"
-> "Temporal IoU and mAP" / "Brightness constancy"; v-jepa-2-versus-vision-language-models
"Defining distinction" -> "Latent prediction versus token generation".

Video is a visual domain but had 0 Mermaid and only optical-flow had an SVG. Added 3
node-only Mermaid architecture diagrams (edge-label-free per the known constraint):

- two-stream-models: RGB->appearance / flow->motion -> late fusion -> prediction
- temporal-action-recognition: frame features -> encoder -> temporal aggregation -> classifier
- world-models: observation -> encoder -> latent + action -> dynamics -> predicted latent -> decoder

Verified worked examples on the renamed/table pages (optical-flow Lucas-Kanade Python w/
SVG; temporal-localization tIoU/mAP; two-stream late-fusion table; world-models latent
rollout). Promoted all 20 review->complete, last_reviewed 2026-07-23. Index left review.
Validation 482/0; links/portability/footers ok.

Wiki-wide status after round 38: 410 complete / 72 review.

---

## Round 39 (2026-07-23): Depth pass on chapters 06 + 10 (user Q: match transformers.md?)

User asked whether ch10/ch06 pages match the depth of the flagship transformers.md
(~1481w: 7-step walkthrough, symbol-named FFN, History-and-adoption section, SVG+Mermaid,
10 refs). Honest assessment: no, and mostly by design -- transformers.md is a deliberate
hub; most pages sit at the concise ~400-500w bar, which is correct. But some anchor pages
were thin relative to their conceptual weight. User chose "diagrams + flagship-lift 3-4
pages" and (mid-turn) "no new Python unless very valuable" -- so this round adds diagrams +
prose walkthroughs + adoption context + refs, no code.

Flagship-lifted 4 central pages:

- neural-network-fundamentals: added "The forward and backward pass" 4-step walkthrough +
  forward/backprop/optimizer Mermaid + Nielsen ref.
- recurrent-neural-networks: added unrolled-RNN Mermaid + "History and adoption" (Elman ->
  LSTM/GRU -> seq2seq -> attention -> transformers) + Elman 1990 & Cho 2014 GRU refs.
- convolutional-neural-networks: added "Architectural lineage" (LeNet -> AlexNet -> VGG ->
  GoogLeNet -> ResNet -> ViT) + LeCun 1998 & Krizhevsky 2012 refs (already had walkthrough+Mermaid).
- video-transformers: added "From clip to tokens" 5-step walkthrough + tokenization Mermaid +
  "History and adoption" (ViT -> TimeSformer -> ViViT -> video-language).

Diagram-only on 3 anchor pages:

- vanishing-and-exploding-gradients: authored vanishing-exploding-gradients.svg (log-scale
  gradient-norm-vs-depth, 3 regimes as straight lines; rendered+verified+registered in
  custom.scss; fixed right-edge label clip by moving to a top-left legend).
- video-representation: frames -> encoder -> embeddings -> mean+delta -> clip vector Mermaid.
- spatial-and-temporal-modelling: spatial-per-frame -> features -> temporal model Mermaid.

Net new visuals: 5 Mermaid + 1 SVG. All node-only Mermaid (no edge labels). No pages
promoted (all were already complete). Validation 482/0; links/portability/footers ok.

---

## Round 40 (2026-07-23): Section 16 (Software Engineering)

Section 16 had 15 non-index pages still at review. All already had concrete artifacts
(Python/JavaScript snippets, SQL, Mermaid, or small review tables), caveats/failure modes,
references, and purposeful cross-links, so this was a concise quality pass rather than a
prose expansion.

Promoted all 15 non-index pages review->complete, last_reviewed 2026-07-23. Index left at
review per convention. Replaced residual generic/template headings:

- api-design: Contract Mechanism -> Resource, schema, and error contracts; Executed Artifact
  -> Validated request schema.
- behaviour-driven-development: Contract Form -> Given, when, then scenarios; Executed
  Artifact -> Executable scenarios.
- code-review: Review Contract -> Blockers, preferences, and semantic risk; Worked Review
  -> Worked review case.
- documentation/python/javascript/software-architecture/production-integration/
  requirements-engineering/technical-decision-records/testing/web-backends: renamed
  contract/mechanism/artifact/test-layer headings to page-specific ones.
- Normalized Failure Modes / Service Boundary capitalization where touched.

Validation: prettier unchanged; content validation 482 pages/0 warnings; links ok;
portability ok; nav footers up to date. Current status counter in this workspace:
425 complete / 56 review / 1 draft / 1 stub.

Follow-up enrichment: added two node-only Mermaid diagrams where the process structure earned
an illustration:

- web-backends: request pipeline from schema validation through authorization, domain work,
  SQL/jobs/model calls, error mapping, telemetry, and stable response.
- production-integration: launch flow from contract through shadow/canary, metrics gate,
  continue rollout or rollback, then incident review.

Validation repeated: prettier unchanged; content validation 482 pages/0 warnings; links ok;
portability ok; nav footers up to date.

---

## Round 41 (2026-08-05): Tracked content-operations layer

Adopted the useful part of the LLM-wiki architecture: stable operating rules now travel
with the repo, while disposable prompts stay local-only. Added tracked
`docs/CONTENT_OPERATIONS.md` documenting the three layers (`content/`, tracked operating
schema, gitignored `docs/prompts/` workbench), the agent workflow, validation gates, and the
single-maintained-ledger policy.

Moved the maintained progress ledger from ignored `docs/prompts/review_2026-07-14.md` to
tracked `docs/archive/current-content-progress-ledger.md`. Updated `docs/README.md`,
`docs/MAINTENANCE.md`, `docs/archive/README.md`, `.gitignore`, and the local ignored
flagship prompt reference so future agents append here rather than to an ignored path.

Validation: content validation 484 pages/0 warnings; links ok; portability ok; nav footers
up to date; `git diff --check` clean.

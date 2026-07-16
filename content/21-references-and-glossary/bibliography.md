---
title: Bibliography
slug: references-and-glossary/bibliography
description: Human-readable index of centralized bibliography entries used by topic pages.
area: references-and-glossary
topics:
  - "references"
  - "bibliography"
  - "citations"
level: foundational
status: review
page_type: reference
aliases:
  - "Reference keys"
prerequisites: []
related:
  - "glossary.md"
  - "references.md"
  - "further-reading.md"
  - "acronyms.md"
historical_context: false
last_reviewed: 2026-07-11
---

# Bibliography

The machine-readable bibliography lives at `references/bibliography.yml`. Topic pages may list keys in front matter under `references`; validation fails if a key does not exist. Use [references](references.md) for source policy and [further reading](further-reading.md) for study routes.

## How bibliography keys work

Each key is stable, lowercase, and portable. A content page can reference a key in YAML front matter, while the human-readable `## References` section can explain why that source matters. This keeps source validation separate from prose and leaves [glossary](glossary.md) pages focused on terminology.

## Current key groups

- Linear algebra and matrix factorization: `golub-van-loan-matrix-computations`, `eckart-young-1936-low-rank`, `koren-bell-volinsky-2009-matrix-factorization`, `hu-koren-volinsky-2008-implicit-feedback`.
- Forecasting: `box-jenkins-reinsel-ljung-2015-time-series`.
- Generative AI and tool use: `openai-function-calling-docs`, `openai-text-generation-docs`, `openai-structured-outputs-docs`.
- V-JEPA and world models: `assran-2025-vjepa2`, `bardes-2024-vjepa`, `lecun-2022-autonomous-machine-intelligence`, `dawid-lecun-2023-lvebm`.
- Evaluation and governance: `nist-ai-rmf-2023`, `kohavi-tang-xu-2020-trustworthy-online-experiments`.
- Software engineering: `martin-2017-clean-architecture`, `iso-25010-2011`.

## Adding a source

1. Add the structured entry to `references/bibliography.yml`.
2. Use a stable key such as `author-year-topic`.
3. Include type, title, authors, year, and whether it is a primary source.
4. Add the key to page front matter under `references`.
5. Run content validation so missing or misspelled keys are caught.

## Source-quality guidance

Prefer primary papers, official documentation, standards, and authoritative books. Blog posts can be useful for implementation notes, but they should not replace primary sources for definitions, algorithms, or claims about model behavior.

> **Section — [References and Glossary](index.md):** ← [Metrics Glossary](metrics.md) · [References](references.md) →

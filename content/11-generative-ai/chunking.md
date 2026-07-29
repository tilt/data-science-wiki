---
title: Chunking
slug: generative-ai/chunking
description: "Splitting documents into retrievable units for RAG, citations, and context construction."
area: generative-ai
topics:
  - chunking
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - rag.md
  - retrieval-pipelines.md
  - context-construction.md
  - citations.md
  - vector-databases.md
historical_context: false
last_reviewed: 2026-07-29
---

# Chunking

Chunking decides the unit that [retrieval pipelines](retrieval-pipelines.md) can find and [context construction](context-construction.md) can pass to a model. In [RAG](rag.md), chunk boundaries often determine whether [citations](citations.md) support the generated claim. A good chunk is small enough to retrieve precisely and large enough to preserve the local meaning of the source.

## How a chunker maps a document

A chunker maps a document $D$ into ordered spans $(c_i, m_i)$, where $m_i$ stores source, heading, permissions, and version. Fixed token windows are simple, but heading-aware spans preserve local meaning. Overlap helps boundary cases but increases duplicate retrieval.

## Strategies

| Strategy             | How it splits                            | Strength                                   | Weakness                       |
| -------------------- | ---------------------------------------- | ------------------------------------------ | ------------------------------ |
| Fixed window         | every N tokens, optional overlap         | trivial, uniform sizes                     | splits mid-idea; boundary loss |
| Sentence / recursive | on sentence or paragraph breaks          | respects natural units                     | uneven sizes                   |
| Heading-aware        | keeps a heading with the text it governs | preserves local context, cleaner citations | needs document structure       |
| Semantic             | on shifts in embedding similarity        | coherent topical spans                     | costly, non-deterministic      |

Overlap of a few sentences between adjacent chunks helps answers that straddle a boundary, at the cost of some duplicate retrieval.

## Metadata belongs with the chunk

Every chunk should carry enough metadata to make retrieval and citation safe:

| Metadata                   | Why it matters                                              |
| -------------------------- | ----------------------------------------------------------- |
| `source_id` and `chunk_id` | stable citations and evaluation.                            |
| heading path               | preserves local meaning after extraction from the document. |
| version or valid date      | prevents stale policy from looking authoritative.           |
| permissions                | allows ACL filtering before retrieval.                      |
| text hash                  | detects source changes and supports re-indexing.            |
| neighboring chunk IDs      | supports expansion when the answer crosses a boundary.      |

## Worked chunking example

For a two-section policy document, heading-aware chunking keeps each heading with the paragraph it governs:

| Chunk | Text                                                                             | Why this boundary helps                                                     |
| ----: | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
|     1 | `# Refunds Refunds require receipt. Manager approval is required above 500 EUR.` | A later answer can cite the approval rule with the refund heading attached. |
|     2 | `# Shipping Standard shipping is five days.`                                     | Shipping facts do not contaminate refund retrieval.                         |

This boundary is more useful than a fixed window that might split the refund heading from the approval rule or merge refund and shipping facts into one retrieved passage.

## Realistic boundary failure

Bad fixed-window chunk:

```text
... Refunds require receipt. Manager approval is required
```

Next chunk:

```text
above 500 EUR. Finance approval is required above 5000 EUR. # Shipping ...
```

Neither chunk alone cleanly supports the claim "manager approval is required above 500 EUR." A heading-aware or sentence-aware chunk keeps the condition with the rule, making retrieval and citation validation easier.

## Evaluation

Evaluate chunking with retrieval tests, not visual inspection alone. For a set of questions, check whether an answer-bearing chunk is retrievable, whether its citation span is self-contained, and whether context packing can include it without excessive boilerplate. Rechunking should trigger re-embedding and regression tests because chunk IDs, retrieval scores, and citations may all change.

## Caveats

Tiny chunks lose context; huge chunks bury the answer and waste tokens. Overlap improves boundary recall but can produce duplicate chunks that crowd out diverse evidence. Rechunking changes vector IDs and can invalidate cached evaluations.

## References

- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [OpenAI API documentation: Embeddings](https://platform.openai.com/docs/guides/embeddings)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Embeddings](embeddings.md) [Vector Databases →](vector-databases.md)

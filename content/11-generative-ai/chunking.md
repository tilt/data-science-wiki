---
title: Chunking
slug: generative-ai/chunking
description: "Splitting documents into retrievable units for RAG, citations, and context construction."
area: generative-ai
topics:
  - chunking
level: foundational
status: review
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
last_reviewed: 2026-07-11
---

# Chunking

Chunking decides the unit that [retrieval pipelines](retrieval-pipelines.md) can find and [context construction](context-construction.md) can pass to a model. In [RAG](rag.md), chunk boundaries often determine whether [citations](citations.md) support the generated claim.

## Mechanism

A chunker maps a document $D$ into ordered spans $(c_i, m_i)$, where $m_i$ stores source, heading, permissions, and version. Fixed token windows are simple, but heading-aware spans preserve local meaning. Overlap helps boundary cases but increases duplicate retrieval.

## Worked chunking example

For a two-section policy document, heading-aware chunking keeps each heading with the paragraph it governs:

| Chunk | Text                                                                             | Why this boundary helps                                                     |
| ----: | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
|     1 | `# Refunds Refunds require receipt. Manager approval is required above 500 EUR.` | A later answer can cite the approval rule with the refund heading attached. |
|     2 | `# Shipping Standard shipping is five days.`                                     | Shipping facts do not contaminate refund retrieval.                         |

This boundary is more useful than a fixed window that might split the refund heading from the approval rule or merge refund and shipping facts into one retrieved passage.

## Caveats

Tiny chunks lose context; huge chunks bury the answer and waste tokens. Rechunking changes vector IDs and can invalidate cached evaluations.

## References

- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [OpenAI API documentation: Embeddings](https://platform.openai.com/docs/guides/embeddings)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Embeddings](embeddings.md) [Vector Databases →](vector-databases.md)

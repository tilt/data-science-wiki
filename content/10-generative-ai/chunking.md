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

## Executed artifact

```python
doc = """# Refunds
Refunds require receipt. Manager approval is required above 500 EUR.
# Shipping
Standard shipping is five days."""
chunks = []
current = []
for line in doc.splitlines():
    if line.startswith("# ") and current:
        chunks.append(" ".join(current))
        current = [line]
    else:
        current.append(line)
chunks.append(" ".join(current))
print("CHUNKING")
print(chunks)
```

Observed output:

```text
CHUNKING
['# Refunds Refunds require receipt. Manager approval is required above 500 EUR.', '# Shipping Standard shipping is five days.']
```

The executed splitter kept each heading with its paragraph, so a later answer can cite the refund rule without mixing it with shipping.

## Caveats

Tiny chunks lose context; huge chunks bury the answer and waste tokens. Rechunking changes vector IDs and can invalidate cached evaluations.

## References

- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [OpenAI API documentation: Embeddings](https://platform.openai.com/docs/guides/embeddings)

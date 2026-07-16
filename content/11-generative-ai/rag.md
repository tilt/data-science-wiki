---
title: RAG
slug: generative-ai/rag
description: "Retrieval-augmented generation that conditions model output on external evidence."
area: generative-ai
topics:
  - rag
level: foundational
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - retrieval-pipelines.md
  - chunking.md
  - embeddings.md
  - context-construction.md
  - citations.md
  - rag-architecture-comparison.md
historical_context: false
last_reviewed: 2026-07-11
---

# RAG

Retrieval-augmented generation retrieves external evidence and places it into the model request before generation. It is the pattern connecting [chunking](chunking.md), [embeddings](embeddings.md), [retrieval pipelines](retrieval-pipelines.md), [context construction](context-construction.md), and [citations](citations.md). The same pattern can be built as several designs — a tool-based loop, an indexed hybrid retriever, or a two-phase curation agent — compared in [RAG architecture comparison](rag-architecture-comparison.md).

## Mechanism

A common RAG path is: ingest documents, split them into chunks, embed and index those chunks, rewrite or normalize the user query, retrieve candidates, rerank them, pack selected evidence into context, generate an answer, and validate citations. In probabilistic notation, the answer is generated from both the request $x$ and retrieved evidence $d$:

$$
p(y \mid x, d).
$$

That notation hides the engineering risk: $d$ is not guaranteed to contain the answer. RAG quality depends on each upstream stage, not only on the final model.

## Concrete artifact

```mermaid
flowchart TD
  Question[Question] --> Rewrite["Rewritten query: enterprise refund threshold policy 2026"]
  Rewrite --> Retrieved["Retrieved chunks: refunds-007, approvals-014, stale-refunds-002"]
  Retrieved --> Reranked["Reranked context: refunds-007, approvals-014"]
  Reranked --> Answer[Answer with source IDs]
  Answer --> Validator[Citation validator checks factual claims]
```

This trace is useful because each stage can be evaluated separately with [rag evaluation](rag-evaluation.md). If the answer is wrong, the team can inspect whether retrieval missed the right document, reranking chose stale evidence, context packing dropped the key sentence, or generation ignored the source.

## Caveats

RAG does not guarantee truth. Retrieval can miss the answer, stale indexes can retrieve obsolete policy, and the model can ignore the evidence. RAG is also the main place where [prompt injection](prompt-injection.md) enters through untrusted documents, so retrieved text should be treated as data, not instructions.

## References

- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [Karpukhin et al., 2020, Dense Passage Retrieval](https://arxiv.org/abs/2004.04906)
- [OpenAI API documentation: Embeddings](https://platform.openai.com/docs/guides/embeddings)

> **Learning path — Generative AI systems:** ← [Retrieval Pipelines](retrieval-pipelines.md) · [path overview](../00-home-and-navigation/learning-paths.md#generative-ai-systems) · [Tool Use and Function Calling](tool-use-and-function-calling.md) →

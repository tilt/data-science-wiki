---
title: Embeddings
slug: generative-ai/embeddings
description: Concise guide to Embeddings in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - embeddings
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

In generative-AI systems, embeddings are vector representations used for retrieval, memory, routing, clustering, and similarity search around foundation models. They are infrastructure for context construction, not the generated answer itself.

## System role

A RAG system embeds documents and queries, retrieves nearby chunks, and passes selected context to a generator. Agent systems may embed memories, tool descriptions, or past interactions for later recall.

## Mechanism

An embedding model maps an object $x$ to a vector:

$$
e = f_\theta(x) \in \mathbb{R}^d.
$$

Similarity search then compares vectors, often with cosine similarity:

$$
\operatorname{cos}(a,b)=\frac{a^\top b}{\lVert a\rVert \lVert b\rVert}.
$$

For retrieval, the system embeds the query and retrieves corpus vectors with high similarity. The embedding objective determines what "near" means, so a model trained for semantic search may behave differently from one trained for classification, clustering, or code retrieval.

## Example

A policy assistant embeds handbook sections. When a user asks about parental leave, the query embedding retrieves relevant chunks before generation. The answer quality depends on chunking, embedding model, index freshness, and reranking.

## Failure modes

Embedding retrieval can miss exact constraints, over-retrieve semantically similar but wrong passages, collapse distinct entities with similar language, or behave poorly after domain changes. Use lexical search, reranking, and evaluation sets for critical systems.

---
title: RAG
slug: generative-ai/rag
description: Concise guide to RAG in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - rag
level: intermediate
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# RAG

## Summary

Retrieval-augmented generation combines search with model generation. The system retrieves external evidence and gives it to the model so answers can be grounded in current or private sources.

## Mechanism

A RAG system composes several functions:

$$
c_{1:k} = R(q, D),
$$

$$
a = G(q, c_{1:k}, s),
$$

where $R$ retrieves the top evidence chunks $c_{1:k}$ from corpus $D$ for query $q$, and generator $G$ produces answer $a$ conditioned on the query, retrieved context, and system instructions $s$.

The main design question is where errors enter: document ingestion, chunking, embedding, lexical retrieval, reranking, context construction, generation, citation, or abstention. A correct answer requires both relevant evidence and a generator that uses that evidence faithfully.

## Step-by-step example

For a handbook assistant, index policy documents, retrieve relevant chunks, construct source-labeled context, answer only from that context, and cite supporting passages.

## Common failure modes

- Retrieving plausible but wrong chunks and giving the model no way to abstain.
- Evaluating only final prose instead of retrieval recall, context precision, citation support, and answer correctness.
- Ignoring document permissions, corpus freshness, index versioning, and rollback of bad knowledge-base updates.

---
title: Tokenization
slug: generative-ai/tokenization
description: Concise guide to Tokenization in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - tokenization
level: foundational
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

In generative-AI systems, tokenization determines context usage, cost, truncation behavior, and how prompts, retrieved chunks, tool schemas, and generated outputs are represented.

## System role

Hosted language models usually price and limit requests by tokens. A prompt with long documents, verbose tool schemas, or repeated conversation history can consume the context window before the user question is answered.

## Example

A support assistant may retrieve five document chunks. If tokenization shows the chunks consume most of the window, the system may need shorter chunks, reranking, summarization, or stricter context selection.

## Failure modes

Token counts can surprise users because tokens are not words. Code, tables, rare terms, and non-English text may tokenize differently. Truncation can silently remove instructions or evidence.

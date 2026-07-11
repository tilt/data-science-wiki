---
title: Semantic Textual Similarity
slug: natural-language-processing/semantic-textual-similarity
description: Concise guide to Semantic Textual Similarity in Natural Language Processing.
area: natural-language-processing
topics:
  - semantic-textual-similarity
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
# Semantic Textual Similarity

## Summary

Semantic textual similarity measures whether two text units mean the same or similar things, even if they use different words. It is often implemented with embeddings or cross-encoders.

## Step-by-step example

"Cancel my plan" and "terminate my subscription" should be close for support search even though only one word overlaps.

## Common failure modes

- Training Semantic Textual Similarity on ambiguous labels or annotation rules that annotators apply inconsistently.
- Evaluating only clean examples while long, multilingual, noisy, or domain-specific text fails.
- Ignoring entity, span, or document-level errors because the aggregate metric looks acceptable.

- Domain shift in vocabulary, style, language, or document structure.
- Evaluating surface form while missing semantic correctness or downstream utility.

## Mechanism

A common baseline embeds two texts as vectors $u$ and $v$ and compares cosine similarity:

$$
\operatorname{cos}(u,v)=\frac{u^\top v}{\lVert u\rVert \lVert v\rVert}.
$$

Cross-encoders can model richer pairwise interactions, but they are slower because they score each text pair jointly.

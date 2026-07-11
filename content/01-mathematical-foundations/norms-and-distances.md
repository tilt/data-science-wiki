---
title: Norms and Distances
slug: mathematical-foundations/norms-and-distances
description: Concise guide to Norms and Distances in Mathematical Foundations.
area: mathematical-foundations
topics:
  - norms-and-distances
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
# Norms and Distances

## Summary

Low-rank approximations, norms, and distances turn high-dimensional structure into measurable geometry. They are used to compress matrices, compare embeddings, regularize models, and reason about approximation error.

## Core idea

- A norm measures vector or matrix size; a distance measures separation between objects.
- Low-rank approximation keeps dominant structure while discarding smaller components as noise or detail.
- The chosen norm or distance must match the meaning of error in the application.

## Worked example

For document embeddings, cosine distance may group paraphrases better than Euclidean distance. For a ratings matrix, a low-rank approximation can reveal broad taste factors while losing rare niche preferences.

## Caveats

- Check limiting cases, units, signs, and normalization constants.
- Connect the formula to a small numerical example.
- Identify when the result depends on convexity, differentiability, orthogonality, or conditioning.
- Note the computational cost and numerical stability issues.

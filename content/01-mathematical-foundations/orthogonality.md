---
title: Orthogonality
slug: mathematical-foundations/orthogonality
description: Concise guide to Orthogonality in Mathematical Foundations.
area: mathematical-foundations
topics:
  - orthogonality
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

Orthogonality means vectors are perpendicular under an inner product. In data science, it signals independence of directions in a geometric sense, not necessarily statistical independence.

## Definition

Two vectors $u$ and $v$ are orthogonal when their dot product is zero:

$$
u^T v = 0.
$$

Orthogonal directions do not overlap in the coordinate system defined by the inner product.

## Example

In two dimensions, $[1,0]$ and $[0,1]$ are orthogonal. Moving along one direction does not change the coordinate on the other. In high-dimensional embeddings, near-orthogonal vectors have low cosine similarity.

## ML use

Orthogonality appears in PCA components, QR decompositions, regularization, numerical stability, and representation analysis. Orthogonal bases make projections easy because each coordinate can be handled independently.

## Practical caution

Orthogonality depends on the representation and scaling. Features can be orthogonal after preprocessing but still statistically or causally related in the real world.

## Caveats

A common mistake is treating low dot product as proof that concepts are unrelated. In sparse or high-dimensional spaces, many vectors can be nearly orthogonal by chance.

---
title: Classical SVD
slug: recommendation-systems/classical-svd
description: Concise guide to Classical SVD in Recommendation Systems and Personalization.
area: recommendation-systems
topics:
  - classical-svd
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

Classical SVD factorizes a fully observed matrix into singular vectors and singular values. In recommendation systems it is an important foundation, but it does not directly solve sparse user-item recommendation without adaptation.

## Core idea

The singular value decomposition is

$$
R = U \Sigma V^T.
$$

For a dense rating matrix $R$, the top singular components give a low-rank approximation. Users and items can be represented in a shared latent space derived from the matrix.

## Why recommendation is harder

Real user-item matrices are sparse: most users interact with only a tiny fraction of items. Filling missing entries with zeros changes the meaning of the data because "unknown" is not the same as "disliked". This is why recommender systems often use matrix factorization objectives defined only over observed or weighted interactions.

## Example

If a small dense movie-rating matrix is available, SVD can reveal latent taste directions. In production, the same intuition is usually implemented through explicit-feedback or implicit-feedback factorization rather than direct SVD on a filled matrix.

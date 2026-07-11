---
title: LOW Rank Approximation
slug: mathematical-foundations/low-rank-approximation
description: Concise guide to LOW Rank Approximation in Mathematical Foundations.
area: mathematical-foundations
topics:
  - low-rank-approximation
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

Low-rank approximation replaces a large or noisy matrix with a simpler matrix that captures its most important structure. It is used for compression, denoising, PCA, latent-factor models, and recommender systems.

## Core idea

A rank-$k$ approximation represents a matrix using only $k$ latent directions. For many datasets, most useful variation lies in a lower-dimensional subspace, while smaller directions capture noise or fine detail.

## Example

A user-item rating matrix may have thousands of items but only a smaller number of preference dimensions, such as genre, price sensitivity, or brand affinity. A low-rank model approximates each user and item with latent vectors and reconstructs scores from their dot product.

## SVD connection

The singular value decomposition writes

$$
A = U \Sigma V^T.
$$

Keeping only the largest $k$ singular values gives the best rank-$k$ approximation under common matrix norms. This is the mathematical basis for PCA-style compression.

## Caveats

Low rank is an assumption. It can erase rare but important patterns, underfit diverse populations, and perform badly when missing data is not random.

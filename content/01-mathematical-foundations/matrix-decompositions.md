---
title: Matrix Decompositions
slug: mathematical-foundations/matrix-decompositions
description: Concise guide to Matrix Decompositions in Mathematical Foundations.
area: mathematical-foundations
topics:
  - matrix-decompositions
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

Matrix decompositions factor a matrix into simpler matrices that expose geometry, rank, variance, or computational structure. They are core tools for PCA, least squares, recommender systems, numerical stability, and compression.

## Core idea

A decomposition rewrites a matrix without changing the underlying linear transformation. The new form can make certain operations easier: solving systems, finding principal directions, measuring rank, or approximating the matrix with fewer components.

## Common decompositions

- LU and QR help solve linear systems.
- Eigen decomposition exposes invariant directions of square matrices.
- Singular value decomposition works for rectangular matrices and orders directions by singular value.
- Cholesky decomposition factors positive-definite matrices and is common in Gaussian models.

## Example

The singular value decomposition writes

$$
A = U \Sigma V^T.
$$

Large singular values capture dominant structure. Keeping only the top components gives a low-rank approximation used in PCA and compression.

## Caveats

Decompositions are sensitive to scaling, missing values, and numerical conditioning. A mathematically valid factorization may not have a meaningful interpretation unless the data representation is appropriate.

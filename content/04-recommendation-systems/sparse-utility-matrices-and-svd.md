---
title: Sparse Utility Matrices and Ordinary SVD
slug: recommendation-systems/sparse-utility-matrices-and-svd
description: Why ordinary SVD is a poor direct fit for sparse recommender utility matrices.
area: recommendation-systems
topics:
  - "utility-matrices"
  - "matrix-factorization"
  - "sparse-data"
level: intermediate
status: draft
page_type: concept
aliases:
  - "Sparse utility matrix SVD"
  - "Why SVD fails for sparse recommender matrices"
prerequisites:
  - "matrix-factorization.md"
  - "../01-mathematical-foundations/singular-value-decomposition.md"
related:
  - "svd-versus-matrix-factorization.md"
  - "implicit-feedback.md"
  - "alternating-least-squares.md"
historical_context: false
last_reviewed: 2026-07-11
references:
  - "koren-bell-volinsky-2009-matrix-factorization"
  - "hu-koren-volinsky-2008-implicit-feedback"
---
# Sparse Utility Matrices and Ordinary SVD

## Summary

Ordinary SVD assumes a complete matrix. Recommender utility matrices are sparse because most user-item pairs are unobserved, not because their true preference is zero.

## Missing values versus zeros

In a ratings matrix, a missing cell can mean:

- the user never saw the item,
- the item was never exposed,
- the system did not log the event,
- the user had no opportunity to express preference.

That is different from an explicit zero or one-star rating. Treating missing as zero adds a strong negative signal that was not observed.

## Why zero filling is harmful

If a user rated 20 movies out of 50,000, zero filling creates 49,980 artificial negatives. The optimization problem becomes dominated by unobserved entries. Popularity, exposure, and catalogue size can overwhelm genuine preference structure.

## Mean centering and sparsity

Classical SVD workflows often center a complete matrix. With missing ratings, the mean itself is conditional on observed exposure. Centering over observed entries can help but does not remove the missing-data problem.

## Better recommender objectives

Explicit-feedback factorization usually minimizes error over observed ratings:

$$
\sum_{(u,i)\in\Omega}(r_{ui} - \hat r_{ui})^2
$$

Implicit-feedback variants model preference and confidence separately. Unobserved pairs may be low-confidence negatives, but they are not treated as equally meaningful zeros.

## When SVD can still be useful

SVD can be useful after a deliberate imputation strategy, for dense side-feature matrices, for item-content dimensionality reduction, or as a baseline when the missing-data assumptions are explicitly accepted.

## Interview practice

For a prototype answer and follow-up prompts, use [Why does ordinary SVD not directly work well on a sparse utility matrix in recommender systems?](../20-interview-preparation/sparse-utility-matrix-and-ordinary-svd.md). Keep this page as the canonical wiki explanation.

## References

- Primary: Koren, Bell, and Volinsky, "Matrix Factorization Techniques for Recommender Systems."
- Primary: Hu, Koren, and Volinsky, "Collaborative Filtering for Implicit Feedback Datasets."

---
title: Matrix Factorization for Recommender Systems
slug: recommendation-systems/matrix-factorization
description: Matrix Factorization for Recommender Systems overview and practical notes.
area: recommendation-systems
topics:
  - "matrix-factorization"
  - "latent-factor-models"
level: intermediate
status: review
page_type: model
aliases:
  - "Latent factor models"
  - "Funk SVD"
prerequisites: []
related: []
historical_context: false
last_reviewed: 2026-07-10
references:
  - "koren-bell-volinsky-2009-matrix-factorization"
---
# Matrix Factorization for Recommender Systems

## Summary

Recommender matrix factorization learns a vector for each user and a vector for each item. The predicted preference is usually a dot product $p_u^\top q_i$ plus optional bias terms. The vectors are latent factors: they are learned from behavior rather than hand-labelled as genres, price sensitivity, or expertise.

## Mathematical formulation

For explicit feedback over observed pairs $\Omega$:

$$
\min_{P,Q}
\sum_{(u,i)\in\Omega}
(r_{ui} - p_u^\top q_i)^2
+
\lambda
\left(
\lVert p_u\rVert_2^2 +
\lVert q_i\rVert_2^2
\right)
$$

## Intuition

The model does not need to fill every missing cell in the utility matrix. It optimizes the cells that were observed, or treats unobserved cells as low-confidence examples in implicit-feedback variants. Regularization keeps sparse users and rare items from receiving extreme factors.

## Worked example

Suppose the latent dimension is two. A user factor might become high on "technical depth" and low on "short casual content." An item factor for a detailed machine-learning article may point in the same direction, creating a high dot product. The model never names those dimensions; the interpretation comes from inspecting high-scoring users and items.

Training usually follows these steps:

1. Build the interaction matrix and choose explicit or implicit feedback.
2. Choose latent dimension, regularization, and loss.
3. Train with SGD, [ALS](alternating-least-squares.md), or a pairwise ranking objective.
4. Evaluate ranked recommendations for held-out interactions.
5. Add serving-time rules for freshness, diversity, eligibility, and safety.

## SVD versus recommender factorization

Classical [singular value decomposition](../01-mathematical-foundations/singular-value-decomposition.md) factorizes a complete matrix with orthogonality constraints. Recommender matrix factorization is usually an optimization problem over sparse observations. Missing user-item pairs are unknown, not zeros, which is why ordinary SVD on a zero-filled matrix often gives misleading factors.

## Related methods

- [Singular Value Decomposition](../01-mathematical-foundations/singular-value-decomposition.md)
- [Alternating Least Squares](alternating-least-squares.md)
- [Implicit Feedback](implicit-feedback.md)

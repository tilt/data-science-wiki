---
title: How does singular value decomposition differ from matrix factorization?
slug: interview-preparation/svd-versus-matrix-factorization
description: Interview prompt that links to the canonical SVD and matrix-factorization comparison.
area: interview-preparation
topics:
  - "interview-question"
  - "recommendation-systems"
  - "matrix-factorization"
level: intermediate
status: review
page_type: interview-question
aliases: []
prerequisites:
  - "../01-mathematical-foundations/singular-value-decomposition.md"
related:
  - "../04-recommendation-systems/svd-versus-matrix-factorization.md"
  - "../04-recommendation-systems/classical-svd.md"
  - "../04-recommendation-systems/matrix-factorization.md"
  - "../04-recommendation-systems/sparse-utility-matrices-and-svd.md"
  - "../01-mathematical-foundations/singular-value-decomposition.md"
  - sparse-utility-matrix-and-ordinary-svd.md
  - recommendation-systems.md
historical_context: false
last_reviewed: 2026-07-11
---
# How does singular value decomposition differ from matrix factorization?

## Answer

Classical SVD is a specific algebraic decomposition of a complete matrix, $A=U\Sigma V^\top$. Recommender matrix factorization is a broader modelling family that learns user and item factors from sparse observed interactions, often with biases, regularization, and an objective defined only on observed or confidence-weighted entries.

## What a strong answer adds

1. [Singular value decomposition](../01-mathematical-foundations/singular-value-decomposition.md) returns orthogonal singular vectors and ordered singular values for a fully specified matrix.
2. Recommender [matrix factorization](../04-recommendation-systems/matrix-factorization.md) estimates latent user and item vectors, usually by optimizing a loss over observed ratings or implicit events.
3. The core recommender issue is missing-value semantics: unobserved user-item pairs usually mean unknown or not exposed, not zero preference.
4. "Funk SVD" is interview shorthand for a recommender factorization model, not classical [SVD](../04-recommendation-systems/classical-svd.md).
5. This distinction matters for [evaluation](recommendation-systems.md): RMSE on observed ratings, top-k ranking quality, coverage, and cold-start behavior answer different questions.

## Interview artifact

Say the concrete version: "If a user rated 20 films out of 10,000, ordinary SVD needs values for the other 9,980 cells. Filling them with zero says the user disliked nearly the entire catalogue. Matrix factorization avoids that false label by optimizing on observed entries or using weak confidence for missing implicit feedback." Then link directly to the sibling prompt on [sparse utility matrices and ordinary SVD](sparse-utility-matrix-and-ordinary-svd.md).

## Common follow-ups

- **"Is SVD useless for recommenders?"** No. It is useful linear algebra and can be a baseline, but direct zero-filled SVD answers a different problem.
- **"Why not impute first?"** You can, but then the imputation model becomes part of the recommender and must be evaluated.
- **"What should production systems add?"** Bias terms, regularization, cold-start fallbacks, side features, ranking metrics, and online tests.

## Canonical links

Read the canonical comparison [SVD versus Matrix Factorization](../04-recommendation-systems/svd-versus-matrix-factorization.md), then [Sparse Utility Matrices and Ordinary SVD](../04-recommendation-systems/sparse-utility-matrices-and-svd.md) and [Matrix Factorization for Recommender Systems](../04-recommendation-systems/matrix-factorization.md).

## References

- [Koren, Bell, and Volinsky, 2009, Matrix Factorization Techniques for Recommender Systems](https://doi.org/10.1109/MC.2009.263)
- [scikit-learn documentation: TruncatedSVD](https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.TruncatedSVD.html)

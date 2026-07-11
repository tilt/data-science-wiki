---
title: SVD versus Matrix Factorization
slug: recommendation-systems/svd-versus-matrix-factorization
description: Topic-level comparison of singular value decomposition and recommender-system matrix factorization.
area: recommendation-systems
topics:
  - "matrix-factorization"
  - "collaborative-filtering"
  - "singular-value-decomposition"
level: intermediate
status: review
page_type: comparison
aliases:
  - "Singular Value Composition versus Matrix Factorization"
  - "SVD versus MF"
prerequisites:
  - "../01-mathematical-foundations/singular-value-decomposition.md"
  - "matrix-factorization.md"
related:
  - "sparse-utility-matrices-and-svd.md"
  - "collaborative-filtering.md"
  - "../01-mathematical-foundations/singular-value-decomposition.md"
historical_context: true
last_reviewed: 2026-07-11
references:
  - "golub-van-loan-matrix-computations"
  - "eckart-young-1936-low-rank"
  - "koren-bell-volinsky-2009-matrix-factorization"
---
# SVD versus Matrix Factorization

Classical SVD is a specific algebraic decomposition of a complete matrix. Recommender-system matrix factorization is a learned predictive model over observed interactions. They share a low-rank intuition, but they answer different questions.

| Axis | Classical SVD | Recommender matrix factorization |
| ---- | ------------- | -------------------------------- |
| Input | Complete numeric matrix | Sparse observed ratings or interactions |
| Objective | Decompose or approximate the matrix | Predict unobserved preferences or rank items |
| Factor constraints | Orthogonal singular vectors and ordered singular values | Learned user/item factors, often unconstrained |
| Missing values | Not directly handled | Central modelling issue |
| Typical formula | $A=U\Sigma V^\top$ | $\hat r_{ui}=\mu+b_u+b_i+p_u^\top q_i$ |
| Optimization | Deterministic decomposition for fixed $A$ | Loss minimization over observed or weighted entries |
| Best use | Linear algebra, compression, PCA-style approximation | Collaborative filtering and recommendation |

Pick classical SVD when the matrix is meaningful and complete enough for algebraic approximation. Pick recommender matrix factorization when missing entries mean unknown preference rather than zero. The interview version is [SVD versus matrix factorization](../20-interview-preparation/svd-versus-matrix-factorization.md).

## References

- Primary: Golub and Van Loan, _Matrix Computations_.
- Primary: Eckart and Young, "The approximation of one matrix by another of lower rank."
- Primary: Koren, Bell, and Volinsky, "Matrix Factorization Techniques for Recommender Systems."

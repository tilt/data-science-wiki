---
title: Singular Value Decomposition
slug: mathematical-foundations/singular-value-decomposition
description: Singular Value Decomposition overview and practical notes.
area: mathematical-foundations
topics:
  - "linear-algebra"
  - "matrix-decompositions"
  - "svd"
level: intermediate
status: draft
page_type: algorithm
aliases:
  - "SVD"
  - "Singular Value Composition"
prerequisites: []
related: []
historical_context: false
last_reviewed: 2026-07-10
references:
  - "golub-van-loan-matrix-computations"
  - "eckart-young-1936-low-rank"
---
# Singular Value Decomposition

## Summary

Singular value decomposition factorizes a real matrix $A \in \mathbb{R}^{m \times n}$ as:

$$
A = U \Sigma V^\top
$$

where $U$ and $V$ have orthonormal columns and $\Sigma$ contains non-negative singular values ordered by importance.

## Why it matters

SVD is a canonical matrix decomposition for geometry, dimensionality reduction, low-rank approximation, numerical linear algebra, PCA, information retrieval, and recommender-system baselines.

## Mathematical formulation

For rank $r$, the compact SVD is:

$$
A = \sum_{k=1}^{r} \sigma_k u_k v_k^\top
$$

The best rank-$k$ approximation in Frobenius norm is obtained by keeping the largest $k$ singular values.

## Implementation considerations

Dense SVD assumes a fully specified matrix. Sparse numerical SVD can exploit sparse storage, but the mathematical object is still a matrix whose missing values are not semantically unknown unless the modelling setup says so.

## Common misconceptions

- SVD is not the same thing as all matrix factorization.
- Recommender "Funk SVD" is not classical SVD; it is a learned latent-factor model optimized over observed interactions.
- Missing ratings are not zeros.

## References

- Primary: Golub, G. H. and Van Loan, C. F. _Matrix Computations_. Johns Hopkins University Press.
- Primary: Eckart, C. and Young, G. The approximation of one matrix by another of lower rank. _Psychometrika_, 1936.

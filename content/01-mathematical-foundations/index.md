---
title: Mathematical Foundations
slug: 01-mathematical-foundations
description: Index and learning map for Mathematical Foundations.
area: mathematical-foundations
topics:
  - "linear-algebra"
  - "vectors-and-matrices"
  - "matrix-multiplication"
  - "rank"
  - "orthogonality"
  - "eigenvalues-and-eigenvectors"
  - "matrix-decompositions"
  - "singular-value-decomposition"
  - "low-rank-approximation"
  - "norms-and-distances"
  - "calculus"
  - "gradients"
level: foundational
status: draft
page_type: area-index
aliases:
  - "Mathematical Foundations"
prerequisites:
  - "High-school algebra"
  - "Comfort with functions"
related:
  - "02-probability-and-statistics/index.md"
  - "06-deep-learning/index.md"
historical_context: false
last_reviewed: 2026-07-10
---

# Mathematical Foundations

## Summary

Mathematical foundations supplies the notation and mechanisms used throughout the wiki. Linear algebra explains data as vectors, matrices, projections, ranks, and decompositions. Calculus and optimization explain how models are trained. Information theory explains losses, uncertainty, and distribution mismatch.

The goal is not abstract proof for its own sake. Each page should answer a modeling question: what does this operation preserve, what can go wrong numerically, and how does it appear in machine learning systems?

## Study Route

| Need                                  | Start with                                                                                         | Then read                                                                                                                               |
| ------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Understand model inputs and weights   | [Vectors and Matrices](vectors-and-matrices.md), [Matrix Multiplication](matrix-multiplication.md) | [Rank](rank.md), [Orthogonality](orthogonality.md), [Norms and Distances](norms-and-distances.md)                                       |
| Understand embeddings and compression | [Singular Value Decomposition](singular-value-decomposition.md)                                    | [Low-Rank Approximation](low-rank-approximation.md), [Matrix Decompositions](matrix-decompositions.md)                                  |
| Understand training                   | [Calculus](calculus.md), [Gradients](gradients.md)                                                 | [Gradient Descent](gradient-descent.md), [Stochastic Gradient Descent](stochastic-gradient-descent.md), [Optimization](optimization.md) |
| Understand losses and distributions   | [Entropy](entropy.md), [Cross Entropy](cross-entropy.md)                                           | [KL Divergence](kl-divergence.md), [Mutual Information](mutual-information.md)                                                          |
| Understand implementation risk        | [Numerical Stability](numerical-stability.md)                                                      | [Constrained Optimization](constrained-optimization.md), [Convex Optimization](convex-optimization.md)                                  |

## Subtopics

- [Linear Algebra](linear-algebra.md)
- [Vectors and Matrices](vectors-and-matrices.md)
- [Matrix Multiplication](matrix-multiplication.md)
- [Rank](rank.md)
- [Orthogonality](orthogonality.md)
- [Eigenvalues and Eigenvectors](eigenvalues-and-eigenvectors.md)
- [Matrix Decompositions](matrix-decompositions.md)
- [Singular Value Decomposition](singular-value-decomposition.md)
- [Low-Rank Approximation](low-rank-approximation.md)
- [Norms and Distances](norms-and-distances.md)
- [Calculus](calculus.md)
- [Gradients](gradients.md)
- [Jacobians and Hessians](jacobians-and-hessians.md)
- [Optimization](optimization.md)
- [Convex Optimization](convex-optimization.md)
- [Gradient Descent](gradient-descent.md)
- [Stochastic Gradient Descent](stochastic-gradient-descent.md)
- [Constrained Optimization](constrained-optimization.md)
- [Numerical Stability](numerical-stability.md)
- [Information Theory](information-theory.md)
- [Entropy](entropy.md)
- [Cross Entropy](cross-entropy.md)
- [KL Divergence](kl-divergence.md)
- [Mutual Information](mutual-information.md)

> **Learning path — Foundations:** [path overview](../00-home-and-navigation/learning-paths.md#foundations) · [Probability and Statistics](../02-probability-and-statistics/index.md) →

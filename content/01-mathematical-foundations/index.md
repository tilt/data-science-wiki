---
title: Mathematical Foundations
slug: 01-mathematical-foundations
description: Index and learning map for Mathematical Foundations.
area: mathematical-foundations
topics:
  - "linear-algebra"
  - "vectors-and-matrices"
  - "matrix-multiplication"
  - "determinants"
  - "rank"
  - "orthogonality"
  - "eigenvalues-and-eigenvectors"
  - "graph-laplacian"
  - "matrix-decompositions"
  - "singular-value-decomposition"
  - "low-rank-approximation"
  - "norms-and-distances"
  - "calculus"
  - "gradients"
level: foundational
status: complete
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
last_reviewed: 2026-07-17
---

# Mathematical Foundations

Mathematical foundations supplies the notation and mechanisms used throughout the wiki. Linear algebra explains data as vectors, matrices, projections, ranks, and decompositions. Calculus and optimization explain how models are trained. Information theory explains losses, uncertainty, and distribution mismatch.

The goal is not abstract proof for its own sake. Each page answers a modeling question: what does this operation preserve, what can go wrong numerically, and how does it appear in machine learning systems?

## Knowledge map

The section has three trunks — linear algebra, calculus/optimization, and information theory — that recur across every later area. Arrows point from a prerequisite to what it enables.

```mermaid
flowchart TD
  LA[Linear Algebra] --> Det[Determinants and Rank]
  Det --> Decomp[Eigen and SVD Decompositions]
  Decomp --> Graph[Graph Laplacians]
  Decomp --> LowRank[Low-Rank Approximation]
  LA --> Calc[Calculus and Gradients]
  Calc --> Opt[Optimization]
  Opt --> GD[Gradient and Stochastic Descent]
  GD --> NumStab[Numerical Stability]
  Info[Information Theory] --> Losses[Entropy, Cross-Entropy, KL, Mutual Information]
```

## Reading path

Read linear algebra first, then calculus and optimization, then information theory.

1. [Linear Algebra](linear-algebra.md): the overview of vectors, matrices, and the operations that follow.
2. [Vectors and Matrices](vectors-and-matrices.md): the basic objects and how shapes compose.
3. [Matrix Multiplication](matrix-multiplication.md): the core operation behind linear maps and layers.
4. [Determinants](determinants.md): signed volume scaling for square matrices.
5. [Rank](rank.md): how many independent directions a matrix actually spans.
6. [Orthogonality](orthogonality.md): perpendicular directions, projections, and orthonormal bases.
7. [Norms and Distances](norms-and-distances.md): measuring size and similarity of vectors.
8. [Eigenvalues and Eigenvectors](eigenvalues-and-eigenvectors.md): directions a matrix only stretches.
9. [Graph Laplacian](graph-laplacian.md): degree-minus-adjacency matrices for graph structure.
10. [Matrix Decompositions](matrix-decompositions.md): factorizations that expose structure.
11. [Singular Value Decomposition](singular-value-decomposition.md): the decomposition behind embeddings and compression.
12. [Low-Rank Approximation](low-rank-approximation.md): keeping the dominant structure and discarding noise.
13. [Calculus](calculus.md): derivatives as the language of change.
14. [Gradients](gradients.md): multivariate derivatives that point training in a direction.
15. [Jacobians and Hessians](jacobians-and-hessians.md): first- and second-order derivative matrices.
16. [Optimization](optimization.md): finding parameters that minimize a loss.
17. [Convex Optimization](convex-optimization.md): the well-behaved case with a single global optimum.
18. [Constrained Optimization](constrained-optimization.md): optimizing subject to equalities and inequalities.
19. [Gradient Descent](gradient-descent.md): the workhorse iterative optimizer.
20. [Stochastic Gradient Descent](stochastic-gradient-descent.md): mini-batch updates that scale to large data.
21. [Numerical Stability](numerical-stability.md): avoiding overflow, underflow, and catastrophic cancellation.
22. [Information Theory](information-theory.md): quantifying uncertainty and information.
23. [Entropy](entropy.md): the average surprise of a distribution.
24. [Cross Entropy](cross-entropy.md): the standard classification training loss.
25. [KL Divergence](kl-divergence.md): a directed measure of distribution mismatch.
26. [Mutual Information](mutual-information.md): shared information between variables.

## Connections

- [Probability and Statistics](../02-probability-and-statistics/index.md) builds estimation and inference on this notation.
- [Classical Machine Learning](../03-classical-machine-learning/index.md) and [Deep Learning](../06-deep-learning/index.md) turn these operations into models and training loops.

> [!nav]
> **Learning path** — [Foundations](../00-home-and-navigation/learning-paths.md#foundations)
>
> [Probability and Statistics →](../02-probability-and-statistics/index.md)

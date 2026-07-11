---
title: Rank
slug: mathematical-foundations/rank
description: Concise guide to Rank in Mathematical Foundations.
area: mathematical-foundations
topics:
  - rank
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

Matrix rank measures the number of linearly independent directions in a matrix. It tells how much unique information or dimensional structure the matrix contains.

## Core idea

A matrix has rank $r$ if its columns span an $r$-dimensional space. If one column is a linear combination of others, it does not add rank. Full rank means no direction is redundant within the matrix's smaller dimension.

## Example

The matrix

$$
egin{bmatrix}1 & 2\ 2 & 4\end{bmatrix}
$$

has rank 1 because the second column is twice the first. It looks like a 2-column matrix, but it contains only one independent column direction.

## ML use

Rank matters in linear regression, PCA, matrix factorization, embeddings, and identifiability. Low-rank structure can make compression possible; rank deficiency can make parameter estimates non-unique.

## Caveats

Numerical rank is not always obvious. A matrix can be technically full rank but have tiny singular values that make computations unstable. In practice, tolerance choices matter.

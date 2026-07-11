---
title: Eigenvalues and Eigenvectors
slug: mathematical-foundations/eigenvalues-and-eigenvectors
description: Concise guide to Eigenvalues and Eigenvectors in Mathematical Foundations.
area: mathematical-foundations
topics:
  - eigenvalues-and-eigenvectors
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

Eigenvectors are directions that a linear transformation only stretches or shrinks. Eigenvalues are the corresponding stretch factors. They reveal the natural axes of a matrix.

## Definition

For a square matrix $A$, a nonzero vector $v$ is an eigenvector if

$$
Av = \lambda v,
$$

where $\lambda$ is the eigenvalue. Multiplying by $A$ changes the scale of $v$ but not its direction.

## Example

If a matrix doubles every vector on the x-axis and halves every vector on the y-axis, then the x-axis and y-axis directions are eigenvectors with eigenvalues 2 and 0.5. More complex matrices can rotate and shear most vectors, but eigenvectors identify directions that remain aligned.

## ML use

Eigenvectors appear in PCA, spectral clustering, graph algorithms, stability analysis, covariance matrices, and low-rank approximations. Large eigenvalues often correspond to directions with strong variance or influence.

## Caveats

Eigenvectors are defined only up to scale, and repeated or nearly equal eigenvalues can make directions unstable. Not every matrix has a full set of real eigenvectors.

---
title: Vectors and Matrices
slug: mathematical-foundations/vectors-and-matrices
description: Concise guide to Vectors and Matrices in Mathematical Foundations.
area: mathematical-foundations
topics:
  - vectors-and-matrices
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

Vectors and matrices are the basic data structures of linear algebra. Vectors store ordered numbers; matrices store rectangular arrays and can represent datasets or transformations.

## Vectors

A vector can represent a feature row, model parameters, an embedding, a gradient, or a direction in space. The dot product measures weighted alignment:

$$
u^T v = \sum_i u_i v_i.
$$

Norms measure vector length, and cosine similarity compares direction after normalizing length.

## Matrices

A matrix can be a dataset with rows as examples and columns as features, or a transformation that maps one vector space to another. Applying a matrix to a vector computes weighted combinations of the vector's components.

## Example

A user feature vector might contain age, usage, and support-ticket count. A model weight vector assigns an importance to each feature, and the score $x^T w$ is their weighted sum. Stacking many users into a matrix lets the same operation score a batch.

## Caveats

Shape conventions matter. Some libraries store examples as rows; others use different tensor layouts. Many modelling bugs are really dimension, scaling, or normalization bugs.

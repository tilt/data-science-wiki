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
historical_context: false
last_reviewed: 2026-07-11
---
# How does singular value decomposition differ from matrix factorization?

## Answer

SVD is one specific decomposition with orthogonal singular vectors and singular values. Matrix factorization is a broader modelling family. In recommender systems, matrix factorization usually learns user and item factors from observed interactions rather than computing classical SVD on a complete matrix.

## What a strong answer adds

1. Classical SVD factorizes a complete matrix as $U\Sigma V^\top$.
2. The singular vectors are orthogonal and the singular values are ordered.
3. Recommender matrix factorization usually solves an optimization problem over observed user-item pairs.
4. Missing entries are unknown preferences, not true zeros.
5. The recommender model can add biases, regularization, implicit-feedback weights, and side information.

## Worked example

If a user has rated only 20 films out of 10,000, ordinary SVD needs a complete matrix. Filling the other 9,980 entries with zero says the user dislikes almost every unseen film. Matrix factorization avoids that false assumption by optimizing over observed ratings or using low-confidence treatment for unobserved interactions.

## Common follow-ups

- SVD is deterministic for a fixed complete matrix.
- Recommender factorization is model-based and depends on loss, regularization, sampling, and optimization.
- "Funk SVD" in recommender literature is a matrix-factorization model, not classical SVD.

## Canonical concept

Read the topic page: [SVD versus Matrix Factorization](../04-recommendation-systems/svd-versus-matrix-factorization.md).
## Canonical relationship

The canonical comparison page is [SVD versus Matrix Factorization](../04-recommendation-systems/svd-versus-matrix-factorization.md). This page is scoped to interview answer structure.

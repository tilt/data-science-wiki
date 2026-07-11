---
title: Funk SVD
slug: recommendation-systems/funk-svd
description: Concise guide to Funk SVD in Recommendation Systems and Personalization.
area: recommendation-systems
topics:
  - funk-svd
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

Funk SVD is a matrix-factorization approach that learns user and item latent vectors from observed ratings using gradient-based optimization. Despite the name, it is not classical SVD on a completed matrix.

## Core idea

The model predicts a rating with a dot product plus optional biases:

$$
\hat{r}_{ui}=\mu + b_u + b_i + p_u^T q_i.
$$

The user vector $p_u$ and item vector $q_i$ are learned by minimizing error on observed ratings, often with regularization.

## Step-by-step example

If a user rates several science-fiction films highly, training nudges that user's vector toward latent dimensions shared by those films. An unrated film with a similar item vector receives a higher predicted score.

## Why it mattered

Funk SVD showed how latent-factor recommenders could work directly with sparse observed ratings. It became a practical bridge from neighborhood collaborative filtering to modern factorization-based recommender systems.

## Failure modes

The model struggles with new users, new items, changing tastes, and implicit feedback unless extended. It can also overfit heavy raters or popular items without regularization and bias terms.

---
title: Why does ordinary SVD not directly work well on a sparse utility matrix in recommender systems?
slug: interview-preparation/sparse-utility-matrix-and-ordinary-svd
description: Interview prompt that links to the canonical sparse-utility-matrix SVD topic page.
area: interview-preparation
topics:
  - "interview-question"
  - "recommendation-systems"
  - "sparse-data"
level: intermediate
status: review
page_type: interview-question
aliases: []
prerequisites:
  - "../04-recommendation-systems/matrix-factorization.md"
related:
  - "../04-recommendation-systems/sparse-utility-matrices-and-svd.md"
historical_context: false
last_reviewed: 2026-07-11
---
# Why does ordinary SVD not directly work well on a sparse utility matrix in recommender systems?

## Answer

Ordinary SVD expects a complete matrix. A recommender utility matrix is sparse because most user-item pairs are unobserved, not because the true value is zero. Zero filling changes the problem, so recommender factorization usually optimizes over observed interactions or uses implicit-feedback confidence weights.

## What a strong answer adds

1. A utility matrix has users as rows and items as columns.
2. Most cells are missing because users interact with only a tiny fraction of the catalogue.
3. Missing means unknown, not negative.
4. Ordinary SVD requires a numeric value in every cell.
5. Filling missing cells with zeros makes non-exposure look like dislike and can dominate the factorization.

## Worked example

Imagine 1,000 users and 10,000 items. If each user has interacted with 20 items, then 99.8 percent of cells are missing. Zero filling creates millions of artificial zeros. The decomposition mostly learns the pattern "users did not interact" rather than useful taste structure. Recommender matrix factorization instead optimizes only observed entries or uses confidence weights for unobserved pairs.

## Common follow-ups

- Sparse linear algebra can compute SVD efficiently, but it does not solve the missing-value semantics.
- Imputation is possible, but the imputation model then becomes part of the recommender.
- Implicit-feedback models treat unobserved pairs as weak evidence, not hard negative ratings.

## Canonical concept

Read the topic page: [Sparse Utility Matrices and Ordinary SVD](../04-recommendation-systems/sparse-utility-matrices-and-svd.md).

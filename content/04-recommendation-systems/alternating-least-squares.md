---
title: Alternating Least Squares
slug: recommendation-systems/alternating-least-squares
description: Alternating Least Squares overview and practical notes.
area: recommendation-systems
topics:
  - "matrix-factorization"
  - "als"
level: intermediate
status: review
page_type: algorithm
aliases:
  - "ALS"
prerequisites: []
related: []
historical_context: false
last_reviewed: 2026-07-10
---
# Alternating Least Squares

## Summary

Alternating least squares is an optimization algorithm for matrix factorization. It alternates between solving for user factors while item factors are fixed, then solving for item factors while user factors are fixed. Each half-step is a regularized least-squares problem with a closed-form solution.

## Why it matters

ALS is popular in recommender systems because sparse user-item data makes full joint optimization difficult, while the alternating subproblems can be parallelized across users or items. It also supports implicit-feedback variants where observed interactions have higher confidence than unobserved pairs.

## Algorithm sketch

For explicit ratings, ALS minimizes:

$$
\sum_{(u,i)\in\Omega}(r_{ui} - p_u^\top q_i)^2 + \lambda(\lVert p_u\rVert_2^2 + \lVert q_i\rVert_2^2)
$$

1. Initialize item factors $q_i$ randomly or from a small model.
2. For each user, solve a ridge-regression problem for $p_u$ using that user's observed items.
3. For each item, solve the symmetric problem for $q_i$ using users who interacted with the item.
4. Repeat until validation error or ranking quality stops improving.

## Worked example

Suppose a music app has users, songs, and play counts. Convert plays into implicit confidence, train ALS, then recommend songs whose item factors have high dot products with a user's factor. For a user with only two plays, stronger regularization prevents the factor vector from over-specializing to those two songs.

## Failure modes

ALS can overfit sparse users, encode popularity bias, and fail cold-start cases without content features or fallback recommenders. It can also look strong offline while producing repetitive lists, so production recommenders usually add candidate filters, diversity rules, and online evaluation.

## Related methods

- [Matrix factorization](matrix-factorization.md)
- [Implicit feedback](implicit-feedback.md)
- [Weighted matrix factorization](weighted-matrix-factorization.md)

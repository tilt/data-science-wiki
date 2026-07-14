---
title: Item-Based Collaborative Filtering
slug: recommendation-systems/item-based-collaborative-filtering
description: "Recommendation from item-item similarity computed over user behavior."
area: recommendation-systems
topics:
  - item-based-collaborative-filtering
level: intermediate
status: review
page_type: algorithm
aliases: []
prerequisites:
  - collaborative-filtering.md
related:
  - collaborative-filtering.md
  - user-based-collaborative-filtering.md
  - candidate-generation.md
  - matrix-factorization.md
  - ranking.md
historical_context: false
last_reviewed: 2026-07-11
---

# Item-Based Collaborative Filtering

Item-based collaborative filtering computes similarity between item columns, then recommends items similar to those a user already consumed. Compared with [user-based collaborative filtering](user-based-collaborative-filtering.md), item similarities can be more stable because item catalogs often change slower than user histories.

## Defining math

For item vectors $x_i$ and $x_j$ over users,

$$
w_{ij}=\frac{x_i^\top x_j}{\lVert x_i\rVert\lVert x_j\rVert}.
$$

A user score for unseen item $j$ is

$$
s(u,j)=\sum_{i\in I_u}w_{ij}.
$$

This is often a fast [candidate generation](candidate-generation.md) source before richer [ranking](ranking.md).

## Worked example

Assume the target user already consumed items 0 and 3. Candidate scores sum item-item similarities from the consumed set and then filter already-seen items:

| Candidate item | Similarity to item 0 | Similarity to item 3 | Unseen score | Decision         |
| -------------- | -------------------: | -------------------: | -----------: | ---------------- |
| Item 0         |                1.000 |                0.408 |     filtered | already consumed |
| Item 1         |                0.816 |                0.000 |        0.816 | candidate        |
| Item 2         |                0.408 |                0.500 |        0.908 | top candidate    |
| Item 3         |                0.408 |                1.000 |     filtered | already consumed |

Item 2 receives support from both consumed items and becomes the top unseen recommendation. [Matrix factorization](matrix-factorization.md) can compress a similar item-item structure into latent factors.

## Caveats

Popular items are similar to many items unless similarities are normalized or shrinkage is used. Item-item tables can be large for huge catalogs, so approximate nearest-neighbor indexes and pruning are common. Pure item similarity still has [cold-start](cold-start-problem.md) problems for brand-new inventory.

## References

- [Linden, Smith, and York, 2003, Amazon.com Recommendations: Item-to-Item Collaborative Filtering](https://doi.org/10.1109/MIC.2003.1167344)
- [Sarwar et al., 2001, Item-based Collaborative Filtering Recommendation Algorithms](https://doi.org/10.1145/371920.372071)

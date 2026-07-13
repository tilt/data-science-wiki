---
title: Utility and Interaction Matrices
slug: recommendation-systems/utility-and-interaction-matrices
description: "User-item matrices that organize ratings, events, sparsity, and missingness."
area: recommendation-systems
topics:
  - utility-and-interaction-matrices
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - recommendation-system-overview.md
related:
  - explicit-versus-implicit-feedback.md
  - sparse-utility-matrices-and-svd.md
  - collaborative-filtering.md
  - matrix-factorization.md
  - implicit-feedback.md
historical_context: false
last_reviewed: 2026-07-11
---
# Utility and Interaction Matrices

A utility or interaction matrix places users in rows, items in columns, and observed ratings or events in cells. It is the core data object behind [collaborative filtering](collaborative-filtering.md), [matrix factorization](matrix-factorization.md), and most sparse recommendation examples.

## Defining math

Let $R\in\mathbb R^{m\times n}$ and $\Omega$ be the observed user-item pairs. Explicit-feedback systems store values such as $r_{ui}=5$. [Implicit feedback](implicit-feedback.md) systems often store event counts $r_{ui}$ and transform them into preference and confidence. Sparsity is

$$
1-\frac{\lvert\Omega\rvert}{mn}.
$$

The symbol $\Omega$ matters because missing entries are unknown, not automatically negative.

## Worked example

Four observed events produce a sparse $3\times4$ utility matrix:

| User | Item 0 | Item 1 | Item 2 | Item 3 |
| ---: | ---: | ---: | ---: | ---: |
| 0 | 5 | missing | 1 | missing |
| 1 | missing | 4 | missing | missing |
| 2 | missing | missing | 5 | missing |

There are 4 observed entries out of 12 cells, so sparsity is $1-4/12=0.667$. User 0's observed row is rating 5 for item 0 and rating 1 for item 2; the missing cells are unknown, not dislikes. Treating missing cells as real negative ratings would create the problem explained in [sparse utility matrices and SVD](sparse-utility-matrices-and-svd.md).

## Caveats

The matrix hides time, position, device, and whether an item was even eligible for exposure. Aggregating logs into one cell can erase recency and session intent. Keep raw event logs for [offline versus online evaluation](offline-versus-online-evaluation.md), even when models consume a matrix view.

## References

- [Adomavicius and Tuzhilin, 2005, Toward the Next Generation of Recommender Systems](https://doi.org/10.1109/TKDE.2005.99)
- [Hu, Koren, and Volinsky, 2008, Collaborative Filtering for Implicit Feedback Datasets](https://doi.org/10.1109/ICDM.2008.22)

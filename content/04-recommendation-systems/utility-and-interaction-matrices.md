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

```python
import numpy as np
events = [(0,0,5), (0,2,1), (1,1,4), (2,2,5)]
R = np.full((3, 4), np.nan)
for u, i, r in events:
    R[u, i] = r
print("observed_entries", int(np.isfinite(R).sum()))
print("sparsity", round(float(1 - np.isfinite(R).mean()), 3))
print("user0_row", np.where(np.isnan(R[0]), -1, R[0]).astype(int).tolist())
```

Observed output:

```text
observed_entries 4
sparsity 0.667
user0_row [5, -1, 1, -1]
```

The `-1` display sentinels mark missing cells only for printing. Treating them as real negative ratings would create the problem explained in [sparse utility matrices and SVD](sparse-utility-matrices-and-svd.md).

## Caveats

The matrix hides time, position, device, and whether an item was even eligible for exposure. Aggregating logs into one cell can erase recency and session intent. Keep raw event logs for [offline versus online evaluation](offline-versus-online-evaluation.md), even when models consume a matrix view.

## References

- [Adomavicius and Tuzhilin, 2005, Toward the Next Generation of Recommender Systems](https://doi.org/10.1109/TKDE.2005.99)
- [Hu, Koren, and Volinsky, 2008, Collaborative Filtering for Implicit Feedback Datasets](https://doi.org/10.1109/ICDM.2008.22)

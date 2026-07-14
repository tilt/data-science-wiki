---
title: Truncated SVD
slug: recommendation-systems/truncated-svd
description: "Keeping only leading singular components for compact matrix representations."
area: recommendation-systems
topics:
  - truncated-svd
  - singular-value-decomposition
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - classical-svd.md
related:
  - classical-svd.md
  - svd-versus-matrix-factorization.md
  - sparse-utility-matrices-and-svd.md
  - ../12-information-retrieval-and-search/tf-idf.md
  - ../01-mathematical-foundations/low-rank-approximation.md
historical_context: false
last_reviewed: 2026-07-11
---

# Truncated SVD

Truncated SVD computes only the largest singular components of a matrix. It is useful for compression, latent semantic indexing, and baseline recommender representations, but it inherits the input-matrix assumptions of [classical SVD](classical-svd.md).

## Defining math

The rank-$k$ approximation is

$$
A\approx U_k\Sigma_kV_k^\top,
$$

where $k\ll\min(m,n)$. In information retrieval, this can compress a [TF-IDF](../12-information-retrieval-and-search/tf-idf.md) matrix. In recommenders, it can compress a deliberately prepared item or interaction matrix, but [sparse utility matrices](sparse-utility-matrices-and-svd.md) still require careful missing-value semantics.

## Worked example

The matrix below can be read as four users or documents over four item/term features:

| Row | Feature pattern          |
| --- | ------------------------ |
| 0   | Features 0 and 1 active. |
| 1   | Features 0 and 2 active. |
| 2   | Features 2 and 3 active. |
| 3   | Features 1 and 3 active. |

This snippet applies `TruncatedSVD` to sparse user-item rows and reports explained variance plus the first row embedding.

```python
import numpy as np
from sklearn.decomposition import TruncatedSVD
X = np.array([[1, 1, 0, 0], [1, 0, 1, 0],
              [0, 0, 1, 1], [0, 1, 0, 1]], dtype=float)
svd = TruncatedSVD(n_components=2, random_state=3).fit(X)
Z = svd.transform(X)
print("explained_variance_ratio", np.round(svd.explained_variance_ratio_, 3).tolist())
print("row0_embedding", np.round(Z[0], 3).tolist())
```

Observed output:

```text
explained_variance_ratio [0.0, 0.5]
row0_embedding [1.0, 0.707]
```

The two-dimensional embedding is a compact representation of row co-occurrence. The first component captures the shared overall activity scale, while the second separates rows by which feature pair they contain. A recommender would still need [ranking](ranking.md), filters, and evaluation around this representation.

## Caveats

The choice of $k$ controls underfitting versus noise retention. Randomized truncated SVD is approximate, so set `random_state` when results must be reproducible. Directly applying it to zero-filled feedback is the same missing-data problem described in [SVD versus matrix factorization](svd-versus-matrix-factorization.md).

## References

- [scikit-learn documentation: TruncatedSVD](https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.TruncatedSVD.html)

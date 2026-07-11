---
title: PCA
slug: classical-machine-learning/pca
description: "Principal component analysis: orthogonal linear projections that maximize retained variance."
area: classical-machine-learning
topics:
  - pca
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - dimensionality-reduction.md
  - unsupervised-learning.md
  - clustering.md
  - linear-models.md
historical_context: false
last_reviewed: 2026-07-11
---
# PCA

Principal component analysis finds orthogonal directions of maximum variance in centered numeric data. It is a specific [dimensionality reduction](dimensionality-reduction.md) method, not a generic feature-selection algorithm. It is usually used inside [unsupervised learning](unsupervised-learning.md) workflows, but its linear projection geometry is closest in spirit to [linear models](linear-models.md).

## Defining math

Let $X_c$ be centered. The first component solves $w_1=\arg\max_{\lVert w\rVert_2=1}w^\top X_c^\top X_cw$. Subsequent components solve the same problem subject to orthogonality. Equivalently, PCA uses the eigendecomposition $(n-1)^{-1}X_c^\top X_c=V\Lambda V^\top$ or SVD $X_c=U\Sigma V^\top$. Scores are $Z=X_cV_d$, and explained variance ratios are $\lambda_j/\sum_k\lambda_k$.

## Intuition

PCA rotates the coordinate system so the first axis captures the largest spread, the second captures the largest remaining orthogonal spread, and so on. For [clustering](clustering.md), this can remove noise or make plots readable; it can also hide low-variance structure that matters.

## Worked example

```python
from sklearn.datasets import load_iris
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import numpy as np

X, y = load_iris(return_X_y=True)
Xz = StandardScaler().fit_transform(X)
pca = PCA(n_components=2).fit(Xz)
print("components")
print(np.round(pca.components_, 3))
print("explained_variance_ratio", np.round(pca.explained_variance_ratio_, 3))
print("first_row_scores", np.round(pca.transform(Xz[:1]), 3))
```

Observed output:

```text
components
[[ 0.521 -0.269  0.58   0.565]
 [ 0.377  0.923  0.024  0.067]]
explained_variance_ratio [0.73  0.229]
first_row_scores [[-2.265  0.48 ]]
```

The first component loads positively on three standardized Iris features and negatively on the second. Component signs are arbitrary; flipping all signs gives the same subspace.

## Caveats

PCA is scale-sensitive, so standardize features when units differ. Outliers can dominate variance. Components are not causal factors, and they can be unstable when eigenvalues are close.

## References

- [scikit-learn User Guide: PCA](https://scikit-learn.org/stable/modules/decomposition.html#pca)
- [An Introduction to Statistical Learning](https://www.statlearning.com/)

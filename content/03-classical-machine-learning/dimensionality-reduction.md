---
title: Dimensionality Reduction
slug: classical-machine-learning/dimensionality-reduction
description: "Representing data with fewer variables while preserving a chosen form of structure."
area: classical-machine-learning
topics:
  - dimensionality-reduction
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - pca.md
  - unsupervised-learning.md
  - clustering.md
  - feature-engineering.md
historical_context: false
last_reviewed: 2026-07-11
---
# Dimensionality Reduction

Dimensionality reduction maps $x\in\mathbb R^p$ to $z\in\mathbb R^d$ with $d<p$. The preserved structure depends on the method: [PCA](pca.md) preserves variance in a linear subspace, manifold methods preserve neighborhoods, and supervised reductions preserve label-relevant directions.

## Defining math

A generic encoder is $z_i=g(x_i)$. Linear projection writes $Z=XW$ with $W\in\mathbb R^{p\times d}$. PCA chooses $W$ to maximize retained variance:

$$
\max_{W^\top W=I_d}\operatorname{tr}(W^\top X_c^\top X_c W).
$$

Reconstruction error for linear PCA is $\lVert X_c-X_cWW^\top\rVert_F^2$. The same transformation can be preprocessing for [clustering](clustering.md), visualization, denoising, or [feature engineering](feature-engineering.md). In [unsupervised learning](unsupervised-learning.md), the reduction objective often becomes the implicit definition of what structure is worth preserving.

## Intuition

High-dimensional data often contains redundancy. A good lower-dimensional representation keeps the variation that matters and discards noise, but "matters" must be defined. Variance is not the same as predictive value.

## Worked example

The code standardizes the Iris measurements and projects them to two PCA coordinates, so the output reports both the reduced shape and how much variance those two coordinates retain.

```python
from sklearn.datasets import load_iris
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import numpy as np

X, y = load_iris(return_X_y=True)
Xz = StandardScaler().fit_transform(X)
pca = PCA(n_components=2, random_state=20).fit(Xz)
Z = pca.transform(Xz)
print("explained_variance_ratio", np.round(pca.explained_variance_ratio_, 3))
print("transformed_shape", Z.shape)
```

Observed output:

```text
explained_variance_ratio [0.73  0.229]
transformed_shape (150, 2)
```

Two components retain about 95.9 percent of standardized Iris variance. That says nothing by itself about downstream classification or causal meaning.

## Caveats

Dimensionality reduction can erase rare but important directions. Distances after projection may be distorted. Fitting PCA or scaling before a train-test split leaks distributional information from validation into training.

## References

- [scikit-learn User Guide: Decomposition](https://scikit-learn.org/stable/modules/decomposition.html)
- [scikit-learn User Guide: Unsupervised dimensionality reduction](https://scikit-learn.org/stable/modules/unsupervised_reduction.html)

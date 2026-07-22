---
title: Dimensionality Reduction
slug: classical-machine-learning/dimensionality-reduction
description: "Representing data with fewer variables while preserving a chosen form of structure."
area: classical-machine-learning
topics:
  - dimensionality-reduction
level: foundational
status: complete
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
last_reviewed: 2026-07-22
---

# Dimensionality Reduction

Dimensionality reduction maps $x\in\mathbb R^p$ to $z\in\mathbb R^d$ with $d<p$. The preserved structure depends on the method: [PCA](pca.md) preserves variance in a linear subspace, manifold methods preserve neighborhoods, and supervised reductions preserve label-relevant directions.

## What to preserve

High-dimensional data often contains redundancy. A good lower-dimensional representation keeps the variation that matters and discards noise — but "matters" must be defined, and different methods preserve different structure:

| Method        | Preserves                           | Linear?          |
| ------------- | ----------------------------------- | ---------------- |
| [PCA](pca.md) | global variance                     | yes              |
| LDA           | label-separating directions         | yes (supervised) |
| t-SNE / UMAP  | local neighborhoods                 | no               |
| Autoencoders  | reconstruction under a learned code | no               |

Variance is not the same as predictive value, so the right method depends on the downstream use.

## Linear projection and PCA

An encoder maps each original feature vector $x_i\in\mathbb R^p$ to a lower-dimensional representation $z_i=g(x_i)\in\mathbb R^d$ with $d<p$. A linear encoder writes $Z=XW$, where $X$ is the data matrix and $W\in\mathbb R^{p\times d}$ is a projection matrix taking the $p$ input dimensions to $d$ output dimensions. PCA chooses $W$ to retain as much variance as possible:

$$
\max_{W^\top W=I_d}\operatorname{tr}\!\big(W^\top X_c^\top X_c W\big),
$$

where $X_c$ is the centered data (each feature mean-subtracted), the constraint $W^\top W=I_d$ (with $I_d$ the $d\times d$ identity) makes the projection directions orthonormal, and $\operatorname{tr}(\cdot)$ is the trace, here the total projected variance. The reconstruction error of linear PCA is $\lVert X_c-X_cWW^\top\rVert_F^2$, with $\lVert\cdot\rVert_F$ the Frobenius norm. The same transformation can be preprocessing for [clustering](clustering.md), visualization, denoising, or [feature engineering](feature-engineering.md). In [unsupervised learning](unsupervised-learning.md), the reduction objective often becomes the implicit definition of what structure is worth preserving.

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

> [!nav]
> **Section** — [Classical Machine Learning](index.md)
>
> [← Unsupervised Learning](unsupervised-learning.md) [PCA →](pca.md)

---
title: Unsupervised Learning
slug: classical-machine-learning/unsupervised-learning
description: "Learning structure from features without target labels."
area: classical-machine-learning
topics:
  - unsupervised-learning
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - clustering.md
  - pca.md
  - dimensionality-reduction.md
  - anomaly-detection.md
historical_context: false
last_reviewed: 2026-07-22
---

# Unsupervised Learning

Unsupervised learning fits structure from $X$ without observed target labels. The output may be clusters, components, density estimates, embeddings, or anomaly scores. Because there is no direct $y$, validation depends more heavily on assumptions and downstream utility than in [supervised learning](supervised-learning.md).

## Structure without labels

Without labels, the method's definition of "structure" is the whole game. Variance, Euclidean distance, density, and neighborhood preservation can all disagree, and [dimensionality reduction](dimensionality-reduction.md) that helps visualization may discard information a later classifier needs. The main families differ in what they output and what they optimize:

| Task                                                    | Output                      | Typical objective                 |
| ------------------------------------------------------- | --------------------------- | --------------------------------- |
| [Clustering](clustering.md)                             | group assignments           | within-cluster distance (k-means) |
| [Dimensionality reduction](dimensionality-reduction.md) | low-dimensional coordinates | retained variance (PCA)           |
| Density estimation                                      | a probability model         | data likelihood                   |
| [Anomaly detection](anomaly-detection.md)               | outlier scores              | a score threshold                 |

## Common objectives

Many unsupervised methods optimize a reconstruction, partition, or likelihood objective. [Clustering](clustering.md) with k-means partitions the points into clusters $C_1,\dots,C_K$ to minimize the within-cluster squared distance,

$$
\min_{C_1,\dots,C_K}\sum_k\sum_{x_i\in C_k}\lVert x_i-\mu_k\rVert_2^2,
$$

where $x_i$ is a data point and $\mu_k$ is the centroid (mean) of the points assigned to cluster $C_k$. [PCA](pca.md) solves $\max_{W^\top W=I}\operatorname{tr}(W^\top X^\top XW)$ for an orthonormal projection $W$, and anomaly methods learn a score $s(x)$ and flag points whose score crosses a threshold.

When reference labels are available after clustering, the adjusted Rand index compares how pairs of points are grouped while correcting for chance:

$$
\operatorname{ARI}=\frac{RI-\mathbb E[RI]}{\max(RI)-\mathbb E[RI]},
$$

where $RI$ is the Rand index — the fraction of point pairs that are either together in both the clustering and the reference, or apart in both — and $\mathbb E[RI]$ is its expected value under random labeling.

It is an external validation score, not an unsupervised objective.

## Worked example

This snippet clusters standardized Iris measurements without labels, then compares internal silhouette quality with adjusted Rand agreement against the hidden species labels.

```python
from sklearn.cluster import KMeans
from sklearn.datasets import load_iris
from sklearn.metrics import adjusted_rand_score, silhouette_score
from sklearn.preprocessing import StandardScaler

X, y = load_iris(return_X_y=True)
X2 = StandardScaler().fit_transform(X)
labels = KMeans(n_clusters=3, random_state=19, n_init=10).fit_predict(X2)
print("silhouette", round(silhouette_score(X2, labels), 3))
print("adjusted_rand_vs_species", round(adjusted_rand_score(y, labels), 3))
```

Observed output:

```text
silhouette 0.46
adjusted_rand_vs_species 0.62
```

The silhouette score uses only geometry. Adjusted Rand uses species labels after the fact, showing that geometric clusters partially but imperfectly align with botanical classes.

## Caveats

Scaling can dominate unsupervised results. Internal metrics can reward artificial structure even when clusters are not actionable. If labels are later used to choose the unsupervised representation, that choice becomes supervised [model selection](model-selection.md).

## References

- [scikit-learn User Guide: Unsupervised learning](https://scikit-learn.org/stable/unsupervised_learning.html)
- [scikit-learn User Guide: Clustering](https://scikit-learn.org/stable/modules/clustering.html)

> [!nav]
> **Section** — [Classical Machine Learning](index.md)
>
> [← Interpretability](interpretability.md) [Dimensionality Reduction →](dimensionality-reduction.md)

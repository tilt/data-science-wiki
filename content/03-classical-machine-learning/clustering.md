---
title: Clustering
slug: classical-machine-learning/clustering
description: "Grouping observations by geometry, density, or model-based similarity without labels."
area: classical-machine-learning
topics:
  - clustering
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - unsupervised-learning.md
  - anomaly-detection.md
  - pca.md
  - dimensionality-reduction.md
historical_context: false
last_reviewed: 2026-07-11
---
# Clustering

Clustering assigns examples to groups using features alone. The result is not a discovered truth by default; it is the partition implied by a chosen similarity definition. K-means uses Euclidean distance, DBSCAN uses density connectivity, and mixture models use likelihood.

## Defining math

K-means solves $\min_{C_1,\dots,C_K}\sum_k\sum_{x_i\in C_k}\lVert x_i-\mu_k\rVert_2^2$, with centroid update $\mu_k=|C_k|^{-1}\sum_{x_i\in C_k}x_i$. The silhouette score for point $i$ is $s_i=(b_i-a_i)/\max(a_i,b_i)$, where $a_i$ is within-cluster distance and $b_i$ is the best average distance to another cluster.

## Intuition

K-means looks for compact spherical groups around centroids. If the real structure is elongated, nested, density-based, or categorical, a different [unsupervised learning](unsupervised-learning.md) assumption may be more honest. [PCA](pca.md) is often used before visualization, but it can change cluster geometry.

## Worked example

```python
from sklearn.cluster import KMeans
from sklearn.datasets import load_iris
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler
import numpy as np

X, y = load_iris(return_X_y=True)
Xz = StandardScaler().fit_transform(X)
km = KMeans(n_clusters=3, random_state=21, n_init=10).fit(Xz)
print("inertia", round(km.inertia_, 1))
print("silhouette", round(silhouette_score(Xz, km.labels_), 3))
print("cluster_sizes", np.bincount(km.labels_))
```

Observed output:

```text
inertia 139.8
silhouette 0.46
cluster_sizes [47 50 53]
```

The cluster sizes are balanced, and the silhouette is moderate. The inertia value is only comparable for the same scaled dataset and number of clusters.

## Caveats

K-means requires choosing $K$ and is sensitive to scaling and initialization. Internal cluster scores can improve for partitions that are not useful. If anomalies are the goal, [anomaly detection](anomaly-detection.md) methods may be more direct than forcing every point into a cluster.

## References

- [scikit-learn User Guide: Clustering](https://scikit-learn.org/stable/modules/clustering.html)
- [scikit-learn User Guide: K-means](https://scikit-learn.org/stable/modules/clustering.html#k-means)

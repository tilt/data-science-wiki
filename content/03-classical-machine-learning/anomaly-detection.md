---
title: Anomaly Detection
slug: classical-machine-learning/anomaly-detection
description: "Scoring observations that are unusual under a fitted notion of normality."
area: classical-machine-learning
topics:
  - anomaly-detection
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - clustering.md
  - unsupervised-learning.md
  - evaluation-metrics.md
  - class-imbalance.md
historical_context: false
last_reviewed: 2026-07-11
---

# Anomaly Detection

Anomaly detection ranks or flags observations that look unusual relative to a reference distribution. It is often [unsupervised learning](unsupervised-learning.md), but evaluation usually becomes supervised once analysts label true incidents. Compared with [clustering](clustering.md), the goal is not to assign every point to a group; compared with [class imbalance](class-imbalance.md), the rare class may not be labeled at training time.

## Defining math

Many methods learn a score $s(x)$ where larger or smaller means more anomalous, then flag $\hat y=\mathbf 1\{s(x)\ge\tau\}$ or the corresponding lower-tail rule. Density methods flag low estimated density, $\hat y=\mathbf 1\{\hat p(x)<\tau\}$. Isolation Forest isolates points by random partitioning; anomalies tend to have shorter average path lengths.

## Intuition

An anomaly is not just a rare point. It is rare under the model of normal behavior and relevant to the operational question. A new legitimate customer segment can look anomalous, while a common failure pattern may stop looking unusual after enough incidents accumulate.

## Worked example

This example creates a normal two-dimensional cloud plus a small separated outlier cluster, then checks whether Isolation Forest flags the separated points at the requested contamination rate.

```python
import numpy as np
from sklearn.ensemble import IsolationForest

rng = np.random.default_rng(22)
normal = rng.normal(0, 1, size=(120, 2))
outliers = rng.normal(6, .5, size=(6, 2))
X = np.vstack([normal, outliers])
iso = IsolationForest(contamination=6/126, random_state=22).fit(X)
pred = iso.predict(X)
print("flagged_total", int((pred == -1).sum()))
print("outliers_flagged", int((pred[-6:] == -1).sum()), "of", len(outliers))
print("normal_flagged", int((pred[:-6] == -1).sum()), "of", len(normal))
```

Observed output:

```text
flagged_total 6
outliers_flagged 6 of 6
normal_flagged 0 of 120
```

The synthetic outliers are far from the normal cloud, so the fitted contamination threshold flags exactly those six points.

## Caveats

The contamination parameter bakes in an expected alert rate. High-dimensional distance concentration can make "far away" less meaningful. Concept drift changes normality, so anomaly systems need monitoring and analyst feedback loops.

## References

- [scikit-learn User Guide: Novelty and Outlier Detection](https://scikit-learn.org/stable/modules/outlier_detection.html)
- [scikit-learn User Guide: Isolation Forest](https://scikit-learn.org/stable/modules/outlier_detection.html#isolation-forest)

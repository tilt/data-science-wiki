---
title: Support Vector Machines
slug: classical-machine-learning/support-vector-machines
description: "Maximum-margin classifiers trained with hinge loss and optional kernel feature maps."
area: classical-machine-learning
topics:
  - support-vector-machines
level: intermediate
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - logistic-regression.md
  - regularization.md
  - classification.md
  - linear-models.md
historical_context: false
last_reviewed: 2026-07-11
---

# Support Vector Machines

Support vector machines learn a decision boundary with a large margin. Unlike [logistic regression](logistic-regression.md), an SVM is not primarily a probability model; it optimizes margin violations through hinge loss. Kernels make the boundary nonlinear while preserving a linear separator in an implicit feature space.

## Defining math

For labels $y_i\in\{-1,1\}$ and score $f(x)=w^\top x+b$, the soft-margin primal objective is

$$
\min_{w,b,\xi}\frac{1}{2}\lVert w\rVert_2^2 + C\sum_i \xi_i
$$

subject to $y_i(w^\top x_i+b)\ge 1-\xi_i$ and $\xi_i\ge0$. Equivalently, minimize $\frac12\lVert w\rVert_2^2+C\sum_i\max(0,1-y_if(x_i))$. $C$ is inverse [regularization](regularization.md): large $C$ penalizes violations strongly.

## Intuition

The classifier tries to put the boundary as far as possible from the nearest difficult points. That margin can generalize well in high-dimensional sparse data, but the decision scores need calibration before they are treated as probabilities.

## Worked example

This example fits a linear SVM after standardizing the features. `LinearSVC.decision_function` returns the signed margin score $f(x)=w^\top x+b$: negative scores are one class, positive scores are the other, and larger absolute values are farther from the learned boundary.

```python
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import LinearSVC
import numpy as np

X, y = make_classification(n_samples=180, n_features=4, n_informative=2,
                           n_redundant=0, class_sep=1.2, random_state=18)
Xtr, Xte, ytr, yte = train_test_split(X, y, stratify=y, random_state=18)
svm = make_pipeline(StandardScaler(), LinearSVC(C=1.0, random_state=18, max_iter=10000)).fit(Xtr, ytr)
print("accuracy", round(svm.score(Xte, yte), 3))
print("decision_first5", np.round(svm.decision_function(Xte[:5]), 3))
```

Observed output:

```text
accuracy 0.956
decision_first5 [-1.973 -0.781  1.463  0.301 -0.661]
```

The held-out accuracy is `0.956`, so the linear margin separates most test examples in this synthetic problem. The first five scores predict classes by sign: the first two and fifth are on the negative side, while the third and fourth are on the positive side. The magnitude is distance-like confidence, not a calibrated probability.

## Caveats

Feature scaling is essential because the margin is geometric. Kernel SVMs can be expensive on large datasets. Probability estimates from SVMs are post-hoc calibrated and should be validated with [calibration](calibration.md) metrics.

## References

- [Cortes and Vapnik, 1995, Support-vector networks](https://doi.org/10.1007/BF00994018)
- [scikit-learn User Guide: Support Vector Machines](https://scikit-learn.org/stable/modules/svm.html)

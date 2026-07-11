---
title: Random Forests
slug: classical-machine-learning/random-forests
description: "Bagged decision-tree ensembles that reduce variance through bootstrap and feature randomness."
area: classical-machine-learning
topics:
  - random-forests
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - decision-trees.md
  - gradient-boosting.md
  - bias-variance-trade-off.md
  - interpretability.md
historical_context: false
last_reviewed: 2026-07-11
---
# Random Forests

A random forest averages many noisy [decision trees](decision-trees.md). Each tree is trained on a bootstrap sample, and each split considers only a random subset of features. The goal is to reduce variance without increasing bias as much as a single shallow tree would.

## Defining math

For regression, $\hat f_{RF}(x)=B^{-1}\sum_{b=1}^B T_b(x)$. For classification, vote share estimates $\hat p_k(x)=B^{-1}\sum_{b=1}^B \mathbf 1\{T_b(x)=k\}$. Averaging helps most when individual trees are strong but not too correlated. Feature subsampling lowers correlation; bootstrap sampling gives out-of-bag examples that can estimate error.

## Intuition

A single deep tree may latch onto one accidental split. A forest asks many trees to make different mistakes, then averages them. This connects directly to the [bias-variance trade-off](bias-variance-trade-off.md): variance falls because idiosyncratic tree structure is diluted.

## Worked example

```python
from sklearn.datasets import make_classification
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

X, y = make_classification(n_samples=300, n_features=8, n_informative=4, random_state=6)
Xtr, Xte, ytr, yte = train_test_split(X, y, stratify=y, random_state=6)
for est in [DecisionTreeClassifier(random_state=6),
            RandomForestClassifier(n_estimators=100, random_state=6, oob_score=True)]:
    est.fit(Xtr, ytr)
    extra = f" oob {est.oob_score_:.3f}" if hasattr(est, "oob_score_") else ""
    print(est.__class__.__name__, "test_acc", round(est.score(Xte, yte), 3), extra)
```

Observed output:

```text
DecisionTreeClassifier test_acc 0.733 
RandomForestClassifier test_acc 0.827  oob 0.742
```

The forest improves held-out accuracy over one tree. Its out-of-bag estimate is computed from examples omitted from each tree's bootstrap sample.

## Random forests versus boosting

Forests train trees mostly independently and average them. [Gradient boosting](gradient-boosting.md) trains trees sequentially so later trees correct earlier residuals. Forests are often easier to tune and parallelize; boosting can achieve lower bias but is more sensitive to learning rate, depth, and early stopping.

## Caveats

Forests do not extrapolate outside the training target range in regression. Correlated features split importance among themselves, and impurity importance can be biased toward variables with many split points. For calibrated probabilities, inspect [calibration](calibration.md) rather than assuming vote shares are decision-ready probabilities.

## References

- [Breiman, 2001, Random Forests](https://doi.org/10.1023/A:1010933404324)
- [scikit-learn User Guide: Forests of randomized trees](https://scikit-learn.org/stable/modules/ensemble.html#forests-of-randomized-trees)

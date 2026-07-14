---
title: Data Leakage
slug: classical-machine-learning/data-leakage
description: "Validation contamination caused by target, time, group, or preprocessing information crossing split boundaries."
area: classical-machine-learning
topics:
  - data-leakage
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - feature-engineering.md
  - model-selection.md
  - evaluation-metrics.md
  - supervised-learning.md
historical_context: false
last_reviewed: 2026-07-11
---
# Data Leakage

Data leakage occurs when training or validation uses information that would not be available at prediction time. It is not a minor hygiene issue; it changes the estimand of [supervised learning](supervised-learning.md) and makes [evaluation metrics](evaluation-metrics.md) optimistic.

## Defining math

The intended validation estimate is $\hat R_{val}=|V|^{-1}\sum_{i\in V}L(y_i,\hat f_T(x_i))$, where $\hat f_T$ is fit only on training data $T$. Leakage means the fitted pipeline depends on validation labels or future information: $\hat f=A(T,V,y_V)$ instead of $\hat f=A(T)$.

## Intuition

Leakage gives the model an answer key or a proxy for it. The model may look excellent in [model selection](model-selection.md) while learning a production-impossible shortcut.

## Worked example

This snippet compares cross-validation accuracy with clean features against accuracy after adding a target-derived leaky feature.

```python
import numpy as np
from sklearn.datasets import make_classification
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score

X, y = make_classification(n_samples=240, n_features=6, n_informative=3,
                           flip_y=.2, random_state=15)
leaky = y.reshape(-1, 1) + np.random.default_rng(15).normal(0, .01, size=(len(y), 1))
X_leaky = np.c_[X, leaky]
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=15)
clean = cross_val_score(LogisticRegression(max_iter=1000), X, y, cv=cv).mean()
leak = cross_val_score(LogisticRegression(max_iter=1000), X_leaky, y, cv=cv).mean()
print("clean_cv_accuracy", round(clean, 3))
print("with_target_leak_accuracy", round(leak, 3))
```

Observed output:

```text
clean_cv_accuracy 0.667
with_target_leak_accuracy 1.0
```

The leaked feature is a noisy copy of the label, so cross-validation becomes perfect. Real leakage is often less obvious but follows the same pattern.

## Caveats

Leakage often enters through [feature engineering](feature-engineering.md): aggregates computed over the full dataset, encodings using target means, or text fields created after outcome review. Time-aware and group-aware splitting should be chosen before looking at model performance.

## References

- [scikit-learn User Guide: Common pitfalls and recommended practices](https://scikit-learn.org/stable/common_pitfalls.html)
- [scikit-learn User Guide: Pipelines and composite estimators](https://scikit-learn.org/stable/modules/compose.html)

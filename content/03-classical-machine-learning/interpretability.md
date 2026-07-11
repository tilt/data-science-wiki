---
title: Interpretability
slug: classical-machine-learning/interpretability
description: "Explaining fitted model behavior through coefficients, rules, importances, and local effects."
area: classical-machine-learning
topics:
  - interpretability
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - decision-trees.md
  - random-forests.md
  - linear-models.md
  - evaluation-metrics.md
historical_context: false
last_reviewed: 2026-07-11
---
# Interpretability

Interpretability connects a fitted model's behavior to features, examples, and decisions. A [decision tree](decision-trees.md) is directly readable as rules; a [linear model](linear-models.md) exposes coefficients; a [random forest](random-forests.md) usually needs post-hoc tools such as permutation importance or partial dependence.

## Defining math

Permutation importance for feature $j$ estimates score drop after breaking the association between that feature and the target:

$$
I_j = S(\hat f, X, y) - S(\hat f, \pi_j(X), y),
$$

where $\pi_j$ randomly permutes column $j$ and $S$ is a chosen score. For additive local explanations, many methods approximate $\hat f(x)\approx\phi_0+\sum_j\phi_j(x)$.

## Intuition

Interpretability is not decoration after [evaluation metrics](evaluation-metrics.md). It is a debugging tool: which features drive predictions, where does the model rely on shortcuts, and which examples are near a decision boundary?

## Worked example

```python
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.inspection import permutation_importance
import numpy as np

X, y = load_iris(return_X_y=True)
rf = RandomForestClassifier(n_estimators=80, random_state=17).fit(X, y)
r = permutation_importance(rf, X, y, n_repeats=5, random_state=17, n_jobs=1)
print("accuracy", round(rf.score(X, y), 3))
print("permutation_importance_mean", np.round(r.importances_mean, 3))
```

Observed output:

```text
accuracy 1.0
permutation_importance_mean [0.016 0.011 0.163 0.52 ]
```

Permuting the fourth Iris feature hurts accuracy most, so this fitted forest relies heavily on it. Because the score is computed on training data here, treat the result as a mechanism demonstration, not a deployment audit.

## Caveats

Feature importance is not causality. Correlated features can hide each other's importance. Explanations should be computed on validation or production-like data, and they should be checked against [data leakage](data-leakage.md) because the most "important" feature may be an impossible shortcut.

## References

- [scikit-learn User Guide: Permutation feature importance](https://scikit-learn.org/stable/modules/permutation_importance.html)
- [scikit-learn User Guide: Partial dependence](https://scikit-learn.org/stable/modules/partial_dependence.html)

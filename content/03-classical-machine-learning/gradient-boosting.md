---
title: Gradient Boosting
slug: classical-machine-learning/gradient-boosting
description: "Stagewise additive models that fit weak learners to negative loss gradients."
area: classical-machine-learning
topics:
  - gradient-boosting
level: intermediate
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - decision-trees.md
  - random-forests.md
  - regularization.md
  - model-selection.md
historical_context: false
last_reviewed: 2026-07-11
---

# Gradient Boosting

Gradient boosting builds an additive model by fitting each new learner to the direction that most reduces the current loss. In tabular classical ML, the weak learner is usually a small [decision tree](decision-trees.md), giving a sequence of trees rather than the parallel averaging used by [random forests](random-forests.md).

## Defining math

Initialize $F_0=\arg\min_\gamma\sum_i L(y_i,\gamma)$. At step $m$, compute pseudo-residuals

$$
r_{im}=-\left[\frac{\partial L(y_i,F(x_i))}{\partial F(x_i)}\right]_{F=F_{m-1}},
$$

fit $h_m$ to $r_{im}$, choose $\gamma_m=\arg\min_\gamma\sum_i L(y_i,F_{m-1}(x_i)+\gamma h_m(x_i))$, and update $F_m(x)=F_{m-1}(x)+\nu\gamma_mh_m(x)$.

## Intuition

Boosting is functional gradient descent. Instead of changing a coefficient vector directly, it changes the prediction function by adding a small tree that points downhill for the loss. This is powerful but needs [regularization](regularization.md): shallow trees, shrinkage, subsampling, and early stopping keep the stagewise corrections from chasing noise.

## Worked example

The snippet fits a small gradient-boosted tree model and inspects staged predictions, which expose the additive sequence of learners rather than only the final score.

```python
from sklearn.datasets import make_classification
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

X, y = make_classification(n_samples=300, n_features=8, n_informative=4, random_state=8)
Xtr, Xte, ytr, yte = train_test_split(X, y, stratify=y, random_state=8)
gb = GradientBoostingClassifier(n_estimators=60, learning_rate=0.1,
                                max_depth=2, random_state=8).fit(Xtr, ytr)
staged = [accuracy_score(yte, p) for p in gb.staged_predict(Xte)]
print("test_acc", round(gb.score(Xte, yte), 3))
print("staged_first3", [round(s, 3) for s in staged[:3]])
print("staged_last", round(staged[-1], 3))
```

Observed output:

```text
test_acc 0.853
staged_first3 [0.813, 0.827, 0.827]
staged_last 0.853
```

The staged scores show the additive process. More trees are not automatically better; validation curves decide when the sequence should stop.

## Caveats

Boosting can overfit mislabeled examples because later stages focus on hard residuals. Low learning rates usually require more trees. The best hyperparameters are coupled, so tune depth, learning rate, number of estimators, and subsampling together through [model selection](model-selection.md).

## References

- [Friedman, 2001, Greedy Function Approximation: A Gradient Boosting Machine](https://doi.org/10.1214/aos/1013203451)
- [scikit-learn User Guide: Gradient Tree Boosting](https://scikit-learn.org/stable/modules/ensemble.html#gradient-tree-boosting)

> [!nav]
> **Section** — [Classical Machine Learning](index.md)
>
> [← Random Forests](random-forests.md) [Interpretability →](interpretability.md)

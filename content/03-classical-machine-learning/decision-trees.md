---
title: Decision Trees
slug: classical-machine-learning/decision-trees
description: "Recursive partition models trained by impurity or variance-reduction splits."
area: classical-machine-learning
topics:
  - decision-trees
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - random-forests.md
  - gradient-boosting.md
  - interpretability.md
  - bias-variance-trade-off.md
historical_context: false
last_reviewed: 2026-07-11
---
# Decision Trees

A decision tree predicts by routing an example through feature-threshold tests until it reaches a leaf. It is the base learner behind [random forests](random-forests.md) and most classical [gradient boosting](gradient-boosting.md) systems.

## Defining math

For classification, a node $m$ with class proportions $p_{mk}$ can use Gini impurity $G_m=1-\sum_k p_{mk}^2$ or entropy $H_m=-\sum_k p_{mk}\log p_{mk}$. A split $s$ is chosen by maximizing impurity decrease:

$$
\Delta(s,m)=I_m-\frac{n_L}{n_m}I_L-\frac{n_R}{n_m}I_R.
$$

For regression trees, $I_m$ is usually within-node variance or squared error. Prediction is the majority class or mean target in the reached leaf.

## Intuition

A tree builds axis-aligned if-then rules. Each split asks for the single question that makes the children purer than the parent. This makes trees easy to explain with [interpretability](interpretability.md) tools, but it also makes them unstable: a slightly different sample can change an early split and therefore the whole subtree.

## Worked example

This snippet trains a depth-limited Iris decision tree and reports accuracy, feature importances, and the feature-threshold split used at the root.

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
import numpy as np

X, y = load_iris(return_X_y=True)
Xtr, Xte, ytr, yte = train_test_split(X, y, stratify=y, random_state=5)
tree = DecisionTreeClassifier(max_depth=2, random_state=5).fit(Xtr, ytr)
print("accuracy", round(tree.score(Xte, yte), 3))
print("feature_importances", np.round(tree.feature_importances_, 3))
print("root_feature", tree.tree_.feature[0], "root_threshold", round(tree.tree_.threshold[0], 2))
```

Observed output:

```text
accuracy 0.921
feature_importances [0. 0. 0. 1.]
root_feature 3 root_threshold 0.8
```

This shallow tree uses the fourth Iris feature for all impurity reduction. The high accuracy is interpretable but not a guarantee that the same single-feature rule is stable on another sample.

## Caveats

Deep unpruned trees have low bias and high variance, which is why they are often averaged in [random forests](random-forests.md). Axis-aligned splits can approximate curved boundaries only with many rectangles. Standard impurity-based feature importance can favor continuous or high-cardinality features.

## References

- [scikit-learn User Guide: Decision Trees](https://scikit-learn.org/stable/modules/tree.html)
- [An Introduction to Statistical Learning](https://www.statlearning.com/)

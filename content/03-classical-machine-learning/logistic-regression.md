---
title: Logistic Regression
slug: classical-machine-learning/logistic-regression
description: "A linear log-odds model for estimating class probabilities with cross-entropy loss."
area: classical-machine-learning
topics:
  - logistic-regression
level: intermediate
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - regression.md
  - linear-models.md
  - calibration.md
  - classification.md
  - evaluation-metrics.md
  - regularization.md
historical_context: false
last_reviewed: 2026-07-11
---

# Logistic Regression

Logistic regression is a [linear model](linear-models.md) for class probability, not a regression model for continuous targets. Compared with [regression](regression.md), it keeps the linear score but replaces squared error on $y\in\mathbb R$ with Bernoulli likelihood and cross-entropy on $y\in\{0,1\}$.

## Defining math

The score and sigmoid are

$$
z_i = \beta_0 + x_i^\top\beta, \qquad \sigma(z_i)=\frac{1}{1+e^{-z_i}}.
$$

The model estimates

$$
P(Y_i=1\mid x_i)=p_i=\sigma(z_i).
$$

The unregularized negative log-likelihood is

$$
\ell(\beta_0,\beta)=-\sum_{i=1}^n\left[y_i\log p_i + (1-y_i)\log(1-p_i)\right],
$$

with gradient

$$
\nabla_\beta \ell = X^\top(p-y).
$$

Most practical fits add [regularization](regularization.md), for example $\lambda\lVert\beta\rVert_2^2/2$, because high-dimensional or nearly separable data can drive coefficients to unstable values.

## Intuition

A coefficient is an additive effect on log-odds: increasing feature $x_j$ by one unit changes $\log(p/(1-p))$ by $\beta_j$, holding other features fixed. The sigmoid then maps any score to $[0,1]$. This makes logistic regression a natural baseline when [classification](classification.md) decisions need probabilities, thresholds, and [calibration](calibration.md), not just labels.

## Worked example

This snippet trains a standardized logistic regression classifier and reports accuracy, log loss, the confusion matrix, and example predicted probabilities.

```python
from sklearn.datasets import make_classification
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, log_loss
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
import numpy as np

X, y = make_classification(n_samples=160, n_features=4, n_informative=2,
                           n_redundant=0, class_sep=1.4, random_state=12)
Xtr, Xte, ytr, yte = train_test_split(X, y, stratify=y, random_state=12)
clf = make_pipeline(StandardScaler(), LogisticRegression(random_state=12)).fit(Xtr, ytr)
proba = clf.predict_proba(Xte)[:, 1]
pred = clf.predict(Xte)
print("accuracy", round(accuracy_score(yte, pred), 3), "log_loss", round(log_loss(yte, proba), 3))
print("confusion")
print(confusion_matrix(yte, pred))
print("first5_proba", np.round(proba[:5], 3))
```

Observed output:

```text
accuracy 0.925 log_loss 0.166
confusion
[[18  2]
 [ 1 19]]
first5_proba [0.98  0.031 0.133 0.079 0.973]
```

The model makes three mistakes on forty held-out examples. The probability output is useful beyond accuracy: changing the decision threshold would trade false positives against false negatives, which should be reported with [evaluation metrics](evaluation-metrics.md).

## Caveats

Perfectly separable data makes the maximum-likelihood coefficients diverge; regularization gives a finite solution. A linear log-odds assumption can be wrong even when accuracy is acceptable, so inspect calibration curves and segment-level errors. Coefficients are not causal effects unless the data-generating and adjustment assumptions support that interpretation.

## References

- [scikit-learn User Guide: Logistic regression](https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression)
- [An Introduction to Statistical Learning](https://www.statlearning.com/)

---
title: Supervised Learning
slug: classical-machine-learning/supervised-learning
description: "Learning a predictive mapping from labeled examples by minimizing expected loss."
area: classical-machine-learning
topics:
  - supervised-learning
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - regression.md
  - classification.md
  - model-selection.md
  - data-leakage.md
historical_context: false
last_reviewed: 2026-07-11
---
# Supervised Learning

Supervised learning estimates a function $f: \mathcal X \to \mathcal Y$ from labeled examples $(x_i, y_i)$. The target may be continuous, as in [regression](regression.md), or discrete, as in [classification](classification.md); the shared contract is that future examples are judged against labels drawn from the same deployment problem.

## Objective

The statistical target is usually the risk

$$
R(f) = \mathbb E[L(Y, f(X))],
$$

where $L$ is a task loss. Because the joint distribution of $(X,Y)$ is unknown, training minimizes empirical risk, often with a complexity penalty:

$$
\hat f = \arg\min_{f \in \mathcal F}\frac{1}{n}\sum_{i=1}^n L(y_i, f(x_i)) + \lambda \Omega(f).
$$

The loss chooses what errors mean. Squared error gives conditional-mean estimates for [regression](regression.md); cross-entropy gives conditional-probability estimates for [logistic regression](logistic-regression.md); hinge loss gives a margin classifier for [support vector machines](support-vector-machines.md). The validation split belongs to the objective in practice because [model selection](model-selection.md) chooses $\mathcal F$, $\lambda$, preprocessing, and thresholds.

## Intuition

A supervised model is not learning labels in the abstract. It is learning a reusable rule that maps information available at prediction time to a decision-relevant output. The strongest mental check is temporal: would every feature in $x$ be known before $y$ happens? If not, [data leakage](data-leakage.md) can make empirical risk look low while deployment risk is high.

## Worked example

This snippet trains a linear regression model with a train-test split and reports test $R^2$ plus the learned feature coefficients.

```python
from sklearn.datasets import make_regression
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import numpy as np

X, y = make_regression(n_samples=80, n_features=3, noise=10, random_state=7)
Xtr, Xte, ytr, yte = train_test_split(X, y, random_state=7)
model = LinearRegression().fit(Xtr, ytr)
print("test_r2", round(model.score(Xte, yte), 3))
print("coef", np.round(model.coef_, 2))
```

Observed output:

```text
test_r2 0.956
coef [46.94 31.07 51.12]
```

The fitted rule explains most held-out variance on this synthetic linear problem. The coefficients are the learned contribution of each feature under a squared-error objective.

## Caveats

IID validation is a modelling assumption, not a default truth. Time, user, household, patient, or document-family dependence requires split rules that match deployment. Also, the fitted $\hat f$ is only as meaningful as the label: noisy labels increase irreducible error and can make more flexible models appear useful until they memorize annotation artifacts.

## References

- [scikit-learn User Guide: supervised learning](https://scikit-learn.org/stable/supervised_learning.html)
- [An Introduction to Statistical Learning](https://www.statlearning.com/)

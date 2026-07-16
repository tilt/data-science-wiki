---
title: Linear Models
slug: classical-machine-learning/linear-models
description: "Models whose prediction is a weighted sum of input features, with losses determining the task."
area: classical-machine-learning
topics:
  - linear-models
level: intermediate
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - regression.md
  - logistic-regression.md
  - regularization.md
  - feature-engineering.md
historical_context: false
last_reviewed: 2026-07-11
---

# Linear Models

A linear model predicts through a score $\eta = \beta_0 + x^\top\beta$. What changes across [regression](regression.md), [logistic regression](logistic-regression.md), and linear margin classifiers is the link from $\eta$ to the output and the loss used for fitting.

## Defining math

For squared-error regression,

$$
\hat y_i = \beta_0 + x_i^\top\beta, \qquad \min_{\beta_0,\beta}\sum_i (y_i - \hat y_i)^2.
$$

For binary logistic regression,

$$
P(Y=1\mid x) = \sigma(\eta)=\frac{1}{1+e^{-\eta}},
$$

with cross-entropy loss. With ridge [regularization](regularization.md), many linear objectives add

$$
\lambda \lVert\beta\rVert_2^2
$$

to shrink coefficients. The geometry is simple: a one-unit feature change moves the score by the corresponding coefficient, holding other features fixed. That interpretability is only meaningful when preprocessing, interactions, and scaling are explicit.

## Intuition

Linear models are strong baselines because they ask whether the representation already contains the answer. If a linear model works well, the features encode the signal in an almost additive way. If it fails with systematic residuals or segment errors, the next move is often [feature engineering](feature-engineering.md), not immediately a larger model.

## Worked example

This snippet fits ordinary least squares and Ridge regression on correlated features, comparing coefficients and $R^2$ to show shrinkage under multicollinearity.

```python
from sklearn.datasets import make_regression
from sklearn.linear_model import LinearRegression, Ridge
import numpy as np

X, y = make_regression(n_samples=120, n_features=4, noise=15, random_state=4)
X[:, 3] = X[:, 0] * 0.95 + np.random.default_rng(4).normal(0, .05, size=120)
for name, est in [("ols", LinearRegression()), ("ridge", Ridge(alpha=10))]:
    est.fit(X, y)
    print(name, "coef", np.round(est.coef_, 2), "r2", round(est.score(X, y), 3))
```

Observed output:

```text
ols coef [-45.33   6.73  -0.25  85.54] r2 0.522
ridge coef [17.16  6.44 -0.65 18.25] r2 0.516
```

The fourth feature is almost a copy of the first. OLS splits weight unstably across the correlated pair, while ridge gives a slightly lower training $R^2$ with much less extreme coefficients.

## Caveats

Coefficient magnitude is not comparable across differently scaled features. Correlated predictors make individual coefficient stories fragile even when predictions are stable. Linear additivity also hides interactions: if risk rises only when two conditions co-occur, the model needs interaction features or a nonlinear method such as [decision trees](decision-trees.md).

## References

- [scikit-learn User Guide: Linear Models](https://scikit-learn.org/stable/modules/linear_model.html)
- [An Introduction to Statistical Learning](https://www.statlearning.com/)

> [!nav]
> **Section** — [Classical Machine Learning](index.md)
>
> [← Classification](classification.md) [Logistic Regression →](logistic-regression.md)

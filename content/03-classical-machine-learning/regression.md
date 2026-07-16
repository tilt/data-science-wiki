---
title: Regression
slug: classical-machine-learning/regression
description: "Continuous-target prediction, including ordinary least squares and residual diagnostics."
area: classical-machine-learning
topics:
  - regression
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - linear-models.md
  - logistic-regression.md
  - regularization.md
  - evaluation-metrics.md
historical_context: false
last_reviewed: 2026-07-11
---

# Regression

Regression estimates a numeric target $y \in \mathbb R$ from features $x$. In the standard linear case, [linear models](linear-models.md) estimate the conditional mean $\mathbb E[Y\mid X=x]$ by minimizing residual error; [logistic regression](logistic-regression.md) uses a similar linear score but changes the target from a continuous value to a class probability and changes the loss from squared error to cross-entropy.

## Defining math

Ordinary least squares writes predictions as

$$
\hat y = x^\top \beta,
$$

and solves

$$
\hat\beta = \arg\min_\beta \lVert y - X\beta\rVert_2^2.
$$

When $X^\top X$ is invertible, the closed-form estimator is

$$
\hat\beta = (X^\top X)^{-1}X^\top y.
$$

One common fit metric is

$$
R^2=1-\frac{\sum_i(y_i-\hat y_i)^2}{\sum_i(y_i-\bar y)^2},
$$

which compares squared residual error with the error from predicting the sample mean.

Residuals $e_i = y_i - \hat y_i$ are not just errors; their pattern is a diagnostic. Curvature suggests missing [feature engineering](feature-engineering.md), changing variance suggests heteroscedasticity, and large leverage points can dominate the fitted line. Penalized versions such as ridge replace the objective with $\lVert y-X\beta\rVert_2^2 + \lambda\lVert\beta\rVert_2^2$, connecting regression directly to [regularization](regularization.md).

## Intuition

OLS projects the target vector onto the column space of the design matrix. The fitted values are the closest points, in Euclidean distance, that the model class can express. If the true signal is mostly linear in the chosen features, this is efficient and transparent; if the signal is nonlinear, OLS gives the best linear shadow, not the underlying mechanism.

## Worked example

This snippet fits a one-feature linear regression on the diabetes dataset and reports the slope, intercept, RMSE, and several predictions beside true values.

```python
from sklearn.datasets import load_diabetes
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
import numpy as np

X, y = load_diabetes(return_X_y=True)
Xtr, Xte, ytr, yte = train_test_split(X[:, [2]], y, random_state=0)
reg = LinearRegression().fit(Xtr, ytr)
pred = reg.predict(Xte[:5])
print("slope", round(reg.coef_[0], 2), "intercept", round(reg.intercept_, 2))
print("rmse", round(mean_squared_error(yte, reg.predict(Xte)) ** 0.5, 2))
print("first5_pred", np.round(pred, 1))
print("first5_true", yte[:5].astype(int))
```

Observed output:

```text
slope 1016.92 intercept 153.23
rmse 64.66
first5_pred [259.8 214.9 162.3 129.4 199.5]
first5_true [321 215 127  64 175]
```

With only one feature, the model captures a broad trend but individual errors remain large. The RMSE is in target units, so it can be compared with operational tolerance rather than only with $R^2$.

## Caveats

OLS coefficients become unstable when features are nearly collinear because $X^\top X$ is close to singular. Outliers affect squared error strongly. Extrapolation is linear forever, so a plausible fit inside the training range can produce impossible predictions outside it. Report regression with [evaluation metrics](evaluation-metrics.md) that match the decision: RMSE punishes large misses, MAE is more robust, and residual plots often reveal failures that aggregate scores hide.

## References

- [scikit-learn User Guide: Ordinary Least Squares](https://scikit-learn.org/stable/modules/linear_model.html#ordinary-least-squares)
- [An Introduction to Statistical Learning](https://www.statlearning.com/)

> **Section — [Classical Machine Learning](index.md):** ← [Supervised Learning](supervised-learning.md) · [Classification](classification.md) →

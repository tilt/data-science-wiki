---
title: Bias-Variance Trade-Off
slug: classical-machine-learning/bias-variance-trade-off
description: "A decomposition of prediction error into systematic misspecification and sample sensitivity."
area: classical-machine-learning
topics:
  - bias-variance-trade-off
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - regularization.md
  - model-selection.md
  - random-forests.md
  - decision-trees.md
historical_context: false
last_reviewed: 2026-07-11
---
# Bias-Variance Trade-Off

The bias-variance trade-off explains why a model can fail by being too rigid or too sensitive. High-bias models underfit because the function class misses real structure; high-variance models overfit because small changes in the training data change the fitted function. [Regularization](regularization.md), [model selection](model-selection.md), and ensembling all manipulate this trade-off.

## Defining math

For squared-error regression with training set $D$ and noise variance $\sigma^2$, expected prediction error at $x$ decomposes as

$$
\mathbb E_D[(Y-\hat f_D(x))^2] = (\mathbb E_D[\hat f_D(x)]-f(x))^2 + \mathbb E_D[(\hat f_D(x)-\mathbb E_D[\hat f_D(x)])^2] + \sigma^2.
$$

The three terms are squared bias, variance, and irreducible noise. A single deep [decision tree](decision-trees.md) can have low bias and high variance; [random forests](random-forests.md) reduce variance by averaging many decorrelated trees.

## Intuition

Bias is being consistently wrong. Variance is being differently wrong depending on which sample you happened to collect. Training error mainly reveals fit to the observed sample; validation error reveals whether that fit survives new data.

## Worked example

This snippet fits a shallow and an unlimited-depth decision tree to the same noisy regression data to contrast underfitting with high-variance overfitting.

```python
from sklearn.datasets import make_regression
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeRegressor

X, y = make_regression(n_samples=160, n_features=1, noise=35, random_state=2)
Xtr, Xte, ytr, yte = train_test_split(X, y, random_state=2)
for depth in [1, None]:
    tree = DecisionTreeRegressor(max_depth=depth, random_state=2).fit(Xtr, ytr)
    label = "unlimited" if depth is None else depth
    print("max_depth", label,
          "train_rmse", round(mean_squared_error(ytr, tree.predict(Xtr)) ** 0.5, 1),
          "test_rmse", round(mean_squared_error(yte, tree.predict(Xte)) ** 0.5, 1))
```

Observed output:

```text
max_depth 1 train_rmse 32.6 test_rmse 34.8
max_depth unlimited train_rmse 0.0 test_rmse 48.6
```

The unlimited tree memorizes the training set exactly but generalizes worse. The stump has more bias but lower variance on this sample.

## Caveats

The decomposition above is exact for squared-error regression, but classification losses do not decompose as cleanly. Also, validation error is itself noisy; choosing among many models on one small validation split can overfit the validation set.

## References

- [An Introduction to Statistical Learning](https://www.statlearning.com/)
- [scikit-learn User Guide: validation curves](https://scikit-learn.org/stable/modules/learning_curve.html#validation-curve)

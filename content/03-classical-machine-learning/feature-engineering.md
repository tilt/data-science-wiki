---
title: Feature Engineering
slug: classical-machine-learning/feature-engineering
description: "Constructing representations that expose useful structure to classical models without leaking target information."
area: classical-machine-learning
topics:
  - feature-engineering
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - linear-models.md
  - data-leakage.md
  - regularization.md
  - model-selection.md
historical_context: false
last_reviewed: 2026-07-11
---

# Feature Engineering

Feature engineering changes the representation $x\mapsto\phi(x)$ so a model can express the relevant relationship. It is especially important for [linear models](linear-models.md), where the model may be simple but the features can encode nonlinearities, interactions, lags, bins, or domain aggregates.

## Defining math

A model trained on engineered features predicts $\hat y=f(\phi(x))$. Polynomial features, for example, map one variable to $\phi(x)=[x,x^2,\dots,x^d]$. Feature maps alter both approximation power and risk. More features can reduce bias, but they increase variance and often require [regularization](regularization.md). Every learned transformation must be fit inside the training split to avoid [data leakage](data-leakage.md).

## Intuition

A simple model can only use what the representation makes visible. If the target is quadratic in a raw input, a straight-line model fails; adding $x^2$ gives the same estimator the right coordinate system.

## Worked example

The code uses a target that is quadratic in one raw feature. It compares a plain linear model with the same model after adding a degree-2 polynomial feature.

```python
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures

rng = np.random.default_rng(16)
X = rng.uniform(-2, 2, size=(160, 1))
y = 3 * X[:, 0] ** 2 + rng.normal(0, .5, size=160)
Xtr, Xte, ytr, yte = train_test_split(X, y, random_state=16)
for name, pipe in [("linear", LinearRegression()),
                   ("poly2", make_pipeline(PolynomialFeatures(2, include_bias=False), LinearRegression()))]:
    pipe.fit(Xtr, ytr)
    print(name, "test_r2", round(pipe.score(Xte, yte), 3))
```

Observed output:

```text
linear test_r2 -0.106
poly2 test_r2 0.991
```

The raw linear model misses the U-shape completely. The quadratic feature makes the structure available without changing the final estimator class.

## Caveats

Target encodings, rolling aggregates, and normalization are high-risk leakage points. High-cardinality categorical expansion can create sparse features that overfit rare categories. Feature engineering should be evaluated through the same [model selection](model-selection.md) protocol as model hyperparameters.

## References

- [scikit-learn User Guide: Preprocessing data](https://scikit-learn.org/stable/modules/preprocessing.html)
- [scikit-learn User Guide: Pipelines](https://scikit-learn.org/stable/modules/compose.html)

> **Section — [Classical Machine Learning](index.md):** ← [Data Leakage](data-leakage.md) · [Decision Trees](decision-trees.md) →

---
title: Stochastic Gradient Descent
slug: mathematical-foundations/stochastic-gradient-descent
description: "Gradient descent using noisy gradients from samples or mini-batches."
area: mathematical-foundations
topics:
  - optimization
  - stochastic-gradient-descent
level: foundational
status: review
page_type: algorithm
aliases:
  - SGD
prerequisites:
  - gradient-descent.md
related:
  - gradient-descent.md
  - gradients.md
  - optimization.md
  - ../06-deep-learning/optimizers.md
  - ../03-classical-machine-learning/logistic-regression.md
historical_context: false
last_reviewed: 2026-07-11
---

# Stochastic Gradient Descent

Stochastic gradient descent updates parameters using one example or a mini-batch instead of the full dataset. The update is noisier than batch [gradient descent](gradient-descent.md), but each step is cheaper and the noise can help large-scale learning move through flat regions.

## Defining math

For empirical risk

$$
F(\theta)=\frac{1}{n}\sum_{i=1}^n \ell_i(\theta),
$$

full gradient descent uses $\nabla F(\theta)$. SGD samples an index or mini-batch $B_t$ and updates

$$
\theta_{t+1}=\theta_t-\eta_t\frac{1}{|B_t|}\sum_{i\in B_t}\nabla \ell_i(\theta_t).
$$

The mini-batch gradient is an unbiased estimate of the full gradient when samples are drawn uniformly. This is the mathematical bridge from [gradients](gradients.md) to neural-network [optimizers](../06-deep-learning/optimizers.md) and online versions of models such as [logistic regression](../03-classical-machine-learning/logistic-regression.md).

## Executed demo

This snippet runs stochastic gradient updates on a noiseless one-dimensional linear regression problem and reports the learned slope, intercept, and MSE.

```python
import numpy as np

rng = np.random.default_rng(4)
X = rng.normal(size=(20, 1)); y = 3*X[:, 0] + 1
w = 0.; b = 0.; eta = 0.1
for epoch in range(5):
    for i in rng.permutation(len(X)):
        pred = w*X[i, 0] + b
        err = pred - y[i]
        w -= eta*2*err*X[i, 0]
        b -= eta*2*err
print("w_b_after_5_epochs", round(w, 4), round(b, 4))
print("mse", round(np.mean((w*X[:, 0]+b-y)**2), 8))
```

Observed output:

```text
w_b_after_5_epochs 3.0 1.0
mse 0.0
```

On this noiseless one-dimensional regression, SGD recovers the true slope and intercept after five passes through the data: `w_b_after_5_epochs` is `3.0 1.0`, and the resulting MSE is `0.0`.

## Caveats

SGD is sensitive to learning-rate schedules and batch construction. Non-shuffled data can bias early updates, and noisy gradients can bounce around the optimum unless the step size decays or averaging is used.

## References

- [Boyd and Vandenberghe, Convex Optimization](https://web.stanford.edu/~boyd/cvxbook/bv_cvxbook.pdf)
- [SciPy documentation: `scipy.optimize.minimize`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.minimize.html)

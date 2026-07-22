---
title: Statistical Modelling
slug: probability-and-statistics/statistical-modelling
description: "Representing data as observations from a stochastic structure with parameters, assumptions, and uncertainty."
area: probability-and-statistics
topics:
  - statistical-modelling
level: foundational
status: complete
page_type: model
aliases:
  - Statistical Modeling
prerequisites:
  - index.md
related:
  - statistical-estimation.md
  - covariance-and-correlation.md
  - maximum-likelihood.md
  - ../03-classical-machine-learning/regression.md
historical_context: false
last_reviewed: 2026-07-22
---

# Statistical Modelling

A statistical model specifies a family of probability laws for data. A simple Gaussian linear model writes

$$
Y_i=x_i^\top\beta+\epsilon_i,\qquad
\epsilon_i\sim\mathcal N(0,\sigma^2).
$$

Here $Y_i$ is the response for observation $i$, $x_i$ is its covariate vector, $\beta$ is the parameter vector, and $\epsilon_i$ is residual noise. The normal assumption says residuals are modeled as centered Gaussian variation with variance $\sigma^2$.

This is more than a prediction formula: it names a response, covariates, parameters, error distribution, independence assumptions, and a likelihood for [maximum likelihood](maximum-likelihood.md) or Bayesian fitting. Compared with [regression](../03-classical-machine-learning/regression.md), the statistical-model view puts uncertainty and assumptions first.

## Worked computation

The code generates data from the stated Gaussian linear model, fits the coefficients by least squares, and evaluates the Gaussian log-likelihood under the fitted noise scale.

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(20260711)
n = 80
X = np.column_stack([np.ones(n), rng.normal(size=n)])
beta = np.array([1.0, 2.0])
y = X @ beta + rng.normal(0, .7, size=n)
bhat = np.linalg.lstsq(X, y, rcond=None)[0]
resid = y - X @ bhat
sigma2 = np.mean(resid ** 2)
loglik = np.sum(stats.norm.logpdf(y, loc=X @ bhat, scale=np.sqrt(sigma2)))
print("beta_hat", np.round(bhat, 4).tolist(),
      "sigma_hat", round(np.sqrt(sigma2), 4),
      "loglik", round(loglik, 3))
```

Observed output:

```text
beta_hat [1.0462, 1.9582] sigma_hat 0.7355 loglik -88.934
```

The fitted coefficients `[1.0462,1.9582]` are close to the generating values `[1.0,2.0]`, and the fitted noise scale is `0.7355` for data generated with scale 0.7. The log-likelihood `-88.934` is meaningful only under the Gaussian error and independence assumptions.

| Model element            | Question it answers                                            |
| ------------------------ | -------------------------------------------------------------- |
| Response $Y_i$           | What quantity is being modeled?                                |
| Covariates $x_i$         | Which observed drivers are allowed to explain variation?       |
| Parameters $\beta$       | Which effects are estimated from data?                         |
| Error model $\epsilon_i$ | What residual variation remains after the covariates?          |
| Likelihood               | How plausible are the observed data under a parameter setting? |

## Caveats

Model fit is conditional on the chosen structure. Omitted variables, correlated errors, heteroscedasticity, and sampling bias can make precise estimates misleading. Use residual checks, [covariance and correlation](covariance-and-correlation.md), and sensitivity analysis before interpreting coefficients.

## References

- [Statistical model](https://en.wikipedia.org/wiki/Statistical_model)
- [SciPy statistics reference](https://docs.scipy.org/doc/scipy/reference/stats.html)

> [!nav]
> **Section** — [Probability and Statistics](index.md)
>
> [← Hypothesis Testing](hypothesis-testing.md) [Experimental Design →](experimental-design.md)

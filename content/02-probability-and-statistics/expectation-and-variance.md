---
title: Expectation and Variance
slug: probability-and-statistics/expectation-and-variance
description: "Mean and spread of a random variable, used to define risk, standard error, and estimator noise."
area: probability-and-statistics
topics:
  - expectation-and-variance
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - random-variables.md
  - common-distributions.md
  - central-limit-theorem.md
  - covariance-and-correlation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Expectation and Variance

Expectation is the probability-weighted average of a [random variable](random-variables.md); variance is the expected squared distance from that average. For a discrete variable,

$$
\mathbb E[X]=\sum_x xP(X=x), \qquad
\operatorname{Var}(X)=\mathbb E[(X-\mathbb E[X])^2].
$$

The equivalent identity

$$
\operatorname{Var}(X)=\mathbb E[X^2]-(\mathbb E[X])^2
$$

is often easier to compute. These quantities define the parameters of many [common distributions](common-distributions.md), the standard error in the [central limit theorem](central-limit-theorem.md), and the scale used in [covariance and correlation](covariance-and-correlation.md).

## Worked computation

```python
import numpy as np

x = np.array([0, 1, 2, 5])
p = np.array([.50, .30, .15, .05])
mu = np.dot(x, p)
var = np.dot((x - mu) ** 2, p)
rng = np.random.default_rng(20260711)
sample = rng.choice(x, size=200000, p=p)
print("exact_mean", round(mu, 4), "exact_var", round(var, 4))
print("sample_mean", round(sample.mean(), 4), "sample_var", round(sample.var(), 4))
```

Observed output:

```text
exact_mean 0.85 exact_var 1.4275
sample_mean 0.8492 sample_var 1.4311
```

The simulated long-run average is near the exact expectation. Variance is large relative to the mean because the rare value 5 contributes a large squared deviation.

## Caveats

The mean is not necessarily a typical value; skewed and heavy-tailed distributions can make it misleading. Some distributions have infinite variance, making normal standard-error formulas invalid.

## References

- [OpenStax Introductory Statistics 2e, Chapter 4 introduction](https://openstax.org/books/introductory-statistics-2e/pages/4-introduction)
- [SciPy statistics reference](https://docs.scipy.org/doc/scipy/reference/stats.html)

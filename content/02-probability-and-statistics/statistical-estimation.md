---
title: Statistical Estimation
slug: probability-and-statistics/statistical-estimation
description: "Using sample data and estimators to infer unknown population or model quantities with uncertainty."
area: probability-and-statistics
topics:
  - statistical-estimation
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - maximum-likelihood.md
  - confidence-intervals.md
  - expectation-and-variance.md
  - statistical-modelling.md
historical_context: false
last_reviewed: 2026-07-11
---

# Statistical Estimation

Statistical estimation turns sampled data into claims about a target quantity. The estimand is the quantity of interest, the estimator is the rule, and the estimate is the realized number. For example, the sample mean estimates $\mu=\mathbb E[X]$ with

$$
\hat\mu=\bar X=\frac{1}{n}\sum_{i=1}^n X_i.
$$

Estimator quality is described by bias and variance:

$$
\operatorname{Bias}(\hat\theta)=\mathbb E[\hat\theta]-\theta, \qquad
\operatorname{MSE}(\hat\theta)=\operatorname{Var}(\hat\theta)+\operatorname{Bias}(\hat\theta)^2.
$$

[Maximum likelihood](maximum-likelihood.md), [confidence intervals](confidence-intervals.md), and [statistical modelling](statistical-modelling.md) are different layers of this same problem.

## Worked computation

The simulation below repeatedly draws samples from a distribution whose true mean and variance are known. It checks whether the sample mean is approximately unbiased and whether its variance matches the theoretical $\sigma^2/n$ rule.

```python
import numpy as np

rng = np.random.default_rng(20260711)
reps = 20000
means = rng.exponential(scale=2.0, size=(reps, 25)).mean(axis=1)
print("estimator_mean", round(means.mean(), 4),
      "bias", round(means.mean() - 2.0, 4),
      "estimator_var", round(means.var(ddof=1), 4),
      "theory_var", round(4 / 25, 4))
```

Observed output:

```text
estimator_mean 1.9981 bias -0.0019 estimator_var 0.1587 theory_var 0.16
```

For exponential data with mean 2 and variance 4, the simulated estimator mean is `1.9981`, so the bias is only `-0.0019`. The estimator variance, `0.1587`, is close to the theoretical $\sigma^2/n=4/25=0.16$.

## Caveats

More data reduces sampling variance but does not fix a wrong estimand, biased sampling, leakage, dependence, or measurement changes. Reporting only a point estimate often hides the part that matters for decisions.

## References

- [OpenStax Introductory Statistics 2e, Chapter 8 introduction](https://openstax.org/books/introductory-statistics-2e/pages/8-introduction)
- [SciPy statistics reference](https://docs.scipy.org/doc/scipy/reference/stats.html)

> **Section — [Probability and Statistics](index.md):** ← [Markov Renewal Processes](markov-renewal-processes.md) · [Maximum Likelihood](maximum-likelihood.md) →

---
title: Covariance and Correlation
slug: probability-and-statistics/covariance-and-correlation
description: "Scale-dependent and standardized measures of linear co-movement between random variables."
area: probability-and-statistics
topics:
  - covariance-and-correlation
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - expectation-and-variance.md
  - random-variables.md
  - statistical-modelling.md
  - ../03-classical-machine-learning/pca.md
historical_context: false
last_reviewed: 2026-07-11
---
# Covariance and Correlation

Covariance measures whether two [random variables](random-variables.md) tend to be above or below their means together:

$$
\operatorname{Cov}(X,Y)=\mathbb E[(X-\mathbb E[X])(Y-\mathbb E[Y])].
$$

Correlation standardizes covariance by the two standard deviations:

$$
\rho_{X,Y}=\frac{\operatorname{Cov}(X,Y)}{\sigma_X\sigma_Y}.
$$

Covariance keeps the product of the units; correlation is unitless and lies in $[-1,1]$ when variances are positive. Covariance matrices are central in [statistical modelling](statistical-modelling.md) and [PCA](../03-classical-machine-learning/pca.md).

## Worked computation

```python
import numpy as np

rng = np.random.default_rng(20260711)
xy = rng.multivariate_normal([0, 0], [[4, 1.8], [1.8, 1]], size=5000)
print("sample_cov")
print(np.round(np.cov(xy, rowvar=False), 3))
print("sample_corr", round(np.corrcoef(xy, rowvar=False)[0, 1], 3),
      "theoretical_corr", round(1.8 / (2 * 1), 3))
```

Observed output:

```text
sample_cov
[[4.069 1.825]
 [1.825 1.009]]
sample_corr 0.901 theoretical_corr 0.9
```

The sample covariance matrix is close to the generating matrix; the correlation is high because $1.8$ is large relative to the product of the standard deviations.

## Caveats

Correlation measures linear association, not causality. Nonlinear dependence can have near-zero correlation, and outliers or shared trends can dominate the estimate.

## References

- [SciPy statistics reference](https://docs.scipy.org/doc/scipy/reference/stats.html)
- [OpenStax Introductory Statistics 2e, Chapter 4 introduction](https://openstax.org/books/introductory-statistics-2e/pages/4-introduction)

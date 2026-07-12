---
title: Common Distributions
slug: probability-and-statistics/common-distributions
description: "Reusable probability laws for counts, binary outcomes, waiting times, errors, and positive continuous quantities."
area: probability-and-statistics
topics:
  - common-distributions
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - random-variables.md
  - expectation-and-variance.md
  - maximum-likelihood.md
  - central-limit-theorem.md
historical_context: false
last_reviewed: 2026-07-11
---
# Common Distributions

A probability distribution assigns mass or density to the values of a [random variable](random-variables.md). The useful part is not the name; it is the data-generating mechanism. Bernoulli and binomial laws describe independent yes/no trials, Poisson laws describe counts under a constant rate, normal laws describe symmetric additive noise, and gamma or exponential laws describe positive waiting-time-like quantities.

Key examples:

$$
X\sim\operatorname{Binomial}(n,p), \quad
P(X=k)=\binom nkp^k(1-p)^{n-k}.
$$

$$
X\sim\operatorname{Poisson}(\lambda), \quad
P(X=k)=e^{-\lambda}\frac{\lambda^k}{k!}.
$$

Distribution choice directly affects [maximum likelihood](maximum-likelihood.md), [expectation and variance](expectation-and-variance.md), and whether a [central limit theorem](central-limit-theorem.md) approximation is reasonable.

## Worked computation

```python
import numpy as np

rng = np.random.default_rng(20260711)
samples = {
    "binom_20_.3": rng.binomial(20, .3, 100000),
    "poisson_4": rng.poisson(4, 100000),
    "gamma_2_3": rng.gamma(2, 3, 100000),
}
for name, s in samples.items():
    print(name, "mean", round(s.mean(), 3),
          "var", round(s.var(), 3), "q95", round(np.quantile(s, .95), 3))
```

Observed output:

```text
binom_20_.3 mean 6.005 var 4.17 q95 9.0
poisson_4 mean 3.992 var 3.989 q95 8.0
gamma_2_3 mean 6.006 var 18.102 q95 14.223
```

The binomial and gamma examples have similar means but very different spreads and upper tails, so replacing one distribution with another changes risk calculations.

## Caveats

Independence, constant rate, support, and tail assumptions are part of the model. Zero inflation, truncation, seasonality, and dependence can make a convenient distribution wrong.

## References

- [SciPy statistics reference](https://docs.scipy.org/doc/scipy/reference/stats.html)
- [OpenStax Introductory Statistics 2e, Chapter 4 introduction](https://openstax.org/books/introductory-statistics-2e/pages/4-introduction)

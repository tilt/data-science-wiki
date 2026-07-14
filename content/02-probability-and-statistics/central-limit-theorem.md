---
title: Central Limit Theorem
slug: probability-and-statistics/central-limit-theorem
description: "Why standardized averages of many independent finite-variance variables become approximately normal."
area: probability-and-statistics
topics:
  - central-limit-theorem
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - law-of-large-numbers.md
  - expectation-and-variance.md
  - confidence-intervals.md
  - hypothesis-testing.md
  - common-distributions.md
historical_context: false
last_reviewed: 2026-07-11
---
# Central Limit Theorem

The central limit theorem explains why averages become easier to model than individual observations. If $X_1,\ldots,X_n$ are independent copies of a [random variable](random-variables.md) with finite mean $\mu$ and variance $\sigma^2>0$, then the standardized sample mean converges in distribution:

$$
\frac{\bar X_n-\mu}{\sigma/\sqrt n}
=\frac{\sqrt n(\bar X_n-\mu)}{\sigma}
\Rightarrow \mathcal N(0,1).
$$

The [law of large numbers](law-of-large-numbers.md) says $\bar X_n$ moves toward $\mu$; the CLT says the residual fluctuation around $\mu$ has approximately normal shape and standard error $\sigma/\sqrt n$. That is the mechanism behind many [confidence intervals](confidence-intervals.md) and large-sample [hypothesis tests](hypothesis-testing.md).

## Intuition

A skewed observation can have a long right tail, but an average is a sum of many independent small contributions. Centering removes the deterministic mean, and scaling by $\sqrt n$ keeps the random fluctuation from collapsing to zero. Convolution smooths the shape, so the sampling distribution of the mean can be close to normal even when the original [common distribution](common-distributions.md) is not.

## Worked simulation

This simulation draws sample means from an exponential distribution at increasing sample sizes and reports how their standardized skew and quantiles move toward a normal distribution.

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(20260711)
for n in [2, 10, 50]:
    means = rng.exponential(scale=1.0, size=(20000, n)).mean(axis=1)
    z = np.sqrt(n) * (means - 1.0)
    print(f"n={n} mean={z.mean():.4f} std={z.std(ddof=1):.4f} "
          f"skew={stats.skew(z):.4f} q025={np.quantile(z,.025):.4f} "
          f"q975={np.quantile(z,.975):.4f}")
print("normal_q025_q975", np.round(stats.norm.ppf([.025,.975]), 4))
```

Observed output:

```text
n=2 mean=-0.0081 std=0.9885 skew=1.3804 q025=-1.2480 q975=2.5171
n=10 mean=-0.0044 std=1.0055 skew=0.6182 q025=-1.6479 q975=2.2662
n=50 mean=0.0039 std=0.9915 skew=0.2877 q025=-1.7956 q975=2.0871
normal_q025_q975 [-1.96  1.96]
```

The standardized means from an exponential distribution keep mean near 0 and standard deviation near 1 for all three sample sizes. The skewness shrinks from `1.3804` at $n=2$ to `0.2877` at $n=50$, which is the numerical sign that the sampling distribution is becoming more normal.

![Standardized exponential sample means becoming more symmetric and closer to a normal curve as n grows.](../assets/diagrams/central-limit-theorem-convergence.svg)

The plot shows the same lesson visually: the $n=2$ curve is still right-skewed, while the $n=50$ curve is much closer to the symmetric normal reference. The approximation improves in shape, not just in the printed mean and standard deviation.

## Caveats

The theorem is asymptotic, not a guarantee that $n=30$ is enough. Heavy tails can make $\sigma^2$ infinite, dependence changes the effective sample size, and clustered data need variance formulas that match the sampling design.

## References

- [OpenStax Introductory Statistics 2e, Chapter 7 introduction](https://openstax.org/books/introductory-statistics-2e/pages/7-introduction)
- [Central limit theorem](https://en.wikipedia.org/wiki/Central_limit_theorem)

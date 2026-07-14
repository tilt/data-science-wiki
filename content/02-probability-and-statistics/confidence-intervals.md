---
title: Confidence Intervals
slug: probability-and-statistics/confidence-intervals
description: "Repeated-sampling procedures that report parameter uncertainty as an interval with nominal long-run coverage."
area: probability-and-statistics
topics:
  - confidence-intervals
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - central-limit-theorem.md
  - statistical-estimation.md
  - hypothesis-testing.md
  - ../17-experimentation-and-evaluation/statistical-significance.md
historical_context: false
last_reviewed: 2026-07-11
---

# Confidence Intervals

A confidence interval is a random interval produced by a procedure with a target long-run coverage rate. For an approximately normal estimator,

$$
\hat\theta \pm z_{1-\alpha/2}\operatorname{SE}(\hat\theta)
$$

is the usual large-sample form. For a normal mean with unknown variance,

$$
\bar X \pm t_{1-\alpha/2,n-1}\frac{s}{\sqrt n}.
$$

The [central limit theorem](central-limit-theorem.md) supplies many standard errors; [statistical estimation](statistical-estimation.md) supplies the estimator; [hypothesis testing](hypothesis-testing.md) often uses the same sampling distribution.

## Worked simulation

This simulation repeatedly builds $t$ confidence intervals for normal samples and measures empirical coverage, average width, and the critical value used.

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(20260711)
reps, n, mu, sigma = 20000, 30, 5, 2
x = rng.normal(mu, sigma, size=(reps, n))
means = x.mean(axis=1)
s = x.std(axis=1, ddof=1)
tcrit = stats.t.ppf(.975, n - 1)
lo = means - tcrit * s / np.sqrt(n)
hi = means + tcrit * s / np.sqrt(n)
print("coverage", round(((lo <= mu) & (mu <= hi)).mean(), 4),
      "avg_width", round((hi - lo).mean(), 4),
      "tcrit", round(tcrit, 4))
```

Observed output:

```text
coverage 0.9499 avg_width 1.4796 tcrit 2.0452
```

Across repeated samples, the 95 percent t-interval covers the fixed mean `0.9499` of the time, close to the nominal 0.95 target. The average width, `1.4796`, reflects the sample size, noise scale, and $t$ critical value `2.0452`.

| Quantity              | Meaning in the simulation                                                        |
| --------------------- | -------------------------------------------------------------------------------- |
| `coverage`            | Fraction of repeated intervals that contain the fixed true mean.                 |
| `avg_width`           | Typical uncertainty width produced by the procedure.                             |
| `tcrit`               | Critical value that widens the interval for finite samples and unknown variance. |
| One realized interval | A random output of the procedure; it either contains $\mu$ or it does not.       |

## Caveats

One realized interval either contains the parameter or it does not. Coverage can fail under biased sampling, dependence, optional stopping, nonresponse, or variance formulas that ignore clustering. In experiments, pair intervals with effect size and [statistical significance](../17-experimentation-and-evaluation/statistical-significance.md), not only a binary decision.

## References

- [OpenStax Introductory Statistics 2e, Chapter 8 introduction](https://openstax.org/books/introductory-statistics-2e/pages/8-introduction)
- [SciPy t distribution reference](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.t.html)

---
title: Repeated Sampling
slug: experimentation-and-evaluation/repeated-sampling
description: "Estimating evaluation variability by resampling examples, runs, seeds, or traffic slices."
area: experimentation-and-evaluation
topics:
  - repeated-sampling
  - bootstrap
  - uncertainty
level: foundational
status: review
page_type: concept
aliases:
  - "Resampling"
prerequisites:
  - index.md
related:
  - paired-evaluation.md
  - statistical-significance.md
  - offline-evaluation.md
  - coverage.md
  - ../02-probability-and-statistics/confidence-intervals.md
historical_context: false
last_reviewed: 2026-07-11
---

# Repeated Sampling

Repeated sampling turns one evaluation number into a distribution. It can resample examples from a fixed [golden dataset](golden-datasets.md), rerun stochastic generation, vary random seeds, or split live traffic into repeated windows. It is especially useful when [paired evaluation](paired-evaluation.md) shows an improvement but the example set is small.

## Defining mechanism

The nonparametric bootstrap samples $n$ examples with replacement from the observed $n$ examples and recomputes a statistic $T$. Repeating this produces an empirical distribution

$$
T^{*(1)}, T^{*(2)}, \ldots, T^{*(B)}.
$$

A bootstrap interval is an uncertainty interval computed from the empirical distribution of the resampled statistic. Percentile intervals take quantiles of that bootstrap distribution. The mechanism estimates variability under the observed sampling scheme; it does not prove that the original examples cover the deployment population.

## Worked calculation

This snippet bootstraps observed metric deltas to estimate standard error, a percentile confidence interval, and the probability that the delta is positive.

```python
import numpy as np

deltas = np.array([0.02,-0.01,0.04,0.03,0.00,0.05,-0.02,0.01,0.03,0.04,0.02,-0.01])
rng = np.random.default_rng(16)
boot = np.array([rng.choice(deltas, size=len(deltas), replace=True).mean() for _ in range(5000)])
print(f"observed_mean_delta {deltas.mean():.4f}")
print(f"bootstrap_se {boot.std(ddof=1):.4f}")
print(f"percentile_95_ci [{np.quantile(boot,.025):.4f}, {np.quantile(boot,.975):.4f}]")
print(f"prob_delta_positive {(boot > 0).mean():.3f}")
```

Observed output:

```text
observed_mean_delta 0.0167
bootstrap_se 0.0063
percentile_95_ci [0.0042, 0.0283]
prob_delta_positive 0.995
```

The resampled mean delta is almost always positive, but the interval is still small in absolute terms. That should be interpreted with the metric's practical scale and with [coverage](coverage.md) of the example set.

## Caveats

Bootstrap intervals inherit leakage, label error, and missing slices. For LLMs, sampling multiple generations per prompt measures decoding variability, not necessarily user-visible quality. If the examples are clustered by user, document, or time, resample clusters rather than rows.

## References

- [SciPy documentation: scipy.stats.bootstrap](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html)
- [SciPy documentation: scipy.stats.ttest_rel](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_rel.html)

> [!nav]
> **Section** — [Experimentation and Evaluation](index.md)
>
> [← Statistical Significance](statistical-significance.md) [Paired Evaluation →](paired-evaluation.md)

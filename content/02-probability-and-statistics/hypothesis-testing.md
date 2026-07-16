---
title: Hypothesis Testing
slug: probability-and-statistics/hypothesis-testing
description: "A null-model calculation of how surprising an observed statistic would be under specified assumptions."
area: probability-and-statistics
topics:
  - hypothesis-testing
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - confidence-intervals.md
  - experimental-design.md
  - statistical-estimation.md
  - ../17-experimentation-and-evaluation/statistical-significance.md
historical_context: false
last_reviewed: 2026-07-11
---

# Hypothesis Testing

Hypothesis testing compares data with a null model. A test defines $H_0$, $H_1$, a statistic $T(X)$, and a reference distribution under $H_0$. The p-value is

$$
p=P_{H_0}\left(T(X)\ge T(x_{\mathrm{obs}})\right)
$$

for a one-sided upper-tail test, with analogous two-sided forms. This is a probability of data extremeness under the null, not the probability that the null is true. [Confidence intervals](confidence-intervals.md) often invert families of tests, and [experimental design](experimental-design.md) determines whether the test answers the intended question.

## Worked computation

This snippet draws two normal samples with different means and applies Welch's two-sample $t$-test to report the mean difference, statistic, and p-value.

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(20260711)
a = rng.normal(0.0, 1.0, size=40)
b = rng.normal(0.55, 1.0, size=42)
res = stats.ttest_ind(b, a, equal_var=False)
effect = b.mean() - a.mean()
print("mean_diff", round(effect, 4),
      "t_stat", round(res.statistic, 4),
      "p_value", round(res.pvalue, 4))
```

Observed output:

```text
mean_diff 0.5646 t_stat 2.4319 p_value 0.0173
```

The simulated mean difference is `0.5646`, and the Welch t-statistic is `2.4319`, producing `p_value 0.0173`. That is evidence against equal means under the test assumptions, but the decision should still consider effect size, cost, and [statistical significance](../17-experimentation-and-evaluation/statistical-significance.md) in context.

| Testing component      | In the example                                                                               |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| Null model             | The two groups have equal population means.                                                  |
| Alternative            | The group means differ.                                                                      |
| Statistic              | Welch's t-statistic compares the observed mean difference with its estimated standard error. |
| Reference distribution | Approximate t distribution with unequal-variance degrees of freedom.                         |
| Reported result        | A mean difference of `0.5646` and p-value `0.0173`, not a probability that the null is true. |

## Caveats

Optional stopping, multiple comparisons, peeking at segments, and using the wrong unit of analysis can make p-values anti-conservative. A non-significant result is not evidence of no effect unless the test had enough power for a meaningful effect size.

## References

- [OpenStax Introductory Statistics 2e, Chapter 9 introduction](https://openstax.org/books/introductory-statistics-2e/pages/9-introduction)
- [SciPy `ttest_ind` reference](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_ind.html)

> [!nav]
> **Section** — [Probability and Statistics](index.md)
>
> [← Confidence Intervals](confidence-intervals.md) [Statistical Modelling →](statistical-modelling.md)

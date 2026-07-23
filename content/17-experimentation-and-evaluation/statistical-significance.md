---
title: Statistical Significance
slug: experimentation-and-evaluation/statistical-significance
description: "Testing whether an observed experimental effect is large relative to sampling noise."
area: experimentation-and-evaluation
topics:
  - statistical-significance
  - hypothesis-testing
  - ab-testing
level: foundational
status: complete
page_type: concept
aliases:
  - "Significance testing"
prerequisites:
  - index.md
related:
  - a-b-testing.md
  - online-experiments.md
  - paired-evaluation.md
  - repeated-sampling.md
  - ../02-probability-and-statistics/hypothesis-testing.md
  - ../02-probability-and-statistics/confidence-intervals.md
  - ../14-ml-engineering-and-mlops/a-b-testing.md
historical_context: false
last_reviewed: 2026-07-23
---

# Statistical Significance

Statistical significance is the experiment-reporting layer of [hypothesis testing](../02-probability-and-statistics/hypothesis-testing.md). It asks whether an observed effect is large relative to sampling noise under a pre-specified null model. In an [A-B test](a-b-testing.md), the null is usually "treatment and control have the same conversion rate"; in [paired evaluation](paired-evaluation.md), it is usually "the mean paired difference is zero."

This page focuses on interpreting significance for product and model evaluation decisions. The probability-and-statistics page owns the general mechanics of null hypotheses, p-values, z-statistics, and reference distributions. The [A-B testing](a-b-testing.md) page owns experiment planning and sample size. The MLOps [A-B testing](../14-ml-engineering-and-mlops/a-b-testing.md) page owns production release mechanics, guardrails, and rollback decisions.

## Effect, uncertainty, and decision

A useful significance report separates three questions:

1. **Effect size.** How large is the observed effect in the metric's units?
2. **Uncertainty.** How wide is the plausible range once sampling noise is included?
3. **Decision.** Is the effect large enough, reliable enough, and safe enough to act on?

For two independent conversion rates, the common large-sample check is the two-proportion z-test. The canonical derivation and symbol definitions are on [Hypothesis Testing](../02-probability-and-statistics/hypothesis-testing.md). In experiment reports, the important quantities are the absolute lift, p-value, confidence interval, sample size, and practical threshold.

$$
\text{absolute lift}=\hat p_B-\hat p_A
$$

The confidence interval for the absolute lift often reports the unpooled standard error:

$$
(\hat p_B-\hat p_A)\pm 1.96\sqrt{\frac{\hat p_A(1-\hat p_A)}{n_A}+\frac{\hat p_B(1-\hat p_B)}{n_B}}.
$$

Here $\hat p_A$ and $\hat p_B$ are observed conversion rates and $n_A$ and $n_B$ are exposed sample sizes. The z-test p-value says how surprising the lift is under a no-effect null model; the interval shows a range of effect sizes compatible with the data. [Online experiments](online-experiments.md) add assignment integrity, logging, interference, guardrails, and pre-specified stopping rules.

## Worked calculation

Suppose the control arm has 492 conversions from 10,000 users and the treatment arm has 548 conversions from 10,000 users:

| quantity                       |             value |
| ------------------------------ | ----------------: |
| control rate                   |            0.0492 |
| treatment rate                 |            0.0548 |
| absolute lift                  |            0.0056 |
| pooled null rate               |            0.0520 |
| z-score                        |             1.783 |
| two-sided p-value              |            0.0745 |
| 95 percent confidence interval | [-0.0006, 0.0118] |

The treatment is 0.56 percentage points higher, but the 95 percent interval still includes a small negative effect. This is not statistically significant at a 5 percent two-sided threshold because $p=0.0745$ is larger than 0.05.

That does not mean "no effect." It means this experiment did not produce strong enough evidence to reject the no-effect null at the chosen threshold. The result could still be worth a follow-up if a 0.5 point lift is commercially meaningful, or irrelevant if the minimum practical lift was 1.5 points. Conversely, a very large experiment can make a tiny, operationally useless effect statistically significant. Practical significance belongs in the decision rule, not in an after-the-fact interpretation.

## Caveats

Significance does not repair a biased sample, bad metric, stale [golden dataset](golden-datasets.md), or multiple unreported looks at the data. With enough traffic, trivial effects can become significant; with too little traffic, important effects can be missed. Report effect size, interval, sample size, metric definition, practical threshold, and any repeated-look or multiple-comparison adjustment.

## References

- [SciPy documentation: scipy.stats.norm](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.norm.html)
- [SciPy documentation: scipy.stats.binomtest](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.binomtest.html)
- [Larsen et al., Statistical Challenges in Online Controlled Experiments](https://arxiv.org/abs/2212.11366)

> [!nav]
> **Section** — [Experimentation and Evaluation](index.md)
>
> [← Calibration](calibration.md) [Repeated Sampling →](repeated-sampling.md)

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
status: review
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
historical_context: false
last_reviewed: 2026-07-11
---

# Statistical Significance

Statistical significance asks whether an observed effect is surprising under a null model. In an [A/B test](a-b-testing.md), the null is usually "treatment and control have the same conversion rate"; in [paired evaluation](paired-evaluation.md), it is usually "the mean paired difference is zero." It is an uncertainty statement, not a claim that the effect is useful, causal without a valid design, or safe to launch.

## Defining statistics

For two independent conversion rates, $\hat p_A=x_A/n_A$ and $\hat p_B=x_B/n_B$. A large-sample two-sided z-test uses the pooled null rate

$$
\hat p=\frac{x_A+x_B}{n_A+n_B}, \qquad
z=\frac{\hat p_B-\hat p_A}{\sqrt{\hat p(1-\hat p)(1/n_A+1/n_B)}}.
$$

The p-value is $2(1-\Phi(|z|))$. The confidence interval for the absolute lift usually reports the unpooled standard error,

$$
(\hat p_B-\hat p_A)\pm 1.96\sqrt{\frac{\hat p_A(1-\hat p_A)}{n_A}+\frac{\hat p_B(1-\hat p_B)}{n_B}}.
$$

The same logic appears in [online experiments](online-experiments.md), but production tests also need assignment checks, guardrails, and pre-specified stopping rules.

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

The treatment is 0.56 percentage points higher, but the 95 percent interval still includes a small negative effect. This is not statistically significant at a 5 percent two-sided threshold because $p=0.0745$ is larger than 0.05. It could still be worth a follow-up if a 0.5 point lift is commercially meaningful, or irrelevant if the minimum practical lift was 1.5 points.

## Caveats

Significance does not repair a biased sample, bad metric, stale [golden dataset](golden-datasets.md), or multiple unreported looks at the data. With enough traffic, trivial effects can become significant; with too little traffic, important effects can be missed. Report effect size, interval, sample size, metric definition, and any repeated-look or multiple-comparison adjustment.

## References

- [SciPy documentation: scipy.stats.norm](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.norm.html)
- [SciPy documentation: scipy.stats.binomtest](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.binomtest.html)
- [Larsen et al., Statistical Challenges in Online Controlled Experiments: A Review of A/B Testing Methodology](https://arxiv.org/abs/2212.11366)

> **Section — [Experimentation and Evaluation](index.md):** ← [Calibration](calibration.md) · [Repeated Sampling](repeated-sampling.md) →

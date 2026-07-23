---
title: A-B Testing
slug: experimentation-and-evaluation/a-b-testing
description: "Randomized comparison of product or model variants with pre-specified metrics and uncertainty."
area: experimentation-and-evaluation
topics:
  - a-b-testing
  - online-experiments
  - power
level: foundational
status: complete
page_type: concept
aliases:
  - "A/B Testing"
  - "Split test"
prerequisites:
  - index.md
related:
  - online-experiments.md
  - statistical-significance.md
  - paired-evaluation.md
  - repeated-sampling.md
  - ../02-probability-and-statistics/experimental-design.md
  - ../02-probability-and-statistics/hypothesis-testing.md
  - ../02-probability-and-statistics/confidence-intervals.md
  - ../14-ml-engineering-and-mlops/a-b-testing.md
historical_context: false
last_reviewed: 2026-07-23
---

# A-B Testing

A-B testing is a randomized experiment comparing a control experience with one or more variants. This page is the evaluation concept: it focuses on planning, sample size, metric choice, and analysis before and after exposure. The production lifecycle counterpart is [MLOps A-B testing](../14-ml-engineering-and-mlops/a-b-testing.md), which focuses on feature flags, versioned telemetry, guardrails, and rollback; the underlying test-statistic mechanics — z-tests, p-values, and confidence intervals — are derived in [hypothesis testing](../02-probability-and-statistics/hypothesis-testing.md). A valid test needs a named decision, a randomization unit, primary and guardrail metrics, a minimum meaningful effect, and an analysis plan before traffic is exposed.

## Sample size and the test statistic

For a binary metric, the planning problem is often "how many users per variant are needed to detect $p_1-p_0$?" A normal approximation for equal-sized arms is

$$
n \approx \frac{\left[z_{1-\alpha/2}\sqrt{2\bar p(1-\bar p)} + z_{\text{power}}\sqrt{p_0(1-p_0)+p_1(1-p_1)}\right]^2}{(p_1-p_0)^2},
$$

where $\bar p=(p_0+p_1)/2$. Here $p_0$ is the baseline conversion rate, $p_1$ is the smallest treatment rate worth detecting, $\alpha$ is the false-positive rate, and `power` is the probability of detecting that effect under the planning model. [Hypothesis testing](../02-probability-and-statistics/hypothesis-testing.md) defines z-statistics and p-values; [statistical significance](statistical-significance.md) interprets the observed effect after launch; [online experiments](online-experiments.md) add assignment integrity, logging, interference, and guardrails.

## Worked calculation

Suppose the baseline conversion rate is $p_0=0.100$ and the smallest useful target is $p_1=0.112$, a 1.2 percentage-point lift. With $\alpha=0.05$, 80 percent power, $z_{0.975}=1.96$, $z_{0.80}=0.84$, and $\bar p=0.106$:

$$
n\approx
\frac{(1.96\sqrt{2(0.106)(0.894)}+0.84\sqrt{0.10(0.90)+0.112(0.888)})^2}{0.012^2}
\approx 10{,}330
$$

That means about 10,330 users per arm, or 20,660 users total before losses and guardrail exclusions. If that traffic takes six weeks, a [paired evaluation](paired-evaluation.md) or stronger offline gate may be cheaper before running the live test.

## Caveats

Do not change the primary metric after seeing results. Sample-ratio mismatch, delayed events, bot traffic, novelty effects, and repeated peeking can invalidate otherwise clean formulas. Report practical significance separately: a statistically detectable lift may be too small once latency, support load, or risk-weighted errors are included.

## References

- [Larsen et al., Statistical Challenges in Online Controlled Experiments](https://arxiv.org/abs/2212.11366)
- [SciPy documentation: scipy.stats.norm](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.norm.html)

> [!nav]
> **Section** — [Experimentation and Evaluation](index.md)
>
> [← Online Experiments](online-experiments.md) [Human Evaluation →](human-evaluation.md)

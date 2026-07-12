---
title: A/B Testing
slug: experimentation-and-evaluation/a-b-testing
description: "Randomized comparison of product or model variants with pre-specified metrics and uncertainty."
area: experimentation-and-evaluation
topics:
  - a-b-testing
  - online-experiments
  - power
level: foundational
status: review
page_type: concept
aliases:
  - "Split test"
prerequisites:
  - index.md
related:
  - online-experiments.md
  - statistical-significance.md
  - paired-evaluation.md
  - repeated-sampling.md
  - ../02-probability-and-statistics/experimental-design.md
  - ../13-ml-engineering-and-mlops/a-b-testing.md
historical_context: false
last_reviewed: 2026-07-11
---
# A/B Testing

A/B testing is a randomized experiment comparing a control experience with one or more variants. This page is the evaluation concept; the production lifecycle counterpart is [MLOps A/B testing](../13-ml-engineering-and-mlops/a-b-testing.md). A valid test needs a named decision, a randomization unit, primary and guardrail metrics, a minimum meaningful effect, and an analysis plan before traffic is exposed.

## Defining statistics

For a binary metric, the planning problem is often "how many users per variant are needed to detect $p_1-p_0$?" A normal approximation for equal-sized arms is

$$
n \approx \frac{\left[z_{1-\alpha/2}\sqrt{2\bar p(1-\bar p)} + z_{\text{power}}\sqrt{p_0(1-p_0)+p_1(1-p_1)}\right]^2}{(p_1-p_0)^2},
$$

where $\bar p=(p_0+p_1)/2$. After launch, [statistical significance](statistical-significance.md) tests the observed effect; [online experiments](online-experiments.md) add assignment integrity, logging, interference, and guardrails.

## Worked calculation

```python
from scipy.stats import norm
import numpy as np

alpha, power = .05, .80
p0, p1 = .10, .112
z_alpha = norm.ppf(1 - alpha / 2)
z_power = norm.ppf(power)
pbar = (p0 + p1) / 2
n = ((z_alpha*np.sqrt(2*pbar*(1-pbar)) + z_power*np.sqrt(p0*(1-p0)+p1*(1-p1)))**2) / (p1-p0)**2
print(f"baseline {p0:.3f} target {p1:.3f} mde_pp {(p1-p0)*100:.1f}")
print(f"required_per_variant {np.ceil(n).astype(int)}")
print(f"total_required {int(2*np.ceil(n))}")
```

Observed output:

```text
baseline 0.100 target 0.112 mde_pp 1.2
required_per_variant 10330
total_required 20660
```

A 1.2 percentage-point conversion lift from a 10 percent baseline needs about 10,330 users per arm at 80 percent power. If that traffic takes six weeks, a [paired evaluation](paired-evaluation.md) or stronger offline gate may be cheaper before running the live test.

## Caveats

Do not change the primary metric after seeing results. Sample-ratio mismatch, delayed events, bot traffic, novelty effects, and repeated peeking can invalidate otherwise clean formulas. Report practical significance separately: a statistically detectable lift may be too small once latency, support load, or risk-weighted errors are included.

## References

- [Larsen et al., Statistical Challenges in Online Controlled Experiments](https://arxiv.org/abs/2212.11366)
- [SciPy documentation: scipy.stats.norm](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.norm.html)

---
title: Online Experiments
slug: experimentation-and-evaluation/online-experiments
description: "Production experiments that measure user impact under real traffic, logging, and guardrail constraints."
area: experimentation-and-evaluation
topics:
  - online-experiments
  - ab-testing
  - guardrails
level: intermediate
status: review
page_type: concept
aliases:
  - "Controlled experiments"
prerequisites:
  - ../02-probability-and-statistics/experimental-design.md
related:
  - a-b-testing.md
  - statistical-significance.md
  - offline-evaluation.md
  - paired-evaluation.md
  - ../14-ml-engineering-and-mlops/canary-deployment.md
historical_context: false
last_reviewed: 2026-07-11
---

# Online Experiments

Online experiments expose randomized traffic to a live product change and measure what users actually do. They are downstream of [offline evaluation](offline-evaluation.md): an offline win makes a launch plausible, while an online experiment estimates product impact under latency, feedback loops, user choice, and production logging.

## Defining checks

The estimand for a binary or mean metric is usually an average treatment effect,

$$
\Delta = E[Y\mid T=1]-E[Y\mid T=0],
$$

with $T$ assigned by the experiment, not chosen by the user. Before interpreting $\Delta$, check assignment integrity. A simple sample-ratio mismatch test compares observed arm counts $O_k$ with expected counts $E_k$:

$$
\chi^2=\sum_k \frac{(O_k-E_k)^2}{E_k}.
$$

Guardrail metrics then protect user experience even when the primary metric improves; [A/B testing](a-b-testing.md) without guardrails is only a partial launch decision.

## Worked calculation

This snippet checks an online experiment for sample-ratio mismatch and tests whether treatment latency differs from control latency.

```python
import numpy as np
from scipy import stats
from scipy.stats import chi2

assigned = np.array([5100, 4900])
expected = np.array([5000, 5000])
chi_stat = ((assigned - expected) ** 2 / expected).sum()
p_srm = 1 - chi2.cdf(chi_stat, df=1)
lat_control = np.array([118,122,121,119,120,124,117,123])
lat_treat = np.array([121,126,124,125,123,129,122,128])
res = stats.ttest_ind(lat_treat, lat_control, equal_var=False)
print(f"srm_chi2 {chi_stat:.3f} p_value {p_srm:.4f}")
print(f"latency_delta_ms {(lat_treat.mean()-lat_control.mean()):.2f}")
print(f"welch_p_value {res.pvalue:.4f}")
```

Observed output:

```text
srm_chi2 4.000 p_value 0.0455
latency_delta_ms 4.25
welch_p_value 0.0063
```

The arm split is suspicious at a 5 percent threshold, and treatment latency is measurably higher. Even a positive conversion result would need logging review and a guardrail decision before launch.

## Caveats

Interference breaks independent-unit assumptions when one user's treatment changes another user's experience. Peeking creates false positives unless the sequential rule is planned. Canary rollout is not the same as a randomized experiment: [canary deployment](../14-ml-engineering-and-mlops/canary-deployment.md) protects reliability, while randomization supports causal measurement.

## References

- [Larsen et al., Statistical Challenges in Online Controlled Experiments](https://arxiv.org/abs/2212.11366)
- [SciPy documentation: scipy.stats.ttest_ind](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_ind.html)

> **Section — [Experimentation and Evaluation](index.md):** ← [Paired Evaluation](paired-evaluation.md) · [A/B Testing](a-b-testing.md) →

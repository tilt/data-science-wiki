---
title: Experimental Design
slug: probability-and-statistics/experimental-design
description: "Planning assignment, blocking, outcomes, and analysis before data collection so comparisons answer the intended question."
area: probability-and-statistics
topics:
  - experimental-design
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - hypothesis-testing.md
  - confidence-intervals.md
  - statistical-modelling.md
  - ../17-experimentation-and-evaluation/a-b-testing.md
historical_context: false
last_reviewed: 2026-07-11
---

# Experimental Design

Experimental design fixes how units are assigned, measured, and analyzed before outcomes are known. The core mechanism is control of variation:

$$
Y_i=\alpha+\tau T_i+\epsilon_i,
$$

where $T_i$ is assigned by the design, not chosen after observing $Y_i$. Randomization supports unbiased comparisons; blocking and pairing reduce noise; pre-specified [hypothesis tests](hypothesis-testing.md) and [confidence intervals](confidence-intervals.md) keep uncertainty statements interpretable. In product work, this is the statistical core of [A/B testing](../17-experimentation-and-evaluation/a-b-testing.md).

In this formula, $Y_i$ is the outcome for unit $i$, $T_i$ marks treatment assignment, $\tau$ is the treatment effect being estimated, and $\epsilon_i$ is unexplained variation. The design matters because it determines whether differences in $Y_i$ can be attributed to $T_i$ rather than confounding.

## Worked simulation

The simulation compares an unpaired estimate with a blocked paired estimate when each treatment-control pair shares the same baseline variation.

```python
import numpy as np

rng = np.random.default_rng(123)
blocks = 500
base = rng.normal(0, 2, size=blocks)
tau = .4
control = base + rng.normal(0, 1, size=blocks)
treat = base + tau + rng.normal(0, 1, size=blocks)
paired = treat - control
unpaired_se = np.sqrt(treat.var(ddof=1) / blocks + control.var(ddof=1) / blocks)
paired_se = paired.std(ddof=1) / np.sqrt(blocks)
print("estimated_effect", round(paired.mean(), 4),
      "unpaired_se", round(unpaired_se, 4),
      "blocked_se", round(paired_se, 4))
```

Observed output:

```text
estimated_effect 0.3655 unpaired_se 0.1437 blocked_se 0.0668
```

The simulated treatment effect is `0.3655`, close to the true lift of 0.4. Pairing units that share the same baseline variation cuts the standard error from `0.1437` to `0.0668`, more than half in this simulation.

## Caveats

Randomization does not fix attrition, interference between units, metric peeking, or outcomes chosen after seeing results. The design should name the assignment unit, analysis unit, primary metric, guardrails, exclusion rules, and stopping rule.

## References

- [Design of experiments](https://en.wikipedia.org/wiki/Design_of_experiments)
- [OpenStax Introductory Statistics 2e, Chapter 9 introduction](https://openstax.org/books/introductory-statistics-2e/pages/9-introduction)

> [!nav]
> **Section** — [Probability and Statistics](index.md)
>
> [← Statistical Modelling](statistical-modelling.md)

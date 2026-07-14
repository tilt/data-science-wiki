---
title: Paired Evaluation
slug: experimentation-and-evaluation/paired-evaluation
description: "Comparing systems on the same examples so each example acts as its own control."
area: experimentation-and-evaluation
topics:
  - paired-evaluation
  - statistical-significance
  - evaluation
level: intermediate
status: review
page_type: concept
aliases:
  - "Paired comparisons"
prerequisites:
  - golden-datasets.md
related:
  - statistical-significance.md
  - repeated-sampling.md
  - human-evaluation.md
  - llm-as-judge.md
  - comparing-generative-ai-and-classical-ml-systems.md
historical_context: false
last_reviewed: 2026-07-11
---
# Paired Evaluation

Paired evaluation compares systems on the same examples. It is stronger than comparing two unrelated averages because hard examples, ambiguous labels, and domain mix affect both systems. The pattern is useful for model-score comparisons, [human evaluation](human-evaluation.md), and [LLM-as-judge](llm-as-judge.md) preference tests.

## Defining statistics

For numeric scores, compute one difference per example:

$$
d_i=s_{B,i}-s_{A,i}, \qquad \bar d=\frac{1}{n}\sum_i d_i.
$$

A paired t-test uses

$$
t=\frac{\bar d}{s_d/\sqrt n},
$$

where $s_d$ is the sample standard deviation of the differences. For win/loss/tie labels, ignore ties and use a sign test or bootstrap over examples. This is often the offline counterpart to [statistical significance](statistical-significance.md) in live experiments.

## Worked calculation

This snippet evaluates paired old-versus-new scores with mean delta, paired $t$-test, confidence interval, and a sign test.

```python
import numpy as np
from scipy import stats

old = np.array([3,4,2,5,3,4,2,3,4,3,5,2])
new = np.array([4,4,3,5,4,5,2,4,4,4,5,3])
d = new - old
tres = stats.ttest_rel(new, old)
ci = tres.confidence_interval()
wins, losses, ties = (d > 0).sum(), (d < 0).sum(), (d == 0).sum()
bt = stats.binomtest(wins, wins + losses, p=0.5, alternative="greater")
print(f"mean_delta {d.mean():.3f}")
print(f"paired_t {tres.statistic:.3f} p_value {tres.pvalue:.4f}")
print(f"95pct_ci [{ci.low:.3f}, {ci.high:.3f}]")
print(f"wins_losses_ties {wins}/{losses}/{ties} sign_p {bt.pvalue:.4f}")
```

Observed output:

```text
mean_delta 0.583
paired_t 3.924 p_value 0.0024
95pct_ci [0.256, 0.911]
wins_losses_ties 7/0/5 sign_p 0.0078
```

The new system improves average score by 0.58 points on the same twelve examples, and every non-tie preference favors it. A [repeated sampling](repeated-sampling.md) bootstrap would be a good robustness check if the score distribution is skewed.

## Caveats

Pairing does not fix a stale or overfit [golden dataset](golden-datasets.md). If reviewers see system identities or output order, position and familiarity bias can dominate the measured delta. For generative systems, keep prompts, retrieved context, decoding settings, and rubric versions fixed across both systems.

## References

- [SciPy documentation: scipy.stats.ttest_rel](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_rel.html)
- [SciPy documentation: scipy.stats.binomtest](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.binomtest.html)

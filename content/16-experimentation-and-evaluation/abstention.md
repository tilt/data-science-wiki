---
title: Abstention
slug: experimentation-and-evaluation/abstention
description: "Evaluating no-answer decisions as a trade-off between coverage and error severity."
area: experimentation-and-evaluation
topics:
  - abstention
  - coverage
  - confidence-thresholds
level: intermediate
status: review
page_type: concept
aliases:
  - "Selective prediction"
  - "Refusal evaluation"
prerequisites:
  - calibration.md
related:
  - calibration.md
  - coverage.md
  - risk-weighted-error-taxonomies.md
  - llm-as-judge.md
  - comparing-generative-ai-and-classical-ml-systems.md
  - ../10-generative-ai/guardrails.md
historical_context: false
last_reviewed: 2026-07-11
---
# Abstention

Abstention is the decision not to answer, classify, retrieve, or take an action when evidence or confidence is insufficient. It is a first-class outcome, not a fallback message. In generative systems it overlaps with refusals and [guardrails](../10-generative-ai/guardrails.md); in classifiers it is selective prediction based on score thresholds.

## Defining statistics

For threshold $\tau$, answer only when confidence $c_i\ge\tau$. The two basic evaluation quantities are

$$
\text{coverage}(\tau)=\frac{1}{n}\sum_i \mathbf 1(c_i\ge\tau),
$$

and answered error rate,

$$
\text{error}(\tau)=\frac{\sum_i \mathbf 1(c_i\ge\tau)\mathbf 1(\hat y_i\ne y_i)}{\sum_i \mathbf 1(c_i\ge\tau)}.
$$

The threshold should be chosen with [calibration](calibration.md), [coverage](coverage.md), and [risk-weighted error taxonomies](risk-weighted-error-taxonomies.md), not accuracy alone.

## Worked calculation

```python
import numpy as np

conf = np.array([.98,.91,.84,.79,.73,.68,.61,.55,.49,.42])
correct = np.array([1,1,1,0,1,0,0,1,0,0])
for thresh in [.5,.7,.8,.9]:
    ans = conf >= thresh
    coverage = ans.mean()
    error = 1 - correct[ans].mean() if ans.any() else np.nan
    print(f"threshold {thresh:.1f} coverage {coverage:.2f} answered_error {error:.2f} abstained {len(conf)-ans.sum()}")
```

Observed output:

```text
threshold 0.5 coverage 0.80 answered_error 0.38 abstained 2
threshold 0.7 coverage 0.50 answered_error 0.20 abstained 5
threshold 0.8 coverage 0.30 answered_error 0.00 abstained 7
threshold 0.9 coverage 0.20 answered_error 0.00 abstained 8
```

Raising the threshold removes errors here but answers far fewer cases. If the unanswered cases are support tickets, the cost is human queue load; if they are medical questions, the cost may be preferable to unsupported advice.

## Caveats

Abstention can hide poor performance if reports only show answered accuracy. Refusal quality must be evaluated too: the system should explain limits, route to a safer workflow, or ask for missing evidence. For LLM systems, an [LLM-as-judge](llm-as-judge.md) rubric should score both unsafe answers and unnecessary refusals.

## References

- [scikit-learn documentation: Metrics and scoring](https://scikit-learn.org/stable/modules/model_evaluation.html)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

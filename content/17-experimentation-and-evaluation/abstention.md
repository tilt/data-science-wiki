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
  - ../11-generative-ai/guardrails.md
historical_context: false
last_reviewed: 2026-07-11
---

# Abstention

Abstention is the decision not to answer, classify, retrieve, or take an action when evidence or confidence is insufficient. It is a first-class outcome, not a fallback message. In generative systems it overlaps with refusals and [guardrails](../11-generative-ai/guardrails.md); in classifiers it is selective prediction based on score thresholds.

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

For ten examples with confidences `0.98, 0.91, 0.84, 0.79, 0.73, 0.68, 0.61, 0.55, 0.49, 0.42`, suppose the correct answered examples are the first, second, third, fifth, and eighth cases. The threshold trade-off is:

| threshold | answered cases | coverage | answered errors | answered error rate | abstained |
| --------- | -------------: | -------: | --------------: | ------------------: | --------: |
| 0.5       |              8 |     0.80 |               3 |                0.38 |         2 |
| 0.7       |              5 |     0.50 |               1 |                0.20 |         5 |
| 0.8       |              3 |     0.30 |               0 |                0.00 |         7 |
| 0.9       |              2 |     0.20 |               0 |                0.00 |         8 |

Raising the threshold removes errors here because the wrong cases sit below 0.8, but it answers far fewer cases. If the unanswered cases are support tickets, the cost is human queue load; if they are medical questions, the cost may be preferable to unsupported advice.

## Caveats

Abstention can hide poor performance if reports only show answered accuracy. Refusal quality must be evaluated too: the system should explain limits, route to a safer workflow, or ask for missing evidence. For LLM systems, an [LLM-as-judge](llm-as-judge.md) rubric should score both unsafe answers and unnecessary refusals.

## References

- [scikit-learn documentation: Metrics and scoring](https://scikit-learn.org/stable/modules/model_evaluation.html)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

> **Section — [Experimentation and Evaluation](index.md):** ← [Coverage](coverage.md) · [Risk-Weighted Error Taxonomies](risk-weighted-error-taxonomies.md) →

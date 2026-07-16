---
title: Risk-Weighted Error Taxonomies
slug: experimentation-and-evaluation/risk-weighted-error-taxonomies
description: "Classifying failures by type and severity so average metrics do not hide harmful errors."
area: experimentation-and-evaluation
topics:
  - risk-weighted-error-taxonomies
  - responsible-ai
  - evaluation
level: intermediate
status: review
page_type: concept
aliases:
  - "Error taxonomy"
  - "Risk-weighted evaluation"
prerequisites:
  - golden-datasets.md
related:
  - golden-datasets.md
  - human-evaluation.md
  - abstention.md
  - comparing-generative-ai-and-classical-ml-systems.md
  - ../18-responsible-ai-safety-and-governance/index.md
historical_context: false
last_reviewed: 2026-07-11
---

# Risk-Weighted Error Taxonomies

A risk-weighted error taxonomy classifies what went wrong and how much it matters. It prevents harmless formatting issues from being averaged together with unsupported medical, legal, financial, privacy, or safety-critical claims. The taxonomy should be part of the [golden dataset](golden-datasets.md) schema and the [human evaluation](human-evaluation.md) rubric.

## Defining mechanism

Each error receives a type and severity. A simple risk-weighted score is

$$
R=\sum_i w_{\operatorname{severity}(i)}\mathbf 1(\text{error}_i),
$$

with weights chosen before evaluation. A production gate might allow minor formatting failures but require zero critical unsupported claims, regardless of average quality. [Abstention](abstention.md) is then evaluated as a mitigation: did the system avoid high-severity action when evidence was insufficient?

## Worked calculation

For ten reviewed outputs, suppose the severity counts and weights are:

| severity | count | weight | contribution |
| -------- | ----: | -----: | -----------: |
| ok       |     3 |      0 |            0 |
| minor    |     3 |      1 |            3 |
| major    |     2 |      5 |           10 |
| critical |     2 |     20 |           40 |

The raw error rate is $(3+2+2)/10=0.70$, the severe-error rate is $(2+2)/10=0.40$, and the risk-weighted total is $3+10+40=53$. The raw error rate is bad, but the more important signal is the two critical failures. A system with lower average score but zero critical errors may be preferable in the comparison frame for [generative AI and classical ML systems](comparing-generative-ai-and-classical-ml-systems.md).

## Caveats

Weights are governance choices, not statistical facts. Keep examples for every severity level, adjudicate reviewer disagreements, and report severe-error slices separately. If the taxonomy changes, version it and rerun historical comparisons rather than mixing old and new labels.

## References

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [scikit-learn documentation: Metrics and scoring](https://scikit-learn.org/stable/modules/model_evaluation.html)

> **Section — [Experimentation and Evaluation](index.md):** ← [Abstention](abstention.md)

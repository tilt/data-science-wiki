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
  - ../17-responsible-ai-safety-and-governance/index.md
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

```python
import numpy as np

sev = np.array(["minor","major","critical","minor","ok","major","ok","critical","minor","ok"])
weights = {"ok": 0, "minor": 1, "major": 5, "critical": 20}
weighted = np.array([weights[s] for s in sev])
print(f"raw_error_rate {(sev != 'ok').mean():.2f}")
print(f"severe_error_rate {np.isin(sev, ['major','critical']).mean():.2f}")
print(f"risk_weighted_errors {weighted.sum()}")
print("by_severity", {k: int((sev == k).sum()) for k in ["ok","minor","major","critical"]})
```

Observed output:

```text
raw_error_rate 0.70
severe_error_rate 0.40
risk_weighted_errors 53
by_severity {'ok': 3, 'minor': 3, 'major': 2, 'critical': 2}
```

The raw error rate is bad, but the more important signal is the two critical failures. A system with lower average score but zero critical errors may be preferable in the comparison frame for [generative AI and classical ML systems](comparing-generative-ai-and-classical-ml-systems.md).

## Caveats

Weights are governance choices, not statistical facts. Keep examples for every severity level, adjudicate reviewer disagreements, and report severe-error slices separately. If the taxonomy changes, version it and rerun historical comparisons rather than mixing old and new labels.

## References

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [scikit-learn documentation: Metrics and scoring](https://scikit-learn.org/stable/modules/model_evaluation.html)

---
title: Golden Datasets
slug: experimentation-and-evaluation/golden-datasets
description: "Curated, versioned evaluation examples used as stable acceptance references."
area: experimentation-and-evaluation
topics:
  - golden-datasets
  - evaluation-datasets
  - quality-control
level: foundational
status: review
page_type: concept
aliases:
  - "Gold datasets"
  - "Reference evaluation sets"
prerequisites:
  - index.md
related:
  - offline-evaluation.md
  - coverage.md
  - paired-evaluation.md
  - risk-weighted-error-taxonomies.md
  - ../13-ml-engineering-and-mlops/evaluation-datasets.md
historical_context: false
last_reviewed: 2026-07-11
---
# Golden Datasets

A golden dataset is a trusted, versioned set of inputs, expected behavior, labels, evidence, and risk metadata. It is not necessarily large; its value is that teams can rerun [offline evaluation](offline-evaluation.md) on the same decision cases and know what changed. The MLOps duplicate should usually point here for evaluation design, while [evaluation datasets](../13-ml-engineering-and-mlops/evaluation-datasets.md) covers storage and pipeline ownership.

## Defining artifact

For a support assistant, one row should identify the user query, source document ID, acceptable-answer criteria, refusal rule, slice tags, severity, reviewer owner, and version. A minimal acceptance contract is:

| field | example |
| --- | --- |
| `case_id` | `SUP-legal-0042` |
| `input` | "Can I export customer data to a vendor spreadsheet?" |
| `evidence_id` | `policy/privacy/export-controls#2026-03` |
| `expected_behavior` | refuse unsafe export; cite approved workflow |
| `risk` | `critical` |
| `slice` | `legal/privacy` |

The dataset should deliberately include common cases, rare cases, regressions, and high-severity failures from [risk-weighted error taxonomies](risk-weighted-error-taxonomies.md).

## Worked inventory

```python
from collections import Counter

records = [
    ("billing","common","low"), ("billing","rare","medium"),
    ("account","common","low"), ("account","rare","high"),
    ("security","rare","critical"), ("security","common","high"),
    ("returns","common","low"), ("returns","rare","medium"),
    ("legal","rare","critical"), ("legal","common","high"),
]
by_domain = Counter(r[0] for r in records)
by_risk = Counter(r[2] for r in records)
print("domain_counts", dict(sorted(by_domain.items())))
print("risk_counts", dict(sorted(by_risk.items())))
print(f"critical_share {by_risk['critical']/len(records):.2f}")
```

Observed output:

```text
domain_counts {'account': 2, 'billing': 2, 'legal': 2, 'returns': 2, 'security': 2}
risk_counts {'critical': 2, 'high': 3, 'low': 3, 'medium': 2}
critical_share 0.20
```

This tiny set is balanced by domain and intentionally has 20 percent critical cases. That would be wrong for population accuracy but right for a regression gate that must exercise rare dangerous behavior.

## Caveats

Golden sets become stale when policies, products, source documents, or user behavior change. Keep a blind holdout so teams do not tune directly to the public examples. Use [coverage](coverage.md) reports to show what the set does and does not claim to represent.

## References

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [scikit-learn documentation: Metrics and scoring](https://scikit-learn.org/stable/modules/model_evaluation.html)

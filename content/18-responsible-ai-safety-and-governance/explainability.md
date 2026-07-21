---
title: Explainability
slug: responsible-ai-safety-and-governance/explainability
description: "Evidence about why a model or AI system produced a decision."
area: responsible-ai-safety-and-governance
topics:
  - explainability
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - fairness.md
  - error-taxonomies.md
  - auditability.md
  - human-oversight.md
  - ../03-classical-machine-learning/interpretability.md
  - ../03-classical-machine-learning/logistic-regression.md
historical_context: false
last_reviewed: 2026-07-21
---

# Explainability

Explainability is the production of decision evidence that a specific audience can use. It is broader than model [interpretability](../03-classical-machine-learning/interpretability.md): a transparent [logistic regression](../03-classical-machine-learning/logistic-regression.md) coefficient can help, but governance often needs local reasons, counterfactuals, data lineage, and human-readable policy evidence.

## The explanation contract

An explanation contract should name the audience, decision, allowed reason codes, evidence source, and faithfulness test. For a credit triage model:

```yaml
decision: credit_limit_review
audience: applicant_support_agent
local_reason_method: permutation_or_shap_checked_monthly
allowed_reason_codes:
  - recent_delinquency_count
  - utilization_ratio
  - verified_income_change
forbidden_reason_codes:
  - protected_attribute
  - proxy_for_protected_attribute_without_review
audit_fields:
  - model_version
  - feature_snapshot_id
  - reason_code_values
  - explanation_method_version
```

The contract matters because a fluent natural-language explanation can be false. For high-impact decisions, [auditability](auditability.md) should store the feature snapshot and method version so later reviewers can reproduce the explanation and compare it with [fairness](fairness.md) findings.

## Executed attribution check

Permutation importance measures how much held-out accuracy drops when one feature is shuffled. I ran a five-feature synthetic classification example with scikit-learn:

```python
import numpy as np
from sklearn.datasets import make_classification
from sklearn.inspection import permutation_importance
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = make_classification(
    n_samples=240,
    n_features=5,
    n_informative=2,
    n_redundant=1,
    random_state=7,
    class_sep=1.1,
)
Xtr, Xte, ytr, yte = train_test_split(X, y, stratify=y, random_state=7)
model = make_pipeline(StandardScaler(), LogisticRegression(random_state=7)).fit(Xtr, ytr)
base = model.score(Xte, yte)
result = permutation_importance(model, Xte, yte, n_repeats=12, random_state=7)

print("EXPLAINABILITY")
print("test_accuracy", round(base, 3))
for i in np.argsort(result.importances_mean)[::-1][:5]:
    print(f"f{i}", "mean_drop", round(result.importances_mean[i], 3), "std", round(result.importances_std[i], 3))
```

Observed output:

```text
EXPLAINABILITY
test_accuracy 0.867
f3 mean_drop 0.269 std 0.065
f4 mean_drop 0.078 std 0.039
f2 mean_drop 0.05 std 0.028
f0 mean_drop -0.003 std 0.015
f1 mean_drop -0.011 std 0.012
```

Feature `f3` is the strongest local candidate for global explanation because shuffling it hurts test accuracy most. The negative drops for `f0` and `f1` are a warning, not a discovery: on this held-out sample, shuffling them slightly helped. That instability is why explanations should be regression-tested and paired with [error taxonomies](error-taxonomies.md), not treated as polished justifications.

## Caveats

Explanations can leak sensitive data, hide correlated proxies, or create false confidence. Counterfactual explanations are especially risky when they imply a user can change an outcome by changing a feature that is not practically controllable. For consequential decisions, explanation text should be reviewed by domain owners and connected to appeal paths in [human oversight](human-oversight.md).

## References

- [NIST AI RMF 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)
- [scikit-learn User Guide: Permutation feature importance](https://scikit-learn.org/stable/modules/permutation_importance.html)
- [SHAP documentation](https://shap.readthedocs.io/en/latest/)

> [!nav]
> **Section** — [Responsible AI, Safety, and Governance](index.md)
>
> [← Fairness](fairness.md) [Auditability →](auditability.md)

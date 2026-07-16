---
title: Fairness
slug: responsible-ai-safety-and-governance/fairness
description: "Group-level fairness definitions, trade-offs, and evidence for model review."
area: responsible-ai-safety-and-governance
topics:
  - fairness
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - explainability.md
  - error-taxonomies.md
  - compliance.md
  - human-oversight.md
  - ../03-classical-machine-learning/calibration.md
  - ../03-classical-machine-learning/evaluation-metrics.md
historical_context: false
last_reviewed: 2026-07-11
---

# Fairness

Fairness asks whether an AI system creates unjustified differences in benefits, burdens, or errors across affected groups. In model work it is measured with explicit group metrics; in governance it is tied to [compliance](compliance.md), appeal routes, and [human oversight](human-oversight.md) because a metric gap alone does not decide what outcome is justified.

## Defining metrics

For binary label $Y\in\{0,1\}$, prediction $\hat Y\in\{0,1\}$, and protected attribute $A$, demographic parity requires equal selection rates:

$$
P(\hat Y=1\mid A=a)=P(\hat Y=1\mid A=b).
$$

Equal opportunity requires equal true-positive rates among people with $Y=1$:

$$
P(\hat Y=1\mid Y=1,A=a)=P(\hat Y=1\mid Y=1,A=b).
$$

Equalized odds is stricter: prediction must be conditionally independent of $A$ given $Y$, which in binary classification means both true-positive and false-positive rates match:

$$
P(\hat Y=1\mid Y=y,A=a)=P(\hat Y=1\mid Y=y,A=b),\qquad y\in\{0,1\}.
$$

These are diagnostic tests, not moral axioms. Demographic parity ignores labels and can hide quality-of-service failures; equalized odds depends on whether the label is a valid proxy for the real construct. That is why a fairness review should also inspect [explainability](explainability.md), segment-specific [error taxonomies](error-taxonomies.md), and [calibration](../03-classical-machine-learning/calibration.md).

## Executed metric check

This snippet computes group selection rates, true-positive rates, false-positive rates, and fairness gaps before and after a group-adjusted threshold.

```python
import numpy as np

y_true = np.array([1,1,1,1,1,1,0,0,0,0,0,0, 1,1,1,1,1,1,0,0,0,0,0,0])
group = np.array(["A"] * 12 + ["B"] * 12)
y_pred_base = np.array([1,1,1,1,1,0,0,0,0,0,1,0, 1,1,1,0,0,0,1,1,0,0,0,0])
y_pred_equalized = np.array([1,1,1,0,0,0,0,0,0,0,1,1, 1,1,1,0,0,0,1,1,0,0,0,0])

def rates(y, pred, g):
    out = {}
    for value in sorted(set(g)):
        m = g == value
        tp = int(((pred[m] == 1) & (y[m] == 1)).sum())
        fn = int(((pred[m] == 0) & (y[m] == 1)).sum())
        fp = int(((pred[m] == 1) & (y[m] == 0)).sum())
        tn = int(((pred[m] == 0) & (y[m] == 0)).sum())
        out[value] = {
            "selection": float(pred[m].mean()),
            "tpr": tp / (tp + fn),
            "fpr": fp / (fp + tn),
            "confusion": (tp, fn, fp, tn),
        }
    dp = abs(out["A"]["selection"] - out["B"]["selection"])
    tpr_gap = abs(out["A"]["tpr"] - out["B"]["tpr"])
    fpr_gap = abs(out["A"]["fpr"] - out["B"]["fpr"])
    return out, dp, tpr_gap, fpr_gap

for name, pred in [("base_threshold", y_pred_base), ("group_adjusted", y_pred_equalized)]:
    out, dp, tpr_gap, fpr_gap = rates(y_true, pred, group)
    print(name)
    for value in ["A", "B"]:
        vals = out[value]
        print(value, "selection", round(vals["selection"], 3), "TPR", round(vals["tpr"], 3), "FPR", round(vals["fpr"], 3), "confusion(tp,fn,fp,tn)", vals["confusion"])
    print("demographic_parity_diff", round(dp, 3), "equal_opportunity_diff", round(tpr_gap, 3), "equalized_odds_diff", round(max(tpr_gap, fpr_gap), 3))
```

Observed output:

```text
base_threshold
A selection 0.5 TPR 0.833 FPR 0.167 confusion(tp,fn,fp,tn) (5, 1, 1, 5)
B selection 0.417 TPR 0.5 FPR 0.333 confusion(tp,fn,fp,tn) (3, 3, 2, 4)
demographic_parity_diff 0.083 equal_opportunity_diff 0.333 equalized_odds_diff 0.333
group_adjusted
A selection 0.417 TPR 0.5 FPR 0.333 confusion(tp,fn,fp,tn) (3, 3, 2, 4)
B selection 0.417 TPR 0.5 FPR 0.333 confusion(tp,fn,fp,tn) (3, 3, 2, 4)
demographic_parity_diff 0.0 equal_opportunity_diff 0.0 equalized_odds_diff 0.0
```

The group-adjusted predictions equalize the measured rates, but they do it by lowering group A's true-positive rate from 0.833 to 0.5 and raising its false-positive rate from 0.167 to 0.333. This is the practical fairness trade-off: a dashboard should show both the disparity reduction and the lost utility, using ordinary [evaluation metrics](../03-classical-machine-learning/evaluation-metrics.md) beside the fairness metrics.

## Review controls

A useful fairness artifact records the protected or proxy groups evaluated, the construct the label is supposed to measure, base rates, selection rates, TPR/FPR/FNR by group, sample sizes, confidence intervals where possible, the chosen intervention, and residual risk. For high-impact systems, [auditability](auditability.md) should preserve the exact model, threshold, dataset slice, and approval that produced the review.

## References

- [Fairlearn documentation: Common fairness metrics](https://fairlearn.org/main/user_guide/assessment/common_fairness_metrics.html)
- [Barocas, Hardt, and Narayanan, Fairness and Machine Learning](https://fairmlbook.org/)
- [Hardt, Price, and Srebro, Equality of Opportunity in Supervised Learning](https://arxiv.org/abs/1610.02413)

> [!nav]
> **Section** — [Responsible AI, Safety, and Governance](index.md)
>
> [← Policy Enforcement](policy-enforcement.md) [Explainability →](explainability.md)

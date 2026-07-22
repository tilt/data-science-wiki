---
title: Calibration
slug: experimentation-and-evaluation/calibration
description: "Evaluating whether predicted probabilities and confidence scores match observed frequencies."
area: experimentation-and-evaluation
topics:
  - calibration
  - brier-score
  - confidence
level: foundational
status: complete
page_type: concept
aliases:
  - "Reliability"
prerequisites:
  - index.md
related:
  - abstention.md
  - coverage.md
  - statistical-significance.md
  - ../03-classical-machine-learning/calibration.md
  - ../03-classical-machine-learning/evaluation-metrics.md
historical_context: false
last_reviewed: 2026-07-23
---

# Calibration

Calibration evaluation checks whether confidence scores mean what downstream decisions assume. The canonical modelling concept is [classical ML calibration](../03-classical-machine-learning/calibration.md); this page focuses on how to report reliability in an evaluation suite. Calibration matters when confidence drives [abstention](abstention.md), triage, pricing, or expected-cost decisions.

## Calibration error

Perfect binary calibration means

$$
P(Y=1\mid \hat p(X)=p)=p.
$$

Two common summaries are Brier score and expected calibration error:

$$
BS=\frac{1}{n}\sum_i(\hat p_i-y_i)^2,\qquad
ECE=\sum_b \frac{n_b}{n}\left|\operatorname{acc}(b)-\operatorname{conf}(b)\right|.
$$

Always pair these with bin counts and [coverage](coverage.md), because sparse bins can look stable by accident.

## Worked calculation

This snippet computes a Brier score and binned calibration table, then aggregates the bin gaps into expected calibration error.

```python
import numpy as np
from sklearn.metrics import brier_score_loss

probs = np.array([0.05,0.12,0.18,0.22,0.35,0.41,0.55,0.63,0.72,0.81,0.88,0.95])
y = np.array([0,0,1,0,0,1,1,0,1,1,1,1])
bins = np.array([0,.25,.5,.75,1.0])
ids = np.digitize(probs, bins, right=True) - 1
ece = 0.0
print(f"brier {brier_score_loss(y, probs):.4f}")
for b in range(len(bins)-1):
    mask = ids == b
    conf, obs, weight = probs[mask].mean(), y[mask].mean(), mask.mean()
    ece += weight * abs(obs - conf)
    print(f"bin_{bins[b]:.2f}_{bins[b+1]:.2f} n {mask.sum()} mean_pred {conf:.3f} observed {obs:.3f}")
print(f"ece_4bin {ece:.4f}")
```

Observed output:

```text
brier 0.1616
bin_0.00_0.25 n 4 mean_pred 0.142 observed 0.250
bin_0.25_0.50 n 2 mean_pred 0.380 observed 0.500
bin_0.50_0.75 n 3 mean_pred 0.633 observed 0.667
bin_0.75_1.00 n 3 mean_pred 0.880 observed 1.000
ece_4bin 0.0942
```

The model is underconfident in every bin here: observed rates are above mean predicted probabilities. A threshold policy should not treat these scores as literal risks until validation and slice checks support that use.

![Reliability diagram showing observed frequencies above the ideal calibration diagonal in all four bins.](../assets/diagrams/calibration-reliability-diagram.svg)

The plot turns the printed bin table into the usual reliability diagram. Points above the diagonal mean the event happens more often than the model predicts, so all four bins point in the same underconfidence direction.

## Caveats

Do not calibrate on the final test set and then report that same set as unbiased evidence. Global calibration can hide subgroup miscalibration. For LLM judges, numeric scores are preferences or rubric outputs, not probabilities, unless explicitly validated against human labels.

## References

- [scikit-learn User Guide: Probability calibration](https://scikit-learn.org/stable/modules/calibration.html)
- [scikit-learn documentation: brier_score_loss](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.brier_score_loss.html)

> [!nav]
> **Section** — [Experimentation and Evaluation](index.md)
>
> [← Golden Datasets](golden-datasets.md) [Statistical Significance →](statistical-significance.md)

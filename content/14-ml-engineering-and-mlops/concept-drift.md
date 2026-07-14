---
title: Concept Drift
slug: ml-engineering-and-mlops/concept-drift
description: "A change in the production relationship between inputs and outcomes."
area: ml-engineering-and-mlops
topics:
  - concept-drift
level: advanced
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - data-drift.md
  - model-degradation.md
  - monitoring.md
  - evaluation-datasets.md
  - human-in-the-loop-systems.md
  - ../05-time-series-and-forecasting/concept-drift-in-forecasting.md
historical_context: false
last_reviewed: 2026-07-11
---

# Concept Drift

Concept drift is a change in the conditional relationship a model is meant to learn: $P_t(Y\mid X)$ differs from the relationship seen during training or validation. It is different from [data drift](data-drift.md), which only says $P_t(X)$ moved. A feature distribution can move while the decision boundary is still valid, and the feature distribution can look stable while fraud tactics, user intent, or labeling policy changes make the old boundary wrong.

## Mechanism

For a deployed classifier with score $s=f_\theta(x)$, concept drift shows up when delayed labels reveal that calibration, ranking, or threshold utility has changed in a production window:

$$
P_{\text{train}}(Y=1\mid X=x) \ne P_{\text{prod}}(Y=1\mid X=x).
$$

That inequality cannot usually be proven at request time because labels arrive late. A practical contract combines early input checks from [monitoring](monitoring.md), delayed outcome checks from [evaluation datasets](evaluation-datasets.md), and a response path through [model degradation](model-degradation.md) triage. In forecasting systems, the same idea appears as [concept drift in forecasting](../05-time-series-and-forecasting/concept-drift-in-forecasting.md), where the target-generating process changes over time.

## Executed Drift Check

This synthetic check compares a reference feature window with a shifted production window using SciPy's two-sample Kolmogorov-Smirnov test. The KS test detects distribution movement, not concept drift by itself, so it is an early warning that must be paired with delayed labels or human review.

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(13)
reference = rng.normal(0.0, 1.0, 400)
current = rng.normal(0.45, 1.0, 400)
ks = stats.ks_2samp(reference, current)
print("concept_ks_stat", round(ks.statistic, 4))
print("concept_ks_pvalue", f"{ks.pvalue:.6g}")
print("concept_decision", "alert" if ks.pvalue < 0.01 else "hold")
```

Observed output:

```text
concept_ks_stat 0.2125
concept_ks_pvalue 2.54965e-08
concept_decision alert
```

The alert says the monitored input window moved. To call it concept drift, compare outcomes by model version, segment, and threshold once labels arrive; for high-risk decisions, route suspicious disagreements into [human-in-the-loop systems](human-in-the-loop-systems.md) instead of silently retraining on unreviewed data.

## Failure Modes

The common error is treating every drift alert as a retraining trigger. If the source is a logging bug, a seasonal campaign, or a data backfill, retraining can bake the defect into the model. The opposite error is waiting for aggregate accuracy to fall: a minority segment can drift enough to violate policy before global metrics move. Track drift, performance, and operational changes on the same timeline.

## References

- [Lu et al., Learning under Concept Drift: A Review](https://arxiv.org/abs/2004.05785)
- [SciPy documentation: `scipy.stats.ks_2samp`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ks_2samp.html)
- [Google Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)

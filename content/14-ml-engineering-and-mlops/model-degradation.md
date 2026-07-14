---
title: Model Degradation
slug: ml-engineering-and-mlops/model-degradation
description: "Observed decline in a model's production usefulness or safety."
area: ml-engineering-and-mlops
topics:
  - model-degradation
level: foundational
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - concept-drift.md
  - data-drift.md
  - monitoring.md
  - rollbacks.md
  - evaluation-datasets.md
historical_context: false
last_reviewed: 2026-07-11
---
# Model Degradation

Model degradation is a measured decline in production behavior: worse ranking, calibration, cost-weighted error, coverage, or human override rate. It is an outcome, not a cause. The cause may be [data drift](data-drift.md), [concept drift](concept-drift.md), a feature pipeline bug, feedback loops, or a changed business process.

## Mechanism

Degradation monitoring compares current behavior with an approved baseline by model version and slice. The diagnosis should separate request health, feature freshness, score distribution, delayed labels, threshold decisions, and user impact. If the current model is unsafe, [rollbacks](rollbacks.md) take priority over root-cause perfection.

## Executed Delayed-Label Check

This snippet compares reference and degraded prediction scores with AUC and log loss to show performance decay without changing labels.

```python
import numpy as np
from sklearn.metrics import log_loss, roc_auc_score

rng = np.random.default_rng(8)
y = rng.binomial(1, 0.38, 600)
score_ref = np.clip(0.25 + 0.55*y + rng.normal(0, 0.17, 600), 0, 1)
score_cur = np.clip(0.38 + 0.28*y + rng.normal(0, 0.23, 600), 0, 1)
print("degrade_auc_ref", round(roc_auc_score(y, score_ref), 3))
print("degrade_auc_cur", round(roc_auc_score(y, score_cur), 3))
print("degrade_logloss_ref", round(log_loss(y, score_ref), 3))
print("degrade_logloss_cur", round(log_loss(y, score_cur), 3))
```

Observed output:

```text
degrade_auc_ref 0.99
degrade_auc_cur 0.808
degrade_logloss_ref 0.284
degrade_logloss_cur 0.715
```

The current window ranks positives worse and has poorer probability quality. That finding should trigger [monitoring](monitoring.md) drill-down by segment and [evaluation datasets](evaluation-datasets.md) replay against recent labeled cases.

## Failure Modes

Aggregate metrics can hide severe slice degradation. Delayed labels can make the incident visible only after harm occurred. A model can also degrade while infrastructure dashboards remain green, which is why model telemetry belongs in the same incident workflow as service telemetry.

## References

- [Google Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)
- [MLflow Tracking documentation](https://mlflow.org/docs/latest/ml/tracking/)

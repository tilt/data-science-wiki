---
title: Predictive Maintenance
slug: domain-applications/predictive-maintenance
description: "Sensor-driven failure prediction and remaining-useful-life estimation for maintenance decisions."
area: domain-applications
topics:
  - application
  - predictive-maintenance
level: intermediate
status: review
page_type: case-study
aliases: []
prerequisites:
  - index.md
related:
  - ../05-time-series-and-forecasting/predictive-maintenance.md
  - ../05-time-series-and-forecasting/time-series-fundamentals.md
  - ../05-time-series-and-forecasting/forecast-evaluation.md
  - ../03-classical-machine-learning/class-imbalance.md
  - ../03-classical-machine-learning/gradient-boosting.md
  - ../14-ml-engineering-and-mlops/monitoring.md
historical_context: false
last_reviewed: 2026-07-11
---

# Predictive Maintenance

Predictive maintenance turns equipment telemetry into a maintenance decision: inspect now, schedule during the next planned stop, or keep running. A well-posed case names the asset population, the sensor stream, the target, and the action latency. For rotating machinery, inputs may be vibration spectra, temperatures, operating regime, recent repair history, and usage hours; targets may be remaining useful life (RUL), failure within the next $h$ hours, or anomaly triage. This is the applied framing around the forecasting concept page on [predictive maintenance](../05-time-series-and-forecasting/predictive-maintenance.md), but the operational cost model is usually more important than the model family.

## Problem Framing

The target should match the decision. RUL regression supports parts planning; a binary "fail in 14 days" label supports work-order prioritization; [anomaly detection](../03-classical-machine-learning/anomaly-detection.md) supports investigation when failure labels are sparse. Evaluation must respect time: train on earlier units or cycles, validate on later units, and avoid leakage from post-failure repairs or duplicated machine identifiers. Since actual failures are rare, inspect [class imbalance](../03-classical-machine-learning/class-imbalance.md), precision-recall curves, alert volume per week, lead time before failure, and cost-weighted false alarms.

The NASA C-MAPSS turbofan benchmark is a canonical public artifact: NASA says the turbofan degradation simulation used four sets under different operating conditions and fault modes, with several sensor channels recording fault evolution. That benchmark is useful because it exposes the usual tension between [time-series fundamentals](../05-time-series-and-forecasting/time-series-fundamentals.md), operating-regime covariates, and unit-level generalization.

## Executed Artifact

This synthetic rare-failure classifier shows why PR-AUC is more informative than accuracy when the maintenance queue can only inspect the riskiest assets. It trains a failure-risk model on imbalanced sensor features, compares average precision against a prior-only baseline, and counts how many true failures land in the top 20 risk scores, the slice an inspection team would actually work.

```python
import numpy as np
from sklearn.datasets import make_classification
from sklearn.dummy import DummyClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import average_precision_score
from sklearn.model_selection import train_test_split

X, y = make_classification(
    n_samples=800,
    n_features=12,
    n_informative=5,
    weights=[0.93, 0.07],
    class_sep=1.1,
    random_state=18,
)
Xtr, Xte, ytr, yte = train_test_split(
    X, y, stratify=y, test_size=0.35, random_state=18
)
dummy = DummyClassifier(strategy="prior").fit(Xtr, ytr)
gb = GradientBoostingClassifier(random_state=18).fit(Xtr, ytr)
scores = gb.predict_proba(Xte)[:, 1]

print("test_failure_rate", round(yte.mean(), 3))
print("prior_ap", round(average_precision_score(yte, dummy.predict_proba(Xte)[:, 1]), 3))
print("gb_ap", round(average_precision_score(yte, scores), 3))
print("top20_failures", int(yte[np.argsort(scores)[-20:]].sum()))
```

Observed output:

```text
test_failure_rate 0.075
prior_ap 0.075
gb_ap 0.803
top20_failures 15
```

The executed `GradientBoostingClassifier(random_state=18)` found 15 of 21 held-out failures in the top 20 risk scores. A prior-only baseline has average precision equal to the 7.5% failure rate, so the model is useful for ranking even before choosing a dispatch threshold. A real deployment would also report lead-time distribution and false-alarm burden, not only [forecast evaluation](../05-time-series-and-forecasting/forecast-evaluation.md) averages.

## Failure Modes

The common failure is learning maintenance policy rather than degradation: sensors change after service, operators inspect noisy machines more often, and labels often record discovery time rather than physical onset. Models drift when duty cycles, spare parts, lubricant, or environment change, so production [monitoring](../14-ml-engineering-and-mlops/monitoring.md) should track sensor coverage, alert yield, and post-maintenance outcomes. Complex learners such as [gradient boosting](../03-classical-machine-learning/gradient-boosting.md) are strong baselines, but the maintenance plan still needs a human-readable reason code and a fallback rule for missing telemetry.

## References

- [NASA Prognostics Center of Excellence Data Set Repository: Turbofan Engine Degradation Simulation](https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/)

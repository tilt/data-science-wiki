---
title: Data Drift
slug: ml-engineering-and-mlops/data-drift
description: "A production input distribution moving away from the model's reference data."
area: ml-engineering-and-mlops
topics:
  - data-drift
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - concept-drift.md
  - monitoring.md
  - model-degradation.md
  - evaluation-datasets.md
  - ../13-data-engineering/data-quality.md
historical_context: false
last_reviewed: 2026-07-11
---

# Data Drift

Data drift means production inputs no longer follow the reference distribution used for training, validation, or release approval. It concerns $P(X)$, while [concept drift](concept-drift.md) concerns $P(Y\mid X)$. Data drift can be harmless, but it is often the earliest observable sign that [model degradation](model-degradation.md) may follow.

## Mechanism

Drift checks compare a reference window with a current window by feature, slice, and time. Numeric features can use quantile buckets, KS tests, or Wasserstein distance; categorical features can use frequency shifts; embeddings can use distance summaries. The check must record the reference period, bucket edges, sample sizes, and alert threshold so [monitoring](monitoring.md) can distinguish real movement from changing definitions.

## Executed PSI Check

This snippet bins a reference and current feature distribution and computes population stability index from the bucket proportions.

```python
import numpy as np

rng = np.random.default_rng(21)
ref = rng.normal(0, 1, 1000)
cur = rng.normal(0.35, 1.15, 1000)
edges = np.quantile(ref, np.linspace(0, 1, 6))
edges[0], edges[-1] = -np.inf, np.inf
r_counts, _ = np.histogram(ref, edges)
c_counts, _ = np.histogram(cur, edges)
r = np.clip(r_counts / r_counts.sum(), 1e-6, None)
c = np.clip(c_counts / c_counts.sum(), 1e-6, None)
psi = ((c - r) * np.log(c / r)).sum()
print("psi_bucket_ref", np.round(r, 3).tolist())
print("psi_bucket_cur", np.round(c, 3).tolist())
print("psi_total", round(float(psi), 4))
```

Observed output:

```text
psi_bucket_ref [0.2, 0.2, 0.2, 0.2, 0.2]
psi_bucket_cur [0.156, 0.155, 0.162, 0.206, 0.321]
psi_total 0.0878
```

The top bucket grew from 20.0% to 32.1%, but the total PSI is still below a typical investigation threshold such as 0.1. That decision must be calibrated on the model and domain; for a credit model, the same movement in a protected or regulated segment may require review even if the global score is modest. Link the alert to [evaluation datasets](evaluation-datasets.md) and upstream [data quality](../13-data-engineering/data-quality.md) checks before retraining.

## Failure Modes

Drift alerts become noise when they ignore seasonality, small samples, or intended launches. They also miss harm when only aggregated features are monitored. Store feature names, versions, and reference windows with every alert.

## References

- [Google Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)
- [SciPy documentation: `scipy.stats.ks_2samp`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ks_2samp.html)

> [!nav]
> **Section** — [ML Engineering and MLOps](index.md)
>
> [← Reliability](reliability.md) [Concept Drift →](concept-drift.md)

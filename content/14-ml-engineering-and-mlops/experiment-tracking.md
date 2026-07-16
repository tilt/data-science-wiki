---
title: Experiment Tracking
slug: ml-engineering-and-mlops/experiment-tracking
description: "Capturing the code, data, configuration, metrics, and artifacts behind model runs."
area: ml-engineering-and-mlops
topics:
  - experiment-tracking
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - dataset-versioning.md
  - model-versioning.md
  - training-pipelines.md
  - ci-cd-for-ml.md
  - evaluation-datasets.md
historical_context: false
last_reviewed: 2026-07-11
---

# Experiment Tracking

Experiment tracking records the evidence behind training and evaluation runs: code commit, [dataset versioning](dataset-versioning.md), parameters, metrics, artifacts, environment, notes, and promotion status. It prevents "best model" from meaning "the notebook output someone remembers."

## Mechanism

Each serious run should create an immutable run record. The record should link input datasets, feature pipeline version, random seed, hyperparameters, metrics by slice, produced artifact, and reviewer notes. A promoted [model-versioning](model-versioning.md) entry should point back to the run that created it.

## Artifact: Run Record

```yaml
run:
  tracking_uri: "mlflow://experiments/fraud-scorer"
  run_id: "6f4a9d2"
  code_commit: "9b51c0e"
  dataset: "fraud_training:2026-07-11.v3"
  params:
    model: xgboost
    max_depth: 6
    learning_rate: 0.04
  metrics:
    validation_auc: 0.913
    new_account_recall: 0.742
    p95_latency_ms: 84
  artifacts:
    model_uri: "registry://fraud-scorer/candidate-6f4a9d2"
    eval_report: "s3://ml-reports/fraud/6f4a9d2.html"
```

[Training pipelines](training-pipelines.md) should log this automatically, and [ci-cd-for-ml](ci-cd-for-ml.md) should consume it for promotion gates.

## Failure Modes

Tracking fails when it stores metrics without data versions, when failed runs are discarded, or when manual notebook steps are not captured. For generative systems, prompts, retrieval indexes, judge versions, and sampled outputs are part of the experiment.

## References

- [MLflow Tracking documentation](https://mlflow.org/docs/latest/ml/tracking/)
- [Google Cloud: MLOps continuous delivery and automation pipelines](https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning)

> [!nav]
> **Section** — [ML Engineering and MLOps](index.md)
>
> [← CI/CD for ML](ci-cd-for-ml.md) [Dataset Versioning →](dataset-versioning.md)

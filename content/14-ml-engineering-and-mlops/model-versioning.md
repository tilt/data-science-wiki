---
title: Model Versioning
slug: ml-engineering-and-mlops/model-versioning
description: "Immutable records of model behavior, lineage, evaluation evidence, and deployment state."
area: ml-engineering-and-mlops
topics:
  - model-versioning
level: foundational
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - dataset-versioning.md
  - experiment-tracking.md
  - model-serving.md
  - rollbacks.md
  - ci-cd-for-ml.md
historical_context: false
last_reviewed: 2026-07-11
---

# Model Versioning

Model versioning records the complete behavior that may be served or audited: artifact, code, data, preprocessing, thresholds, environment, evaluation evidence, approval status, and deployment target. Versioning only the weight file is not enough for [rollbacks](rollbacks.md).

## Mechanism

A candidate model is registered after training, compared against baselines, approved or rejected, and promoted through environments. The registry entry should point back to [experiment tracking](experiment-tracking.md) and [dataset versioning](dataset-versioning.md) records, then forward to [model-serving](model-serving.md) deployments.

## Artifact: Registry Entry

```yaml
model_version:
  name: fraud-scorer
  version: 42
  artifact_uri: "s3://ml-artifacts/fraud/42/model.pkl"
  artifact_sha256: "2c8f..."
  code_commit: "9b51c0e"
  dataset: "fraud_training:2026-07-11.v3"
  feature_pipeline: "features:v19"
  threshold_config: "thresholds:v8"
  eval_report: "s3://ml-reports/fraud/42.html"
  approval:
    status: approved_for_canary
    approver: risk-ml-lead
```

The version is immutable once approved. If a threshold changes, create a new behavior version or a separately versioned threshold config that the serving contract records.

## Failure Modes

Versioning fails when models are overwritten in place, when preprocessing lives only in code, or when labels and thresholds are excluded from lineage. In regulated or high-risk systems, missing version links turn an incident into an audit problem.

## References

- [MLflow Models documentation](https://mlflow.org/docs/latest/ml/model/)
- [DVC: Versioning Data and Models](https://dvc.org/doc/use-cases/versioning-data-and-models)

> [!nav]
> **Section** — [ML Engineering and MLOps](index.md)
>
> [← Dataset Versioning](dataset-versioning.md) [Evaluation Datasets →](evaluation-datasets.md)

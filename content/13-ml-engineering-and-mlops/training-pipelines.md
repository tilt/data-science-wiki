---
title: Training Pipelines
slug: ml-engineering-and-mlops/training-pipelines
description: "Automated, auditable workflows that produce evaluated model artifacts."
area: ml-engineering-and-mlops
topics:
  - training-pipelines
level: intermediate
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - dataset-versioning.md
  - experiment-tracking.md
  - model-versioning.md
  - ci-cd-for-ml.md
  - ../12-data-engineering/feature-pipelines.md
historical_context: false
last_reviewed: 2026-07-11
---
# Training Pipelines

Training pipelines automate the steps that turn versioned data into an evaluated model artifact. They are not just scheduled notebooks: they must make inputs, parameters, outputs, and approval evidence reproducible.

## Mechanism

A pipeline typically extracts point-in-time data, validates schema, builds features, trains, evaluates, records an [experiment tracking](experiment-tracking.md) run, registers a candidate [model version](model-versioning.md), and publishes a release report. It consumes [dataset versioning](dataset-versioning.md) manifests and often depends on upstream [feature pipelines](../12-data-engineering/feature-pipelines.md).

## Artifact: Pipeline DAG

```yaml
dag: churn_training
schedule: "0 3 * * *"
tasks:
  - id: build_dataset
    outputs: ["dataset_manifest.yaml"]
  - id: validate_schema
    requires: [build_dataset]
    fail_on: [missing_required_column, label_leakage_check]
  - id: train_model
    requires: [validate_schema]
    outputs: ["model.pkl", "training_metrics.json"]
  - id: evaluate_release
    requires: [train_model]
    gates:
      validation_auc: ">= 0.84"
      p95_latency_ms: "<= 120"
  - id: register_candidate
    requires: [evaluate_release]
    outputs: ["model_registry_version"]
```

[CI/CD for ML](ci-cd-for-ml.md) should test this DAG and block promotion when artifacts are missing. A completed run means the workflow executed, not that labels or business assumptions are correct.

## Failure Modes

Pipelines fail semantically when point-in-time joins leak future data, when random seeds and splits change silently, or when a retry publishes a partial artifact. Make tasks idempotent and validate outputs before registration.

## References

- [TensorFlow Extended User Guide](https://www.tensorflow.org/tfx/guide)
- [Apache Airflow DAGs documentation](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html)

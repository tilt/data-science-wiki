---
title: Dataset Versioning
slug: ml-engineering-and-mlops/dataset-versioning
description: "Recording exact data snapshots, labels, and splits used for training and evaluation."
area: ml-engineering-and-mlops
topics:
  - dataset-versioning
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - model-versioning.md
  - training-pipelines.md
  - experiment-tracking.md
  - evaluation-datasets.md
  - ../13-data-engineering/data-lineage.md
historical_context: false
last_reviewed: 2026-07-17
---

# Dataset Versioning

Dataset versioning records the exact data snapshot, labels, filters, schema, and split policy used for training or evaluation. Without it, [experiment tracking](experiment-tracking.md) can tell which run won but not what evidence it used.

## Mechanism

A dataset version should be immutable and addressable. It should identify source tables or files, extraction time, transformation code, label definition, exclusions, schema, checksums, and train/validation/test split seed. For mutable warehouses, table name is not a version; the snapshot or query result is.

Concretely, suppose two training runs a week apart both read `warehouse.events` filtered to June. If late-arriving rows land in the June partition between the runs, the two models learn from different data under an identical query — an untracked change that makes any comparison between them meaningless. Pinning the snapshot time (or materializing the query result) means re-running the manifest reproduces exactly the same rows, which is the precondition for [experiment tracking](experiment-tracking.md) and [model-versioning](model-versioning.md) to mean anything.

## Artifact: Dataset Manifest

```yaml
dataset:
  name: churn_training
  version: "2026-07-11.v3"
  sources:
    - table: warehouse.customers
      snapshot: "2026-07-10T23:59:00Z"
    - table: warehouse.events
      snapshot: "2026-07-10T23:59:00Z"
  label:
    definition: "cancelled subscription within 30 days"
    positive_window_days: 30
  split:
    method: deterministic_hash
    key: customer_id
    seed: 20260711
  checks:
    row_count: 1832741
    schema_hash: "sha256:6b7f..."
```

[Training pipelines](training-pipelines.md) should emit this manifest and [model-versioning](model-versioning.md) should point to it. The related data-engineering page on [data lineage](../13-data-engineering/data-lineage.md) covers the upstream graph; this page fixes the ML snapshot contract.

## Failure Modes

Common failures are training from live tables, overwriting labels, changing exclusion rules without a new version, and mixing active-learning labels into old benchmarks. Version the split as well as the raw data.

## References

- [DVC: Versioning Data and Models](https://dvc.org/doc/use-cases/versioning-data-and-models)
- [MLflow Tracking documentation](https://mlflow.org/docs/latest/ml/tracking/)

> [!nav]
> **Section** — [ML Engineering and MLOps](index.md)
>
> [← Experiment Tracking](experiment-tracking.md) [Model Versioning →](model-versioning.md)

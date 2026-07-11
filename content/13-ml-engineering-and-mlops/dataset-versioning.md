---
title: Dataset Versioning
slug: ml-engineering-and-mlops/dataset-versioning
description: Concise guide to Dataset Versioning in ML Engineering and MLOps.
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
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

Dataset versioning records exactly which data was used for training, evaluation, backfills, and audits. Without it, model results become hard to reproduce and regressions become hard to explain.

## What to version

A useful dataset version includes the data source, extraction time, query or transformation code, schema, filters, label definitions, sampling rules, and storage location. For mutable production data, versioning must identify the snapshot, not only the table name.

## Example

A churn model trained on `customers` and `events` should record the table snapshots, feature pipeline version, label window, exclusion rules, and train-validation split seed. If the model is challenged later, the team can reconstruct both the inputs and the target definition.

## Practical checks

Store dataset metadata next to model artifacts, make splits deterministic, validate schema changes before training, and keep evaluation datasets immutable unless a new version is deliberately created. When labels are corrected, create a new dataset version rather than silently mutating history.

## Failure modes

Common failures are training from live tables, overwriting evaluation files, treating a notebook as the only record of filters, and mixing corrected labels into old benchmark claims.

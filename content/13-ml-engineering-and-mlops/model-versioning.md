---
title: Model Versioning
slug: ml-engineering-and-mlops/model-versioning
description: Concise guide to Model Versioning in ML Engineering and MLOps.
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
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

Model versioning records the model artifact, code, data, configuration, and evaluation evidence associated with a release. It makes promotion, rollback, audit, and comparison possible.

## What a model version contains

A useful model version should identify the artifact hash or registry ID, training code commit, dataset versions, feature definitions, hyperparameters, dependency environment, evaluation report, approval status, and intended deployment target. The version should be immutable once released.

## Example

A fraud model version might include model artifact `fraud-xgb-2026-07-10`, feature pipeline `features:v42`, training dataset `chargebacks_2026w27`, threshold `0.82`, and an evaluation report by country and payment type. If a rollback is needed, operators know exactly what behavior they are restoring.

## Lifecycle

Register candidates after training, compare them against baselines, promote approved versions to staging, deploy with a rollout strategy, and retire versions only after no production traffic or audit requirement depends on them.

## Failure modes

Versioning fails when the artifact is versioned but thresholds, preprocessing, prompts, retrieval indexes, or label definitions are not. Version the behavior, not only the serialized weights.

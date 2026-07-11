---
title: Model Degradation
slug: ml-engineering-and-mlops/model-degradation
description: Concise guide to Model Degradation in ML Engineering and MLOps.
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
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

Model degradation is the observed decline of a model's usefulness in production. It can result from data drift, concept drift, system bugs, feedback loops, or changed business requirements.

## Symptoms

Symptoms include worse outcome metrics, more human overrides, rising complaint rates, calibration decay, lower coverage, unusual score distributions, or increased fallback usage. The symptom may appear long after the cause.

## Example

A recommendation model may degrade after a catalogue change because item embeddings for new products are poor. User engagement drops even though service latency and error rates remain healthy.

## Diagnosis

Separate infrastructure failure, data pipeline issues, input drift, label delay, and true target drift. Compare current performance with historical baselines by segment and model version.

## Response

Possible responses include rollback, retraining, threshold adjustment, feature repair, data backfill, or model replacement. The response should be tied to the diagnosed cause.

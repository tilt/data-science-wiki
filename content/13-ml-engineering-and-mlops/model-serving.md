---
title: Model Serving
slug: ml-engineering-and-mlops/model-serving
description: Concise guide to Model Serving in ML Engineering and MLOps.
area: ml-engineering-and-mlops
topics:
  - model-serving
level: intermediate
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

Model serving exposes trained model behavior to applications through batch jobs, online endpoints, streaming APIs, or embedded runtimes. The serving layer must preserve the model contract while meeting latency, reliability, security, and observability requirements.

## Core responsibilities

A serving system loads the correct model artifact, applies the same preprocessing used in training, validates requests, executes inference, returns a stable response schema, and emits telemetry. It also needs versioning, rollout controls, fallback behavior, and resource management.

## Example

A fraud model serving endpoint receives transaction features, checks schema and freshness, computes a score, applies a threshold, returns a decision plus reason codes, and logs model version, feature version, latency, and decision metadata. If the feature store is unavailable, it follows a documented fallback rather than returning arbitrary scores.

## Serving patterns

Batch serving is efficient for scheduled predictions. Online serving supports request-time decisions. Streaming serving handles continuous events. Edge serving runs near the user or device. The right pattern depends on freshness, latency, cost, and failure tolerance.

## Failure modes

Common failures include train-serving skew, missing feature validation, unversioned artifacts, cold-start latency, silent fallback changes, and no rollback path.

---
title: Batch and Online Inference
slug: ml-engineering-and-mlops/batch-and-online-inference
description: "When to score examples on a schedule versus at request time."
area: ml-engineering-and-mlops
topics:
  - batch-and-online-inference
level: intermediate
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - model-serving.md
  - training-pipelines.md
  - monitoring.md
  - service-level-objectives.md
  - ../12-data-engineering/batch-versus-streaming.md
historical_context: false
last_reviewed: 2026-07-11
---
# Batch and Online Inference

Batch inference scores many entities on a schedule; online inference scores one request, or a small request batch, while a user or downstream service is waiting. The choice is not cosmetic. It fixes the freshness contract, timeout behavior, cost shape, and the kind of [model-serving](model-serving.md) interface the rest of the system consumes.

## Mechanism

A batch path usually reads a point-in-time feature snapshot, writes predictions to a table, and exposes them through lookup. An online path validates a request, fetches fresh features, runs inference synchronously, and returns a bounded-latency response. The contract should name the scoring time, feature freshness, model version, fallback behavior, and owner of stale predictions.

## Artifact: Dual-Mode Contract

```yaml
prediction_contract:
  model: churn-risk
  version: registry://models/churn-risk/42
  batch:
    schedule: "0 2 * * *"
    input_snapshot: warehouse.customer_features_daily
    output_table: mart.churn_scores
    max_score_age_hours: 30
  online:
    endpoint: POST /v1/churn:predict
    timeout_ms: 120
    feature_freshness_s:
      account_state: 60
      last_session: 300
    fallback: return last batch score with fallback_reason
  telemetry:
    emit: [model_version, feature_version, score_age_s, latency_ms, fallback_reason]
```

This contract forces the same user-visible score to be explainable in [monitoring](monitoring.md): if an online request falls back to yesterday's batch score, the response must say so. Batch inference fits nightly churn outreach and inventory planning. Online inference fits fraud, ranking, and eligibility checks where stale state changes the decision.

## Failure Modes

Train-serving skew often begins when [training pipelines](training-pipelines.md) implement batch feature logic while online code reimplements it in a service. Freshness can also be misunderstood: a batch score may be operationally valid for 24 hours but unsafe after a plan cancellation, chargeback, or opt-out event. Tie each path to [service-level objectives](service-level-objectives.md), not just throughput.

## References

- [TensorFlow Serving RESTful API](https://www.tensorflow.org/tfx/serving/api_rest)
- [Apache Airflow DAGs documentation](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html)

---
title: ML Engineering and MLOps
slug: 14-ml-engineering-and-mlops
description: Index and learning map for ML Engineering and MLOps.
area: ml-engineering-and-mlops
topics:
  - "ml-system-lifecycle"
  - "experiment-tracking"
  - "dataset-versioning"
  - "model-versioning"
  - "training-pipelines"
  - "model-serving"
  - "batch-and-online-inference"
  - "microservices"
  - "docker"
  - "ci-cd-for-ml"
  - "monitoring"
  - "data-drift"
level: foundational
status: draft
page_type: area-index
aliases:
  - "ML Engineering and MLOps"
prerequisites:
  - "16-software-engineering/index.md"
  - "13-data-engineering/index.md"
related:
  - "05-time-series-and-forecasting/forecasting-system-design.md"
  - "05-time-series-and-forecasting/forecast-monitoring.md"
  - "05-time-series-and-forecasting/concept-drift-in-forecasting.md"
  - "05-time-series-and-forecasting/hyperparameter-optimization-for-forecasting.md"
  - "17-experimentation-and-evaluation/index.md"
  - "18-responsible-ai-safety-and-governance/index.md"
historical_context: false
last_reviewed: 2026-07-10
---

# ML Engineering and MLOps

## Summary

ML engineering and MLOps covers the lifecycle around a model: versioned data, reproducible training, evaluation gates, deployment, monitoring, reliability, and incident response. The model is only one artifact. A production ML system also includes datasets, feature definitions, pipelines, serving contracts, dashboards, rollback paths, and ownership.

Use this section when the question is "how do we operate this model safely and repeatedly?" For infrastructure primitives, see [Cloud and Distributed Systems](../15-cloud-and-distributed-systems/index.md). For experiment design and release evidence, see [Experimentation and Evaluation](../17-experimentation-and-evaluation/index.md).

## Lifecycle Map

| Lifecycle stage | Start with | Operational evidence |
| --- | --- | --- |
| Build and train | [ML System Lifecycle](ml-system-lifecycle.md), [Training Pipelines](training-pipelines.md) | reproducible code, data, config, and metrics |
| Track artifacts | [Experiment Tracking](experiment-tracking.md), [Dataset Versioning](dataset-versioning.md), [Model Versioning](model-versioning.md) | lineage from model back to data and run |
| Serve | [Model Serving](model-serving.md), [Batch and Online Inference](batch-and-online-inference.md), [Microservices](microservices.md) | latency, throughput, schema, rollback |
| Release safely | [Shadow Deployment](shadow-deployment.md), [Canary Deployment](canary-deployment.md), [Rollbacks](rollbacks.md) | staged exposure and abort criteria |
| Operate | [Monitoring](monitoring.md), [Observability](observability.md), [Production Incident Response](production-incident-response.md) | alerts, traces, drift, and owner response |

## Subtopics

- [ML System Lifecycle](ml-system-lifecycle.md)
- [Experiment Tracking](experiment-tracking.md)
- [Dataset Versioning](dataset-versioning.md)
- [Model Versioning](model-versioning.md)
- [Training Pipelines](training-pipelines.md)
- [Model Serving](model-serving.md)
- [Batch and Online Inference](batch-and-online-inference.md)
- [Microservices](microservices.md)
- [Docker](docker.md)
- [CI CD FOR ML](ci-cd-for-ml.md)
- [Monitoring](monitoring.md)
- [Data Drift](data-drift.md)
- [Concept Drift](concept-drift.md)
- [Model Degradation](model-degradation.md)
- [Observability](observability.md)
- [Reliability](reliability.md)
- [Service Level Objectives](service-level-objectives.md)
- [Rollbacks](rollbacks.md)
- [Shadow Deployment](shadow-deployment.md)
- [Canary Deployment](canary-deployment.md)
- [A/B Testing](a-b-testing.md)
- [Human IN THE Loop Systems](human-in-the-loop-systems.md)
- [Evaluation Datasets](evaluation-datasets.md)
- [Golden Datasets](golden-datasets.md)
- [Active Learning](active-learning.md)
- [Production Incident Response](production-incident-response.md)

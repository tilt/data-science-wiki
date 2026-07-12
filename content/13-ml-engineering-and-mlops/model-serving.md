---
title: Model Serving
slug: ml-engineering-and-mlops/model-serving
description: "The runtime contract that turns model artifacts into production predictions."
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
  - batch-and-online-inference.md
  - model-versioning.md
  - monitoring.md
  - docker.md
  - ../10-generative-ai/model-serving.md
historical_context: false
last_reviewed: 2026-07-11
---
# Model Serving

Model serving is the production runtime that loads a versioned artifact, applies the expected preprocessing, validates requests, executes inference, and returns a stable response schema. It is narrower than the whole ML system lifecycle but broader than `model.predict`: serving owns latency, resource limits, rollout compatibility, and telemetry.

## Artifact: Serving Contract

The serving contract should be explicit enough that [canary deployment](canary-deployment.md), [shadow deployment](shadow-deployment.md), and [rollbacks](rollbacks.md) can move traffic without changing client code.

```yaml
openapi: 3.1.0
info:
  title: Fraud score API
  version: "2026-07-11"
paths:
  /v1/fraud:score:
    post:
      x-model-version-header: X-Model-Version
      requestBody:
        required: true
        content:
          application/json:
            schema:
              required: [transaction_id, amount, currency, account_age_days]
      responses:
        "200":
          description: Score and decision metadata
          content:
            application/json:
              schema:
                required: [score, threshold, decision, model_version, feature_version]
```

The minimum runtime flow is request validation, feature retrieval, model invocation, thresholding, response serialization, and event emission. A [model-versioning](model-versioning.md) record must include thresholds and preprocessing, not only the serialized weights. If the feature store or model process fails, the service should return a documented fallback or an explicit error; silent default scores corrupt [monitoring](monitoring.md).

## Failure Modes

Serving fails when artifacts are mutable, schemas are informal, or clients infer meaning from undocumented fields. Cold starts and large model loads can violate latency SLOs even when accuracy is unchanged. Generative systems add prompt, retrieval, and safety-policy versions, which is why the parallel page on [generative AI model serving](../10-generative-ai/model-serving.md) treats context construction as part of the served behavior.

## References

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [TensorFlow Serving RESTful API](https://www.tensorflow.org/tfx/serving/api_rest)
- [MLflow Models documentation](https://mlflow.org/docs/latest/ml/model/)

> **Learning path — Production ML:** ← [Training Pipelines](training-pipelines.md) · [path overview](../00-home-and-navigation/learning-paths.md#production-ml) · [Monitoring](monitoring.md) →

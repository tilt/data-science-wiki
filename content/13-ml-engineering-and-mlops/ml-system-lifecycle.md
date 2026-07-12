---
title: ML System Lifecycle
slug: ml-engineering-and-mlops/ml-system-lifecycle
description: "The end-to-end path from problem framing to retirement of a model-backed system."
area: ml-engineering-and-mlops
topics:
  - ml-system-lifecycle
level: foundational
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - training-pipelines.md
  - ci-cd-for-ml.md
  - model-versioning.md
  - monitoring.md
  - production-incident-response.md
historical_context: false
last_reviewed: 2026-07-11
---
# ML System Lifecycle

The ML system lifecycle is the controlled path from problem framing to data creation, training, evaluation, deployment, monitoring, incident response, retraining, and retirement. It is broader than model development because production behavior depends on data, code, infrastructure, policies, and humans.

## Mechanism

Each stage should produce an artifact that the next stage consumes: a decision brief, dataset manifest, training run, evaluation report, model version, serving contract, rollout record, monitoring dashboard, and retirement note. The lifecycle is circular only when [monitoring](monitoring.md) or incidents create new evidence that justifies another training or policy cycle.

## Artifact: Lifecycle Gates

```yaml
lifecycle:
  frame:
    artifact: decision_brief.md
    gate: owner and harm model approved
  build_data:
    artifact: dataset_manifest.yaml
    gate: schema and label policy reviewed
  train:
    artifact: tracked_run
    gate: reproducible run in experiment tracker
  evaluate:
    artifact: release_eval_report.html
    gate: all slice gates pass
  deploy:
    artifact: model_version + serving_contract
    gate: rollback target and SLOs defined
  operate:
    artifact: monitoring + incident runbook
    gate: alerts routed to an owner
```

[Training pipelines](training-pipelines.md), [ci-cd-for-ml](ci-cd-for-ml.md), and [model-versioning](model-versioning.md) automate pieces of this lifecycle, but they do not replace ownership decisions.

## Failure Modes

Lifecycle diagrams fail when no gate can block release. Another failure is indefinite operation: models need retirement criteria when the product changes, labels disappear, or the maintenance cost exceeds value.

## References

- [Google Cloud: MLOps continuous delivery and automation pipelines](https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

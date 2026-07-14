---
title: Evaluation Datasets
slug: ml-engineering-and-mlops/evaluation-datasets
description: "Curated datasets used to decide whether a model change is acceptable."
area: ml-engineering-and-mlops
topics:
  - evaluation-datasets
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - golden-datasets.md
  - dataset-versioning.md
  - a-b-testing.md
  - model-degradation.md
  - ../17-experimentation-and-evaluation/offline-evaluation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Evaluation Datasets

Evaluation datasets are curated examples used to measure model behavior before release and during regression checks. They are broader than [golden datasets](golden-datasets.md): an evaluation set may be large and statistical, while a golden set is usually small, trusted, and inspectable.

## Mechanism

An evaluation dataset needs an owner, sampling policy, label policy, slice definitions, refresh cadence, allowed uses, and known limitations. It should be versioned through [dataset versioning](dataset-versioning.md) and kept separate from training data. Offline evaluation informs release decisions, while [A/B testing](a-b-testing.md) measures live impact.

## Artifact: Evaluation Card

```yaml
evaluation_dataset:
  name: fraud_release_eval
  version: v12
  owner: risk-ml
  source_period: "2026-04-01..2026-06-30"
  label_policy: "chargeback confirmed within 45 days"
  slices:
    - payment_type
    - country
    - new_account
  gates:
    global_auc: ">= 0.89"
    new_account_recall: ">= 0.72"
    p95_latency_ms: "<= 120"
  refresh_policy: "new major version quarterly; patch version for label corrections"
```

The gate should match failure cost. A fraud system may block release on a low-recall slice even when global AUC improves. The experimentation section covers [offline evaluation](../17-experimentation-and-evaluation/offline-evaluation.md) more generally.

## Failure Modes

Evaluation sets go stale when product flows, abuse patterns, or label rules change. They can also leak into model development through repeated tuning. Track every release decision made against a version so [model degradation](model-degradation.md) can compare production labels against the same assumptions.

## References

- [Google Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)
- [Great Expectations documentation](https://docs.greatexpectations.io/docs/core/introduction/try_gx/)

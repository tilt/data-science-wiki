---
title: Golden Datasets
slug: ml-engineering-and-mlops/golden-datasets
description: "Small trusted evaluation sets used as regression and acceptance references."
area: ml-engineering-and-mlops
topics:
  - golden-datasets
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - evaluation-datasets.md
  - dataset-versioning.md
  - ci-cd-for-ml.md
  - human-in-the-loop-systems.md
  - ../17-experimentation-and-evaluation/golden-datasets.md
historical_context: false
last_reviewed: 2026-07-11
---
# Golden Datasets

Golden datasets are small, trusted, versioned examples that serve as acceptance references for model, prompt, retrieval, or pipeline changes. They complement larger [evaluation datasets](evaluation-datasets.md): a golden set is meant to be inspected and defended case by case.

## Mechanism

A golden dataset should include inputs, expected outputs or grading criteria, slice tags, risk labels, source, reviewer, and version. It belongs in [ci-cd-for-ml](ci-cd-for-ml.md) because regressions on known critical cases should block promotion even when aggregate metrics improve.

## Artifact: Golden Record Schema

```yaml
golden_case:
  id: "fraud-gold-0142"
  input_ref: "s3://golden/fraud/0142.json"
  expected:
    decision: manual_review
    min_score: 0.82
    required_reason_codes: [new_device, velocity]
  tags: [new_account, card_not_present, prior_incident_pattern]
  source: "2026-05 incident review"
  reviewer: "risk-ops"
  version: "golden-fraud:v4"
```

The experimentation section has the canonical page on [golden datasets](../17-experimentation-and-evaluation/golden-datasets.md). This MLOps page emphasizes release blocking, ownership, and [dataset versioning](dataset-versioning.md).

## Failure Modes

Golden sets become brittle when expected outputs are overspecified for cases with legitimate ambiguity. They become useless when teams add only easy examples or silently edit expected labels after a model fails. Use [human-in-the-loop systems](human-in-the-loop-systems.md) to review contested cases and create a new version instead of mutating history.

## References

- [Google Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)
- [Great Expectations documentation](https://docs.greatexpectations.io/docs/core/introduction/try_gx/)

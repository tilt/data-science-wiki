---
title: Golden Datasets
slug: experimentation-and-evaluation/golden-datasets
description: Curated evaluation datasets used as stable acceptance references for ML and generative-AI systems.
area: experimentation-and-evaluation
topics:
  - "golden-datasets"
  - "evaluation-datasets"
  - "quality-control"
level: foundational
status: review
page_type: concept
aliases:
  - "Gold datasets"
  - "Reference evaluation sets"
prerequisites:
  - "../02-probability-and-statistics/index.md"
related:
  - "comparing-generative-ai-and-classical-ml-systems.md"
  - "paired-evaluation.md"
historical_context: false
last_reviewed: 2026-07-11
references:
  - "nist-ai-rmf-2023"
---
# Golden Datasets

## Summary

A golden dataset is a curated set of examples, labels, evidence, expected behavior, and risk annotations used to evaluate a system repeatedly. It is not necessarily large; it is trusted, versioned, and representative of important behavior.

## Why it matters

Golden datasets make evaluation reproducible. They help prevent regressions, compare model versions, calibrate human review, and define what "good enough" means for a specific product workflow.

## What to include

- Inputs and expected outputs or acceptable-output criteria.
- Source evidence for factual tasks.
- Risk and severity labels.
- Known hard cases and counterexamples.
- Metadata for slices such as language, domain, customer segment, time period, or source system.
- Ownership, review date, and change history.

## Step-by-step example

For a support chatbot, select real but anonymized questions from common, rare, ambiguous, and high-risk cases. Attach the approved source article for each question. Define acceptable answer criteria, required citations, and refusal criteria when the source is insufficient. Version the dataset and run it before every prompt, retrieval, or model change.

## Maintenance rules

- Add incident-derived examples after production failures.
- Keep a blind holdout set to detect overfitting to the public golden set.
- Retire or update examples when policies, products, or source documents change.
- Review labels with domain experts when the task has material user impact.

## Failure modes

Golden datasets can become stale, overfit, too easy, or unrepresentative. They should be complemented by fresh blind sets, online monitoring, and incident-derived test cases.

## Related topics

- [Paired Evaluation](paired-evaluation.md)
- [Offline Evaluation](offline-evaluation.md)
- [Risk-Weighted Error Taxonomies](risk-weighted-error-taxonomies.md)

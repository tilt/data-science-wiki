---
title: Concept Drift
slug: ml-engineering-and-mlops/concept-drift
description: Concise guide to Concept Drift in ML Engineering and MLOps.
area: ml-engineering-and-mlops
topics:
  - concept-drift
level: advanced
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - index.md
  - ../05-time-series-and-forecasting/concept-drift-in-forecasting.md
historical_context: false
last_reviewed: 2026-07-11
---

## Summary

Concept drift occurs when the relationship between inputs and targets changes after deployment. The same features no longer imply the same label, risk, or outcome.

## Example

A fraud model trained before a new scam pattern may see the same transaction features but a different fraud probability. Input distributions may look similar while the target relationship changes.

## Detection

Concept drift is hard to detect immediately because true labels often arrive late. Use delayed outcome monitoring, champion-challenger evaluation, segment-level performance tracking, and human review of suspicious errors.

## Response

Responses include retraining, updating labels, changing features, adjusting thresholds, adding rules, or redesigning the product workflow. The right response depends on whether the shift is temporary, recurring, or structural.

## Failure modes

Teams often confuse data drift with concept drift. Input shift is easier to observe, but it does not prove the target relationship changed.

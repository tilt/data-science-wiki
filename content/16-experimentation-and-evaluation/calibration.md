---
title: Calibration
slug: experimentation-and-evaluation/calibration
description: Concise guide to Calibration in Experimentation and Evaluation.
area: experimentation-and-evaluation
topics:
  - calibration
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Calibration

## Summary

Calibration evaluation checks whether confidence scores are reliable enough for the decisions built on top of them. A well-calibrated risk score can support thresholds, triage, abstention, and expected-cost decisions.

## Canonical relationship

The canonical modelling concept is [Calibration](../03-classical-machine-learning/calibration.md). This page focuses on evaluation practice: how to measure, report, slice, and monitor calibration.

## Core idea

- Compare predicted probability bands with observed frequencies.
- Report calibration alongside discrimination metrics such as accuracy or AUC.
- Check calibration by segment, time period, and operating threshold.

## Worked example

For a loan-default model, group predictions into deciles. In the 0.2 to 0.3 band, roughly 20 to 30 percent of cases should default. If one region is consistently overconfident, a global calibration score may hide an operational risk for that region.

## Reporting checklist

- Reliability curve or calibration table.
- Brier score or expected calibration error when appropriate.
- Slice-level calibration for important populations.
- Sample sizes per bin so sparse bins are not overinterpreted.
- Calibration drift monitoring after deployment.

## Practical checklist

- State the decision Calibration supports before choosing metrics or tests.
- Define units, slices, uncertainty method, and guardrails before looking at results.
- Inspect examples where the evaluation disagrees with user or domain judgment.

- Define the population, sample, metrics, slices, and minimum meaningful effect.
- Use paired comparisons or randomized experiments where possible.
- Report uncertainty, cost, latency, calibration, coverage, and abstention when relevant.
- Treat severe errors separately from average performance.

## Common failure modes

- Reporting only accuracy when probabilities drive decisions.
- Using too many bins for too little data.
- Calibrating on the same test set used for final reporting.

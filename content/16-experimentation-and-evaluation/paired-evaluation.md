---
title: Paired Evaluation
slug: experimentation-and-evaluation/paired-evaluation
description: Evaluation design that compares systems on the same examples to reduce variance.
area: experimentation-and-evaluation
topics:
  - "paired-evaluation"
  - "statistical-significance"
  - "evaluation"
level: intermediate
status: review
page_type: concept
aliases:
  - "Paired comparisons"
prerequisites:
  - "golden-datasets.md"
related:
  - "comparing-generative-ai-and-classical-ml-systems.md"
  - "online-experiments.md"
historical_context: false
last_reviewed: 2026-07-11
references:
  - "kohavi-tang-xu-2020-trustworthy-online-experiments"
---
# Paired Evaluation

## Summary

Paired evaluation compares two systems on the same examples. This reduces variance because each example acts as its own control.

## Why it matters

In ML and generative-AI evaluation, example difficulty varies heavily. A paired design prevents one system from appearing better merely because it saw easier examples.

## Procedure

1. Freeze an evaluation set.
2. Run each candidate system on every example.
3. Score outputs with the same rubric.
4. Compare per-example deltas.
5. Report aggregate differences and uncertainty.

## Worked example

Suppose two RAG systems answer the same 200 support questions. For each question, grade both answers against the same source evidence. Record a delta: system B better, system A better, tie, or both unacceptable. A paired analysis is stronger than comparing two separate averages because hard questions affect both systems rather than only one sample.

## Statistical view

For numeric scores, compute the difference per example and estimate the mean difference with a confidence interval or bootstrap. For win/loss/tie labels, use a sign test or bootstrap over examples. The important object is the paired difference, not each system's score in isolation.

## Related topics

- [Golden Datasets](golden-datasets.md)
- [Repeated Sampling](repeated-sampling.md)
- [Statistical Significance](statistical-significance.md)

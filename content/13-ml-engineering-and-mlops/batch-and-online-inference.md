---
title: Batch and Online Inference
slug: ml-engineering-and-mlops/batch-and-online-inference
description: Concise guide to Batch and Online Inference in ML Engineering and MLOps.
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
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Batch and Online Inference

## Summary

Batch and online inference differ in when predictions are computed. Batch inference scores many examples on a schedule; online inference scores individual requests at serving time.

## Step-by-step example

A churn model may batch-score all customers nightly, while a fraud model may score each transaction synchronously before approval.

## Common failure modes

- Reusing batch features online when their computation depends on future or slowly refreshed data.
- Ignoring latency, timeout, and fallback behavior for online inference.
- Treating batch scores as fresh after the entity state or business rule has changed.
- Letting batch and online paths implement feature logic differently without parity tests.

---
title: Data Drift
slug: ml-engineering-and-mlops/data-drift
description: Concise guide to Data Drift in ML Engineering and MLOps.
area: ml-engineering-and-mlops
topics:
  - data-drift
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
## Summary

Data drift occurs when production input data differs from the data used for training or validation. It is an early warning signal that model assumptions may no longer match deployment.

## What changes

Drift can affect feature distributions, missing values, category frequencies, text length, image quality, user mix, geography, device type, or upstream measurement logic. Some drift is harmless; some breaks model behavior.

## Example

A support-ticket classifier trained mostly on English tickets may receive a growing share of German tickets after expansion. The model may still return confident labels, but the input population has changed.

## Detection

Compare production features with reference windows using distribution summaries, missingness checks, embedding-distance checks, and segment dashboards. Pair drift monitoring with outcome metrics when labels become available.

## Failure modes

Data drift alerts can be noisy if normal seasonality is not modelled. They can also miss harmful changes when the monitored features are too coarse.

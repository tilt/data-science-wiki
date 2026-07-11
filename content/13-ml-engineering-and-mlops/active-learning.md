---
title: Active Learning
slug: ml-engineering-and-mlops/active-learning
description: Concise guide to Active Learning in ML Engineering and MLOps.
area: ml-engineering-and-mlops
topics:
  - active-learning
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

Active learning selects the most useful unlabeled examples for human annotation. It is valuable when labels are expensive and the model can identify cases where new labels are likely to improve the decision boundary.

## Core idea

Instead of labeling data uniformly at random, active learning runs a loop: train a model, score unlabeled examples, choose uncertain or strategically diverse examples, obtain labels, retrain, and evaluate on a fixed holdout set. The selection rule should match the problem. Uncertainty sampling finds examples near the boundary; diversity sampling prevents a batch of near-duplicates; error-driven sampling focuses on known weak segments.

## Step-by-step example

For document classification, start with 500 random labels. Train a baseline classifier, then select 200 unlabeled documents where the top two class probabilities are close. Remove duplicates, balance by source, label the batch, and retrain. Compare against the same validation set before requesting the next batch.

## Failure modes

Active learning can over-sample ambiguous or low-value cases, amplify annotator bias, and make evaluation look better only on the queried distribution. Keep a random audit sample, track label quality, and avoid using the active-learning pool itself as the only benchmark.

---
title: Random Forests
slug: classical-machine-learning/random-forests
description: Concise guide to Random Forests in Classical Machine Learning.
area: classical-machine-learning
topics:
  - random-forests
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

A random forest averages many decision trees trained on randomized data and feature subsets. The ensemble reduces variance and usually generalizes better than a single deep tree.

## Core idea

Each tree is trained on a bootstrap sample of the data. At each split, the tree considers only a random subset of features. The final prediction averages regression outputs or votes across classification trees.

## Example

For churn prediction, one tree may emphasize usage history, another support interactions, and another account tenure. Averaging makes the model less dependent on any one unstable split.

## Practical considerations

Random forests are strong tabular baselines, handle nonlinearities, and need less tuning than boosting. They can be slower and less interpretable than a single tree, though feature importance and partial dependence can help diagnosis.

## Failure modes

Forests can still overfit noisy labels, struggle with extrapolation, and produce biased feature importance when features differ in cardinality or correlation.

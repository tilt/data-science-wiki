---
title: Decision Trees
slug: classical-machine-learning/decision-trees
description: Concise guide to Decision Trees in Classical Machine Learning.
area: classical-machine-learning
topics:
  - decision-trees
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

A decision tree predicts by recursively splitting feature space into regions with similar target values. It is interpretable, handles nonlinear rules, and forms the basis for many tree ensembles.

## Core idea

At each node, the tree chooses a split that improves purity or reduces error. For classification, common criteria include Gini impurity and entropy. For regression, splits often reduce squared error.

## Example

A churn tree might first split on recent usage, then on unresolved support tickets, then on account age. A path from root to leaf becomes a human-readable rule, such as low usage plus many tickets implies high churn risk.

## Practical considerations

Trees need controls such as maximum depth, minimum leaf size, pruning, or validation-based stopping. A deep tree can memorize training data and behave unstably under small data changes.

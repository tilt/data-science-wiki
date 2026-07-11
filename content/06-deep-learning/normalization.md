---
title: Normalization
slug: deep-learning/normalization
description: Concise guide to Normalization in Deep Learning.
area: deep-learning
topics:
  - normalization
level: intermediate
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
# Normalization

## Summary

Normalization layers stabilize training by controlling the scale and distribution of intermediate activations. Batch normalization, layer normalization, and related methods use different statistics.

## Mechanism

Most normalization layers compute a mean and variance over a chosen set of axes, standardize activations, then learn a scale and shift:

$$
\hat{x}=\frac{x-\mu}{\sqrt{\sigma^2+\epsilon}},
$$

$$
y=\gamma \hat{x}+\beta.
$$

Batch normalization usually computes statistics across the batch and spatial positions for each channel. Layer normalization computes statistics within each example across features. That difference matters: batch normalization depends on batch composition and running statistics, while layer normalization works naturally for variable-length sequence models and small batches.

## Step-by-step example

Layer normalization is common in transformers because it normalizes within each example and does not depend on batch statistics.

## Common failure modes

- Using batch normalization with tiny or non-representative batches and trusting unstable batch statistics.
- Forgetting to switch batch-normalized models between training and evaluation behavior.
- Treating normalization as interchangeable across CNNs, transformers, and recurrent models.

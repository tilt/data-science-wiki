---
title: Cross Entropy
slug: mathematical-foundations/cross-entropy
description: Concise guide to Cross Entropy in Mathematical Foundations.
area: mathematical-foundations
topics:
  - cross-entropy
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

Cross-entropy measures how well a predicted probability distribution matches observed outcomes. In classification and language modelling, minimizing cross-entropy is equivalent to assigning high probability to the correct targets.

## Definition

For a true distribution $p$ and predicted distribution $q$,

$$
H(p,q) = -\sum_x p(x)\log q(x).
$$

For one-hot classification targets, this reduces to the negative log probability assigned to the correct class.

## Example

If the correct class is "cat" and a model assigns probability 0.8 to cat, the loss is lower than if it assigns 0.2. The model is rewarded not only for choosing the right class, but for being confidently right in calibrated probability terms.

## ML use

Cross-entropy is the standard loss for many classifiers and language models. It connects maximum likelihood, softmax outputs, and probabilistic interpretation of predictions.

## Caveats

Cross-entropy can heavily penalize confident errors and can encourage overconfidence if the model is overfit. Label noise and class imbalance may require weighting, smoothing, or better data curation.

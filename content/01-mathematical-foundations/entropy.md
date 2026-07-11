---
title: Entropy
slug: mathematical-foundations/entropy
description: Concise guide to Entropy in Mathematical Foundations.
area: mathematical-foundations
topics:
  - entropy
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

Entropy measures uncertainty or average surprise in a probability distribution. A distribution concentrated on one outcome has low entropy; a spread-out distribution has higher entropy.

## Definition

For a discrete distribution $p$,

$$
H(p) = -\sum_x p(x)\log p(x).
$$

The log base determines the unit: base 2 gives bits, natural log gives nats.

## Example

A fair coin has higher entropy than a coin that lands heads 99 percent of the time because the fair coin is harder to predict. A classifier output of `[0.5, 0.5]` is more uncertain than `[0.99, 0.01]`.

## ML use

Entropy appears in decision trees, active learning, reinforcement learning exploration, language modelling, compression, and uncertainty analysis. High predictive entropy can indicate uncertainty, ambiguity, or out-of-distribution inputs.

## Caveats

Entropy summarizes uncertainty in a distribution, but it does not tell whether the distribution is correct. A model can be confidently wrong with low entropy.

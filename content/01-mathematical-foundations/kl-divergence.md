---
title: KL Divergence
slug: mathematical-foundations/kl-divergence
description: Concise guide to KL Divergence in Mathematical Foundations.
area: mathematical-foundations
topics:
  - kl-divergence
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

KL divergence measures how much one probability distribution differs from another. It is often interpreted as the extra coding cost incurred when using an approximate distribution instead of the true one.

## Definition

For distributions $p$ and $q$,

$$
D_{KL}(p\|q)=\sum_x p(x)\log\frac{p(x)}{q(x)}.
$$

It is non-negative, but it is not symmetric: usually $D_{KL}(p\|q) \ne D_{KL}(q\|p)$.

## Example

If the true distribution gives meaningful probability to rare events but the approximate distribution assigns almost none, KL divergence can be very large. This matters when approximating posterior distributions or training probabilistic models.

## ML use

KL divergence appears in variational inference, distillation, regularization, reinforcement learning, and distribution-shift analysis. Cross-entropy can be decomposed into entropy plus KL divergence.

## Caveats

KL divergence can be infinite when $q$ assigns zero probability to an event that $p$ considers possible. Its asymmetry also means the direction of comparison changes the behavior.

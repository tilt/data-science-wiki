---
title: Probability Spaces
slug: probability-and-statistics/probability-spaces
description: Concise guide to Probability Spaces in Probability and Statistics.
area: probability-and-statistics
topics:
  - probability-spaces
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

A probability space is the formal object behind probabilistic modelling. It defines possible outcomes, which events can be assigned probabilities, and how probability mass or density is distributed.

## Components

A probability space has three parts:

- sample space $\Omega$: all possible outcomes;
- event set $\mathcal{F}$: subsets of outcomes that can be assigned probabilities;
- probability measure $P$: a function that assigns probabilities to events.

The measure satisfies $P(\Omega)=1$, non-negativity, and additivity for disjoint events.

## Example

For a coin flip, $\Omega=\{H,T\}$. Events include $\{H\}$, $\{T\}$, $\{H,T\}$, and the empty set. A fair coin assigns $P(H)=0.5$ and $P(T)=0.5$.

For continuous outcomes, such as a response time, individual exact values often have probability zero, but intervals such as 100-200 ms can have positive probability.

## Why it matters

Probability spaces make assumptions explicit. They clarify what is random, what outcomes are possible, and whether operations such as conditioning or expectation are well-defined.

## Failure modes

Informal probability statements become confusing when the sample space changes mid-argument or when events are conditioned on impossible or undefined cases.

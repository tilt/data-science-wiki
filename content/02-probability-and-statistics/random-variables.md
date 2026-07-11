---
title: Random Variables
slug: probability-and-statistics/random-variables
description: Concise guide to Random Variables in Probability and Statistics.
area: probability-and-statistics
topics:
  - random-variables
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

A random variable maps uncertain outcomes to numeric values. It lets probability theory talk about measurements, labels, counts, losses, and model outputs.

## Core idea

A random variable is not the observed value itself; it is the function that produces a value from a random outcome. Once a random variable is defined, it has a distribution, expectation, variance, and relationships with other random variables.

## Examples

In a customer-support system:

- $X$ could be the number of tickets arriving in an hour;
- $Y$ could be the waiting time until first response;
- $Z$ could be a binary indicator that a ticket is escalated.

$X$ is discrete, $Y$ is continuous, and $Z$ is Bernoulli.

## Why it matters

ML datasets can be viewed as observations of random variables. Features, labels, losses, and predictions are all quantities that vary across sampled examples. This view helps reason about sampling error, distribution shift, and generalization.

## Failure modes

Confusion arises when observed samples are treated as the full distribution, or when variables measured under one population are assumed to behave the same in another population.

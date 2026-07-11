---
title: Random Walks
slug: probability-and-statistics/random-walks
description: Concise guide to Random Walks in Probability and Statistics.
area: probability-and-statistics
topics:
  - random-walks
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

A random walk is a process formed by accumulating random steps. It is a simple model for paths, diffusion, financial price intuition, and stochastic movement through state spaces.

## Core idea

At each time step, the process moves by a random increment. In one dimension, a simple symmetric random walk moves plus one or minus one with equal probability. The current value is the sum of previous steps.

## Example

If a score starts at zero and each event adds +1 for success or -1 for failure, the score follows a random-walk-like path. Individual paths can wander far even when the expected step is zero.

## Practical use

Random walks help explain variance growth over time, hitting times, diffusion, Markov chains, and some baseline time-series models. They also appear in graph algorithms through random walks over nodes.

## Failure modes

A random walk is not a good forecasting model for every drifting series. Real systems may have mean reversion, seasonality, structural breaks, or bounded states.

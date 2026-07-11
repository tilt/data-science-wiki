---
title: Markov Renewal Processes
slug: probability-and-statistics/markov-renewal-processes
description: Concise guide to Markov Renewal Processes in Probability and Statistics.
area: probability-and-statistics
topics:
  - markov-renewal-processes
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

A Markov renewal process extends a Markov chain by modelling both the next state and the time until the transition. It is useful when waiting times matter as much as state changes.

## Core idea

A Markov chain records which state comes next. A Markov renewal process also records the distribution of holding times between transitions. This separates transition structure from event timing.

## Example

In predictive maintenance, a machine may move from healthy to degraded to failed. The time spent in each state is critical: two machines may follow the same state order but have very different failure risk depending on how long they remain degraded.

## Practical use

These processes appear in reliability engineering, survival-style event modelling, healthcare pathways, queueing systems, and customer lifecycle modelling. They are useful when the system has discrete states but irregular transition times.

## Failure modes

The model becomes harder to estimate when states are rare, holding times are censored, or the chosen state definition hides important covariates.

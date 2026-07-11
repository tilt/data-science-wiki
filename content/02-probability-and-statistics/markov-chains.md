---
title: Markov Chains
slug: probability-and-statistics/markov-chains
description: Concise guide to Markov Chains in Probability and Statistics.
area: probability-and-statistics
topics:
  - markov-chains
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

A Markov chain models a process that moves between states where the next-state distribution depends only on the current state. It is a compact model for sequential systems with limited memory.

## Core idea

The Markov property says the future is conditionally independent of the past given the present state. A transition matrix stores the probability of moving from each state to each other state.

## Example

A customer can be in states `new`, `active`, `at risk`, or `churned`. A Markov chain estimates the probability of moving from active to at risk next month, or from at risk back to active after an intervention.

## Practical use

Markov chains appear in queueing, reliability, ranking algorithms, customer lifecycle modelling, reinforcement learning foundations, and simulation. They are useful when states are interpretable and transition probabilities can be estimated.

## Failure modes

The memoryless assumption can be too strong. If transition probabilities depend on how long a user has been in a state or on earlier history, a simple Markov chain may mislead.

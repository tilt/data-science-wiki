---
title: Renewal Theory
slug: probability-and-statistics/renewal-theory
description: Concise guide to Renewal Theory in Probability and Statistics.
area: probability-and-statistics
topics:
  - renewal-theory
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

Renewal theory studies repeated events separated by random waiting times. It is useful when the key question is how often events recur and how long until the next occurrence.

## Core idea

A renewal process starts over after each event. The waiting times between events are usually assumed independent and identically distributed. From those waiting times, analysts study event counts, long-run rates, and residual waiting time.

## Example

A component is replaced whenever it fails. If each replacement returns the component to a fresh state, failures form a renewal process. The expected time between failures determines long-run maintenance workload.

## Practical use

Renewal ideas appear in reliability, queueing, customer repeat-purchase modelling, incident recurrence, and maintenance planning. They are especially helpful when event timing is irregular rather than clocked.

## Failure modes

The renewal assumption fails when events change future risk, when external covariates shift rates, or when repeated events are dependent. In those cases, survival or state-space models may fit better.

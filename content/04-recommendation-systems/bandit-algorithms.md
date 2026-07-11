---
title: Bandit Algorithms
slug: recommendation-systems/bandit-algorithms
description: Concise guide to Bandit Algorithms in Recommendation Systems and
  Personalization.
area: recommendation-systems
topics:
  - bandit-algorithms
level: intermediate
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Bandit Algorithms

## Summary

Bandit algorithms choose actions while learning from feedback. In recommendation systems they manage the trade-off between exploiting items that already look good and exploring items whose value is uncertain.

## Step-by-step example

A news app may reserve a small fraction of impressions for articles with uncertain engagement. If an article performs well, the policy increases exposure; if not, it backs off.

## Common failure modes

- Optimizing Bandit Algorithms on historical interactions without correcting for exposure and position bias.
- Treating missing interactions as negative feedback when they may mean the user never saw the item.
- Improving average ranking metrics while harming cold-start users, long-tail items, diversity, or business guardrails.

- Optimizing a single offline metric while ignoring exposure, freshness, diversity, or cold start.
- Failing to log enough context to reproduce why an item was recommended.

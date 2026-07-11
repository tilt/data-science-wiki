---
title: Multi Armed Bandits
slug: recommendation-systems/multi-armed-bandits
description: Concise guide to Multi Armed Bandits in Recommendation Systems and
  Personalization.
area: recommendation-systems
topics:
  - multi-armed-bandits
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
# Multi Armed Bandits

## Summary

A multi-armed bandit is a learning setup where a system repeatedly chooses among actions and observes rewards only for chosen actions. It is the simplest exploration framework.

## Step-by-step example

A site choosing among three homepage headlines observes clicks only for the headline it showed. A bandit policy balances showing the current best headline with testing uncertain ones.

## Common failure modes

- Optimizing Multi Armed Bandits on historical interactions without correcting for exposure and position bias.
- Treating missing interactions as negative feedback when they may mean the user never saw the item.
- Improving average ranking metrics while harming cold-start users, long-tail items, diversity, or business guardrails.

- Optimizing a single offline metric while ignoring exposure, freshness, diversity, or cold start.
- Failing to log enough context to reproduce why an item was recommended.

---
title: Contextual Bandits
slug: recommendation-systems/contextual-bandits
description: Concise guide to Contextual Bandits in Recommendation Systems and
  Personalization.
area: recommendation-systems
topics:
  - contextual-bandits
level: advanced
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
# Contextual Bandits

## Summary

Contextual bandits choose actions using both feedback uncertainty and context such as user segment, device, time, or item features. They learn which action works for which situation.

## Step-by-step example

A homepage can choose between sports, finance, and local-news modules using context such as location and reading history, then update the policy from clicks or dwell time.

## Common failure modes

- Optimizing Contextual Bandits on historical interactions without correcting for exposure and position bias.
- Treating missing interactions as negative feedback when they may mean the user never saw the item.
- Improving average ranking metrics while harming cold-start users, long-tail items, diversity, or business guardrails.

- Optimizing a single offline metric while ignoring exposure, freshness, diversity, or cold start.
- Failing to log enough context to reproduce why an item was recommended.

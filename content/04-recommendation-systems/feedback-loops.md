---
title: Feedback Loops
slug: recommendation-systems/feedback-loops
description: Concise guide to Feedback Loops in Recommendation Systems and Personalization.
area: recommendation-systems
topics:
  - feedback-loops
level: intermediate
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
# Feedback Loops

## Summary

Feedback loops occur when recommendations shape the future data used to train the recommender. The system learns from behavior that it partly caused.

## Step-by-step example

If the system shows popular items more often, those items receive more clicks, which can make them look even better in the next training cycle.

## Common failure modes

- Optimizing Feedback Loops on historical interactions without correcting for exposure and position bias.
- Treating missing interactions as negative feedback when they may mean the user never saw the item.
- Improving average ranking metrics while harming cold-start users, long-tail items, diversity, or business guardrails.

- Optimizing a single offline metric while ignoring exposure, freshness, diversity, or cold start.
- Failing to log enough context to reproduce why an item was recommended.

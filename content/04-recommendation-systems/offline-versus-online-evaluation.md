---
title: Offline Versus Online Evaluation
slug: recommendation-systems/offline-versus-online-evaluation
description: Concise guide to Offline Versus Online Evaluation in Recommendation
  Systems and Personalization.
area: recommendation-systems
topics:
  - offline-versus-online-evaluation
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
# Offline Versus Online Evaluation

## Summary

Offline evaluation tests recommender changes on historical data; online evaluation measures behavior under real exposure. Both are needed because recommendations change what users see.

## Step-by-step example

A model may improve held-out click prediction but reduce satisfaction online by recommending repetitive or clickbait items.

## Common failure modes

- Optimizing Offline Versus Online Evaluation on historical interactions without correcting for exposure and position bias.
- Treating missing interactions as negative feedback when they may mean the user never saw the item.
- Improving average ranking metrics while harming cold-start users, long-tail items, diversity, or business guardrails.

- Optimizing a single offline metric while ignoring exposure, freshness, diversity, or cold start.
- Failing to log enough context to reproduce why an item was recommended.

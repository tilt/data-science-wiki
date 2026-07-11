---
title: Item Based Collaborative Filtering
slug: recommendation-systems/item-based-collaborative-filtering
description: Concise guide to Item Based Collaborative Filtering in
  Recommendation Systems and Personalization.
area: recommendation-systems
topics:
  - item-based-collaborative-filtering
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
# Item Based Collaborative Filtering

## Summary

Item-based collaborative filtering recommends items similar to items a user interacted with. Similarity is computed from shared users, co-occurrence, or learned item representations.

## Step-by-step example

If many users who bought camera bodies also bought a certain lens, that lens becomes a candidate for new camera buyers.

## Common failure modes

- Optimizing Item Based Collaborative Filtering on historical interactions without correcting for exposure and position bias.
- Treating missing interactions as negative feedback when they may mean the user never saw the item.
- Improving average ranking metrics while harming cold-start users, long-tail items, diversity, or business guardrails.

- Optimizing a single offline metric while ignoring exposure, freshness, diversity, or cold start.
- Failing to log enough context to reproduce why an item was recommended.

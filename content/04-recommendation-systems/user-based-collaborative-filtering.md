---
title: User Based Collaborative Filtering
slug: recommendation-systems/user-based-collaborative-filtering
description: Concise guide to User Based Collaborative Filtering in
  Recommendation Systems and Personalization.
area: recommendation-systems
topics:
  - user-based-collaborative-filtering
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
# User Based Collaborative Filtering

## Summary

User-based collaborative filtering recommends items liked by users with similar histories. It is intuitive but can struggle at scale and with sparse users.

## Step-by-step example

If Alice and Ben liked many of the same books, books Ben liked but Alice has not seen become candidates for Alice.

## Common failure modes

- Optimizing User Based Collaborative Filtering on historical interactions without correcting for exposure and position bias.
- Treating missing interactions as negative feedback when they may mean the user never saw the item.
- Improving average ranking metrics while harming cold-start users, long-tail items, diversity, or business guardrails.

- Optimizing a single offline metric while ignoring exposure, freshness, diversity, or cold start.
- Failing to log enough context to reproduce why an item was recommended.

---
title: Ranking
slug: recommendation-systems/ranking
description: Concise guide to Ranking in Recommendation Systems and Personalization.
area: recommendation-systems
topics:
  - ranking
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
# Ranking

## Summary

Ranking orders candidate items for a user or context. It usually combines predicted relevance with freshness, diversity, eligibility, business rules, and risk constraints.

## Step-by-step example

A feed ranker may score candidate posts by expected engagement, downrank stale items, enforce blocked-content rules, and diversify authors.

## Common failure modes

- Optimizing Ranking on historical interactions without correcting for exposure and position bias.
- Treating missing interactions as negative feedback when they may mean the user never saw the item.
- Improving average ranking metrics while harming cold-start users, long-tail items, diversity, or business guardrails.

- Optimizing a single offline metric while ignoring exposure, freshness, diversity, or cold start.
- Failing to log enough context to reproduce why an item was recommended.

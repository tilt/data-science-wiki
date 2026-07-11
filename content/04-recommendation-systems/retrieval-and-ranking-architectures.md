---
title: Retrieval and Ranking Architectures
slug: recommendation-systems/retrieval-and-ranking-architectures
description: Concise guide to Retrieval and Ranking Architectures in
  Recommendation Systems and Personalization.
area: recommendation-systems
topics:
  - retrieval-and-ranking-architectures
level: advanced
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Retrieval and Ranking Architectures

## Summary

Retrieval-and-ranking architecture splits recommendation into fast broad candidate retrieval and slower precise ranking. This makes large catalogues tractable.

## Step-by-step example

An ecommerce system may retrieve thousands of candidate products from collaborative, content, and trending sources, then rank hundreds with a richer model.

## Common failure modes

- Optimizing Retrieval and Ranking Architectures on historical interactions without correcting for exposure and position bias.
- Treating missing interactions as negative feedback when they may mean the user never saw the item.
- Improving average ranking metrics while harming cold-start users, long-tail items, diversity, or business guardrails.

- Optimizing a single offline metric while ignoring exposure, freshness, diversity, or cold start.
- Failing to log enough context to reproduce why an item was recommended.

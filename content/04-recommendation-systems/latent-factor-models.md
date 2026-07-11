---
title: Latent Factor Models
slug: recommendation-systems/latent-factor-models
description: Concise guide to Latent Factor Models in Recommendation Systems and
  Personalization.
area: recommendation-systems
topics:
  - latent-factor-models
level: intermediate
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Latent Factor Models

## Summary

Latent factor models represent users and items with learned vectors whose dimensions capture hidden preference structure. The dimensions are not manually named but can reflect genres, price sensitivity, or style.

## Step-by-step example

In a movie recommender, a user vector and item vector may align on latent action or comedy factors. Their dot product estimates preference.

## Common failure modes

- Optimizing Latent Factor Models on historical interactions without correcting for exposure and position bias.
- Treating missing interactions as negative feedback when they may mean the user never saw the item.
- Improving average ranking metrics while harming cold-start users, long-tail items, diversity, or business guardrails.

- Optimizing a single offline metric while ignoring exposure, freshness, diversity, or cold start.
- Failing to log enough context to reproduce why an item was recommended.

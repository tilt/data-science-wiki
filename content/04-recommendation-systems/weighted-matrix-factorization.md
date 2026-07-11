---
title: Weighted Matrix Factorization
slug: recommendation-systems/weighted-matrix-factorization
description: Concise guide to Weighted Matrix Factorization in Recommendation
  Systems and Personalization.
area: recommendation-systems
topics:
  - weighted-matrix-factorization
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
# Weighted Matrix Factorization

## Summary

Weighted matrix factorization learns user and item factors while giving different confidence to different observations. It is especially useful for implicit feedback.

## Step-by-step example

A purchase can receive higher confidence than a page view, while an unobserved user-item pair receives low confidence rather than being treated as a strong negative.

## Common failure modes

- Optimizing Weighted Matrix Factorization on historical interactions without correcting for exposure and position bias.
- Treating missing interactions as negative feedback when they may mean the user never saw the item.
- Improving average ranking metrics while harming cold-start users, long-tail items, diversity, or business guardrails.

- Optimizing a single offline metric while ignoring exposure, freshness, diversity, or cold start.
- Failing to log enough context to reproduce why an item was recommended.

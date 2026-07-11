---
title: Candidate Generation
slug: recommendation-systems/candidate-generation
description: Concise guide to Candidate Generation in Recommendation Systems and
  Personalization.
area: recommendation-systems
topics:
  - candidate-generation
level: intermediate
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
# Candidate Generation

## Summary

Candidate generation is the first retrieval stage of a recommender. It quickly narrows a large catalogue to a smaller set of plausible items that later ranking models can score more carefully.

## Step-by-step example

A streaming service may generate candidates from similar users, similar items, trending content, new releases, and continue-watching history, then merge and deduplicate them before ranking.

## Common failure modes

- Optimizing Candidate Generation on historical interactions without correcting for exposure and position bias.
- Treating missing interactions as negative feedback when they may mean the user never saw the item.
- Improving average ranking metrics while harming cold-start users, long-tail items, diversity, or business guardrails.

- Optimizing a single offline metric while ignoring exposure, freshness, diversity, or cold start.
- Failing to log enough context to reproduce why an item was recommended.

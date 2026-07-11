---
title: Collaborative Filtering
slug: recommendation-systems/collaborative-filtering
description: Collaborative Filtering overview and practical notes.
area: recommendation-systems
topics:
  - "collaborative-filtering"
  - "personalization"
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites: []
related: []
historical_context: false
last_reviewed: 2026-07-10
---
# Collaborative Filtering

## Summary

Collaborative filtering recommends items from patterns of user-item interaction rather than from item content alone. The core assumption is that behavior reveals useful similarity: users with similar histories may like similar items, and items consumed by similar users may be substitutes or complements.

## Main families

- User-based nearest-neighbor methods compare users.
- Item-based nearest-neighbor methods compare items.
- [Matrix factorization](matrix-factorization.md) learns lower-dimensional user and item representations.
- Hybrid recommenders combine interaction, content, context, and business constraints.

## Step-by-step example

Imagine three users and four films. Alice and Ben both watched two science-fiction films; Ben also watched a third. A user-based method recommends Ben's third film to Alice because their histories overlap. An item-based method notices that viewers of the first science-fiction film often watch the third. A matrix-factorization method learns latent factors such as "science-fiction preference" and scores Alice against all candidate films.

In a real system, this example becomes a pipeline:

1. Collect interactions and timestamps.
2. Decide which events count as positive, negative, or unknown.
3. Train a nearest-neighbor, factorization, or sequence model.
4. Generate candidates quickly.
5. Rerank with freshness, diversity, and business constraints.
6. Measure offline quality and online impact.

## Related methods

- [User-based collaborative filtering](user-based-collaborative-filtering.md)
- [Item-based collaborative filtering](item-based-collaborative-filtering.md)
- [Hybrid recommenders](hybrid-recommenders.md)

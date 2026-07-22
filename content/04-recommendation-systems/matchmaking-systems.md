---
title: Matchmaking Systems
slug: recommendation-systems/matchmaking-systems
description: "Recommendation systems where both sides must prefer the match."
area: recommendation-systems
topics:
  - matchmaking-systems
level: intermediate
status: complete
page_type: system-design
aliases: []
prerequisites:
  - recommendation-system-overview.md
related:
  - ranking.md
  - candidate-generation.md
  - diversity-novelty-coverage-serendipity.md
  - feedback-loops.md
  - contextual-bandits.md
historical_context: false
last_reviewed: 2026-07-22
---

# Matchmaking Systems

Matchmaking systems recommend pairs where both sides matter: dating, hiring, mentoring, marketplaces, or team formation. Unlike one-sided [ranking](ranking.md), a high score from side A to side B is insufficient if side B would reject or be overloaded.

## Reciprocal scoring

A simple reciprocal score combines directional preferences:

$$
s(a,b)=\sqrt{s_{A\to B}(a,b)\,s_{B\to A}(b,a)}.
$$

The geometric mean penalizes one-sided interest. A serving system still uses [candidate generation](candidate-generation.md), eligibility rules, and list-quality controls such as [diversity](diversity-novelty-coverage-serendipity.md).

## Worked example

Suppose two people on side A are being matched to three people on side B. Directional scores alone would overvalue one-sided interest, so the reciprocal score uses the geometric mean:

| Pair  | $s_{A\to B}$ | $s_{B\to A}$ | $\sqrt{s_{A\to B}s_{B\to A}}$ | Interpretation                   |
| ----- | -----------: | -----------: | ----------------------------: | -------------------------------- |
| A0-B0 |         0.90 |         0.70 |                         0.794 | Strong mutual match.             |
| A0-B1 |         0.40 |         0.60 |                         0.490 | Moderate from both sides.        |
| A0-B2 |         0.20 |         0.20 |                         0.200 | Weak from both sides.            |
| A1-B0 |         0.30 |         0.50 |                         0.387 | One side is not very interested. |
| A1-B1 |         0.80 |         0.90 |                         0.849 | Best reciprocal match.           |
| A1-B2 |         0.60 |         0.80 |                         0.693 | Good but not top.                |

Pair A1-B1 wins because both sides score each other highly. A one-sided recommender might over-contact the same popular candidate and create a [feedback loop](feedback-loops.md).

## Caveats

Capacity constraints, fairness, safety, and strategic behavior are central. Optimizing total matches can overload high-demand participants or reduce diversity. Online experiments need marketplace-level metrics because one user's recommendation can remove an opportunity from another user.

## References

- [Adomavicius and Tuzhilin, 2005, Toward the Next Generation of Recommender Systems](https://doi.org/10.1109/TKDE.2005.99)
- [Li et al., 2010, A Contextual-Bandit Approach to Personalized News Article Recommendation](https://arxiv.org/abs/1003.0146)

> [!nav]
> **Section** — [Recommendation Systems and Personalization](index.md)
>
> [← Contextual Bandits](contextual-bandits.md) [Image-Based Recommendation →](image-based-recommendation.md)

---
title: User-Based Collaborative Filtering
slug: recommendation-systems/user-based-collaborative-filtering
description: "Nearest-neighbor recommendation from users with similar interaction vectors."
area: recommendation-systems
topics:
  - user-based-collaborative-filtering
level: intermediate
status: complete
page_type: algorithm
aliases: []
prerequisites:
  - collaborative-filtering.md
related:
  - collaborative-filtering.md
  - item-based-collaborative-filtering.md
  - matrix-factorization.md
  - utility-and-interaction-matrices.md
  - cold-start-problem.md
historical_context: false
last_reviewed: 2026-07-22
---

# User-Based Collaborative Filtering

User-based collaborative filtering finds users whose rows in the [utility matrix](utility-and-interaction-matrices.md) resemble the target user's row, then recommends what those neighbors liked. It is the most literal form of [collaborative filtering](collaborative-filtering.md): "people with histories like yours also liked this."

## User-user prediction

With similarity $w_{uv}$, a rating-style prediction is

$$
\hat r_{ui}=\bar r_u+\frac{\sum_{v\in N(u)}w_{uv}(r_{vi}-\bar r_v)}{\sum_{v\in N(u)}\lvert w_{uv}\rvert}.
$$

For binary interactions, the numerator is often just a weighted sum of neighbor item indicators. [Item-based collaborative filtering](item-based-collaborative-filtering.md) flips the similarity computation to columns.

## Worked example

For target user U0 with ratings $(5,4,0,0)$, cosine similarity compares U0's rating vector with each other user's vector:

| User | Ratings     | Similarity to U0 | Contribution to unseen items                  |
| ---- | ----------- | ---------------: | --------------------------------------------- |
| U0   | $(5,4,0,0)$ |            1.000 | Target user; already-seen items are filtered. |
| U1   | $(4,5,1,0)$ |            0.964 | Strong neighbor; contributes to item 2.       |
| U2   | $(0,1,5,4)$ |            0.096 | Weak neighbor; contributes little.            |
| U3   | $(0,0,4,5)$ |            0.000 | No overlap with U0's rated items.             |

After filtering items 0 and 1, item 2 receives the strongest neighbor-weighted support because the nearest user rated it. [Matrix factorization](matrix-factorization.md) can be viewed as replacing this local neighbor lookup with a global low-rank model.

## Caveats

User neighborhoods are unstable when users have few interactions or rapidly changing tastes. Computing user-user similarities is expensive in systems with many users. New users need onboarding, [content-based recommendation](content-based-recommendation.md), or exploration before neighbor scores are meaningful.

## References

- [scikit-learn documentation: cosine_similarity](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html)
- [Adomavicius and Tuzhilin, 2005, Toward the Next Generation of Recommender Systems](https://doi.org/10.1109/TKDE.2005.99)

> [!nav]
> **Section** — [Recommendation Systems and Personalization](index.md)
>
> [← Collaborative Filtering](collaborative-filtering.md) [Item-Based Collaborative Filtering →](item-based-collaborative-filtering.md)

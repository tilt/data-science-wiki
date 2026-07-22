---
title: Content-Based Recommendation
slug: recommendation-systems/content-based-recommendation
description: "Recommendation from item attributes and user profiles rather than co-behavior alone."
area: recommendation-systems
topics:
  - content-based-recommendation
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - utility-and-interaction-matrices.md
related:
  - collaborative-filtering.md
  - hybrid-recommenders.md
  - cold-start-problem.md
  - content-based-image-retrieval.md
  - ../12-information-retrieval-and-search/tf-idf.md
historical_context: false
last_reviewed: 2026-07-22
---

# Content-Based Recommendation

Content-based recommendation scores items from their attributes: text, tags, categories, prices, image embeddings, or metadata. It is useful when [collaborative filtering](collaborative-filtering.md) is sparse, especially for [cold-start](cold-start-problem.md) items that have content but no interactions.

## Profiles from item features

If $x_i$ is an item feature vector and $I_u^+$ are items the user liked, a simple user profile is

$$
p_u=\frac{1}{\lvert I_u^+\rvert}\sum_{i\in I_u^+}x_i,
$$

with score

$$
s(u,j)=\frac{p_u^\top x_j}{\lVert p_u\rVert\lVert x_j\rVert}.
$$

The feature vector might be [TF-IDF](../12-information-retrieval-and-search/tf-idf.md), a learned embedding, or structured metadata.

## Worked example

If a user liked items with feature vectors $(1,1,0,0)$ and $(1,0,1,0)$, the profile is their average:

$$
p_u=(1,0.5,0.5,0).
$$

| Item | Feature vector | Already liked? | Cosine to profile | Interpretation                      |
| ---- | -------------- | -------------- | ----------------: | ----------------------------------- |
| 0    | $(1,1,0,0)$    | yes            |          filtered | Used to build the profile.          |
| 1    | $(1,0,1,0)$    | yes            |          filtered | Used to build the profile.          |
| 2    | $(0,0,1,1)$    | no             |             0.289 | Shares one profile feature.         |
| 3    | $(0,1,0,1)$    | no             |             0.289 | Shares a different profile feature. |

Items 2 and 3 tie because each overlaps with half of the learned profile. [Hybrid recommenders](hybrid-recommenders.md) combine this with behavioral signals when both are available.

## Caveats

Content recommenders can overspecialize because they look for more of what the profile already contains. Feature quality matters: weak tags or biased embeddings produce weak recommendations. Content similarity also does not prove user intent; final systems still need [ranking](ranking.md), diversity, and online validation.

## References

- [scikit-learn documentation: cosine_similarity](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html)
- [Adomavicius and Tuzhilin, 2005, Toward the Next Generation of Recommender Systems](https://doi.org/10.1109/TKDE.2005.99)

> [!nav]
> **Section** — [Recommendation Systems and Personalization](index.md)
>
> [← Explicit Versus Implicit Feedback](explicit-versus-implicit-feedback.md) [Collaborative Filtering →](collaborative-filtering.md)

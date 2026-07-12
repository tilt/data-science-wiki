---
title: Content-Based Recommendation
slug: recommendation-systems/content-based-recommendation
description: "Recommendation from item attributes and user profiles rather than co-behavior alone."
area: recommendation-systems
topics:
  - content-based-recommendation
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - utility-and-interaction-matrices.md
related:
  - collaborative-filtering.md
  - hybrid-recommenders.md
  - cold-start-problem.md
  - content-based-image-retrieval.md
  - ../11-information-retrieval-and-search/tf-idf.md
historical_context: false
last_reviewed: 2026-07-11
---
# Content-Based Recommendation

Content-based recommendation scores items from their attributes: text, tags, categories, prices, image embeddings, or metadata. It is useful when [collaborative filtering](collaborative-filtering.md) is sparse, especially for [cold-start](cold-start-problem.md) items that have content but no interactions.

## Defining math

If $x_i$ is an item feature vector and $I_u^+$ are items the user liked, a simple user profile is

$$
p_u=\frac{1}{\lvert I_u^+\rvert}\sum_{i\in I_u^+}x_i,
$$

with score

$$
s(u,j)=\frac{p_u^\top x_j}{\lVert p_u\rVert\lVert x_j\rVert}.
$$

The feature vector might be [TF-IDF](../11-information-retrieval-and-search/tf-idf.md), a learned embedding, or structured metadata.

## Worked example

```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
items = np.array([[1,1,0,0], [1,0,1,0], [0,0,1,1], [0,1,0,1]], dtype=float)
liked = [0, 1]
profile = items[liked].mean(axis=0)
scores = cosine_similarity([profile], items)[0]
scores[liked] = -1
print("profile", np.round(profile, 2).tolist())
print("scores", np.round(scores, 3).tolist())
print("top_item", int(np.argmax(scores)))
```

Observed output:

```text
profile [1.0, 0.5, 0.5, 0.0]
scores [-1.0, -1.0, 0.289, 0.289]
top_item 2
```

The profile averages the two liked items and retrieves a partially overlapping unseen item. [Hybrid recommenders](hybrid-recommenders.md) combine this with behavioral signals when both are available.

## Caveats

Content recommenders can overspecialize because they look for more of what the profile already contains. Feature quality matters: weak tags or biased embeddings produce weak recommendations. Content similarity also does not prove user intent; final systems still need [ranking](ranking.md), diversity, and online validation.

## References

- [scikit-learn documentation: cosine_similarity](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html)
- [Adomavicius and Tuzhilin, 2005, Toward the Next Generation of Recommender Systems](https://doi.org/10.1109/TKDE.2005.99)

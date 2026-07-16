---
title: Content-Based Image Retrieval
slug: recommendation-systems/content-based-image-retrieval
description: "Nearest-neighbor retrieval over visual feature vectors or image embeddings."
area: recommendation-systems
topics:
  - content-based-image-retrieval
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - content-based-recommendation.md
related:
  - image-based-recommendation.md
  - content-based-recommendation.md
  - candidate-generation.md
  - ../12-information-retrieval-and-search/vector-indexes.md
  - ../12-information-retrieval-and-search/dense-retrieval.md
historical_context: false
last_reviewed: 2026-07-11
---

# Content-Based Image Retrieval

Content-based image retrieval represents images as feature vectors and returns nearby vectors for a query image. In recommendation systems, it is often a retrieval source for visually similar products, artworks, recipes, or media thumbnails before [ranking](ranking.md) applies personalization and constraints.

## Defining math

Given an image encoder $f(\cdot)$ and query image $q$, retrieve items by

$$
s(q,i)=\frac{f(q)^\top f(i)}{\lVert f(q)\rVert\lVert f(i)\rVert}.
$$

At scale the vectors are stored in [vector indexes](../12-information-retrieval-and-search/vector-indexes.md), similar to [dense retrieval](../12-information-retrieval-and-search/dense-retrieval.md).

## Worked example

This snippet computes cosine similarity between a query image descriptor and candidate descriptors, then returns the nearest image index.

```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
emb = np.array([[.9,.1,.1], [.85,.05,.2], [.1,.9,.2], [.2,.1,.95]])
q = np.array([[.88,.08,.12]])
sim = cosine_similarity(q, emb)[0]
print("similarities", np.round(sim, 3).tolist())
print("nearest_image", int(np.argmax(sim)))
```

Observed output:

```text
similarities [0.999, 0.995, 0.223, 0.342]
nearest_image 0
```

The query retrieves the nearest visual vector. [Image-based recommendation](image-based-recommendation.md) adds user preference or collaborative scores so the result is not merely a near-duplicate search.

In the example, items 0 and 1 are almost collinear with the query vector, so their cosine scores are near 1. Items 2 and 3 point toward different feature dimensions, so they are much less similar even if their raw vector magnitudes were comparable. This is why embedding normalization and nearest-neighbor indexing are part of the retrieval contract, not incidental implementation details.

## Caveats

Visual similarity can overemphasize color, background, camera angle, or brand presentation. A user may want complements rather than substitutes. Safety filters, inventory constraints, and deduplication belong in the downstream [retrieval and ranking architecture](retrieval-and-ranking-architectures.md).

## References

- [He and McAuley, 2015, VBPR: Visual Bayesian Personalized Ranking from Implicit Feedback](https://arxiv.org/abs/1510.01784)
- [scikit-learn documentation: cosine_similarity](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html)

> [!nav]
> **Section** — [Recommendation Systems and Personalization](index.md)
>
> [← Image-Based Recommendation](image-based-recommendation.md)

---
title: Content-Based Image Retrieval
slug: computer-vision/content-based-image-retrieval
description: "Retrieving images by visual descriptors or learned embedding similarity."
area: computer-vision
topics:
  - content-based-image-retrieval
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - feature-extraction.md
  - image-representation.md
  - self-supervised-visual-learning.md
  - ../12-information-retrieval-and-search/vector-indexes.md
historical_context: false
last_reviewed: 2026-07-11
---

# Content-Based Image Retrieval

Content-based image retrieval finds images by visual similarity rather than only text metadata. The core dependency is [feature extraction](feature-extraction.md): the retrieval system can only rank by what the descriptor or embedding preserves. It connects directly to vector search in [vector indexes](../12-information-retrieval-and-search/vector-indexes.md).

## Defining math

Given indexed image embeddings $v_i=\phi(x_i)$ and a query embedding $q=\phi(x_q)$, rank by cosine similarity

$$
s_i=\frac{v_i^\top q}{\lVert v_i\rVert_2\lVert q\rVert_2}.
$$

Here $v_i$ is the stored embedding for image $i$, $q$ is the query embedding, and $s_i$ is the similarity score used for ranking. The denominator normalizes vector lengths, so ranking depends on direction in embedding space rather than raw magnitude.

Classical systems may use color histograms or local descriptors; modern systems often use pretrained visual embeddings from [self-supervised visual learning](self-supervised-visual-learning.md) or multimodal models.

## Worked example

The code below builds four toy image embeddings and ranks them by cosine similarity to a query. It illustrates the retrieval contract without needing a full image model: nearest neighbors are selected by embedding geometry.

```python
import numpy as np

vecs = np.array([[1,0,0], [.9,.1,0], [0,1,0], [.2,.8,0]], float)
query = np.array([[.8,.2,0.]])
vecs = vecs / np.linalg.norm(vecs, axis=1, keepdims=True)
q = query / np.linalg.norm(query)
sims = (vecs @ q.T).ravel()
order = np.argsort(-sims)
print("cosine_scores", np.round(sims, 3).tolist())
print("ranked_ids", order.tolist())
```

Observed output:

```text
cosine_scores [0.97, 0.991, 0.243, 0.471]
ranked_ids [1, 0, 3, 2]
```

The query is closest to item 1 because its direction in embedding space is most similar, even though item 0 has a larger first coordinate.

## Caveats

Nearest neighbors expose embedding bias quickly: results may cluster by background, lighting, crop style, or digitization source rather than semantic content. A museum archive should evaluate retrieval alongside [document image analysis and field extraction](document-image-analysis-and-field-extraction.md), because visual similarity and catalog-entity similarity are different signals.

## References

- [Computer Vision: Algorithms and Applications, 2nd ed.](https://szeliski.org/Book/)
- [scikit-learn documentation: Nearest Neighbors](https://scikit-learn.org/stable/modules/neighbors.html)

---
title: Retrieval and Ranking Architectures
slug: recommendation-systems/retrieval-and-ranking-architectures
description: "Two-stage recommender systems that separate fast recall from precise ordering."
area: recommendation-systems
topics:
  - retrieval-and-ranking-architectures
level: advanced
status: review
page_type: system-design
aliases: []
prerequisites:
  - candidate-generation.md
  - ranking.md
related:
  - candidate-generation.md
  - ranking.md
  - hybrid-recommenders.md
  - ../11-information-retrieval-and-search/vector-indexes.md
  - ../11-information-retrieval-and-search/reranking.md
historical_context: false
last_reviewed: 2026-07-11
---
# Retrieval and Ranking Architectures

Retrieval-and-ranking architectures split recommendation into fast broad recall and slower precise ordering. This is the recommender analogue of [dense retrieval](../11-information-retrieval-and-search/dense-retrieval.md) followed by [reranking](../11-information-retrieval-and-search/reranking.md): retrieve thousands, rank hundreds, display a few.

## Defining mechanism

A two-stage system can be written as

$$
C_u=\operatorname{topK}_{i\in\mathcal I} g(u,i),\qquad
L_u=\operatorname{sort}_{i\in C_u} h(u,i,x_{ui}),
$$

where $g$ is a cheap retrieval score and $h$ is a richer [ranking](ranking.md) model. [Candidate generation](candidate-generation.md) may combine multiple retrieval sources before ranking.

## Worked example

```python
import numpy as np
user = np.array([.8, .2])
item_emb = np.array([[.9,.1], [.1,.8], [.7,.2], [.4,.6]])
retrieval = item_emb @ user
cand = np.argsort(-retrieval)[:3]
margin = np.array([.0, .2, .1, .3])
rerank = retrieval[cand] + margin[cand]
print("retrieved", cand.tolist())
print("reranked", cand[np.argsort(-rerank)].tolist())
```

Observed output:

```text
retrieved [0, 2, 3]
reranked [0, 3, 2]
```

The retrieval model recalls items 0, 2, and 3; the ranker changes the order using an extra margin feature. [Hybrid recommenders](hybrid-recommenders.md) often feed several such scores into the ranker.

## Caveats

Retrieval and ranking must be evaluated separately. A ranker with excellent [NDCG](../11-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md) cannot fix low candidate recall, and a high-recall generator can still overload serving latency. Keep eligibility, freshness, deduplication, and exploration decisions visible in logs.

## References

- [Li et al., 2010, A Contextual-Bandit Approach to Personalized News Article Recommendation](https://arxiv.org/abs/1003.0146)
- [scikit-learn documentation: cosine_similarity](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html)

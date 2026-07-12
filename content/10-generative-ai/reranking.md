---
title: Reranking
slug: generative-ai/reranking
description: "Second-stage scoring of retrieved candidates with a more precise query-document model."
area: generative-ai
topics:
  - reranking
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - retrieval-pipelines.md
  - hybrid-retrieval.md
  - embeddings.md
  - rag.md
  - vector-databases.md
historical_context: false
last_reviewed: 2026-07-11
---
# Reranking

Reranking reorders candidates after a fast first-stage retriever. It lets [retrieval pipelines](retrieval-pipelines.md) use cheap lexical or vector search for recall, then a more expensive model for precision before [RAG](rag.md) context is packed.

## Mechanism

First-stage retrieval scores documents independently or approximately. A reranker scores $(q,d_i)$ pairs directly and sorts by $r(q,d_i)$. It is commonly applied after [hybrid retrieval](hybrid-retrieval.md), [embeddings](embeddings.md), or [vector databases](vector-databases.md) return a short candidate list.

## Executed artifact

```python
import numpy as np

first_pass = np.array([0.78, 0.74, 0.70])
cross_score = np.array([0.20, 0.95, 0.50])
final = 0.3 * first_pass + 0.7 * cross_score
print("RERANK")
print("first_pass", [int(i) for i in np.argsort(-first_pass)])
print("reranked", [int(i) for i in np.argsort(-final)], np.round(final, 3).tolist())
```

Observed output:

```text
RERANK
first_pass [0, 1, 2]
reranked [1, 2, 0] [0.374, 0.887, 0.56]
```

The cross-score moved document 1 above the vector winner, which is exactly the point of a second stage.

## Caveats

Rerankers can overfit to benchmark phrasing and add latency. Evaluate top-k recall before reranking and answer support after reranking.

## References

- [Karpukhin et al., 2020, Dense Passage Retrieval](https://arxiv.org/abs/2004.04906)
- [Muennighoff et al., 2022, MTEB](https://arxiv.org/abs/2210.07316)
- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)

---
title: Reranking
slug: information-retrieval-and-search/reranking
description: "A second-stage ranking step that reorders retrieved candidates with richer features or models."
area: information-retrieval-and-search
topics:
  - reranking
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - hybrid-search.md
  - dense-retrieval.md
  - bm25.md
  - ranking-and-retrieval-metrics.md
  - ../11-generative-ai/reranking.md
historical_context: false
last_reviewed: 2026-07-11
---

# Reranking

Reranking reorders a small candidate set after first-stage retrieval. [BM25](bm25.md), [dense retrieval](dense-retrieval.md), or [hybrid search](hybrid-search.md) tries to avoid missing plausible candidates; the reranker spends more compute to improve the final order shown to the user or passed to a RAG context builder.

## Defining mechanism

A reranker scores each candidate conditioned on the full query-document pair:

$$
s_i=f(q,d_i,x_i),
\qquad
\pi=\operatorname{argsort}_i(-s_i).
$$

The feature vector $x_i$ may include first-stage scores, exact-match indicators, freshness, authority, personalization, or policy features. A cross-encoder reranker folds $q$ and $d_i$ into one model input, which captures token interactions that dual-encoder [vector indexes](vector-indexes.md) cannot precompute.

## Worked example

This snippet starts from first-stage candidate scores and reranks them with freshness and exact-match features.

```python
import numpy as np

candidates = ["docA", "docB", "docC"]
first_stage = np.array([0.91, 0.88, 0.82])
freshness = np.array([0.1, 0.9, 0.3])
exact_match = np.array([1, 0, 1])
score = 0.65 * first_stage + 0.25 * exact_match + 0.10 * freshness
print("first_stage", list(zip(candidates, first_stage.tolist())))
print("reranked", [(candidates[i], round(float(score[i]), 3)) for i in np.argsort(score)[::-1]])
```

Observed output:

```text
first_stage [('docA', 0.91), ('docB', 0.88), ('docC', 0.82)]
reranked [('docA', 0.852), ('docC', 0.813), ('docB', 0.662)]
```

`docB` was strong in the first stage, but the reranker demotes it because it lacks exact-match evidence. This is the kind of trade-off that should be checked with [ranking metrics](ranking-and-retrieval-metrics.md) by query class.

## Caveats

Reranking cannot recover documents absent from the candidate set, so first-stage recall is a hard ceiling. Cross-encoders are latency-sensitive because they score each query-document pair separately. Training labels can also inherit position bias from an older ranker; offline gains should be verified against [online experiments](../17-experimentation-and-evaluation/online-experiments.md) when user traffic is available.

## References

- [Nogueira and Cho, Passage Re-ranking with BERT](https://arxiv.org/abs/1901.04085)
- [Khattab and Zaharia, ColBERT](https://arxiv.org/abs/2004.12832)
- [Elasticsearch Reference: Reciprocal rank fusion](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion)

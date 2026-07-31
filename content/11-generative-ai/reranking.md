---
title: Reranking
slug: generative-ai/reranking
description: "Second-stage scoring of retrieved candidates with a more precise query-document model."
area: generative-ai
topics:
  - reranking
level: intermediate
status: complete
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
  - query-rewriting.md
  - context-construction.md
historical_context: false
last_reviewed: 2026-07-29
---

# Reranking

Reranking reorders candidates after a fast first-stage retriever. It lets [retrieval pipelines](retrieval-pipelines.md) use cheap lexical or vector search for recall, then a more expensive model for precision before [RAG](rag.md) context is packed. The first stage asks "what might be relevant?"; the reranker asks "which of these candidates best answers this exact query?"

## Bi-encoder recall, cross-encoder precision

First-stage retrieval scores documents independently or approximately. A reranker scores each query-document pair $(q,d_i)$ directly and sorts by the reranker score $r(q,d_i)$. Here $q$ is the user query, $d_i$ is the $i$-th candidate document or chunk returned by the first-stage retriever, and $r(q,d_i)$ is the relevance score assigned after the reranker has read the query and candidate together. It is commonly applied after [hybrid retrieval](hybrid-retrieval.md), [embeddings](embeddings.md), or [vector databases](vector-databases.md) return a short candidate list.

The precision gain comes from architecture. First-stage bi-encoders embed the query and each document _separately_, so documents can be indexed ahead of time and searched at scale. A cross-encoder reranker instead reads the query and document _together_, which captures fine-grained relevance but must be run fresh for every pair — so it is affordable only on the short candidate list the first stage produced.

## When reranking helps

Reranking is most useful when the first stage has high recall but noisy ordering:

- the query has subtle constraints such as date, jurisdiction, product version, or user role;
- dense retrieval finds semantic neighbors that are topically close but not answer-bearing;
- lexical retrieval finds exact terms in boilerplate sections;
- [query rewriting](query-rewriting.md) produces several candidate pools that need a single final order;
- the final context budget is small, so choosing the wrong top chunks is expensive.

It helps less when the first-stage retriever already misses the relevant document. Rerankers improve ordering; they cannot rank evidence that never appears in the candidate list.

## Worked scoring example

Suppose the first-stage retriever returns three documents in vector-score order: document 0, then 1, then 2. A cross-encoder reranker can change the order because it scores the query-document pair directly:

$$
s_{\text{final}}(q,d)=0.3\,s_{\text{first}}(q,d)+0.7\,s_{\text{cross}}(q,d).
$$

| document | first-stage score | cross-score |                 final score |
| -------: | ----------------: | ----------: | --------------------------: |
|        0 |              0.78 |        0.20 | $0.3(0.78)+0.7(0.20)=0.374$ |
|        1 |              0.74 |        0.95 | $0.3(0.74)+0.7(0.95)=0.887$ |
|        2 |              0.70 |        0.50 | $0.3(0.70)+0.7(0.50)=0.560$ |

The reranked order is therefore document 1, document 2, document 0. The first-stage winner falls to last because the cross-score judges it weak after seeing the full query-document pair.

## Policy-Threshold Reranking

User query:

```text
Do enterprise refunds above 5000 EUR require finance approval in the July 2026 policy?
```

The vector retriever may return:

1. A general refund overview that mentions enterprise accounts.
2. A July 2026 approval-threshold table.
3. A stale June 2025 policy with similar wording.
4. A support macro about how to ask finance.

A cross-encoder reranker can score the full query against each chunk and promote the July 2026 threshold table because it matches amount, customer type, approval action, and policy date. The reranker is not just looking for "refund"; it is comparing the whole query-document pair.

## Evaluation

Evaluate reranking at several cutoffs: recall@50 before reranking, [NDCG](../12-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md#ndcg-normalized-discounted-cumulative-gain)@10 after reranking, and answer support after [context construction](context-construction.md). A reranker that improves [NDCG](../12-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md#ndcg-normalized-discounted-cumulative-gain) but drops the only citation-bearing chunk from the final context is not helping the product. Track latency too: reranking 200 candidates may improve quality but break interactive response time.

## Caveats

Rerankers can overfit to benchmark phrasing and add latency. They can also inherit bias from training judgments and prefer polished documents over short but decisive evidence. Evaluate top-k recall before reranking and answer support after reranking.

## References

- [Karpukhin et al., 2020, Dense Passage Retrieval](https://arxiv.org/abs/2004.04906)
- [Muennighoff et al., 2022, MTEB](https://arxiv.org/abs/2210.07316)
- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Query Rewriting](query-rewriting.md) [Context Construction →](context-construction.md)

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
last_reviewed: 2026-07-20
---

# Reranking

Reranking reorders candidates after a fast first-stage retriever. It lets [retrieval pipelines](retrieval-pipelines.md) use cheap lexical or vector search for recall, then a more expensive model for precision before [RAG](rag.md) context is packed.

## Bi-encoder recall, cross-encoder precision

First-stage retrieval scores documents independently or approximately. A reranker scores $(q,d_i)$ pairs directly and sorts by $r(q,d_i)$. It is commonly applied after [hybrid retrieval](hybrid-retrieval.md), [embeddings](embeddings.md), or [vector databases](vector-databases.md) return a short candidate list.

The precision gain comes from architecture. First-stage bi-encoders embed the query and each document _separately_, so documents can be indexed ahead of time and searched at scale. A cross-encoder reranker instead reads the query and document _together_, which captures fine-grained relevance but must be run fresh for every pair — so it is affordable only on the short candidate list the first stage produced.

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

## Caveats

Rerankers can overfit to benchmark phrasing and add latency. Evaluate top-k recall before reranking and answer support after reranking.

## References

- [Karpukhin et al., 2020, Dense Passage Retrieval](https://arxiv.org/abs/2004.04906)
- [Muennighoff et al., 2022, MTEB](https://arxiv.org/abs/2210.07316)
- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Query Rewriting](query-rewriting.md) [Context Construction →](context-construction.md)

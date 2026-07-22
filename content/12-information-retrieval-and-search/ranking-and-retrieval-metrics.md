---
title: Ranking and Retrieval Metrics
slug: information-retrieval-and-search/ranking-and-retrieval-metrics
description: "Precision@k, recall@k, MAP, MRR, NDCG, and related measures for ranked retrieval."
area: information-retrieval-and-search
topics:
  - search-evaluation
  - retrieval-metrics
  - ranking-metrics
level: intermediate
status: complete
page_type: reference
aliases:
  - Retrieval metrics
  - Ranking metrics
  - Precision recall MAP MRR NDCG
prerequisites:
  - search-evaluation.md
related:
  - precision-recall-map-mrr-ndcg.md
  - search-evaluation.md
  - reranking.md
  - hybrid-search.md
  - ../11-generative-ai/rag-evaluation.md
historical_context: false
last_reviewed: 2026-07-22
---

# Ranking and Retrieval Metrics

Ranking metrics measure whether useful results appear early enough. They are the feedback loop for [BM25](bm25.md), [hybrid search](hybrid-search.md), [reranking](reranking.md), and RAG retrieval. The right metric depends on the task: one good result, many relevant results, or graded evidence quality.

## Precision, recall, and ranked metrics

For binary relevance in the top $k$:

$$
\operatorname{Precision@k}=\frac{\#\text{ relevant in top }k}{k},
\qquad
\operatorname{Recall@k}=\frac{\#\text{ relevant in top }k}{\#\text{ relevant in corpus}}.
$$

Average precision for one query averages precision at ranks where a relevant item appears:

$$
\operatorname{AP}=\frac{1}{R}\sum_{i=1}^n \operatorname{Precision@i}\,\mathbf 1\{\operatorname{rel}_i=1\}.
$$

MRR uses the first relevant rank. NDCG handles graded labels:

$$
\operatorname{DCG@k}=\sum_{i=1}^k\frac{\operatorname{rel}_i}{\log_2(i+1)},
\qquad
\operatorname{NDCG@k}=\frac{\operatorname{DCG@k}}{\operatorname{IDCG@k}}.
$$

## Worked example

For ranked graded relevance labels $[3,0,2,1,0]$, binary relevance appears at ranks 1, 3, and 4.
The table calculates several metrics on the same ranking so the differences are visible: some metrics care only about the first relevant hit, while others reward multiple relevant or highly graded results.

| Metric   | Calculation                                                  | Value |
| -------- | ------------------------------------------------------------ | ----: |
| $P@3$    | two relevant results in the top three                        | 0.667 |
| $R@3$    | two of three known relevant results found                    | 0.667 |
| $AP$     | $(1/1+2/3+3/4)/3$                                            | 0.806 |
| $RR$     | first relevant result at rank 1                              | 1.000 |
| $NDCG@5$ | graded gain discounted by rank and normalized by ideal order | 0.930 |

The first result is relevant, so reciprocal rank is perfect. $R@3$ is not perfect because one relevant item is still below rank 3.

## Choosing metrics

Use MRR when one answer is enough, precision@k when the visible page must be clean, recall@k when missing evidence is costly, MAP when many relevant documents should be found, and NDCG when labels are graded. For RAG, pair these with source coverage and answer-level [RAG evaluation](../11-generative-ai/rag-evaluation.md).

## References

- [Manning, Raghavan, and Schuetze, Introduction to Information Retrieval: Evaluation](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html)
- [scikit-learn API: ndcg_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.ndcg_score.html)

> [!nav]
> **Section** — [Information Retrieval and Search](index.md)
>
> [← Search Evaluation](search-evaluation.md) [Precision, Recall, MAP, MRR, and NDCG →](precision-recall-map-mrr-ndcg.md)

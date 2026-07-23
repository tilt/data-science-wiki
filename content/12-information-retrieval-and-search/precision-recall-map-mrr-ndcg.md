---
title: Precision, Recall, MAP, MRR, and NDCG
slug: information-retrieval-and-search/precision-recall-map-mrr-ndcg
description: "Quick reference for the core ranked-retrieval metrics and when to use them."
area: information-retrieval-and-search
topics:
  - precision
  - recall
  - map
  - mrr
  - ndcg
level: foundational
status: complete
page_type: reference
aliases: []
prerequisites:
  - search-evaluation.md
related:
  - ranking-and-retrieval-metrics.md
  - search-evaluation.md
  - reranking.md
  - hybrid-search.md
historical_context: false
last_reviewed: 2026-07-22
---

# Precision, Recall, MAP, MRR, and NDCG

These metrics summarize different user promises made by a ranked retrieval system. This page is the compact glossary; [Ranking and Retrieval Metrics](ranking-and-retrieval-metrics.md) is the more detailed reference.

## Metric definitions

Precision@k asks how clean the top $k$ results are:

$$
P@k=\frac{\text{relevant retrieved in top }k}{k}.
$$

Recall@k asks how much known relevant material was found:

$$
R@k=\frac{\text{relevant retrieved in top }k}{\text{known relevant}}.
$$

MAP averages precision at relevant ranks. MRR is $1/r$ for the rank $r$ of the first relevant result. NDCG discounts graded relevance by rank and normalizes by the best possible ordering.

## NDCG in detail

NDCG means **normalized discounted cumulative gain**. It is useful when relevance is not just binary. A document can be perfect, useful, marginal, or irrelevant, and the metric should reward putting the strongest evidence near the top.

The first step is to choose a **gain** for each result. In the simplest version the gain is the human relevance label itself:

$$
\operatorname{gain}_i = \operatorname{rel}_i.
$$

Some evaluations use an exponential gain,

$$
\operatorname{gain}_i = 2^{\operatorname{rel}_i}-1,
$$

which makes the jump from relevance grade 2 to 3 larger than the jump from 0 to 1. This is common when the top grades are qualitatively much better than the lower grades.

The second step is to **discount** each gain by rank:

$$
\operatorname{DCG@k}
=\sum_{i=1}^k
\frac{\operatorname{gain}_i}{\log_2(i+1)}.
$$

Rank 1 has discount $1/\log_2(2)=1$, so the first result keeps its full gain. Rank 2 has discount $1/\log_2(3)\approx0.63$, rank 3 has discount $0.5$, and later ranks count less and less. The logarithm makes the penalty strong near the top but gentler farther down the list.

The final step is normalization. Sort the same relevance labels into the best possible order and compute the corresponding **ideal DCG**:

$$
\operatorname{IDCG@k}
= \max_{\pi}
\sum_{i=1}^k
\frac{\operatorname{gain}_{\pi(i)}}{\log_2(i+1)}.
$$

Then

$$
\operatorname{NDCG@k}
=
\frac{\operatorname{DCG@k}}{\operatorname{IDCG@k}}.
$$

The normalization turns the score into a value between 0 and 1 when gains are non-negative. A perfect ordering gets 1.0; a weaker ordering gets less, with larger penalties when highly relevant results are pushed down.

## Worked example

For ranked graded relevance labels $[3,0,2,1,0]$, the binary relevant positions are ranks 1, 3, and 4. At $k=3$, two of the first three results are relevant, so $P@3=2/3=0.667$ and $R@3=2/3=0.667$.

Average precision uses the precision at each relevant rank:

$$
AP=\frac{1/1+2/3+3/4}{3}=0.806.
$$

The first result is relevant, so reciprocal rank is $1/1=1.0$.

For NDCG@5 with linear gains, the displayed order has relevance labels $[3,0,2,1,0]$:

| Rank | Relevance | Discount $1/\log_2(i+1)$ | Contribution |
| ---: | --------: | ------------------------: | -----------: |
| 1 | 3 | 1.000 | 3.000 |
| 2 | 0 | 0.631 | 0.000 |
| 3 | 2 | 0.500 | 1.000 |
| 4 | 1 | 0.431 | 0.431 |
| 5 | 0 | 0.387 | 0.000 |

So

$$
\operatorname{DCG@5}=3+\frac{0}{\log_2 3}+\frac{2}{\log_2 4}+\frac{1}{\log_2 5}+0\approx4.43.
$$

The ideal ordering would put the same grades as $[3,2,1,0,0]$:

$$
\operatorname{IDCG@5}=3+\frac{2}{\log_2 3}+\frac{1}{\log_2 4}\approx4.76.
$$

Therefore

$$
\operatorname{NDCG@5}\approx\frac{4.43}{4.76}=0.93.
$$

This score is high because the best result is already first and the grade-2 result is still near the top. It is not perfect because the irrelevant rank-2 result appears before the grade-2 and grade-1 results. The same ranking can therefore look strong or weak depending on whether the question is first-hit quality, top-3 cleanliness, full recall, or graded ordering.

## Practical use

Use these metrics inside [search evaluation](search-evaluation.md) slices, not only as one global average. A [reranking](reranking.md) change may improve NDCG while reducing recall for exact-code queries. A [hybrid search](hybrid-search.md) change may improve recall while adding low-quality top results, which precision@k will reveal.

NDCG is a good primary metric when users inspect a ranked list and relevance labels have grades: web search, product search, recommendations, document retrieval, and RAG source ranking. It is less informative when only the first correct answer matters; then MRR may match the product better. It also assumes the chosen relevance grades and discount curve reflect user value, so NDCG should be reported at a realistic cutoff such as @5, @10, or @20 rather than only over the full corpus.

## References

- [Manning, Raghavan, and Schuetze, Introduction to Information Retrieval: Evaluation](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html)
- [scikit-learn API: ndcg_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.ndcg_score.html)

> [!nav]
> **Section** — [Information Retrieval and Search](index.md)
>
> [← Ranking and Retrieval Metrics](ranking-and-retrieval-metrics.md)

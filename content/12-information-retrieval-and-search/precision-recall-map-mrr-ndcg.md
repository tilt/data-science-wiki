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
status: review
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
last_reviewed: 2026-07-11
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

## Worked example

For ranked graded relevance labels $[3,0,2,1,0]$, the binary relevant positions are ranks 1, 3, and 4. At $k=3$, two of the first three results are relevant, so $P@3=2/3=0.667$ and $R@3=2/3=0.667$.

Average precision uses the precision at each relevant rank:

$$
AP=\frac{1/1+2/3+3/4}{3}=0.806.
$$

The first result is relevant, so reciprocal rank is $1/1=1.0$. With graded gains and logarithmic rank discounting, the displayed order has normalized discounted gain about 0.93. The same ranking can therefore look strong or weak depending on whether the question is first-hit quality, top-3 cleanliness, full recall, or graded ordering.

## Practical use

Use these metrics inside [search evaluation](search-evaluation.md) slices, not only as one global average. A [reranking](reranking.md) change may improve NDCG while reducing recall for exact-code queries. A [hybrid search](hybrid-search.md) change may improve recall while adding low-quality top results, which precision@k will reveal.

## References

- [Manning, Raghavan, and Schuetze, Introduction to Information Retrieval: Evaluation](https://nlp.stanford.edu/IR-book/html/htmledition/evaluation-in-information-retrieval-1.html)
- [scikit-learn API: ndcg_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.ndcg_score.html)

> [!nav]
> **Section** — [Information Retrieval and Search](index.md)
>
> [← Ranking and Retrieval Metrics](ranking-and-retrieval-metrics.md)

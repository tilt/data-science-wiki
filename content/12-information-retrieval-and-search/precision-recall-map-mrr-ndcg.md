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
last_reviewed: 2026-07-30
---

# Precision, Recall, MAP, MRR, and NDCG

These metrics summarize different user promises made by a ranked retrieval system. This page gives the worked definitions and examples; [Ranking and Retrieval Metrics](ranking-and-retrieval-metrics.md) is the compact overview.

## Metric definitions

Assume one query returns a ranked list of documents $d_1,\ldots,d_n$. Each document has a relevance judgment $\operatorname{rel}_i$ at rank $i$. For binary metrics, $\operatorname{rel}_i=1$ means relevant and $\operatorname{rel}_i=0$ means not relevant. Let $R$ be the number of known relevant documents for the query.

Ordinary precision and recall apply to a retrieved set $S$, not necessarily to a cutoff:

$$
\operatorname{Precision}
=\frac{|S\cap G|}{|S|},
\qquad
\operatorname{Recall}
=\frac{|S\cap G|}{|G|}.
$$

Here $G$ is the gold set of relevant documents. Precision asks how clean the retrieved set is; recall asks how much relevant material the set found. In a ranked product, users usually see only the first page or the context budget only admits a few chunks, so the same definitions are often evaluated at a cutoff $k$:

$$
\operatorname{Precision@k}
=\frac{\sum_{i=1}^k \mathbf 1\{\operatorname{rel}_i>0\}}{k},
\qquad
\operatorname{Recall@k}
=\frac{\sum_{i=1}^k \mathbf 1\{\operatorname{rel}_i>0\}}{R}.
$$

The symbol $\mathbf 1\{\cdot\}$ is an indicator: it contributes 1 when the condition is true and 0 otherwise.

Average precision summarizes the whole ranking for one query by averaging precision at the ranks where a relevant result appears:

$$
\operatorname{AP}
=\frac{1}{R}
\sum_{i=1}^{n}
\operatorname{Precision@i}\,\mathbf 1\{\operatorname{rel}_i>0\}.
$$

Mean average precision, MAP, is the mean of AP across queries. Reciprocal rank for one query is $1/r$, where $r$ is the rank of the first relevant result. Mean reciprocal rank, MRR, averages that value across queries. NDCG handles graded relevance by giving more credit to highly relevant documents and discounting results that appear lower in the ranking.

The `@k` suffix means "evaluate only the first $k$ ranks." Without `@k`, the metric is normally computed over the full retrieved/evaluated ranking or, for MAP and MRR, averaged over the full query set. Cutoff variants such as $\operatorname{AP@k}$, $\operatorname{MRR@k}$, or $\operatorname{NDCG@k}$ truncate the ranking before scoring; for example, $\operatorname{MRR@10}$ is zero for a query whose first relevant result appears at rank 11.

## Binary Example

Suppose a search system returns five documents, and the binary relevance labels are:

| Rank | Document | Relevant? |
| ---: | -------- | --------: |
|    1 | A        |       yes |
|    2 | B        |        no |
|    3 | C        |       yes |
|    4 | D        |       yes |
|    5 | E        |        no |

There are four known relevant documents in the corpus, so one relevant document was missed outside the top five.

| Metric               | Calculation                        | Value |
| -------------------- | ---------------------------------- | ----: |
| Precision over top 5 | 3 relevant among 5 retrieved       |  0.60 |
| Recall over top 5    | 3 of 4 known relevant documents    |  0.75 |
| $\operatorname{P@3}$ | 2 relevant among the first 3 ranks |  0.67 |
| $\operatorname{R@3}$ | 2 of 4 known relevant documents    |  0.50 |
| Reciprocal rank      | first relevant result is at rank 1 |  1.00 |
| Average precision    | $(1/1 + 2/3 + 3/4)/4$              |  0.60 |

This example shows why ordinary and cutoff metrics answer different questions. Precision over the top five says the retrieved list is moderately clean. Recall over the top five says it found most, but not all, known relevant material. $\operatorname{P@3}$ and $\operatorname{R@3}$ focus only on what a user or RAG context builder sees first.

## Query-Set Example

MAP and MRR are query-set metrics: compute a per-query score first, then average. Suppose three queries have these relevant ranks:

| Query | Relevant ranks | AP calculation               |   AP |   RR |
| ----- | -------------- | ---------------------------- | ---: | ---: |
| Q1    | 1, 3           | $(1/1 + 2/3)/2$              | 0.83 | 1.00 |
| Q2    | 2              | $(1/2)/1$                    | 0.50 | 0.50 |
| Q3    | none retrieved | no relevant result retrieved | 0.00 | 0.00 |

Then $\operatorname{MAP}=(0.83+0.50+0.00)/3=0.44$, while $\operatorname{MRR}=(1.00+0.50+0.00)/3=0.50$. MAP rewards finding multiple relevant documents across the ranking. MRR cares only about how quickly the first relevant result appears.

## NDCG: Normalized Discounted Cumulative Gain

NDCG is useful when relevance is not just binary. A document can be perfect, useful, marginal, or irrelevant, and the metric should reward putting the strongest evidence near the top. It is common in web search, product search, recommendations, document retrieval, and RAG source ranking.

NDCG has three steps:

1. Convert each relevance label into a gain.
2. Discount each gain by rank.
3. Normalize by the best possible ordering for the same labels.

### Step 1: Choose Gains

The first step is to choose a **gain** for each result. In the simplest version the gain is the human relevance label itself:

$$
\operatorname{gain}_i = \operatorname{rel}_i.
$$

Some evaluations use an exponential gain,

$$
\operatorname{gain}_i = 2^{\operatorname{rel}_i}-1,
$$

which makes the jump from relevance grade 2 to 3 larger than the jump from 0 to 1. This is common when the top grades are qualitatively much better than the lower grades.

For example, with labels `0 = irrelevant`, `1 = marginal`, `2 = useful`, and `3 = excellent`, linear gains are $[0,1,2,3]$, while exponential gains are $[0,1,3,7]$. Exponential gains say that an excellent document is much more valuable than a merely useful one.

### Step 2: Discount by Rank

The second step is to **discount** each gain by rank:

$$
\operatorname{DCG@k}
=\sum_{i=1}^k
\frac{\operatorname{gain}_i}{\log_2(i+1)}.
$$

Rank 1 has discount $1/\log_2(2)=1$, so the first result keeps its full gain. Rank 2 has discount $1/\log_2(3)\approx0.63$, rank 3 has discount $0.5$, and later ranks count less and less. The logarithm makes the penalty strong near the top but gentler farther down the list.

This creates the main intuition: the same excellent document is worth more at rank 1 than rank 5 because users are less likely to inspect it later, and a RAG pipeline may drop it before generation.

### Step 3: Normalize by the Ideal Ranking

The final step is normalization. Sort the same relevance labels into the best possible order and compute the corresponding **ideal DCG**:

$$
\operatorname{IDCG@k}
= \max_{\pi}
\sum_{i=1}^k
\frac{\operatorname{gain}_{\pi(i)}}{\log_2(i+1)}.
$$

Here $\pi$ is a permutation of the retrieved relevance labels: it represents a possible reordering. The ideal permutation puts the largest gains first.

Then

$$
\operatorname{NDCG@k}
=
\frac{\operatorname{DCG@k}}{\operatorname{IDCG@k}}.
$$

The normalization turns the score into a value between 0 and 1 when gains are non-negative. A perfect ordering gets 1.0; a weaker ordering gets less, with larger penalties when highly relevant results are pushed down.

If no cutoff is written, NDCG is computed over the evaluated ranking length. In product evaluations it is usually reported as $\operatorname{NDCG@k}$ because only the top $k$ results are visible or useful.

## NDCG Worked Example

Suppose a query asks for the current enterprise refund approval policy, and the top five retrieved chunks receive these graded labels:

| Rank | Chunk | Label | Meaning                                 |
| ---: | ----- | ----: | --------------------------------------- |
|    1 | A     |     3 | exact current policy table              |
|    2 | B     |     0 | unrelated support macro                 |
|    3 | C     |     2 | relevant explanation, but less specific |
|    4 | D     |     1 | marginally useful background            |
|    5 | E     |     0 | stale or irrelevant content             |

Using linear gains, the displayed order has relevance labels $[3,0,2,1,0]$:

| Rank | Relevance | Discount $1/\log_2(i+1)$ | Contribution |
| ---: | --------: | -----------------------: | -----------: |
|    1 |         3 |                    1.000 |        3.000 |
|    2 |         0 |                    0.631 |        0.000 |
|    3 |         2 |                    0.500 |        1.000 |
|    4 |         1 |                    0.431 |        0.431 |
|    5 |         0 |                    0.387 |        0.000 |

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

This score is high because the exact policy table is already first and the useful explanation is still near the top. It is not perfect because the irrelevant result at rank 2 appears before the grade-2 and grade-1 chunks.

Now compare a worse ordering with the same five chunks: $[0,3,2,1,0]$. Precision@5 and recall@5 are unchanged because the same three relevant chunks are retrieved. MRR is worse because the first relevant chunk moved from rank 1 to rank 2. NDCG also falls because the best chunk no longer receives the full rank-1 discount:

| Order         | Binary hits in top 5 | First relevant rank | NDCG@5 intuition                         |
| ------------- | -------------------: | ------------------: | ---------------------------------------- |
| $[3,0,2,1,0]$ |                    3 |                   1 | best evidence first, small ordering flaw |
| $[0,3,2,1,0]$ |                    3 |                   2 | same recall, but best evidence delayed   |

That is the core reason NDCG is valuable: it can distinguish rankings that retrieve the same documents but order the evidence differently.

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

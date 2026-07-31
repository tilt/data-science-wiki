---
title: Hybrid Retrieval
slug: generative-ai/hybrid-retrieval
description: "Combining lexical and vector retrieval signals before generation."
area: generative-ai
topics:
  - hybrid-retrieval
level: intermediate
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - embeddings.md
  - retrieval-pipelines.md
  - reranking.md
  - vector-databases.md
  - rag-architecture-comparison.md
  - ../12-information-retrieval-and-search/bm25.md
  - ../12-information-retrieval-and-search/hybrid-search.md
historical_context: false
last_reviewed: 2026-07-29
---

# Hybrid Retrieval

Hybrid retrieval combines lexical matching with dense [embeddings](embeddings.md). It is useful in [retrieval pipelines](retrieval-pipelines.md) because exact names, numbers, and codes often matter while semantic similarity still recovers paraphrases. [Reranking](reranking.md) can then read the merged candidates more carefully. Hybrid retrieval is the pragmatic default when a corpus contains both natural language and exact business identifiers.

## Score fusion

A simple fusion normalizes each score and combines them:

$$
s(d,q)=\lambda z(s_{lex})+(1-\lambda)z(s_{dense}).
$$

Here $q$ is the query and $d$ is one candidate document or chunk. The final score $s(d,q)$ is the number used to sort candidates before reranking or context packing. The lexical score $s_{lex}$ may come from [BM25](../12-information-retrieval-and-search/bm25.md) or another sparse retriever; the dense score $s_{dense}$ usually comes from embedding similarity in a [vector database](vector-databases.md). The function $z(\cdot)$ puts each score family onto a comparable scale, commonly by subtracting the mean and dividing by the standard deviation inside the candidate set or inside a calibration sample. The weight $\lambda\in[0,1]$ controls the trade-off: larger $\lambda$ favors exact lexical evidence, while smaller $\lambda$ favors semantic similarity.

This formula is a realistic engineering pattern, but the normalization choice matters. BM25 scores and vector similarities do not naturally live on the same scale, and their distributions can change by corpus, query type, analyzer, embedding model, and metadata filter. [Reciprocal rank fusion](../12-information-retrieval-and-search/hybrid-search.md) is often more robust when scores are not comparable, because it combines ranks rather than raw scores. This fusion step is the core of the indexed design in [RAG architecture comparison](rag-architecture-comparison.md).

## Worked example

After score normalization, combine lexical and dense scores with $\lambda=0.55$:

| Document | Lexical signal | Dense signal | Hybrid score | Interpretation                                              |
| -------- | -------------: | -----------: | -----------: | ----------------------------------------------------------- |
| 0        |      strongest |       medium |        0.475 | Exact evidence dominates without losing semantic relevance. |
| 1        |           weak |    strongest |       -0.034 | Semantically close, but lexical evidence is thin.           |
| 2        |         medium |      weakest |       -0.440 | Neither signal is strong enough.                            |

Document 0 wins after fusion because its lexical score is strongest and its dense score is not weak enough to offset that advantage. Document 1 has the best dense score but ranks second after its low lexical match is included, illustrating why hybrid retrieval can favor exact evidence over pure semantic similarity.

| Retrieval pattern     | When it helps                                                        |
| --------------------- | -------------------------------------------------------------------- |
| Lexical-only          | Exact product codes, names, legal terms, and identifiers.            |
| Dense-only            | Paraphrases, conceptual questions, and vocabulary mismatch.          |
| Hybrid                | Workflows that need both semantic recall and exact support.          |
| Hybrid plus reranking | High-value answers where the system can afford a slower second pass. |

## SKU and Policy-Date Query

Query:

```text
policy exception for SKU-X19 refund in July 2026
```

Dense retrieval may find refund-exception discussions but miss the exact `SKU-X19` identifier. Lexical retrieval may find every document containing `SKU-X19`, including irrelevant release notes. Hybrid retrieval merges both signals so the candidate list contains documents that are semantically about refunds and lexically anchored to the SKU and date.

## Evaluation

Evaluate hybrid retrieval by query type. Exact-identifier queries, semantic paraphrase queries, multilingual queries, and date-sensitive policy queries may need different fusion weights. Track recall before reranking, duplicate rate after merging, and final answer support. If lexical and dense retrievers return disjoint but useful results, reciprocal-rank fusion can be more robust than score interpolation.

## Caveats

Fusion weights are corpus-specific. Evaluate exact-match queries separately from broad semantic questions. Hybrid retrieval can also over-retrieve boilerplate if exact terms appear in headers or footers, so deduplication and reranking still matter.

## References

- [Karpukhin et al., 2020, Dense Passage Retrieval](https://arxiv.org/abs/2004.04906)
- [Faiss documentation](https://faiss.ai/)
- [OpenAI API documentation: Embeddings](https://platform.openai.com/docs/guides/embeddings)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Retrieval Pipelines](retrieval-pipelines.md) [Query Rewriting →](query-rewriting.md)

---
title: Hybrid Retrieval
slug: generative-ai/hybrid-retrieval
description: "Combining lexical and vector retrieval signals before generation."
area: generative-ai
topics:
  - hybrid-retrieval
level: intermediate
status: review
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
last_reviewed: 2026-07-11
---
# Hybrid Retrieval

Hybrid retrieval combines lexical matching with dense [embeddings](embeddings.md). It is useful in [retrieval pipelines](retrieval-pipelines.md) because exact names, numbers, and codes often matter while semantic similarity still recovers paraphrases. [Reranking](reranking.md) can then read the merged candidates more carefully.

## Mechanism

A simple fusion normalizes each score and combines them:

$$
s(d,q)=\lambda z(s_{lex})+(1-\lambda)z(s_{dense}).
$$

Lexical scores may come from BM25; dense scores from vector search in [vector databases](vector-databases.md). [Reciprocal rank fusion](../12-information-retrieval-and-search/hybrid-search.md) is another robust option when scores are not comparable, and this fusion step is the core of the indexed design in [RAG architecture comparison](rag-architecture-comparison.md).

## Worked example

After score normalization, combine lexical and dense scores with $\lambda=0.55$:

| Document | Lexical signal | Dense signal | Hybrid score | Interpretation |
| --- | ---: | ---: | ---: | --- |
| 0 | strongest | medium | 0.475 | Exact evidence dominates without losing semantic relevance. |
| 1 | weak | strongest | -0.034 | Semantically close, but lexical evidence is thin. |
| 2 | medium | weakest | -0.440 | Neither signal is strong enough. |

Document 0 wins after fusion because its lexical score is strongest and its dense score is not weak enough to offset that advantage. Document 1 has the best dense score but ranks second after its low lexical match is included, illustrating why hybrid retrieval can favor exact evidence over pure semantic similarity.

| Retrieval pattern | When it helps |
| --- | --- |
| Lexical-only | Exact product codes, names, legal terms, and identifiers. |
| Dense-only | Paraphrases, conceptual questions, and vocabulary mismatch. |
| Hybrid | Workflows that need both semantic recall and exact support. |
| Hybrid plus reranking | High-value answers where the system can afford a slower second pass. |

## Caveats

Fusion weights are corpus-specific. Evaluate exact-match queries separately from broad semantic questions.

## References

- [Karpukhin et al., 2020, Dense Passage Retrieval](https://arxiv.org/abs/2004.04906)
- [Faiss documentation](https://faiss.ai/)
- [OpenAI API documentation: Embeddings](https://platform.openai.com/docs/guides/embeddings)

---
title: Embeddings
slug: generative-ai/embeddings
description: "Vector representations used for semantic retrieval, routing, memory, and similarity search."
area: generative-ai
topics:
  - embeddings
level: intermediate
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - vector-databases.md
  - retrieval-pipelines.md
  - hybrid-retrieval.md
  - reranking.md
  - ../08-natural-language-processing/embeddings.md
historical_context: false
last_reviewed: 2026-07-22
---

# Embeddings

Embeddings map text, images, or other objects into vectors so nearby points represent model-learned similarity. In this section they power [vector databases](vector-databases.md), [retrieval pipelines](retrieval-pipelines.md), [hybrid retrieval](hybrid-retrieval.md), and sometimes agent [memory](memory.md).

## Embedding similarity

An encoder maps an item $x$ to $e=f_\theta(x)\in\mathbb R^d$. Cosine similarity is

$$
\operatorname{cos}(a,b)=\frac{a^\top b}{\lVert a\rVert_2\lVert b\rVert_2}.
$$

The training objective determines what similarity means; a search embedding is not automatically a clustering or classification embedding.

## Worked example

Suppose a query embedding points mostly toward the "refund" direction, with some "billing" component and no "weather" component. Cosine similarity ranks documents by vector angle:

| Candidate          | Vector intuition                                  | Cosine to query | Retrieval meaning                   |
| ------------------ | ------------------------------------------------- | --------------: | ----------------------------------- |
| A refund policy    | Strong refund component, small billing component. |           0.992 | Best semantic match.                |
| B invoice payment  | Strong billing component, weak refund component.  |           0.409 | Related business topic, but weaker. |
| C weekend forecast | Weather component unrelated to the query.         |           0.031 | Semantically off-topic.             |

The query vector points toward the refund document, so vector search retrieves it first. A [reranking](reranking.md) step can still change the order after reading full query-document pairs, especially when exact dates, names, or policy constraints matter.

| Design choice                             | Effect                                                                                  |
| ----------------------------------------- | --------------------------------------------------------------------------------------- |
| Normalize embeddings before cosine search | Makes angle rather than vector length drive ranking.                                    |
| Use a domain-tuned embedding model        | Improves similarity for local jargon and document structure.                            |
| Keep metadata filters with vectors        | Prevents semantically similar but unauthorized or stale passages from entering context. |

## Caveats

Embeddings can miss exact constraints, names, and numbers. Evaluate by task, corpus, language, and update cadence.

## References

- [OpenAI API documentation: Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [Muennighoff et al., 2022, MTEB](https://arxiv.org/abs/2210.07316)
- [Karpukhin et al., 2020, Dense Passage Retrieval](https://arxiv.org/abs/2004.04906)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← RAG](rag.md) [Chunking →](chunking.md)

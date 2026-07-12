---
title: Embeddings
slug: generative-ai/embeddings
description: "Vector representations used for semantic retrieval, routing, memory, and similarity search."
area: generative-ai
topics:
  - embeddings
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - vector-databases.md
  - retrieval-pipelines.md
  - hybrid-retrieval.md
  - reranking.md
  - ../07-natural-language-processing/embeddings.md
historical_context: false
last_reviewed: 2026-07-11
---
# Embeddings

Embeddings map text, images, or other objects into vectors so nearby points represent model-learned similarity. In this section they power [vector databases](vector-databases.md), [retrieval pipelines](retrieval-pipelines.md), [hybrid retrieval](hybrid-retrieval.md), and sometimes agent [memory](memory.md).

## Defining math

An encoder maps an item $x$ to $e=f_\theta(x)\in\mathbb R^d$. Cosine similarity is

$$
\operatorname{cos}(a,b)=\frac{a^\top b}{\lVert a\rVert_2\lVert b\rVert_2}.
$$

The training objective determines what similarity means; a search embedding is not automatically a clustering or classification embedding.

## Executed artifact

```python
import numpy as np

docs = {
    "A refund policy": np.array([1.0, 0.2, 0.0]),
    "B invoice payment": np.array([0.1, 1.0, 0.0]),
    "C weekend forecast": np.array([0.0, 0.1, 1.0]),
}
query = np.array([0.9, 0.3, 0.0])

def cosine(a, b):
    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b)))

scores = [(name, round(cosine(query, vec), 3)) for name, vec in docs.items()]
print("EMBEDDINGS")
print(sorted(scores, key=lambda item: -item[1]))
```

Observed output:

```text
EMBEDDINGS
[('A refund policy', 0.992), ('B invoice payment', 0.409), ('C weekend forecast', 0.031)]
```

The query vector points toward the refund document. A [reranking](reranking.md) step can still change the order after reading query-document pairs.

## Caveats

Embeddings can miss exact constraints, names, and numbers. Evaluate by task, corpus, language, and update cadence.

## References

- [OpenAI API documentation: Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [Muennighoff et al., 2022, MTEB](https://arxiv.org/abs/2210.07316)
- [Karpukhin et al., 2020, Dense Passage Retrieval](https://arxiv.org/abs/2004.04906)

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
  - ../11-information-retrieval-and-search/bm25.md
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

Lexical scores may come from BM25; dense scores from vector search in [vector databases](vector-databases.md). Reciprocal rank fusion is another robust option when scores are not comparable.

## Executed artifact

```python
import numpy as np

lexical = np.array([2.0, 0.3, 1.1])
dense = np.array([0.62, 0.91, 0.55])

def zscore(x):
    return (x - x.mean()) / x.std()

score = 0.55 * zscore(lexical) + 0.45 * zscore(dense)
print("HYBRID_FIXED")
print([(int(i), round(float(score[i]), 3)) for i in np.argsort(-score)])
```

Observed output:

```text
HYBRID_FIXED
[(0, 0.475), (1, -0.034), (2, -0.44)]
```

Document 0 wins after fusion with a score of 0.475 because its lexical score is strongest and its dense score is not weak enough to offset that advantage. Document 1 has the best dense score but only reaches -0.034 after its low lexical match is included, illustrating why hybrid retrieval can favor exact evidence over pure semantic similarity.

## Caveats

Fusion weights are corpus-specific. Evaluate exact-match queries separately from broad semantic questions.

## References

- [Karpukhin et al., 2020, Dense Passage Retrieval](https://arxiv.org/abs/2004.04906)
- [Faiss documentation](https://faiss.ai/)
- [OpenAI API documentation: Embeddings](https://platform.openai.com/docs/guides/embeddings)

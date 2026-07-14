---
title: Sparse Retrieval
slug: information-retrieval-and-search/sparse-retrieval
description: "Lexical retrieval with sparse term features, postings lists, and term-weighted scoring."
area: information-retrieval-and-search
topics:
  - sparse-retrieval
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - inverted-indexes.md
  - tf-idf.md
  - bm25.md
  - hybrid-search.md
  - dense-retrieval.md
historical_context: false
last_reviewed: 2026-07-11
---
# Sparse Retrieval

Sparse retrieval represents documents and queries with mostly-zero term features. The usual implementation is an [inverted index](inverted-indexes.md), and the usual scoring functions are [TF-IDF](tf-idf.md) or [BM25](bm25.md). It is "sparse" because each document uses only a tiny slice of the vocabulary.

## Mechanism

Let $x_d\in\mathbb R^{|V|}$ be a document vector over vocabulary $V$, with nonzero weights only for terms present in $d$. A simple lexical retrieval score is cosine similarity:

$$
s(q,d)=\frac{x_q^\top x_d}{\lVert x_q\rVert_2\lVert x_d\rVert_2}.
$$

BM25 changes the weighting and normalization, but the retrieval contract remains term-driven: candidate generation starts from matching terms, not semantic neighborhoods as in [dense retrieval](dense-retrieval.md).

## Worked example

This snippet constructs bag-of-words vectors for documents and a query, then scores documents by sparse cosine similarity.

```python
import re
from collections import Counter
import numpy as np

def tok(s):
    return re.findall(r"[a-z0-9]+", s.lower())

docs = [
    "bm25 lexical search handles exact product codes",
    "dense vector search retrieves semantic paraphrases",
    "hybrid search combines bm25 and dense signals",
]
query = tok("bm25 search dense")
tdocs = [tok(d) for d in docs]
vocab = sorted(set(sum(tdocs, [])))
X = np.array([[Counter(d)[t] for t in vocab] for d in tdocs], dtype=float)
q = np.array([Counter(query)[t] for t in vocab], dtype=float)
scores = X @ q / (np.linalg.norm(X, axis=1) * np.linalg.norm(q))
print("vocab_size", len(vocab))
print("cosine_scores", [(i + 1, round(float(s), 3)) for i, s in enumerate(scores)])
```

Observed output:

```text
vocab_size 16
cosine_scores [(1, 0.436), (2, 0.471), (3, 0.655)]
```

The third document wins because it overlaps all query terms. This is also why sparse retrieval is reliable for exact entities and brittle for paraphrases.

## Where it fits

Sparse retrieval is usually the first stage in production search because it is fast, debuggable, and cheap to update. [Hybrid search](hybrid-search.md) adds dense or learned signals when exact lexical overlap is insufficient. [Reranking](reranking.md) can then spend more compute on the top sparse candidates.

## Caveats

Vocabulary mismatch is the central failure mode: `terminate recurring billing` may miss `cancel subscription` unless analyzers, synonyms, or learned sparse expansions bridge the gap. Sparse scoring also overvalues terms that are rare for accidental reasons, such as typos or one-off IDs, unless query rewriting and field-specific boosts are controlled.

## References

- [Manning, Raghavan, and Schuetze, Introduction to Information Retrieval: Scoring and term weighting](https://nlp.stanford.edu/IR-book/html/htmledition/scoring-term-weighting-and-the-vector-space-model-1.html)
- [Manning, Raghavan, and Schuetze, Introduction to Information Retrieval: Computing scores in a complete search system](https://nlp.stanford.edu/IR-book/html/htmledition/computing-scores-in-a-complete-search-system-1.html)

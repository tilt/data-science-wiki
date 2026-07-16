---
title: TF-IDF
slug: information-retrieval-and-search/tf-idf
description: "Term-frequency inverse-document-frequency weighting for sparse lexical vectors."
area: information-retrieval-and-search
topics:
  - tf-idf
level: foundational
status: review
page_type: algorithm
aliases:
  - TF IDF
  - term frequency inverse document frequency
prerequisites:
  - index.md
related:
  - bm25.md
  - sparse-retrieval.md
  - inverted-indexes.md
  - ranking-and-retrieval-metrics.md
historical_context: false
last_reviewed: 2026-07-11
---

# TF-IDF

TF-IDF turns text into a sparse weighted vector: frequent terms in one document get larger weights, while terms that appear in many documents get discounted. It is the vector-space ancestor of [BM25](bm25.md) and a useful baseline for [sparse retrieval](sparse-retrieval.md), clustering, and quick lexical similarity checks.

## Defining math

For term $t$ and document $d$,

$$
w_{t,d}=\operatorname{tf}_{t,d}\cdot \operatorname{idf}_t,
\qquad
\operatorname{idf}_t=\log\frac{N}{\operatorname{df}_t}.
$$

Here $w_{t,d}$ is the weight for term $t$ in document $d$, $\operatorname{tf}_{t,d}$ is the term frequency inside that document, $N$ is the number of documents in the corpus, and $\operatorname{df}_t$ is the number of documents containing the term. A term gets a high weight when it appears in the document but not in many other documents.

Many implementations smooth and normalize. scikit-learn's default `TfidfVectorizer` uses smoothed IDF,

$$
\operatorname{idf}_t=\log\frac{1+N}{1+\operatorname{df}_t}+1,
$$

then L2-normalizes rows so cosine similarity is just a dot product between query and document vectors. Unlike [inverted indexes](inverted-indexes.md), which are storage structures, TF-IDF is a weighting scheme over the postings or term-document matrix.

## Worked example

This snippet vectorizes documents with TF-IDF, scores them against a query, and prints the resulting ranked order.

```python
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

docs = [
    "bm25 lexical search handles exact product codes",
    "dense vector search retrieves semantic paraphrases",
    "hybrid search combines bm25 and dense signals",
]
query = "bm25 search dense"
vec = TfidfVectorizer(norm="l2")
X = vec.fit_transform(docs)
scores = (X @ vec.transform([query]).T).toarray().ravel()
print("terms", vec.get_feature_names_out().tolist())
print("scores", [(i + 1, round(float(s), 3)) for i, s in enumerate(scores)])
print("rank", [int(i + 1) for i in np.argsort(scores)[::-1]])
```

Observed output:

```text
terms ['and', 'bm25', 'codes', 'combines', 'dense', 'exact', 'handles', 'hybrid', 'lexical', 'paraphrases', 'product', 'retrieves', 'search', 'semantic', 'signals', 'vector']
scores [(1, 0.31), (2, 0.34), (3, 0.523)]
rank [3, 2, 1]
```

Document 3 ranks first because it shares all three query terms. The scores are cosine similarities between normalized sparse vectors, so adding many unrelated terms to a document can reduce its similarity even if the matched terms remain present.

## Intuition

TF says "this word matters inside this document"; IDF says "this word is not everywhere." Their product highlights terms that distinguish a document from the collection. That makes TF-IDF strong for exact vocabulary but weaker than [dense retrieval](dense-retrieval.md) when two texts use different words for the same intent.

## Caveats

TF-IDF does not saturate term frequency the way [BM25](bm25.md) does, so repeated tokens can have too much influence unless sublinear TF or normalization is used. It also inherits analyzer choices: tokenization, casing, stop words, and stemming decide what counts as the same term. In search systems, evaluate it with [ranking metrics](ranking-and-retrieval-metrics.md), not only nearest-neighbor-looking scores.

## References

- [Manning, Raghavan, and Schuetze, Introduction to Information Retrieval: Scoring and term weighting](https://nlp.stanford.edu/IR-book/html/htmledition/scoring-term-weighting-and-the-vector-space-model-1.html)
- [Manning, Raghavan, and Schuetze, Introduction to Information Retrieval: Term frequency and weighting](https://nlp.stanford.edu/IR-book/html/htmledition/term-frequency-and-weighting-1.html)
- [scikit-learn API: TfidfVectorizer](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html)

> [!nav]
> **Section** — [Information Retrieval and Search](index.md)
>
> [BM25 →](bm25.md)

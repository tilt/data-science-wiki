---
title: Inverted Indexes
slug: information-retrieval-and-search/inverted-indexes
description: "Postings-list data structures that make lexical search efficient."
area: information-retrieval-and-search
topics:
  - inverted-indexes
level: foundational
status: review
page_type: concept
aliases:
  - inverted index
prerequisites:
  - index.md
related:
  - bm25.md
  - tf-idf.md
  - sparse-retrieval.md
  - elasticsearch.md
historical_context: false
last_reviewed: 2026-07-11
---

# Inverted Indexes

An inverted index maps each term to the documents that contain it. It is the storage mechanism that makes [sparse retrieval](sparse-retrieval.md), [TF-IDF](tf-idf.md), and [BM25](bm25.md) practical: a query only touches postings for its terms instead of scanning every document.

## Mechanism

A minimal postings list stores

$$
\operatorname{postings}(t)=\{(d,\operatorname{tf}_{t,d},[p_1,p_2,\ldots])\},
$$

where $d$ is a document ID, $\operatorname{tf}_{t,d}$ is term frequency, and positions $p_i$ support phrase and proximity queries. Boolean retrieval intersects postings lists; ranked retrieval adds document statistics such as field length and document frequency.

## Worked example

This snippet builds a positional inverted index for a tiny corpus and intersects postings lists for an AND query.

```python
import re
from collections import defaultdict

docs = [
    "bm25 lexical search handles exact product codes",
    "dense vector search retrieves semantic paraphrases",
    "hybrid search combines bm25 and dense signals",
]
index = defaultdict(list)
for doc_id, text in enumerate(docs, start=1):
    positions = defaultdict(list)
    for pos, term in enumerate(re.findall(r"[a-z0-9]+", text.lower())):
        positions[term].append(pos)
    for term, pos_list in positions.items():
        index[term].append((doc_id, pos_list))

for term in ["bm25", "dense", "search"]:
    print(term, index[term])
print("and_candidates", sorted({d for d, _ in index["bm25"]} & {d for d, _ in index["search"]}))
```

Observed output:

```text
bm25 [(1, [0]), (3, [3])]
dense [(2, [0]), (3, [5])]
search [(1, [2]), (2, [2]), (3, [1])]
and_candidates [1, 3]
```

The query `bm25 AND search` only needs two postings lists and returns documents 1 and 3. A ranked engine can then score those candidates with [BM25](bm25.md), while a phrase query would use positions to check adjacency.

## Intuition

The index flips the document-term matrix. Instead of asking each document whether it has a term, the term points directly to matching documents. Compression, skip pointers, segment merges, and caching are engineering layers around this same contract.

## Caveats

Indexes are only as good as their analyzers. If `C++`, `c plus plus`, and `cpp` become unrelated terms, lexical search misses obvious matches. Updating an index is also not free: systems such as [Elasticsearch](elasticsearch.md) trade freshness, segment merge cost, and query latency.

## References

- [Manning, Raghavan, and Schuetze, Introduction to Information Retrieval: Boolean retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/boolean-retrieval-1.html)
- [Manning, Raghavan, and Schuetze, Introduction to Information Retrieval: Term vocabulary and postings lists](https://nlp.stanford.edu/IR-book/html/htmledition/the-term-vocabulary-and-postings-lists-1.html)

---
title: Semantic Textual Similarity
slug: natural-language-processing/semantic-textual-similarity
description: "Scoring whether two text units express the same or related meaning."
area: natural-language-processing
topics:
  - semantic-textual-similarity
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - embeddings.md
  - tokenization.md
  - text-preprocessing.md
  - entity-linking-and-matching.md
  - ../12-information-retrieval-and-search/dense-retrieval.md
historical_context: false
last_reviewed: 2026-07-11
---

# Semantic Textual Similarity

Semantic textual similarity (STS) scores whether two pieces of text mean the same thing or are useful substitutes in a task. It is broader than lexical overlap: "terminate my subscription" and "cancel my plan" should be close even with different words. STS often uses [embeddings](embeddings.md), while [entity linking and matching](entity-linking-and-matching.md) adds canonical identifiers when names must resolve to records.

## Defining mechanism

A bi-encoder embeds two texts independently and compares vectors:

$$
s(a,b)=\operatorname{cos}(f_\theta(a),f_\theta(b)).
$$

A cross-encoder instead scores a concatenated pair, $s(a,b)=g_\theta([a;b])$, which can model richer token interactions but must run once per pair. The bi-encoder is faster for retrieval because vectors can be indexed; the cross-encoder is often better for reranking.

## Worked example

This snippet uses TF-IDF cosine similarity to compare three short utterances and identify the nearest sentence to a cancellation request.

```python
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

np.random.seed(7)
texts = ["cancel my subscription", "terminate my plan",
         "where is my invoice", "delete the account"]
X = TfidfVectorizer().fit_transform(texts)
S = (X @ X.T).toarray()
print("sim_cancel_terminate", round(S[0, 1], 3))
print("sim_cancel_invoice", round(S[0, 2], 3))
print("nearest_to_cancel", texts[int(np.argsort(S[0])[-2])])
```

Observed output:

```text
sim_cancel_terminate 0.169
sim_cancel_invoice 0.142
nearest_to_cancel terminate my plan
```

This TF-IDF baseline barely separates the paraphrase from the invoice query because it has only the word `my` in common. Stronger sentence embeddings are designed to fix exactly that weakness.

## Caveats

STS scores are not truth labels. Two sentences can be semantically similar but have opposite business actions, different entities, or different time constraints. [Text preprocessing](text-preprocessing.md) can remove crucial negation or identifiers, and [tokenization](tokenization.md) can fragment names. Evaluate STS with examples that match the downstream use: deduplication, search, clustering, or support-ticket routing.

## References

- [Reimers and Gurevych, Sentence-BERT](https://aclanthology.org/D19-1410/)
- [Manning, Raghavan, and Schutze, Introduction to Information Retrieval: The vector space model](https://nlp.stanford.edu/IR-book/html/htmledition/the-vector-space-model-for-scoring-1.html)
- [scikit-learn API: cosine_similarity](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html)

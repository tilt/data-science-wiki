---
title: Entity Linking and Matching
slug: natural-language-processing/entity-linking-and-matching
description: "Resolving mentions or records to canonical entities under ambiguity, aliases, and noisy text."
area: natural-language-processing
topics:
  - entity-linking-and-matching
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - named-entity-recognition.md
  - information-extraction.md
  - semantic-textual-similarity.md
  - embeddings.md
  - evaluation-of-nlp-systems.md
historical_context: false
last_reviewed: 2026-07-11
---

# Entity Linking and Matching

Entity linking maps a text mention to a canonical identifier; entity matching decides whether two records refer to the same real-world entity. It usually follows [named entity recognition](named-entity-recognition.md) or [information extraction](information-extraction.md). Unlike [semantic textual similarity](semantic-textual-similarity.md), the output must be a stable id, not just a high similarity score.

## Defining mechanism

A practical linker retrieves candidates and scores mention-context compatibility:

$$
\hat e=\arg\max_{e\in C(m)} \left[\alpha\,\operatorname{sim}(\phi(m),\phi(e))+\beta\log P(e)\right].
$$

The representation $\phi$ can be character n-grams, sparse TF-IDF, [embeddings](embeddings.md), or a cross-encoder over mention and candidate description. Priors help with common entities but can suppress rare correct matches.

## Worked example

This snippet vectorizes entity mentions and candidates with TF-IDF, then links each mention to the candidate with highest cosine similarity.

```python
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

np.random.seed(7)
mentions = ["Apple refund", "apple pie", "Paris office"]
cands = ["Q312 Apple Inc iphone mac refund support",
         "Q89 apple fruit pie food",
         "Q90 Paris France office city"]
X = TfidfVectorizer(analyzer="char_wb", ngram_range=(3, 4)).fit_transform(mentions + cands)
S = (X[:3] @ X[3:].T).toarray()
for m, row in zip(mentions, S):
    j = int(row.argmax())
    print(m, "->", cands[j].split()[0], round(float(row[j]), 3))
```

Observed output:

```text
Apple refund -> Q312 0.453
apple pie -> Q89 0.49
Paris office -> Q90 0.632
```

Character n-grams handle capitalization and partial overlap. The extra context word `refund` pushes `Apple refund` toward the company support entity rather than the fruit.

## Caveats

Alias tables age quickly. Mergers, product renames, transliteration, and abbreviations all change candidate generation. A false link can poison analytics more severely than an abstention, so expose confidence and route uncertain matches for review. Evaluate by entity id, not only mention span, and inspect ambiguous names separately.

## References

- [Jurafsky and Martin, Speech and Language Processing, 3rd ed. draft](https://web.stanford.edu/~jurafsky/slp3/)
- [Manning, Raghavan, and Schutze, Introduction to Information Retrieval: Near-duplicates and shingling](https://nlp.stanford.edu/IR-book/html/htmledition/near-duplicates-and-shingling-1.html)
- [scikit-learn API: TfidfVectorizer](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html)

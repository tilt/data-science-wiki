---
title: Text Preprocessing
slug: natural-language-processing/text-preprocessing
description: "Normalizing raw text before tokenization, feature extraction, and modelling."
area: natural-language-processing
topics:
  - text-preprocessing
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - tokenization.md
  - text-classification.md
  - embeddings.md
  - information-extraction.md
  - evaluation-of-nlp-systems.md
historical_context: false
last_reviewed: 2026-07-11
---

# Text Preprocessing

Text preprocessing is the contract that turns messy strings into the representation a model will actually see. It can include Unicode normalization, casing, punctuation handling, redaction, de-duplication, and domain-specific replacement such as mapping dollar amounts to `MONEY`. It sits before [tokenization](tokenization.md), changes the feature space used by [text classification](text-classification.md), and can either preserve or destroy evidence needed by [information extraction](information-extraction.md).

## Defining mechanism

For a document $d$, preprocessing applies a deterministic transformation before vectorization:

$$
\tilde d = g(d), \qquad x_j = c(t_j,\tilde d),
$$

where $g$ is the normalization policy, $t_j$ is a token type, and $c$ counts or weights the token. The important property is consistency: train, validation, retrieval index, and live inference must apply the same $g$. A mismatch creates features the model never learned or hides features it expects.

## Worked example

This snippet normalizes small text examples before vectorization and compares the raw and normalized vocabulary sizes and features.

```python
import numpy as np, re
from sklearn.feature_extraction.text import CountVectorizer

np.random.seed(7)
docs = ["Café prices: $5.00!!!", "Cafe price is 5 dollars", "CAFÉ pricing? five dollars."]

def normalize(s):
    s = s.lower().replace("é", "e")
    s = re.sub(r"\$\d+(?:\.\d+)?", " MONEY ", s)
    s = re.sub(r"[^a-z\s]", " ", s)
    return re.sub(r"\s+", " ", s).strip()

raw = CountVectorizer().fit_transform(docs)
norm_docs = [normalize(d) for d in docs]
vec = CountVectorizer(stop_words=["is"]).fit(norm_docs)
norm = vec.transform(norm_docs)
print("normalized", norm_docs)
print("raw_vocab_size", raw.shape[1], "normalized_vocab_size", norm.shape[1])
print("normalized_features", vec.get_feature_names_out().tolist())
```

Observed output:

```text
normalized ['cafe prices', 'cafe price is dollars', 'cafe pricing five dollars']
raw_vocab_size 9 normalized_vocab_size 6
normalized_features ['cafe', 'dollars', 'five', 'price', 'prices', 'pricing']
```

The accent and case policy collapses `Café`, `Cafe`, and `CAFÉ`, while punctuation removal and stop-word handling shrink the vocabulary. That helps this toy corpus, but the same policy would be harmful if capitalization or exact currency symbols were labels.

## Caveats

Preprocessing is not harmless cleanup. Lowercasing can erase product names, regex redaction can remove the only entity to link, and aggressive stop-word removal can break phrase meaning. Keep raw text for audit, version the preprocessing function with the model, and inspect slice errors in [evaluation of NLP systems](evaluation-of-nlp-systems.md), especially after changing [embeddings](embeddings.md) or tokenizer settings.

## References

- [Manning, Raghavan, and Schutze, Introduction to Information Retrieval: Tokenization](https://nlp.stanford.edu/IR-book/html/htmledition/tokenization-1.html)
- [scikit-learn User Guide: Text feature extraction](https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction)

> [!nav]
> **Section** — [Natural Language Processing](index.md)
>
> [Tokenization →](tokenization.md)

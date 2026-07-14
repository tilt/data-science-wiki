---
title: Summarization
slug: natural-language-processing/summarization
description: "Condensing text while preserving the information required for a reader or downstream task."
area: natural-language-processing
topics:
  - summarization
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - language-modelling.md
  - decoder-only-transformers.md
  - semantic-textual-similarity.md
  - text-classification.md
  - evaluation-of-nlp-systems.md
historical_context: false
last_reviewed: 2026-07-11
---
# Summarization

Summarization condenses one or more texts for a purpose: incident handoff, meeting recap, article abstract, legal brief, or search-result snippet. Extractive summarization selects source spans; abstractive summarization uses [language modelling](language-modelling.md) to generate new text. [Decoder-only transformers](decoder-only-transformers.md) are common generators, while [semantic textual similarity](semantic-textual-similarity.md) helps detect redundancy.

## Defining mechanism

An extractive centroid baseline scores each sentence by similarity to the document centroid:

$$
c=\frac{1}{m}\sum_{j=1}^m x_j,\qquad \operatorname{score}(s_i)=x_i^\top c.
$$

Abstractive systems instead model

$$
P(y_{1:T}\mid x)=\prod_t P(y_t\mid y_{<t},x),
$$

then decode a summary sequence. The key evaluation question is whether the output preserves decision-critical facts, not whether it is merely fluent.

## Worked example

```python
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

np.random.seed(7)
sents = [
    "The database migration finished at 09:00 with no failed checks.",
    "Checkout latency rose after the deployment and triggered alerts.",
    "Support tickets mention slow payments and duplicate retries.",
    "Engineers rolled back the payment service and latency returned to normal.",
]
X = TfidfVectorizer(stop_words="english").fit_transform(sents)
centroid = np.asarray(X.mean(axis=0)).ravel()
scores = np.asarray(X @ centroid).ravel()
order = np.argsort(scores)[::-1][:2]
print("scores", [round(float(s), 3) for s in scores])
print("selected", [sents[i] for i in sorted(order)])
```

Observed output:

```text
scores [0.25, 0.275, 0.25, 0.275]
selected ['Checkout latency rose after the deployment and triggered alerts.', 'Engineers rolled back the payment service and latency returned to normal.']
```

The selected sentences capture the incident and resolution, but omit the support-ticket evidence. That omission may be fine for a status update and wrong for a customer-support handoff.

## Caveats

Reference-overlap metrics can miss factual errors, omissions, and unsupported claims. Abstractive systems can invent details; extractive systems can preserve irrelevant boilerplate. Define the summary schema and audience before evaluating, and include factual checks in [evaluation of NLP systems](evaluation-of-nlp-systems.md).

## References

- [Mihalcea and Tarau, TextRank: Bringing Order into Text](https://aclanthology.org/W04-3252/)
- [Lewis et al., BART: Denoising Sequence-to-Sequence Pre-training](https://arxiv.org/abs/1910.13461)
- [Papineni et al., BLEU: a Method for Automatic Evaluation of Machine Translation](https://aclanthology.org/P02-1040/)

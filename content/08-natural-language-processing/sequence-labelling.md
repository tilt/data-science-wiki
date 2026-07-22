---
title: Sequence Labelling
slug: natural-language-processing/sequence-labelling
description: "Assigning token-level labels for spans, slots, tags, and structured text annotations."
area: natural-language-processing
topics:
  - sequence-labelling
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - named-entity-recognition.md
  - information-extraction.md
  - bert-style-encoders.md
  - tokenization.md
  - evaluation-of-nlp-systems.md
historical_context: false
last_reviewed: 2026-07-22
---

# Sequence Labelling

Sequence labelling assigns an output tag to each token. [Named entity recognition](named-entity-recognition.md), part-of-speech tagging, slot filling, and some [information extraction](information-extraction.md) pipelines are sequence labelling tasks. The labels depend on [tokenization](tokenization.md), so the model predicts over model tokens even when humans annotate words or spans.

## Per-token classification

A token classifier estimates

$$
P(y_i=k\mid x_{1:n})=\operatorname{softmax}(Wh_i+b)_k,
$$

where $h_i$ is the contextual representation from an encoder such as a [BERT-style encoder](bert-style-encoders.md). A linear-chain CRF adds transition scores between adjacent labels:

$$
P(y\mid x)=\frac{\exp\sum_i (s_i(y_i)+T_{y_{i-1},y_i})}{Z(x)}.
$$

BIO tags encode span boundaries with labels like `B-LOC`, `I-LOC`, and `O`.

## Worked example

This snippet evaluates token-level sequence labels with accuracy, macro-F1 excluding `O`, and a label-ordered confusion matrix.

```python
import numpy as np
from sklearn.metrics import accuracy_score, confusion_matrix, f1_score

np.random.seed(7)
gold = [["O", "B-LOC", "O", "B-DATE"], ["B-PER", "O", "B-ORG", "I-ORG"]]
pred = [["O", "B-LOC", "O", "O"], ["B-PER", "O", "B-ORG", "I-ORG"]]
labels = ["B-DATE", "B-LOC", "B-ORG", "B-PER", "I-ORG", "O"]
y_true, y_pred = sum(gold, []), sum(pred, [])
print("token_accuracy", round(accuracy_score(y_true, y_pred), 3))
print("macro_f1_no_O", round(f1_score(y_true, y_pred, labels=labels[:-1], average="macro", zero_division=0), 3))
print("confusion_labels", labels)
print(confusion_matrix(y_true, y_pred, labels=labels))
```

Observed output:

```text
token_accuracy 0.875
macro_f1_no_O 0.8
confusion_labels ['B-DATE', 'B-LOC', 'B-ORG', 'B-PER', 'I-ORG', 'O']
[[0 0 0 0 0 1]
 [0 1 0 0 0 0]
 [0 0 1 0 0 0]
 [0 0 0 1 0 0]
 [0 0 0 0 1 0]
 [0 0 0 0 0 3]]
```

Token accuracy looks high because `O` is common, but the date span was missed entirely. Span-level review is therefore mandatory for extraction tasks.

## Caveats

BIO legality matters: an `I-ORG` after `O` is ambiguous unless the decoder fixes or rejects it. Subword tokenization forces a policy for projecting word labels to pieces. Report token-level and span-level metrics separately in [evaluation of NLP systems](evaluation-of-nlp-systems.md).

## References

- [Jurafsky and Martin, Speech and Language Processing, 3rd ed. draft](https://web.stanford.edu/~jurafsky/slp3/)
- [scikit-learn API: f1_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.f1_score.html)

> [!nav]
> **Section** — [Natural Language Processing](index.md)
>
> [← Urgency Classification](urgency-classification.md) [Named Entity Recognition →](named-entity-recognition.md)

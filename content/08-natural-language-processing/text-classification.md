---
title: Text Classification
slug: natural-language-processing/text-classification
description: "Assigning document or message labels from text features and calibrated decision rules."
area: natural-language-processing
topics:
  - text-classification
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - topic-classification.md
  - urgency-classification.md
  - text-preprocessing.md
  - tokenization.md
  - evaluation-of-nlp-systems.md
historical_context: false
last_reviewed: 2026-07-11
---

# Text Classification

Text classification maps a text unit to one or more labels: a support ticket to a queue, a review to sentiment, a contract paragraph to a clause type. It is the supervised core behind [topic classification](topic-classification.md) and [urgency classification](urgency-classification.md), but the hard part is usually the label policy: what counts as billing, bug, abuse, or urgent must be annotated consistently before model choice matters.

## Defining mechanism

A classical pipeline turns text into a sparse vector and fits a classifier:

$$
x_{ij}=\operatorname{tfidf}(t_j,d_i), \qquad z_i = Wx_i+b,
$$

$$
P(y_i=k\mid d_i)=\operatorname{softmax}(z_i)_k
=\frac{\exp z_{ik}}{\sum_{c}\exp z_{ic}}.
$$

For labelled examples $(d_i,y_i)$, multinomial logistic regression minimizes cross-entropy,

$$
\mathcal L=-\sum_i \log P(y_i\mid d_i)+\lambda\lVert W\rVert_2^2.
$$

[Tokenization](tokenization.md) and [text preprocessing](text-preprocessing.md) decide which strings can become features; [evaluation of NLP systems](evaluation-of-nlp-systems.md) decides whether accuracy hides costly class-specific failures.

## Worked example

This snippet trains a TF-IDF logistic-regression text classifier and reports predictions, accuracy, and the confusion matrix on held-out examples.

```python
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.pipeline import make_pipeline

np.random.seed(7)
train = [
    ("billing invoice refund chargeback", "billing"),
    ("payment failed card invoice due", "billing"),
    ("refund request duplicate payment", "billing"),
    ("login password reset account locked", "account"),
    ("cannot sign in password token", "account"),
    ("two factor code login failed", "account"),
    ("app crashes after update stack trace", "bug"),
    ("error screen freezes on launch", "bug"),
    ("button broken mobile crash report", "bug"),
]
test = [
    ("invoice payment refund missing", "billing"),
    ("password reset login code", "account"),
    ("mobile app freezes after launch", "bug"),
    ("card chargeback login failed", "billing"),
]
Xtr, ytr = zip(*train)
Xte, yte = zip(*test)
clf = make_pipeline(
    TfidfVectorizer(ngram_range=(1, 2)),
    LogisticRegression(max_iter=1000, random_state=7),
).fit(Xtr, ytr)
pred = [str(x) for x in clf.predict(Xte)]
classes = [str(x) for x in clf.classes_]
print("predictions", list(zip(Xte, pred)))
print("accuracy", round(accuracy_score(yte, pred), 3))
print("confusion labels", classes)
print(confusion_matrix(yte, pred, labels=classes))
```

Observed output:

```text
predictions [('invoice payment refund missing', 'billing'), ('password reset login code', 'account'), ('mobile app freezes after launch', 'bug'), ('card chargeback login failed', 'account')]
accuracy 0.75
confusion labels ['account', 'billing', 'bug']
[[1 0 0]
 [1 1 0]
 [0 0 1]]
```

The mistake is interpretable: the mixed "chargeback login failed" ticket contains account words strong enough to override billing words. That is exactly the kind of error review that separates a useful classifier from a headline accuracy number.

## Caveats

Text classifiers exploit dataset-specific lexical shortcuts. Changing the product vocabulary, language mix, ticket template, or annotation guide can move the feature distribution even when the task name stays the same. Multi-label tasks need independent or structured label decisions rather than a forced single softmax class. For production routing, pair aggregate metrics with per-class errors, abstention rules, and examples from minority slices.

## References

- [Jurafsky and Martin, Speech and Language Processing, 3rd ed. draft](https://web.stanford.edu/~jurafsky/slp3/)
- [scikit-learn User Guide: Working with text data](https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction)
- [scikit-learn API: TfidfVectorizer](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html)

> **Learning path — Natural language processing:** ← [Decoder-Only Transformers](decoder-only-transformers.md) · [path overview](../00-home-and-navigation/learning-paths.md#natural-language-processing) · [Evaluation of NLP Systems](evaluation-of-nlp-systems.md) →

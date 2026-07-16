---
title: Document Understanding
slug: natural-language-processing/document-understanding
description: "Extracting meaning from documents by combining text, layout, tables, images, and metadata."
area: natural-language-processing
topics:
  - document-understanding
level: intermediate
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - ocr-and-handwritten-text-recognition.md
  - information-extraction.md
  - named-entity-recognition.md
  - text-preprocessing.md
  - evaluation-of-nlp-systems.md
historical_context: false
last_reviewed: 2026-07-11
---

# Document Understanding

Document understanding extracts meaning from pages where text alone is incomplete: forms, receipts, contracts, tables, scans, handwriting, stamps, and layout. It often starts with [OCR and handwritten text recognition](ocr-and-handwritten-text-recognition.md), then applies [information extraction](information-extraction.md), [named entity recognition](named-entity-recognition.md), table parsing, and validation rules.

## Defining mechanism

A layout-aware token representation combines text and geometry:

$$
h_i=f_\theta(\operatorname{text}_i, x_i^{\min}, y_i^{\min}, x_i^{\max}, y_i^{\max}, p_i),
$$

where $p_i$ is the page id. The model may classify tokens, link key-value pairs, or predict document type. The key difference from plain NLP is that "Total" above `$42.10` and "Total" in a footer can be distinguished by coordinates.

## Worked example

This snippet trains a simple token classifier using layout-style features and reports predicted token roles, accuracy, and the probability for an amount token.

```python
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

np.random.seed(7)
tokens = ["Invoice", "Total", "$42.10", "Due", "2026-08-01", "Thanks"]
y = np.array(["header", "key", "value", "key", "value", "other"])
X = np.array([[0, 1], [1, 1], [1, 0], [2, 1], [2, 0], [3, 0]], dtype=float)
clf = LogisticRegression(max_iter=1000, random_state=7).fit(X, y)
pred = [str(x) for x in clf.predict(X)]
print("predicted", list(zip(tokens, pred)))
print("training_accuracy", round(accuracy_score(y, pred), 3))
print("value_prob_for_amount", {str(clf.classes_[i]): round(float(clf.predict_proba([[1, 0]])[0, i]), 3) for i in range(len(clf.classes_))})
```

Observed output:

```text
predicted [('Invoice', 'header'), ('Total', 'key'), ('$42.10', 'value'), ('Due', 'key'), ('2026-08-01', 'value'), ('Thanks', 'other')]
training_accuracy 1.0
value_prob_for_amount {'header': 0.169, 'key': 0.224, 'other': 0.098, 'value': 0.508}
```

This toy model uses only vertical position and a lexical flag, but it shows the core idea: layout features help classify tokens as keys, values, headers, or other content.

## Caveats

Document systems fail when scan quality, templates, language, or page order shifts. OCR confidence should propagate into extraction confidence. Evaluation should include field exact match, source-span correctness, page-level failures, and human-review outcomes, not only token accuracy.

## References

- [Xu et al., LayoutLM: Pre-training of Text and Layout for Document Image Understanding](https://arxiv.org/abs/1912.13318)
- [Jurafsky and Martin, Speech and Language Processing, 3rd ed. draft](https://web.stanford.edu/~jurafsky/slp3/)

> **Section — [Natural Language Processing](index.md):** ← [OCR and Handwritten Text Recognition](ocr-and-handwritten-text-recognition.md) · [Evaluation of NLP Systems](evaluation-of-nlp-systems.md) →

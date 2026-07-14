---
title: Named Entity Recognition
slug: natural-language-processing/named-entity-recognition
description: "Detecting typed spans such as people, organizations, locations, dates, and products."
area: natural-language-processing
topics:
  - named-entity-recognition
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - sequence-labelling.md
  - information-extraction.md
  - entity-linking-and-matching.md
  - tokenization.md
  - evaluation-of-nlp-systems.md
historical_context: false
last_reviewed: 2026-07-11
---
# Named Entity Recognition

Named entity recognition (NER) detects spans and assigns entity types such as person, organization, location, date, product, or medication. It is a special case of [sequence labelling](sequence-labelling.md), and it often feeds [entity linking and matching](entity-linking-and-matching.md) or [information extraction](information-extraction.md). The output is not just a class; the exact span boundary is part of the prediction.

## Defining mechanism

NER commonly predicts BIO tags for tokens:

$$
\hat y_i=\arg\max_k P(y_i=k\mid x_{1:n}).
$$

The tag sequence is then converted into spans:

$$
\{(s,e,\tau): y_s=B\text{-}\tau,\ y_{s+1:e-1}=I\text{-}\tau\}.
$$

Evaluation usually requires exact span and type agreement, because confusing `Paris` as an organization instead of a location changes downstream behavior.

## Worked example

This snippet extracts BIO entity spans from gold and predicted tags, then computes span-level precision, recall, and F1.

```python
import numpy as np

np.random.seed(7)
def spans(tags):
    out, start, typ = [], None, None
    for i, t in enumerate(tags + ["O"]):
        if t.startswith("B-") or (t == "O" and typ):
            if typ:
                out.append((start, i, typ)); start, typ = None, None
        if t.startswith("B-"):
            start, typ = i, t[2:]
        elif t.startswith("I-") and typ is None:
            start, typ = i, t[2:]
    return out

gold = ["B-PER", "I-PER", "O", "B-LOC", "O", "B-ORG"]
pred = ["B-PER", "I-PER", "O", "B-ORG", "O", "B-ORG"]
G, P = set(spans(gold)), set(spans(pred))
tp = len(G & P)
precision, recall = tp / len(P), tp / len(G)
f1 = 2 * precision * recall / (precision + recall)
print("gold_spans", sorted(G))
print("pred_spans", sorted(P))
print("span_precision", round(precision, 3), "span_recall", round(recall, 3), "span_f1", round(f1, 3))
```

Observed output:

```text
gold_spans [(0, 2, 'PER'), (3, 4, 'LOC'), (5, 6, 'ORG')]
pred_spans [(0, 2, 'PER'), (3, 4, 'ORG'), (5, 6, 'ORG')]
span_precision 0.667 span_recall 0.667 span_f1 0.667
```

The model found the boundary for token 3 but assigned the wrong type, so that span is false positive and false negative under exact typed-span scoring.

## Caveats

Entity schemas are domain-specific. `Apple` can be a company, food item, record label, or product family; dates and locations may be nested inside larger legal or medical spans. [Tokenization](tokenization.md) can split names into awkward pieces, and aggregate F1 can hide severe errors on rare entity types.

## References

- [Jurafsky and Martin, Speech and Language Processing, 3rd ed. draft](https://web.stanford.edu/~jurafsky/slp3/)
- [Finkel, Grenager, and Manning, Incorporating Non-local Information into Information Extraction Systems](https://aclanthology.org/P05-1045/)
- [scikit-learn API: f1_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.f1_score.html)

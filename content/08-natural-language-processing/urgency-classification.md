---
title: Urgency Classification
slug: natural-language-processing/urgency-classification
description: "Classifying text by time-criticality and expected cost of delayed action."
area: natural-language-processing
topics:
  - urgency-classification
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - text-classification.md
  - topic-classification.md
  - evaluation-of-nlp-systems.md
  - text-preprocessing.md
  - semantic-textual-similarity.md
historical_context: false
last_reviewed: 2026-07-11
---
# Urgency Classification

Urgency classification predicts how quickly a text needs action: low, normal, urgent, safety-critical, or escalation-worthy. It is a [text classification](text-classification.md) task, but unlike [topic classification](topic-classification.md), the loss is asymmetric: missing a true outage is usually worse than over-escalating a harmless typo.

## Defining mechanism

A classifier can estimate class probabilities $p(y\mid d)$ and then choose the action with minimum expected cost:

$$
\hat a=\arg\min_a \sum_y C(a,y)P(y\mid d).
$$

The cost matrix $C$ encodes the operational policy. That separates language evidence from business risk and makes threshold changes auditable in [evaluation of NLP systems](evaluation-of-nlp-systems.md).

## Worked example

The example trains a tiny text classifier and then applies a cost matrix, showing that the final urgency action can differ from the highest-probability label.

```python
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix
from sklearn.pipeline import make_pipeline

np.random.seed(7)
train = [
    ("server down all users cannot login", "urgent"),
    ("payment page broken for checkout", "urgent"),
    ("security incident leaked token", "urgent"),
    ("how do i change avatar", "normal"),
    ("question about billing receipt", "normal"),
    ("feature request dark mode", "normal"),
    ("typo on help page", "low"),
    ("newsletter unsubscribe please", "low"),
    ("minor copy issue footer", "low"),
]
test = [("all users see checkout error", "urgent"), ("can i update my billing receipt", "normal"),
        ("typo in account page", "low"), ("cannot login token leaked", "urgent")]
Xtr, ytr = zip(*train); Xte, yte = zip(*test)
pipe = make_pipeline(TfidfVectorizer(), LogisticRegression(max_iter=1000, random_state=7)).fit(Xtr, ytr)
classes = [str(c) for c in pipe.classes_]
proba = pipe.predict_proba(Xte)
C = np.array([[0, 1, 5], [1, 0, 3], [2, 2, 0]])
risk = proba @ C.T
pred = [classes[i] for i in risk.argmin(axis=1)]
print("classes", classes)
print("risk_min_predictions", list(zip(Xte, pred)))
print("prob_first", {classes[i]: round(float(proba[0, i]), 3) for i in range(len(classes))})
print("confusion")
print(confusion_matrix(yte, pred, labels=classes))
```

Observed output:

```text
classes ['low', 'normal', 'urgent']
risk_min_predictions [('all users see checkout error', 'urgent'), ('can i update my billing receipt', 'normal'), ('typo in account page', 'normal'), ('cannot login token leaked', 'urgent')]
prob_first {'low': 0.267, 'normal': 0.271, 'urgent': 0.463}
confusion
[[0 1 0]
 [0 1 0]
 [0 0 2]]
```

The typo ticket is over-escalated from low to normal, which is acceptable under this cost matrix compared with missing urgent tickets.

## Caveats

Urgency labels drift when staffing, SLAs, and product state change. Training data often under-represents rare severe incidents, so synthetic examples should be reviewed by domain experts and separated from natural traffic. Use [semantic textual similarity](semantic-textual-similarity.md) for near-duplicate incident retrieval, but do not let similarity replace explicit risk labels.

## References

- [scikit-learn documentation: classification metrics](https://scikit-learn.org/stable/modules/model_evaluation.html#classification-metrics)
- [scikit-learn API: TfidfVectorizer](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html)
- [Jurafsky and Martin, Speech and Language Processing, 3rd ed. draft](https://web.stanford.edu/~jurafsky/slp3/)

---
title: Topic Classification
slug: natural-language-processing/topic-classification
description: "Assigning documents to subject categories from lexical and semantic evidence."
area: natural-language-processing
topics:
  - topic-classification
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - text-classification.md
  - urgency-classification.md
  - text-preprocessing.md
  - embeddings.md
  - evaluation-of-nlp-systems.md
historical_context: false
last_reviewed: 2026-07-11
---
# Topic Classification

Topic classification is [text classification](text-classification.md) where labels name subject matter: finance, cooking, machine learning, policy, support area, or product line. It is usually less time-sensitive than [urgency classification](urgency-classification.md), but it is more exposed to vocabulary drift because topics are often recognized by words, names, and phrases.

## Defining mechanism

A standard multiclass topic classifier vectorizes a document and chooses the largest class score:

$$
\hat y=\arg\max_k \left(w_k^\top x+b_k\right),
$$

where $x$ may be TF-IDF features from [text preprocessing](text-preprocessing.md), averaged [embeddings](embeddings.md), or encoder representations. Multinomial logistic regression turns the same scores into probabilities with softmax and trains with cross-entropy.

## Worked example

```python
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import f1_score
from sklearn.pipeline import make_pipeline

np.random.seed(7)
train = [
    ("gpu kernel cuda memory tensor", "ml"),
    ("transformer attention gradient model", "ml"),
    ("dataset feature classifier accuracy", "ml"),
    ("quarterly revenue margin cashflow", "finance"),
    ("invoice tax audit expense", "finance"),
    ("stock earnings guidance revenue", "finance"),
    ("recipe basil tomato pasta bake", "cooking"),
    ("sourdough starter flour oven", "cooking"),
    ("knife saute garlic soup", "cooking"),
]
test = [("attention model accuracy", "ml"), ("tax invoice expense", "finance"),
        ("tomato soup garlic", "cooking"), ("revenue model forecast", "finance")]
Xtr, ytr = zip(*train); Xte, yte = zip(*test)
pipe = make_pipeline(TfidfVectorizer(), LogisticRegression(max_iter=1000, random_state=7)).fit(Xtr, ytr)
pred = [str(x) for x in pipe.predict(Xte)]
print("predictions", list(zip(Xte, pred)))
print("macro_f1", round(f1_score(yte, pred, average="macro"), 3))
features = np.array(pipe.named_steps["tfidfvectorizer"].get_feature_names_out())
for cls, row in zip(pipe.named_steps["logisticregression"].classes_, pipe.named_steps["logisticregression"].coef_):
    print(str(cls), features[np.argsort(row)[-3:]][::-1].tolist())
```

Observed output:

```text
predictions [('attention model accuracy', 'ml'), ('tax invoice expense', 'finance'), ('tomato soup garlic', 'cooking'), ('revenue model forecast', 'finance')]
macro_f1 1.0
cooking ['oven', 'knife', 'flour']
finance ['revenue', 'expense', 'tax']
ml ['transformer', 'model', 'attention']
```

The top-weighted features are readable because this is a sparse linear model; that helps audit topic definitions and catch mislabeled training examples.

## Caveats

Topics are rarely mutually exclusive. A product incident can be both billing and reliability, so multi-label evaluation may be more honest than a single class. New product names, seasonal events, or imported documents can shift vocabulary. Track examples, not only macro-F1, in [evaluation of NLP systems](evaluation-of-nlp-systems.md).

## References

- [Jurafsky and Martin, Speech and Language Processing, 3rd ed. draft](https://web.stanford.edu/~jurafsky/slp3/)
- [scikit-learn User Guide: Text feature extraction](https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction)
- [scikit-learn documentation: classification metrics](https://scikit-learn.org/stable/modules/model_evaluation.html#classification-metrics)

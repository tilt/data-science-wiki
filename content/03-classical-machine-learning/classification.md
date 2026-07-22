---
title: Classification
slug: classical-machine-learning/classification
description: "Predicting discrete labels from features, usually through scores, probabilities, and thresholds."
area: classical-machine-learning
topics:
  - classification
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - logistic-regression.md
  - support-vector-machines.md
  - evaluation-metrics.md
  - class-imbalance.md
  - calibration.md
historical_context: false
last_reviewed: 2026-07-22
---

# Classification

Classification predicts a discrete label $y\in\{1,\dots,K\}$. Some classifiers estimate probabilities, as [logistic regression](logistic-regression.md) does; others produce scores or margins, as [support vector machines](support-vector-machines.md) do.

## From scores to decisions

A classifier's job is to turn a score into an action. A **probabilistic** classifier outputs one probability per class, and the prediction is the class with the highest probability. For a three-class example with $\hat p(x)=(0.1,\,0.6,\,0.3)$ over classes $\{A,B,C\}$, the prediction is $\arg\max = B$.

A **binary** classifier usually exposes a single score $s(x)$ and a threshold $t$: predict positive when $s(x)\ge t$. If $s(x)=0.42$ and $t=0.5$, the prediction is negative because $0.42<0.5$; lowering the threshold to $t=0.4$ flips the same example to positive. The model has not changed — only the decision rule has. That is why the ranking can be good even when the default threshold is wrong, and why high [accuracy](evaluation-metrics.md#classification-metrics) can be worthless when one class dominates. Probability estimates also need [calibration](calibration.md) before they are used as risks or expected costs.

## Scores and thresholds

A probabilistic classifier estimates $\hat p_k(x)=P(Y=k\mid X=x)$ and predicts $\hat y=\arg\max_k\hat p_k(x)$. Binary classifiers often expose a thresholded rule $\hat y(t)=\mathbf 1\{s(x)\ge t\}$, where $s(x)$ is a model score, $t$ a chosen threshold, and the indicator $\mathbf 1\{\cdot\}$ is $1$ when the score clears the threshold. The threshold $t$ is part of the decision system, not the model alone. Changing it moves [precision, recall](evaluation-metrics.md#classification-metrics), false-positive rate, and false-negative rate, so [evaluation metrics](evaluation-metrics.md) and [class imbalance](class-imbalance.md) are central.

## Baseline versus a real classifier

The example contrasts a majority-class baseline with a logistic classifier, making clear why accuracy alone is a weak classification summary.

```python
from sklearn.datasets import make_classification
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
from sklearn.model_selection import train_test_split

X, y = make_classification(n_samples=220, n_features=5, n_informative=3,
                           weights=[0.7, 0.3], random_state=10)
Xtr, Xte, ytr, yte = train_test_split(X, y, stratify=y, random_state=10)
for name, est in [("dummy", DummyClassifier(strategy="most_frequent")),
                  ("logistic", LogisticRegression(max_iter=1000, random_state=10))]:
    est.fit(Xtr, ytr)
    pred = est.predict(Xte)
    recall = precision_recall_fscore_support(yte, pred, zero_division=0)[1][1]
    print(name, "accuracy", round(accuracy_score(yte, pred), 3), "recall_pos", round(recall, 3))
```

Observed output:

```text
dummy accuracy 0.691 recall_pos 0.0
logistic accuracy 0.945 recall_pos 0.882
```

The dummy classifier looks decent by accuracy because the majority class is common, but it finds none of the positive class.

## Caveats

Do not report only [accuracy](evaluation-metrics.md#classification-metrics) when class priors are skewed or costs are asymmetric. Multiclass labels may have hierarchy or ordinal structure that ordinary argmax ignores. Train-test splits must preserve deployment boundaries; otherwise [data leakage](data-leakage.md) can inflate every metric.

## References

- [scikit-learn User Guide: Classification metrics](https://scikit-learn.org/stable/modules/model_evaluation.html#classification-metrics)
- [An Introduction to Statistical Learning](https://www.statlearning.com/)

> [!nav]
> **Section** — [Classical Machine Learning](index.md)
>
> [← Regression](regression.md) [Linear Models →](linear-models.md)

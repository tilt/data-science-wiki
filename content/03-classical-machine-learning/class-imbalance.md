---
title: Class Imbalance
slug: classical-machine-learning/class-imbalance
description: "Classification settings where rare classes make default metrics and thresholds misleading."
area: classical-machine-learning
topics:
  - class-imbalance
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - evaluation-metrics.md
  - classification.md
  - calibration.md
  - logistic-regression.md
historical_context: false
last_reviewed: 2026-07-11
---

# Class Imbalance

Class imbalance means the class prior $P(Y=k)$ is highly uneven. The problem is not rarity by itself; it is that default training objectives, thresholds, and [evaluation metrics](evaluation-metrics.md) may optimize the majority class while missing the decision that matters.

## Defining math

For binary prevalence $\pi=P(Y=1)$, thresholding predicts $\hat y=\mathbf 1\{s(x)\ge t\}$. Minority-class precision and recall are

$$
precision=\frac{TP}{TP+FP}, \qquad recall=\frac{TP}{TP+FN}.
$$

Balanced accuracy averages recall across classes; in binary classification it is $(TPR+TNR)/2$, where $TPR$ is sensitivity and $TNR$ is specificity. PR-AUC summarizes the precision-recall curve for the rare positive class and is often computed through average precision,

$$
\operatorname{AP}=\sum_j (R_j-R_{j-1})P_j,
$$

where $P_j$ and $R_j$ are precision and recall after the $j$th ranked prediction. It is often more diagnostic than ROC-AUC when the negative class dominates.

Class weighting changes empirical risk to $\min_f\sum_i w_{y_i}L(y_i,f(x_i))$, where $w_k$ is larger for rare or costly classes.

## Intuition

If fraud is 1 percent of transactions, predicting "not fraud" gets 99 percent accuracy and zero business value. [Classification](classification.md) under imbalance is a ranking and decision-cost problem: how many cases can be reviewed, and what is the cost of missing a positive?

## Worked example

The snippet compares the same imbalanced dataset with and without class weighting. The point is not that weighting is always better; it is that it changes the precision-recall tradeoff.

```python
from sklearn.datasets import make_classification
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
from sklearn.model_selection import train_test_split

X, y = make_classification(n_samples=500, n_features=6, n_informative=3,
                           weights=[0.95, 0.05], random_state=11)
Xtr, Xte, ytr, yte = train_test_split(X, y, stratify=y, random_state=11)
for name, est in [("plain", LogisticRegression(max_iter=1000, random_state=11)),
                  ("balanced", LogisticRegression(max_iter=1000, class_weight="balanced", random_state=11))]:
    est.fit(Xtr, ytr)
    pred = est.predict(Xte)
    p, r, _, _ = precision_recall_fscore_support(yte, pred, zero_division=0)
    print(name, "accuracy", round(accuracy_score(yte, pred), 3),
          "minority_precision", round(p[1], 3), "minority_recall", round(r[1], 3))
```

Observed output:

```text
plain accuracy 0.952 minority_precision 1.0 minority_recall 0.143
balanced accuracy 0.776 minority_precision 0.08 minority_recall 0.286
```

The balanced model catches more minority examples but creates many more false positives. Whether that is better depends on intervention cost.

## Caveats

Resampling before splitting leaks duplicates or synthetic information across folds. PR-AUC is usually more informative than ROC-AUC under extreme rarity, but it still does not choose an operating threshold. Reweighting can hurt [calibration](calibration.md), so check probability reliability separately.

## References

- [scikit-learn User Guide: classification metrics](https://scikit-learn.org/stable/modules/model_evaluation.html#classification-metrics)
- [scikit-learn User Guide: unbalanced problems](https://scikit-learn.org/stable/modules/svm.html#unbalanced-problems)

> **Section — [Classical Machine Learning](index.md):** ← [Calibration](calibration.md)

---
title: Evaluation Metrics
slug: classical-machine-learning/evaluation-metrics
description: "Task-specific functions that turn predictions into measurements aligned with decisions."
area: classical-machine-learning
topics:
  - evaluation-metrics
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - calibration.md
  - class-imbalance.md
  - classification.md
  - regression.md
  - model-selection.md
historical_context: false
last_reviewed: 2026-07-11
---

# Evaluation Metrics

Evaluation metrics are loss or scoring functions used after fitting to estimate usefulness. The metric must match the prediction type and decision cost: RMSE belongs to [regression](regression.md), precision and recall to [classification](classification.md), and Brier/log loss to probability quality and [calibration](calibration.md).

## Defining math

For regression, $MSE=n^{-1}\sum_i(y_i-\hat y_i)^2$, $RMSE=\sqrt{MSE}$, and $MAE=n^{-1}\sum_i|y_i-\hat y_i|$. For binary classification, $accuracy=(TP+TN)/(TP+TN+FP+FN)$, $precision=TP/(TP+FP)$, $recall=TP/(TP+FN)$, and $F_1=2PR/(P+R)$. For probabilities, log loss is $-n^{-1}\sum_i y_i\log\hat p_i+(1-y_i)\log(1-\hat p_i)$.

ROC-AUC summarizes how well positive examples are ranked above negative examples across thresholds:

$$
\operatorname{AUC}=P(s(x^+)>s(x^-))+\frac{1}{2}P(s(x^+)=s(x^-)).
$$

Average precision summarizes the precision-recall curve and is often reported as PR-AUC for rare-positive ranking tasks.

## Intuition

A metric is a compression of many errors into one number. Compression is useful only when the number preserves what the decision maker cares about. Under [class imbalance](class-imbalance.md), accuracy compresses away minority failures; under asymmetric costs, default thresholds hide the real trade-off.

## Worked example

This example evaluates the same binary predictions four ways, showing how thresholded accuracy, ranking metrics, and probability error answer different questions.

```python
import numpy as np
from sklearn.metrics import (accuracy_score, average_precision_score,
                             brier_score_loss, roc_auc_score)

y_true = np.array([0,0,0,0,1,1,1,1])
y_score = np.array([.05,.20,.35,.60,.40,.55,.80,.95])
y_pred = (y_score >= .5).astype(int)
print("accuracy", round(accuracy_score(y_true, y_pred), 3))
print("roc_auc", round(roc_auc_score(y_true, y_score), 3))
print("average_precision", round(average_precision_score(y_true, y_score), 3))
print("brier", round(brier_score_loss(y_true, y_score), 3))
```

Observed output:

```text
accuracy 0.75
roc_auc 0.875
average_precision 0.887
brier 0.141
```

The same scores produce several valid summaries. Accuracy uses the 0.5 threshold; ROC-AUC and average precision evaluate ranking; Brier evaluates probability error.

## Caveats

Do not tune on the test metric repeatedly and still call it an unbiased test estimate. Confidence intervals matter when model differences are small. Always pair aggregate metrics with slice checks when errors have unequal operational cost.

## References

- [scikit-learn User Guide: Metrics and scoring](https://scikit-learn.org/stable/modules/model_evaluation.html)
- [scikit-learn User Guide: Tuning the decision threshold](https://scikit-learn.org/stable/modules/classification_threshold.html)

> **Learning path — Foundations:** ← [Supervised Learning](supervised-learning.md) · [path overview](../00-home-and-navigation/learning-paths.md#foundations)

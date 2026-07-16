---
title: Calibration
slug: classical-machine-learning/calibration
description: "Checking and correcting whether predicted probabilities match observed frequencies."
area: classical-machine-learning
topics:
  - calibration
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - logistic-regression.md
  - evaluation-metrics.md
  - class-imbalance.md
  - classification.md
historical_context: false
last_reviewed: 2026-07-11
---

# Calibration

Calibration asks whether predicted probabilities mean what they say. Among examples assigned probability 0.8, roughly 80 percent should be positive. This is different from discrimination: a [classification](classification.md) model can rank cases well and still give overconfident probabilities. The same predictions should be judged with [evaluation metrics](evaluation-metrics.md), and imbalance can make reliability look different across classes as described in [class imbalance](class-imbalance.md).

## Defining math

Perfect binary calibration means $P(Y=1\mid \hat p(X)=p)=p$. The Brier score is $BS=n^{-1}\sum_i(\hat p_i-y_i)^2$, and log loss is

$$
-\frac{1}{n}\sum_i \left[y_i\log \hat p_i+(1-y_i)\log(1-\hat p_i)\right].
$$

Platt scaling fits a sigmoid on validation scores; isotonic regression fits a monotone calibration curve. [Logistic regression](logistic-regression.md) is often reasonably calibrated under correct specification, but imbalance and misspecification can distort probabilities.

## Intuition

Calibration is required when a probability drives a threshold, price, triage rule, or expected-cost calculation. A model that says 0.9 too often will overload review teams and misstate risk even if its ranking is strong.

## Worked example

This snippet calibrates a random forest classifier with sigmoid calibration and reports probabilistic scores through Brier loss, log loss, and predicted-versus-observed positive rate.

```python
from sklearn.calibration import CalibratedClassifierCV
from sklearn.datasets import make_classification
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import brier_score_loss, log_loss
from sklearn.model_selection import train_test_split

X, y = make_classification(n_samples=500, n_features=10, n_informative=4,
                           flip_y=.08, random_state=13)
Xtr, Xte, ytr, yte = train_test_split(X, y, stratify=y, random_state=13)
base = RandomForestClassifier(n_estimators=80, random_state=13)
cal = CalibratedClassifierCV(base, method="sigmoid", cv=3).fit(Xtr, ytr)
proba = cal.predict_proba(Xte)[:, 1]
print("brier", round(brier_score_loss(yte, proba), 3), "log_loss", round(log_loss(yte, proba), 3))
print("mean_predicted_positive_rate", round(proba.mean(), 3), "observed_rate", round(yte.mean(), 3))
```

Observed output:

```text
brier 0.086 log_loss 0.304
mean_predicted_positive_rate 0.453 observed_rate 0.488
```

The average predicted positive rate is near, but not equal to, the observed rate. Calibration should also be checked by bins, not only by the mean.

## Caveats

Fit calibration on held-out data or cross-validation, never on the final test set. Calibration can differ by subgroup even when global reliability is acceptable. Recalibration after drift can mask a deteriorating feature distribution.

## References

- [scikit-learn User Guide: Probability calibration](https://scikit-learn.org/stable/modules/calibration.html)
- [scikit-learn User Guide: Brier score loss](https://scikit-learn.org/stable/modules/model_evaluation.html#brier-score-loss)

> **Section — [Classical Machine Learning](index.md):** ← [Evaluation Metrics](evaluation-metrics.md) · [Class Imbalance](class-imbalance.md) →

---
title: Calibration
slug: classical-machine-learning/calibration
description: "Checking and correcting whether predicted probabilities match observed frequencies."
area: classical-machine-learning
topics:
  - calibration
level: foundational
status: complete
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
last_reviewed: 2026-07-22
---

# Calibration

Calibration asks whether predicted probabilities mean what they say. Among examples assigned probability 0.8, roughly 80 percent should be positive. This is different from discrimination: a [classification](classification.md) model can rank cases well and still give overconfident probabilities. The same predictions should be judged with [evaluation metrics](evaluation-metrics.md), and imbalance can make reliability look different across classes as described in [class imbalance](class-imbalance.md).

## Reading a reliability diagram

The direct way to check calibration is to group predictions into probability bins and compare the average predicted probability in each bin with the fraction of those cases that were actually positive. A well-calibrated model stays on the diagonal — predicted matches observed:

| predicted-probability bin | mean predicted | observed positive rate | reading         |
| ------------------------- | -------------: | ---------------------: | --------------- |
| 0.0 – 0.2                 |           0.11 |                   0.10 | well calibrated |
| 0.4 – 0.6                 |           0.51 |                   0.47 | close           |
| 0.8 – 1.0                 |           0.90 |                   0.72 | overconfident   |

The top bin is the warning sign: when the model says $0.90$ it is right only $72\%$ of the time, so those confident predictions are systematically too high. This is a separate question from ranking — a model can order cases perfectly (high [AUC](evaluation-metrics.md#probability-and-ranking-metrics)) and still be miscalibrated like this, which is why calibration is checked in bins rather than by a single average.

## Measuring calibration error

Perfect binary calibration means that among all cases assigned probability $p$, a fraction $p$ really are positive: $P(Y=1\mid \hat p(X)=p)=p$. Two scores measure how far predictions fall from this ideal, using the predicted positive-class probability $\hat p_i$, the label $y_i\in\{0,1\}$, and the number of examples $n$. The Brier score is the mean squared probability error,

$$
BS=\frac{1}{n}\sum_i(\hat p_i-y_i)^2,
$$

and log loss penalizes confident mistakes more sharply,

$$
-\frac{1}{n}\sum_i \left[y_i\log \hat p_i+(1-y_i)\log(1-\hat p_i)\right].
$$

Platt scaling fits a sigmoid on validation scores; isotonic regression fits a monotone calibration curve. [Logistic regression](logistic-regression.md) is often reasonably calibrated under correct specification, but imbalance and misspecification can distort probabilities.

## Calibrating a classifier

Calibration is required whenever a probability drives a threshold, price, triage rule, or expected-cost calculation: a model that says 0.9 too often will overload review teams and misstate risk even if its ranking is strong. This snippet calibrates a random forest classifier with sigmoid calibration and reports probabilistic scores through Brier loss, log loss, and predicted-versus-observed positive rate.

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

With the default ensemble behavior for this unfitted base estimator, `CalibratedClassifierCV(base, method="sigmoid", cv=3).fit(Xtr, ytr)` does this:

1. `Xte, yte` are held out before calibration and are used only for final evaluation.
2. Because `cv=3`, scikit-learn splits `Xtr, ytr` into three stratified folds.
3. For each fold, it clones the random forest, trains that clone on two folds, and asks the trained clone for scores on the remaining fold. A model with `decision_function` would use those scores; `RandomForestClassifier` does not expose one, so the calibrator uses the forest's `predict_proba` output.
4. On that held-out fold, it fits a sigmoid calibrator

$$
\hat p(y=1\mid f)=\frac{1}{1+\exp(Af+B)},
$$

where $f$ is the uncalibrated model score for one example, $\hat p(y=1\mid f)$ is the calibrated probability assigned to that score, and $A,B$ are the two learned parameters of the sigmoid curve. This is Platt scaling: a one-dimensional logistic regression fitted on pairs $(f_i,y_i)$ from the held-out fold, where $f_i$ is the base model's score for example $i$ and $y_i\in\{0,1\}$ is its true label. It is not fitted separately inside percentile bins. The bins in a reliability diagram are mainly for diagnosis and visualization; sigmoid calibration fits one smooth global mapping from scores to probabilities.
5. The fitted object stores three `(forest clone, sigmoid calibrator)` pairs. At prediction time, each forest clone scores the new example, its paired sigmoid maps that score to a calibrated probability, and the three calibrated probabilities are averaged.

The key detail is that each sigmoid is trained on predictions from examples that its paired forest clone did not train on. If the calibrator were fit on the forest's own training predictions, the scores would be too optimistic and the learned probability map would usually be too confident. The final test set must remain outside both the base-model fitting and the calibration fitting.

## When calibration helps

Calibration is most useful when probabilities are consumed directly rather than only used for ranking. Examples include thresholding by expected cost, prioritizing human review queues, pricing risk, combining model probabilities with business rules, or reporting user-facing risk estimates. It is also useful for models whose score ranking is good but whose probabilities have a systematic distortion: random forests and bagged trees often avoid probabilities near 0 or 1, maximum-margin methods such as SVMs often need a post-hoc probability map, and reweighted or resampled classifiers can have distorted base rates.

Calibration is easiest when the calibration set is large, representative of deployment, and has enough positives and negatives across the score range. A monotonic distortion is especially well suited because calibration changes the score-to-probability map, not the underlying ranking. Sigmoid calibration is a low-variance choice when the distortion is roughly S-shaped or the calibration set is small. Isotonic calibration is more flexible because it learns any non-decreasing step function, but it needs substantially more calibration data and can overfit when the calibration sample is small.

Calibration is harder when positives are rare, the deployment base rate shifts, or important subgroups have different reliability curves. Each class must appear in the training and held-out calibration folds; otherwise a per-fold calibrator may learn from no positive examples for that class. Multiclass calibration is harder than binary calibration because one-vs-rest calibrators can produce probabilities that need renormalization. Calibration also cannot rescue a model with poor discrimination: if the model cannot separate positives from negatives, a calibrated score may be honest but still not useful.

For example, suppose a fraud model has 10,000 labeled transactions but only 40 confirmed fraud cases. With `cv=5`, each calibration fold has about eight positives before considering score bins or subgroups. If the model assigns most transactions scores below 0.05 and only a handful above 0.8, the high-score region may contain one positive in one fold and none in another. A flexible isotonic calibrator can then learn a jagged step function from noise, while a sigmoid calibrator may be more stable but too simple to correct local distortions. In this setting, the practical fix is usually more calibration data, fewer folds with enough positives per fold, grouped or time-aware splits that match deployment, and segment checks before trusting the calibrated probabilities.

## Caveats

Fit calibration on held-out data or cross-validation, never on the final test set. Calibration can differ by subgroup even when global reliability is acceptable, so inspect reliability by important segments when decisions are sensitive. Recalibration after drift can mask a deteriorating feature distribution; it should accompany drift checks, not replace them. Brier score and log loss mix calibration with discrimination, so use reliability diagrams or bin-level checks when the specific question is probability reliability.

## References

- [scikit-learn User Guide: Probability calibration](https://scikit-learn.org/stable/modules/calibration.html)
- [scikit-learn API Reference: CalibratedClassifierCV](https://scikit-learn.org/stable/modules/generated/sklearn.calibration.CalibratedClassifierCV.html)
- [scikit-learn User Guide: Brier score loss](https://scikit-learn.org/stable/modules/model_evaluation.html#brier-score-loss)
- [Platt, 1999, Probabilistic Outputs for Support Vector Machines](https://ndlsearch.ndl.go.jp/en/books/R100000136-I1572824500548904064)
- [Niculescu-Mizil and Caruana, 2005, Predicting Good Probabilities with Supervised Learning](https://doi.org/10.1145/1102351.1102430)

> [!nav]
> **Section** — [Classical Machine Learning](index.md)
>
> [← Evaluation Metrics](evaluation-metrics.md) [Class Imbalance →](class-imbalance.md)

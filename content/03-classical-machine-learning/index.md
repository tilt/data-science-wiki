---
title: Classical Machine Learning
slug: classical-machine-learning
description: "Reference notes on classical supervised, unsupervised, and evaluation methods."
area: classical-machine-learning
topics:
  - classical-machine-learning
level: foundational
status: review
page_type: area-index
aliases: []
prerequisites: []
related:
  - supervised-learning.md
  - unsupervised-learning.md
  - model-selection.md
  - evaluation-metrics.md
historical_context: false
last_reviewed: 2026-07-11
---

# Classical Machine Learning

Classical machine learning is the part of statistical learning where the model class, loss, validation protocol, and diagnostic quantities are usually explicit. This section is organized around the questions a practitioner actually has to answer: what is being predicted or discovered, what objective is optimized, how the model fails, and how the result should be measured.

## Supervised prediction

- [Supervised learning](supervised-learning.md): the empirical-risk framing for learning a map from features $X$ to labels or targets $y$.
- [Regression](regression.md): continuous-target prediction, usually optimized with squared, absolute, or likelihood-based losses.
- [Classification](classification.md): discrete-label prediction, where scores become class decisions through argmax or thresholds.
- [Linear models](linear-models.md): weighted sums of features, including ordinary least squares and generalized linear decision rules.
- [Logistic regression](logistic-regression.md): a linear log-odds model for class probabilities and cross-entropy training.
- [Support vector machines](support-vector-machines.md): maximum-margin classification with hinge loss and optional kernels.

## Complexity control and selection

- [Regularization](regularization.md): penalties and constraints that shrink unstable fits toward simpler functions.
- [Bias-variance trade-off](bias-variance-trade-off.md): the decomposition that explains underfitting versus sensitivity to the training sample.
- [Model selection](model-selection.md): choosing model families and hyperparameters without spending the test set.
- [Data leakage](data-leakage.md): target, time, group, and preprocessing contamination that makes validation estimates unrealistically good.
- [Feature engineering](feature-engineering.md): changing the representation so simple models can express the right structure.

## Trees and ensembles

- [Decision trees](decision-trees.md): recursive partitions with impurity or variance-reduction split criteria.
- [Random forests](random-forests.md): bagged, feature-randomized trees that reduce variance by averaging decorrelated predictors.
- [Gradient boosting](gradient-boosting.md): additive trees fit stage by stage to negative gradients of a chosen loss.
- [Interpretability](interpretability.md): local and global tools for connecting model behavior back to features and examples.

## Unsupervised structure

- [Unsupervised learning](unsupervised-learning.md): learning structure from $X$ without target labels.
- [Dimensionality reduction](dimensionality-reduction.md): lower-dimensional representations for compression, visualization, and denoising.
- [PCA](pca.md): the linear projection that maximizes retained variance through eigenvectors or SVD.
- [Clustering](clustering.md): partitioning examples into groups using distance, density, or probabilistic structure.
- [Anomaly detection](anomaly-detection.md): ranking or flagging observations that are unlikely under the fitted notion of normality.

## Evaluation and decisions

- [Evaluation metrics](evaluation-metrics.md): task-specific functions that turn predictions into comparable numbers.
- [Calibration](calibration.md): whether predicted probabilities match observed frequencies.
- [Class imbalance](class-imbalance.md): rare-class settings where accuracy and default thresholds can be actively misleading.

> **Learning path — Foundations:** ← [Probability and Statistics](../02-probability-and-statistics/index.md) · [path overview](../00-home-and-navigation/learning-paths.md#foundations)

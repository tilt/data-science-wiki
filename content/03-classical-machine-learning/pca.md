---
title: PCA
slug: classical-machine-learning/pca
description: Concise guide to PCA in Classical Machine Learning.
area: classical-machine-learning
topics:
  - pca
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

Principal component analysis finds orthogonal directions of maximum variance in numeric data. It is a linear dimensionality-reduction method used for visualization, denoising, compression, and feature analysis.

## Core idea

PCA centers the data and finds directions where the projected data varies most. The first principal component captures the most variance; the second captures the most remaining variance subject to being orthogonal to the first.

## Step-by-step example

For a dataset with height and weight, the first component may represent overall body size because both variables increase together. The second component may represent deviations from that pattern. Instead of two correlated variables, PCA gives uncorrelated component coordinates.

## Practical workflow

1. Choose numeric features and handle missing values.
2. Standardize features when scales differ.
3. Fit PCA on training data only.
4. Inspect explained variance and component loadings.
5. Transform validation, test, and production data with the fitted transformation.

## Failure modes

PCA preserves variance, not predictive usefulness or causal meaning. It can be dominated by scale, outliers, and high-variance noise. Components can also be unstable when eigenvalues are close.

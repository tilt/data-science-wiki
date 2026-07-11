---
title: Covariance and Correlation
slug: probability-and-statistics/covariance-and-correlation
description: Concise guide to Covariance and Correlation in Probability and Statistics.
area: probability-and-statistics
topics:
  - covariance-and-correlation
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

Covariance and correlation describe how two variables vary together. They are useful for exploratory analysis, feature diagnostics, portfolio risk, dimensionality reduction, and understanding linear relationships.

## Definitions

Covariance is

$$
\operatorname{Cov}(X,Y)=E[(X-E[X])(Y-E[Y])].
$$

Positive covariance means the variables tend to move above and below their means together. Correlation rescales covariance to the range $[-1,1]$:

$$
\rho_{X,Y}=\frac{\operatorname{Cov}(X,Y)}{\sigma_X \sigma_Y}.
$$

## Example

If higher advertising spend tends to coincide with higher sales, covariance is positive. Correlation tells how strong the linear association is after accounting for the scale of each variable.

## Practical cautions

Correlation is not causation. It measures linear association, so nonlinear relationships can have low correlation. Outliers can dominate correlation, and shared seasonality can create misleading relationships between unrelated time series.

## ML use

Covariance matrices appear in PCA, Gaussian models, uncertainty estimation, and feature analysis. Highly correlated features can make linear-model coefficients unstable even when predictions remain accurate.

---
title: Machine Learning Forecasting
slug: time-series-and-forecasting/machine-learning-forecasting
description: Frames forecasting as supervised regression with lagged features, covariates, metadata, global models, and tree-based learners.
area: time-series-and-forecasting
topics:
  - machine-learning-forecasting
  - supervised-learning
  - regression
level: intermediate
status: complete
page_type: model
aliases:
  - ML Forecasting
  - Tabular Forecasting
  - Forecasting as Regression
prerequisites:
  - forecasting-problem-formulation.md
  - forecasting-data-and-covariates.md
related:
  - feature-engineering-for-forecasting.md
  - deep-learning-forecasting.md
  - forecasting-data-and-covariates.md
  - backtesting.md
  - cold-start-forecasting.md
  - ../03-classical-machine-learning/random-forests.md
historical_context: false
last_reviewed: 2026-07-20
---

# Machine Learning Forecasting

Machine learning forecasting converts time series prediction into supervised regression. Each training row represents a prediction timestamp, and the feature vector contains lagged targets, rolling statistics, covariates, calendar variables, and metadata.

| date       | lag_1 | lag_7 | rolling_mean_7 | promotion | target |
| ---------- | ----: | ----: | -------------: | --------: | -----: |
| 2026-01-08 |   120 |   105 |          112.4 |         1 |    128 |

The modeling equation is:

$$
y_t=f(\mathbf{x}_t)
$$

where $y_t$ is the target at timestamp $t$, and $\mathbf{x}_t$ contains only features available for predicting timestamp $t$ from the chosen forecast origin.

## Local and global regression

A **local machine learning model** trains a separate regressor for each series. This is useful when each series has enough history and behaves differently from the others.

A **global machine learning model** stacks rows from many series and trains one shared regressor. The model can learn cross-series structure from static metadata such as category, region, lifecycle stage, or capacity class. Global models are often strong when individual histories are short but the panel contains many related examples.

## Multi-step strategies

Machine learning forecasters can use direct horizon-specific models, recursive prediction, multi-output regression, or horizon-as-feature training.

Direct models train separate regressors for each horizon, such as one model for $h=1$ and another for $h=7$. Recursive models repeatedly feed predictions back into lag features. Multi-output regression predicts a vector of horizons. Horizon-as-feature models include $h$ in the row and share parameters across horizons.

The right strategy depends on the horizon length, number of series, compute budget, and tolerance for recursive error accumulation.

## Suitable algorithms

Linear regression and ridge regression are transparent baselines when relationships are approximately additive and feature scales are controlled. Decision trees capture nonlinear thresholds but can be unstable. Random forests reduce tree variance through averaging. Gradient boosting builds a sequence of trees that correct previous errors and often performs well on tabular forecasting problems. Support vector regression can work for smaller datasets with carefully scaled features, but it is less common for large panel forecasting.

## Gradient-boosted trees

Gradient-boosted tree libraries such as LightGBM, XGBoost, and CatBoost are common forecasting workhorses. They handle nonlinear interactions between lags, calendar variables, promotions, metadata, and exposure features without requiring the modeler to specify every interaction manually.

Common hyperparameters include the number of estimators, tree depth or number of leaves, learning rate, row subsampling, column subsampling, regularization strength, minimum data per leaf, and early stopping. A smaller learning rate with more trees can improve accuracy, but increases training time. Deeper trees can capture interactions, but overfit noisy backtest folds.

Boosted trees are often strong when substantial covariate and metadata information is available. For example, a retail demand model can combine recent demand lags, day-of-week effects, planned promotions, price, store type, and product category in one tabular model.

## Limitations

Machine learning forecasters require explicit lag and rolling-window engineering. Recursive predictions can accumulate error because predicted values become future lag inputs. Tree models are weak extrapolators outside the observed target and covariate ranges. Categorical handling differs across libraries, so encoding choices can affect both accuracy and portability. Forecast coherence across hierarchies is not guaranteed unless reconciliation is added.

## Practical guidance

- Always compare a tabular model against naive and seasonal-naive baselines.
- Start with a small lag set, calendar features, and important future-known covariates before adding high-dimensional windows.
- Use global models when metadata and related series can support cross-series learning.
- Inspect performance by horizon, series group, and volume segment, not only globally.
- Tune lag sets and tree complexity under time-respecting validation.
- Validate all feature generation from the forecast origin to avoid leakage.

## Common failure modes

- Including target lag 0 for a prediction timestamp where the target is unknown.
- Computing rolling statistics without shifting them behind the forecast origin.
- Letting target encodings use future labels.
- Selecting complex boosted trees without checking simpler baselines.
- Training one global model that performs well in aggregate but fails for sparse or high-value partitions.

## Connections

Machine-learning forecasters depend on [feature engineering for forecasting](feature-engineering-for-forecasting.md), future covariates, and leakage-free [backtesting](backtesting.md). They bridge classical tabular models such as [random forests](../03-classical-machine-learning/random-forests.md) with [deep learning forecasting](deep-learning-forecasting.md) for large panels.

## References

- [Hyndman & Athanasopoulos, FPP3: Time series regression models](https://otexts.com/fpp3/regression.html)
- [scikit-learn Gradient Boosting documentation](https://scikit-learn.org/stable/modules/ensemble.html#gradient-boosting)

> [!nav]
> **Section** — [Time-Series Forecasting](index.md)
>
> [← Statistical Forecasting](statistical-forecasting.md) [Deep Learning Forecasting →](deep-learning-forecasting.md)

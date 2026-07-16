---
title: Feature Engineering for Forecasting
slug: time-series-and-forecasting/feature-engineering-for-forecasting
description: Covers lag features, rolling windows, calendar encodings, events, promotions, lifecycle variables, categorical encodings, imputation, scaling, and target transformations.
area: time-series-and-forecasting
topics:
  - feature-engineering
  - target-transformations
  - forecasting
level: intermediate
status: draft
page_type: implementation
aliases:
  - Forecast Feature Engineering
  - Forecasting Target Transformations
  - Time Series Features
prerequisites:
  - forecasting-data-and-covariates.md
related:
  - forecasting-data-and-covariates.md
  - machine-learning-forecasting.md
  - autoregressive-models.md
  - rolling-origin-validation.md
  - concept-drift-in-forecasting.md
historical_context: false
last_reviewed: 2026-07-11
---

# Feature Engineering for Forecasting

## Summary

Forecasting features must encode temporal structure without using information from after the forecast origin. The most common families are lag features, rolling-window statistics, calendar variables, event indicators, promotions, lifecycle features, categorical encodings, exposure variables, scaling, imputation, and target transformations.

## Lag features

Lag features expose past target values:

$$
y_{t-1},\ y_{t-7},\ y_{t-14},\ y_{t-28}
$$

Short-term lags capture recent momentum. Seasonal lags capture repeated patterns such as yesterday, last week, or last year. Sparse lag sets reduce dimensionality, while dense lag windows can help flexible models learn local temporal shape.

A lag configuration may be represented by a maximum lag, an explicit list, an inclusive range, or per-feature lag definitions. The phrase "lag 0" is ambiguous. For the target, lag 0 usually means $y_t$, which is unavailable when predicting $y_t$ and therefore leaks unless the formulation explicitly predicts a later target from a contemporaneously observed feature.

## Rolling-window features

Rolling features summarize recent history: rolling mean, median, minimum, maximum, standard deviation, sum, and exponentially weighted statistics. A seven-day rolling mean is:

$$
\text{rollmean}_{7,t}
=
\frac{1}{7}
\sum_{j=1}^{7} y_{t-j}
$$

The window uses $y_{t-1}$ through $y_{t-7}$, not $y_t$, when predicting timestamp $t$. Rolling features must be shifted before computation whenever the value at the prediction timestamp is unknown.

Window size controls a bias-variance tradeoff. Short windows react quickly but are noisy. Long windows are stable but can miss recent shifts.

## Calendar and cyclical features

Calendar features include year, quarter, month, ISO week, day of year, day of month, day of week, and weekend indicators. They are future-known because the calendar is known in advance.

Cyclical encoding represents periodic variables on a circle:

$$
x_{\sin}
=
\sin\left(2\pi\frac{x}{T}\right)
$$

$$
x_{\cos}
=
\cos\left(2\pi\frac{x}{T}\right)
$$

Here $x$ is the calendar position and $T$ is the cycle length. This makes the first and last values of a cycle adjacent, so December and January or Sunday and Monday are not artificially far apart.

## Events, promotions, and lifecycle

Holiday and event features include public holidays, days before an event, days after an event, event duration, and region-specific calendars. Promotion features include promotion active, promotion depth, promotion count, promotion duration, time until promotion, and time since promotion. These features are valid only when the promotion or event plan is known at forecast time.

Lifecycle features describe maturity: time since launch, time since first observation, product age, cohort, or lifecycle phase. They help distinguish new series from mature series and can support [cold-start forecasting](cold-start-forecasting.md).

## Categorical variables

One-hot encoding is simple and portable, but high-cardinality variables can create many sparse columns. Ordinal encoding is compact, but imposes an artificial order unless the model treats categories natively. Target encoding can be effective but is leakage-prone unless fit inside each training fold and computed without future labels. Learned embeddings can represent high-cardinality categories in neural models. Some tree models provide native categorical handling, but behavior differs by library.

## Scaling and imputation

Standard scaling subtracts a mean and divides by standard deviation. Min-max scaling maps values to a fixed range. Robust scaling uses median and interquartile range to reduce sensitivity to outliers.

Mean, median, and most-frequent imputation fill missing values with simple summaries. Missingness indicators are often useful because missing values can carry signal. Tree models usually need less scaling than linear, kernel, or neural models, but consistent preprocessing still matters for reproducibility.

## Target transformations

Target transformations can stabilize variance, reduce skew, improve optimization, reduce the effect of extreme values, and improve comparability across series.

Standardization uses:

$$
z_t=\frac{y_t-\mu}{\sigma}
$$

where $\mu$ and $\sigma$ are fitted on training data. Min-max scaling, max-absolute scaling, and robust scaling are alternatives.

A logarithmic transformation such as:

$$
y'_t=\log(1+y_t)
$$

handles zero-valued nonnegative targets while compressing large values. The Box-Cox transformation is:

$$
y^{(\lambda)}
=
\begin{cases}
\dfrac{y^\lambda-1}{\lambda}, & \lambda \neq 0 \\
\log y, & \lambda=0
\end{cases}
$$

Box-Cox requires positive $y$. Quantile transformation maps ranks to a target distribution; it can improve optimization but distorts distances and extrapolation.

Residual modeling decomposes:

$$
y_t = \text{systematic component}_t + r_t
$$

and forecasts the residual $r_t$. This is useful when a known baseline explains much of the structure.

Predictions must be inverse-transformed before evaluation in the original unit. Clipping and inverse-transform rules should be validated explicitly.

## Practical guidance

- Generate all features relative to the forecast origin.
- Start with interpretable lags, rolling means, calendar features, and known events.
- Keep lag sets sparse unless there is enough data and memory to support dense windows.
- Fit scalers, imputers, encoders, and target transformations inside each training fold.
- Treat target encoding and rolling statistics as leakage risks until proven otherwise.

## Common failure modes

- Unshifted rolling features that include the prediction timestamp.
- Target lag 0 leakage.
- Incorrect season length, such as using 30 for monthly annual seasonality instead of 12.
- Treating padded zeros as real observations for new products.
- Forgetting to inverse-transform predictions before computing metrics.

## Connections

Forecast features translate [forecasting data and covariates](forecasting-data-and-covariates.md) into tabular inputs for [machine learning forecasting](machine-learning-forecasting.md). Lag features echo [autoregressive models](autoregressive-models.md), and every feature must be built inside [rolling-origin validation](rolling-origin-validation.md) to avoid leakage.

## References

- [Hyndman & Athanasopoulos, FPP3: Time series features](https://otexts.com/fpp3/features.html)
- [Nixtla StatsForecast exogenous regressors guide index](https://nixtla.github.io/statsforecast/)

> [!nav]
> **Section** — [Time-Series Forecasting](index.md)
>
> [← Forecasting Data and Covariates](forecasting-data-and-covariates.md) [Autoregressive Models →](autoregressive-models.md)

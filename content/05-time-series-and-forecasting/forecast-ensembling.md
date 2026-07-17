---
title: Forecast Ensembling
slug: time-series-and-forecasting/forecast-ensembling
description: Detailed guide to forecast combination, global and per-series selection, optimized weights, partitioned ensembles, bias correction, and efficient forecast aggregation.
area: time-series-and-forecasting
topics:
  - forecast-ensembling
  - ensemble-learning
  - model-selection
level: advanced
status: review
page_type: algorithm
aliases:
  - Time Series Ensembling
  - Forecast Combination
  - Forecast Ensemble Weights
prerequisites:
  - forecast-error-metrics.md
  - backtesting.md
related:
  - statistical-forecasting.md
  - machine-learning-forecasting.md
  - backtesting.md
  - forecast-error-metrics.md
  - hyperparameter-optimization-for-forecasting.md
historical_context: false
last_reviewed: 2026-07-17
---

# Forecast Ensembling

## Summary

Forecast ensembling combines predictions from multiple models. A generic point ensemble is:

$$
\hat{y}_{i,t}
=
\sum_{m=1}^{M}
w_{i,m}
\hat{y}_{i,t}^{(m)}
$$

where $i$ identifies a series, $t$ identifies a forecast timestamp, $m$ identifies a model, $M$ is the number of component models, $\hat{y}_{i,t}^{(m)}$ is model $m$'s forecast, and $w_{i,m}$ is its weight for series $i$.

Ensembles work best when component models make different errors. Averaging can reduce variance, smooth unstable selections, and combine complementary inductive biases such as seasonal baselines, gradient-boosted trees, and neural models.

## Ensemble strategies

| Strategy                     | Scope          | Model selection             | Weighting                  | Compute cost | Main benefit                          | Main risk                     |
| ---------------------------- | -------------- | --------------------------- | -------------------------- | ------------ | ------------------------------------- | ----------------------------- |
| Globally best model          | All series     | One winner                  | Weight 1 on winner         | Low          | Simple and stable                     | Ignores heterogeneity         |
| Best model per series        | Series         | Winner per series           | Weight 1 per series        | Medium       | Adapts by entity                      | Selection instability         |
| Global mean ensemble         | All series     | Top $N$ globally            | Equal weights              | Low          | Strong baseline                       | May include weak local models |
| Per-series mean ensemble     | Series         | Top $N$ per series          | Equal weights              | Medium       | Local adaptation without optimization | Noisy for short histories     |
| Globally optimized weights   | All series     | Candidate set               | Learned shared weights     | Medium       | Balances models by validation loss    | Can overfit final backtest    |
| Per-series optimized weights | Series         | Candidate set               | Learned per-series weights | High         | Maximum flexibility                   | High overfitting risk         |
| Partition-based ensemble     | Metadata group | Candidate set per partition | Group weights              | Medium       | Middle ground                         | Bad partitions reduce value   |

## Selection strategies

A **globally best model** chooses one model for all series. It is simple, stable, easy to explain, and cheap at inference time. Its limitation is that it ignores heterogeneous behavior across series.

A **best model per series** chooses a separate winner for each entity. It adapts to heterogeneity, but can overfit noisy validation windows and creates operational complexity.

A **global mean ensemble** selects the top $N$ models globally and assigns:

$$
w_m=\frac{1}{N}
$$

Equal weighting is a strong baseline because it avoids estimating many unstable parameters. A **per-series mean ensemble** chooses the top $N$ models separately for each series and averages them equally.

## Optimized weights

Globally optimized weights solve:

$$
\min_{\mathbf{w}}
L
\left(
y,
\sum_m w_m\hat{y}^{(m)}
\right)
$$

where $L$ is a validation loss and $\mathbf{w}$ is a vector of model weights. Constraints can include:

$$
w_m\ge 0
$$

and:

$$
\sum_m w_m=1
$$

Nonnegative simplex weights improve interpretability and reduce extrapolative behavior. Unconstrained weights can correct systematic errors, but negative or large weights may behave poorly outside validation data.

Per-series optimized weights learn $\mathbf{w}_i$ separately for each series. This increases flexibility, computation, and overfitting risk. It requires enough backtest observations per series and is often parallelized across entities.

## Partition-based ensembling

Partition-based ensembling groups series by metadata such as demand volume, volatility, intermittency, category, region, or lifecycle stage. Each partition gets its own selection or weights.

This is a middle ground between one global ensemble and fully per-series optimization. It can improve heterogeneous performance while keeping validation sample sizes larger than per-series fitting.

## Missing-series fallback

If a series is absent from ensemble-training backtests, the ensemble cannot estimate a per-series winner or weight vector. The fallback can use a globally best model, partition-level best model, category-level ensemble, or statistical baseline. This fallback should be part of the ensemble definition and evaluated separately, not added as an undocumented production exception.

## Bias correction

Suppose the main ensemble has mean bias:

$$
b_i
=
\frac{1}{n_i}
\sum_t
\left(
\hat{y}_{i,t}^{\text{ensemble}}
-
y_{i,t}
\right)
$$

where $n_i$ is the number of validation observations for series $i$. Using a correction model with mean prediction:

$$
\bar{z}_i
=
\frac{1}{n_i}
\sum_t
\hat{z}_{i,t}
$$

a possible analytical correction weight is:

$$
\alpha_i
=
-\frac{b_i}{\bar{z}_i}
$$

Then:

$$
\hat{y}_{i,t}^{\text{corrected}}
=
\hat{y}_{i,t}^{\text{ensemble}}
+
\alpha_i\hat{z}_{i,t}
$$

Bias correction can improve calibration while worsening MAE or RMSE. Negative correction weights, clamping, partial correction, instability when $\bar{z}_i$ is close to zero, leakage, and validation on untouched data all require explicit handling.

## Weight optimization

Bayesian optimization and tools such as Optuna can tune model weights or ensemble design choices by treating validation loss as the objective. A trial samples a candidate weight vector and receives a loss from backtest forecasts.

One way to sample weights on the simplex is:

1. Sample independent $U_m \sim Uniform(0,1)$.
2. Set $a_m=-\log U_m$.
3. Normalize:

$$
w_m=\frac{a_m}{\sum_j a_j}
$$

This produces a random simplex point related to a Dirichlet distribution with equal concentration parameters. It samples symmetrically across model dimensions, but the distribution over corners and interiors depends on the concentration choice.

Do not optimize weights and evaluate them on the same forecasts. Split backtest forecasts into an ensemble-training portion and an untouched ensemble-evaluation portion.

## Ensemble selection map

An auditable ensemble can be represented as a table:

| series_id | model   | weight | validation_metric |
| --------- | ------- | -----: | ----------------: |
| A         | model_1 |    0.6 |              12.4 |
| A         | model_2 |    0.4 |              12.4 |
| B         | model_3 |    1.0 |               4.8 |

This separates ensemble fitting, forecast production, auditing, versioning, and debugging. It also makes fallback rows and zero-weight models visible.

## Efficient forecast combination

Generic pseudocode:

```text
validate one row per series_id, forecast_timestamp, model
join forecasts to ensemble weights on series_id and model
drop or flag duplicate model predictions
weighted_prediction = prediction * weight
group by series_id and forecast_timestamp
sum weighted_prediction
record weight_sum and missing_component_count
apply explicit policy for missing predictions and weight normalization
```

Important edge cases include all component predictions missing, one component prediction missing, weights that do not sum to one, negative weights, duplicate model predictions, zero-weight models, and models missing for a subset of horizons.

## Practical guidance

- Begin with equal-weight averaging before optimizing weights.
- Use an untouched ensemble-evaluation split to estimate ensemble performance.
- Avoid per-series optimization when each series has few validation points.
- Prefer constrained simplex weights unless there is a validated reason for negative weights.
- Include fallback behavior in the versioned ensemble map.
- Evaluate bias separately from absolute error after ensembling.

## Common failure modes

- Selecting a separate best model for noisy short series.
- Optimizing ensemble weights on too little data.
- Reusing the same backtest forecasts for both weight fitting and final evaluation.
- Allowing missing component predictions to change the effective weight scale silently.
- Treating bias correction as universally beneficial.

## Connections

Forecast ensembling combines candidates from [statistical forecasting](statistical-forecasting.md), [machine learning forecasting](machine-learning-forecasting.md), and neural models. Use [backtesting](backtesting.md) to learn weights, then score with [forecast error metrics](forecast-error-metrics.md) on a separate period.

## References

- [Hyndman & Athanasopoulos, FPP3: Forecast combinations](https://otexts.com/fpp3/combinations.html)
- [Nixtla StatsForecast documentation](https://nixtla.github.io/statsforecast/)

> [!nav]
> **Section** — [Time-Series Forecasting](index.md)
>
> [← Cold-Start Forecasting](cold-start-forecasting.md) [Hyperparameter Optimization for Forecasting →](hyperparameter-optimization-for-forecasting.md)

---
title: Random Walks
slug: probability-and-statistics/random-walks
description: "Processes built by accumulating random increments, producing paths whose variance grows over time."
area: probability-and-statistics
topics:
  - random-walks
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - markov-chains.md
  - law-of-large-numbers.md
  - central-limit-theorem.md
  - ../05-time-series-and-forecasting/autoregressive-models.md
historical_context: false
last_reviewed: 2026-07-11
---
# Random Walks

A random walk accumulates random steps. In one dimension,

$$
S_n=S_0+\sum_{i=1}^n X_i,
$$

where the increments $X_i$ are often iid with mean $\mu$ and variance $\sigma^2$. Then

$$
\mathbb E[S_n]=S_0+n\mu, \qquad \operatorname{Var}(S_n)=n\sigma^2.
$$

A simple symmetric random walk has $X_i\in\{-1,1\}$ with equal probability. It is also a [Markov chain](markov-chains.md), because the next position depends on the current position and one new step.

## Worked simulation

```python
import numpy as np

rng = np.random.default_rng(20260711)
steps = rng.choice([-1, 1], size=(20000, 200))
walk = steps.cumsum(axis=1)
final = walk[:, -1]
print("final_mean", round(final.mean(), 3),
      "final_var", round(final.var(ddof=1), 3),
      "theory_var", 200)
print("P(hit_20_by_200)", round((walk.max(axis=1) >= 20).mean(), 4))
```

Observed output:

```text
final_mean -0.02 final_var 201.079 theory_var 200
P(hit_20_by_200) 0.1608
```

The mean final position is near zero, but variance grows linearly with time. Individual paths can hit high levels even when the expected step is zero.

## Connections and caveats

The [law of large numbers](law-of-large-numbers.md) says average step size converges; the [central limit theorem](central-limit-theorem.md) explains why $S_n/\sqrt n$ is approximately normal. Random walk baselines appear in time series, but real series can have mean reversion, seasonality, bounded states, and structural breaks.

## References

- [Random walk](https://en.wikipedia.org/wiki/Random_walk)
- [OpenStax Introductory Statistics 2e, Chapter 7 introduction](https://openstax.org/books/introductory-statistics-2e/pages/7-introduction)

---
title: Random Variables
slug: probability-and-statistics/random-variables
description: "Measurable functions that turn outcomes in a probability space into numeric quantities with distributions."
area: probability-and-statistics
topics:
  - random-variables
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - probability-spaces.md
  - common-distributions.md
  - expectation-and-variance.md
  - covariance-and-correlation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Random Variables

A random variable is a function from outcomes to values, not the realized value itself. Given a [probability space](probability-spaces.md) $(\Omega,\mathcal F,P)$, a real-valued random variable is a measurable map $X:\Omega\to\mathbb R$. Its distribution is the induced probability law

$$
P_X(B)=P(\{\omega\in\Omega:X(\omega)\in B\}).
$$

This lets one talk about [common distributions](common-distributions.md), [expectation and variance](expectation-and-variance.md), and relationships such as [covariance and correlation](covariance-and-correlation.md) without listing raw outcomes each time.

## Intuition

The same outcome can feed many random variables. For two dice, one variable might be the sum, another the maximum, and another an indicator that the roll is a double. The distribution is determined by the mapping plus the underlying probability measure.

## Worked computation

```python
import numpy as np

pairs = np.array([(i, j) for i in range(1, 7) for j in range(1, 7)])
vals, counts = np.unique(pairs.max(axis=1), return_counts=True)
pmf = counts / counts.sum()
mu = np.sum(vals * pmf)
var = np.sum((vals - mu) ** 2 * pmf)
print("values", vals.tolist())
print("pmf", np.round(pmf, 4).tolist())
print("E[max]", round(mu, 4), "Var[max]", round(var, 4))
```

Observed output:

```text
values [1, 2, 3, 4, 5, 6]
pmf [0.0278, 0.0833, 0.1389, 0.1944, 0.25, 0.3056]
E[max] 4.4722 Var[max] 1.9715
```

The random variable "maximum of two dice" is biased toward high values because many outcomes map to 5 or 6.

## Caveats

Observed columns are samples from variables, not the variables themselves. A feature distribution can change under sampling bias or deployment drift, so claims about $X$ must name the population and measurement process.

## References

- [OpenStax Introductory Statistics 2e, Chapter 4 introduction](https://openstax.org/books/introductory-statistics-2e/pages/4-introduction)
- [Probability space: random variables](https://en.wikipedia.org/wiki/Probability_space#Random_variables)

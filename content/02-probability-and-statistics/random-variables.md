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

Let $X$ be the maximum of two fair dice. For $X=k$, at least one die must show $k$ and neither die can exceed $k$. The count is therefore $k^2-(k-1)^2=2k-1$ out of 36 ordered outcomes.

| $k$ | Count | $P(X=k)$ |
| --- | ---: | ---: |
| 1 | 1 | $1/36$ |
| 2 | 3 | $3/36$ |
| 3 | 5 | $5/36$ |
| 4 | 7 | $7/36$ |
| 5 | 9 | $9/36$ |
| 6 | 11 | $11/36$ |

The expectation is

$$
\mathbb E[X]=\frac{1\cdot1+2\cdot3+3\cdot5+4\cdot7+5\cdot9+6\cdot11}{36}
=\frac{161}{36}\approx 4.4722.
$$

Using the same probabilities, $\mathbb E[X^2]=791/36$, so $\operatorname{Var}(X)=791/36-(161/36)^2\approx 1.9715$. The random variable "maximum of two dice" is biased toward high values because many more outcomes map to 5 or 6 than to 1 or 2.

## Caveats

Observed columns are samples from variables, not the variables themselves. A feature distribution can change under sampling bias or deployment drift, so claims about $X$ must name the population and measurement process.

## References

- [OpenStax Introductory Statistics 2e, Chapter 4 introduction](https://openstax.org/books/introductory-statistics-2e/pages/4-introduction)
- [Probability space: random variables](https://en.wikipedia.org/wiki/Probability_space#Random_variables)

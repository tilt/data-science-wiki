---
title: Expectation and Variance
slug: probability-and-statistics/expectation-and-variance
description: "Mean and spread of a random variable, used to define risk, standard error, and estimator noise."
area: probability-and-statistics
topics:
  - expectation-and-variance
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - random-variables.md
  - common-distributions.md
  - central-limit-theorem.md
  - covariance-and-correlation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Expectation and Variance

Expectation is the probability-weighted average of a [random variable](random-variables.md); variance is the expected squared distance from that average. For a discrete variable,

$$
\mathbb E[X]=\sum_x xP(X=x), \qquad
\operatorname{Var}(X)=\mathbb E[(X-\mathbb E[X])^2].
$$

The equivalent identity

$$
\operatorname{Var}(X)=\mathbb E[X^2]-(\mathbb E[X])^2
$$

is often easier to compute. These quantities define the parameters of many [common distributions](common-distributions.md), the standard error in the [central limit theorem](central-limit-theorem.md), and the scale used in [covariance and correlation](covariance-and-correlation.md).

## Worked computation

Consider a discrete variable with values $0,1,2,5$ and probabilities $0.50,0.30,0.15,0.05$.

| $x$ | $P(X=x)$ | $xP(X=x)$ | $x^2P(X=x)$ |
| ---: | ---: | ---: | ---: |
| 0 | 0.50 | 0.00 | 0.00 |
| 1 | 0.30 | 0.30 | 0.30 |
| 2 | 0.15 | 0.30 | 0.60 |
| 5 | 0.05 | 0.25 | 1.25 |

The mean is $\mathbb E[X]=0.00+0.30+0.30+0.25=0.85$. The second moment is $\mathbb E[X^2]=2.15$, so

$$
\operatorname{Var}(X)=2.15-0.85^2=1.4275.
$$

Variance is large relative to the mean because the rare value 5 contributes $1.25$ to the second moment, even though its probability is only 5 percent.

## Caveats

The mean is not necessarily a typical value; skewed and heavy-tailed distributions can make it misleading. Some distributions have infinite variance, making normal standard-error formulas invalid.

## References

- [OpenStax Introductory Statistics 2e, Chapter 4 introduction](https://openstax.org/books/introductory-statistics-2e/pages/4-introduction)
- [SciPy statistics reference](https://docs.scipy.org/doc/scipy/reference/stats.html)

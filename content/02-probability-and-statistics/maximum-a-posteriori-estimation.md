---
title: Maximum A Posteriori Estimation
slug: probability-and-statistics/maximum-a-posteriori-estimation
description: "A posterior-mode point estimate that combines likelihood with a prior distribution."
area: probability-and-statistics
topics:
  - maximum-a-posteriori-estimation
level: foundational
status: review
page_type: concept
aliases:
  - MAP Estimation
prerequisites:
  - index.md
related:
  - maximum-likelihood.md
  - bayes-theorem.md
  - bayesian-statistics.md
  - ../03-classical-machine-learning/regularization.md
historical_context: false
last_reviewed: 2026-07-11
---
# Maximum A Posteriori Estimation

MAP estimation chooses the mode of the posterior distribution. By [Bayes' theorem](bayes-theorem.md),

$$
p(\theta\mid D)=\frac{p(D\mid\theta)p(\theta)}{p(D)},
$$

so the denominator can be ignored for optimization:

$$
\hat\theta_{\mathrm{MAP}}
=\arg\max_\theta p(\theta\mid D)
=\arg\max_\theta p(D\mid\theta)p(\theta).
$$

It is [maximum likelihood](maximum-likelihood.md) plus a prior. In many ML objectives, the log-prior acts like [regularization](../03-classical-machine-learning/regularization.md): a Gaussian prior on weights yields an $L_2$ penalty.

## Worked scenario

A coin is tossed 10 times and lands heads 7 times. With a flat $\mathrm{Beta}(1,1)$ prior, the posterior mode is the observed head rate, $0.7$, because the prior contributes no pull toward either side. With a symmetric $\mathrm{Beta}(2,2)$ prior, the prior behaves like one prior head and one prior tail for the posterior mode, giving $(7+1)/(10+2)=0.6667$.

A much stronger symmetric prior, $\mathrm{Beta}(10,10)$, behaves like nine prior heads and nine prior tails for the mode, giving $(7+9)/(10+18)=0.5714$. The likelihood still favors heads, but the prior encodes a strong expectation that the coin is near fair, so the MAP estimate moves toward $0.5$ rather than staying at the sample proportion.

## Caveats

MAP hides posterior uncertainty and can be sensitive to parameterization: a mode can move under nonlinear transformations. [Bayesian statistics](bayesian-statistics.md) often reports posterior means, medians, intervals, or decisions rather than only the posterior mode.

## References

- [Maximum a posteriori estimation](https://en.wikipedia.org/wiki/Maximum_a_posteriori_estimation)
- [SciPy beta distribution](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.beta.html)

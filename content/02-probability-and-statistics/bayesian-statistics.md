---
title: Bayesian Statistics
slug: probability-and-statistics/bayesian-statistics
description: "Statistical inference that represents unknown quantities with posterior probability distributions."
area: probability-and-statistics
topics:
  - bayesian-statistics
level: advanced
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - bayes-theorem.md
  - maximum-a-posteriori-estimation.md
  - statistical-estimation.md
  - confidence-intervals.md
historical_context: false
last_reviewed: 2026-07-22
---

# Bayesian Statistics

Bayesian statistics treats unknown parameters as quantities with probability distributions. A prior $p(\theta)$ and likelihood $p(D\mid\theta)$ produce a posterior

$$
p(\theta\mid D)=\frac{p(D\mid\theta)p(\theta)}
{\int p(D\mid\vartheta)p(\vartheta)\,d\vartheta}.
$$

The posterior is the main object: it supports point summaries, credible intervals, posterior predictive checks, and decisions. [MAP estimation](maximum-a-posteriori-estimation.md) keeps only the posterior mode; full Bayesian analysis keeps the distribution.

## Worked computation

This snippet updates a [Beta](common-distributions.md#beta-distribution) prior after seven heads and three tails, then computes the posterior probability that the coin is biased toward heads and the central credible interval.

```python
import numpy as np
from scipy import stats

heads, tails = 7, 3
a, b = 2 + heads, 2 + tails
prob_gt = 1 - stats.beta.cdf(.5, a, b)
ci = stats.beta.ppf([.025, .975], a, b)
print("posterior_alpha_beta", a, b)
print("P(theta>0.5)", round(prob_gt, 4))
print("central_95_credible_interval", np.round(ci, 4).tolist())
```

Observed output:

```text
posterior_alpha_beta 9 5
P(theta>0.5) 0.8666
central_95_credible_interval [0.3857, 0.8614]
```

The code uses conjugacy: a $\operatorname{Beta}(2,2)$ prior plus 7 heads and 3 tails gives posterior parameters $(2+7,2+3)=(9,5)$. It then evaluates the posterior CDF at $0.5$, giving $P(\theta>0.5)=0.8666$, and uses the 2.5% and 97.5% posterior quantiles to get the central credible interval $[0.3857,0.8614]$.

![Posterior density for a Beta(9,5) distribution with theta=0.5 marked and the central 95 percent credible interval shaded.](../assets/diagrams/bayesian-statistics-beta-posterior.svg)

The shaded interval is a posterior probability statement conditional on the model, unlike a frequentist [confidence interval](confidence-intervals.md). The red line at $\theta=0.5$ sits left of most posterior mass, which is why the probability that the coin is biased toward heads is about 86.7%.

## Caveats

Priors matter most with limited data. Computation can also be the weak link: approximate samplers need convergence checks, and posterior predictive checks should confront the [statistical model](statistical-modelling.md) with data features that matter.

## References

- [Bayesian statistics](https://en.wikipedia.org/wiki/Bayesian_statistics)
- [SciPy beta distribution](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.beta.html)

> [!nav]
> **Section** — [Probability and Statistics](index.md)
>
> [← Maximum A Posteriori Estimation](maximum-a-posteriori-estimation.md) [Confidence Intervals →](confidence-intervals.md)

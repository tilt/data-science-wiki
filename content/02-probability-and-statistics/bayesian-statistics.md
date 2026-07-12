---
title: Bayesian Statistics
slug: probability-and-statistics/bayesian-statistics
description: "Statistical inference that represents unknown quantities with posterior probability distributions."
area: probability-and-statistics
topics:
  - bayesian-statistics
level: advanced
status: review
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
last_reviewed: 2026-07-11
---
# Bayesian Statistics

Bayesian statistics treats unknown parameters as quantities with probability distributions. A prior $p(\theta)$ and likelihood $p(D\mid\theta)$ produce a posterior

$$
p(\theta\mid D)=\frac{p(D\mid\theta)p(\theta)}
{\int p(D\mid\vartheta)p(\vartheta)\,d\vartheta}.
$$

The posterior is the main object: it supports point summaries, credible intervals, posterior predictive checks, and decisions. [MAP estimation](maximum-a-posteriori-estimation.md) keeps only the posterior mode; full Bayesian analysis keeps the distribution.

## Worked computation

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

A $\operatorname{Beta}(2,2)$ prior and 7 heads in 10 flips give a $\operatorname{Beta}(9,5)$ posterior. Unlike a frequentist [confidence interval](confidence-intervals.md), the credible interval is a posterior probability statement conditional on the model.

## Caveats

Priors matter most with limited data. Computation can also be the weak link: approximate samplers need convergence checks, and posterior predictive checks should confront the [statistical model](statistical-modelling.md) with data features that matter.

## References

- [Bayesian statistics](https://en.wikipedia.org/wiki/Bayesian_statistics)
- [SciPy beta distribution](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.beta.html)

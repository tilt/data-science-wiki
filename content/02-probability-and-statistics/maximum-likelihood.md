---
title: Maximum Likelihood
slug: probability-and-statistics/maximum-likelihood
description: "Parameter estimation by choosing the value that makes the observed data most probable under the model."
area: probability-and-statistics
topics:
  - maximum-likelihood
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - statistical-estimation.md
  - maximum-a-posteriori-estimation.md
  - common-distributions.md
  - ../03-classical-machine-learning/logistic-regression.md
historical_context: false
last_reviewed: 2026-07-11
---
# Maximum Likelihood

Maximum likelihood estimation chooses model parameters that assign high probability or density to the observed data. For independent observations $x_1,\ldots,x_n$ from $p(x\mid\theta)$,

$$
L(\theta)=\prod_{i=1}^n p(x_i\mid\theta), \qquad
\hat\theta_{\mathrm{MLE}}=\arg\max_\theta L(\theta).
$$

The log-likelihood is usually optimized:

$$
\ell(\theta)=\sum_{i=1}^n \log p(x_i\mid\theta).
$$

This connects [common distributions](common-distributions.md) to losses: Gaussian regression uses squared error, while [logistic regression](../03-classical-machine-learning/logistic-regression.md) uses Bernoulli negative log-likelihood. [MAP estimation](maximum-a-posteriori-estimation.md) adds a prior term to the same likelihood.

## Worked computation

```python
import numpy as np

flips = np.array([1] * 7 + [0] * 3)
grid = np.linspace(.01, .99, 99)
ll = np.array([
    np.sum(flips * np.log(p) + (1 - flips) * np.log(1 - p))
    for p in grid
])
print("grid_mle_p", round(grid[ll.argmax()], 2), "closed_form", flips.mean())
print("loglik_at_.5", round(np.sum(flips * np.log(.5) + (1 - flips) * np.log(.5)), 4),
      "loglik_at_.7", round(ll.max(), 4))
```

Observed output:

```text
grid_mle_p 0.7 closed_form 0.7
loglik_at_.5 -6.9315 loglik_at_.7 -6.1086
```

For Bernoulli data, the MLE is the sample proportion. The log-likelihood at $p=0.7$ is less negative than at a fair coin.

## Caveats

MLE is a point estimate, so it needs [confidence intervals](confidence-intervals.md) or posterior summaries to express uncertainty. It can overfit flexible models, diverge under separation, and be biased when the likelihood is misspecified.

## References

- [Maximum likelihood estimation](https://en.wikipedia.org/wiki/Maximum_likelihood_estimation)
- [SciPy statistics reference](https://docs.scipy.org/doc/scipy/reference/stats.html)

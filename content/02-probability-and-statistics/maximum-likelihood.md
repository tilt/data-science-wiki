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

Here $x_i$ is the $i$th observed data point, $\theta$ is the unknown model parameter, and $p(x_i\mid\theta)$ is the probability mass or density assigned by the model. The product appears because the observations are assumed independent; maximizing it chooses the parameter value that makes the whole observed sample most plausible.

The log-likelihood is usually optimized:

$$
\ell(\theta)=\sum_{i=1}^n \log p(x_i\mid\theta).
$$

The logarithm turns the product into a sum without changing the maximizer, which is numerically more stable and easier to differentiate.

This connects [common distributions](common-distributions.md) to losses: Gaussian regression uses squared error, while [logistic regression](../03-classical-machine-learning/logistic-regression.md) uses Bernoulli negative log-likelihood. [MAP estimation](maximum-a-posteriori-estimation.md) adds a prior term to the same likelihood.

## Worked computation

Suppose a coin is flipped 10 times and produces 7 heads. Under a Bernoulli model with head probability $p$, the likelihood is

$$
L(p)=p^7(1-p)^3,
\qquad
\ell(p)=7\log p+3\log(1-p).
$$

Differentiating gives

$$
\frac{d\ell}{dp}=\frac{7}{p}-\frac{3}{1-p}.
$$

Setting this derivative to zero yields $7(1-p)=3p$, so $\hat p=7/10=0.7$. The fair-coin log-likelihood is $10\log(0.5)\approx -6.9315$, while the fitted value gives $7\log(0.7)+3\log(0.3)\approx -6.1086$. The MLE is preferred because it assigns the observed sequence a higher probability, which appears as a less negative log-likelihood.

## Caveats

MLE is a point estimate, so it needs [confidence intervals](confidence-intervals.md) or posterior summaries to express uncertainty. It can overfit flexible models, diverge under separation, and be biased when the likelihood is misspecified.

## References

- [Maximum likelihood estimation](https://en.wikipedia.org/wiki/Maximum_likelihood_estimation)
- [SciPy statistics reference](https://docs.scipy.org/doc/scipy/reference/stats.html)

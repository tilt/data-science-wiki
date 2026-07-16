---
title: Mutual Information
slug: mathematical-foundations/mutual-information
description: "Information shared between variables, expressed as a KL divergence from independence."
area: mathematical-foundations
topics:
  - information-theory
  - mutual-information
level: foundational
status: review
page_type: concept
aliases:
  - MI
prerequisites:
  - entropy.md
related:
  - information-theory.md
  - entropy.md
  - kl-divergence.md
  - cross-entropy.md
  - ../02-probability-and-statistics/conditional-probability.md
historical_context: false
last_reviewed: 2026-07-11
---

# Mutual Information

Mutual information measures how much knowing one variable reduces uncertainty about another. It is zero exactly when the variables are independent, and positive when their joint distribution carries structure beyond separate marginals in the sense of [conditional probability](../02-probability-and-statistics/conditional-probability.md).

## Defining math

For discrete variables,

$$
I(X;Y)=\sum_{x,y}p(x,y)\log_2\frac{p(x,y)}{p(x)p(y)}.
$$

Here $p(x,y)$ is the joint probability of a pair of outcomes, while $p(x)$ and $p(y)$ are the marginal probabilities each variable would have on its own. The ratio compares the observed joint probability with what independence would predict; the log term is zero when the two match and nonzero when knowing one variable changes expectations about the other.

Equivalently, using [entropy](entropy.md),

$$
I(X;Y)=H(X)-H(X\mid Y)=H(Y)-H(Y\mid X).
$$

This form says mutual information is uncertainty removed: $H(X)$ is the uncertainty in $X$ before seeing $Y$, and $H(X\mid Y)$ is the remaining uncertainty after $Y$ is known.

The first formula shows mutual information as a [KL divergence](kl-divergence.md):

$$
I(X;Y)=D_{\mathrm{KL}}(p(x,y)\Vert p(x)p(y)).
$$

That connection ties MI to [information theory](information-theory.md), feature selection, representation learning, and diagnostics for dependence beyond linear correlation. It is related to [cross-entropy](cross-entropy.md) through the same expected-log-probability algebra, but it compares dependence rather than predictive code length.

## Worked scenario

Consider two binary variables whose joint table puts probability $0.4$ on matching outcomes $(0,0)$ and $(1,1)$, and probability $0.1$ on mismatches $(0,1)$ and $(1,0)$. Each marginal is still balanced at $0.5/0.5$, so independence would assign $0.25$ to every cell. The matching cells are therefore more likely than independence predicts, and the mismatch cells are less likely.

Plugging those four cells into $\sum p(x,y)\log_2[p(x,y)/(p(x)p(y))]$ gives about $0.2781$ bits of shared information. If the joint table were exactly the product of its marginals, every ratio inside the log would be $1$, every log term would be $0$, and the mutual information would be $0$ because knowing $X$ would not change the probabilities for $Y$.

## Caveats

Mutual information is hard to estimate from finite continuous data without modeling or binning choices. It detects dependence but not direction or causality, and high-cardinality variables can produce biased empirical estimates.

## References

- [MacKay, Information Theory, Inference, and Learning Algorithms](https://www.inference.org.uk/itprnn/book.pdf)
- [SciPy documentation: `scipy.special.rel_entr`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.special.rel_entr.html)

> [!nav]
> **Section** — [Mathematical Foundations](index.md)
>
> [← KL Divergence](kl-divergence.md)

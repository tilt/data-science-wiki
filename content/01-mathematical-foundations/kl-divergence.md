---
title: KL Divergence
slug: mathematical-foundations/kl-divergence
description: "An asymmetric measure of how one probability distribution differs from another."
area: mathematical-foundations
topics:
  - information-theory
  - kl-divergence
level: foundational
status: review
page_type: concept
aliases:
  - Kullback-Leibler divergence
prerequisites:
  - entropy.md
related:
  - entropy.md
  - cross-entropy.md
  - mutual-information.md
  - information-theory.md
  - ../06-deep-learning/loss-functions.md
historical_context: false
last_reviewed: 2026-07-16
---

# KL Divergence

KL divergence measures the extra expected log loss from using distribution $q$ when the data follow $p$. It is central to [information theory](information-theory.md), maximum-likelihood training, variational inference, language modeling, and regularized objectives.

## Defining math

For discrete distributions with $p$ absolutely continuous with respect to $q$,

$$
D_{\mathrm{KL}}(p\Vert q)=\sum_x p(x)\log_2\frac{p(x)}{q(x)}.
$$

It is nonnegative and equals zero only when $p=q$ on the support. It is not a distance because it is asymmetric:

$$
D_{\mathrm{KL}}(p\Vert q)\ne D_{\mathrm{KL}}(q\Vert p)
$$

in general. [Cross-entropy](cross-entropy.md) decomposes as $H(p,q)=H(p)+D_{\mathrm{KL}}(p\Vert q)$, and [mutual information](mutual-information.md) is a KL divergence between a joint distribution and the product of its marginals.

## Worked example

Take $p=(0.7,0.2,0.1)$ and $q=(0.4,0.4,0.2)$. Summing $p(x)\log_2\frac{p(x)}{q(x)}$ term by term,

$$
D_{\mathrm{KL}}(p\Vert q)=0.7\log_2\tfrac{0.7}{0.4}+0.2\log_2\tfrac{0.2}{0.4}+0.1\log_2\tfrac{0.1}{0.2}
=0.7(0.807)-0.2-0.1\approx0.265\ \text{bits}.
$$

Swapping the roles of $p$ and $q$ gives the reverse divergence,

$$
D_{\mathrm{KL}}(q\Vert p)=0.4\log_2\tfrac{0.4}{0.7}+0.4\log_2\tfrac{0.4}{0.2}+0.2\log_2\tfrac{0.2}{0.1}\approx0.277\ \text{bits},
$$

a different value on the same pair of distributions. That asymmetry matters: fitting $q$ to cover all mass of $p$ is not the same pressure as fitting $q$ to avoid placing mass where $p$ is small.

## Caveats

KL divergence becomes infinite if $q(x)=0$ for an event with $p(x)>0$. Empirical estimates can be fragile in sparse categories, so smoothing and support checks are part of the modeling decision, not just implementation details for probabilistic [loss functions](../06-deep-learning/loss-functions.md).

## References

- [MacKay, Information Theory, Inference, and Learning Algorithms](https://www.inference.org.uk/itprnn/book.pdf)

> [!nav]
> **Section** — [Mathematical Foundations](index.md)
>
> [← Cross Entropy](cross-entropy.md) [Mutual Information →](mutual-information.md)

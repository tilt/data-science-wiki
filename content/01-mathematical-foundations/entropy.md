---
title: Entropy
slug: mathematical-foundations/entropy
description: "Expected surprise of a probability distribution, measured in bits or nats."
area: mathematical-foundations
topics:
  - information-theory
  - entropy
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - information-theory.md
related:
  - information-theory.md
  - cross-entropy.md
  - kl-divergence.md
  - mutual-information.md
  - ../02-probability-and-statistics/random-variables.md
historical_context: false
last_reviewed: 2026-07-11
---
# Entropy

Entropy is the expected surprise of a random variable. A concentrated distribution has low entropy because outcomes are predictable; a uniform distribution has higher entropy because more outcomes remain plausible.

## Defining math

For a discrete distribution $p$ over outcomes $x$,

$$
H(X)=-\sum_x p(x)\log_2 p(x).
$$

The convention is $0\log 0=0$ by limit. Base-2 logarithms measure bits; natural logarithms measure nats. Entropy is the baseline term in [cross-entropy](cross-entropy.md):

$$
H(p,q)=H(p)+D_{\mathrm{KL}}(p\Vert q).
$$

That identity explains why minimizing cross-entropy over $q$ is equivalent to minimizing [KL divergence](kl-divergence.md) from the data distribution when $p$ is fixed.

## Worked scenario

Imagine a three-symbol source where $A$ appears half the time and $B$ and $C$ each appear one quarter of the time. Seeing $A$ carries $-\log_2(0.5)=1$ bit of surprise, while seeing either rarer symbol carries $-\log_2(0.25)=2$ bits. The expected surprise is therefore $0.5\cdot 1+0.25\cdot 2+0.25\cdot 2=1.5$ bits.

If the same source were uniform over three symbols, every outcome would carry $-\log_2(1/3)\approx 1.585$ bits. Uniform entropy is higher because no symbol can be guessed more confidently than another; the skewed source is partly predictable before the next symbol arrives.

## Caveats

Entropy is not variance. Relabeling categories leaves entropy unchanged, and two distributions with very different practical consequences can have the same entropy. For dependence between variables, use [mutual information](mutual-information.md), not marginal entropy alone.

## References

- [MacKay, Information Theory, Inference, and Learning Algorithms](https://www.inference.org.uk/itprnn/book.pdf)
- [SciPy documentation: `scipy.special.rel_entr`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.special.rel_entr.html)

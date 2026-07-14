---
title: Cross Entropy
slug: mathematical-foundations/cross-entropy
description: "Expected code length or log loss when distribution q is used for data from p."
area: mathematical-foundations
topics:
  - information-theory
  - cross-entropy
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - entropy.md
related:
  - entropy.md
  - kl-divergence.md
  - information-theory.md
  - numerical-stability.md
  - ../06-deep-learning/loss-functions.md
historical_context: false
last_reviewed: 2026-07-11
---

# Cross Entropy

Cross-entropy measures the expected negative log probability assigned by model distribution $q$ to events generated from true distribution $p$. In classification, it is the mathematical form behind multinomial log loss and many deep-learning [loss functions](../06-deep-learning/loss-functions.md).

## Defining math

For discrete distributions $p$ and $q$ on the same support,

$$
H(p,q)=-\sum_x p(x)\log q(x).
$$

It decomposes as

$$
H(p,q)=H(p)+D_{\mathrm{KL}}(p\Vert q).
$$

Since $H(p)$ does not depend on the model, minimizing cross-entropy over $q$ also minimizes [KL divergence](kl-divergence.md). For one-hot class labels, $p$ puts all mass on the true class, so the loss reduces to $-\log q(y)$.

## Worked scenario

Suppose the true class distribution is $p=(0.7,0.2,0.1)$, but a model reports $q=(0.6,0.3,0.1)$. Cross-entropy asks how many bits are needed on average when examples arrive from $p$ but are encoded using probabilities from $q$: the first class contributes $-0.7\log_2(0.6)$, the second contributes $-0.2\log_2(0.3)$, and the third contributes $-0.1\log_2(0.1)$, for about $1.1955$ bits.

This is larger than $H(p)$ because $q$ is not exactly the data distribution. The extra cost is $D_{\mathrm{KL}}(p\Vert q)$; stable implementations combine log-softmax with the loss instead of separately computing probabilities, which connects this page to [numerical stability](numerical-stability.md).

## Caveats

Cross-entropy heavily penalizes confident wrong probabilities. That is useful for probabilistic training, but noisy labels or uncalibrated targets can dominate the loss. If support differs and $q(x)=0$ where $p(x)>0$, the cross-entropy is infinite.

## References

- [MacKay, Information Theory, Inference, and Learning Algorithms](https://www.inference.org.uk/itprnn/book.pdf)
- [SciPy documentation: `scipy.special.rel_entr`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.special.rel_entr.html)

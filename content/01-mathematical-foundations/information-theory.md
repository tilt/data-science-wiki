---
title: Information Theory
slug: mathematical-foundations/information-theory
description: "Mathematics of uncertainty, coding, divergence, and information shared between variables."
area: mathematical-foundations
topics:
  - information-theory
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - entropy.md
  - cross-entropy.md
  - kl-divergence.md
  - mutual-information.md
  - ../06-deep-learning/loss-functions.md
historical_context: false
last_reviewed: 2026-07-11
---
# Information Theory

Information theory measures uncertainty, surprise, compression, and dependence. In machine learning it appears whenever probabilities become objectives: [cross-entropy](cross-entropy.md) losses, [KL divergence](kl-divergence.md) regularizers, mutual-information criteria, calibration, and generative-model likelihoods.

## Defining math

For a discrete outcome $x$ with probability $p(x)$, its self-information or surprisal is

$$
I(x)=-\log_2 p(x).
$$

The expected surprisal is [entropy](entropy.md):

$$
H(X)=-\sum_x p(x)\log_2 p(x).
$$

From entropy come the main derived quantities:

$$
H(p,q)=-\sum_x p(x)\log q(x),\qquad
D_{\mathrm{KL}}(p\Vert q)=\sum_x p(x)\log\frac{p(x)}{q(x)},
$$

and [mutual information](mutual-information.md), $I(X;Y)=D_{\mathrm{KL}}(p(x,y)\Vert p(x)p(y))$. The log base sets units: base 2 gives bits; natural log gives nats.

## Worked scenario

For a source with probabilities $(0.5,0.25,0.25)$, the most likely event carries $-\log_2(0.5)=1$ bit of surprisal. Each less likely event carries $-\log_2(0.25)=2$ bits because it takes one more yes/no distinction to isolate an outcome that happens only one quarter of the time.

The expected code length is the probability-weighted average, $0.5\cdot 1+0.25\cdot 2+0.25\cdot 2=1.5$ bits. That is the entropy: common events cost fewer bits when they occur, rare events cost more, and the average measures the source's uncertainty before observing the event.

## Caveats

Information quantities depend on the probability model. Empirical estimates can be biased with sparse samples, and continuous variables require densities or discretization choices rather than the simple finite-sum formulas above.

## References

- [MacKay, Information Theory, Inference, and Learning Algorithms](https://www.inference.org.uk/itprnn/book.pdf)
- [SciPy documentation: `scipy.special.rel_entr`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.special.rel_entr.html)

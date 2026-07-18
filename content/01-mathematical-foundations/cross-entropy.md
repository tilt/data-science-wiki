---
title: Cross Entropy
slug: mathematical-foundations/cross-entropy
description: "Expected code length or log loss when distribution q is used for data from p."
area: mathematical-foundations
topics:
  - information-theory
  - cross-entropy
level: foundational
status: complete
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
last_reviewed: 2026-07-17
---

# Cross Entropy

Cross-entropy measures the expected negative log probability assigned by model distribution $q$ to events generated from true distribution $p$. In classification, it is the mathematical form behind multinomial log loss and many deep-learning [loss functions](../06-deep-learning/loss-functions.md).

The distinction from [entropy](entropy.md) is which probabilities define the code. Entropy asks for the best average code length when the true distribution $p$ is known and used. Cross-entropy asks for the average code length when events still come from $p$, but the code or model behaves as if $q$ were true. If $q$ puts too little probability on events that actually happen often, those common events receive overly long codes and the average length rises.

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

Read the summand as "frequency under reality times surprise under the model." The factor $p(x)$ says how often outcome $x$ appears; the factor $-\log q(x)$ says how many bits the model's probabilities would spend when that outcome appears.

For a supervised classifier, the same formula is usually written with ground-truth labels and predicted class probabilities. For one training example $i$ with $K$ classes, let

- $y_{ik}$ be the ground-truth target for class $k$,
- $\hat p_\theta(k\mid x_i)$ be the model's predicted probability for class $k$.

Then the per-example classifier loss is

$$
\ell_i(\theta)=-\sum_{k=1}^K y_{ik}\log \hat p_\theta(k\mid x_i).
$$

For a dataset of $n$ labeled examples, training minimizes the average loss

$$
L(\theta)=-\frac{1}{n}\sum_{i=1}^n\sum_{k=1}^K y_{ik}\log \hat p_\theta(k\mid x_i).
$$

With one-hot labels, $y_{ik}=1$ only for the correct class $c_i$ and $0$ for every other class, so the sum collapses to

$$
\ell_i(\theta)=-\log \hat p_\theta(c_i\mid x_i).
$$

That is the key machine-learning interpretation: cross-entropy does not punish the predicted label directly; it punishes the probability assigned to the true label. A confident wrong prediction gets a large loss because $\log \hat p_\theta(c_i\mid x_i)$ becomes very negative when the true-class probability is near zero.

## Worked examples

### Classifier loss

Suppose a three-class classifier sees one example whose true class is class 1. The one-hot target is

$$
y=(1,0,0),
$$

and the model predicts

$$
\hat p_\theta(\cdot\mid x)=(0.6,0.3,0.1).
$$

The cross-entropy loss for this example is

$$
-\sum_{k=1}^3 y_k\log_2 \hat p_\theta(k\mid x)
=-\log_2(0.6)
\approx 0.737\ \text{bits}.
$$

Only the true class contributes because the other target entries are zero. If the same model assigned probability $0.05$ to the true class, the loss would become $-\log_2(0.05)\approx4.322$ bits, even if the final argmax prediction were the only thing reported downstream.

### Distribution and coding length

For soft labels or population distributions, the full sum remains active. Suppose the true event distribution is

$$
p=(0.7,0.2,0.1),
$$

but the model or code assigns probabilities

$$
q=(0.6,0.3,0.1).
$$

Cross-entropy asks how many bits are needed on average when events arrive from $p$ but are encoded using probabilities from $q$:

$$
H(p,q)
=-\left(0.7\log_2(0.6)+0.2\log_2(0.3)+0.1\log_2(0.1)\right)
\approx1.1955\ \text{bits}.
$$

This is the information-theoretic version of the same penalty. Probability mass from the real source distribution $p$ weights the surprise under $q$. If $q$ underestimates events that happen often under $p$, the expected code length rises.

The comparison to a uniform code makes the intuition clearer. If the code ignored the event frequencies and used

$$
u=\left(\frac13,\frac13,\frac13\right),
$$

then

$$
H(p,u)
=-\sum_{k=1}^3 p_k\log_2\left(\frac13\right)
=\log_2(3)
\approx1.585\ \text{bits}.
$$

The uniform code is worse because it spends the same probability budget on all events even though the first event occurs 70 percent of the time. It gives that common event only probability $1/3$, so the common case receives $-\log_2(1/3)\approx1.585$ bits instead of the shorter $-\log_2(0.6)\approx0.737$ bits assigned by $q$. The nonuniform $q=(0.6,0.3,0.1)$ is still imperfect, but it is closer to $p$ and therefore has lower expected code length.

Both values are larger than $H(p)$ because neither $q$ nor $u$ is exactly the data distribution. The extra cost is $D_{\mathrm{KL}}(p\Vert q)$; stable implementations combine log-softmax with the loss instead of separately computing probabilities, which connects this page to [numerical stability](numerical-stability.md).

## Caveats

Cross-entropy heavily penalizes confident wrong probabilities. That is useful for probabilistic training, but noisy labels or uncalibrated targets can dominate the loss. If support differs and $q(x)=0$ where $p(x)>0$, the cross-entropy is infinite.

## References

- [MacKay, Information Theory, Inference, and Learning Algorithms](https://www.inference.org.uk/itprnn/book.pdf)
- [SciPy documentation: `scipy.special.rel_entr`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.special.rel_entr.html)

> [!nav]
> **Section** — [Mathematical Foundations](index.md)
>
> [← Entropy](entropy.md) [KL Divergence →](kl-divergence.md)

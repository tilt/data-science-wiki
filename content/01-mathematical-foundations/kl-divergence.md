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
last_reviewed: 2026-07-11
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

## Executed demo

```python
import numpy as np

p = np.array([0.7, 0.2, 0.1])
q = np.array([0.4, 0.4, 0.2])
print("KL_bits", round(np.sum(p*np.log2(p/q)), 4))
print("reverse_KL_bits", round(np.sum(q*np.log2(q/p)), 4))
```

Observed output:

```text
KL_bits 0.2651
reverse_KL_bits 0.2771
```

The two directions differ on the same pair of distributions. That asymmetry matters: fitting $q$ to cover all mass of $p$ is not the same pressure as fitting $q$ to avoid placing mass where $p$ is small.

## Caveats

KL divergence becomes infinite if $q(x)=0$ for an event with $p(x)>0$. Empirical estimates can be fragile in sparse categories, so smoothing and support checks are part of the modeling decision, not just implementation details for probabilistic [loss functions](../06-deep-learning/loss-functions.md).

## References

- [SciPy documentation: `scipy.special.rel_entr`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.special.rel_entr.html)
- [MacKay, Information Theory, Inference, and Learning Algorithms](https://www.inference.org.uk/itprnn/book.pdf)

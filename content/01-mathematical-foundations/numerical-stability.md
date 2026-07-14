---
title: Numerical Stability
slug: mathematical-foundations/numerical-stability
description: "How mathematically equivalent computations differ under finite-precision arithmetic."
area: mathematical-foundations
topics:
  - numerical-stability
  - floating-point
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - matrix-multiplication.md
related:
  - norms-and-distances.md
  - matrix-decompositions.md
  - optimization.md
  - cross-entropy.md
  - ../06-deep-learning/mixed-precision.md
historical_context: false
last_reviewed: 2026-07-11
---

# Numerical Stability

Numerical stability is about whether an algorithm preserves useful accuracy under finite-precision arithmetic. Two formulas can be algebraically identical but behave differently when exponentials overflow, nearly equal numbers subtract, or a matrix is ill-conditioned.

## Defining math

For softmax,

$$
\operatorname{softmax}(z)_i=\frac{e^{z_i}}{\sum_j e^{z_j}}.
$$

Subtracting a constant $c$ from every logit leaves the result unchanged:

$$
\frac{e^{z_i-c}}{\sum_j e^{z_j-c}}=\frac{e^{z_i}}{\sum_j e^{z_j}}.
$$

Choosing $c=\max_j z_j$ prevents the largest exponent from exceeding $1$. The same idea underlies stable log-sum-exp and stable [cross-entropy](cross-entropy.md) implementations. For matrices, condition numbers and singular values from [matrix decompositions](matrix-decompositions.md) describe how much input error can be amplified.

## Executed demo

This snippet contrasts a naive softmax on very large logits with the max-shifted stable version that avoids overflow.

```python
import numpy as np

z = np.array([1000., 1001., 1002.])
naive = np.exp(z) / np.exp(z).sum()
stable = np.exp(z-z.max()) / np.exp(z-z.max()).sum()
print("naive_softmax", naive)
print("stable_softmax", np.round(stable, 6))
print("finite_stable", np.isfinite(stable).all())
```

Observed output:

```text
naive_softmax [nan nan nan]
stable_softmax [0.090031 0.244728 0.665241]
finite_stable True
```

The naive expression overflows and prints `[nan nan nan]` because exponentials near $e^{1000}$ exceed floating-point range. Subtracting the maximum before exponentiating returns finite probabilities, `[0.090031,0.244728,0.665241]`, with the same mathematical softmax value.

## Caveats

Stability fixes should preserve the target computation, not silently change it. Clipping probabilities, adding epsilons, or switching precision can mask bugs if the altered objective no longer matches the intended [optimization](optimization.md) problem.

## References

- [SciPy documentation: `scipy.special.softmax`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.special.softmax.html)
- [NumPy documentation: `numpy.linalg.cond`](https://numpy.org/doc/stable/reference/generated/numpy.linalg.cond.html)

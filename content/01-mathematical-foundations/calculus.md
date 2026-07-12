---
title: Calculus
slug: mathematical-foundations/calculus
description: "Local change, accumulation, and approximation for functions used in learning systems."
area: mathematical-foundations
topics:
  - calculus
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - gradients.md
  - jacobians-and-hessians.md
  - gradient-descent.md
  - optimization.md
  - ../06-deep-learning/backpropagation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Calculus

Calculus turns functions into local rates of change and accumulated quantities. In machine learning, the most common use is differential: approximate how a loss changes when inputs, weights, or logits move a small amount.

## Defining math

For a scalar function $f$, the derivative at $x$ is

$$
f'(x)=\lim_{h\to 0}\frac{f(x+h)-f(x)}{h}.
$$

The first-order Taylor approximation is

$$
f(x+\Delta x)\approx f(x)+f'(x)\Delta x.
$$

Multivariable calculus replaces $f'(x)$ with [gradients](gradients.md), [Jacobians and Hessians](jacobians-and-hessians.md), and directional derivatives. The same chain rule is what lets [backpropagation](../06-deep-learning/backpropagation.md) compose local derivatives through a computational graph.

## Executed demo

```python
import numpy as np

h = 1e-5
f = lambda x: np.sin(x) * np.exp(-0.2*x)
x = 0.7
fd = (f(x+h) - f(x-h)) / (2*h)
true = np.exp(-0.2*x) * (np.cos(x) - 0.2*np.sin(x))
print("central_diff", round(fd, 8))
print("analytic", round(true, 8))
print("abs_error", f"{abs(fd-true):.2e}")
```

Observed output:

```text
central_diff 0.55291066
analytic 0.55291066
abs_error 7.01e-12
```

The centered finite difference matches the analytic derivative for this smooth function. That local slope is exactly the kind of signal [gradient descent](gradient-descent.md) uses when minimizing a loss.

## Caveats

Numerical derivatives depend on step size: too large gives truncation error, too small magnifies floating-point cancellation. Non-smooth points can have subgradients or one-sided derivatives rather than a single ordinary derivative.

## References

- [MIT OpenCourseWare: 18.01SC Single Variable Calculus](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/)
- [MIT OpenCourseWare: 18.02SC Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/)

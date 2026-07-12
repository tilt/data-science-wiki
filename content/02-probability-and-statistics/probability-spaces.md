---
title: Probability Spaces
slug: probability-and-statistics/probability-spaces
description: "The sample space, event sigma-algebra, and probability measure that make probabilistic statements well-defined."
area: probability-and-statistics
topics:
  - probability-spaces
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - random-variables.md
  - conditional-probability.md
  - expectation-and-variance.md
  - common-distributions.md
historical_context: false
last_reviewed: 2026-07-11
---
# Probability Spaces

A probability space is the formal container for randomness. It specifies possible outcomes, which outcome sets count as events, and how probability is assigned before [random variables](random-variables.md), [conditional probability](conditional-probability.md), or [expectation](expectation-and-variance.md) can be defined.

## Definition

A probability space is a triple $(\Omega,\mathcal F,P)$:

$$
\Omega=\text{sample space}, \qquad
\mathcal F=\text{sigma-algebra of events}, \qquad
P:\mathcal F\to[0,1].
$$

The measure satisfies $P(\Omega)=1$, $P(A)\ge 0$, and countable additivity:

$$
P\left(\bigcup_{i=1}^{\infty} A_i\right)=\sum_{i=1}^{\infty}P(A_i)
\quad\text{for disjoint }A_i\in\mathcal F.
$$

For finite sample spaces, $\mathcal F$ is often the power set. For continuous spaces, $\mathcal F$ matters because not every informal subset is measurable.

## Worked computation

```python
import numpy as np

pairs = np.array([(i, j) for i in range(1, 7) for j in range(1, 7)])
A = pairs.sum(axis=1) >= 10
B = pairs[:, 0] == pairs[:, 1]
print("outcomes", len(pairs))
print("P(sum>=10)", A.mean())
print("P(doubles)", B.mean())
print("P(union)", np.logical_or(A, B).mean(), "check",
      A.mean() + B.mean() - np.logical_and(A, B).mean())
```

Observed output:

```text
outcomes 36
P(sum>=10) 0.16666666666666666
P(doubles) 0.16666666666666666
P(union) 0.2777777777777778 check 0.2777777777777778
```

The union probability matches $P(A\cup B)=P(A)+P(B)-P(A\cap B)$ because the event algebra supports complements, intersections, and unions.

## Caveats

Most mistakes come from changing $\Omega$ mid-argument. Conditioning on "flagged users" uses a different reference population than all users, and a density on $\mathbb R$ assigns probability to intervals rather than exact points.

## References

- [Probability space](https://en.wikipedia.org/wiki/Probability_space)
- [OpenStax Introductory Statistics 2e, Chapter 3 introduction](https://openstax.org/books/introductory-statistics-2e/pages/3-introduction)

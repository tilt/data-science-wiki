---
title: Conditional Probability
slug: probability-and-statistics/conditional-probability
description: "Probability after restricting attention to cases where the conditioning event occurred."
area: probability-and-statistics
topics:
  - conditional-probability
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - probability-spaces.md
  - bayes-theorem.md
  - common-distributions.md
  - hypothesis-testing.md
historical_context: false
last_reviewed: 2026-07-11
---
# Conditional Probability

Conditional probability changes the reference population. For events $A$ and $B$ in a [probability space](probability-spaces.md), with $P(B)>0$,

$$
P(A\mid B)=\frac{P(A\cap B)}{P(B)}.
$$

This definition is the algebraic base for [Bayes' theorem](bayes-theorem.md), diagnostic tests, classifier calibration, and likelihood calculations in [hypothesis testing](hypothesis-testing.md).

## Intuition

Conditioning discards outcomes outside $B$ and renormalizes the remaining mass to one. The event $A$ is then evaluated only inside that narrowed sample space. This is why $P(A\mid B)$ and $P(B\mid A)$ can be very different.

## Worked computation

```python
import numpy as np

rng = np.random.default_rng(20260711)
N = 500000
disease = rng.random(N) < 0.01
positive = np.where(disease, rng.random(N) < 0.99, rng.random(N) < 0.05)
exact = (0.99 * 0.01) / (0.99 * 0.01 + 0.05 * 0.99)
print("sim_P(disease|positive)", round(disease[positive].mean(), 4))
print("exact", round(exact, 4), "positive_rate", round(positive.mean(), 4))
```

Observed output:

```text
sim_P(disease|positive) 0.1646
exact 0.1667 positive_rate 0.0596
```

The simulation gives $P(disease\mid positive)\approx0.1646$, close to the exact value `0.1667`. Even with 99 percent sensitivity, most positives are false positives because the positive rate is only about `0.0596` and the false-positive term is applied to the much larger healthy group.

## Caveats

Conditioning on a post-treatment event, selected sample, or model flag can introduce selection bias. Independence is a special claim: $P(A\mid B)=P(A)$, not the default.

## References

- [ProbabilityCourse: Conditional Probability](https://www.probabilitycourse.com/chapter1/1_4_0_conditional_probability.php)
- [OpenStax Introductory Statistics 2e, Chapter 3 introduction](https://openstax.org/books/introductory-statistics-2e/pages/3-introduction)

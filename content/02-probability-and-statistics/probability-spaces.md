---
title: Probability Spaces
slug: probability-and-statistics/probability-spaces
description: "The sample space, event sigma-algebra, and probability measure that make probabilistic statements well-defined."
area: probability-and-statistics
topics:
  - probability-spaces
level: foundational
status: complete
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
last_reviewed: 2026-07-22
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

For two fair dice, the sample space has $6\times 6=36$ equally likely ordered outcomes. Let $A$ be the event "sum is at least 10" and $B$ be the event "the dice are doubles." The event $A$ contains six outcomes:

| Sum | Outcomes            |
| --- | ------------------- |
| 10  | $(4,6),(5,5),(6,4)$ |
| 11  | $(5,6),(6,5)$       |
| 12  | $(6,6)$             |

So $P(A)=6/36=1/6$. The doubles event has six outcomes, so $P(B)=6/36=1/6$. Their intersection contains $(5,5)$ and $(6,6)$, hence $P(A\cap B)=2/36=1/18$. Therefore

$$
P(A\cup B)=P(A)+P(B)-P(A\cap B)
=\frac{6}{36}+\frac{6}{36}-\frac{2}{36}
=\frac{10}{36}\approx 0.2778.
$$

The union calculation works because the event algebra contains complements, intersections, and unions; without a fixed $\Omega$ and $\mathcal F$, the phrase "probability of either event" would not be well-defined.

## Caveats

Most mistakes come from changing $\Omega$ mid-argument. Conditioning on "flagged users" uses a different reference population than all users, and a density on $\mathbb R$ assigns probability to intervals rather than exact points.

## References

- [Probability space](https://en.wikipedia.org/wiki/Probability_space)
- [OpenStax Introductory Statistics 2e, Chapter 3 introduction](https://openstax.org/books/introductory-statistics-2e/pages/3-introduction)

> [!nav]
> **Section** — [Probability and Statistics](index.md)
>
> [Random Variables →](random-variables.md)

---
title: Conditional Probability
slug: probability-and-statistics/conditional-probability
description: Concise guide to Conditional Probability in Probability and Statistics.
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
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

Conditional probability measures the probability of an event given that another event is known. It is the basis for Bayes' rule, probabilistic inference, calibration, and many diagnostic calculations.

## Definition

For events $A$ and $B$ with $P(B)>0$:

$$
P(A \mid B)=\frac{P(A \cap B)}{P(B)}.
$$

This changes the reference population from all cases to only the cases where $B$ occurred.

## Step-by-step example

If 2 percent of emails are phishing and a detector flags 90 percent of phishing emails but also flags 5 percent of safe emails, the probability that a flagged email is phishing is not 90 percent. It depends on the base rate:

$$
P(\text{phishing}\mid\text{flag}) = \frac{0.90 \cdot 0.02}{0.90\cdot0.02 + 0.05\cdot0.98} \approx 0.27.
$$

Most flagged emails may still be safe because phishing is rare.

## Practical use

Conditional probability helps avoid base-rate errors, reason about classifier outputs, and interpret risk scores. It also clarifies the difference between $P(A \mid B)$ and $P(B \mid A)$.

## Failure modes

Common mistakes include reversing conditionals, ignoring base rates, and assuming independence without evidence.

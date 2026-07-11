---
title: Bayes Theorem
slug: probability-and-statistics/bayes-theorem
description: Concise guide to Bayes Theorem in Probability and Statistics.
area: probability-and-statistics
topics:
  - bayes-theorem
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
# Bayes Theorem

## Summary

Bayes' theorem updates a prior belief after observing evidence. It is the basic rule for moving from $P(evidence\mid hypothesis)$ to $P(hypothesis\mid evidence)$.

## Core idea

- The formula is $P(H\mid E)=P(E\mid H)P(H)/P(E)$.
- The prior $P(H)$ matters when the event is rare.
- The denominator $P(E)$ normalizes over all ways the evidence could occur.

## Worked example

If a disease affects 1% of people and a test is 99% sensitive but 95% specific, a positive test is not automatically a 99% disease probability. Compute the posterior using the base rate and false-positive rate.

## Numerical check

- Separate the estimand, estimator, estimate, and uncertainty statement.
- Check independence, sampling, stationarity, and missing-data assumptions.
- Use a small numeric example to verify the direction of the result.
- Report uncertainty and practical significance, not only a point estimate.

## Caveats

- Do not confuse $P(E\mid H)$ with $P(H\mid E)$; the prior and base rate can dominate the posterior.
- The denominator $P(E)$ must include all mutually exclusive ways the evidence can occur.
- A posterior is conditional on the model assumptions. Biased sampling, changing prevalence, or dependent evidence can make the update misleading.

---
title: Information Theory
slug: mathematical-foundations/information-theory
description: Concise guide to Information Theory in Mathematical Foundations.
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
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

Information theory studies uncertainty, compression, communication, and divergence between probability distributions. In machine learning it provides language for losses, representation learning, decision trees, and probabilistic modelling.

## Core quantities

Entropy measures uncertainty in one distribution. Cross-entropy measures how costly it is to encode data from one distribution using another distribution. KL divergence measures the extra cost of using the wrong distribution. Mutual information measures dependence between variables.

## Example

A language model that assigns high probability to the next token in real text has low cross-entropy on that text. A representation that preserves label-relevant information has high mutual information with the label, although estimating that quantity directly can be difficult.

## Practical value

Information-theoretic ideas help explain why log-loss is used, why compression and prediction are related, why decision trees split on information gain, and why distribution mismatch matters.

## Caveats

The quantities are precise under probability distributions, but empirical estimates can be biased or noisy. In high dimensions, estimating mutual information is especially difficult.

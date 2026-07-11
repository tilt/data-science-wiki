---
title: Mutual Information
slug: mathematical-foundations/mutual-information
description: Concise guide to Mutual Information in Mathematical Foundations.
area: mathematical-foundations
topics:
  - mutual-information
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

Mutual information measures how much knowing one variable reduces uncertainty about another. It captures dependence beyond simple linear correlation.

## Definition

For variables $X$ and $Y$,

$$
I(X;Y)=D_{KL}(p(x,y)\|p(x)p(y)).
$$

If $X$ and $Y$ are independent, their joint distribution equals the product of marginals and mutual information is zero.

## Example

A user's country may contain information about preferred language. Knowing the country reduces uncertainty about language, so mutual information is positive. The relationship need not be linear.

## ML use

Mutual information is used in feature selection, representation learning, information bottleneck methods, and analysis of dependence between labels and features. It can help detect useful predictors that correlation misses.

## Caveats

Estimating mutual information from finite data is hard, especially for continuous or high-dimensional variables. Biased estimators can make weak relationships look stronger than they are.

---
title: Numerical Stability
slug: mathematical-foundations/numerical-stability
description: Concise guide to Numerical Stability in Mathematical Foundations.
area: mathematical-foundations
topics:
  - numerical-stability
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

Numerical stability means computations remain accurate and finite under finite-precision arithmetic. ML systems need it because small floating-point errors can become failed training runs, invalid probabilities, or inconsistent predictions.

## Core idea

Computers approximate real numbers. Operations such as subtracting nearly equal values, exponentiating large numbers, summing many small terms, or dividing by tiny quantities can produce large relative error, overflow, underflow, or `NaN` values.

## Example: stable softmax

The naive softmax uses

$$
\mathrm{softmax}(z_i)=\frac{e^{z_i}}{\sum_j e^{z_j}}.
$$

If a logit is very large, $e^{z_i}$ can overflow. The stable version subtracts the maximum logit:

$$
\mathrm{softmax}(z_i)=\frac{e^{z_i-m}}{\sum_j e^{z_j-m}}, \quad m=\max_j z_j.
$$

This gives the same result mathematically but avoids huge exponentials.

## Practical rules

Use log-space for tiny probabilities, prefer library loss functions over hand-written formulas, normalize inputs, clip where justified, monitor for `NaN` and `Inf`, and test edge cases such as empty arrays or extreme logits.

## Caveats

Stability fixes can hide modelling errors if applied blindly. Clipping a gradient may prevent explosion, but it does not explain why the gradient exploded.

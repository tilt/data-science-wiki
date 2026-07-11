---
title: Jacobians and Hessians
slug: mathematical-foundations/jacobians-and-hessians
description: Concise guide to Jacobians and Hessians in Mathematical Foundations.
area: mathematical-foundations
topics:
  - jacobians-and-hessians
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

Jacobians and Hessians generalize derivatives to vector-valued functions and second-order curvature. They are central to optimization, uncertainty propagation, sensitivity analysis, and deep-learning diagnostics.

## Jacobian

For a function $f: \mathbb{R}^n \to \mathbb{R}^m$, the Jacobian is the matrix of first derivatives:

$$
J_{ij}=\frac{\partial f_i}{\partial x_j}.
$$

It describes how small input changes affect each output component.

## Hessian

For a scalar function $f: \mathbb{R}^n \to \mathbb{R}$, the Hessian is the matrix of second derivatives:

$$
H_{ij}=\frac{\partial^2 f}{\partial x_i \partial x_j}.
$$

It describes local curvature. Positive curvature means the function bends upward; negative curvature means it bends downward.

## Example

For $f(x,y)=x^2+xy+3y^2$, the gradient is $[2x+y, x+6y]$ and the Hessian is

$$
\begin{bmatrix}2 & 1\\ 1 & 6\end{bmatrix}.
$$

The Hessian shows how the two coordinates interact through the off-diagonal terms.

## Practical use

Second-order methods can converge quickly but are expensive for large models. Deep learning usually avoids explicit Hessians, but curvature approximations are used in diagnostics and some optimizers.

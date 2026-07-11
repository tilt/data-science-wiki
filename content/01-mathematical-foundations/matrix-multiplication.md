---
title: Matrix Multiplication
slug: mathematical-foundations/matrix-multiplication
description: Concise guide to Matrix Multiplication in Mathematical Foundations.
area: mathematical-foundations
topics:
  - matrix-multiplication
level: intermediate
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

Matrix multiplication combines linear transformations and computes many dot products at once. It is the core operation behind neural-network layers, linear models, attention, PCA, and batched numerical computing.

## Definition

If $A$ has shape $m \times n$ and $B$ has shape $n \times p$, then $AB$ has shape $m \times p$. Entry $(i,j)$ is

$$
(AB)_{ij}=\sum_{k=1}^{n} A_{ik}B_{kj}.
$$

The inner dimensions must match.

## Step-by-step intuition

Each output entry is a dot product between one row of $A$ and one column of $B$. If $A$ is a batch of examples and $B$ is a weight matrix, the product computes all example-output scores in one operation.

## Example in ML

A dense neural-network layer computes

$$
Y = XW + b,
$$

where $X$ is a batch of inputs and $W$ contains learned weights. Efficient matrix multiplication is why GPUs and tensor libraries matter.

## Caveats

Matrix multiplication is not commutative: usually $AB \ne BA$. Shape errors, unintended broadcasting, and row-column convention mismatches are common implementation bugs.

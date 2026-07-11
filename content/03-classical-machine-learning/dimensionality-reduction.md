---
title: Dimensionality Reduction
slug: classical-machine-learning/dimensionality-reduction
description: Concise guide to Dimensionality Reduction in Classical Machine Learning.
area: classical-machine-learning
topics:
  - dimensionality-reduction
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

Dimensionality reduction represents high-dimensional data with fewer variables while preserving useful structure. It can improve visualization, compression, denoising, retrieval, and downstream modelling.

## Core idea

High-dimensional data often contains redundancy. Dimensionality reduction seeks a lower-dimensional representation that keeps important distances, variance, neighborhoods, labels, or latent factors. The definition of "important" depends on the method and task.

## Method families

Linear methods such as PCA and truncated SVD preserve variance in linear subspaces. Manifold methods try to preserve local neighborhoods. Supervised methods use labels to preserve task-relevant structure. Neural autoencoders learn nonlinear compressed representations.

## Example

A document-term matrix may have 50,000 columns. Truncated SVD can map each document to 200 latent dimensions that capture broad topic structure. A classifier trained on those dimensions may be faster and less noisy, but rare terms can be lost.

## Failure modes

Dimensionality reduction can erase minority patterns, distort distances, leak information if fit before train-test splitting, or create components that are hard to interpret. Always fit transformations on training data only.

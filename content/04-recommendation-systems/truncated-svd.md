---
title: Truncated SVD
slug: recommendation-systems/truncated-svd
description: Concise guide to Truncated SVD in Recommendation Systems and Personalization.
area: recommendation-systems
topics:
  - truncated-svd
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

Truncated SVD keeps only the largest singular components of a matrix. It is used for compression and latent representations, including document retrieval and some recommender workflows.

## Core idea

Full SVD can be expensive and may preserve noise. Truncated SVD computes or keeps only the top $k$ components:

$$
A \approx U_k \Sigma_k V_k^T.
$$

The value of $k$ controls the tradeoff between compression and reconstruction detail.

## Recommendation use

For recommenders, truncated SVD can reveal latent structure in a suitably prepared user-item matrix, but missing-value semantics still matter. It is often more appropriate for transformed matrices or as a baseline than as a complete implicit-feedback recommender.

## Example

A document-item interaction matrix can be reduced to 100 latent dimensions for fast similarity search. The representation may capture broad topics, but rare specialized interests may be blurred.

## Failure modes

Choosing too few components underfits; too many components preserve noise. Directly applying truncated SVD to zero-filled sparse feedback can confuse unknown items with negative feedback.

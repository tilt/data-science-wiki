---
title: Notation
slug: references-and-glossary/notation
description: Concise guide to Notation in References and Glossary.
area: references-and-glossary
topics:
  - notation
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
# Notation

## Summary

Notation keeps formulas readable across mathematical foundations, probability, machine learning, forecasting, and evaluation. Pages may introduce local symbols, but these conventions are the default.

## Common symbols

| Symbol | Typical meaning |
| ------ | --------------- |
| $x$ | Feature vector, observation, or input. |
| $X$ | Data matrix or random variable, depending on context. |
| $y$ | Target label or observed outcome. |
| $\\hat{y}$ | Prediction. |
| $\\theta$ | Model parameters. |
| $w, b$ | Linear-model weights and bias. |
| $p(y\\mid x)$ | Conditional probability of outcome $y$ given input $x$. |
| $\\mathcal{D}$ | Dataset or data-generating distribution. |
| $\\Omega$ | Observed entries in a sparse matrix. |
| $\\lambda$ | Regularization strength or generic rate parameter. |

## Matrix notation

Vectors are usually lowercase bold or plain lowercase depending on page style. Matrices are uppercase. In recommender systems, $R$ often denotes a user-item matrix, $p_u$ a user factor, and $q_i$ an item factor.

## Evaluation notation

Use $k$ for a cutoff in ranked retrieval, $n$ for sample size, and $t$ for time index. When a metric has a specialized definition, link to the metric page instead of redefining it inline.

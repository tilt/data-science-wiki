---
title: Explainability
slug: responsible-ai-safety-and-governance/explainability
description: Concise guide to Explainability in Responsible AI, Safety, and Governance.
area: responsible-ai-safety-and-governance
topics:
  - explainability
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

Explainability provides understandable reasons for a model output or system decision. It helps debugging, user communication, governance review, and domain validation, but it is not the same as full transparency.

## Types of explanation

Global explanations describe how a model tends to behave overall. Local explanations describe why a specific prediction was made. Example-based explanations show similar cases. Counterfactual explanations show what change could have altered the outcome. Different audiences need different forms.

## Example

For a churn model, a global explanation might show that recent support complaints and declining usage are strong predictors. A local explanation for one customer might say the score increased because usage dropped sharply and unresolved tickets rose. A counterfactual might show that the score would fall below the intervention threshold if usage returned to the prior monthly level.

## Practical cautions

Explanations must be faithful enough for the decision being made. Feature attribution can be unstable under correlated features, and a fluent LLM explanation can sound convincing while inventing reasons. Validate explanations against controlled examples and domain review.

## Failure modes

Explainability fails when explanations expose sensitive attributes, oversimplify causal claims, or are used to justify an unreliable model instead of improving it.

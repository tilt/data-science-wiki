---
title: Hallucinations
slug: responsible-ai-safety-and-governance/hallucinations
description: Concise guide to Hallucinations in Responsible AI, Safety, and Governance.
area: responsible-ai-safety-and-governance
topics:
  - hallucinations
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
# Hallucinations

## Summary

Hallucinations are generated claims that are unsupported, fabricated, or misleading relative to the available evidence and task. The risk depends on domain and user reliance.

## Step-by-step example

A support assistant may invent a refund policy that sounds plausible but is absent from the official policy documents.

## Common failure modes

- Evaluating fluency instead of factual support against available evidence.
- Treating retrieval as a complete fix when the model can still ignore, distort, or overgeneralize retrieved context.
- Missing domain-specific severity: a fabricated citation, medical instruction, or policy exception has different risk.
- Failing to log source documents and prompts, making unsupported claims hard to reproduce.

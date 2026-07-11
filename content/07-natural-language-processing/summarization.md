---
title: Summarization
slug: natural-language-processing/summarization
description: Concise guide to Summarization in Natural Language Processing.
area: natural-language-processing
topics:
  - summarization
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
# Summarization

## Summary

Summarization condenses one or more texts while preserving the information needed by a target audience. It can be extractive, abstractive, query-focused, or structured.

## Step-by-step example

A support-ticket summary may include issue, product, attempted fixes, current status, and next action rather than a generic paragraph.

## Common failure modes

- Training Summarization on ambiguous labels or annotation rules that annotators apply inconsistently.
- Evaluating only clean examples while long, multilingual, noisy, or domain-specific text fails.
- Ignoring entity, span, or document-level errors because the aggregate metric looks acceptable.

- Domain shift in vocabulary, style, language, or document structure.
- Evaluating surface form while missing semantic correctness or downstream utility.

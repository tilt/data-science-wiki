---
title: Sequence Labelling
slug: natural-language-processing/sequence-labelling
description: Concise guide to Sequence Labelling in Natural Language Processing.
area: natural-language-processing
topics:
  - sequence-labelling
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
# Sequence Labelling

## Summary

Sequence labelling assigns a label to each token or span in a sequence. Named-entity recognition, part-of-speech tagging, and slot filling are common examples.

## Step-by-step example

In "Book a flight to Berlin tomorrow," labels can mark Berlin as destination and tomorrow as date.

## Common failure modes

- Training Sequence Labelling on ambiguous labels or annotation rules that annotators apply inconsistently.
- Evaluating only clean examples while long, multilingual, noisy, or domain-specific text fails.
- Ignoring entity, span, or document-level errors because the aggregate metric looks acceptable.

- Domain shift in vocabulary, style, language, or document structure.
- Evaluating surface form while missing semantic correctness or downstream utility.

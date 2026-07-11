---
title: Entity Linking and Matching
slug: natural-language-processing/entity-linking-and-matching
description: Concise guide to Entity Linking and Matching in Natural Language Processing.
area: natural-language-processing
topics:
  - entity-linking-and-matching
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
# Entity Linking and Matching

## Summary

Entity linking and matching connect text mentions or records to canonical entities. The challenge is ambiguity, aliases, spelling variation, and incomplete context.

## Step-by-step example

The mention "Apple" may link to a company, fruit, record label, or location depending on surrounding text and knowledge base.

## Common failure modes

- Training Entity Linking and Matching on ambiguous labels or annotation rules that annotators apply inconsistently.
- Evaluating only clean examples while long, multilingual, noisy, or domain-specific text fails.
- Ignoring entity, span, or document-level errors because the aggregate metric looks acceptable.

- Domain shift in vocabulary, style, language, or document structure.
- Evaluating surface form while missing semantic correctness or downstream utility.

## When to use it

Use entity linking when downstream systems need stable identifiers instead of surface strings. A linked entity can join documents to customer records, product catalogues, medical vocabularies, or knowledge graphs. Keep a human review path for low-confidence matches because false links often look plausible and can poison analytics.

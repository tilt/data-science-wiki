---
title: Chunking
slug: generative-ai/chunking
description: Concise guide to Chunking in Generative AI and Agentic Systems.
area: generative-ai
topics:
  - chunking
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
# Chunking

## Summary

Chunking splits documents into retrieval units for RAG. The chunk is what the search system can find and what the model can read, so boundaries strongly affect answer quality.

## Step-by-step example

For a policy manual, split by section headings, keep bullet lists with their heading, and attach metadata such as policy version and effective date.

## Common failure modes

- Changing Chunking without a versioned task-specific evaluation set and trace review.
- Measuring only final fluency while ignoring retrieval, tool, schema, safety, or latency effects introduced by Chunking.
- Shipping Chunking without rollback, monitoring, and examples for known hard cases.

- Evaluating only fluent outputs instead of inspecting evidence, traces, schemas, or user impact.
- Ignoring cost, latency, permissions, and rollback behavior until after deployment.

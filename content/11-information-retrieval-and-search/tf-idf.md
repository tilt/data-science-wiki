---
title: TF IDF
slug: information-retrieval-and-search/tf-idf
description: Concise guide to TF IDF in Information Retrieval and Search.
area: information-retrieval-and-search
topics:
  - tf-idf
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
# TF IDF

## Summary

TF-IDF weights terms by how frequent they are in a document and how rare they are across the corpus. It is a simple lexical representation for search and text mining.

## Step-by-step example

A term appearing often in one document but rarely elsewhere receives high weight, helping identify what distinguishes that document.

## Common failure modes

- Optimizing TF IDF on aggregate relevance while missing important query classes and hard negatives.
- Evaluating retrieval components separately when the user sees the combined retrieval, reranking, filtering, and presentation pipeline.
- Ignoring index freshness, permissions, latency, and failure behavior under empty or ambiguous queries.

- Confusing retrieval quality with downstream answer quality.
- Ignoring freshness, permissions, metadata filters, and operational latency.

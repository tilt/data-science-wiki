---
title: Grounding
slug: generative-ai/grounding
description: "Constraining generated answers to retrieved evidence, tools, or observable state."
area: generative-ai
topics:
  - grounding
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - rag.md
  - citations.md
  - hallucination-mitigation.md
  - context-construction.md
  - retrieval-pipelines.md
historical_context: false
last_reviewed: 2026-07-20
---

# Grounding

Grounding ties generation to external evidence. In [RAG](rag.md), that evidence is retrieved text; in agents it may be tool output or environment state. [Citations](citations.md) are the visible surface of grounding, while [hallucination mitigation](hallucination-mitigation.md) tests unsupported claims.

## The grounded-answer contract

A grounded answer contract has three parts: source selection, claim generation, and support checking. Each factual claim should be derivable from a source span or tool observation included by [context construction](context-construction.md). If no source supports the answer, the model should say so rather than fill gaps from parametric memory.

| Layer                | Question                                 | Example failure                                         |
| -------------------- | ---------------------------------------- | ------------------------------------------------------- |
| Retrieval            | did the system fetch the right evidence? | correct policy exists but was not retrieved             |
| Context construction | was the evidence visible to the model?   | relevant span was truncated or buried                   |
| Generation           | did the answer stay within the evidence? | model adds a condition not present in sources           |
| Verification         | can each claim be traced to a span?      | citation points to a related but non-supporting passage |

Grounding is stronger than adding citations after the fact. The citation should be a support relationship between a claim and evidence, not a decorative link to a broadly relevant document.

## A claim-support record

```json
{
  "claim": "Manager approval is required above 500 EUR.",
  "source_id": "policy-7",
  "span": "Manager approval is required above 500 EUR.",
  "support": "entailed"
}
```

This source-level artifact gives [rag evaluation](rag-evaluation.md) something concrete to score.

## Caveats

Grounding can fail when retrieval misses the right passage, when sources conflict, or when the answer overgeneralizes beyond the span. It can also fail silently when the retrieved text is stale or when a source is authoritative for one jurisdiction, product version, or time period but not another.

## References

- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [Anthropic Claude docs: Reduce hallucinations](https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Context Construction](context-construction.md) [Citations →](citations.md)

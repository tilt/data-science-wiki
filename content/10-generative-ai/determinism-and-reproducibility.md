---
title: Determinism and Reproducibility
slug: generative-ai/determinism-and-reproducibility
description: "Tracing prompts, retrieval, tools, model versions, and decoding settings so outputs can be debugged."
area: generative-ai
topics:
  - determinism-and-reproducibility
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - sampling-and-decoding.md
  - temperature-and-determinism.md
  - context-construction.md
  - model-serving.md
  - agent-evaluation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Determinism and Reproducibility

Determinism means identical inputs and execution conditions produce identical outputs. Reproducibility means a run can be reconstructed closely enough to debug drift. In generative systems, this spans [sampling and decoding](sampling-and-decoding.md), [context construction](context-construction.md), retrieval, tools, serving, and validators.

## Mechanism

A run record should include model identifier, prompt messages, decoding parameters, seed if exposed, retrieved chunk IDs, tool schemas, tool outputs, validator versions, and post-processing code. Temperature zero narrows sampling but does not freeze hosted infrastructure or retrieval state; see [temperature and determinism](temperature-and-determinism.md).

## Concrete artifact

```json
{
  "model": "provider-model-version",
  "decoding": {"temperature": 0, "top_p": 1},
  "retrieved_chunk_ids": ["policy-7", "policy-9"],
  "tool_schema_hash": "sha256:...",
  "validator": "citation_support_v3"
}
```

This is the minimum trace needed for [agent evaluation](agent-evaluation.md).

## Caveats

Caching can mask nondeterminism. Changing chunking, reranking, or safety filters can change outputs even when prompt text is unchanged.

## References

- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)
- [OpenAI API documentation: Agents SDK](https://platform.openai.com/docs/guides/agents)

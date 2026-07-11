---
title: Generative AI
slug: interview-preparation/generative-ai
description: Concise guide to Generative AI in Interview Preparation.
area: interview-preparation
topics:
  - generative-ai
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
# Generative AI

## Answer

For interview purposes, generative AI refers to systems that produce open-ended outputs such as text, images, code, structured objects, plans, or tool calls. A strong answer should separate model capability from the surrounding system: prompting, retrieval, tools, evaluation, safety, latency, and cost all matter.

## What a strong answer adds

- Define the task: generation, extraction, summarization, RAG, agentic tool use, or multimodal reasoning.
- Name the control surface: prompt, model choice, retrieval, schema, tool permissions, decoding, and evaluation set.
- Discuss risks: hallucination, unsupported claims, prompt injection, privacy leakage, nondeterminism, cost, and monitoring.
- Compare to a simpler baseline such as search, classification, rules, or a template workflow.

## Example prompt

If asked to design a document assistant, do not answer only "use an LLM." Describe ingestion, chunking, retrieval, context construction, answer generation, citations, abstention, evaluation, and rollback of bad knowledge-base updates.

## Canonical concepts

Use [RAG](../10-generative-ai/rag.md), [structured output](../10-generative-ai/structured-output.md), [tool routing](../10-generative-ai/tool-routing.md), and [hallucination mitigation](../10-generative-ai/hallucination-mitigation.md) for the deeper wiki explanations.

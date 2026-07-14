---
title: Memory
slug: generative-ai/memory
description: "Persisted state that an assistant or agent can write, retrieve, inspect, and delete across turns or sessions."
area: generative-ai
topics:
  - memory
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - agentic-systems.md
  - embeddings.md
  - data-privacy.md
  - context-construction.md
  - prompt-injection.md
historical_context: false
last_reviewed: 2026-07-11
---

# Memory

Memory is persisted state used beyond the current prompt. It can be explicit profile fields, conversation summaries, vector-retrieved notes, task state, or tool results inside [agentic systems](agentic-systems.md). It differs from ordinary [context construction](context-construction.md) because it survives the request that created it.

## Mechanism

A memory system needs four policies: what may be written, how it is stored, when it is retrieved, and how it is deleted. Vector memory embeds notes with [embeddings](embeddings.md) for similarity lookup. Structured memory stores fields such as preferences, account IDs, or task state. Sensitive attributes should be structured, permissioned, and auditable rather than mixed into free-text summaries.

Memory writes should have provenance. An explicit user statement is different from a model inference. Retrieval should be scoped to the active user, workspace, and task. [Data privacy](data-privacy.md) and [prompt injection](prompt-injection.md) controls decide whether a memory can be stored, recalled, or shown.

## Concrete artifact

```json
{
  "memory_id": "user_pref_17",
  "kind": "preference",
  "text": "Prefers concise answers for implementation updates.",
  "source": "explicit_user_statement",
  "created_at": "2026-07-12T09:30:00Z",
  "scope": "user",
  "expires_at": null,
  "user_editable": true
}
```

This record is safe because it has source, scope, and editability. A record like "user is anxious about deadlines" would be much riskier because it infers a sensitive trait from behavior.

## Caveats

Do not store inferred sensitive traits as facts. Summaries can distort user intent, especially after long conversations. Memory retrieval can also amplify stale preferences, so high-impact memory should be visible, editable, and deletable.

## References

- [OpenAI API documentation: Agents SDK](https://platform.openai.com/docs/guides/agents)
- [OpenAI API documentation: Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [OpenAI platform documentation: Data controls](https://platform.openai.com/docs/guides/your-data)

---
title: Memory
slug: generative-ai/memory
description: "Persisted state that an assistant or agent can write, retrieve, inspect, and delete across turns or sessions."
area: generative-ai
topics:
  - memory
level: intermediate
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - agentic-systems.md
  - langgraph.md
  - langchain.md
  - embeddings.md
  - data-privacy.md
  - context-construction.md
  - prompt-injection.md
historical_context: false
last_reviewed: 2026-07-29
---

# Memory

Memory is persisted state used beyond the current prompt. It can be explicit profile fields, conversation summaries, vector-retrieved notes, task state, or tool results inside [agentic systems](agentic-systems.md). It differs from ordinary [context construction](context-construction.md) because it survives the request that created it.

Memory should be treated as a product database, not as a longer prompt. It needs write rules, read rules, provenance, retention, and user controls.

## The four memory policies

A memory system needs four policies: what may be written, how it is stored, when it is retrieved, and how it is deleted. Vector memory embeds notes with [embeddings](embeddings.md) for similarity lookup. Structured memory stores fields such as preferences, account IDs, or task state. Sensitive attributes should be structured, permissioned, and auditable rather than mixed into free-text summaries.

Memory writes should have provenance. An explicit user statement is different from a model inference. Retrieval should be scoped to the active user, workspace, and task. [Data privacy](data-privacy.md) and [prompt injection](prompt-injection.md) controls decide whether a memory can be stored, recalled, or shown.

[LangGraph](langgraph.md) separates active graph state, checkpoints, threads, and longer-term stores, which is a useful implementation model for agent memory. [LangChain](langchain.md) can then provide model, retriever, and tool components inside that memory-aware runtime.

## Memory types

| Type              | Example                                       | Storage shape                    | Risk                                          |
| ----------------- | --------------------------------------------- | -------------------------------- | --------------------------------------------- |
| User preference   | "prefers concise implementation updates"      | structured field or short note   | stale or overgeneralized preference.          |
| Task state        | current plan, open subtasks, tool results     | graph checkpoint or workflow row | wrong state resumes later.                    |
| Episodic note     | "discussed deployment incident on July 12"    | timestamped note with provenance | irrelevant recall clutters context.           |
| Semantic memory   | reusable project facts retrieved by embedding | vector store with ACLs           | private or stale facts retrieved too broadly. |
| Profile attribute | language, timezone, role                      | structured, user-editable field  | sensitive inference or unauthorized use.      |

The safest memories are explicit, scoped, and editable. The riskiest are inferred traits stored as free text.

## A memory record

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

## Write and retrieve policy

A memory write should answer:

- Who said or produced this fact?
- Is it explicit or inferred?
- Is it sensitive?
- Who may retrieve it?
- When should it expire?
- Can the user inspect, edit, or delete it?

Retrieval should answer a separate question: is this memory relevant and allowed for the current task? A preference about concise engineering updates should not be retrieved for a medical, legal, or HR question unless the user explicitly wants that style carried over. Memory relevance and memory permission are different checks.

## Realistic example

Good memory:

```text
User explicitly prefers SQL examples instead of Python-embedded SQL in data-engineering pages.
```

Bad memory:

```text
User is impatient and dislikes explanations.
```

The first is a directly stated content preference with a clear scope. The second is an inferred personality judgment and should not be stored as a fact.

## Caveats

Do not store inferred sensitive traits as facts. Summaries can distort user intent, especially after long conversations. Memory retrieval can also amplify stale preferences, so high-impact memory should be visible, editable, and deletable. Memory can also be poisoned through prompt injection, so writes should be validated instead of blindly storing whatever text appears in a conversation.

## References

- [OpenAI API documentation: Agents SDK](https://platform.openai.com/docs/guides/agents)
- [OpenAI API documentation: Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [OpenAI platform documentation: Data controls](https://platform.openai.com/docs/guides/your-data)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Planning](planning.md) [Reflection and Reviewer Patterns →](reflection-and-reviewer-patterns.md)

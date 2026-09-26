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
  - harnesses.md
  - reflection-and-reviewer-patterns.md
  - evaluation-harnesses.md
historical_context: false
last_reviewed: 2026-09-25
---

# Memory

Memory is persisted state used beyond the current prompt. It can be explicit profile fields, conversation summaries, vector-retrieved notes, task state, or tool results inside [agentic systems](agentic-systems.md). It differs from ordinary [context construction](context-construction.md) because it survives the request that created it.

Memory should be treated as a product database, not as a longer prompt. It needs write rules, read rules, provenance, retention, and user controls.

## The four memory policies

A memory system needs four policies: what may be written, how it is stored, when it is retrieved, and how it is deleted. Vector memory embeds notes with [embeddings](embeddings.md) for similarity lookup. Structured memory stores fields such as preferences, account IDs, or task state. Sensitive attributes should be structured, permissioned, and auditable rather than mixed into free-text summaries.

Memory writes should have provenance. An explicit user statement is different from a model inference. Retrieval should be scoped to the active user, workspace, and task. [Data privacy](data-privacy.md) and [prompt injection](prompt-injection.md) controls decide whether a memory can be stored, recalled, or shown.

[LangGraph](langgraph.md) separates active graph state, checkpoints, threads, and longer-term stores, which is a useful implementation model for agent memory. [LangChain](langchain.md) can then provide model, retriever, and tool components inside that memory-aware runtime.

## What memory is for, and how it is stored

A 2025 survey of agent memory (Hu et al.) replaces the old short-term versus long-term split with two separate questions. What _function_ does the memory serve, and what _form_ does it take?

| Function     | Holds                                            | Product examples                                                                 | Main risk                                                      |
| ------------ | ------------------------------------------------ | -------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Factual      | stable facts about the user, workspace, or world | preferences, account settings, project facts                                     | stale or overgeneralized facts; sensitive attributes           |
| Experiential | lessons from past trajectories                   | "this API rejects batch sizes above 100", workflow shortcuts, past failure notes | a lesson learned in one context applied where it does not hold |
| Working      | state for the task in progress                   | current plan, open subtasks, recent tool results                                 | wrong state resumed later; context overflow                    |

| Form        | Where it lives                                                                     | Typical use                                 |
| ----------- | ---------------------------------------------------------------------------------- | ------------------------------------------- |
| Token-level | text, structured records, or vector entries outside the model, loaded into context | almost all product memory                   |
| Parametric  | model weights, through fine-tuning                                                 | stable domain knowledge, not per-user facts |
| Latent      | cached internal states such as KV caches or learned memory embeddings              | research systems and serving optimizations  |

Product memory is almost always token-level. Keep factual memory as structured, editable records. Store experiential memory as short, scoped lessons with the trajectory they came from. Treat working memory as [harness](harnesses.md) state: compaction, progress files, and checkpoints. The safest memories are explicit, scoped, and editable. The riskiest are inferred traits stored as free text.

## A memory record

```json
{
  "memory_id": "user_pref_17",
  "function": "factual",
  "key": "answer_style",
  "text": "Prefers concise answers for implementation updates.",
  "source": "explicit_user_statement",
  "created_at": "2026-07-12T09:30:00Z",
  "scope": "user:u17",
  "supersedes": "user_pref_09",
  "expires_at": null,
  "user_editable": true
}
```

This record is safe because it has source, scope, a stable key for updates, and editability. A record like "user is anxious about deadlines" would be much riskier because it infers a sensitive trait from behavior.

## Write and retrieve policy

A memory write should answer:

- Who said or produced this fact?
- Is it explicit or inferred?
- Is it sensitive?
- Who may retrieve it?
- When should it expire?
- Can the user inspect, edit, or delete it?

Retrieval should answer a separate question: is this memory relevant and allowed for the current task? A preference about concise engineering updates should not be retrieved for a medical, legal, or HR question unless the user explicitly wants that style carried over. Memory relevance and memory permission are different checks.

## Updates, contradictions, and deletion

Memory systems fail less often from missing recall than from recalling the wrong version. When a user says "actually, give me detailed answers," the old preference must stop being retrieved. Production memory layers such as Mem0 decide on each write whether to add, update, delete, or ignore, instead of appending every extracted fact.

Three rules keep this manageable:

1. **Key memories by what they are about,** not only by embedding. An update replaces the current record for the same key and scope.
2. **Supersede instead of overwrite.** Keep the old version for audit, but exclude it from recall.
3. **Delete every version and every derived artifact,** including embeddings, summaries that quote the memory, caches, and backups under your retention policy. A deletion that leaves an embedding behind is not a deletion.

A memory layer that follows these rules, on PostgreSQL with pgvector. The model proposes candidate memories from a conversation; deterministic code decides what is stored, superseded, recalled, and deleted:

```python
from __future__ import annotations

import json
import os
import uuid
from typing import Any

from openai import OpenAI
from sqlalchemy import create_engine, text

MODEL = os.environ.get("OPENAI_MODEL", "gpt-4o")
EMBEDDING_MODEL = "text-embedding-3-small"
client = OpenAI()
memory_db = create_engine(os.environ["MEMORY_DB_URL"])  # PostgreSQL with the pgvector extension

# Migration:
#   CREATE TABLE memories (
#     memory_id uuid PRIMARY KEY, scope text NOT NULL, key text NOT NULL, text text NOT NULL,
#     source text NOT NULL, embedding vector(1536) NOT NULL,
#     created_at timestamptz NOT NULL DEFAULT now(), superseded_by uuid);
#   CREATE UNIQUE INDEX one_current_version ON memories (scope, key) WHERE superseded_by IS NULL;

EXTRACTION_FORMAT = {
    "type": "json_schema",
    "name": "memory_candidates",
    "schema": {
        "type": "object",
        "properties": {
            "memories": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "key": {"type": "string", "description": "snake_case topic, e.g. answer_style"},
                        "text": {"type": "string"},
                        "explicit": {"type": "boolean", "description": "true only if the user said it directly"},
                    },
                    "required": ["key", "text", "explicit"],
                    "additionalProperties": False,
                },
            }
        },
        "required": ["memories"],
        "additionalProperties": False,
    },
    "strict": True,
}


def embed(value: str) -> str:
    vector = client.embeddings.create(model=EMBEDDING_MODEL, input=[value]).data[0].embedding
    return str(vector)  # pgvector accepts the '[x, y, ...]' text form


def extract_memories(conversation: list[dict[str, str]]) -> list[dict[str, Any]]:
    response = client.responses.create(
        model=MODEL,
        instructions="Extract durable preferences and facts the user stated about themselves or their work. "
        "Reuse existing keys where they fit. Mark anything you inferred as explicit=false. "
        "Never extract health, religion, politics, or other sensitive attributes.",
        input=json.dumps(conversation),
        text={"format": EXTRACTION_FORMAT},
    )
    return json.loads(response.output_text)["memories"]


def write_memory(scope: str, key: str, value: str, source: str) -> str:
    if source != "explicit_user_statement":
        return f"rejected {key}: only explicit statements are stored as facts"
    with memory_db.begin() as conn:
        current = conn.execute(
            text("SELECT memory_id, text FROM memories "
                 "WHERE scope = :scope AND key = :key AND superseded_by IS NULL FOR UPDATE"),
            {"scope": scope, "key": key},
        ).mappings().first()
        if current and current["text"] == value:
            return f"noop {key}"
        new_id = uuid.uuid4()
        if current:  # supersede, keep the old version for audit
            conn.execute(text("UPDATE memories SET superseded_by = :new WHERE memory_id = :old"),
                         {"new": new_id, "old": current["memory_id"]})
        conn.execute(
            text("INSERT INTO memories (memory_id, scope, key, text, source, embedding) "
                 "VALUES (:id, :scope, :key, :text, :source, CAST(:embedding AS vector))"),
            {"id": new_id, "scope": scope, "key": key, "text": value, "source": source, "embedding": embed(value)},
        )
    return f"{'updated' if current else 'added'} {key}"


def recall(allowed_scopes: list[str], query: str, k: int = 5, min_similarity: float = 0.3) -> list[dict[str, Any]]:
    # The scope filter runs in SQL, so relevance ranking never sees another user's memories.
    with memory_db.connect() as conn:
        rows = conn.execute(
            text("SELECT key, text, 1 - (embedding <=> CAST(:q AS vector)) AS similarity FROM memories "
                 "WHERE scope = ANY(:scopes) AND superseded_by IS NULL "
                 "ORDER BY embedding <=> CAST(:q AS vector) LIMIT :k"),
            {"q": embed(query), "scopes": allowed_scopes, "k": k},
        ).mappings().all()
    return [dict(r) for r in rows if r["similarity"] >= min_similarity]


def forget(scope: str, key: str) -> int:
    # Deletes every version and its embedding. Summaries, caches, and backups that
    # quote the memory must be purged by the same (scope, key) under your retention policy.
    with memory_db.begin() as conn:
        return conn.execute(text("DELETE FROM memories WHERE scope = :scope AND key = :key"),
                            {"scope": scope, "key": key}).rowcount


if __name__ == "__main__":
    conversation = [
        {"role": "user", "content": "For implementation updates, give me bullet points only, no prose."},
        {"role": "assistant", "content": "Understood."},
        {"role": "user", "content": "Ugh, this is taking forever."},
    ]
    for memory in extract_memories(conversation):
        source = "explicit_user_statement" if memory["explicit"] else "model_inference"
        print(write_memory("user:u17", memory["key"], memory["text"], source))
    print(recall(["user:u17"], "How should I format this deployment status update?"))
```

The extraction call may propose both a formatting preference and an inferred mood. Only the stated preference is stored. A later "actually, detailed answers with code please" supersedes it under the same key instead of adding a contradicting row. Recall filters by scope in SQL before ranking by similarity, and `forget` removes all versions together with their embeddings. Log every extraction and write decision, and evaluate extraction on labeled conversations: extraction errors become persistent errors.

## Memory Write Decisions

Good memory:

```text
User explicitly prefers SQL examples instead of Python-embedded SQL in data-engineering pages.
```

Bad memory:

```text
User is impatient and dislikes explanations.
```

The first is a directly stated content preference with a clear scope. The second is an inferred personality judgment and should not be stored as a fact.

## What the evidence shows

| Study                                          | Finding                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| LongMemEval (Wu et al., 2024)                  | 500 questions in scalable chat histories test information extraction, multi-session reasoning, temporal reasoning, knowledge updates, and abstention. Commercial assistants and long-context models lost about 30% accuracy when information had to be remembered across sustained interactions. Splitting sessions into finer units, expanding index keys with extracted facts, and time-aware queries improved recall. |
| Mem0 (Chhikara et al., 2025)                   | On the LOCOMO benchmark, an extract-and-consolidate memory reported a 26% relative gain on an LLM-judge metric over OpenAI's memory, 91% lower p95 latency, and over 90% lower token cost than passing the full history. Passing the full history (about 26,000 tokens) still scored highest on accuracy (judge score 72.9). These are vendor-authored results scored by a model judge.                                  |
| LongMemEval-V2 (Wu et al., 2026)               | Tests experiential memory for web agents: state recall, state tracking, workflows, environment gotchas, and premise awareness, over histories of up to 115M tokens. Storing trajectories as files and letting a coding agent search them reached 72.5% average accuracy, against 48.5% for the strongest retrieval baseline, at much higher latency.                                                                     |
| Anatomy of Agentic Memory (Jiang et al., 2026) | Survey of evaluation pitfalls. Benchmarks are often too small or saturated, metrics do not match usefulness, scores are sensitive to the judge model, results depend on the underlying LLM, and memory maintenance adds latency and throughput costs that papers rarely report.                                                                                                                                          |

Two conclusions for builders:

- **Long context is an expensive baseline, not a memory strategy.** When the whole history fits, it can be the most accurate option, but its cost and latency grow with every session, and recall degrades over sustained interactions. A targeted memory store gives up a little accuracy for large savings. Measure that trade-off on your own data.
- **Memory benchmark results transfer poorly.** They depend on the judge, the backbone model, and the dataset. Test candidate memory designs on your own conversations and tasks before adopting one.

## Model versus harness

Models increasingly come with built-in memory features and tools that read and write memory files. The harness still has to own:

- which scopes a memory may be written to and read from
- provenance, and the explicit-versus-inferred distinction
- validation of writes against [prompt injection](prompt-injection.md)
- retention, deletion, and purging of derived artifacts
- the audit trail

A model can decide _what_ seems worth remembering. It should not decide _who_ may see it.

## Evaluation

Build a memory test set from multi-session histories with planted facts, updates, and deletions, then measure:

| Metric              | Question it answers                                                                |
| ------------------- | ---------------------------------------------------------------------------------- |
| Recall accuracy     | Is the right fact retrieved and used when relevant?                                |
| Update accuracy     | After a change, is only the new version used?                                      |
| Temporal accuracy   | Are "when" and "before/after" questions answered correctly?                        |
| Abstention rate     | Does the system say it does not know when nothing was stored?                      |
| Cross-scope leakage | Does any memory from another user, tenant, or workspace appear? This must be zero. |
| Deletion compliance | After a delete, does the fact resurface through recall, summaries, or embeddings?  |
| Cost and latency    | What do extraction, consolidation, and retrieval add per turn?                     |

Compare against two baselines: the full history in context, and plain retrieval over raw transcripts. If a memory design cannot beat plain retrieval on your data, it is not worth its maintenance cost. Use a fixed judge model, and validate it against human labels as described in [evaluation harnesses](evaluation-harnesses.md).

## Caveats

Do not store inferred sensitive traits as facts. Summaries can distort user intent, especially after long conversations. Memory retrieval can also amplify stale preferences, so high-impact memory should be visible, editable, and deletable. Memory can also be poisoned through prompt injection, so writes should be validated instead of blindly storing whatever text appears in a conversation.

## History

Generative Agents (2023) scored memories for retrieval by recency, importance, and relevance. MemGPT (2023) managed memory tiers the way an operating system pages memory. CoALA (2023) mapped agent memory onto working, episodic, semantic, and procedural memory from cognitive science. Reflexion (2023) stored verbal lessons from failed attempts, an early form of experiential memory.

## References

- [Hu et al., 2025, Memory in the Age of AI Agents](https://arxiv.org/abs/2512.13564)
- [Jiang et al., 2026, Anatomy of Agentic Memory: Taxonomy and Empirical Analysis of Evaluation and System Limitations](https://arxiv.org/abs/2602.19320)
- [Wu et al., 2024, LongMemEval: Benchmarking Chat Assistants on Long-Term Interactive Memory](https://arxiv.org/abs/2410.10813)
- [Wu et al., 2026, LongMemEval-V2: Evaluating Long-Term Agent Memory Toward Experienced Colleagues](https://arxiv.org/abs/2605.12493)
- [Chhikara et al., 2025, Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory](https://arxiv.org/abs/2504.19413)
- [Anthropic Engineering, 2025, Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [OpenAI API documentation: Agents SDK](https://platform.openai.com/docs/guides/agents)
- [OpenAI API documentation: Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [OpenAI platform documentation: Data controls](https://platform.openai.com/docs/guides/your-data)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Planning](planning.md) [Reflection and Reviewer Patterns →](reflection-and-reviewer-patterns.md)

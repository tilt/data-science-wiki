---
title: Context Construction
slug: generative-ai/context-construction
description: "Selecting and packing instructions, history, retrieved evidence, and tool schemas into the model request."
area: generative-ai
topics:
  - context-construction
level: intermediate
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - chunking.md
  - retrieval-pipelines.md
  - structured-output.md
  - tool-schemas.md
  - determinism-and-reproducibility.md
  - prompt-injection.md
  - grounding.md
historical_context: false
last_reviewed: 2026-07-29
---

# Context Construction

Context construction is the packing layer between retrieval and generation. It decides which instructions, [tool schemas](tool-schemas.md), conversation turns, [chunking](chunking.md) outputs, and formatting constraints reach the model. It is one of the most important quality levers in a RAG or agent system because the model can only ground on evidence that is actually visible in the final request.

## Packing under a token budget

With a token budget $B$, each candidate item has cost $c_i$ and estimated utility $u_i$. The system chooses a subset with $\sum c_i\le B$, while reserving room for the answer and preserving instruction precedence. This is why [retrieval pipelines](retrieval-pipelines.md) should return ranked, source-labeled chunks rather than raw documents.

In practice, context construction is a constrained packing problem with hard requirements. System policy, safety instructions, output schema, and required tool definitions are not optional utility items; they are reserved budget. Retrieved evidence and conversation history compete for what remains.

## Worked packing table

With a 420-token budget, a simple utility-per-token packer ranks items as follows:

| Item           | Tokens | Utility | Utility per token | Kept? |
| -------------- | -----: | ------: | ----------------: | ----- |
| `system`       |     80 |      10 |             0.125 | yes   |
| `schema`       |    120 |       9 |             0.075 | yes   |
| `retrieved_A`  |    140 |       8 |             0.057 | yes   |
| `retrieved_B`  |    110 |       6 |             0.055 | no    |
| `chat_history` |    160 |       5 |             0.031 | no    |

The kept items use $80+120+140=340$ tokens, leaving 80 unused because the next candidate would exceed the 420-token budget. The greedy packer kept high-utility instructions and evidence but dropped chat history. That trade-off should be visible in [determinism and reproducibility](determinism-and-reproducibility.md) traces.

## Trust and precedence

Context is not a flat bag of text; it has an authority order. System and developer instructions outrank retrieved documents, which outrank user-supplied text, which outrank tool output. The packer must preserve that order and label each block's trust level, so a retrieved passage or a user message can never silently override an instruction. That ordering is the core defense against [prompt injection](prompt-injection.md), and it must survive truncation: when the budget forces cuts, drop low-utility evidence, never the instruction hierarchy.

## Context blocks

| Block                       | Keep when                         | Drop or compress when                                       |
| --------------------------- | --------------------------------- | ----------------------------------------------------------- |
| System policy               | always                            | almost never; shorten only by versioned template changes.   |
| Developer task instructions | always for the route              | route changes or task changes.                              |
| Output schema               | downstream software depends on it | use a smaller schema or separate extraction route.          |
| Tool schemas                | tool may be called in this state  | tool not authorized or irrelevant.                          |
| Retrieved evidence          | supports the current question     | low score, stale, duplicate, or unsupported by permissions. |
| Conversation history        | needed for reference resolution   | summarize or drop unrelated turns.                          |
| User-provided documents     | needed as data                    | untrusted or too large; summarize with provenance.          |

## Realistic packing failure

A user asks a refund-threshold question after a long conversation. The context packer includes 20 chat turns and two stale policy chunks, then truncates the current policy table. The answer says "manager approval above 500 EUR" because that appears in stale history, but the current policy says "above 700 EUR." The model failure is downstream; the root cause is context construction.

A robust trace should show which chunks were considered, which were packed, which were dropped, and why. Without that trace, teams often blame generation when retrieval or packing caused the unsupported answer.

## Design rules

- Reserve budget for instructions, schemas, and the expected answer before packing evidence.
- Keep source IDs and metadata next to every chunk.
- Deduplicate near-identical chunks so repeated boilerplate does not crowd out decisive evidence.
- Prefer current, authoritative, and permissioned sources over semantically similar stale sources.
- Label untrusted user or web content as data.
- Log dropped high-scoring evidence for debugging.

## Caveats

More context can hurt when it includes conflicting passages or untrusted user text. Label trusted documentation separately from user-provided content. Long context also increases latency and can dilute attention, so the best context is usually selective rather than maximal.

## References

- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)
- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Reranking](reranking.md) [Grounding →](grounding.md)

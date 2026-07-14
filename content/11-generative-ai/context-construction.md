---
title: Context Construction
slug: generative-ai/context-construction
description: "Selecting and packing instructions, history, retrieved evidence, and tool schemas into the model request."
area: generative-ai
topics:
  - context-construction
level: intermediate
status: review
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
historical_context: false
last_reviewed: 2026-07-11
---

# Context Construction

Context construction is the packing layer between retrieval and generation. It decides which instructions, [tool schemas](tool-schemas.md), conversation turns, [chunking](chunking.md) outputs, and formatting constraints reach the model.

## Mechanism

With a token budget $B$, each candidate item has cost $c_i$ and estimated utility $u_i$. The system chooses a subset with $\sum c_i\le B$, while reserving room for the answer and preserving instruction precedence. This is why [retrieval pipelines](retrieval-pipelines.md) should return ranked, source-labeled chunks rather than raw documents.

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

## Caveats

More context can hurt when it includes conflicting passages or untrusted user text. Label trusted documentation separately from user-provided content.

## References

- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)
- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)

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

## Executed artifact

```python
items = [
    ("system", 80, 10),
    ("schema", 120, 9),
    ("chat_history", 160, 5),
    ("retrieved_A", 140, 8),
    ("retrieved_B", 110, 6),
]
budget = 420
chosen = []
used = 0
for name, tokens, value in sorted(items, key=lambda item: -item[2] / item[1]):
    if used + tokens <= budget:
        chosen.append(name)
        used += tokens
print("CONTEXT_PACKING")
print({"chosen": chosen, "tokens_used": used, "budget": budget})
```

Observed output:

```text
CONTEXT_PACKING
{'chosen': ['system', 'schema', 'retrieved_A'], 'tokens_used': 340, 'budget': 420}
```

The greedy packer kept high-utility instructions and evidence but dropped chat history. That trade-off should be visible in [determinism and reproducibility](determinism-and-reproducibility.md) traces.

## Caveats

More context can hurt when it includes conflicting passages or untrusted user text. Label trusted documentation separately from user-provided content.

## References

- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)
- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)

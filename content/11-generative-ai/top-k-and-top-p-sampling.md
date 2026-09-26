---
title: Top-k and Top-p Sampling
slug: generative-ai/top-k-and-top-p-sampling
description: "Truncation methods that restrict which next tokens may be sampled."
area: generative-ai
topics:
  - top-k-and-top-p-sampling
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - sampling-and-decoding.md
  - temperature-and-determinism.md
  - determinism-and-reproducibility.md
  - prompting.md
  - structured-output.md
historical_context: false
last_reviewed: 2026-07-29
---

# Top-k and Top-p Sampling

Top-k and top-p are truncation controls inside [sampling and decoding](sampling-and-decoding.md). They remove candidate tokens before sampling, often after temperature is applied. Use them with [temperature and determinism](temperature-and-determinism.md) and trace their settings for [determinism and reproducibility](determinism-and-reproducibility.md), not as independent magic knobs. They shape the candidate set; they do not make a weak prompt or unsupported answer correct.

## Top-k versus top-p

Top-k keeps the $k$ largest-probability tokens and renormalizes. Top-p, or nucleus sampling, sorts tokens by probability and keeps the smallest prefix whose cumulative mass reaches $p$. Top-p adapts to distribution shape: it can keep many tokens for flat distributions and few tokens for peaked ones.

## Comparing the two truncations

The snippet takes the real next-token distribution of a small open model for two prompts: a factual question with one obvious answer and an open creative request. It compares how many tokens each truncation rule keeps. Top-k keeps a fixed number of tokens; top-p keeps however many tokens are needed to reach the cumulative probability threshold.

```python
import numpy as np
from transformers import AutoModelForCausalLM, AutoTokenizer

MODEL_ID = "Qwen/Qwen2.5-0.5B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
model = AutoModelForCausalLM.from_pretrained(MODEL_ID)

PROMPTS = {
    "factual": "What is the capital of France? Reply with one word.",
    "creative": "Suggest a name for a coffee shop. Reply with the name only.",
}


def next_token_probs(prompt: str) -> np.ndarray:
    inputs = tokenizer.apply_chat_template(
        [{"role": "user", "content": prompt}], add_generation_prompt=True, return_tensors="pt", return_dict=True
    )
    logits = model(**inputs).logits[0, -1].detach().float().numpy()
    e = np.exp(logits - logits.max())
    return e / e.sum()


def top_p_size(probs: np.ndarray, p_cut: float) -> str:
    sorted_probs = np.sort(probs)[::-1]
    n = int(np.searchsorted(np.cumsum(sorted_probs), p_cut)) + 1
    return f"{n} token" + ("s" if n != 1 else "")


for name, prompt in PROMPTS.items():
    probs = next_token_probs(prompt)
    top3_mass = np.sort(probs)[::-1][:3].sum()
    print(f"{name:9} top_k=3 keeps 3 tokens ({top3_mass:.2f} of the mass); "
          f"top_p=0.9 keeps {top_p_size(probs, 0.9)}; top_p=0.99 keeps {top_p_size(probs, 0.99)}")
```

Observed output with Qwen2.5-0.5B-Instruct on CPU:

```text
factual   top_k=3 keeps 3 tokens (1.00 of the mass); top_p=0.9 keeps 1 token; top_p=0.99 keeps 1 token
creative  top_k=3 keeps 3 tokens (0.42 of the mass); top_p=0.9 keeps 218 tokens; top_p=0.99 keeps 4388 tokens
```

This is the adaptivity of top-p in practice. For the factual question, one token carries almost all the probability, so top-p collapses to greedy decoding while top-k still keeps two near-zero alternatives. For the creative request, the same `top_p=0.9` keeps 218 candidate tokens, whereas `top_k=3` cuts off 58% of the probability mass. A fixed k is too wide for peaked distributions and too narrow for flat ones.

## Choosing truncation settings

| Use case                   | Typical direction                      | Reason                                                              |
| -------------------------- | -------------------------------------- | ------------------------------------------------------------------- |
| JSON extraction            | narrow top-p or deterministic decoding | reduce malformed or surprising tokens.                              |
| grounded answers           | moderate truncation                    | preserve stable wording while avoiding low-probability tail tokens. |
| creative writing           | wider top-p/top-k                      | diversity is part of the goal.                                      |
| code generation            | moderate, plus tests                   | avoid tail syntax errors while allowing alternatives.               |
| safety-sensitive workflows | narrow, plus validators                | decoding cannot enforce policy by itself.                           |

Top-p adapts to the shape of the distribution, so it is often easier to reason about across prompts. Top-k is easier to explain but can keep too many poor candidates when the distribution is already peaked.

## Debugging output changes

If output becomes bland, repetitive, or too risky, inspect temperature, top-p/top-k, max tokens, prompt changes, and retrieval changes together. A lower top-p can reduce strange tail completions, but it can also remove useful rare tokens such as product codes or non-English words. For structured workflows, prefer schema validation over relying on sampling settings alone.

## Caveats

Very low top-p can collapse creativity and remove rare but correct tokens. Very high top-k still admits bad tail tokens if temperature is high. Provider defaults may also change, so record decoding settings in reproducibility traces.

## References

- [Holtzman et al., 2020, The Curious Case of Neural Text Degeneration](https://arxiv.org/abs/1904.09751)
- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Sampling and Decoding](sampling-and-decoding.md) [Temperature and Determinism →](temperature-and-determinism.md)

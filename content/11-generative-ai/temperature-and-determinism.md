---
title: Temperature and Determinism
slug: generative-ai/temperature-and-determinism
description: "How logit temperature changes entropy and why low temperature is not full reproducibility."
area: generative-ai
topics:
  - temperature
  - sampling-and-decoding
  - determinism
level: intermediate
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - sampling-and-decoding.md
  - top-k-and-top-p-sampling.md
  - determinism-and-reproducibility.md
  - structured-output.md
  - model-serving.md
historical_context: false
last_reviewed: 2026-07-29
---

# Temperature and Determinism

Temperature rescales logits before sampling. It is one control inside [sampling and decoding](sampling-and-decoding.md), but [determinism and reproducibility](determinism-and-reproducibility.md) also depend on model version, retrieval, tools, seeds, serving, and post-processing. Low temperature reduces sampling variance; it does not make a whole generative system reproducible.

## Temperature scaling

For logits $z_i$ and temperature $T$,

$$
p_i(T)=\frac{\exp(z_i/T)}{\sum_j\exp(z_j/T)}.
$$

Here $z_i$ is the logit for token $i$, $T$ is the temperature, and $p_i(T)$ is the sampling probability after rescaling. Dividing by a smaller $T$ widens logit gaps before softmax; dividing by a larger $T$ compresses them.

Lower $T$ sharpens the distribution; higher $T$ flattens it. At the limit toward zero, decoding approaches greedy selection.

## Isolating the temperature effect

The code takes the real next-token logits of a small open model for one prompt, changes only temperature, and also samples ten complete answers at each temperature. Top-k, top-p, and the repetition penalty are switched off, so the output isolates the effect of temperature.

```python
import numpy as np
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

MODEL_ID = "Qwen/Qwen2.5-0.5B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
model = AutoModelForCausalLM.from_pretrained(MODEL_ID)
torch.manual_seed(7)

messages = [{"role": "user", "content": "Suggest a name for a coffee shop. Reply with the name only."}]
inputs = tokenizer.apply_chat_template(
    messages, add_generation_prompt=True, return_tensors="pt", return_dict=True
)
with torch.no_grad():
    logits = model(**inputs).logits[0, -1].float().numpy()


def softmax(x):
    e = np.exp(x - x.max())
    return e / e.sum()


def entropy(p):
    p = p[p > 0]
    return float(-(p * np.log2(p)).sum()) + 0.0


for temperature in [0.2, 0.7, 1.0, 1.5]:
    probs = softmax(logits / temperature)
    samples = set()
    for _ in range(10):
        output = model.generate(
            **inputs, do_sample=True, temperature=temperature, max_new_tokens=12,
            top_k=0, top_p=1.0, repetition_penalty=1.0,  # isolate temperature from the model's defaults
            pad_token_id=tokenizer.eos_token_id,
        )
        samples.add(tokenizer.decode(output[0, inputs["input_ids"].shape[1]:], skip_special_tokens=True).strip())
    print(f"temperature={temperature}: top-token p={probs.max():.2f}  entropy={entropy(probs):5.2f} bits  "
          f"distinct answers in 10 samples={len(samples)}")
```

Observed output with Qwen2.5-0.5B-Instruct on CPU:

```text
temperature=0.2: top-token p=0.70  entropy= 1.06 bits  distinct answers in 10 samples=3
temperature=0.7: top-token p=0.32  entropy= 3.26 bits  distinct answers in 10 samples=10
temperature=1.0: top-token p=0.18  entropy= 5.96 bits  distinct answers in 10 samples=10
temperature=1.5: top-token p=0.04  entropy=11.49 bits  distinct answers in 10 samples=10
```

The ranking of tokens does not change, but the probability of the top token falls from 0.70 at $T=0.2$ to 0.04 at $T=1.5$. Entropy grows from about 1 bit to 11.5 bits, because a vocabulary of about 150,000 tokens has a long tail that temperature alone never removes. Even $T=0.2$ produced three different answers in ten samples: a low temperature makes outputs more repeatable, not deterministic.

The plot shows the same effect: high temperature leaves the top token first, but it spreads probability across the tail.

![Higher temperature spreads probability mass from the top token to lower-ranked tokens.](../assets/diagrams/temperature-probability-spread.svg)

## Choosing temperature

| Task                       | Typical setting     | Reason                                            |
| -------------------------- | ------------------- | ------------------------------------------------- |
| extraction and routing     | low temperature     | stable format and fewer surprising tokens.        |
| grounded support answers   | low to moderate     | preserve evidence while allowing fluent phrasing. |
| brainstorming or ideation  | moderate to high    | diversity matters more than exact repeatability.  |
| code generation with tests | low to moderate     | keep syntax stable; use tests for correctness.    |
| safety-critical workflows  | low plus validators | decoding alone is not the safety control.         |

Temperature should be evaluated with the full route. A creative setting that is harmless for drafting marketing copy may be unacceptable for policy answers or tool calls.

## Determinism misconceptions

Temperature $0$ or near-zero decoding can still produce different outputs if retrieved chunks change, prompt templates change, model deployments change, tool calls return different data, or validators retry on failure. For reproducibility, record the whole run: prompt, model, decoding parameters, retrieval IDs, tool results, and schema versions.

## Caveats

Temperature zero can still drift in hosted systems. For extraction, combine low temperature with [structured output](structured-output.md) validation. For debugging, prefer replayable traces over relying on a single temperature setting.

## References

- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)
- [Holtzman et al., 2020, The Curious Case of Neural Text Degeneration](https://arxiv.org/abs/1904.09751)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Top-k and Top-p Sampling](top-k-and-top-p-sampling.md) [Determinism and Reproducibility →](determinism-and-reproducibility.md)

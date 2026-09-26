---
title: Sampling and Decoding
slug: generative-ai/sampling-and-decoding
description: "How next-token logits become text through greedy, temperature, top-k, and nucleus decoding."
area: generative-ai
topics:
  - sampling-and-decoding
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - temperature-and-determinism.md
  - top-k-and-top-p-sampling.md
  - determinism-and-reproducibility.md
  - structured-output.md
  - language-model-architecture.md
historical_context: false
last_reviewed: 2026-07-22
---

# Sampling and Decoding

Sampling and decoding turn a language model's next-token logits into actual output. The model architecture supplies a score vector; the decoder chooses whether to take the highest score, rescale the distribution, truncate unlikely tokens, or enforce a contract such as [structured output](structured-output.md). This page is the parent concept for [temperature and determinism](temperature-and-determinism.md) and [top-k and top-p sampling](top-k-and-top-p-sampling.md).

## Decoding rules

For vocabulary logits $z\in\mathbb R^V$, ordinary sampling uses

$$
p_i=\frac{\exp(z_i/T)}{\sum_j \exp(z_j/T)}
$$

with temperature $T>0$. Greedy decoding is $\arg\max_i z_i$. Top-k sets all but the $k$ largest logits to $-\infty$ before softmax. Nucleus, or top-p, first sorts tokens by probability and keeps the smallest prefix $S$ such that $\sum_{i\in S}p_i\ge p$, then renormalizes on $S$. These controls affect diversity but do not by themselves make an application reproducible; that requires the broader trace discipline in [determinism and reproducibility](determinism-and-reproducibility.md).

## Comparing decoders

This snippet takes the real next-token logits of a small open model (Qwen2.5-0.5B-Instruct, which runs on a laptop CPU) for one prompt. It applies greedy, temperature, top-k, and nucleus decoding to the same logits, reports how many tokens stay possible (`support`) and the entropy, and then samples a few complete answers with the same controls as `generate` parameters.

```python
import numpy as np
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

MODEL_ID = "Qwen/Qwen2.5-0.5B-Instruct"  # small enough for a laptop CPU
tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
model = AutoModelForCausalLM.from_pretrained(MODEL_ID)
torch.manual_seed(7)

messages = [{"role": "user", "content": "Suggest a name for a coffee shop. Reply with the name only."}]
inputs = tokenizer.apply_chat_template(
    messages, add_generation_prompt=True, return_tensors="pt", return_dict=True
)
input_ids = inputs["input_ids"]
with torch.no_grad():
    logits = model(**inputs).logits[0, -1].float().numpy()  # next-token logits over the vocabulary


def softmax(x):
    z = x - x[np.isfinite(x)].max()
    e = np.exp(z)
    return e / e.sum()


def entropy(p):
    p = p[p > 0]
    return float(-(p * np.log2(p)).sum()) + 0.0  # + 0.0 turns -0.0 into 0.0


def top_k_probs(logits, k):
    masked = np.full_like(logits, -np.inf)
    keep = np.argsort(logits)[-k:]
    masked[keep] = logits[keep]
    return softmax(masked)


def top_p_probs(logits, p_cut):
    base = softmax(logits)
    order = np.argsort(-base)
    keep_n = int(np.searchsorted(np.cumsum(base[order]), p_cut)) + 1
    masked = np.full_like(logits, -np.inf)
    masked[order[:keep_n]] = logits[order[:keep_n]]
    return softmax(masked)


def describe(name, probs):
    top = [i for i in np.argsort(-probs)[:4] if probs[i] >= 0.01]
    tokens = ", ".join(f"{tokenizer.decode([int(i)])!r} {probs[i]:.2f}" for i in top)
    print(f"{name:16} support={int((probs > 1e-6).sum()):6}  entropy={entropy(probs):5.2f} bits  top: {tokens}")


greedy = np.zeros_like(logits)
greedy[logits.argmax()] = 1.0
describe("greedy", greedy)
describe("temperature=0.7", softmax(logits / 0.7))
describe("temperature=1.5", softmax(logits / 1.5))
describe("top_k=3", top_k_probs(logits, 3))
describe("top_p=0.80", top_p_probs(logits, 0.80))

# The same controls as generation parameters: five sampled completions.
for _ in range(5):
    output = model.generate(
        **inputs, do_sample=True, temperature=0.7, top_k=50, top_p=0.9, max_new_tokens=12,
        repetition_penalty=1.0,  # override the model's generation_config default
        pad_token_id=tokenizer.eos_token_id,
    )
    print(tokenizer.decode(output[0, input_ids.shape[1]:], skip_special_tokens=True))
```

Observed output with `transformers` 5.17 on CPU:

```text
greedy           support=     1  entropy= 0.00 bits  top: 'Coffee' 1.00
temperature=0.7  support=  1115  entropy= 3.26 bits  top: 'Coffee' 0.32, 'The' 0.25, '星巴克' 0.12, 'C' 0.07
temperature=1.5  support= 43582  entropy=11.49 bits  top: 'Coffee' 0.04, 'The' 0.04, '星巴克' 0.03, 'C' 0.02
top_k=3          support=     3  entropy= 1.53 bits  top: 'Coffee' 0.43, 'The' 0.36, '星巴克' 0.22
top_p=0.80       support=    48  entropy= 3.94 bits  top: 'Coffee' 0.22, 'The' 0.19, '星巴克' 0.11, 'C' 0.08
Coffee Bean Haven
Coffee Bliss
Coffee Roast坊
星巴克
Green Leaf Cafe
```

The vocabulary has about 150,000 tokens. Temperature never removes any of them, so at $T=1.5$ tens of thousands of tokens keep a non-negligible probability and entropy reaches 11.5 bits. Top-k and top-p cut that tail before sampling. The output also shows what the tail contains for a small multilingual model: a Chinese token (星巴克, "Starbucks") ranks third, and one sampled name switches language mid-word. Truncation and a lower temperature are what keep such tokens out of production output. In an extraction workflow, broad decoding damages schema reliability; in brainstorming, some breadth is the point.

`generate` also applies defaults from the model's `generation_config` (for this model, `top_k=20`, `top_p=0.8`, and a repetition penalty) unless you override them. Log the effective settings, not only the ones you passed.

## Caveats

Greedy decoding can be repetitive because it repeatedly follows local maxima. Very high temperature admits implausible tokens. Top-k is insensitive to distribution shape, while top-p adapts but can become very narrow when one token dominates. Provider parameters can interact, so record the exact settings beside prompts, retrieved context, and tool outputs.

## References

- [Holtzman et al., 2020, The Curious Case of Neural Text Degeneration](https://arxiv.org/abs/1904.09751)
- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Prompting](prompting.md) [Top-k and Top-p Sampling →](top-k-and-top-p-sampling.md)

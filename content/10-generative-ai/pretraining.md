---
title: Pretraining
slug: generative-ai/pretraining
description: "Large-scale self-supervised training that builds the base model distribution."
area: generative-ai
topics:
  - pretraining
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - foundation-models.md
  - language-model-architecture.md
  - instruction-tuning.md
  - tokenization.md
  - ../01-mathematical-foundations/cross-entropy.md
historical_context: false
last_reviewed: 2026-07-11
---
# Pretraining

Pretraining is the large-scale self-supervised stage that gives [foundation models](foundation-models.md) broad linguistic or multimodal capability. For decoder language models, it trains the [language model architecture](language-model-architecture.md) to predict the next token from previous [tokenization](tokenization.md) outputs.

## Defining math

For sequence $x_1,\ldots,x_T$, next-token pretraining minimizes

$$
L(\theta)=-\sum_{t=1}^{T}\log p_\theta(x_t\mid x_{<t}).
$$

This is cross-entropy over the vocabulary at each position.

## Executed artifact

```python
import numpy as np

logits = np.array([[2.0, 0.5, -0.5], [0.2, 1.4, 0.0]])
targets = np.array([0, 2])
exp_logits = np.exp(logits - logits.max(axis=1, keepdims=True))
probs = exp_logits / exp_logits.sum(axis=1, keepdims=True)
token_losses = -np.log(probs[np.arange(len(targets)), targets])
print("PRETRAINING")
print(
    "token_losses",
    np.round(token_losses, 3).tolist(),
    "mean",
    round(float(token_losses.mean()), 3),
    "ppl",
    round(float(np.exp(token_losses.mean())), 3),
)
```

Observed output:

```text
PRETRAINING
token_losses [0.266, 1.837] mean 1.052 ppl 2.862
```

The second token has higher loss because the toy logits assigned lower probability to the target. Perplexity is the exponential of mean token loss.

## Caveats

Pretraining data quality, deduplication, and contamination matter. Better pretraining loss does not automatically imply safer or more useful assistant behavior.

## References

- [Kaplan et al., 2020, Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Vaswani et al., 2017, Attention Is All You Need](https://arxiv.org/abs/1706.03762)

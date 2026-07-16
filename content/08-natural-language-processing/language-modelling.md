---
title: Language Modelling
slug: natural-language-processing/language-modelling
description: "Estimating token sequence probabilities for prediction, generation, and representation learning."
area: natural-language-processing
topics:
  - language-modelling
level: foundational
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - tokenization.md
  - decoder-only-transformers.md
  - bert-style-encoders.md
  - summarization.md
  - ../11-generative-ai/language-model-architecture.md
historical_context: false
last_reviewed: 2026-07-11
---

# Language Modelling

Language modelling assigns probabilities to token sequences. Autoregressive models predict the next token and drive [decoder-only transformers](decoder-only-transformers.md); masked language models predict hidden tokens and pretrain [bert-style encoders](bert-style-encoders.md). The same probability machinery affects [summarization](summarization.md), autocomplete, speech recognition, and generation.

## Defining mechanism

An autoregressive model factorizes a sequence by the chain rule:

$$
P(w_{1:n})=\prod_{i=1}^n P(w_i\mid w_{<i}).
$$

Training minimizes negative log-likelihood,

$$
\mathcal L=-\sum_i \log P_\theta(w_i\mid w_{<i}),
$$

and reports perplexity as $\exp(\mathcal L/N)$ for $N$ predicted tokens. An $n$-gram model estimates $P(w_i\mid w_{i-n+1:i-1})$ from counts; transformers replace counts with contextual hidden states over [tokenization](tokenization.md) output.

## Worked example

This snippet estimates add-one-smoothed bigram probabilities, computes perplexity for a short sequence, and lists likely continuations after `the`.

```python
import math, numpy as np
from collections import Counter

np.random.seed(7)
sents = [["<s>", "the", "cat", "sat", "</s>"],
         ["<s>", "the", "cat", "ate", "</s>"],
         ["<s>", "the", "dog", "sat", "</s>"]]
V = sorted({w for s in sents for w in s})
uni, bi = Counter(), Counter()
for s in sents:
    for a, b in zip(s, s[1:]):
        uni[a] += 1; bi[(a, b)] += 1
seq = ["<s>", "the", "cat", "sat", "</s>"]
logp, probs = 0, []
for a, b in zip(seq, seq[1:]):
    p = (bi[(a, b)] + 1) / (uni[a] + len(V))
    probs.append((a, b, round(p, 3))); logp += math.log(p)
print("conditional_probs", probs)
print("perplexity", round(math.exp(-logp / (len(seq) - 1)), 3))
print("next_after_the", sorted([(w, round((bi[('the', w)] + 1) / (uni['the'] + len(V)), 3)) for w in V], key=lambda x: -x[1])[:3])
```

Observed output:

```text
conditional_probs [('<s>', 'the', 0.4), ('the', 'cat', 0.3), ('cat', 'sat', 0.222), ('sat', '</s>', 0.333)]
perplexity 3.257
next_after_the [('cat', 0.3), ('dog', 0.2), ('</s>', 0.1)]
```

Add-one smoothing keeps unseen bigrams nonzero but lowers the probability of observed transitions. That trade-off becomes far more complex in neural models, where smoothing is implicit in the learned representation.

## Caveats

Perplexity is tokenization-dependent, so scores from different tokenizers are not directly comparable. Low perplexity does not guarantee factuality, instruction following, or safe behavior. For task systems, combine language-model metrics with [evaluation of NLP systems](evaluation-of-nlp-systems.md) and inspect generated examples.

## References

- [Jurafsky and Martin, Speech and Language Processing, 3rd ed. draft](https://web.stanford.edu/~jurafsky/slp3/)
- [Vaswani et al., Attention Is All You Need](https://arxiv.org/abs/1706.03762)

> [!nav]
> **Section** — [Natural Language Processing](index.md)
>
> [← Embeddings](embeddings.md) [BERT-Style Encoders →](bert-style-encoders.md)

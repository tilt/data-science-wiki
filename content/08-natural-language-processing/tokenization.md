---
title: Tokenization
slug: natural-language-processing/tokenization
description: "Splitting text into model-visible units such as words, subwords, bytes, or characters."
area: natural-language-processing
topics:
  - tokenization
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - text-preprocessing.md
  - embeddings.md
  - language-modelling.md
  - bert-style-encoders.md
  - decoder-only-transformers.md
historical_context: false
last_reviewed: 2026-07-11
---

# Tokenization

Tokenization chooses the units consumed by NLP models. A word tokenizer is natural for sparse [text classification](text-classification.md); subword or byte tokenizers are essential for [bert-style encoders](bert-style-encoders.md), [decoder-only transformers](decoder-only-transformers.md), and open-vocabulary [language modelling](language-modelling.md). The tokenizer defines vocabulary size, sequence length, and which errors are even representable.

## Defining mechanism

Byte-pair encoding style tokenization starts with characters and repeatedly merges the most frequent adjacent pair:

$$
(a^\*,b^\*)=\arg\max_{(a,b)} \operatorname{count}(a,b).
$$

After learning merges, tokenization usually applies them greedily to new text. The model then embeds token ids, so a different tokenizer changes the input distribution even if the visible sentence is unchanged.

## Worked example

This small BPE loop learns merges from a toy corpus, so the output shows how repeated character pairs become reusable subword tokens.

```python
import numpy as np
from collections import Counter

np.random.seed(7)
corpus = ["low lower lowest", "newer wider lower"]
vocab = [tuple(list(w) + ["</w>"]) for sent in corpus for w in sent.split()]

def pair_counts(words):
    c = Counter()
    for w in words:
        for a, b in zip(w, w[1:]):
            c[(a, b)] += 1
    return c

merges = []
for _ in range(4):
    pair, count = pair_counts(vocab).most_common(1)[0]
    merges.append((pair, count))
    merged = "".join(pair)
    new_vocab = []
    for w in vocab:
        out, i = [], 0
        while i < len(w):
            if i < len(w) - 1 and (w[i], w[i + 1]) == pair:
                out.append(merged); i += 2
            else:
                out.append(w[i]); i += 1
        new_vocab.append(tuple(out))
    vocab = new_vocab
print("merges", merges)
print("lower_tokens", list(vocab[1]))
print("vocab_size_after", len(set(t for w in vocab for t in w)))
```

Observed output:

```text
merges [(('l', 'o'), 4), (('lo', 'w'), 4), (('e', 'r'), 4), (('er', '</w>'), 4)]
lower_tokens ['low', 'er</w>']
vocab_size_after 10
```

The learned pieces reuse `low` across `low`, `lower`, and `lowest`, reducing unknown-word pressure while keeping sequence length shorter than pure characters.

## Caveats

Token counts are not word counts. A rare name, code identifier, or OCR error may explode into many subwords and be truncated away. Tokenization must be inspected together with [text preprocessing](text-preprocessing.md), [embeddings](embeddings.md), and downstream [evaluation](evaluation-of-nlp-systems.md), because a clean aggregate score can hide failures on languages, names, or technical strings.

## References

- [Manning, Raghavan, and Schutze, Introduction to Information Retrieval: Tokenization](https://nlp.stanford.edu/IR-book/html/htmledition/tokenization-1.html)
- [Jurafsky and Martin, Speech and Language Processing, 3rd ed. draft](https://web.stanford.edu/~jurafsky/slp3/)

> **Section — [Natural Language Processing](index.md):** ← [Text Preprocessing](text-preprocessing.md) · [Embeddings](embeddings.md) →

> **Learning path — [Natural language processing](../00-home-and-navigation/learning-paths.md#natural-language-processing):** ← [Natural Language Processing](index.md) · [Embeddings](embeddings.md) →

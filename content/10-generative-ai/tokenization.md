---
title: Tokenization
slug: generative-ai/tokenization
description: "Splitting text into model tokens that determine context, cost, and generation units."
area: generative-ai
topics:
  - tokenization
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - language-model-architecture.md
  - context-construction.md
  - chunking.md
  - pretraining.md
  - ../07-natural-language-processing/tokenization.md
historical_context: false
last_reviewed: 2026-07-11
---
# Tokenization

Tokenization converts text into the units consumed by a model. It affects [language model architecture](language-model-architecture.md), [pretraining](pretraining.md), prompt cost, [chunking](chunking.md), truncation, and generation boundaries.

## Mechanism

Subword tokenizers learn a vocabulary of pieces so rare words can be represented as combinations. Byte-pair encoding repeatedly merges frequent adjacent symbols; other systems use unigram or byte-level variants. Context limits count tokens, not words, so [context construction](context-construction.md) needs the model's tokenizer.

## Executed artifact

```python
word = "lowest"
symbols = list(word) + ["</w>"]
merges = [("l", "o"), ("lo", "w"), ("e", "s"), ("es", "t"), ("low", "est")]

print("TOKENIZATION")
for a, b in merges:
    out = []
    i = 0
    while i < len(symbols):
        if i + 1 < len(symbols) and symbols[i] == a and symbols[i + 1] == b:
            out.append(a + b)
            i += 2
        else:
            out.append(symbols[i])
            i += 1
    symbols = out
    print((a, b), "->", symbols)
```

Observed output:

```text
TOKENIZATION
('l', 'o') -> ['lo', 'w', 'e', 's', 't', '</w>']
('lo', 'w') -> ['low', 'e', 's', 't', '</w>']
('e', 's') -> ['low', 'es', 't', '</w>']
('es', 't') -> ['low', 'est', '</w>']
('low', 'est') -> ['lowest', '</w>']
```

The toy BPE path shows each merge reducing the sequence: `l`+`o` becomes `lo`, then `lo`+`w` becomes `low`, and the final learned merge produces `lowest`. Without the last merge, the same word would remain split as `low` and `est`, which is why tokenizer vocabularies directly affect context length and generation units.

## Caveats

Code, tables, numbers, and non-English text can tokenize very differently from prose. Tokenization changes can break cached counts.

## References

- [Hugging Face Tokenizers documentation](https://huggingface.co/docs/tokenizers/en/index)
- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)

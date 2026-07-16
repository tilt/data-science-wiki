---
title: From N-Gram Language Models to Transformers
slug: history-of-ai-and-machine-learning/from-ngram-language-models-to-transformers
description: "How language modeling moved from sparse counts to neural embeddings, contextual pretraining, and Transformer language models."
area: history-of-ai-and-machine-learning
topics:
  - from-ngram-language-models-to-transformers
level: foundational
status: review
page_type: history
aliases: []
prerequisites:
  - index.md
related:
  - ../08-natural-language-processing/language-modelling.md
  - ../08-natural-language-processing/tokenization.md
  - ../08-natural-language-processing/embeddings.md
  - ../08-natural-language-processing/bert-style-encoders.md
  - ../08-natural-language-processing/decoder-only-transformers.md
  - ../11-generative-ai/pretraining.md
historical_context: true
last_reviewed: 2026-07-11
---

# From N-Gram Language Models to Transformers

Language modeling began as a counting problem: estimate the next word from a short history. It became a representation-learning problem when neural models learned dense embeddings, and then a scaling problem when transformers made large-context pretraining practical.

## Verified chronology

| Year      | Milestone                                                                                                                              | Why it followed                                                                                                                                                                |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1992      | Brown, de Souza, Mercer, Della Pietra, and Lai published class-based n-gram language models.                                           | Sparse word histories made ordinary n-gram counts unreliable; clustering words into classes shared statistical strength.                                                       |
| 2003      | Bengio, Ducharme, Vincent, and Jauvin published a neural probabilistic language model.                                                 | Dense distributed word representations reduced the curse of dimensionality in count tables.                                                                                    |
| 2013      | Mikolov, Chen, Corrado, and Dean introduced efficient word-vector training methods.                                                    | [Embeddings](../08-natural-language-processing/embeddings.md) made semantic similarity cheap to learn from unlabeled text, though the vectors were mostly context-independent. |
| 2018      | Peters and coauthors introduced ELMo, deep contextualized word representations from a bidirectional language model.                    | A word needed different representations in different contexts, so language-model pretraining became reusable feature extraction.                                               |
| 2018-2020 | BERT and GPT-style transformers turned self-supervised [pretraining](../11-generative-ai/pretraining.md) into the dominant NLP recipe. | Self-attention made contextual representations parallelizable, while masked or causal objectives supplied supervision from raw text.                                           |

## Historical mechanism

The core limitation of n-grams is the fixed window. A trigram model can estimate `P(word | previous two words)`, but it cannot represent long dependencies except by making the table exponentially larger. Neural language models compressed words into vectors, so related contexts could share parameters. That connects this history directly to [language modelling](../08-natural-language-processing/language-modelling.md) and [tokenization](../08-natural-language-processing/tokenization.md): what counts as the next unit determines what the model can learn.

Contextual models changed the unit of representation. ELMo used bidirectional recurrent language models; [BERT-style encoders](../08-natural-language-processing/bert-style-encoders.md) used masked-token prediction with bidirectional self-attention; [decoder-only transformers](../08-natural-language-processing/decoder-only-transformers.md) used causal next-token prediction for generation. Each step followed the same pressure: use more unlabeled text while preserving enough context to generalize.

The historical lesson is that transformers did not replace language modeling; they made the old next-token and missing-token objectives scalable enough to become foundation-model training.

## References

- [Brown et al., 1992, Class-based n-gram models of natural language](https://aclanthology.org/J92-4003/)
- [Bengio et al., 2003, A Neural Probabilistic Language Model](https://www.jmlr.org/papers/v3/bengio03a.html)
- [Mikolov et al., 2013, Efficient Estimation of Word Representations in Vector Space](https://arxiv.org/abs/1301.3781)
- [Peters et al., 2018, Deep contextualized word representations](https://arxiv.org/abs/1802.05365)
- [Devlin et al., 2018, BERT](https://arxiv.org/abs/1810.04805)

> **Section — [History of AI and Machine Learning](index.md):** ← [From CNN Video Models to Video Transformers](from-cnn-video-models-to-video-transformers.md) · [Development of Attention and Transformers](development-of-attention-and-transformers.md) →

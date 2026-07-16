---
title: Development of Attention and Transformers
slug: history-of-ai-and-machine-learning/development-of-attention-and-transformers
description: "How sequence-to-sequence bottlenecks led to attention, the Transformer, and modern encoder and decoder language models."
area: history-of-ai-and-machine-learning
topics:
  - development-of-attention-and-transformers
level: foundational
status: review
page_type: history
aliases: []
prerequisites:
  - index.md
related:
  - ../06-deep-learning/attention.md
  - ../06-deep-learning/transformers.md
  - ../06-deep-learning/recurrent-neural-networks.md
  - ../08-natural-language-processing/bert-style-encoders.md
  - ../08-natural-language-processing/decoder-only-transformers.md
  - ../11-generative-ai/language-model-architecture.md
historical_context: true
last_reviewed: 2026-07-11
---

# Development of Attention and Transformers

Attention and transformers grew out of a concrete translation problem: early neural sequence-to-sequence systems could map one sequence to another, but they compressed the whole source sentence into a fixed vector. That made long-range information hard to preserve even when [recurrent neural networks](../06-deep-learning/recurrent-neural-networks.md) and LSTMs were strong enough to train.

## Verified chronology

| Year      | Milestone                                                                                                                             | Why it followed                                                                                                                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2014      | Sutskever, Vinyals, and Le published "Sequence to Sequence Learning with Neural Networks," an encoder-decoder LSTM translation model. | It showed that neural translation could be trained end to end, but the fixed-length encoded vector was still a narrow communication channel.                                                                      |
| 2014/2015 | Bahdanau, Cho, and Bengio introduced neural machine translation with learned soft alignment.                                          | The decoder no longer had to rely only on one compressed sentence vector; at each step it could attend to relevant source positions.                                                                              |
| 2017      | Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, and Polosukhin introduced the Transformer in "Attention Is All You Need."  | If attention was the useful routing mechanism, self-attention could replace recurrence in the main sequence operation and make training much more parallel.                                                       |
| 2018      | Devlin, Chang, Lee, and Toutanova introduced BERT as a bidirectional Transformer encoder for language understanding.                  | Once self-attention made contextual representation scalable, masked-token pretraining turned unlabeled text into supervision for [BERT-style encoders](../08-natural-language-processing/bert-style-encoders.md). |
| 2018-2020 | GPT-style decoder-only Transformers scaled autoregressive next-token prediction from GPT to GPT-3.                                    | The same [transformer](../06-deep-learning/transformers.md) block, with a causal mask, became a general-purpose generator for [language-model architectures](../11-generative-ai/language-model-architecture.md). |

## Historical mechanism

The decisive mechanism was not "more layers" by itself. It was replacing a serial hidden-state bottleneck with [attention](../06-deep-learning/attention.md): content-based lookup from queries to keys and values. Bahdanau attention first used this idea across encoder and decoder states, making alignment differentiable and task-driven. The Transformer then made every token exchange information with every other token through self-attention, followed by feed-forward layers, residual connections, normalization, and positional information.

That change altered the scaling path. Recurrent models process tokens in order, so training over long sequences is hard to parallelize. Transformers expose the whole sequence to matrix operations, so hardware can trade memory for throughput. BERT used bidirectional self-attention when the goal was representation and classification; GPT-style [decoder-only transformers](../08-natural-language-processing/decoder-only-transformers.md) used causal self-attention when the goal was generation without seeing future tokens.

The historical caveat is that attention did not remove sequence modeling difficulties; it moved them. Positional encoding, masking, context length, data scale, and evaluation became central. The attention map is a routing computation, not a guaranteed explanation of a model's answer.

## References

- [Sutskever et al., 2014, Sequence to Sequence Learning with Neural Networks](https://arxiv.org/abs/1409.3215)
- [Bahdanau et al., 2014, Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/abs/1409.0473)
- [Vaswani et al., 2017, Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Devlin et al., 2018, BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://arxiv.org/abs/1810.04805)
- [Brown et al., 2020, Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)

> [!nav]
> **Section** — [History of AI and Machine Learning](index.md)
>
> [← From N-Gram Language Models to Transformers](from-ngram-language-models-to-transformers.md) [Self-Supervised Learning →](self-supervised-learning.md)

---
title: Video-Language Models
slug: video-understanding/video-language-models
description: "Models that align video tokens with text queries, captions, or conversational outputs."
area: video-understanding
topics:
  - video-language-models
level: advanced
status: review
page_type: model
aliases:
  - Video language models
  - Video VLMs
prerequisites:
  - index.md
related:
  - video-transformers.md
  - video-representation.md
  - v-jepa-2-versus-vision-language-models.md
  - ../11-generative-ai/vision-language-models.md
historical_context: false
last_reviewed: 2026-07-21
---

# Video-Language Models

Video-language models connect video evidence to language inputs or outputs: captions, question answering, retrieval, instruction following, and dialogue over temporal content. They usually start from a [video representation](video-representation.md), project visual tokens into a language-model-compatible space, and use cross-attention or token concatenation. This makes them different from [V-JEPA](v-jepa.md), whose central objective is latent visual prediction rather than text generation.

## Cross-modal attention

A simple cross-modal pooling step computes attention from a text query $q$ to video tokens $v_t$:

$$
\alpha_t = \operatorname{softmax}(q^\top v_t), \qquad c=\sum_t \alpha_t v_t.
$$

The pooled context $c$ can condition a decoder or classifier. Larger systems use [video transformers](video-transformers.md), projection layers, and language-model attention, but the interface remains language-facing. The comparison page [V-JEPA 2 versus Vision-Language Models](v-jepa-2-versus-vision-language-models.md) is about this objective and interface difference.

## Worked attention example

For three frame tokens $v_t$ and a text query $q$, the raw alignment score is $q^\top v_t$. The softmax turns those scores into attention weights:

| frame |     token $v_t$ | score $q^\top v_t$ | attention weight |
| ----: | --------------: | -----------------: | ---------------: |
|     1 | $(1.0,0.0,0.2)$ |               0.04 |            0.160 |
|     2 | $(0.1,0.8,0.1)$ |               0.82 |            0.349 |
|     3 | $(0.0,1.1,0.3)$ |               1.16 |            0.491 |

The pooled token is therefore

$$
c=0.160v_1+0.349v_2+0.491v_3=(0.195,0.819,0.214).
$$

The query is most aligned with the later frames, so the pooled representation emphasizes the second coordinate that those frames carry.

## Caveats

Language fluency can hide weak temporal grounding. Sparse frame sampling may miss the evidence needed to answer "before" and "after" questions. Evaluation should include temporal ordering, event counting, and retrieval checks, not only caption style.

## References

- [Lin et al., 2023, Video-LLaVA](https://arxiv.org/abs/2311.10122)
- [Wang et al., 2024, InternVideo2](https://arxiv.org/abs/2403.15377)
- [Alayrac et al., 2022, Flamingo](https://arxiv.org/abs/2204.14198)

> [!nav]
> **Section** — [Video Understanding](index.md)
>
> [← Self-Supervised Video Representation Learning](self-supervised-video-representation-learning.md) [V-JEPA →](v-jepa.md)

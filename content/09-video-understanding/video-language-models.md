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
  - ../10-generative-ai/vision-language-models.md
historical_context: false
last_reviewed: 2026-07-11
---
# Video-Language Models

Video-language models connect video evidence to language inputs or outputs: captions, question answering, retrieval, instruction following, and dialogue over temporal content. They usually start from a [video representation](video-representation.md), project visual tokens into a language-model-compatible space, and use cross-attention or token concatenation. This makes them different from [V-JEPA](v-jepa.md), whose central objective is latent visual prediction rather than text generation.

## Defining mechanism

A simple cross-modal pooling step computes attention from a text query $q$ to video tokens $v_t$:

$$
\alpha_t = \operatorname{softmax}(q^\top v_t), \qquad c=\sum_t \alpha_t v_t.
$$

The pooled context $c$ can condition a decoder or classifier. Larger systems use [video transformers](video-transformers.md), projection layers, and language-model attention, but the interface remains language-facing. The comparison page [V-JEPA 2 versus Vision-Language Models](v-jepa-2-versus-vision-language-models.md) is about this objective and interface difference.

## Worked example

```python
import torch

frame_tokens = torch.tensor([[1.0,0.0,0.2],[0.1,0.8,0.1],[0.0,1.1,0.3]])
text_query = torch.tensor([0.0,1.0,0.2])
attn = (frame_tokens @ text_query).softmax(0)
answer_vec = attn @ frame_tokens
print("attention_over_frames", torch.round(attn, decimals=3).tolist())
print("pooled_video_token", torch.round(answer_vec, decimals=3).tolist())
```

Observed output:

```text
attention_over_frames [0.1599999964237213, 0.3490000069141388, 0.4909999966621399]
pooled_video_token [0.19499999284744263, 0.8190000057220459, 0.21400000154972076]
```

The text query is most aligned with the later frames, so the pooled token emphasizes those video features.

## Caveats

Language fluency can hide weak temporal grounding. Sparse frame sampling may miss the evidence needed to answer "before" and "after" questions. Evaluation should include temporal ordering, event counting, and retrieval checks, not only caption style.

## References

- [Lin et al., 2023, Video-LLaVA](https://arxiv.org/abs/2311.10122)
- [Wang et al., 2024, InternVideo2](https://arxiv.org/abs/2403.15377)
- [Alayrac et al., 2022, Flamingo](https://arxiv.org/abs/2204.14198)

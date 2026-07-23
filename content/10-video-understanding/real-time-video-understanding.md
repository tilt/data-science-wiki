---
title: Real-Time Video Understanding
slug: video-understanding/real-time-video-understanding
description: "Video understanding under explicit latency, throughput, buffering, and decision-deadline constraints."
area: video-understanding
topics:
  - real-time-video-understanding
level: advanced
status: complete
page_type: system-design
aliases:
  - Real time video understanding
prerequisites:
  - index.md
related:
  - sliding-window-inference.md
  - trigger-point-prediction.md
  - person-tracking-and-track-aggregation.md
  - video-transformers.md
historical_context: false
last_reviewed: 2026-07-23
---

# Real-Time Video Understanding

Real-time video understanding turns a model into a streaming system. The question is not only whether the model is accurate, but whether it can sample, buffer, infer, aggregate, and fire before the deadline. It connects directly to [sliding-window inference](sliding-window-inference.md), [trigger-point prediction](trigger-point-prediction.md), and [person tracking and track aggregation](person-tracking-and-track-aggregation.md).

## The latency budget

A simple latency budget is

$$
L = L_{capture} + L_{buffer} + L_{preprocess} + L_{model} + L_{postprocess}.
$$

Throughput must also hold: if a stream samples $r$ clips per second, average compute per clip must be less than $1/r$ seconds, with headroom for bursts. [Video transformers](video-transformers.md) stress this budget because attention cost grows with token count.

## Worked latency budget

For a 30 fps stream sampled every third frame, the model receives

$$
r = 30/3 = 10
$$

clips per second, so each clip has a compute budget of $1000/10=100$ ms before the system falls behind. If the model takes 42 ms, it has throughput headroom. Latency is different:

| component                |                    value |
| ------------------------ | -----------------------: |
| 8-frame buffer at 30 fps | $8\cdot1000/30=266.7$ ms |
| model inference          |                  42.0 ms |
| end-to-end subtotal      |                 308.7 ms |
| deadline                 |                 500.0 ms |

The setup meets a 500 ms deadline, but the buffer contributes far more latency than the model. Reducing model time alone would not help much unless the buffering policy also changes.

## Caveats

Batching improves throughput but adds queueing delay. Dropping frames can preserve latency while reducing recall for short events. Offline validation should be paired with replay tests that measure p50, p95, and worst-case trigger delay on real streams.

## References

- [Bewley et al., 2016, Simple Online and Realtime Tracking](https://arxiv.org/abs/1602.00763)
- [Bertasius et al., 2021, TimeSformer](https://arxiv.org/abs/2102.05095)

> [!nav]
> **Section** — [Video Understanding](index.md)
>
> [← Person Tracking and Track Aggregation](person-tracking-and-track-aggregation.md) [Gesture Recognition →](gesture-recognition.md)

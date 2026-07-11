---
title: Docker
slug: ml-engineering-and-mlops/docker
description: Concise guide to Docker in ML Engineering and MLOps.
area: ml-engineering-and-mlops
topics:
  - docker
level: foundational
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

Docker packages code, runtime dependencies, and operating-system libraries into a portable image. In ML systems it helps make training jobs, batch jobs, and inference services reproducible across machines.

## Core idea

A container image should contain the minimal runtime needed to execute the service or job. Build steps install dependencies; runtime configuration is injected through environment variables, mounted secrets, or orchestration config. The same image can be promoted from test to staging to production.

## Example

An inference service image might install Python dependencies, copy the application code, expose a health endpoint, and load a model artifact from object storage at startup. The image tag should reference the code version; the model artifact should have its own version so code and model can be rolled forward independently.

## Best practices

Use small base images, pin dependencies, avoid baking secrets into images, run as a non-root user, and separate build-time dependencies from runtime dependencies. For GPU workloads, match CUDA, driver, framework, and hardware compatibility deliberately.

## Failure modes

Containers do not automatically solve reproducibility. Unpinned package installs, mutable base tags, hidden network downloads at startup, and host-mounted files can still make behavior drift.

---
title: Docker
slug: ml-engineering-and-mlops/docker
description: "Container images as reproducible runtime envelopes for ML jobs and services."
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
  - model-serving.md
  - training-pipelines.md
  - ci-cd-for-ml.md
  - microservices.md
  - model-versioning.md
historical_context: false
last_reviewed: 2026-07-11
---

# Docker

Docker packages application code, Python dependencies, native libraries, and a startup command into an image. In MLOps, the image is the runtime envelope for [training pipelines](training-pipelines.md), batch scoring jobs, and [model-serving](model-serving.md) processes; the model artifact still needs its own version.

## Mechanism

A Dockerfile builds immutable layers. CI should pin the base image, install dependencies deterministically, run tests, and push an image tagged by source commit. Runtime configuration, model URIs, and secrets should be injected by the orchestrator rather than baked into the image.

## Artifact: Minimal Inference Image

```dockerfile
FROM python:3.12-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/
USER 65532:65532
ENV MODEL_URI=registry://fraud-scorer/41
EXPOSE 8080
CMD ["uvicorn", "app.server:api", "--host", "0.0.0.0", "--port", "8080"]
```

The image should start without downloading code. Loading `MODEL_URI` at startup links it to [model-versioning](model-versioning.md) while allowing [rollbacks](rollbacks.md) to switch model versions or container revisions independently.

## Failure Modes

Containers are not reproducibility magic. Mutable tags like `latest`, unpinned package ranges, hidden model downloads, root users, and GPU driver mismatches still create production drift. If the container is one [microservice](microservices.md) among many, it also needs health endpoints, resource limits, and structured logs so [ci-cd-for-ml](ci-cd-for-ml.md) can promote it safely.

## References

- [Dockerfile reference](https://docs.docker.com/reference/dockerfile/)
- [Docker build best practices](https://docs.docker.com/build/building/best-practices/)

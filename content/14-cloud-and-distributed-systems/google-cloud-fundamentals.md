---
title: Google Cloud Fundamentals
slug: cloud-and-distributed-systems/google-cloud-fundamentals
description: Concise guide to Google Cloud Fundamentals in Cloud and Distributed Systems.
area: cloud-and-distributed-systems
topics:
  - google-cloud-fundamentals
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

Google Cloud fundamentals cover the platform primitives used to run data and AI workloads: projects, IAM, networking, storage, compute, data processing, observability, and managed ML services.

## Core primitives

A typical Google Cloud system uses projects for isolation, IAM for access control, Cloud Storage for objects, BigQuery for analytics, managed compute for services and jobs, Pub/Sub for events, logging and monitoring for operations, and Vertex AI or custom infrastructure for ML workflows.

## Example architecture

A document-processing pipeline might upload files to Cloud Storage, publish an event, run extraction in a container job, store structured outputs in BigQuery, train a model from versioned data, and serve predictions through a managed endpoint. Service accounts define which step can access each resource.

## Failure modes

Common failures include mixing development and production in one project, using broad service-account permissions, underestimating egress and query costs, and treating managed ML endpoints as a substitute for evaluation and monitoring.

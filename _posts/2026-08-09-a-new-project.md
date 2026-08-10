---
layout: post
title: "A New Project: RAGStream"
date: 09-08-2026 21:00:00 +0000
categories:
  - project
  - AI
tags:
  - Projects
  - RAGStream
  - Python
  - LLM
  - RAG
excerpt: "Yes, it's another RAG pipeline to add to the ever-growing mountain of AI tooling."
---

Large Language Models are inherently limited by their training knowledge cutoffs. In rapidly advancing scientific domains, relying on static models for literature review or validation is ineffective. Bridging this gap requires Retrieval-Augmented Generation (RAG), allowing for up-to-date literature to be dynamically ingested, embedded, and queried.
RAGStream is an automated data ingestion and processing pipeline designed to systematically pull, parse, and structure recent publications from the ArXiv preprint server. It is engineered to be domain-agnostic. It is strictly an ingestion and processing layer.

## Engineering Standards Over Code Generation

The current trend in software development relies heavily on LLMs for rapid code generation. For RAGStream, I am deliberately building the codebase manually, without AI assistance. Developing robust data pipelines requires a precise understanding of API constraints and unstructured data formatting. Hand-writing the logic exposes the granular failure states that auto-generated code often glosses over with lazy try/except/if/else constructions, bypassing the error rather than actually handling it.
To ensure the system is a maintainable pipeline rather than a fragile collection of isolated scripts, the project enforces strict engineering constraints:

* **Strict Typing:** The pipeline uses strict type hinting to guarantee predictable data flow when handling inconsistent metadata returned by external wrappers, and varying PDF layouts.
* **Modular Architecture:** The codebase adheres to the Single Responsibility Principle. The Fetcher (interfacing with the arxiv package), the Parser (handling PDF-to-text extraction), and the Storage layer are strictly isolated. Future iterations may interleave these steps for better performance, particularly for higher throughput on reseource-limited machines, but their interfaces will remain distinct.

The immediate technical focus is robust PDF extraction and structuring the raw text for downstream chunking. Future updates will cover the embedding and vector storage implementations.

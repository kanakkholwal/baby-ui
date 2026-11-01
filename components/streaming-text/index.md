---
title: Streaming Text
description: "Word-by-word answer reveal, plain or with inline citation chips, then a footer, sources and follow-ups once it settles."
component: streaming-text
category: agents
tags: [streaming, answer, citations, sources, follow-ups, agent]
---

Words reveal one at a time and stop, so a real answer is never stuck replaying itself.
`content` takes a plain string for a bare stream, or tokens to place citation chips inline.
The footer and follow-ups fade in together once every word has revealed; leave them out
and `caret={false}` for just the text.

## Citations are structural, not styled text

A token is either a word or `{ text: "", cite: n }`, which places a chip for `sources[n]`
inline. `sources` and `content` are both required: an answer's actual words and citations
are domain content, not something this component invents a fictional default for.

## No decoration without a handler

Copy always works, reading the assembled plain text straight off `content`. Retry and the
thumbs-up/down feedback buttons only render when you pass `onRetry`/`onFeedback`: a button
that looks actionable and does nothing is not something this component ships.

## Parts

- `StreamingTextContent` reveals the answer; `sources` on the root feed its citation chips.
- `StreamingTextFooter` fades in once it settles. Put `StreamingTextCopy`, MessageActions
  (regenerate, feedback) and `StreamingTextSources` in it.
- `StreamingTextFollowUps` lists next prompts below.

## Migrating

Before parts, `StreamingText` took `content`, `markdown`, `streaming`, `caret`, `actions`,
`followUps`, `onRetry` and `onFeedback`. Move the content props to `StreamingTextContent`,
`followUps` to `StreamingTextFollowUps`, and compose MessageActions for retry and feedback.

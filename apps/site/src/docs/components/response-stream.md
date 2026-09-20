---
title: Response Stream
description: Streamed assistant text with a caret that tracks the last character.
component: response-stream
category: agents
tags: [stream, typewriter, ai]
---

Characters are revealed on a timer at `speed` per second, deliberately decoupled from
the rate tokens actually arrive. Network jitter would otherwise show up as the text
stuttering, which reads as the model hesitating rather than the connection varying.

## Announcing once, not continuously

The container is `aria-live="polite"` with `aria-busy` while streaming. A screen reader
gets the settled text when it finishes rather than a partial sentence every frame. A
naive live region on streaming text is genuinely unusable.

Under reduced motion the full text is present immediately, with no caret. That is also
what a screen reader has been getting the whole time.

## Selection survives

Revealing appends; it never re-renders the text already shown. Text you selected
mid-stream stays selected.

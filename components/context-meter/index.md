---
title: Context Meter
description: "How full a model's context window is, as a segmented meter of system prompt, tools, files, conversation and tool results, with pinned rows, clear actions and compaction."
component: context-meter
category: agents
tags: [context, tokens, agent, meter]
---

Pass `segments` with the tokens each source takes and the model's `limit`. Past `warnAt` the
percentage turns amber; `compactAt` is marked on the bar. Rows with an `action` show it as a
button and call `onAction`; pinned rows show a lock instead.

## Parts

- `ContextMeterHeader` lays out `ContextMeterIcon`, `ContextMeterTitle`, `ContextMeterSubtitle`
  (the model) and `ContextMeterPercent` (a rolling percentage).
- `ContextMeterBody` holds `ContextMeterSummary`, `ContextMeterBar`, `ContextMeterList` and
  `ContextMeterFooter` with `ContextMeterCompact`.

Compaction is yours: run it when the button is pressed or the window crosses `compactAt`, then
send the smaller segments back.

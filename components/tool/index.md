---
title: Tool Call
description: "One tool call as a row that opens onto its input and a live output log, with copy and run again."
component: tool
category: agents
tags: [tool, agent, terminal]
---

State is a word next to the icon, not just a colour. Only the running state animates, so a
finished list of ten calls is completely still rather than a wall of spinners.

A call that starts running opens its panel, so the output can be followed as it streams; set
`collapseOnComplete` to fold it again when it ends.

## Parts

- `ToolTrigger`: the kind icon, `title` and `name`, the status and the chevron.
- `ToolContent` holds `ToolInput`, `ToolOutput` (a log that follows its end while running) and
  `ToolActions` with `ToolCopy` and `ToolRetry`.

## Migrating

Before parts, `Tool` took `name`, `input`, `output` and `labels`. Move `name` and `labels` onto
`ToolTrigger`, and pass the input and output as children of `ToolInput` and `ToolOutput`.

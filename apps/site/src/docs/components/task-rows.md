---
title: Task Rows
description: "Expandable status rows with a badge, an amount, and a detail list that drops down."
component: task-rows
category: agents
tags: [tasks, status, rows, agent, retry]
---

Each row is its own disclosure: a status badge, a label, an amount, and an optional pill,
expanding to a short list of what actually happened. `rows` is required, since a task list
is domain content this component has no business inventing.

## Fully controlled, no internal timers

A row's badge and pill are a direct render of its `status` (`pending` | `running` | `done` |
`failed`) — this component holds no state machine and simulates nothing on its own. A failed
row's retry glyph only renders as a real button when you pass `onRetry`; wire it to actually
retry the task and update `rows` yourself. Completed/failed pills reuse `Badge`, so status is
never colour-only.

## Variants

`capsules` (default) renders each row as its own rounded card; `list` flattens them into one
bordered stack, better for a dense sidebar or a long queue.

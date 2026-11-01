---
title: Agent Activity
description: "An agent's run as a live log of steps, searches and tool calls that glides as it grows, then folds into a one-line summary."
component: agent-activity
category: agents
tags: [agent, activity, log, tool, search]
---

Append rows as your agent's events arrive and keep `status` on `working`. Past `maxHeight` the
list glides up so the newest row stays in view. Set `status` to `complete` and the log folds
behind the trigger's `summary`, which opens it again.

## Parts

- `AgentActivityTrigger` shows `label` while working and `summary` once complete.
- `AgentActivityContent` holds the rows:
  - `AgentActivityStep` with a `pending`, `active` or `done` status;
  - `AgentActivityText` for the agent's own narration;
  - `AgentActivitySearch` with `AgentActivityResult` links inside;
  - `AgentActivityTool` for a read, edit or run, with lines added and removed.

`formatDuration(seconds)` writes "45s" or "2m 5s" for the summary.

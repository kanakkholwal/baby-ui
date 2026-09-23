---
title: Thinking State
description: "Collapsible agent trace that works, settles, and stays expandable, in four row shapes."
component: thinking-state
category: agents
tags: [thinking, trace, reasoning, agent, search, tool-calls]
---

`thinking` is a real, controlled signal, the same contract as Reasoning's own prop: the
header shimmers and the trace auto-expands while it's true, and settles to a plain "done"
label once it's false. This component holds no internal timer simulating progress; the
reader's manual expand/collapse choice still sticks either way.

## Four row shapes, one shell

- `steps`: a checkmark per row, or a spinner for whichever row has `status: "active"`.
- `reasoning`: plain prose, no icon, no chip.
- `search`: a query line, then linked results with a coloured source dot.
- `coding`: selectable tool-call rows (`aria-pressed`), the last one carrying a diff count.

`rows`, `activeLabel` and `doneLabel` are required: the trace's actual content is domain
data, not something this component should invent a fictional default for.

## Motion

Rows render immediately and fade up staggered by 80ms on mount; the connecting rail's
height animates to match the expanded content. The header label reuses the shared
`.reasoning-shimmer` class while `thinking`. Reduced motion drops the shimmer and the row
entrance travel; state changes still happen instantly.

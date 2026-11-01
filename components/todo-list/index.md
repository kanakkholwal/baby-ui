---
title: Todo List
description: "An agent's to-do list: rings that fill as each task runs, a strike that draws when it completes, and a count that folds the list away once all are done."
component: todo-list
category: agents
tags: [todo, tasks, agent, progress]
---

Pass the agent's tasks as `items` and update their `status` as it works. An in-progress task
fills its ring to `progress`; without one, a short arc turns. When the last task completes,
the header icon becomes a tick and the list folds, unless `collapseOnComplete` is off.

## Parts

- `TodoListTrigger` is the header: icon, `title`, a rolling "2/5" and the chevron.
- `TodoListContent` is the list; it scrolls past `maxHeight` and follows new tasks.

Use [Task Steps](/components/agents/task-steps) when steps need details or retry.

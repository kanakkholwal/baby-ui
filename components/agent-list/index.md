---
title: Agent List
description: "Background agents as rows with status, branch and diff counts; a row opens to its steps and any decision it waits on."
component: agent-list
category: agents
tags: [agents, background, tasks, runs]
---

Every agent you have running in the background, one row each. A row shows its status, task,
branch and the lines it changed; opening it shows the steps so far and, when the agent is
stuck, the question it needs answered.

```tsx
<AgentList value={open} onValueChange={setOpen}>
  <AgentListHeader>
    <AgentListTitle>Background agents</AgentListTitle>
    <AgentListCount value={running} />
  </AgentListHeader>
  <AgentListRows>
    <AgentListItem value="invoices" status="needs-input">
      <AgentListTrigger>
        <AgentListStatus />
        <AgentListHeading>
          <AgentListName>Move invoices to the v2 API</AgentListName>
          <AgentListMeta>feat/invoices-v2 · 12m</AgentListMeta>
        </AgentListHeading>
        <AgentListDiff added={142} removed={37} />
      </AgentListTrigger>
      <AgentListContent>
        <AgentListSteps>
          <AgentListStep status="done">Swapped 9 calls to the v2 client</AgentListStep>
        </AgentListSteps>
        <AgentListDecision prompt="Remove legacy_total from the export?" open={waiting}>
          <AgentListActions>...</AgentListActions>
        </AgentListDecision>
      </AgentListContent>
    </AgentListItem>
  </AgentListRows>
  <AgentListFooter>{/* a Composer that queues the next task */}</AgentListFooter>
</AgentList>
```

Everything is controlled: status, steps, diff counts and the decision come from your agent
runtime. After an answer, set the decision's `open` to false so it folds, then move the agent
back to `running`.

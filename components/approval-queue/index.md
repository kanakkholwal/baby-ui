---
title: Approval Queue
description: "Requests an agent is waiting on, one open for review and the rest as one-line rows that fold away once decided."
component: approval-queue
category: agents
tags: [approval, queue, agents, hitl]
---

Every sign-off an agent is blocked on, in one place. One request is open as an
`ApprovalGate`; the others wait as one-line rows with their tool and risk.

```tsx
<ApprovalQueue value={open} onValueChange={setOpen}>
  <ApprovalQueueHeader>
    <ApprovalQueueIcon />
    <ApprovalQueueTitle>Waiting for approval</ApprovalQueueTitle>
    <ApprovalQueueCount value={waiting} />
  </ApprovalQueueHeader>
  <ApprovalQueueList>
    {items.map((item) => (
      <ApprovalQueueItem key={item.id} value={item.id} dismissed={item.dismissed}>
        <ApprovalQueueTrigger>
          <ApprovalQueueKind kind="terminal" />
          <ApprovalQueueLabel>{item.request.title}</ApprovalQueueLabel>
        </ApprovalQueueTrigger>
        <ApprovalQueueContent>
          <ApprovalGate request={item.request} status={item.status} now={now} variant="plain">
            ...
          </ApprovalGate>
        </ApprovalQueueContent>
      </ApprovalQueueItem>
    ))}
    <ApprovalQueueEmpty open={items.every((item) => item.dismissed)} />
  </ApprovalQueueList>
</ApprovalQueue>
```

The queue is controlled. After a decision, let the gate show its receipt, then set the item's
`dismissed` and move `value` to the next request. Dismissed items fold away instead of
vanishing, so keep them in the list until the fold ends.

For a single request inside an agent transcript, give the `Tool` call `status="approval"` and
put the `ApprovalGate` in its `ToolContent`.

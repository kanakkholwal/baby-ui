---
title: Approval Gate
description: "Human-in-the-loop sign-off for an agent action: risk, summary, arguments, diff and a countdown, then a compact receipt."
component: approval-gate
category: agents
tags: [approval, human in the loop, hitl, confirmation, agent, tool call]
---

Needs `badge`, `button` and `file-diff`. Put it wherever an agent pauses before doing
something a person should sign off on: refunds, sending email, running a migration, deleting
data.

Built from parts. The root holds the request, its status and the countdown; the parts read
them, so you can drop the diff or the editor where an agent never offers them:

```tsx
<ApprovalGate request={request} status={status} now={now} onEditingChange={setEditing}>
  <ApprovalGateReceipt />
  <ApprovalGateBody>
    <ApprovalGateHeader />
    <ApprovalGateTitle />
    <ApprovalGateSummary />
    <ApprovalGateDiff />
    <ApprovalGateArgs />
    <ApprovalGateEditor onEdit={saveArgs} />
    <ApprovalGateActions onApprove={approve} onDeny={deny} />
  </ApprovalGateBody>
</ApprovalGate>
```

The gate is controlled. It never decides on its own: `onApprove`, `onDeny`, `onEdit` and
`onEditingChange` tell you what the reviewer asked for, and you set `status` once your
backend has acted. Pass `busy` while that request is in flight.

`now` drives the countdown to `expiresAt`, so the component has no clock of its own. Tick it
from a timer, or from your server's time if the deadline is enforced there. At zero, approval
is disabled and `onExpire` fires once.

`risk: "high"` adds a confirm step before `onApprove`. Editing validates the arguments as a
JSON object before `onEdit` fires, and names the line that failed. Once decided, the body
folds into a one-line receipt; pass `note` to say who decided and when.

## Migrating

`<ApprovalGate request={...} onApprove={...} />` used to render every region itself. Keep the
root's request, status, clock, `busy`, `note`, args, `onEditingChange`, `onExpire` and labels
props and compose the parts above: `onApprove` and `onDeny` move to `ApprovalGateActions`,
`onEdit` to `ApprovalGateEditor`, and `headingLevel` to `ApprovalGateTitle`. The summary is its
own part now, `ApprovalGateSummary`, so a row that already shows the title can skip it.

Approval Gate also sits inside a `Tool` with `status="approval"`, and inside `ApprovalQueue`
for several requests at once. `ApprovalGateActions` takes `onAlwaysAllow` to offer "Always
allow" on low and medium risk. The summary is its
own part now, `ApprovalGateSummary`, so a row that already shows the title can skip it.

Approval Gate also sits inside a `Tool` with `status="approval"`, and inside `ApprovalQueue`
for several requests at once. `ApprovalGateActions` takes `onAlwaysAllow` to offer "Always
allow" on low and medium risk.

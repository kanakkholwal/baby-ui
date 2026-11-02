---
title: Plan Runner
description: "An agent's plan, run step by step, with segmented progress, tool badges, timers, streaming output, steering and Stop."
component: plan-runner
category: agents
tags: [agents, plan, steps, progress]
---

Shows an agent working through its plan. The bar has a segment per step, each step names its
tool and time, and the running step streams its output. A person can steer the next step or
stop the run.

```tsx
<PlanRunner>
  <PlanRunnerHeader>
    <PlanRunnerTitle>Fix tax rounding at checkout</PlanRunnerTitle>
    <PlanRunnerMeta>Step 3 of 5 · 1:24</PlanRunnerMeta>
  </PlanRunnerHeader>
  <PlanRunnerBody>
    <PlanRunnerProgress segments={segments} />
    <PlanRunnerSteps>
      <PlanRunnerStep status="running">
        <PlanRunnerStepHead>
          <PlanRunnerTool kind="edit" />
          <PlanRunnerStepTitle>Round tax per line</PlanRunnerStepTitle>
          <PlanRunnerTimer seconds={12} />
        </PlanRunnerStepHead>
        <PlanRunnerOutput>{log}</PlanRunnerOutput>
      </PlanRunnerStep>
    </PlanRunnerSteps>
    <PlanRunnerSteer>{/* a Composer */}</PlanRunnerSteer>
  </PlanRunnerBody>
  <PlanRunnerFooter>
    <PlanRunnerSummary>2 of 5 steps · 9 tool calls</PlanRunnerSummary>
    <PlanRunnerStop onClick={stop} />
  </PlanRunnerFooter>
</PlanRunner>
```

Nothing runs on its own: statuses, timers and output come from your agent. Fold finished
output with `open={false}` so the plan stays short.

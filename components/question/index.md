---
title: Question
description: "Clarifying questions an agent asks, one at a time with radio, checkbox or free-text answers, then folded to a one-line result."
component: question
category: agents
tags: [question, prompt, form, agent]
---

`questions` is an array: one question is just an array of one, several are stepped through
in order with progress dots and a sliding entrance. Built entirely on this registry's own
primitives, real `RadioGroup`/`Checkbox`/`Input`, so keyboard navigation and screen-reader
semantics come from those, not reimplemented here.

## A single-select question moves on by itself

Picking an answer on a non-`multiple` question auto-advances after a beat, the same feel
as a real form. `multiple` questions and any question with `autoAdvance: false` wait for the
explicit next/submit control instead, since there's no way to know when someone's done
checking boxes.

## Controlled or uncontrolled, like the rest of this registry

`answers` and `step` both work either way: pass them with `onAnswersChange`/`onStepChange`
for a fully controlled flow, or `defaultAnswers`/`defaultStep` and let the component hold
its own state.

## Parts and status

`QuestionHeader` shows the icon, the current title and `2/3`; `QuestionContent` the options;
`QuestionFooter` back, a dot per question and next or submit. Set `status` from your request:
`submitting` locks the card with a spinner, `answered` folds it so only the title and
`QuestionResult` stay.

## Migrating

Before parts, `Question` drew everything and took `layout` and `submitLabel`. Put the four
parts inside it, use `variant` (`muted`, `outline`, `plain`) instead of `layout`, and pass
`submitLabel` to `QuestionFooter`.

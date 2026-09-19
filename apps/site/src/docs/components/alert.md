---
title: Alert
description: Inline message with a semantic variant, an icon and optional dismissal.
component: alert
category: base
tags: [alert, callout, notice]
---

The variant picks more than a colour. `warning` and `destructive` render with
`role="alert"`, which interrupts a screen reader immediately. `info` and `success` use
`role="status"`, which waits for a pause.

That mapping is the reason to pick a variant honestly. Marking a routine confirmation as
`destructive` because red looked better will cut across whatever the user was reading.

## Dismissal is immediate

There is no exit animation. The user has read it and asked for it to go; holding the
layout open for another 200ms to play a fade serves the interface, not the person.

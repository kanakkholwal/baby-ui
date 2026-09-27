---
title: Time Picker
description: Hour and minute segments, with AM/PM on a 12-hour clock, stepped or typed.
component: time-picker
category: base
tags: [time picker, time input, clock, booking, form]
---

Each segment is a spinbutton: arrow keys step it, digits type it, and a complete segment
moves focus to the next. The value is a 24-hour `"HH:mm"` string in both ports, the same one
`<input type="time">` uses, so it drops straight into forms and APIs.

## Clock

`hourCycle` defaults to the locale's own clock: 12-hour for `en-US`, 24-hour for `en-GB`.
The AM/PM label comes from `Intl`, so it reads correctly in every language.

## Step

`step` sets the minutes an arrow press moves and snaps to that grid; typed minutes are kept
as typed.

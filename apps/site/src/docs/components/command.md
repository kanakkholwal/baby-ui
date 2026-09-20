---
title: Command Palette
description: Filtering command list in a modal dialog, driven entirely from the keyboard.
component: command
category: base
tags: [command]
---

No open or close animation, on purpose. A palette is opened dozens of times a day, and at
that frequency any animation is pure latency. Raycast does not animate its window either,
and that is the right call.

## Focus never leaves the input

`aria-activedescendant` points at the highlighted row while focus stays in the text field,
so typing and arrowing do not fight each other. The highlight resets to the first result
on every keystroke, because keeping the old index means Enter runs whatever happens to be
in that position now.

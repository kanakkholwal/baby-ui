---
title: Text Flip
description: A fixed label with a word stack that flips to the next word on an interval.
component: text-flip
category: text
tags: [text, flip, cycle, loop]
---

`words` is a required prop -- there's no baked-in word list. The first word is
duplicated internally at the end of the stack so the loop reads as continuous, then
snaps invisibly back to the real first word once the transition settles.

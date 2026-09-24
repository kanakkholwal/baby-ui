---
title: Text Flip
description: A fixed label with a word stack that flips to the next word on an interval.
component: text-flip
category: text
tags: [text, flip, cycle, loop]
---

`words` is required; there is no baked-in list. Drive the word with `index`/`onIndexChange`,
or leave it uncontrolled and it flips every `intervalMs`. The stack moves one line per
word and wraps through a copy of the first word, so the loop never slides backwards.

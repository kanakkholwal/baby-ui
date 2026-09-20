---
title: Slider
description: Range input with a filled track and a thumb that grows on interaction.
component: slider
category: base
tags: [slider, range, form]
---

A real `<input type="range">` sits on top at full size and zero opacity. Every key the
platform gives you -- arrows, Page Up and Page Down, Home and End -- works without being
reimplemented, and so does touch.

## What animates and what must not

The thumb scales on hover and while dragging, over 140ms. The *fill* has no transition
at all. A filled track that eases toward the pointer lags behind your thumb, and the
control immediately feels broken. Decoration can ease; the thing tracking your finger
cannot.

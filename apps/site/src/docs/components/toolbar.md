---
title: Toolbar
description: Grouped controls with roving focus, so the whole bar is one tab stop.
component: toolbar
category: base
tags: [toolbar]
---

`role="toolbar"` is a promise that arrow keys move between the controls, and most
implementations do not keep it. This one does: mark each control `data-toolbar-item` and
the toolbar manages `tabindex` for you.

Without roving focus, a twelve-button formatting bar puts twelve tab stops between the
user and the content they are trying to edit.

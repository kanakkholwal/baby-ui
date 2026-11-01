---
title: Inline Edit
description: "Text that edits in place: click to put the caret where you clicked, Enter or blur saves, Escape cancels, and a failed save rolls back."
component: inline-edit
category: advanced
tags: [inline, edit, rename, form]
---

Return the request's promise from `onSave`: the text shows saving, then a tick, or rolls back
with an Edit again link if the promise rejects. `validate` keeps the field open with a message.

## Parts

- `InlineEdit` holds the value, the draft and the save state.
- `InlineEditArea` is the line: `InlineEditPreview` (the text, `as` a heading if it is one),
  `InlineEditInput` in its place while editing, and `InlineEditStatus` beside them.
- `InlineEditMessage` shows the validation error, or the rollback notice and its retry.

## States

- **Preview:** rest, hover and keyboard focus; dimmed with a progress cursor while saving.
- **Input:** the field wraps and grows like the text it replaced, so nothing jumps on open.
- **Invalid:** Enter keeps the field open with the message. Clicking away from an empty or
  unchanged draft closes it quietly; a changed one stays open so nothing typed is lost.
- **Saving, saved, failed:** a spinner, then a tick that draws and fades, or the old text
  back with Edit again, which reopens the rejected draft.

## Migrating

Before parts, `InlineEdit` rendered everything itself and took `as`. Put the parts above inside
the root and move `as` onto `InlineEditPreview`.

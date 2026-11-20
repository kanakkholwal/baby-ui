---
title: Multi Select
description: Pick several options from a searchable list; choices show as removable chips.
component: multi-select
category: base
tags: [multi select, chips, combobox, select many]
---

Built from the same Popover and Command as Combobox, so the search, keyboard and positioning
behave the same. Chips past `maxChips` collapse into a +N count. Backspace on the field, or in
an empty search, removes the last choice.

## State you can drive

`value` takes the selection and `open` the list; leave either out (React) and the field owns it,
with `defaultValue` and `defaultOpen` for the start. Svelte binds both. `name` writes one hidden
input per chosen value, so the field submits inside a native form.

## Limits and loading

- `max` caps the choices. Once reached, unchosen options turn off and a note says so, and select
  all is hidden because it cannot honour the cap.
- `loading` marks the field busy and shows a status line in the list while options arrive.
- `onCreate` offers "Create" for search text that no option matches. It only calls your handler:
  add the option and select it there, since the component does not own `options`.
- `clearable` adds a button in the field that clears every chip.

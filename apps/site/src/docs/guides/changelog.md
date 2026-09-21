---
title: Changelog
description: What changed, newest first.
---

## Unreleased

**Registry**

- `tokens` and `theme` items on every route. Every component depends on `tokens` and
  ships its own keyframes and helper classes in its `css`.
- JS routes for every component and usage snippet.
- Markdown for every page at `/components/{category}/{slug}.md` and `/docs/{slug}.md`.

**Components**

- `Accordion` is `type` / `collapsible` with `Item`, `Trigger` and `Content`.
- `Select`, `DropdownMenu` and `Combobox` unfold from the trigger edge; rows stagger in.
- Every overlay animates out as well as in; anchored surfaces grow from the edge nearest
  their trigger.
- `Checkbox` and `Radio` fill with the primary colour when checked.
- Light-mode `--success`, `--warning` and `--destructive` pass 4.5:1 as text; form-field
  focus rings pass 3:1.

**Earlier**

- Base components adopted shadcn's composition and part names; `Modal` became `Dialog`.
- One size scale, `sm` to `xl`, across every sized component.
- `Combobox` closes on selection; `ReorderList` reorders by pointer or keyboard;
  `ColorPicker` gained a saturation square, hue strip and channel sliders; `Toast` gained
  variants, positions and actions.

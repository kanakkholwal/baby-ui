---
title: Changelog
description: What changed in the registry, newest first.
---

## Unreleased

**Base components now drop into a shadcn project.** `shadcn add` overwrites
`components/ui/<slug>.tsx`, so a component of ours that shared a slug but not an API
used to break every call site that installed it. Eighteen components moved to shadcn's
composition, with its part names and `data-slot` values.

- `Card` is now `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`,
  `CardContent`, `CardFooter`
- `Tabs`, `Select`, `Accordion`, `RadioGroup`, `ToggleGroup`, `Breadcrumb`, `Pagination`,
  `Command`, `DropdownMenu`, `ContextMenu`, `Popover`, `Tooltip`, `HoverCard`,
  `Collapsible`, `Sheet`, `AlertDialog`, `Alert` and `Avatar` all compose from parts
- `Modal` is now **`Dialog`**, so the slug collides with shadcn's the way it should
- `Textarea`, `Checkbox` and `Switch` render the bare control as their root; the wrapper
  only appears when you pass a `label`

**A four-step size scale.** `sm`, `md`, `lg`, `xl` across button, badge, input, textarea,
toggle, toggle-group, progress, shortcut, spinner, switch, checkbox, radio, tabs, avatar
and dialog. Avatar's old `xs` is gone; the scale is the same everywhere now.

**Fixes.**

- `Combobox` closes on selection, and the field reads as the selection when closed
- `ReorderList` reordering is pointer-driven with a shared FLIP helper, and the keyboard
  path is Space to grab, arrows to move, Escape to restore
- `ColorPicker` is a real picker: saturation square, hue strip, hex field and HSV/HSL/RGB
  channel sliders
- `ShowMore` clamps to a line count instead of a pixel height, and animates
- `Toast` gained soft, solid and outline variants, six positions, per-toast actions and
  an opt-in `duration`
- `Command` no longer has an irregular scrollbar

**Usage snippets.** Every component page has a Usage tab with a copy-paste example in
React and Svelte, TypeScript and JavaScript. They are real files that the type checker
compiles, so an example cannot drift from the component it documents.

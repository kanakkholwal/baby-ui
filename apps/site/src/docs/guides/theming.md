---
title: Theming
description: The token layer, dark mode, and how to recolour every component at once.
---

Everything is driven by CSS variables on `:root`, with a `.dark` block that redefines
the handful that change. Components never reference a colour directly.

## Changing the primary colour

`--primary` and `--primary-foreground` are the pair almost everything reads: buttons,
switches, checkboxes, radio dots, tab indicators, progress bars.

```css
:root {
	--primary: oklch(58% 0.22 295);
	--primary-foreground: oklch(99% 0 0);
}
```

The settings panel in the header writes exactly these two variables, which is why every
component on the page recolours at once. It stores the choice in `sessionStorage`, so it
lasts the tab and not longer.

## Dark mode

Add `.dark` to `<html>` and set `color-scheme`. The second matters: without it the
browser keeps painting form controls, scrollbars and the caret for a light page.

```js
document.documentElement.classList.toggle("dark", dark);
document.documentElement.style.colorScheme = dark ? "dark" : "light";
```

## Motion tokens

Durations and easings are variables too, and reduced motion redefines them rather than
switching animations off. `prefers-reduced-motion` means gentler, not none: travel is
removed while opacity and colour changes stay, because losing those loses the feedback
as well as the movement.

## Accent is not a surface

One trap worth naming: in this palette `--accent` is a brand colour, not a neutral hover
surface. Hover states use `bg-foreground/[0.06]`. Reaching for `bg-accent` out of habit
turns twelve hover states teal.

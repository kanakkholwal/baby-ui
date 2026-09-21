---
title: Theming
description: One set of CSS variables drives every component.
---

Colours, radii and motion are CSS variables on `:root`, with a `.dark` block for the ones
that change. Components never name a colour, so they follow whatever theme the page has:
your shadcn variables by default, or ours once you add the `theme` registry item.

## Primary colour

Set the pair almost everything reads.

```css
:root {
	--primary: oklch(58% 0.22 295);
	--primary-foreground: oklch(99% 0 0);
}
```

The header's settings panel writes exactly these two variables, which is why every
component on this site recolours at once.

## Dark mode

Add `.dark` to `<html>` and set `color-scheme`, or form controls and scrollbars keep
painting for a light page.

```js
document.documentElement.classList.toggle("dark", dark);
document.documentElement.style.colorScheme = dark ? "dark" : "light";
```

## Motion

Durations and easings are variables too. `prefers-reduced-motion` shortens them and
removes travel; fades stay, because they carry the state change.

```css
--duration-press: 140ms;
--duration-dropdown: 200ms;
--duration-overlay: 280ms;
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
```

## Hover surfaces

`--accent` is a brand colour here, not a neutral. Hover states use `bg-foreground/[0.06]`.

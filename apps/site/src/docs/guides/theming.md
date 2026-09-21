---
title: Theming
description: CSS variables on :root, redefined under .dark. Components never name a colour.
---

Components read shadcn's variable names, so they follow your theme. Add the `theme`
registry item, or paste the base layer from [Installation](/docs/installation), to use
this site's look instead.

## Primary colour

```css
:root {
	--primary: oklch(58% 0.22 295);
	--primary-foreground: oklch(99% 0 0);
}
```

`--ring` derives from `--primary`, so focus follows the brand colour. The header's
palette control writes exactly this pair.

## Extra names

Beyond shadcn's set, components use `--success`, `--warning`, `--border-strong`, `--neon`
and `--violet`. `tokens` defines them; override them the same way.

## Dark mode

Add `dark` to `<html>` and set `color-scheme`:

```js
document.documentElement.classList.toggle("dark", dark);
document.documentElement.style.colorScheme = dark ? "dark" : "light";
```

## Motion

Durations and easings are variables too. Reduced motion shortens them and removes travel;
fades stay.

```css
--duration-press: 140ms;
--duration-dropdown: 200ms;
--duration-overlay: 280ms;
--duration-exit: 120ms;
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
```

## Hover surfaces

`--accent` is a brand colour here, not a neutral. Hover states use `bg-foreground/[0.06]`.

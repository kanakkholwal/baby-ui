---
title: Theming
description: CSS variables on :root, redefined under .dark. Components never name a colour.
---

Components read shadcn's variable names, so they follow your theme. To use this site's look,
see [Installation](/docs/installation#use-this-sites-look).

## Primary colour

```css
:root {
	--primary: oklch(58% 0.22 295);
	--primary-foreground: oklch(99% 0 0);
}
```

With the `theme` item, `--ring` derives from `--primary`, so focus rings follow it. The theme
swatches in this site's Settings panel write exactly this pair.

## Extra variables

Beyond shadcn's set: `--success`, `--warning`, `--info`, `--border-strong`, `--neon` and
`--violet`. `tokens` defines them; override them the same way.

## Dark mode

The `dark` class on `<html>`, as in shadcn, so `next-themes` and `mode-watcher` work
unchanged. Set `color-scheme` too, or native form controls stay light.

```js
document.documentElement.classList.toggle("dark", dark);
document.documentElement.style.colorScheme = dark ? "dark" : "light";
```

## Motion

Durations and easings are variables. Reduced motion shortens them and removes travel; fades
stay.

```css
--duration-press: 140ms;
--duration-dropdown: 200ms;
--duration-overlay: 280ms;
--duration-exit: 120ms;
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
```

## Hover surfaces

`--accent` is a brand colour here, not a neutral, so hover states use
`bg-foreground/[0.06]`.

---
title: Theming
description: CSS variables on :root, redefined under .dark. Components never name a colour.
---

Components read shadcn's variable names, so your existing theme already drives them.

## Use this site's look

The `theme` item brings this site's palette, radius and type stack:

```bash
# tab: React
# pm: dlx shadcn@latest add https://baby-ui.pages.dev/r/theme.json
```

```bash
# tab: Svelte
# pm: dlx shadcn-svelte@latest add https://baby-ui.pages.dev/svelte/r/theme.json
```

Or paste it over what `init` wrote, after `@import "tailwindcss"`:

```css
/* baby-ui:theme */
```

## Colours

```css
:root {
	--primary: oklch(58% 0.22 295);
	--primary-foreground: oklch(99% 0 0);
}
```

- With `theme`, `--ring` derives from `--primary`, so focus rings follow it. The swatches in
  this site's Settings panel write exactly this pair.
- Beyond shadcn's set, `tokens` adds `--success`, `--warning`, `--info`, `--border-strong`,
  `--neon` and `--violet`. Override them the same way.
- `--accent` is a brand colour here, not a neutral, so hovers use `bg-foreground/[0.06]`.

## Dark mode

The `dark` class on `<html>`, as in shadcn, so `next-themes` and `mode-watcher` work unchanged.
Set `color-scheme` too, or native form controls stay light.

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

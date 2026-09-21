---
title: Installation
description: From an empty folder to a rendered component, in React or Svelte.
---

Baby UI is a shadcn registry: the CLI copies source into your project, and you own it.
New to shadcn? Follow every step. Already on shadcn/ui or shadcn-svelte? Skip to
[Add a component](#add-a-component). Framework tabs follow the header; package manager
tabs remember your choice.

## 1. Create a project

```bash
# tab: Next.js
# pm: dlx create-next-app@latest my-app --typescript --tailwind --eslint --app
```

```bash
# tab: Vite
# pm: create vite@latest my-app --template react-ts
```

```bash
# tab: SvelteKit
# pm: dlx sv@latest create my-app
```

Pick TypeScript when asked. JavaScript works too; choose it in the header and every
command switches to the JS route.

## 2. Install Tailwind CSS v4

Next.js and `sv create` (Tailwind add-on) already did this. For Vite:

```bash
# tab: Install
# pm: add tailwindcss @tailwindcss/vite
```

```ts
// tab: vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
});
```

```css
// tab: app.css
@import "tailwindcss";
```

## 3. Initialise shadcn

Writes `components.json` (where `ui`, `lib` and your global CSS live) and the base theme
variables.

```bash
# tab: React
# pm: dlx shadcn@latest init
```

```bash
# tab: Svelte
# pm: dlx shadcn-svelte@latest init
```

Accept the defaults; Baby UI reads the same variable names whatever you pick.

## 4. Add a component

Point the CLI at a component's JSON. Button, for example:

```bash
# tab: React
# pm: dlx shadcn@latest add https://baby-ui.pages.dev/r/button.json
```

```bash
# tab: Svelte
# pm: dlx shadcn-svelte@latest add https://baby-ui.pages.dev/svelte/r/button.json
```

The CLI then:

- copies the files into your `ui` folder, plus `lib/cn.ts` if missing,
- installs the component's npm dependencies,
- writes the component's own CSS, and `tokens` (motion variables) the first time.

Your `--background`, `--primary` and the rest are never touched. Each component page fills
this command in for the framework and language chosen in the header; its Manual tab lists
the files for copying by hand.

## 5. Use it

```tsx
// tab: React
import { Button } from "@/components/ui/button";

export default function Page() {
	return <Button>Deploy</Button>;
}
```

```svelte
// tab: Svelte
<script lang="ts">
	import { Button } from "$lib/components/ui/button";
</script>

<Button>Deploy</Button>
```

## 6. Dark mode

The `dark` class on `<html>`, as in shadcn, so `next-themes` and `mode-watcher` work
unchanged. Set `color-scheme` too, or form controls stay light.

```js
document.documentElement.classList.toggle("dark", dark);
document.documentElement.style.colorScheme = dark ? "dark" : "light";
```

## Adopting the Baby UI look

Components follow your theme by default. For this site's palette, radius and type stack,
add `theme`:

```bash
# tab: React
# pm: dlx shadcn@latest add https://baby-ui.pages.dev/r/theme.json
```

```bash
# tab: Svelte
# pm: dlx shadcn-svelte@latest add https://baby-ui.pages.dev/svelte/r/theme.json
```

Or paste the base layer below over what `init` wrote after `@import "tailwindcss"`: dark
variant, theme mapping, palette and motion variables. Add your own variables there.

```css
/* baby-ui:theme */
```

## Routes

| | TypeScript | JavaScript |
| --- | --- | --- |
| React | `/r/{slug}.json` | `/r/js/{slug}.json` |
| Svelte | `/svelte/r/{slug}.json` | `/svelte/r/js/{slug}.json` |

`tokens.json`, `theme.json` and the `registry.json` index live on every route.

## If something looks wrong

- **Grey, unstyled controls**: add `tokens.json` with the same `add` command.
- **`@/lib/utils` or `$lib/cn` not found**: aliases come from `components.json`; run `init`.
- **Nothing animates**: the OS reduced-motion setting keeps fades and drops travel.

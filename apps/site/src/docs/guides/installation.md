---
title: Installation
description: From an empty folder to a rendered component, in React or Svelte.
---

Already on shadcn/ui or shadcn-svelte? Skip to [Add a component](#3-add-a-component).

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

Next.js and `sv create` (Tailwind add-on) set up Tailwind CSS v4. For Vite, add it:

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

## 2. Initialise shadcn

Writes `components.json` and the base theme variables. The defaults are fine.

```bash
# tab: React
# pm: dlx shadcn@latest init
```

```bash
# tab: Svelte
# pm: dlx shadcn-svelte@latest init
```

## 3. Add a component

```bash
# tab: React
# pm: dlx shadcn@latest add https://baby-ui.pages.dev/r/button.json
```

```bash
# tab: Svelte
# pm: dlx shadcn-svelte@latest add https://baby-ui.pages.dev/svelte/r/button.json
```

This copies the files into your `ui` folder, installs npm dependencies, and writes the
component's CSS plus `tokens` (motion variables) the first time. Your colour variables are
never touched. Every component page has this command ready, and a Manual tab for copying by
hand.

### Optional: registry namespace

React only (`shadcn-svelte` doesn't support it yet). Add to `components.json`:

```json
{
	"registries": {
		"@baby-ui": "https://baby-ui.pages.dev/r/{name}.json"
	}
}
```

Then: `npx shadcn@latest add @baby-ui/button`.

## 4. Use it

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

## Use this site's look

Components follow your theme. For this site's palette, radius and type stack, add `theme`:

```bash
# tab: React
# pm: dlx shadcn@latest add https://baby-ui.pages.dev/r/theme.json
```

```bash
# tab: Svelte
# pm: dlx shadcn-svelte@latest add https://baby-ui.pages.dev/svelte/r/theme.json
```

Or paste this over what `init` wrote, after `@import "tailwindcss"`:

```css
/* baby-ui:theme */
```

## Routes

| | TypeScript | JavaScript |
| --- | --- | --- |
| React | `/r/{slug}.json` | `/r/js/{slug}.json` |
| Svelte | `/svelte/r/{slug}.json` | `/svelte/r/js/{slug}.json` |

`tokens.json`, `theme.json` and the `registry.json` index are on every route.

## Troubleshooting

- **Grey, unstyled controls**: add `tokens.json` with the same `add` command.
- **`@/lib/utils` or `$lib/cn` not found**: run `init`; aliases come from `components.json`.
- **Nothing animates**: your OS has reduced motion on, which keeps fades and drops travel.

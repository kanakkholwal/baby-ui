---
title: Installation
description: From an empty folder to a rendered component, in React or Svelte, with the shadcn CLI and Tailwind CSS v4.
---

Already on shadcn/ui or shadcn-svelte? Skip to [Add a component](#4-add-a-component).

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

Next.js and `sv create` (pick the Tailwind add-on) set up Tailwind CSS v4 and the import
alias for you. Vite needs both, next.

## 2. Vite only: Tailwind and the `@` alias

```bash
# tab: Tailwind
# pm: add tailwindcss @tailwindcss/vite
```

```bash
# tab: Node types
# pm: add -D @types/node
```

```ts
// tab: vite.config.ts
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
```

```json
// tab: tsconfig.json
{
	"compilerOptions": {
		"paths": { "@/*": ["./src/*"] }
	}
}
```

```css
// tab: src/index.css
@import "tailwindcss";
```

Add the same `paths` to `tsconfig.app.json`. Leave out `baseUrl`: TypeScript 6 rejects it.
Without the alias, `shadcn init` stops with "Could not find valid path aliases".

## 3. Initialise shadcn

Writes `components.json` and the base colour variables.

```bash
# tab: React
# pm: dlx shadcn@latest init
```

```bash
# tab: Svelte
# pm: dlx shadcn-svelte@latest init
```

Any style, preset and base colour works; Baby UI reads the same variable names.

## 4. Add a component

```bash
# tab: React
# pm: dlx shadcn@latest add https://baby-ui.pages.dev/r/button.json
```

```bash
# tab: Svelte
# pm: dlx shadcn-svelte@latest add https://baby-ui.pages.dev/svelte/r/button.json
```

Each component lands in its own folder with an `index` file, for example
`components/ui/button/`, plus `lib/cn.ts`. The CLI installs npm packages (and their
`@types` where needed), the component's CSS, and `tokens` (motion variables) the first time.
Your colour variables are never touched. Every component page has this command ready, and a
Manual tab for copying by hand.

If `init` created shadcn's own `components/ui/button.tsx`, delete it: it would shadow
`components/ui/button/`, so `@/components/ui/button` would import the wrong Button.

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

- **`init` fails with "Could not find valid path aliases"**: add the `@` alias (step 2).
- **`@/components/ui/button` is the wrong Button**: delete shadcn's `components/ui/button.tsx`.
- **Grey, unstyled controls**: add `tokens.json` with the same `add` command.
- **Nothing animates**: your OS has reduced motion on, which keeps fades and drops travel.

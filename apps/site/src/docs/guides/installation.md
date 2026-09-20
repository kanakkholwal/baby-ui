---
title: Installation
description: Add a component to a React or Svelte project with the shadcn CLI.
---

Components are distributed through the registry, not npm. Point the CLI at a component's
JSON and it copies the source into your project.

```bash
npx shadcn@latest add https://baby-ui.pages.dev/r/button.json
npx shadcn-svelte@latest add https://baby-ui.pages.dev/svelte/r/button.json
```

Every component page has an Install tab with the exact command, the dependencies it
needs and the files it writes, so nothing arrives unannounced.

## Prerequisites

Tailwind v4 and a shadcn-style `components.json`. If you already run shadcn/ui or
shadcn-svelte, you have both, and base components will land on top of what is there
without breaking call sites.

## The token layer

Components read CSS variables rather than hard-coded colours. Add the token layer once:

```css
@import "@baby-ui/tokens/theme.css";
```

Without it a component still renders, but it falls back to whatever `--primary`,
`--border` and the rest already mean in your project. That is usually what you want when
dropping one component into an existing design system, and not what you want when
adopting the set.

## Manual install

The Install tab's Manual view lists every file and its destination path. Copying by hand
is a supported route, not a fallback: the registry JSON is just a description of the
same copy.

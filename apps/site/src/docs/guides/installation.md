---
title: Installation
description: Add a component with the shadcn CLI, or copy the files by hand.
---

## Prerequisites

- Tailwind CSS v4.
- React: a project set up with `npx shadcn@latest init`.
- Svelte: a project set up with `npx shadcn-svelte@latest init`.

`init` writes the `components.json` the CLI reads for paths and aliases. Nothing else is
required: there is no package to install.

## Add a component

Point the CLI at the component's JSON.

```bash
npx shadcn@latest add https://baby-ui.pages.dev/r/button.json
```

```bash
npx shadcn-svelte@latest add https://baby-ui.pages.dev/svelte/r/button.json
```

The CLI copies the source files into your `ui` folder, installs the npm dependencies the
component needs, and pulls in `tokens` (below) the first time. Every component page has
an Install tab with this command filled in for the framework and language you selected in
the header.

## Tokens

Each component depends on a registry item named `tokens`, so the CLI adds it for you. It
writes into your global stylesheet:

- the motion variables (`--duration-*`, `--ease-*`, `--press-scale` and friends) and their
  reduced-motion overrides,
- the keyframes and helper classes components reference,
- colour names shadcn does not define (`--success`, `--warning`, `--border-strong`,
  `--neon`, `--violet`).

It never touches `--background`, `--primary` or any other variable your shadcn theme
already owns, so an installed component takes on your palette.

## Theme

To adopt the Baby UI look wholesale, add `theme`. It replaces the shadcn palette, radius
and type stack in both colour modes.

```bash
npx shadcn@latest add https://baby-ui.pages.dev/r/theme.json
```

```bash
npx shadcn-svelte@latest add https://baby-ui.pages.dev/svelte/r/theme.json
```

Dark mode is the `.dark` class on `<html>`, the same convention shadcn uses.

## Routes

| | TypeScript | JavaScript |
| --- | --- | --- |
| React | `/r/{slug}.json` | `/r/js/{slug}.json` |
| Svelte | `/svelte/r/{slug}.json` | `/svelte/r/js/{slug}.json` |

The JS route ships the same files with types stripped. The index for each route is at
`registry.json`, for example `https://baby-ui.pages.dev/r/registry.json`.

## Manual

The Install tab's Manual view lists the dependencies and every file with its destination
path. Copy them, then add `tokens` once with the command above.

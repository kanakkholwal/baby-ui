---
title: Getting started
description: Install components from the registry into a React or Svelte app.
---

Components are distributed through the registry, not npm. The CLI copies source into
your project, where you own it.

```bash
npx shadcn@latest add https://baby-ui.pages.dev/r/button.json
npx shadcn-svelte@latest add https://baby-ui.pages.dev/svelte/r/button.json
```

Both framework builds read the same token layer, so a component looks the same in
either one without per-port tuning.

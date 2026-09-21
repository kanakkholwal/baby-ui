---
name: baby-ui-verify
description: Run every baby-ui gate and the headless-Edge checks before reporting work as done. Use after any change to packages/ui-*, packages/demos, packages/registry-*, packages/tokens or apps/site.
---

# baby-ui verify

Report nothing as done until every step below has run and its output is in the reply.

## 1. Static gates

```bash
pnpm biome format --write apps packages scripts >/dev/null
pnpm lint
node scripts/check-comments.mjs --all
node scripts/check-import-extensions.mjs
pnpm turbo check
```

Comment gate flags a long comment: cut words, never reflow onto one line.

## 2. Build

```bash
pnpm turbo registry --force
pnpm turbo build
pnpm size
```

`@baby-ui/site#build` failing with `EBUSY ... .svelte-kit/cloudflare` means `pnpm dev` is
running in apps/site. Prerendered output in `.svelte-kit/output` is still complete; say
so in the report instead of killing the user's processes.

## 3. Runtime checks (headless Edge, no browser download)

Serve `.svelte-kit/output` with a static server, then run from the session scratchpad:

- `pw/sweep.mjs`: every component page 200, no page or console errors, no empty demo, no
  demo overflowing its frame, no horizontal page scroll.
- `pw/dials.mjs`: every rail control changes the demo DOM, or is a known interaction-only
  prop.
- `pw/observe.mjs <case>`: enter/exit timelines for overlays and anchored surfaces. Exits
  must mirror entrances; anchored surfaces must sit under their trigger in the first frame.

If those scripts are missing (new session scratchpad), recreate them from
`.notes/06-component-audit.md`, which records their contracts.

## 4. Visual check

Screenshot the touched page(s) with playwright-core (`channel: "msedge"`) and read the
image before claiming a layout is right.

## 5. Report

Lead with what changed and what was measured. List the gate outputs. Note anything skipped
and why. Nothing is committed.

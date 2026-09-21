# baby-ui rules

Standing instructions for every session in this repo. The long form with reasons is in
`.notes/07-rules.md`; `/baby-ui-verify` runs the gates.

## Never

- Never commit or push. The user commits.
- Never use `.js` extensions in relative imports (`scripts/check-import-extensions.mjs`).
- Never write custom CSS when Tailwind utilities and CSS variables can do it. Custom CSS is
  for keyframes, `::backdrop`, pseudo-element thumbs, scrollbars, and nothing else.
- Never add site-only CSS to `packages/tokens`; it goes in `apps/site/src/routes/layout.css`.
- Never use Lucide. Icons are `@tabler/icons-svelte` / `@tabler/icons-react`.
- Never use `--accent` as a hover surface. Hovers are `bg-foreground/[0.06]`.
- Never leave a comment over 2 lines or a file-header comment (`scripts/check-comments.mjs --all`).
- Never print licence credits on base component pages; non-base ported components keep theirs.

## Always

- Base components are shadcn drop-ins: shadcn part names, `data-slot` values, `type` /
  `collapsible` / `value` style props. Check the shadcn API before designing one.
- React and Svelte ports change together, same spec, same classes, same measured motion.
- Motion is CSS-only: `--duration-*`, `--ease-*`, `--enter-scale`, `--press-scale`. Exits
  mirror entrances and use `--duration-exit`. Anchored surfaces grow from the trigger edge
  (`ANCHORED`); menus, selects and comboboxes unfold (`UNFOLD`) in `lib/anchor.ts`.
- `transition-[...]` arbitrary lists must name `scale` and `translate` when they animate
  them; `transition-transform` already covers them.
- Dialogs are `<dialog>` with `DIALOG_SURFACE` (`overflow-visible`, so the lift never
  shows a scrollbar).
- Every registry item ships the CSS its own files reference (`component-css.ts`); the
  `tokens` item carries variables only. Component docs never tell users to import a
  workspace package.
- Demo controls drive exactly one instance. Hide controls (`control: { kind: "none" }`)
  that cannot show in the demo (controlled `open`, `value`, frame-bound props).
- Sidebar, category pages and palette are alphabetical.
- Docs and replies are terse; bullets under one line; no em dashes.
- Python heredocs mangle `\n`, `\s` and non-ASCII; edit files with the Edit tool or node.
  Files may be CRLF: preserve line endings, never mix.
- Verify claims with measurement (headless Edge harness in the scratchpad) before reporting.
- Never screenshot pages to judge them; the user reviews visually and sends screenshots.
  Headless runs are for numbers: timelines, boxes, contrast, console errors, control probes.
- Motion libraries: none in base components; elsewhere prefer CSS, then vaul / sonner
  (the shadcn choices) over framer-motion.

## Gates before saying done

`pnpm lint` · `node scripts/check-comments.mjs --all` · `node scripts/check-import-extensions.mjs`
· `pnpm turbo check` · `pnpm turbo registry` · `pnpm turbo build` · `pnpm size`.
Paste the outputs. If `apps/site` `pnpm dev` is running, adapter-cloudflare fails with EBUSY
on `.svelte-kit/cloudflare`; say so rather than working around it.

## Places

- Plans, audits, measurements: `.notes/` (gitignored). Clones and scratch: `.scratchpad/`.
- Port sources: beUI at `.scratchpad/ui-components`, sivir at `.scratchpad/sivir-ui`.
- Site origin `baby-ui.nexonauts.com` (Worker), registry `baby-ui.pages.dev` (Pages).

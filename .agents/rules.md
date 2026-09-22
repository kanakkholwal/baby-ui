# baby-ui agent rules

Standing instructions for every session in this repo. The long form with reasons is in
`.notes/07-rules.md`; `.agents/skills/baby-ui-verify/SKILL.md` is the verification workflow.
Any agent (Claude Code, Codex, Cursor, Copilot) should read this file first.

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
- **HARD RULE (P1):** every base component with a real interaction engine (open/closed state,
  focus management, keyboard nav, selection — not just menus) is built on
  `@base-ui-components/react` (React) / `bits-ui` (Svelte), the same primitives shadcn/ui and
  shadcn-svelte themselves use, never a hand-rolled state machine. Keep the styling layer thin:
  `data-slot`, `variants.ts` classes, and the motion contract on top (match the primitive's own
  `data-state`/`data-side`/`data-highlighted`, not just our own `data-placement`). Menus
  (ContextMenu/DropdownMenu) use `@radix-ui/react-*` specifically, since shadcn/ui still bases
  those on Radix. Does not apply to components with no interaction engine (Badge, Avatar,
  Typography, Skeleton). See `base-primitives-hard-rule` / `prefer-primitives-for-menus` memory.
- **HARD RULE (P1):** a component's `variant`/`size`-style prop types are *derived*, never
  hand-typed literal unions. One `variants.ts` per component (or shared, when two components
  genuinely share an axis, e.g. Dialog/AlertDialog/Command's inset-rim treatment):
  `export const x = tv({...}); export type XVariant = NonNullable<VariantProps<typeof
  x>["variant"]>;` (import `VariantProps` from `"tailwind-variants"`) — matches
  `button/variants.ts` and `badge/variants.ts` in both ports, and shadcn-svelte's own
  generated components. Never re-type the union inline in a demo or another component;
  import the derived type instead. Applies to **every base component, no exceptions** — a
  `Record<string, string>` or ternary class-lookup for ANY internal state axis (checked,
  open, tone, whatever) converts to `tv()` too, even when that axis isn't a public prop.
  Enforce on every new component (any category) from the start.
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

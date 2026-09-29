# Baby UI design contract

The single reference for how every base component looks and moves. Tokens live in
`packages/tokens/src` (`tokens.css`, `theme.css`, `motion.css`); class contracts live in each
component's `variants.ts`.

## API

- shadcn shape only: `variant` and `size` props, plus a component-specific axis where needed
  (`side`, `density`). No new API ideology.
- Every class contract is a `tv()` object in `variants.ts`, with one slot per part
  (`backdrop`, `popup`, `panel`, `handle`...). No UPPER_CASE class-string constants.
- Prop types derive from the tv: `NonNullable<VariantProps<typeof x>["variant"]>`.
- Shared contracts are written for both primitives at once: Base UI emits
  `data-open`/`data-closed`/`data-starting-style`, bits-ui emits `data-state=open|closed`.

## Colour

- Neutrals: `background`, `card`, `popover`, `muted`, `border`, `border-strong`, `input`.
  `muted`, `popover` and `card` are close, so nested panels separate with a border.
- Accent: Blue. `primary` is `var(--accent)`; `ring` and `accent-ink` follow the theme ink.
- Status: `success`, `warning`, `destructive`, `info`.
- Theme presets swap the accent only; neutrals never change per theme.

## Shape

- `--radius` scales `sm` to `3xl` (`-4px` to `+10px`).
- Controls: `rounded-lg`. Popovers and menus: `rounded-xl`. Dialogs and sheets: `rounded-2xl`.
  Drawers: `rounded-3xl` on the free edge. Calendar days and range cells: `rounded-full`.
- Shadows: `shadow-surface`, `shadow-overlay`, `shadow-field`, `shadow-thumb`.

## Motion

Motion is CSS-only. Exits undercut entrances; reduced motion keeps opacity and drops travel.

| Contract | Used by | In | Out | Easing |
| --- | --- | --- | --- | --- |
| `ANCHORED` (`lib/anchor.ts`) | Popover, Tooltip, HoverCard, DropdownMenu, ContextMenu, Select, Combobox, NavigationMenu, DatePicker, ColorField | opacity + scale 0.9 to 1, 4px lean from the trigger, 150ms | to scale 0.95, 100ms | `ease` |
| `dialogFrame` popup | Dialog, AlertDialog | opacity + scale 1.05 to 1, 250ms | to scale 0.95, 100ms | `--ease-out-quad` |
| `dialogFrame` backdrop | Dialog, AlertDialog, Command | opacity, 150ms | 100ms | `--ease-out` |
| `sheet` panel and backdrop | Sheet | translate from the edge, 250ms | 200ms | `--ease-drawer` |
| vaul | Drawer | vaul's drag physics, 500ms | gesture-driven | `--ease-drawer` |
| Command popup | Command | instant (opened from the keyboard) | fade, 100ms | `--ease-out` |
| Collapse | Accordion, Collapsible, FileTree | grid-template-rows, 200ms | 150ms | `--ease-out-quad` |
| Press | Button, menu rows, calendar days, switch thumb | `--press-scale*` per size, 100ms | release 250ms | `ease` |
| Indicator | Tabs, ToggleGroup | 250ms slide | 250ms | `--ease-drawer` |

Tokens:

- Durations: `--duration-dropdown` 150, `--duration-collapse` 200, `--duration-overlay` 250,
  `--duration-panel-exit` 200, `--duration-exit` 100, `--duration-drawer` 500 (vaul only).
- Scales: `--popover-enter-scale` 0.9, `--popover-exit-scale` 0.95, `--modal-enter-scale` 1.05,
  `--press-scale` 0.97 (`-sm` 0.98, `-lg` 0.96, `-icon` 0.93, `-row` 0.98).
- Anything whose content changes size animates the size (grid rows), never pops.

## Date and time

- Fields are segmented (month, day, year, hour, minute, period). Literals are muted, empty
  segments show a placeholder, the focused segment takes a soft primary tint.
- Calendars read the month from the start edge with prev/next together at the end; the grid
  fades and rises 4px when the month changes. Today is a soft primary tint, selected a fill.
- Pickers open their calendar on `ANCHORED`.

## Icons

- `@baby-ui/icons`: Solar line-duotone and linear (rounded corners), brands from Simple Icons.
- Chevrons and table-of-contents glyphs are linear, never duotone.

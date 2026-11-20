---
title: Changelog
# Hidden until it is brought up to date: drafts 404 and are left out of nav and exports.
draft: true
description: What changed, newest first.
---

## Unreleased

**Components**

- Every component is stable; nothing is alpha, beta or experimental.
- Charts on d3 and SVG: area, bar, line, pie, radar, sankey, sunburst and more, with shared
  axes, brush, markers and a live line.
- New blocks: `ShowcaseGrid`, `HeroStage`, `UsageCard`, `OverviewCard`, `StatCard`.
- New: `DocsNav`, the sidebar this site uses, with a tick or curve connector.
- `Tool` and `TaskSteps` take `labels` for every visible string; `Tool` can be controlled.
- Collapsible content is `inert` when closed, and opens over 200ms, closes over 120ms.

**Look**

- Surfaces separate by a colour step and spacing, with no forced 1px rings or borders for depth:
  popovers, menus, tabs, cards, code frames and dialogs. Tooltips follow the mode.
- `Card` and `Table` are borderless by default and take `bordered`.
- One control height ladder (24, 32, 36, 40, 48px), so inputs, buttons and selects line up.
  Select-like triggers are a soft fill.
- `Switch`, `Checkbox` and `Radio` share one size scale and one 200ms motion.
- `ScrollArea` gains `gutter`, `orientation`, `fade` and `scrollbar` modes.
- `MultiSelect` takes `defaultValue`, `open`, `name`, `clearable`, `max`, `loading` and `onCreate`.
- Emails take `createEmailTheme({ primary, radius, density })` and use the same spacing tokens.

**Registry**

- `tokens` and `theme` items on every route. Each component ships only the CSS it uses.
- JavaScript routes for every component and usage snippet.
- Markdown for every page at `/components/{category}/{slug}.md` and `/docs/{slug}.md`.

**Earlier**

- Base components adopted shadcn's composition and part names; `Modal` became `Dialog`.
- One size scale, `sm` to `xl`, across every sized component.
- Overlays animate out as well as in, growing from the edge nearest their trigger.
- Light-mode `--success`, `--warning` and `--destructive` pass 4.5:1 as text.

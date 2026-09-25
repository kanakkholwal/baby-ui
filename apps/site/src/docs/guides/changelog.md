---
title: Changelog
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

**Registry**

- `tokens` and `theme` items on every route. Each component ships only the CSS it uses.
- JavaScript routes for every component and usage snippet.
- Markdown for every page at `/components/{category}/{slug}.md` and `/docs/{slug}.md`.

**Earlier**

- Base components adopted shadcn's composition and part names; `Modal` became `Dialog`.
- One size scale, `sm` to `xl`, across every sized component.
- Overlays animate out as well as in, growing from the edge nearest their trigger.
- Light-mode `--success`, `--warning` and `--destructive` pass 4.5:1 as text.

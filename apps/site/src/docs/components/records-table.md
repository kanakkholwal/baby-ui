---
title: Records Table
description: "An AI-spreadsheet grid: columns are configurable properties, each with a type, a tool and a prompt."
component: records-table
category: advanced
tags: [table, records, spreadsheet, ai, columns]
---

A company-records grid where every column is itself a configurable property. Clicking a
header opens its config (type, tool, inputs, prompt preview); a "Go calculate" button
reveals computed values row by row, driven entirely by `calculatingColumn`/`resolvedCount`:
the caller owns the reveal timing, the component only renders it.

## Data shape

```tsx
type RecordRow = {
  id: string;
  name: string;
  tags: string[];
  last: string;
  strength: "strong" | "weak" | "veryweak" | "none";
  website?: string;
  aiValue?: string;
};
```

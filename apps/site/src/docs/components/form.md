---
title: Form
description: shadcn-svelte's form parts on formsnap and Superforms. In React, use Field with react-hook-form.
component: form
category: base
tags: [form, formsnap, superforms, validation, zod]
---

Svelte only. These are shadcn-svelte's form parts (`FormField`, `FormControl`, `FormLabel`,
`FormDescription`, `FormFieldErrors`, `FormFieldset`, `FormLegend`, `FormElementField`,
`FormButton`) on [formsnap](https://formsnap.dev) and
[Superforms](https://superforms.rocks), so labels, descriptions, errors and `aria-invalid` are
wired to the control for you.

## React

shadcn no longer ships a React form component. Compose [Field](/components/base/field) with
react-hook-form or TanStack Form instead; the Field page shows the pattern.

## Server or SPA

Pass the `form` your page's load function returns to `superForm()` when the form posts to an
action. The demo runs in SPA mode, validating in the browser with the zod adapter.

# Runner protocol

The shell owns the slug and prop values; each runner is a dumb renderer.

Shell → runner, `postMessage` to the iframe's `contentWindow`:

```ts
{ source: "baby-ui-shell", slug: string, props: Record<string, unknown> }
```

A runner also accepts the same state via query string (`?slug=dock&props=<json>`), so
a runner URL can be opened directly or embedded without a shell.

Runner → shell, on mount:

```ts
{ source: "baby-ui-runner", framework: "react" | "svelte", ready: true }
```

The shell replays current state on `ready`, so a runner that restarts after an HMR
error comes back showing the same thing the other one shows.

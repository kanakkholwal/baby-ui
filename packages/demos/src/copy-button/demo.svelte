<script lang="ts">
import { CopyButton } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof CopyButton>>(props));

const text = $derived(p.text || "npx shadcn@latest add button");
</script>

<div
	class="flex w-full max-w-[22rem] items-center justify-between gap-3 rounded-xl border border-border bg-card px-3 py-2"
>
	<code class="truncate font-mono text-foreground text-xs">{text}</code>
	<CopyButton
		{text}
		label={p.label || "Copy"}
		copiedLabel={p.copiedLabel || "Copied"}
		iconOnly={p.iconOnly !== false}
	/>
</div>

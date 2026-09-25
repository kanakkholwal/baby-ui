<script lang="ts">
import { CopyButton } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const text = $derived((props.text as string) || "npx shadcn@latest add button");
</script>

<div
	class="flex w-full max-w-[22rem] items-center justify-between gap-3 rounded-xl border border-border bg-card px-3 py-2"
>
	<code class="truncate font-mono text-foreground text-xs">{text}</code>
	<CopyButton
		{text}
		label={(props.label as string) || "Copy"}
		copiedLabel={(props.copiedLabel as string) || "Copied"}
		iconOnly={props.iconOnly !== false}
	/>
</div>

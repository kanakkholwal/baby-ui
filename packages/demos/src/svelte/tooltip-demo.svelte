<script lang="ts">
import { Tooltip, TooltipContent, TooltipTrigger } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<Tooltip placement={(props.placement as never) ?? "top"} delay={Number(props.delay ?? 400)}>
	<TooltipTrigger>
		<button type="button" class="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm">Hover or focus me</button>
	</TooltipTrigger>
	<TooltipContent>{(props.label as string) || "Copy to clipboard"}</TooltipContent>
</Tooltip>

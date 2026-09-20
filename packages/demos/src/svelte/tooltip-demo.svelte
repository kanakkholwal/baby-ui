<script lang="ts">
import { Tooltip } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<Tooltip
	label={(props.label as string) || "Copy to clipboard"}
	placement={(props.placement as never) ?? "top"}
	delay={Number(props.delay ?? 400)}
>
	<button type="button" class="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm">Hover or focus me</button>
</Tooltip>

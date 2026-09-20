<script lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<Popover placement={(props.placement as never) ?? "bottom-start"} gap={Number(props.gap ?? 6)}>
	<PopoverTrigger class="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm">Open popover</PopoverTrigger>
	<PopoverContent>
		<p class="font-medium text-foreground">Deploy settings</p>
		<p class="mt-1 text-muted-foreground">
			Scroll the page with this open: it repositions and flips rather than drifting away.
		</p>
	</PopoverContent>
</Popover>

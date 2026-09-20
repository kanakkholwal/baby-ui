<script lang="ts">
import { Progress } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const value = $derived(Number(props.value ?? 68));
const indeterminate = $derived(Boolean(props.indeterminate));
</script>

<div class="flex w-72 flex-col gap-2">
	<div class="flex items-baseline justify-between gap-4 text-sm">
		<span class="truncate text-foreground">design-system.zip</span>
		<span class="shrink-0 text-muted-foreground text-xs tabular-nums">
			{indeterminate ? "Preparing…" : `${value}%`}
		</span>
	</div>
	<Progress
		{value}
		{indeterminate}
		size={(props.size as "sm" | "md" | "lg" | "xl") ?? "md"}
		label="Upload progress"
	/>
	<p class="text-muted-foreground text-xs">12.4 MB of 18.2 MB · 6s remaining</p>
</div>

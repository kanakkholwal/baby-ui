<script lang="ts">
import { Gauge } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="flex items-center gap-6">
	<Gauge
		value={Number(props.value ?? 68)}
		size={Number(props.size ?? 96)}
		thickness={Number(props.thickness ?? 8)}
		tone={(props.tone as "default" | "success" | "warning" | "danger") ?? "default"}
		label="Performance score"
	/>
	<p class="max-w-40 text-muted-foreground text-xs">
		A meter is a reading, not a task in progress.
	</p>
</div>

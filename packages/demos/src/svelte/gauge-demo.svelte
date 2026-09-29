<script lang="ts">
import { Gauge } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Gauge>>(props));
</script>

<div class="flex items-center gap-6">
	<Gauge
		value={Number(props.value ?? 68)}
		size={Number(props.size ?? 96)}
		thickness={Number(props.thickness ?? 8)}
		tone={p.tone ?? "default"}
		label="Performance score"
	/>
	<p class="max-w-40 text-muted-foreground text-xs">
		A meter is a reading, not a task in progress.
	</p>
</div>

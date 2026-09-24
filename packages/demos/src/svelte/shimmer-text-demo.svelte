<script lang="ts">
import { ShimmerText, type ShimmerTextSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="text-lg">
	<ShimmerText
		text="Agent is thinking ..."
		durationMs={Number(props.durationMs ?? 2000)}
		spread={Number(props.spread ?? 2)}
		size={(props.size as ShimmerTextSize) ?? "inherit"}
		class="font-light tracking-tight"
	/>
</div>

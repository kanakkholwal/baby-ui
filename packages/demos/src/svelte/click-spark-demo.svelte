<script lang="ts">
import { ClickSpark, type ClickSparkTone } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div
	class="relative grid h-56 w-full max-w-md place-items-center overflow-hidden rounded-2xl border border-border border-dashed text-muted-foreground text-sm"
>
	Click anywhere in here
	<ClickSpark
		scope="parent"
		tone={(props.tone as ClickSparkTone) ?? "foreground"}
		count={Number(props.count ?? 8)}
		size={Number(props.size ?? 10)}
		radius={Number(props.radius ?? 15)}
		durationMs={Number(props.durationMs ?? 400)}
	/>
</div>

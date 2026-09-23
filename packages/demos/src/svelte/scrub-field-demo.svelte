<script lang="ts">
import { ScrubField } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state(96);
$effect(() => {
	value = Number(props.defaultValue ?? 96);
});
</script>

<div class="w-32">
	<ScrubField
		label={(props.label as string) || "W"}
		{value}
		onValueChange={(v) => (value = v)}
		min={Number(props.min ?? 0)}
		max={Number(props.max ?? 999)}
		step={Number(props.step ?? 1)}
		largeStep={Number(props.largeStep ?? 10)}
		suffix={(props.suffix as string) || undefined}
		size={(props.size as "sm" | "md" | "lg") ?? "md"}
		tone={(props.tone as "default" | "edited") ?? "default"}
		disabled={Boolean(props.disabled)}
	/>
</div>

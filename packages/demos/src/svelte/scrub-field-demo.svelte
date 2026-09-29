<script lang="ts">
import { ScrubField } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ScrubField>>(props));

let value = $state(96);
$effect(() => {
	value = Number(props.defaultValue ?? 96);
});
</script>

<div class="w-32">
	<ScrubField
		label={p.label || "W"}
		{value}
		onValueChange={(v) => (value = v)}
		min={Number(props.min ?? 0)}
		max={Number(props.max ?? 999)}
		step={Number(props.step ?? 1)}
		largeStep={Number(props.largeStep ?? 10)}
		suffix={p.suffix || undefined}
		size={p.size ?? "md"}
		tone={p.tone ?? "default"}
		disabled={p.disabled ?? false}
	/>
</div>

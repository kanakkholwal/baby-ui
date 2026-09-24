<script lang="ts">
import { GaugeChart, type GaugeChartLayout, type GaugeChartTone } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const layout = $derived((props.layout as GaugeChartLayout) ?? "arc");
</script>

<div class={layout === "linear" ? "w-full max-w-md" : "w-full max-w-sm"}>
	<GaugeChart
		value={Number(props.value ?? 72)}
		{layout}
		tone={(props.tone as GaugeChartTone) ?? "primary"}
		notches={Number(props.notches ?? 40)}
		spacing={Number(props.spacing ?? 25)}
		label={(props.label as string) || undefined}
		showValue={props.showValue !== false}
	/>
</div>

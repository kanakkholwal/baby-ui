<script lang="ts">
import { ChartContainer, ChoroplethChart } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { WORLD, WORLD_VALUES } from "../data/world";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ChoroplethChart>>(props));
</script>

<div class="w-full max-w-3xl">
	<ChartContainer config={{}} title="Sample index by country" aspect="wide">
		<ChoroplethChart
			data={WORLD}
			values={WORLD_VALUES}
			projection={p.projection ?? "equalEarth"}
			graticule={props.graticule !== false}
			legend={props.legend !== false}
			zoomable={props.zoomable === true}
			dimOpacity={Number(props.dimOpacity ?? 0.4)}
			labels={{ value: "Index" }}
		/>
	</ChartContainer>
</div>

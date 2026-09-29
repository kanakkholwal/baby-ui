<script lang="ts">
import {
	Candlestick,
	CandlestickChart,
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	ChartTooltip,
	ChartTooltipContent,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { PRICES, PRICES_CONFIG } from "../data/prices";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Candlestick>>(props));
const pChart = $derived(controlProps<ComponentProps<typeof CandlestickChart>>(props));
</script>

<div class="w-full max-w-3xl">
	<ChartContainer config={PRICES_CONFIG} title="Share price">
		<CandlestickChart data={PRICES} status={pChart.status ?? "ready"}>
			<CartesianGrid />
			<YAxis tickFormatter={(v) => `$${v}`} />
			<XAxis />
			<Candlestick
				size={p.size ?? "regular"}
				dimOpacity={Number(props.dimOpacity ?? 0.4)}
			/>
			<ChartTooltip dots={false}>
				{#snippet content()}
					<ChartTooltipContent indicator="line" />
				{/snippet}
			</ChartTooltip>
		</CandlestickChart>
		<ChartLegend />
	</ChartContainer>
</div>

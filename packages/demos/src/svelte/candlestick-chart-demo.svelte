<script lang="ts">
import {
	Candlestick,
	CandlestickChart,
	type CandlestickSize,
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	type ChartStatus,
	ChartTooltip,
	ChartTooltipContent,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import { PRICES, PRICES_CONFIG } from "../data/prices";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="w-full max-w-3xl">
	<ChartContainer config={PRICES_CONFIG} title="Share price">
		<CandlestickChart data={PRICES} status={(props.status as ChartStatus) ?? "ready"}>
			<CartesianGrid />
			<YAxis tickFormatter={(v) => `$${v}`} />
			<XAxis />
			<Candlestick
				size={(props.size as CandlestickSize) ?? "regular"}
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

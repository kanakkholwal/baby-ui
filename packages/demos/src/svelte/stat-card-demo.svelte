<script lang="ts">
import { StatCard, type StatCardChartKind, type StatCardSize } from "@baby-ui/svelte";
import { MONTHLY_REVENUE, REVENUE_AVERAGE, REVENUE_TREND } from "../data/stat";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const currency = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0,
}).format;
</script>

<div class="w-full max-w-sm">
	<StatCard
		title="Total revenue"
		data={MONTHLY_REVENUE}
		dataKey="revenue"
		value={REVENUE_AVERAGE}
		label="Monthly average"
		trend={REVENUE_TREND}
		chart={(props.chart as StatCardChartKind) ?? "area"}
		size={(props.size as StatCardSize) ?? "md"}
		formatValue={currency}
	/>
</div>

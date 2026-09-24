<script lang="ts">
import { OverviewCard } from "@baby-ui/svelte";

const data = [
	{ date: new Date("2026-01-15"), revenue: 2100 },
	{ date: new Date("2026-01-16"), revenue: 2340 },
	{ date: new Date("2026-01-17"), revenue: 2050 },
	{ date: new Date("2026-01-18"), revenue: 2510 },
];

const periods = [
	{ value: "7d", label: "7D" },
	{ value: "30d", label: "30D" },
];

let period = $state("7d");

const usd = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0,
}).format;
</script>

<OverviewCard
	title="Total revenue"
	{data}
	dataKey="revenue"
	value={9000}
	label="7D"
	trend={19.5}
	{periods}
	{period}
	onPeriodChange={(v) => (period = v)}
	formatValue={usd}
/>

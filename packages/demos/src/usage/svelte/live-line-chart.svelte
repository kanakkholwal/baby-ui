<script lang="ts">
import {
	LiveLine,
	LiveLineChart,
	type LivePoint,
	LiveXAxis,
	LiveYAxis,
} from "@baby-ui/svelte";
import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
} from "@baby-ui/svelte/chart";

let { subscribe }: { subscribe: (push: (value: number) => void) => () => void } =
	$props();

const config = {
	value: { label: "Requests/s", color: "var(--chart-1)" },
} satisfies ChartConfig;

let data = $state<LivePoint[]>([]);
$effect(() =>
	subscribe((value) => {
		data = [...data.slice(-240), { time: Date.now() / 1000, value }];
	}),
);
</script>

<ChartContainer {config} title="Requests per second">
	<LiveLineChart {data} value={data.at(-1)?.value ?? 0} window={30}>
		<CartesianGrid />
		<LiveYAxis />
		<LiveXAxis />
		<LiveLine dataKey="value" />
		<ChartTooltip datePill={false} dots={false} />
	</LiveLineChart>
</ChartContainer>

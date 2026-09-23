<script lang="ts">
import { type FilterRow, FilterTable } from "@baby-ui/svelte";

let { props: _props = {} }: { props?: Record<string, unknown> } = $props();

const ROWS: FilterRow[] = [
	{
		task: "Restock mango sorbet",
		date: "Dec 03",
		status: "todo",
		owner: "Mango Moon Gelato",
	},
	{
		task: "Churn black sesame",
		date: "Sep 22",
		status: "progress",
		owner: "Kumo Creamery",
	},
	{
		task: "Print summer menu",
		date: "Jan 02",
		status: "todo",
		owner: "Coral Coast Sorbet",
	},
	{
		task: "Taste-test batch 42",
		date: "Nov 08",
		status: "progress",
		owner: "Maple Orbit",
	},
	{ task: "Order waffle cones", date: "Apr 14", status: "done", owner: "Aurora Scoops" },
];
</script>

<FilterTable
	rows={ROWS}
	labels={{ columns: { task: "Task name", date: "Date", status: "Status", owner: "Advisor" } }}
/>

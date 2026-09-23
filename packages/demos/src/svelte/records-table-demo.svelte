<script lang="ts">
import { type RecordRow, type RecordsDensity, RecordsTable } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const ROWS: RecordRow[] = [
	{
		id: "1",
		name: "Northwind Traders",
		tags: ["Retail", "Logistics"],
		last: "3 days ago",
		strength: "strong",
		website: "northwindtraders.com",
		aiValue: "Series B, $40M raised",
	},
	{
		id: "2",
		name: "Vantage Analytics",
		tags: ["Data", "B2B"],
		last: "2 weeks ago",
		strength: "weak",
		website: "vantageanalytics.io",
		aiValue: "Bootstrapped, profitable",
	},
	{
		id: "3",
		name: "Coral Reef Studio",
		tags: ["Design"],
		last: "No contact",
		strength: "none",
		aiValue: "Acquired by Adobe, 2024",
	},
	{
		id: "4",
		name: "Ferrous Robotics",
		tags: ["Hardware", "Manufacturing"],
		last: "1 month ago",
		strength: "veryweak",
		website: "ferrousrobotics.com",
		aiValue: "Series A, $12M raised",
	},
	{
		id: "5",
		name: "Lumen Health",
		tags: ["Healthcare", "AI"],
		last: "Yesterday",
		strength: "strong",
		website: "lumenhealth.co",
		aiValue: "Series C, $85M raised",
	},
];

const MODEL_OPTIONS = ["GPT-5", "Claude Sonnet 5", "Gemini 2.5 Pro"];

let calculatingColumn = $state<string | null>(null);
let resolvedCount = $state(0);

$effect(() => {
	if (!calculatingColumn) return;
	if (resolvedCount >= ROWS.length) {
		calculatingColumn = null;
		return;
	}
	const timer = setTimeout(() => {
		resolvedCount += 1;
	}, 110);
	return () => clearTimeout(timer);
});

function handleCalculate(column: string) {
	calculatingColumn = column;
	resolvedCount = 0;
}
</script>

<RecordsTable
	rows={ROWS}
	modelOptions={MODEL_OPTIONS}
	fill={props.fill as boolean | undefined}
	density={props.density as RecordsDensity | undefined}
	{calculatingColumn}
	{resolvedCount}
	onCalculate={handleCalculate}
/>

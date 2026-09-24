<script lang="ts">
import { UsageCard } from "@baby-ui/svelte";

const data = [
	{ name: "storage", value: 68, max: 100 },
	{ name: "seats", value: 4, max: 10 },
	{ name: "requests", value: 8200, max: 10000 },
];

const config = {
	storage: { label: "Storage", color: "var(--chart-1)" },
	seats: { label: "Seats", color: "var(--chart-2)" },
	requests: { label: "API requests", color: "var(--chart-3)" },
};
</script>

<UsageCard title="Usage this month" {data} {config} />

<script lang="ts">
import { type DiffRow, DiffTable } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const ROWS: DiffRow[] = [
	{
		key: "rocky",
		label: "Rocky Road",
		category: "Classic",
		detail: "aurora-scoops",
		change: "removed",
	},
	{
		key: "bubblegum",
		label: "Bubblegum",
		category: "Retro",
		detail: "kumo-creamery",
		change: "removed",
	},
	{
		key: "pistachio",
		label: "Pistachio",
		category: "Seasonal",
		detail: "maple-orbit",
		change: "added",
	},
];
</script>

<DiffTable title={(props.title as string) || undefined} rows={ROWS} class="max-w-md" />

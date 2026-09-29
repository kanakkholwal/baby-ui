<script lang="ts">
import { type DiffRow, DiffTable } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof DiffTable>>(props));

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

<DiffTable title={p.title || undefined} rows={ROWS} class="max-w-md" />

<script lang="ts">
import { FineTuneCard, type FineTuneField } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const FIELDS: FineTuneField[] = [
	{ key: "width", label: "W", value: 324, min: 40, max: 999 },
	{ key: "height", label: "H", value: 96, min: 24, max: 999 },
	{ key: "radius", label: "Radius", value: 28, min: 0, max: 64 },
	{ key: "opacity", label: "Opacity", value: 100, min: 0, max: 100, suffix: "%" },
];

const OPTIONS = ["Primary", "Secondary", "Ghost"];
</script>

<FineTuneCard
	fields={FIELDS}
	options={OPTIONS}
	labels={{ title: (props.title as string) || undefined }}
/>

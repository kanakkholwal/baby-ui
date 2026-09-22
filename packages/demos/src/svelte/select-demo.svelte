<script lang="ts">
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state("edge");

const RUNTIMES = [
	{ value: "edge", label: "Edge runtime" },
	{ value: "node", label: "Node runtime" },
	{ value: "static", label: "Static export" },
	{ value: "hybrid", label: "Hybrid", disabled: true },
];
</script>

<div class="w-64">
	<Select bind:value items={RUNTIMES}>
		<SelectTrigger aria-label="Runtime">
			<SelectValue placeholder={(props.placeholder as string) || "Select an option"} />
		</SelectTrigger>
		<SelectContent side={(props.side as never) ?? "bottom"}>
			<SelectItem value="edge" label="Edge runtime">Edge runtime</SelectItem>
			<SelectItem value="node" label="Node runtime">Node runtime</SelectItem>
			<SelectItem value="static" label="Static export">Static export</SelectItem>
			<SelectItem value="hybrid" label="Hybrid" disabled>Hybrid</SelectItem>
		</SelectContent>
	</Select>
</div>

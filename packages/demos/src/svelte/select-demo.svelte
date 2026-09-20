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
</script>

<div class="w-64">
	<Select bind:value placement={(props.placement as never) ?? "bottom-start"}>
		<SelectTrigger aria-label="Runtime">
			<SelectValue placeholder={(props.placeholder as string) || "Select an option"} />
		</SelectTrigger>
		<SelectContent>
			<SelectItem value="edge">Edge runtime</SelectItem>
			<SelectItem value="node">Node runtime</SelectItem>
			<SelectItem value="static">Static export</SelectItem>
			<SelectItem value="hybrid" disabled>Hybrid</SelectItem>
		</SelectContent>
	</Select>
</div>

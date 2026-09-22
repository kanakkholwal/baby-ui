<script lang="ts">
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@baby-ui/svelte";

let value = $state("");

const RUNTIMES = [
	{ value: "node", label: "Node 22" },
	{ value: "bun", label: "Bun 1.2" },
	{ value: "deno", label: "Deno 2" },
];
</script>

<Select bind:value items={RUNTIMES}>
	<SelectTrigger aria-label="Runtime">
		<SelectValue placeholder="Pick a runtime" />
	</SelectTrigger>
	<SelectContent>
		<SelectItem value="node" label="Node 22">Node 22</SelectItem>
		<SelectItem value="bun" label="Bun 1.2">Bun 1.2</SelectItem>
		<SelectItem value="deno" label="Deno 2" disabled>Deno 2</SelectItem>
	</SelectContent>
</Select>

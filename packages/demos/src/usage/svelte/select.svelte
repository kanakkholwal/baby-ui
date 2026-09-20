<script lang="ts">
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@baby-ui/svelte";

let value = $state("");
</script>

<Select bind:value>
	<SelectTrigger aria-label="Runtime">
		<SelectValue placeholder="Pick a runtime" />
	</SelectTrigger>
	<SelectContent>
		<SelectItem value="node">Node 22</SelectItem>
		<SelectItem value="bun">Bun 1.2</SelectItem>
		<SelectItem value="deno" disabled>Deno 2</SelectItem>
	</SelectContent>
</Select>

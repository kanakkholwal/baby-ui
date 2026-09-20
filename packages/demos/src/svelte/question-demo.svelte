<script lang="ts">
import { Question } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let picked = $state<string[]>([]);

const options = [
	{ id: "edge", label: "Edge" },
	{ id: "node", label: "Node" },
	{ id: "both", label: "Both" },
];
</script>

<div class="w-96">
	{#key props.multiple}
		<Question
			question={(props.question as string) || "Which runtime should this target?"}
			{options}
			multiple={Boolean(props.multiple)}
			onanswer={(ids) => (picked = ids)}
		/>
	{/key}
	{#if picked.length}<p class="mt-2 text-muted-foreground text-xs">Answered: {picked.join(", ")}</p>{/if}
</div>

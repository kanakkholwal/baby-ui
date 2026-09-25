<script lang="ts">
import { Checkbox } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const SCOPES = ["Read repositories", "Write issues", "Manage webhooks"];

let checked = $state(false);
let scopes = $state([true, false, false]);

$effect(() => {
	checked = Boolean(props.checked);
});

const granted = $derived(scopes.filter(Boolean).length);
</script>

<div class="flex w-full max-w-72 flex-col gap-3">
	<Checkbox
		bind:checked={
			() => granted === SCOPES.length, (next) => (scopes = SCOPES.map(() => next))
		}
		indeterminate={granted > 0 && granted < SCOPES.length}
		label="All permissions"
	/>
	<div class="flex flex-col gap-3 border-border border-l pl-4">
		{#each SCOPES as scope, i (scope)}
			<Checkbox bind:checked={scopes[i]} label={scope} />
		{/each}
	</div>
	<Checkbox
		bind:checked
		disabled={Boolean(props.disabled)}
		indeterminate={Boolean(props.indeterminate)}
		size={(props.size as "sm" | "md" | "lg" | "xl") ?? "md"}
		label={(props.label as string) || "Remember this grant"}
		description={(props.description as string) || "Skips the prompt for the next 30 days."}
	/>
</div>

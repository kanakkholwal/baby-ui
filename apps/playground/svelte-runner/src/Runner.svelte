<script lang="ts">
import { demos } from "@baby-ui/demos/svelte";
import { connect, initialState, type RunnerState } from "./runner-state";

let state = $state<RunnerState>(initialState());
$effect(() => connect("svelte", (next) => (state = next)));

const demoPromise = $derived(demos[state.slug]?.());
</script>

<div class="grid h-full place-items-center p-8">
	{#if demoPromise}
		{#await demoPromise then mod}
			{@const Demo = mod.default}
			<Demo props={state.props} />
		{/await}
	{:else}
		<p class="text-muted-foreground text-sm">No Svelte demo for “{state.slug}”.</p>
	{/if}
</div>

<script lang="ts">
import type { InputSize } from "@baby-ui/svelte";
import { Input, Label } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state("");
</script>

<div class="flex w-72 flex-col gap-1.5">
	<Label for="demo-input" required>Workspace name</Label>
	<Input
		id="demo-input"
		bind:value
		size={(props.size as InputSize) ?? "md"}
		invalid={Boolean(props.invalid)}
		disabled={Boolean(props.disabled)}
		placeholder={(props.placeholder as string) || "Enter a value"}
	/>
	{#if props.invalid}
		<p class="text-[var(--destructive)] text-xs">That name is already taken.</p>
	{/if}
</div>

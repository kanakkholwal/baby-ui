<script lang="ts">
import type { Snippet } from "svelte";
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import { PLAN_ICONS } from "../variants";

let {
	onclick,
	loading = false,
	disabled = false,
	class: classProp,
	children,
}: {
	onclick: () => void;
	loading?: boolean;
	disabled?: boolean;
	class?: string;
	children?: Snippet;
} = $props();
</script>

<!-- Stops the run; `loading` while the agent winds down. -->
<Button data-slot="plan-runner-stop" variant="outline" size="sm" {loading} {disabled} {onclick} class={cn("rounded-full", classProp)}>
	<svg viewBox="0 0 24 24" aria-hidden="true" class="size-3 fill-current"><path d={PLAN_ICONS.stop} /></svg>
	{#if children}{@render children()}{:else}Stop{/if}
</Button>

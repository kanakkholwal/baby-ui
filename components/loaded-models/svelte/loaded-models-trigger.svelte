<script lang="ts">
import type { Snippet } from "svelte";
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import PopoverTrigger from "../../popover/svelte/popover-trigger.svelte";
import { overallState } from "../model";
import { loadedModels } from "../variants";
import { getLoadedModels } from "./context";

/** The status dot and a label: "Nothing loaded", the model's name, or "2 models loaded". */
let { class: classProp, children }: { class?: string; children?: Snippet } = $props();

const ctx = getLoadedModels();
const styles = $derived(
	loadedModels({ variant: ctx.variant, state: overallState(ctx.models) }),
);
const label = $derived(
	ctx.loaded.length === 0
		? "Nothing loaded"
		: ctx.loaded.length === 1
			? ctx.loaded[0]?.name
			: `${ctx.loaded.length} models loaded`,
);
</script>

<PopoverTrigger data-slot="loaded-models-trigger">
	{#snippet child({ props })}
		<Button
			{...props}
			variant={ctx.variant}
			size="sm"
			aria-label="Models in memory"
			class={cn(styles.trigger(), classProp)}
		>
			<span class={styles.dot()}></span>
			<span class="truncate">{#if children}{@render children()}{:else}{label}{/if}</span>
		</Button>
	{/snippet}
</PopoverTrigger>

<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { loadedModels } from "../variants";
import { getLoadedModels } from "./context";

/** Shown while the list has no models at all; children can add a hint or action. */
let { class: classProp, children }: { class?: string; children?: Snippet } = $props();

const ctx = getLoadedModels();
</script>

{#if ctx.models.length === 0}
	<div data-slot="loaded-models-empty" class={cn(loadedModels().empty(), classProp)}>
		{#if children}{@render children()}{:else}Nothing is loaded, so the memory is free.{/if}
	</div>
{/if}

<script lang="ts">
import type { Snippet } from "svelte";
import type { LoadedModel } from "../model";
import { getLoadedModels } from "./context";
import LoadedModelsItem from "./loaded-models-item.svelte";

/** One row per model; pass `item` to render a custom row. */
let { item }: { item?: Snippet<[LoadedModel]> } = $props();

const ctx = getLoadedModels();
</script>

{#each ctx.models as model (model.id)}
	{#if item}
		{@render item(model)}
	{:else}
		<LoadedModelsItem {model} />
	{/if}
{/each}

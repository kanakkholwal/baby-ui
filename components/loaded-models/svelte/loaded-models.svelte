<script lang="ts">
import type { Snippet } from "svelte";
import Popover from "../../popover/svelte/popover.svelte";
import { isLoaded, type LoadedModel } from "../model";
import type { LoadedModelsVariant } from "../variants";
import { setLoadedModels } from "./context";

let {
	models,
	variant = "ghost",
	open = $bindable(false),
	onLoad,
	onUnload,
	children,
}: {
	models: LoadedModel[];
	variant?: LoadedModelsVariant;
	open?: boolean;
	/** Shows a Load action on models that are not in memory. */
	onLoad?: (id: string) => void;
	/** Shows an Unload action on models that are in memory. */
	onUnload?: (id: string) => void;
	children?: Snippet;
} = $props();

setLoadedModels({
	get models() {
		return models;
	},
	get loaded() {
		return models.filter(isLoaded);
	},
	get variant() {
		return variant;
	},
	get onLoad() {
		return onLoad;
	},
	get onUnload() {
		return onUnload;
	},
});
</script>

<Popover bind:open>
	{@render children?.()}
</Popover>

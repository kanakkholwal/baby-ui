<script lang="ts">
import {
	LoadedModels,
	LoadedModelsContent,
	LoadedModelsEmpty,
	LoadedModelsHeader,
	LoadedModelsList,
	LoadedModelsMemory,
	LoadedModelsTrigger,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { DEVICE_MEMORY, LOADED_MODEL_SAMPLES } from "../data/loaded-models";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof LoadedModels>>(props));
let models = $state(LOADED_MODEL_SAMPLES);

function setState(id: string, state: "loading" | "ready" | "idle") {
	models = models.map((m) => (m.id === id ? { ...m, state, measurement: undefined } : m));
}
</script>

<LoadedModels
	{models}
	variant={p.variant}
	onUnload={(id) => setState(id, "idle")}
	onLoad={(id) => {
		// The demo plays the load; the component only renders the state it is given.
		setState(id, "loading");
		setTimeout(() => setState(id, "ready"), 1400);
	}}
>
	<LoadedModelsTrigger />
	<LoadedModelsContent>
		<LoadedModelsHeader />
		<LoadedModelsMemory total={DEVICE_MEMORY} />
		<LoadedModelsList />
		<LoadedModelsEmpty />
	</LoadedModelsContent>
</LoadedModels>

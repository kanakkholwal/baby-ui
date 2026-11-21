<script lang="ts">
import { cn } from "../../lib/cn";
import Select from "../../select/svelte/select.svelte";
import SelectContent from "../../select/svelte/select-content.svelte";
import SelectItem from "../../select/svelte/select-item.svelte";
import SelectTrigger from "../../select/svelte/select-trigger.svelte";
import { audioComposer } from "../variants";
import { getAudioComposer } from "./context";

/** The style choice. */
let { class: classProp }: { class?: string } = $props();

const composer = getAudioComposer();
const items = $derived(composer.presets.map((c) => ({ value: c, label: c })));
</script>

<Select {items} disabled={composer.loading} bind:value={() => composer.preset, (next) => (composer.preset = next)}>
	<SelectTrigger data-slot="audio-composer-style" aria-label="Style" class={cn(audioComposer().style(), classProp)}>
		<span class="truncate">{composer.preset || "Style"}</span>
	</SelectTrigger>
	<SelectContent>
		{#each composer.presets as c (c)}
			<SelectItem value={c} label={c}>{c}</SelectItem>
		{/each}
	</SelectContent>
</Select>

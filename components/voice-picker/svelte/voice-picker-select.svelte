<script lang="ts">
import { cn } from "../../lib/cn";
import Select from "../../select/svelte/select.svelte";
import SelectContent from "../../select/svelte/select-content.svelte";
import SelectItem from "../../select/svelte/select-item.svelte";
import SelectTrigger from "../../select/svelte/select-trigger.svelte";
import { voicePicker } from "../variants";
import { swatchBackground } from "../voice";
import { getVoicePicker } from "./context";

let { class: classProp }: { class?: string } = $props();

const picker = getVoicePicker();
const styles = voicePicker();
const items = $derived(picker.voices.map((v) => ({ value: v.id, label: v.name })));
const current = $derived(picker.voices.find((v) => v.id === picker.voice));
</script>

<Select {items} bind:value={() => picker.voice, (next) => (picker.voice = next)}>
	<SelectTrigger data-slot="voice-picker-select" class={cn("min-w-0 flex-1", classProp)}>
		<span class={styles.label()}>
			{#if current}
				<span aria-hidden="true" class={styles.swatch()} style:background={swatchBackground(current.id)}></span>
				<span class={styles.name()}>{current.name}</span>
				{#if current.detail}<span class={styles.detail()}>{current.detail}</span>{/if}
			{:else}
				<span class={styles.detail()}>Choose a voice</span>
			{/if}
		</span>
	</SelectTrigger>
	<SelectContent>
		{#each picker.voices as v (v.id)}
			<SelectItem value={v.id} label={v.name}>
				<span class={styles.label()}>
					<span aria-hidden="true" class={styles.swatch()} style:background={swatchBackground(v.id)}></span>
					<span class={styles.name()}>{v.name}</span>
					{#if v.detail}<span class={styles.detail()}>{v.detail}</span>{/if}
				</span>
			</SelectItem>
		{/each}
	</SelectContent>
</Select>

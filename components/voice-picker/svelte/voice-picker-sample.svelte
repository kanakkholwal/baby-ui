<script lang="ts">
import Button from "../../button/svelte/button.svelte";
import { voicePicker } from "../variants";
import { EQ_BARS } from "../voice";
import { getVoicePicker } from "./context";

/** Hear the chosen voice. Renders as a stop button while the sample plays. */
let {
	onplay,
	onstop,
	class: classProp,
}: { onplay?: () => void; onstop?: () => void; class?: string } = $props();

const picker = getVoicePicker();
const styles = $derived(voicePicker({ sample: picker.sample }));
const busy = $derived(picker.sample !== "idle");
</script>

<Button
	data-slot="voice-picker-sample"
	variant="secondary"
	loading={picker.sample === "making"}
	loadingLabel="Making a sample"
	disabled={busy ? !onstop : !onplay}
	class={classProp}
	onclick={busy ? onstop : onplay}
>
	{#if picker.sample === "playing"}
		<span aria-hidden="true" class={styles.eq()}>
			{#each EQ_BARS as h, i (i)}
				<i class={styles.eqBar()} style:height={`${h * 100}%`} style:animation-delay={`${i * 140}ms`}></i>
			{/each}
		</span>
	{/if}
	{picker.sample === "playing" ? "Stop" : "Sample"}
</Button>

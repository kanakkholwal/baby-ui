<script lang="ts">
import {
	VoicePicker,
	VoicePickerRow,
	VoicePickerSample,
	VoicePickerSelect,
	VoicePickerSpeed,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { VOICE_SAMPLES } from "../data/voices";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof VoicePicker>>(props));
let sample = $state<"idle" | "making" | "playing">("idle");
const shown = $derived(p.sample ?? sample);

// The demo plays the sample: a moment to make it, then a few seconds of audio.
$effect(() => {
	if (sample === "making") {
		const id = setTimeout(() => (sample = "playing"), 900);
		return () => clearTimeout(id);
	}
	if (sample === "playing") {
		const id = setTimeout(() => (sample = "idle"), 3000);
		return () => clearTimeout(id);
	}
});
</script>

<div class="w-full max-w-md">
	<VoicePicker voices={VOICE_SAMPLES} variant={p.variant} sample={shown}>
		<VoicePickerRow>
			<VoicePickerSelect />
			<VoicePickerSample onplay={() => (sample = "making")} onstop={() => (sample = "idle")} />
		</VoicePickerRow>
		<VoicePickerSpeed />
	</VoicePicker>
</div>

<script lang="ts">
import {
	SpeechPlayer,
	SpeechPlayerControls,
	SpeechPlayerPlay,
	SpeechPlayerPosition,
	SpeechPlayerProgress,
	SpeechPlayerRate,
	SpeechPlayerSkip,
	SpeechPlayerStop,
	VoiceOrb,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof SpeechPlayer>>(props));
const count = $derived(p.count ?? 5);
let at = $state(2);
let own = $state<"idle" | "preparing" | "playing" | "paused">("playing");
const shown = $derived(p.state ?? own);
const chunk = $derived(Math.min(p.at ?? at, count));

// The demo plays the audio: a passage every two seconds while playing.
$effect(() => {
	if (own !== "playing") return;
	const id = setInterval(() => (at = at >= count ? 1 : at + 1), 2000);
	return () => clearInterval(id);
});
</script>

<div class="grid w-full max-w-md gap-4">
	<div class="flex justify-center">
		<VoiceOrb size="sm" activity={shown === "playing" ? 0.55 : 0} />
	</div>
	<SpeechPlayer state={shown} variant={p.variant} at={chunk} {count}>
		<SpeechPlayerControls>
			<SpeechPlayerSkip direction="previous" onclick={() => (at = chunk - 1)} />
			<SpeechPlayerPlay onclick={() => (own = shown === "playing" ? "paused" : "playing")} />
			<SpeechPlayerSkip direction="next" onclick={() => (at = chunk + 1)} />
			<SpeechPlayerStop
				onclick={() => {
					own = "idle";
					at = 0;
				}}
			/>
			<SpeechPlayerPosition />
			<SpeechPlayerRate />
		</SpeechPlayerControls>
		<SpeechPlayerProgress shape="scrub" onseek={(passage) => (at = passage)} />
	</SpeechPlayer>
</div>

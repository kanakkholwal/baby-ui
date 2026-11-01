<script lang="ts">
import { Button, VoiceOrb } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof VoiceOrb>>(props));

// The demo fakes a voice: bursts of syllables while "speaking", near silence otherwise.
let speaking = $state(true);
let activity = $state(0);
let analyser = $state.raw<AnalyserNode | null>(null);
let stream: MediaStream | null = null;

$effect(() => {
	if (!speaking || analyser) {
		activity = 0;
		return;
	}
	let frame = 0;
	const tick = (now: number) => {
		const syllable = Math.max(0, Math.sin(now / 140) * Math.sin(now / 410));
		activity = Math.min(1, syllable * 0.9 + Math.random() * 0.08);
		frame = requestAnimationFrame(tick);
	};
	frame = requestAnimationFrame(tick);
	return () => cancelAnimationFrame(frame);
});

async function toggleMic() {
	if (analyser) {
		for (const track of stream?.getTracks() ?? []) track.stop();
		analyser = null;
		return;
	}
	stream = await navigator.mediaDevices.getUserMedia({ audio: true });
	const context = new AudioContext();
	const node = context.createAnalyser();
	node.fftSize = 1024;
	context.createMediaStreamSource(stream).connect(node);
	analyser = node;
}
$effect(() => () => {
	for (const track of stream?.getTracks() ?? []) track.stop();
});
</script>

<div class="flex flex-col items-center gap-5">
	<VoiceOrb {activity} {analyser} variant={p.variant} size={p.size ?? "lg"} label={analyser ? "Listening" : speaking ? "Assistant is speaking" : "Assistant is idle"} />
	<p class="m-0 text-muted-foreground text-sm" aria-live="polite">{analyser ? "Listening to your microphone" : speaking ? "Speaking" : "Idle"}</p>
	<div class="flex gap-2">
		<Button size="sm" variant="secondary" class="rounded-full" disabled={!!analyser} onclick={() => (speaking = !speaking)}>{speaking ? "Stop speaking" : "Speak"}</Button>
		<Button size="sm" variant="ghost" class="rounded-full" onclick={toggleMic}>{analyser ? "Stop microphone" : "Use microphone"}</Button>
	</div>
</div>
